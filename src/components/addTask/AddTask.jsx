import { useReducer, useState } from "react";
import "./addTask.css";
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "userInput":
//       return {
//         ...state,
//         title: action.playLoad,
//         description: action.playLoad,
//         date: action.playLoad,
//       };

//     default:
//       break;
//   }
// };
const reducer = (state, action) => {
  if (action.type === "title") {
    return { ...state, title: action.value };
  } else if (action.type === "description") {
    return { ...state, description: action.value };
  } else if (action.type === "date") {
    return { ...state, date: action.value };
  }
  // likewise for all
};

let initial = {
  title: "",
  description: "",
  date: "",
};
const AddTask = (props) => {
  const { openModal, addTask } = props;
  const [errorMessage, setErrorMessage] = useState(false);

  // const [formField, setFormField] = useState(initial);
  const [state, dispatch] = useReducer(reducer, initial);
  // Define a function to handle form input changes
  const handleInputChange = (event) => {
    // I'm using the id here in place of the formField, cos the id and the formField value is the same..
    // that's to say that the id is serving as the formField of each element...
    const { id, value } = event.target;
    dispatch({ type: `${[id]}`, value: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      state.title.trim() === "" ||
      state.description.trim() === "" ||
      state.date.trim() === ""
    ) {
      setErrorMessage(true);
      return;
    }
    // Call the callback function to update the form data in the parent
    addTask({
      title: state.title,
      description: state.description,
      date: state.date,
    });
    // setFormField(initial);
    setErrorMessage(false);

    openModal();
  };
  return (
    <div className="popup">
      <div className="overlay">
        <div className="content">
          <div className="pop-header">
            <button className="pop-close" onClick={openModal}>
              X
            </button>
          </div>

          <div className="pop-body">
            {errorMessage && <p className="error">Fill All Field Please!!!</p>}
            <h2>Add A New Task</h2>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                value={state.title}
                required
                placeholder="Enter your task title"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Task Description</label>
              <textarea
                name=""
                id="description"
                rows="5"
                value={state.description}
                placeholder="Task description.. "
                required
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="date">Due Date</label>
              <input
                type="date"
                name=""
                id="date"
                value={state.date}
                required
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <button className="btn" onClick={handleSubmit}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
