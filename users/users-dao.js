// let users = [];
//
//
// export const findAllUsers = () => users;
//
//
// export const findUserById = (uid) => {
//     const index = users.findIndex((u) => u._id === uid);
//     if (index !== -1) return users[index];
//     return null;
// };
//
//
// export const findUserByUsername = (username) => {
//     const index = users.findIndex((u) => u.username === username);
//     if (index !== -1) return users[index];
//     return null;
// };
//
//
// export const findUserByCredentials = (username, password) => {
//     console.log("here");
//     const index = users.find((u) => u.username === username && u.password === password);
//     if (index !== -1) return users[index];
//     return null;
// };
//
//
// export const createUser = (user) => users.push(user);
//
//
// export const updateUser = (uid, user) => {
//     const index = users.findIndex((u) => u._id === uid);
//     users[index] = { ...users[index], ...user };
//     return {status: 'ok'}
// };
// export const deleteUser = (uid) => {
//     const index = users.findIndex((u) => u._id === uid);
//     users.splice(index, 1);
//     return {status: 'ok'}
// };

import usersModel from "./users-model.js";


export const findAllUsers = () =>
    usersModel.find();
export const findUserById = (id) =>
    usersModel.findById(id);
export const findUserByUsername = (username) =>
    usersModel.findOne({ username });
export const findUserByCredentials = (username, password) =>
    usersModel.findOne({ username, password });
export const createUser = (user) =>
    usersModel.create(user);
export const updateUser = (id, user) =>
    usersModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) =>
    usersModel.deleteOne({ _id: id });

