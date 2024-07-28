import { useAuth } from "@/utils/custom-hook";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserExistedCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getUserDecoded, token } = useAuth();

  return (
    <>
      {getUserDecoded(token) ? (
        <Navigate to="/test" replace={true} />
      ) : (
        children
      )}
    </>
  );
};

export default UserExistedCheck;
