import AddButton from "./AddButton/AddButton";
import MasterHome from "./MasterHome/MasterHome";
import "./Home.scss";
import UpdateForm from "./UpdateForm/UpdateForm";
import Navbar from "../Navbar/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="container py-5 ">
        <UpdateForm />
        <AddButton />
        <div className="row g-4">
          <MasterHome />
        </div>
      </div>
    </>
  );
}
