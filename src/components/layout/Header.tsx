import logo from "../../assets/logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      <nav className="header__nav">
          <button className="btn">Users</button>
          <button className="btn">Sign up</button>
        </nav>
    </header>
  )
}