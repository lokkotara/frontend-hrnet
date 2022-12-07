import "./Error.scss";
import { NavLink } from "react-router-dom";

export default function Error() {
  return (
    <main class="errorContainer bg-dark">
      <h1 class="error-title">404</h1>
      <p class="error-text">Oops... Page not found</p>
      <NavLink class="error-link" to="/">
        Go back to home
      </NavLink>
    </main>
  );
};
