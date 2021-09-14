import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-message">
      <h3>This page can't be found :C</h3>
      <NavLink exact to ="/">
        <button>Back to Home</button>
      </NavLink>      
    </div>
  )
};

export default Error