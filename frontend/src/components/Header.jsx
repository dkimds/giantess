import logo from '../assets/logo.png'
const Header = () => {
  return (
    <div className="container">

      <nav className="navbar">
        <a href="#">
          <img src={logo} alt="logo"/>
          <p className="logo-text">자연티스</p>
        </a>
      </nav>
    </div>
  )
}

export default Header