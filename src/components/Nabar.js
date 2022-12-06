import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearStore } from "../features/user/userSlice";

import { logOutUser, toggleSidebar } from "../features/user/userSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [showLogOut, setShowLogout] = useState(false);

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          type="button"
          onClick={() => dispatch(toggleSidebar())}
        >
          <FaAlignLeft></FaAlignLeft>
        </button>
        <div>
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogOut);
            }}
          >
            <FaUserCircle></FaUserCircle>
            {user?.name}
            <FaCaretDown></FaCaretDown>
          </button>
          <div className={showLogOut ? "dropdown show-dropdown" : "dropdown"}>
            <button
              className="dropdown-btn"
              onClick={() => {
                setShowLogout(!showLogOut);
                dispatch(clearStore("Logging out..."));
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
