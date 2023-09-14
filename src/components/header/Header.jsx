import "./header.css";
import { RiAddFill } from "react-icons/ri";
const Header = (props) => {
  const openModal = props.openModal;
  return (
    <div className="header">
      <div className="container">
        <div className="flex  header-wrapper">
          <h1>Taskky</h1>
          <button className="flex btn" onClick={openModal}>
            <RiAddFill fontSize={22} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
