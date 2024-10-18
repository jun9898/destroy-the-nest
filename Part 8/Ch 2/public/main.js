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

})