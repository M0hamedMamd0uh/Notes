import Image from "next/image";
import Link from "next/link";
import registerImg from "../../../public/login_image.svg";
import LoginForm from "./LoginForm/LoginForm";
import "../register/register.scss";
export default function Login() {
  return (
    <>
      <div className="container ">
        <div className="row g-4 auth-page">
          <div className="col-lg-6 auth-image">
            <div>
              <Image
                src={registerImg}
                alt={"registerImg"}
                priority={true}
                width={500}
                height={500}
              />
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="form">
              <h2>
                <span>Welcome&nbsp;</span>
                <span>
                  Back<span className="dot">.</span>
                </span>
              </h2>
              <LoginForm />
              <span className="signUp-link mt-2">
                <span>{"Don't have an account?"}</span>{" "}
                <Link href="/register">Sign Up</Link>
              </span>
            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
