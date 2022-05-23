import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    axios
      .post("http://localhost:3001/create", {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });
  };

  const getEmployees = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (id) => {
    axios
      .put("http://localhost:3001/update", {
        wage: newWage,
        id: id,
      })
      .then((response) => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id ? { ...val, wage: newWage } : val;
          })
        );
      });
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  return (
    <>
      <div className="container">
        <div className="inputs">
          <div className="heading">Enter details of the Employee:</div>
          <label>Name: </label>
          <input
            type="text"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
          <label>Age: </label>
          <input
            type="number"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          ></input>
          <label>Country: </label>
          <input
            type="text"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          ></input>
          <label>Position: </label>
          <input
            type="text"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          ></input>
          <label>Wage(year): </label>
          <input
            type="number"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          ></input>
          <button onClick={addEmployee}> Add Employee </button>
        </div>
        <div className="outputs">
          <button onClick={getEmployees} className="showBtn">
            Show Employees
          </button>
          {employeeList.map((val, key) => {
            return (
              <div className="list">
                <h3>id: {val.id}</h3>
                <h3>Name: {val.name}</h3>
                <h3>age: {val.age}</h3>
                <h3>country: {val.country}</h3>
                <h3>position: {val.position}</h3>
                <h3>wage: {val.wage}</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Enter new wage"
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                  ></input>
                  <button onClick={() => updateEmployeeWage(val.id)}>
                    UPDATE
                  </button>
                  <button onClick={() => deleteEmployee(val.id)}>DELETE</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
