import React, { FormEvent, useEffect, useState } from "react"
import classes from "../styles/Login.module.css"
import styled from "styled-components"
import Card from "../components/Card"
import Input from "../components/Input"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"

const Btn = styled.button`
  background: "linear-gradient(104.34deg, #41522E -15.34%, #BE8022 145.95%)";
  border-radius: 4;
  border: "1px solid black";
  width: "100%";
  padding: 15;
  color: "red";
  font-size: 16;
  font-weight: 500;
`

const Login = () => {
  const [emailValue, setEmailValue] = useState<string>("")
  const [passwordValue, setPasswordValue] = useState<string>("")

  const [emailTouched, setEmailTouched] = useState<boolean>(false)
  const [passwordTouched, setPasswordTouched] = useState<boolean>(false)

  const [emailError, setEmailError] = useState<string>(
    "Поле не может быть пустым"
  )
  const [passwordError, setPasswordError] = useState<string>(
    "Поле не может быть пустым"
  )

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("isAuth") === "true") navigate("/hotels")
  }, [])

  const signInHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (emailValue === "user@mail.ru" && passwordValue === "password") {
      localStorage.setItem("isAuth", "true")
      navigate("/hotels")
    }
  }

  const emailHandler = (text: string) => {
    setEmailValue(text)
    if (!text) setEmailError("Поле не может быть пустым")
    else {
      const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      if (!re.test(text.toLowerCase())) setEmailError("Некорректный Email")
      else setEmailError("")
    }
  }

  const passwordHandler = (text: string) => {
    setPasswordValue(text)
    if (!text) setPasswordError("Поле не может быть пустым")
    else {
      const re = /^[a-zA-Z0-9!@#$%^&*]{8,32}$/
      if (!re.test(text.toLowerCase())) setPasswordError("Некорректный пароль")
      else setPasswordError("")
    }
  }

  const blurHandler = (name: string) => {
    switch (name) {
      case "email":
        setEmailTouched(true)
        break
      case "password":
        setPasswordTouched(true)
        break
      default:
        return
    }
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.backgroundImage}>
        <div className={classes.backgroundColor} />
      </div>
      <div className={classes.formWrapper}>
        <div
          style={{
            width: "409px",
            height: "382px",
            position: "absolute",
            right: 0,
            left: 0,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Card>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 32,
                  height: "100%",
                  justifyContent: "space-around",
                }}
              >
                <h2 style={{ textAlign: "center" }}>Simple Hotel Check</h2>
                <form
                  onSubmit={(e) => signInHandler(e)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      height: "100%",
                      gap: 17,
                    }}
                  >
                    <Input
                      title="Логин"
                      value={emailValue}
                      type="email"
                      onChange={emailHandler}
                      error={
                        emailTouched && emailError ? emailError : undefined
                      }
                      validation
                      onBlur={blurHandler}
                      name="email"
                    />
                    <Input
                      title="Пароль"
                      type="password"
                      value={passwordValue}
                      error={
                        passwordTouched && passwordError
                          ? passwordError
                          : undefined
                      }
                      onChange={passwordHandler}
                      validation
                      onBlur={blurHandler}
                      name="password"
                    />
                  </div>
                  <div style={{ marginTop: 8 }}>
                    <Button title="Войти" onClick={signInHandler} />
                  </div>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login
