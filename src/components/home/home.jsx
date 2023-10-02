import { useReducer } from "react";
import Header from "../header/Header";
import TaskTile from "../taskTile/TaskTile";
import "./home.css";
import AddTask from "../addTask/AddTask";

const reducer = (state, action) => {
  switch (action.type) {
    case "OPEN-MODAL":
      return { ...state, isOpen: !state.isOpen };
    case "ADD-NEW-TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.playLoad],
      };
    case "DELETE-TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id != action.playLoad),
      };
    default:
      throw new Error("what's going on?");
  }
};

const defaultState = {
  isOpen: false,
  tasks: [],
};
const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  function openModal() {
    dispatch({ type: "OPEN-MODAL" });
  }
  function updateTask(newTask) {
    let id = state.tasks.length + 1;
    let task = {
      id: id,
      title: newTask.title,
      description: newTask.description,
      date: newTask.date,
    }; //declearing the value to be added to the playload of the dispacth function..

    dispatch({ type: "ADD-NEW-TASK", playLoad: task });
  }
  function deleteTask(id) {
    dispatch({ type: "DELETE-TASK", playLoad: id });
  }
  return (
    <div className="home">
      {state.isOpen && <AddTask openModal={openModal} addTask={updateTask} />}
      <Header openModal={openModal} />
      {state.tasks.length === 0 ? (
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
            {state.tasks.map((task) => (
              <TaskTile task={task} key={task.id} removeTask={deleteTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
