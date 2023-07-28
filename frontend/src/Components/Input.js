import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import axios from "axios";

const Input = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/get");
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const data = { to_do: inputValue };
    const response = await axios.post("http://localhost:5000/add", data);
    if (response.data === "Data added successfully!") {
      // Append the new todo to the existing list
      setTodo((prevTodo) => [...prevTodo, { to_do: inputValue }]);
      alert("Data added successfully!");
    } else {
      alert("Error adding data");
    }
  };

  // Callback function to remove the deleted item from `todo` state
  const handleDeleteTodo = (id) => {
    setTodo((prevTodo) => prevTodo.filter((item) => item._id !== id));
  };

  return (
    <>
      <div className="container  d-flex align-items-center justify-content-center mt-5 mb-5">
        <div className="row">
          <div className="col">
            <div className="input-group">
              <h1 className="header">To do List</h1>
              <div className="input-group mb-4">
                <span className="input-group-text">Write here to do things</span>
                <input
                  type="text"
                  aria-label="Enter the link"
                  className="form-control"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                  }}
                />
                <button className="btn btn-primary" type="submit" onClick={handleClick}>
                  Submit
                </button>
              </div>
            </div>

            {todo.length > 0 ? (
              todo.map((item) => (
                <Todo to_do={item.to_do} id={item._id} key={item._id} onDelete={handleDeleteTodo} />
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No Todo's</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Input;
