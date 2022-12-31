import { useState } from "react";
import "./App.css";

function App() {
  const today = new Date();
  const dayOfWeek = today.toLocaleString("en-US", { weekday: "long" });
  const [toDos, setTodos] = useState([]);
  const [toDo, setTodo] = useState("");
  const date = today.getDate()+ '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
  const time= today.getHours()+':'+today.getMinutes() ;
  let hours = today.getHours();
  let ampm = (hours < 12) ? "AM" : "PM";
  let inputTime=date+','+'('+time+' '+ampm+')';

  const handleClick = () => {
    if (toDo !== "") {
      setTodos([
        ...toDos,
        { id: Date.now(), text: toDo, status: false,tyme:inputTime, close: false },
      ]); //toDos have object array
      setTodo("");
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4" id="done-section">
            <div className="done-section ">
              <h5 className="text-center text-secondary">Done</h5>
              <div className="text-center">
                {toDos.map((obj) => {
                  if (obj.status) {
                    return (
                      <div className="input m-2 ">
                        <div className="text-secondary text-right">{obj.tyme}</div>
                        <input
                          value={obj.text}
                          type="text"
                          style={{ width: "100%" }}></input>{" "}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="app">
              <div className="mainHeading">
                <h1>ToDo List</h1>
              </div>
              <div className="group">
                <div className="subHeading">
                  <br />
                  <h2>Whoop, it's {dayOfWeek} 🌝 ☕ </h2>
                </div>

                <div className="input">
                  <input
                    value={toDo}
                    type="text"
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="🖊️ Add item..."
                  />
                  <i className="fas fa-plus" onClick={handleClick}></i>
                </div>
              </div>

              <div className="row">
                <div className="col-md-11" id="pending-section">
                  <div className="pending-section">
                    <h5 className="text-center text-secondary">Pending..</h5>
                    <div className="text-center">
                      {toDos.map((item) => {
                        if (item.close === false && item.status === false) {
                          return (
                            <div className="todos">
                              <div className="text-secondary text-right">{item.tyme}</div>
                              <div className="todo m-2">
                                <div className="left">
                                  <input
                                    onChange={(e) => {
                                      setTodos(
                                        toDos.filter((obj) => {
                                          if (obj.id === item.id) {
                                            obj.status = e.target.checked;
                                          }
                                          return obj;
                                        })
                                      );
                                    }}
                                    value={item.id}
                                    type="checkbox"
                                    name=""
                                    id=""
                                  />
                                  <p key={item.id}>{item.text}</p>
                                </div>
                                <div className="right">
                                  <i
                                    onClick={() => {
                                      setTodos(
                                        toDos.filter((obj) => {
                                          if (obj.id === item.id) {
                                            obj.close = true;
                                          }
                                          return obj;
                                        })
                                      );
                                    }}
                                    className="fas fa-times"></i>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4" id="closed-section">
            <div className="closed-section">
              <h5 className="text-center text-secondary">Dropped</h5>
              <div className="text-center">
                {toDos.map((obj) => {
                  if (obj.close && !obj.status) {
                    return (
                      <div className="input m-2">
                        <div className="text-secondary text-right">{obj.tyme}</div>
                        <input
                          value={obj.text}
                          type="text"
                          style={{ width: "100%" }}></input>{" "}
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
