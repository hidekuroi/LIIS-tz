import React, { FC } from "react"

const Card: FC<{
  children: Array<React.ReactNode> | React.ReactNode
}> = ({ children }): JSX.Element => {
  const childrenArray = React.Children.toArray(children)

  return (
    <div
      style={{
        width: "100%",
        borderRadius: 16,
        backgroundColor: "#fff",
        height: "100%",
        boxShadow: "0px 4px 33px rgba(0, 0, 0, 0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        {childrenArray ? childrenArray : children}
      </div>
    </div>
  )
}

export default Card
