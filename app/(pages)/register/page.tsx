import Image from "next/image";
import registerImg from "../../../public/login_image.svg";
import FormSection from "./RegisterForm/RegisterForm";
import "./register.scss";
export default function Register() {
  return (
    <>
      <div className="container ">
        <div className="row g-4 auth-page">
          <div className="col-12 col-lg-6">
            <div className="form">
              <h2>
                <span>Create</span> <br />
                <span>
                  New Account<span className="dot">.</span>
                </span>
              </h2>
           <FormSection />
            </div>
          </div>
          <div className="col-lg-6 auth-image">
            <div>
              <Image
                src={registerImg}
                alt={"registerImg"}
                width={450}
                height={450}
                priority={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
