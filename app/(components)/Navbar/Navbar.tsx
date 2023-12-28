import Link from "next/link";
import "./Navbar.scss";
import Search_Logout_Comp from "./Search_Logout_Comp/Search_Logout_Comp";
export default function Navbar() {  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" href="/">
            NOTES
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ">
              <Search_Logout_Comp />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
