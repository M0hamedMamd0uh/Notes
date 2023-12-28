"use client";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContext";
import { useContext, useState } from "react";
import { NotesContext } from "@/app/contexts/NotesContext";
import { deleteCookie } from "cookies-next";
export default function Search_Logout_Comp() {
  const router = useRouter();

  const { setToken } = useContext(AuthContext);
  const { userNotes, setSearchNotes, searchValue, setSearchValue } =
    useContext(NotesContext);
  // const [searchValue, setSearchValue] = useState<string>("");

  function handleLogout() {
    // remove token from localStorage
    // localStorage.removeItem("token");
    deleteCookie("token");
    // set token in context
    setToken(null);

    setTimeout(() => {
      setSearchValue("");
    }, 500);
    router.push("/login");
  }

  function handleSearch() {
    const searchInput = document.getElementById(
      "searchInput"
    ) as HTMLInputElement;

    if (searchInput.value.trim() === "") {
      setSearchNotes([]);
      return;
    }
    let searchNotesClone: { [key: string]: string }[] = [];
    for (let index in userNotes.notes) {
      if (
        userNotes.notes[index].title.includes(
          searchInput.value.toLowerCase()
        ) ||
        userNotes.notes[index].title.includes(searchInput.value.toUpperCase())
      ) {
        searchNotesClone.push(userNotes.notes[index]);
      }
    }

    setSearchNotes(searchNotesClone);
  }

  return (
    <>
      <li className="nav-item">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search..."
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          id="searchInput"
          onInput={handleSearch}
        />
      </li>

      <li className="nav-item">
        <button className="nav-link w-100" onClick={handleLogout}>
          LogOut
        </button>
      </li>
    </>
  );
}
