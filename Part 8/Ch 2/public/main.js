const socket = io('http://localhost:4000', {
    autoConnect: false
});

socket.onAny((event, ...args) => {
    console.log(event, ...args);
});

// Global variables
const chatBody = document.querySelector('.chat-body');
const userTitle = document.querySelector('#user-title');
const loginContainer = document.querySelector('.login-container');
const userTable = document.querySelector('.users');
const userTagline = document.querySelector('#users-tagline');
const title = document.querySelector('#active-user');
const messages = document.querySelector('.messages');
const msgDiv = document.querySelector('.msg-form');

const socketConnect = async (username, userID) => {
    socket.auth = { username, userID };
    await socket.connect();
}

const createSession = async (username) => {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username })
    }
    await fetch('/session', options)
        .then(res => res.json())
        .then(data => {
            socketConnect(data.username, data.userID);

            localStorage.setItem('session-username', data.username);
            localStorage.setItem('session-userID', data.userID);

            loginContainer.classList.add('d-none');
            chatBody.classList.remove('d-none');
            userTitle.innerHTML = data.username;
        })
        .catch(err => console.error(err));
}

socket.on("users-data", ({ users }) => {
    const index = users.findIndex(user => user.userID === socket.auth.userID);
    if (index > -1) {
        users.splice(index, 1);
    }

    userTable.innerHTML = '';
    let ul = `<table class="table table-hover">`
    for (const user of users) {
        ul += `<tr class="socket-users"
                    onclick="setActiveUser(this, '${user.username}', '${user.userID}')">
                    <td>${user.username}<span class="text-danger ps-1 d-none"
                    id = ${user.userID}>!</span></td>
                    </tr>`;
    }
    ul += `</table>`;
    if (users.length > 0) {
        userTagline.innerHTML = 'active users';
        userTagline.classList.remove('text-danger');
        userTagline.classList.add('text-success');
        userTable.innerHTML = ul;
    } else {
        userTagline.innerHTML = 'No users available';
        userTagline.classList.remove('text-success');
        userTagline.classList.add('text-danger');
    }
});

const sessionUsername = localStorage.getItem('session-username');
const sessionUserID = localStorage.getItem('session-userID');

if (sessionUsername && sessionUserID) {
    socketConnect(sessionUsername, sessionUserID);
    loginContainer.classList.add('d-none');
    chatBody.classList.remove('d-none');
    userTitle.innerHTML = sessionUsername;
}

const loginForm = document.querySelector('.user-login');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username');
    createSession(username.value.toLowerCase());
    username.value = '';
})

socket.on('user-away', (userID) => {
    const to = title.getAttribute('userID');
    if (to === userID) {
        title.innerHTML = '&nbsp;';
        msgDiv.classList.add('d-none');
        messages.classList.add('d-none');
    }
});

const appendMessage = ({ message, time, background, position }) => {
    let div = document.createElement('div');
    div.classList.add('message', 'bg-opacity-25', 'm-2', 'px-2', 'py-1', background, position);
    div.innerHTML = `<span class="msg-text">${message}</span> <span class="msg-time">${time}</span>`
    messages.append(div);
    messages.scrollTo(0, messages.scrollHeight);
}

const setActiveUser = (elem, username, userID) => {
    title.innerHTML = username;
    title.setAttribute('userID', userID);

    const list = document.getElementsByClassName('socket-users');
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('table-active');
    }
    elem.classList.add('table-active');

    msgDiv.classList.remove('d-none');
    messages.classList.remove('d-none');
    messages.innerHTML = '';
    socket.emit('fetch-messages', { receiver: userID });
    const notify = document.getElementById(userID);
    notify.classList.add('d-none');
}

const msgForm = document.querySelector('.msgForm');
const message = document.getElementById('message');
msgForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const to = title.getAttribute('userID');
    const time = new Date().toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const payload = {
        from: socket.id,
        to,
        message: message.value,
        time: time
    }

    socket.emit('message-to-server', payload);

    appendMessage({ ...payload, background: "bg-success", position: "right" });

    message.value = '';
    message.focus();
})

socket.on('message-to-client', ({ from, message, time }) => {
    const receiver = title.getAttribute('userID');
    const notify = document.getElementById(from);

    if (receiver === null) {
        notify.classList.remove('d-none');
    } else if (receiver === from) {
        appendMessage({ message, time, background: "bg-primary", position: "left" });
    } else {
        notify.classList.remove('d-none');
    }
})

socket.on('stored-messages', ({ messages }) => {
    if (messages.length > 0) {
        messages.forEach(msg => {
            let payload = {
                message: msg.message,
                time: msg.time
            }
            if (msg.from === socket.id) {
                appendMessage({ ...payload, background: "bg-success", position: "right" });
            } else {
                appendMessage({ ...payload, background: "bg-primary", position: "left" });
            }
        });
    }
});
