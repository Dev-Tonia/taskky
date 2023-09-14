import { useState } from "react";
import "./addTask.css";
const AddTask = (props) => {
  const openModal = props.openModal;
  const [errorMessage, setErrorMessage] = useState(false);
  let initial = {
    title: "",
    description: "",
    date: "",
  };
  const [formField, setFormField] = useState(initial);
  // Define a function to handle form input changes
  const handleInputChange = (event) => {
    // I'm using the id here in place of the formField, cos the id and the formField value is the same..
    // that's to say that the id is serving as the formField of each element...
    const { id, value } = event.target;
    setFormField({ ...formField, [id]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      formField.title.trim() === "" ||
      formField.description.trim() === "" ||
      formField.date.trim() === ""
    ) {
      setErrorMessage(true);
      return;
    }
    // Call the callback function to update the form data in the parent
    props.addTask(formField);
    setFormField(initial);
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
                value={formField.title}
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
                value={formField.description}
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
                value={formField.date}
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
