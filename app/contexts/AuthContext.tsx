"use client";
import { getCookie } from "cookies-next";
import React, { createContext, useEffect, useState } from "react";

type Token = null | string;

interface AuthContext {
  token: Token;
  setToken: React.Dispatch<React.SetStateAction<Token>>;
}

const defaultState = {
  token: "",
  setToken: (tkn: Token) => {},
} as AuthContext;

export const AuthContext = createContext(defaultState);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<Token>(null);

  useEffect(() => {
    // if (localStorage.getItem("token") !== null) {
    //   setToken(localStorage.getItem("token"));
    // }


    if (getCookie("token") !== null) {
      let tkn: string | undefined = getCookie("token");
      setToken(tkn!);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
