"use client";
import React, { useContext } from "react";
import { NotesContext } from "@/app/contexts/NotesContext";
import Note from "./Note/Note";

export default function MasterHome() {
  const { userNotes, searchNotes, searchValue } = useContext(NotesContext);

  return (
    <>
      {searchValue.length > 0 ? (
        searchNotes.length > 0 ? (
          searchNotes.map((ele, idx) => (
            <div key={idx} className=" col-md-6 col-xl-4">
              <Note note={ele}  />
            </div>
          ))
        ) : (
          <h2 className="text-center">No Results Found</h2>
        )
      ) : userNotes.notes.length > 0 ? (
        userNotes.notes.map((ele, idx) => (
          <div key={idx} className=" col-md-6 col-xl-4">
            <Note note={ele} />
          </div>
        ))
      ) : (
        <h2 className="text-center">No Notes Found</h2>
      )}
    </>
  );
}
