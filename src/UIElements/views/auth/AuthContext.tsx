import { IApplicationConfig } from "UIElements/models/IApplicationConfig";
import * as React from "react";
import { createContext } from "react";

interface AuthContextInterface {
    isAuthenticated: boolean;
    defaultApp: IApplicationConfig | null;
    setIsAuthenticated: React.Dispatch<boolean>;
    setDefaultApp: React.Dispatch<IApplicationConfig | null>;
  }
  
  const AuthContext = createContext<AuthContextInterface | null>(null);
  
  interface Props {
    children: React.ReactNode;
  }
  
  function AuthContextProvider({ children }: Props) {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [defaultApp, setDefaultApp] = React.useState<IApplicationConfig | null>(null);

    const authContext: AuthContextInterface = {
      isAuthenticated,
      defaultApp,
      setIsAuthenticated,
      setDefaultApp
    };
  
    return (
      <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
    );
  }
  
export { AuthContext, AuthContextProvider };