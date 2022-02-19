import { createContext, useContext, useState } from "react";

export interface HeaderTitleContextType {
  title: string;
  setHeaderTitle: (param: string) => void;
}


const headerTitleContextDefaultVal: HeaderTitleContextType = {
  title: "Dashboard",
  setHeaderTitle: () => {},
};

const HeaderTitleContext = createContext<HeaderTitleContextType>(headerTitleContextDefaultVal);

const HeaderTitleProvider = ({ children }) => {
  const [title, setTitle] = useState<string>(headerTitleContextDefaultVal.title);

  const setHeaderTitle = (title: string) => {
    setTitle(title);
  };

  return (
    <HeaderTitleContext.Provider
      value={{
        title,
        setHeaderTitle,
      }}
    >
      {children}
    </HeaderTitleContext.Provider>
  );
};

const useHeaderTitle= () => {
  const context = useContext(HeaderTitleContext);

  if (!context)
    throw new Error("useSlider must be used inside a `SliderProvider`");

  return context;
};

export { HeaderTitleProvider, useHeaderTitle };
