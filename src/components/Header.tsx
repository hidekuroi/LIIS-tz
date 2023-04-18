import React from "react"
import logout from "../assets/log out.svg"
import { useNavigate } from "react-router-dom"

const Header = () => {
  const navigate = useNavigate()

  const logoutHandler = () => {
    localStorage.removeItem("isAuth")
    navigate("/login")
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 32,
      }}
    >
      <h2 style={{ color: "#424242" }}>Simple Hotel Check</h2>
      <div>
        <button
          style={{
            border: "none",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            gap: 15,
            color: "#41522E",
            cursor: "pointer",
          }}
          onClick={logoutHandler}
        >
          <span style={{ fontSize: 16, fontWeight: 400 }}>Выйти</span>
          <img color="#41522E" src={logout} height={18} />
        </button>
      </div>
    </div>
  )
}

export default Header
