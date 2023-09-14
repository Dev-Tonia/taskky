import Header from "../header/Header";
import TaskTile from "../taskTile/TaskTile";
import { useState } from "react";

import "./home.css";
import AddTask from "../addTask/AddTask";

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  function openModal() {
    setIsOpen((isOpen) => !isOpen);
  }
  function updateTask(newTask) {
    let id = tasks.length + 1;
    setTasks([
      ...tasks,
      {
        id: id,
        title: newTask.title,
        description: newTask.description,
        date: newTask.date,
      },
    ]);
  }
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  return (
    <div className="home">
      {isOpen && <AddTask openModal={openModal} addTask={updateTask} />}
      <Header openModal={openModal} />
      {tasks.length === 0 ? (
        <div className="empty">
          <div>
            <p>Your List of tasks is empty.</p>
            <p>What could you like to do next..</p>
          </div>
        </div>
      ) : (
        <div className="task-wrapper">
          <h3>All Task</h3>
          <div className="tasks">
            {tasks.map((task) => (
              <TaskTile task={task} key={task.id} removeTask={deleteTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
