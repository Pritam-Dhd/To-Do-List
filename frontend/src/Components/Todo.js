import React from "react";
import axios from "axios";

const Todo = ({ to_do, id, onDelete }) => {
  // Add `onDelete` prop
  const handleDelete = async () => {
    if (window.confirm(`Delete todo with id ${id}`)) {
      try {
        const data = { id: id };
        const response = await axios.delete(`http://localhost:5000/delete/`, { data });
        if (response.data === "Data is deleted successfully") {
          alert("Data is deleted successfully");
          onDelete(id);
        } else {
          alert("Error deleting");
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col bg-light d-flex align-items-center justify-content-between rounded">
            <span className="me-5">{to_do}</span>

            <button
              className="btn btn-danger btn-xs mt-2 mb-2"
              id="Delete"
              onClick={handleDelete}
            >
              <span className="glyphicon glyphicon-remove"></span> Del
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
