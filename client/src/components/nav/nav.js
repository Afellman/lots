import React from "react";
import { Link } from 'react-router-dom'
import './nav.css';

const Nav = (props) => {
  return (
    <div className="nav-container">
      <div className="nav-links">
        <ul>
          <li>
            <Link className={window.location.pathname === "/" ? "active" : ""} to="/">New Batch</Link>
          </li>
          <li>
            <Link className={window.location.pathname === "/newlot" ? "active" : ""}  to="/newlot">New Lot</Link>
          </li>
          <li>
            <Link className={window.location.pathname === "/batches" ? "active" : ""}  to="/batches">Batches</Link>
          </li>
          <li>
            <Link className={window.location.pathname === "/totals" ? "active" : ""}  to="/totals">totals</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}


export default Nav;
