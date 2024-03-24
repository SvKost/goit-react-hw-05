import { useLocation } from "react-router-dom";
// import css from "./NotFoundPage.module.css";
import BackLink from "../../components/BackLink/BackLink";

export default function NotFoundPage() {
  const location = useLocation();
  const backLink = location.state?.from ?? "/";
  return (
    <section>
      <div>
        <h1>404</h1>
        <h2>Whoops...</h2>
        <p>Something went wrong. Try reloading the page.</p>
        <BackLink to={backLink}>Back to home</BackLink>
      </div>
    </section>
  );
}
