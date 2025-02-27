import "./Header.scss";
import Logo from "../logo/Logo";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <Logo />
      { location.pathname !== "/" ? <a href="/">Back to samples</a> : null}
    </div>
  );
};

export default Header;