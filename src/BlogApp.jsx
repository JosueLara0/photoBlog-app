//* Router
import { AppRouter } from "./router/AppRouter";
//* theme
import { AppTheme } from "./theme/AppTheme";

export const BlogApp = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
