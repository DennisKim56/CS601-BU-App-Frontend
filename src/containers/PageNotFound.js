import { Link } from "react-router-dom";

import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <>
      <div className="error-container">
        404 <i className="fa-solid fa-triangle-exclamation"></i>
      </div>
      <Link to="/" className="error-return-link">
        <i class="fa-solid fa-arrow-left return-icon"></i>
        Return to Home
      </Link>
    </>
  );
};

export default PageNotFound;
