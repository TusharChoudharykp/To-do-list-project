import React, { useEffect, useState } from "react";
import "./Todo.css";
import Todocards from "./Todocards";
import Update from "./update";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";

let id = sessionStorage.getItem("id");

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "", dueDate: "" });
  const [Array, setArray] = useState([]);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
    document.getElementById("dateInput").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    const formattedDueDate = Inputs.dueDate
      ? moment(Inputs.dueDate).format("DD-MM-YYYY hh:mm A")
      : "";
    if (Inputs.title === "" || Inputs.body === "" || Inputs.dueDate === "") {
      toast.error("Title or Body or DueDate Should Not Be Empty");
    } else {
      if (id) {
        await axios
          .post("http://localhost:3000/api/v2/addTask", {
            title: Inputs.title,
            body: Inputs.body,
            dueDate: Inputs.dueDate,
            id: sessionStorage.getItem("id"),
          })
          .then((response) => {
            console.log(response);
          });
        setArray([...Array, { ...Inputs, dueDate: formattedDueDate }]);
        setInputs({ title: "", body: "", dueDate: "", id: "" });
        toast.success("Your Task Is Added");
      } else {
        setArray([...Array, { ...Inputs, dueDate: formattedDueDate }]);
        setInputs({ title: "", body: "", dueDate: "", id: "" });
        toast.success("Your Task Is Added");
        toast.error("Your Task Is Not Saved ! Please SignUp");
      }
    }
  };

  const del = (id) => {
    setArray(Array.filter((_, index) => index !== id));
  };

  const dis = (value) => {
    document.getElementById("todo-update").style.display = value;
  };

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get(`http://localhost:3000/api/v2/getTasks/${id}`)
        .then((response) => {
          setArray(response.data);
        });
    };
    fetch();
  }, [submit]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newArray = [...Array];
    const [movedItem] = newArray.splice(result.source.index, 1);
    newArray.splice(result.destination.index, 0, movedItem);
    setArray(newArray);
  };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-50 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={Inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className="p-2 todo-inputs"
              value={Inputs.body}
              onChange={change}
            />
            <input
              id="dateInput"
              type="datetime-local"
              name="dueDate"
              className="p-2 my-2 todo-inputs"
              value={Inputs.dueDate}
              onChange={change}
            />
          </div>
          <div className="w-50 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <div
                className="todo-body container-fluid"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="row">
                  {Array.map((item, index) => (
                    <Draggable
                      key={index}
                      draggableId={String(index)}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="col-lg-3 col-10 mx-5 my-2"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Todocards
                            title={item.title}
                            body={item.body}
                            dueDate={item.dueDate}
                            id={index}
                            delid={del}
                            display={dis}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} />
        </div>
      </div>
    </>
  );
};

export default Todo;
