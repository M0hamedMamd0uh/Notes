import Image from "next/image";
import React from "react";
import notFoundImg from "../public/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="not-found ">
        <Image src={notFoundImg} alt="notFoundImg" priority={true} />
      </div>
    </>
  );
}
