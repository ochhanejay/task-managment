const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");


exports.addUser = async (req, res) => {

    try {

        const exchangeData = await userModel.insertMany(req.body)
            .then(function (docs) {
                console.log('User inserted');
            })
            .catch(function (err) {
                console.log(err);
            });

        res.status(200).json({ data: exchangeData });
    }
    catch (error) {
        console.log(error)

    }

};
exports.addTask = async (req, res) => {

    try {

        const taskData = await taskModel.create(req.body)
            .then(function (docs) {
                console.log('Task created');
            })
            .catch(function (err) {
                console.log(err);
            });

        res.status(200).json({ data: taskData });
    }
    catch (error) {
        console.log(error)

    }

};
exports.getUserTask = async (req, res) => {

    try {

        const taskData = await taskModel.find();

        res.status(200).json({ data: taskData });
    }
    catch (error) {
        console.log(error)

    }

};
exports.getUser = async (req, res) => {

    try {

        const user = await userModel.find();
        res.status(200).json({ data: user });
    }
    catch (error) {
        console.log(error)

    }

};
exports.deleteTask = async (req, res) => {
    try {

        const taskData = await taskModel.deleteOne({ _id: req.query.id });

        res.status(200).json({ data: taskData });
    }
    catch (error) {
        console.log(error)

    }
}