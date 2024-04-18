import todoModel from "../models/todoModel.js";

const createTask = async (task) => {

  const newTodo = new todoModel({
    task: task,
    userId: ""
  });
  try {
    await newTodo.save();
    return newTodo;
  } catch (error) {
    console.log(error);
    return ({ message: "Something went wrong" });
  }
};

const deleteTask = async (id) => {
  try {
    const task = await todoModel.findByIdAndDelete(id);
    return task;
  } catch (error) {
    console.log(error);
   return ({ message: "Somethong went Wrong" });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { task } = req.body;
  const newTask = {
    task: task,
    userId: req.userId,
  };
  try {
    await todoModel.findByIdAndUpdate(id, newTask, { new: true });
    res.status(200).json(newTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getTasks = async () => {
  try {
    const tasks = await todoModel.find();
    // res.status(200).json(tasks);
    return tasks;
  } catch (error) {
    // res.status(500).json({ message: "Something went wrong" });
    console.log(error)
    return { message: "Something went wrong" };
  }
};

export { createTask, deleteTask, updateTask, getTasks };
