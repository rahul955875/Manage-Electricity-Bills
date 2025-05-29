import { useState } from "react";
import { createContext, useContext } from "react";

const editingContext = createContext();

export const EditingContext = ({ children }) => {
  const [isEditUserMode, setIsEditUserMode] = useState(false);
  return (
    <editingContext.Provider value={[isEditUserMode, setIsEditUserMode]}>
      {children}
    </editingContext.Provider>
  );
};

export const useIsUserEditMode = () => useContext(editingContext);
