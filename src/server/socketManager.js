const io = require('./index.js').io;
const {VERIFY_USER,
        USER_CONNECTED,
        LOGOUT} = require('../Events');
const {createUser, createMessage, createChat } = require('../helpers.js');
const connectedUser = {};

module.exports = function (socket) {
    socket.on(VERIFY_USER, (nickname, callback) => {
        if(isUser(connectedUser, nickname)) {
            callback({isUser: true, user: null})
        } else {
            callback({
                isUser: false, user: createUser({name: nickname})})
        }
    })

};


function isUser (userList, username) {
    return username in userList
}

function removeUser (userList, username) {
    let newList = Object.assign({}, userList)
    delete newList[username]
    return newList;
}