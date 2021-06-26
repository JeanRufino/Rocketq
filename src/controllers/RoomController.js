const Database = require('../db/config');

module.exports = {
    async create(req, res) {
        const db = await Database();
        const pass = req.body.password;
        let roomId;
        let isRoom = true;

        while(isRoom == true) {
            // ROOM ID GENERATOR
            for (let i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : 
                roomId += Math.floor(Math.random() * 10).toString();          
            }

            // VERIFICATION
            const roomsIds = await db.all(`SELECT id FROM rooms`);
            if(roomsIds.length == 0) {
                isRoom = false;
            } else {
                for (let id of roomsIds) {
                    id == roomId ? isRoom = true : isRoom = false;
                }
            }
        }
        
        // INSERT ON DB
        await db.run(`INSERT INTO rooms (
            id,
            pass
        ) VALUES (
            ${parseInt(roomId)},
            '${pass}'
            )`);

        await db.close();

        return res.redirect(`/room/${roomId}`);
    },
    async open(req, res) {
        const db = await Database(); 
        const roomId = req.params.room;
        let isQuestions = true;

        const questions = await db.all(`
        SELECT * FROM questions
        WHERE room = ${roomId}
        and read = 0
        `);

        const questionsRead = await db.all(`
        SELECT * FROM questions
        WHERE room = ${roomId}
        and read = 1
        `);

        if(questions.length == 0 && questionsRead.length == 0) {
            isQuestions = false;
        }

        return res.render('room', { roomId, questions, questionsRead, isQuestions });
    },
    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}           