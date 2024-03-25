import { useRef } from "react";
import css from "./BackLink.module.css";
import { NavLink, useLocation } from "react-router-dom";
// import { BiArrowBack } from "react-icons/bi";uter-dom";

export default function BackLink({children }) {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  return (
    <NavLink className={css.backlink} to={backLinkRef.current}>{children}</NavLink>
  );
}
