import * as usersDao from "./users-dao.js";

const UserController = (app) => {
    app.get('/api/users', findAllUsers)
    app.get('/api/users/:uid', findUserById);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
}

// const createUser = (req, res) => {
//     console.log("create user");
//     const newUser = req.body;
//     newUser._id = (new Date()).getTime() + '';
//     users.push(newUser);
//     res.json(newUser);
// }

// const findUserById = (req, res) => {
//     const userId = req.params.uid;
//     const user = users
//         .find(u => u._id === userId);
//     res.json(user);
// }

// const findUsers = (req, res) => {
//     console.log("find user");
//     const type = req.query.type
//     if(type) {
//         const usersOfType = users
//             .filter(u => u.type === type)
//         res.json(usersOfType)
//         return
//     }
//     res.json(users)
// }

// const deleteUser = (req, res) => {
//     const userId = req.params['uid'];
//     users = users.filter(usr => usr._id !== userId);
//     res.sendStatus(200);
// }

// const updateUser = (req, res) => {
//     const userId = req.params['uid'];
//     const updates = req.body;
//     users = users.map((usr) =>
//         usr._id === userId ?
//             {...usr, ...updates} :
//             usr
//     );
//     res.sendStatus(200);
// }

const updateUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.updateUser(id, req.body);
    const user = await usersDao.findUserById(id);
    req.session["currentUser"] = user;
    res.json(status);
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
};

const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
};

const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usersDao.findUserById(id);
    res.json(user);
};

const findAllUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else if (username) {
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
    }
};

export default UserController