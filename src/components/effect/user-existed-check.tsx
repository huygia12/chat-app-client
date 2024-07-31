import { useAuth } from "@/utils/custom-hook";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserExistedCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getUserDecoded } = useAuth();

  return (
    <>
      {getUserDecoded() ? <Navigate to="/messages" replace={true} /> : children}
    </>
  );
};

export default UserExistedCheck;
