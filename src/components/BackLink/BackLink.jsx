import { useRef } from "react";
import css from "./BackLink.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export default function BackLink({ children }) {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");

  return (
    <NavLink className={css.backlink} to={backLinkRef.current}>
      <BsArrowLeft className={css.backlinkArrow} />
      {children}
    </NavLink>
  );
}
