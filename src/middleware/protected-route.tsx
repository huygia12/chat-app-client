import Role from "@/types/enums/role";
import { UserDecoded } from "@/types/api";
import { useAuth } from "@/hooks";
import { Nullable } from "@/utils/declare";
import { ReactNode, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute: React.FC<{
  children: ReactNode;
  allowedRoles?: Role[];
}> = ({ children, allowedRoles }) => {
  const { getUserDecoded } = useAuth();
  const location = useLocation();

  const userDecoded: Nullable<UserDecoded> = useMemo(
    () => getUserDecoded(),
    [getUserDecoded]
  );

  return (
    <>
      {userDecoded ? (
        !allowedRoles ? (
          children
        ) : allowedRoles.find((role) => role === userDecoded.role) ? (
          children
        ) : (
          <Navigate
            to="/unauthorized"
            state={{
              from: location.pathname,
              unstable_useViewTransitionState: true,
            }}
            replace={true}
          />
        )
      ) : (
        <Navigate
          to="/login"
          state={{ from: location.pathname }}
          replace={true}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
