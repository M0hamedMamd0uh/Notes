"use client";
import axios from "axios";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { getCookie } from "cookies-next";

interface INoteDetails {
  title: string;
  content: string;
}

interface InotesData {
  notes: { [key: string]: string }[];
}
type ISearchData = { [key: string]: string }[];

interface InotesContext {
  userNotes: InotesData;
  searchNotes: ISearchData;
  setSearchNotes: React.Dispatch<React.SetStateAction<ISearchData>>;

  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;

  updateValues: INoteDetails;
  setUpdateValues: React.Dispatch<React.SetStateAction<INoteDetails>>;

  getUserNotes: () => void;
  deleteNote: (id: string) => Promise<any>;
  addNote: (details: INoteDetails) => Promise<any>;
  updateNote: (id: string, details: INoteDetails) => Promise<any>;
}

const defaultState = {
  userNotes: {
    notes: {},
  },
  searchNotes: [{}],
  setSearchNotes: (val: ISearchData) => {},

  searchValue: "",
  setSearchValue: (val: string) => {},

  updateValues: {
    title: "",
    content: "",
  },
  setUpdateValues: (val: INoteDetails) => {},

  getUserNotes: () => {},
  deleteNote: (id: string) => {},
  addNote: (details: INoteDetails) => {},
  updateNote: (id: string, details: INoteDetails) => {},
} as InotesContext;

export const NotesContext = createContext(defaultState);

export default function NotesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useContext(AuthContext);
  const [userNotes, setUserNotes] = useState<InotesData>({
    notes: [],
  });

  const [searchNotes, setSearchNotes] = useState<ISearchData>([]);

  const [searchValue, setSearchValue] = useState<string>("");

  const [updateValues, setUpdateValues] = useState<INoteDetails>({
    title: "",
    content: "",
  });

  async function getUserNotes() {
    try {
      const { data } = await axios.get(
        "https://note-sigma-black.vercel.app/api/v1/notes",
        {
          headers: {
            token: `3b8ny__${token}`,
          },
        }
      );
      setUserNotes(data);
    } catch (error: any) {
      if ((error.response.data.msg = "not notes found")) {
        setUserNotes({ notes: [] });
      }
    }
  }

  async function deleteNote(id: string): Promise<any> {
    try {
      const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        {
          headers: {
            token: `3b8ny__${getCookie("token")}`,
          },
        }
      );

      //  to update searchNotes and show new view after delete element from searchNotes
      if (searchNotes.length > 0) {
        let newSearchNotes = searchNotes.filter((el) => id !== el._id);

        setSearchNotes(newSearchNotes);
      }

      getUserNotes();
      return data;
    } catch (error) {
      toast.error("Failed In Delete");
    }
  }

  async function addNote(details: INoteDetails): Promise<any> {
    try {
      const { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        details,
        {
          headers: {
            token: `3b8ny__${getCookie("token")}`,
          },
        }
      );

      //  to update searchNotes and show new view after add element to searchNotes
      if (data.note.title.includes(searchValue.toLowerCase()) || data.note.title.includes(searchValue.toUpperCase())) {
        let newSearchNotes = [...searchNotes];
        setSearchNotes([...newSearchNotes, data.note]);
      }

      getUserNotes();
      return data;
    } catch (error) {
      toast.error("Failed In Add");
    }
  }

  async function updateNote(id: string, details: INoteDetails): Promise<any> {
    try {
      const { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
        details,
        {
          headers: {
            token: `3b8ny__${getCookie("token")}`,
          },
        }
      );

      //  to update searchNotes and show new view after update element from searchNotes
      if (searchNotes.length > 0) {
        searchNotes.forEach((el) => {
          if (id === el._id) {
            el.title = details.title;
            el.content = details.content;
          }
        });

        // setSearchNotes(newSearchNotes);
      }

      getUserNotes();
      return data;
    } catch (error) {
      toast.error("Failed In Update");
    }
  }

  useEffect(() => {
    if (token !== null) {
      getUserNotes();
    }
  }, [token]);

  return (
    <NotesContext.Provider
      value={{
        userNotes,
        searchNotes,
        setSearchNotes,
        searchValue,
        setSearchValue,
        updateValues,
        setUpdateValues,
        getUserNotes,
        deleteNote,
        addNote,
        updateNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
