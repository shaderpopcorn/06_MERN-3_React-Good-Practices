import { Outlet, Link } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div>
      <header>
        <h1>Shaderpopcorn's Games</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© by Shaderpopcorn</p>
      </footer>
    </div>
  );
};

export default Layout;
