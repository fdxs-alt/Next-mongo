import React from "react";
import { wrapper } from "../styles/layout.module.scss";
const Layout: React.FC = ({ children }) => {
  return <div className={wrapper}>{children}</div>;
};

export default Layout;
