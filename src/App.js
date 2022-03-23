import "./App.css";
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const addTask = (e) => {
    e.preventDefault();
    console.log("add task function fired");
    const newTask = {
      taskText: task,
      completed: false,
    };
    setTaskArr([...taskArr, newTask]);
    setTask("");
  };

  //Deleting a Task
  const deleteTask = (indexFromBelow) => {
    const filteredTasks = taskArr.filter((_task, idx) => {
      return indexFromBelow !== idx;
    });
    setTaskArr(filteredTasks);
  };

  //Completing a Task
  const handleToggleCompleted = (idx) => {
    const updatedTasks = taskArr.map((task, i) => {
      if (idx === i) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTaskArr(updatedTasks);
  };
  return (
    <div className="App">
      <h1>What do you need to get done?</h1>
      <form onSubmit={addTask} className="form">
        <label>
          Task:{" "}
          <input
            value={task}
            type="text"
            onChange={(e) => setTask(e.target.value)}
          />
        </label>
        <button
          type="submit"
          style={{ backgroundColor: "dodgerblue", color: "white" }}
        >
          Add
        </button>
      </form>
      <h2>To Do:</h2>
      {taskArr.map((task, index) => {
        const taskClasses = ["bold"];
        if (task.completed) {
          taskClasses.push("line-through");
        }
        return (
          <div key={index} className="tasks">
            <label>
              <input
                onChange={(e) => {
                  handleToggleCompleted(index);
                }}
                type="checkbox"
                checked={task.completed}
              />
            </label>
            <span className={taskClasses.join(" ")}>{task.taskText}</span>
            <button
              onClick={() => deleteTask(index)}
              style={{ backgroundColor: "black", color: "white" }}
            >
              Delete
            </button>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
