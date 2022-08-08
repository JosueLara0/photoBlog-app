//* libraries
import { Route, Routes, Navigate } from "react-router-dom";
//* routes
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { BlogRoutes } from "../blog/routes/BlogRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
//* hooks
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
  const status = useCheckAuth();

  if (status === "checking") return <CheckingAuth />;

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<BlogRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="/*" element={<Navigate to="./auth/login" />} />
    </Routes>
  );
};
