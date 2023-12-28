"use client";

import { NotesContext } from "@/app/contexts/NotesContext";
import { useContext, useRef, useState } from "react";
import toast from "react-hot-toast";

interface INoteDetails {
  note: { [key: string]: string };
}

interface IupdateValues {
  title: string;
  content: string;
}

export default function Icons({ note }: INoteDetails) {
  const { deleteNote, setUpdateValues } = useContext(NotesContext);

  async function handleDelete() {
    const res = await deleteNote(note._id);

    if (res.msg === "done") {
      toast.success("Delete Successfully");
    }
  }

  function handleUpdateOpen() {
    const overlay = document.getElementById("update-overlay") as HTMLDivElement;
    const ele = document.getElementById(`update-form`) as HTMLDivElement;
    ele.dataset.ele_id = note._id;
    const updateTitle = document.getElementById(`updateTitle`) as HTMLInputElement;

    document.body.style.overflow = "hidden"

    let newUpdateValues: IupdateValues = {
      title: note.title,
      content: note.content,
    };

    setUpdateValues(newUpdateValues);

    overlay.style.display = "flex";
    ele.style.display = "flex";
    updateTitle.focus();

  }

  return (
    <>
      <div className="icons">
        <span onClick={handleDelete}>
          <i className="fa-regular fa-trash-can"></i>
        </span>
        <span>
          <i
            className="fa-regular fa-pen-to-square"
            onClick={handleUpdateOpen}
          ></i>
        </span>
      </div>
    </>
  );
}
