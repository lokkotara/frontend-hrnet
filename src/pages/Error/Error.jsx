import "./Error.scss";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <main className="errorContainer bg-dark">
      <h1 className="error-title">404</h1>
      <p className="error-text">Oops... Page not found</p>
      <Link to="/" className="error-link">
        Go back to home
      </Link>
    </main>
  );
};
