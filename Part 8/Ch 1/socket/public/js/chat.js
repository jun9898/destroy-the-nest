const socket = io();

// 왜? 그냥 form으로 보낼때 Request를 보내면 되는거 아닌가
const query = new URLSearchParams(location.search)

const username = query.get('username')
const room = query.get('room')


console.log(username, room)


socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href = '/'
    }
})

const messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML

function scrollToBottom() {
    messages.scrollTop = messages.scrollHeight;
}

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createAt: message.createAt
    })
    messages.insertAdjacentHTML('beforeend', html);
    scrollToBottom();
});

const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
socket.on('roomData', ({ room, users }) => {
    document.querySelector('#sidebar').innerHTML = Mustache.render(sidebarTemplate, {
        room,
        users
    })

})

const messageForm = document.querySelector('#message-form');
const messageInput = messageForm.querySelector('input');
const messageButton = messageForm.querySelector('button');

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    messageButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;
    socket.emit('sendMessage', message, (error) => {
        messageButton.removeAttribute('disabled');
        messageInput.value = '';
        messageInput.focus();

        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
    })
})