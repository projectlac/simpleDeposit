import { FC, useState, createContext, useEffect } from 'react';
type SidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  localToggle: boolean;
  toggleLocal: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [localToggle, setLocalToggle] = useState(
    JSON.parse(localStorage.getItem('toggle')) || false
  );
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };
  const toggleLocal = () => {
    setLocalToggle(!localToggle);
  };

  useEffect(() => {
    const toggle = Boolean(localStorage.getItem('toggle'));
    if (toggle) {
      setLocalToggle(JSON.parse(localStorage.getItem('toggle')));
    } else {
      setLocalToggle(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toggle', localToggle.toString());
  }, [localToggle]);

  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, localToggle, toggleLocal }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
