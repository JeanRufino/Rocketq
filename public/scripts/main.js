import Modal from './modal.js';

const modal = Modal();

const checkButtons = document.querySelectorAll('a.check');
const deleteButtons = document.querySelectorAll('a.delete');

let modalTitle = document.querySelector('.modal h2');
let modalDescription = document.querySelector('.modal p');
let modalButton = document.querySelector('.modal button');

checkButtons.forEach(button => {
    button.addEventListener('click', event => {
        handleClick(event, true);
        modal.open();
    });
}); 

deleteButtons.forEach(button => {
    button.addEventListener('click', event => {
        handleClick(event);
        modal.open()
    });
}); 

function handleClick(event) {
    event.preventDefault();
    let action;
    const roomId = document.querySelector('#room-id').dataset.id;
    const modalForm = document.querySelector('.modal form');
    const questionId = event.target.dataset.id;

    if (event.target.classList.contains('check')) {
        modalTitle.innerHTML = "Marcar como lida";
        modalDescription.innerHTML = "Tem certeza que deseja marcar como lida?";
        modalButton.innerHTML = "Sim, marcar como lida";
        modalButton.classList.remove('red');
        action = 'check';

    } else if (event.target.classList.contains('delete')) {
        modalTitle.innerHTML = "Excluir pergunta";
        modalDescription.innerHTML = "Tem certeza que você deseja excluir esta pergunta?";
        modalButton.innerHTML = "Sim, excluir";
        modalButton.classList.add('red');
        action = 'delete';

    }

    modalForm.setAttribute("action", `/question/${roomId}/${questionId}/${action}`);
}

// function handleClick2(event, check = false) {
//     modalTitle.innerHTML = check ? "Marcar como lida" : "Excluir pergunta";
//     modalDescription.innerHTML = check ? "Tem certeza que deseja marcar como lida?" : "Tem certeza que você deseja excluir esta pergunta?";
//     modalButton.innerHTML = check ? "Sim, marcar como lida" : "Sim, excluir";
// }