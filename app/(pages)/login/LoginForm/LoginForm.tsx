"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import * as Yup from "yup";
import { useFormik } from "formik";
import { AuthContext } from "@/app/contexts/AuthContext";
import { setCookie } from 'cookies-next';




interface Iform {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { token, setToken } = useContext(AuthContext);

  const [loading, setloading] = useState(false);
  const router = useRouter();

  const initialValues: Iform = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][A-Za-z0-9]{6,}$/, "Password is invalid"),
  });

  async function handleSubmit(values: Iform) {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        values
      );
      if (data.msg === "done") {
        toast.success("Login Successfully");
        setTimeout(() => {
          // localStorage.setItem("token", data.token);
          
          setCookie("token", data.token);


          setToken(data.token);
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed In Login");
    }
    setloading(false);
  }

  const formikObj = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formikObj.handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            className="form-control "
            placeholder="Email..."
            value={formikObj.values.email}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            name="email"
          />
          {formikObj.errors.email && formikObj.touched.email ? (
            <span className="text-end text-danger w-100 d-inline-block mt-2">
              {formikObj.errors.email}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="mb-3">
          {" "}
          <input
            type="password"
            className="form-control "
            placeholder="Password..."
            value={formikObj.values.password}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            name="password"
          />
          {formikObj.errors.password && formikObj.touched.password ? (
            <span className="text-end text-danger w-100 d-inline-block mt-2">
              {formikObj.errors.password}
            </span>
          ) : (
            ""
          )}
        </div>

        <button
          disabled={!formikObj.dirty || !formikObj.isValid}
          type="submit"
          className="btn btn-primary w-100"
        >
          {loading ? (
            <FallingLines color="#fff" width="22" visible={true} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </>
  );
}
