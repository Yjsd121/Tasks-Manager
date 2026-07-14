import { createContext, useContext, useState, type ReactNode } from "react";

interface UserContextType {
  UserData: {};
  setUserData: React.Dispatch<React.SetStateAction<{}>>;
}

const UserContext = createContext<UserContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [UserData, setUserData] = useState({});

  return (
    <UserContext.Provider
      value={{
        UserData,
        setUserData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserDcontext = () => useContext(UserContext);
