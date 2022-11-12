import "./Footer.scss";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>By</p>
      <img src="./images/logo site.svg" alt="" className="logoFooter" />
      <p>, Copyright &copy; {year}</p>
    </footer>
  );
}
