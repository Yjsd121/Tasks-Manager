import { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [UserData, setUserData] = useState({})

  return (
    <UserContext.Provider
      value={{
        UserData,
        setUserData
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const UserDcontext = () => useContext(UserContext)
