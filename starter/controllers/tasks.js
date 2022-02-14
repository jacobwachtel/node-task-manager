const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/customer-error');

// GET ALL TASKS

const getAllTasks = asyncWrapper(async (req, res) => {
   const tasks = await Task.find({});

   res.status(200).json({ tasks });
});

// CREATE NEW TASK

const createTask = asyncWrapper(async (req, res) => {
   const task = await Task.create(req.body);
   res.status(201).json({ task });
});

// GET SINGLE TASK

const getTask = asyncWrapper(async (req, res) => {
   const { id: taskID } = req.params;
   const task = await Task.findOne({ _id: taskID });
   if (!task) {
      return next(createCustomError(`no task with id : ${taskID}`, 404));
   }
   res.status(200).json({ task });
});

// UPDATE TASK

const updateTask = asyncWrapper(async (req, res) => {
   const { id: taskID } = req.params;

   const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
   });

   if (!task) {
      return next(createCustomError(`no task with id : ${taskID}`, 404));
   }

   res.status(200).json({ task });
});

// DELETE TASK

const deleteTask = asyncWrapper(async (req, res) => {
   const { id: taskID } = req.params;
   const task = await Task.findOneAndDelete({ _id: taskID });

   if (!task) {
      return next(createCustomError(`no task with id : ${taskID}`, 404));
   }

   res.status(200).json({ task });
});

module.exports = {
   getAllTasks,
   createTask,
   getTask,
   updateTask,
   deleteTask,
};
