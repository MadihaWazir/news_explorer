import "./NotFound.css";
import NotFoundPic from "../../images/not-found-pic.svg";

function NotFound() {
  return (
    <div className="not-found">
      <img src={NotFoundPic} alt="Not Found" className="not-found__image" />
      <h2 className="not-found__title">No results found</h2>
      <p className="not-found__message">
        Sorry, but nothing matched your search terms.
      </p>
    </div>
  );
}

export default NotFound;
