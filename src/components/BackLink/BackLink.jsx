// import css from "./BackLink.module.css";
// import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function BackLink({ to, children }) {
  return (
    <Link to={to}>
      {/* <BiArrowBack /> */}
      {children}
    </Link>
  );
}
