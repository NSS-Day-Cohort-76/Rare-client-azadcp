import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"

export const Rare = () => {
  const [token, setToken] = useState(window.localStorage.getItem("rare_token"))
  const [currentUserId, setCurrentUserId] = useState(null)

  return (
    <>
      <NavBar
        token={token}
        setToken={setToken}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />
      <ApplicationViews
        token={token}
        setToken={setToken}
        currentUserId={currentUserId}
        setCurrentUserId={setCurrentUserId}
      />
    </>
  )
}

