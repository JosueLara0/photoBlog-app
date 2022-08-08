//* libraries
import { Route, Routes, Navigate } from "react-router-dom";
//* pages
import { BlogPage } from "../pages/BlogPage";

export const BlogRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogPage />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};
