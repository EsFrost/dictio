import { Outlet, Link } from "react-router-dom";

const VocLayout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/vocabulary/administration">Administration</Link>
          </li>
          <li>
            <Link to="/vocabulary/vocabulary">Dictionary</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default VocLayout;