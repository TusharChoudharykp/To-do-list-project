import React from "react";
import { MdDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";

const Todocards = ({ title, body, dueDate, id, delid, display }) => {
  return (
    <div className="p-3 todo-cards">
      <div>
        <h5>{title}</h5>
        <p className="todo-card-p">
          {body.length > 77 ? body.substring(0, 77) + "..." : body}
        </p>
        <p className="todo-card-dueDate">
          <strong>Due Date:</strong> {dueDate}
        </p>
      </div>
      <div className="d-flex justify-content-around">
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"
          onClick={() => {
            display("block");
          }}
        >
          <GrDocumentUpdate className="card-icons" /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <MdDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default Todocards;

// import React from "react";

// const Todocards = ({ title, body }) => {
//   return (
//     <div className="p-3 todo-cards">
//       <div>
//         <h5>{title}</h5>
//         <p className="todo-card-p">{body}</p>
//       </div>
//     </div>
//   );
// };

// export default Todocards;
