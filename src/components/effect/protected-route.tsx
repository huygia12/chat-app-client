import { useCurrUser } from "@/utils/custom-hook";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<{
  children: ReactNode;
  allowedRoles?: string[];
}> = ({ children, allowedRoles }) => {
  const { currUser } = useCurrUser();
  const location = useLocation();

  return (
    <>
      {currUser ? (
        !allowedRoles ? (
          children
        ) : allowedRoles.find((role) => role === currUser.role) ? (
          children
        ) : (
          <Navigate
            to="/unauthorized"
            state={{ from: location, unstable_useViewTransitionState: true }}
            replace={true}
          />
        )
      ) : (
        <Navigate
          to="/login"
          state={{ from: location, unstable_useViewTransitionState: true }}
          replace={true}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
