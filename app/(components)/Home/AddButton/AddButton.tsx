"use client";
import { NotesContext } from "@/app/contexts/NotesContext";
import { useContext, useRef } from "react";
import toast from "react-hot-toast";

interface IaddDetails {
  title: string;
  content: string;
}

export default function AddButton() {
  const { addNote } = useContext(NotesContext);

  const titleRef = useRef<HTMLInputElement>(null);

  function handleOpen() {
    const overlay = document.getElementById("add-overlay") as HTMLDivElement;
    const ele = document.getElementById("add-form") as HTMLDivElement;
    ele.style.display = "flex";
    overlay.style.display = "flex";
    titleRef.current?.focus();
  }

  function handleClose() {
    const overlay = document.getElementById("add-overlay") as HTMLDivElement;
    const ele = document.getElementById("add-form") as HTMLDivElement;
    ele.style.display = "none";
    overlay.style.display = "none";
  }

  async function handleAdd() {
    const title = document.getElementById("title") as HTMLInputElement;
    const content = document.getElementById("content") as HTMLTextAreaElement;

    let details: IaddDetails = {
      title: title.value,
      content: content.value,
    };

    if (title.value.trim() === "" || content.value.trim() === "") {
      return;
    }

    const res = await addNote(details);
    if (res.msg === "done") {
      toast.success("Added Successfully");
      title.value = "";
      content.value = "";
      handleClose();
    }
  }

  return (
    <>
      <div className="addBtn mb-4">
        <button className="btn btn-dark" onClick={handleOpen}>
          Add Note
        </button>
      </div>

      <div className="add-overlay" id="add-overlay"></div>

      <div className="add-form" id="add-form">
        <h2 className="lead ">Add Note </h2>
        <div>
          <label htmlFor="title" className="lead fs-6 mb-1">
            Title :{" "}
          </label>
          <input
            type="text"
            id="title"
            placeholder="Note title"
            className="form-control"
            ref={titleRef}
          />
        </div>
        <hr />
        <div className="flex-grow-1 d-flex flex-column">
          <label htmlFor="content" className="lead fs-6 mb-1">
            Content :{" "}
          </label>
          <textarea
            id="content"
            placeholder="Note content"
            className="form-control"
          ></textarea>
        </div>
        <hr />
        <div className="btns d-flex justify-content-end">
          <button
            className="btn btn-outline-dark close-btn"
            onClick={handleClose}
          >
            X
          </button>
          <button className="btn btn-dark w-100" onClick={handleAdd}>
            Add
          </button>
        </div>
      </div>
    </>
  );
}
