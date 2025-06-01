import React from "react";
import TopBarSecondary from "./TopBarSecondary";

const Layout = ({ children }) => {
  return (
    <div className="">
      <TopBarSecondary />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
