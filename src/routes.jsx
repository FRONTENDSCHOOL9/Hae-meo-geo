import Layout from "@components/layout";
import Home from "@pages/Home";
import ErrorPage from "@pages/ErrorPage";
import Recipe from "@pages/recipe/RecipeList";
import TodayRecipe from "@pages/todayRecipe/TodayRecipeList";
import Login from "@pages/user/Login";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/recipe/list", element: <Recipe /> },
      { path: "/today/list", element: <TodayRecipe /> },
      { path: "/user/login", element: <Login /> },
    ],
  },
]);

export default router;
