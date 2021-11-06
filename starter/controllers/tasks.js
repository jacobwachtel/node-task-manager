const Task = require('../models/Task');

// GET ALL TASKS

const getAllTasks = async (req, res) => {
   try {
      const tasks = await Task.find({});
      res.status(200).json({ tasks });
   } catch (error) {
      res.status(500).json({ msg: error });
   }
};

// CREATE NEW TASK

const createTask = async (req, res) => {
   try {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
   } catch (error) {
      res.status(500).json({ msg: 'there was an error' });
   }
};

// GET SINGLE TASK

const getTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOne({ _id: taskID });
      if (!task) {
         return res.status(404).json({ msg: `no task with id : ${taskID}` });
      }
      res.status(200).json({ task });
   } catch (error) {
      res.status(500).json({ msg: 'there was an error' });
   }
};

// UPDATE TASK - POST and PATCH

const updateTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
         new: true,
         runValidators: true,
      });
      res.status(200).json({ task });
   } catch (error) {
      res.status(500).json({ msg: 'there was an error' });
   }
};

// DELETE TASK

const deleteTask = async (req, res) => {
   try {
      const { id: taskID } = req.params;
      const task = await Task.findOneAndDelete({ _id: taskID });
      if (!task) {
         return res.status(404).json({ msg: `no task with id : ${taskID}` });
      }
      res.status(200).json({ task });
   } catch (error) {
      res.status(500).json({ msg: 'there was an error' });
   }
};

module.exports = {
   getAllTasks,
   createTask,
   getTask,
   updateTask,
   deleteTask,
};
