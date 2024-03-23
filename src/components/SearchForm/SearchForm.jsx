import toast, { Toaster } from "react-hot-toast";
// import css from "./SearchForm.module.css";

export default function SearchForm({ onSearch }) {
  const notify = () =>
    toast("Please enter your query!", {
      position: "top-right",
    });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const form = evt.target;
    const query = form.elements.query.value.trim();

    if (query === "") {
      notify();
    } else {
      onSearch(query);
    }
    form.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="off"
          name="query"
          autoFocus
          placeholder="Search movie"
        />
        <button type="submit">Search</button>
      </form>
      <Toaster />
    </>
  );
}
