import { Link } from "react-router-dom"
import logo from "../images/logo.svg"

export default function Header() {
  const handleOpenMenu = () => {
    const navbar = document.querySelector(".navbar")
    const listItems = document.querySelectorAll("li")

    navbar.classList.toggle("open")
    listItems.forEach((listItem) => {
      listItem.addEventListener("click", () => {
        navbar.classList.remove("open")
      })
    })
  }

  return (
    <>
      <header className="absolute top-0 left-0 p-5 flex items-center justify-between w-full lg:py-0">
        <div>
          <Link to="/">
            <img src={logo} alt="SpaceX" className="w-16 lg:w-auto" />
          </Link>
        </div>

        <nav className="navbar">
          <ul className="">
            <li>
              <Link to="/capsules">Capsules</Link>
            </li>
            <li>
              <Link to="/cores">Cores</Link>
            </li>
            <li>
              <Link to="/crew">Crew</Link>
            </li>
            <li>
              <Link to="/dragons">Dragons</Link>
            </li>
            <li>
              <Link to="/landpads">Landpads</Link>
            </li>
            <li>
              <Link to="/launches">Launches</Link>
            </li>
            <li>
              <Link to="/launchpads">Launchpads</Link>
            </li>
            <li>
              <Link to="/payloads">Payloads</Link>
            </li>
            <li>
              <Link to="/roadster">Roadster</Link>
            </li>
            <li>
              <Link to="/rockets">Rockets</Link>
            </li>
            <li>
              <Link to="/ships">Ships</Link>
            </li>
            <li>
              <Link to="/starlink">Starlink</Link>
            </li>
          </ul>
        </nav>

        <div className="lg:hidden">
          <button
            onClick={handleOpenMenu}
            className="menu-button text-white uppercase text-sm tracking-wide"
          >
            Menu
          </button>
        </div>
      </header>
    </>
  )
}
