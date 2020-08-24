let registerModel = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    createdAt: new Date
}

let loginModel = {
    username: '',
    firstname: '',
    lastname: '',
    accesstoken: ''
}

let userModel = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    createdAt: new Date
}

let editUserModel = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
}

let addTaskModel = {
    id: 0,
    title: '',
    description: '',
    markedAsDone: false,
    createdAt: new Date
}

let taskModel = {
    id: 0,
    title: '',
    description: '',
    markedAsDone: false,
    createdAt: new Date
}


module.exports = { registerModel, loginModel, userModel, editUserModel, addTaskModel, taskModel };