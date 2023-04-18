import React from "react"
import c from "../styles/Button.module.css"
import styled from "styled-components"

type ButtonPropsType = {
  title?: string

  onClick?: (a: any) => void
}

const Button = ({ title, onClick }: ButtonPropsType) => {
  return (
    <div style={{ width: "100%" }}>
      <button
        onClick={onClick}
        className={c.button}
      >
        {title}
      </button>
    </div>
  )
}

export default Button
