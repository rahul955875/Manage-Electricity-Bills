import { createContext, useContext, useState } from "react";

const userFormContext = createContext(false);
export const CreateUserContext = ({ children }) => {
  const [openUserForm, setOpenUserForm] = useState(false);
  return (
    <userFormContext.Provider value={[openUserForm, setOpenUserForm]}>
      {children}
    </userFormContext.Provider>
  );
};

export const useOpenUserForm = () => useContext(userFormContext);
