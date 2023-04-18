import React from "react"

type InputPropsType = {
  value?: string | number
  title?: string
  type?: "text" | "email" | "password" | "number" | "date"
  error?: string
  validation?: boolean
  name?: string

  onChange?: (value: string) => void
  onBlur?: (name: string) => void
}

const Input = React.memo(
  ({
    value,
    onChange,
    title,
    type = "text",
    error,
    validation,
    name,
    onBlur,
  }: InputPropsType) => {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: 16,
            marginBottom: 7,
            color: error ? "#EB1717" : "#424242",
          }}
        >
          {title}
        </p>
        <div style={{ width: "100%", display: "flex" }}>
          <input
            style={{
              padding: 15,
              fontSize: 16,
              border: "1px solid #C9CACC",
              borderRadius: 4,
              color: error ? "#EB1717" : "#424242",
              width: "100%",
            }}
            type={type}
            name={name}
            value={value}
            autoComplete={"on"}
            min="1"
            onChange={(e) => onChange && onChange(e.currentTarget.value)}
            onBlur={(e) => onBlur && onBlur(e.currentTarget.name)}
          />
        </div>
        {validation && (
          <p
            style={{ fontSize: 12, color: "#EB1717", height: 12, marginTop: 7 }}
          >
            {error}
          </p>
        )}
      </div>
    )
  }
)

export default Input
