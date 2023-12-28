"use client";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FallingLines } from "react-loader-spinner";
import * as Yup from "yup";

interface Iform {
  name: string;
  email: string;
  password: string;
  age: string;
  phone: string;
}
export default function FormSection() {
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const initialValues: Iform = {
    name: "",
    email: "",
    password: "",
    age: "",
    phone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .matches(
        /^[a-zA-Z]{3,}(\s[a-zA-Z]{3,})?$/,
        "Name must be more than 3 characters"
      ),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^[A-Z][A-Za-z0-9]{6,}$/, "Password is invalid"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required")
      .min(10, "Age must be at least 10 years")
      .max(90, "Age must less than 90 years"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^(02)?01[0125][0-9]{8}$/, "Phone is invalid"),
  });

  async function handleSubmit(values: Iform) {
    setloading(true);
    try {
      const { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        values
      );
      if (data.msg === "done") {
        toast.success("Register Successfully");
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      toast.error("Failed In Register");
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
            type="text"
            className="form-control "
            placeholder="Name..."
            value={formikObj.values.name}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            name="name"
          />
          {formikObj.errors.name && formikObj.touched.name ? (
            <span className="text-end text-danger w-100 d-inline-block mt-2">
              {formikObj.errors.name}
            </span>
          ) : (
            ""
          )}
        </div>

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

        <div className="mb-3">
          <input
            type="text"
            className="form-control "
            placeholder="Age..."
            value={formikObj.values.age}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            name="age"
          />
          {formikObj.errors.age && formikObj.touched.age ? (
            <span className="text-end text-danger w-100 d-inline-block mt-2">
              {formikObj.errors.age}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className=" mb-3">
          <input
            type="tel"
            className="form-control"
            placeholder="Phone..."
            value={formikObj.values.phone}
            onChange={formikObj.handleChange}
            onBlur={formikObj.handleBlur}
            name="phone"
          />
          {formikObj.errors.phone && formikObj.touched.phone ? (
            <span className="text-end text-danger w-100 d-inline-block mt-2">
              {formikObj.errors.phone}
            </span>
          ) : (
            ""
          )}
          <span className="login-link mt-2">
            <span>Already A Member?</span> <Link href="/login">Log In</Link>
          </span>
        </div>

        <button
          disabled={!formikObj.dirty || !formikObj.isValid}
          type="submit"
          className="btn btn-primary w-100"
        >
          {loading ? (
            <FallingLines color="#fff" width="22" visible={true} />
          ) : (
            "Register"
          )}
        </button>
      </form>
    </>
  );
}
