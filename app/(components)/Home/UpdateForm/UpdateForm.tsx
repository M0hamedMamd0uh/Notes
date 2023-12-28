"use client";

import { NotesContext } from "@/app/contexts/NotesContext";
import {
  useContext,
} from "react";
import toast from "react-hot-toast";


export default function UpdateForm() {
  const { updateValues, setUpdateValues, updateNote } =
    useContext(NotesContext);

  function handleUpdateClose() {
    const overlay = document.getElementById("update-overlay") as HTMLDivElement;
    const ele = document.getElementById(`update-form`) as HTMLDivElement;

    ele.style.display = "none";
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  }

  async function handleUpdate() {
    
    const updateForm = document.getElementById("update-form") as HTMLDivElement;
    let ID: String | undefined = updateForm.dataset.ele_id;

    if (
      updateValues.title.trim() === "" ||
      updateValues.content.trim() === ""
    ) {
      return;
    }
    const res = await updateNote(ID!.toString(), updateValues);
    if (res.msg === "done") {
      toast.success("Updated Successfully");
      handleUpdateClose();
    }
  }

  return (
    <>
      <div className="update-overlay" id="update-overlay"></div>
      <div className="update-form" id="update-form">
        <h2 className="lead ">Update Note </h2>
        <div className="">
          <label htmlFor="updateTitle" className="lead fs-6 mb-1">
            Title :{" "}
          </label>
          <input
            type="text"
            placeholder="Update title"
            className="form-control"
            id="updateTitle"
            value={updateValues.title}
            onChange={(e) =>
              setUpdateValues({
                title: e.target.value,
                content: updateValues.content,
              })
            }
          />
        </div>
        <hr />
        <div className="flex-grow-1 d-flex flex-column">
          <label htmlFor="updateContent" className="lead fs-6 mb-1">
            Content :{" "}
          </label>
          <textarea
            placeholder="Update content"
            className="form-control"
            id="updateContent"
            value={updateValues.content}
            onChange={(e) =>
              setUpdateValues({
                title: updateValues.title,
                content: e.target.value,
              })
            }
          ></textarea>
        </div>
        <hr />
        <div className="btns d-flex justify-content-end">
          <button
            className="btn btn-outline-dark close-btn"
            onClick={handleUpdateClose}
          >
            X
          </button>
          <button className="btn btn-dark w-100" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}
