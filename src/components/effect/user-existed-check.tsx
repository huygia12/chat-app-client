import { useAuth } from "@/utils/custom-hook";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const UserExistedCheck: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { getUserDecoded, accessToken } = useAuth();

  return (
    <>
      {getUserDecoded(accessToken) ? (
        <Navigate to="/messages" replace={true} />
      ) : (
        children
      )}
    </>
  );
};

export default UserExistedCheck;
