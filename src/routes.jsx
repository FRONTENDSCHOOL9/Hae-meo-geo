import Layout from "@components/layout";
import ErrorPage from "@pages/ErrorPage";
import Home from "@pages/Home";
import RecipeList from "@pages/recipe/RecipeList";
// import RecipeDetail from "@pages/recipe/RecipeDetail";
import TodayRecipeList from "@pages/todayRecipe/TodayRecipeList";
import Login from "@pages/user/Login";
import MyPage from "@pages/user/MyPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/recipe/list", element: <RecipeList /> },
      // { path: "/recipe/list/:id", element: <RecipeDetail /> },
      { path: "/today/list", element: <TodayRecipeList /> },
      { path: "/user/login", element: <Login /> },
      { path: "/user/mypage", element: <MyPage /> },
    ],
  },
]);

export default router;
