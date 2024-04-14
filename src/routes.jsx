import Layout from "@components/layout";
import ErrorPage from "@pages/ErrorPage";
import Home from "@pages/Home";
import RecipeList from "@pages/recipe/RecipeList";
import RecipeDetail from "@pages/recipe/RecipeDetail";
import TodayRecipeList from "@pages/todayRecipe/TodayRecipeList";
import Login from "@pages/user/Login";
import { createBrowserRouter } from "react-router-dom";
import MyRecipeRegister from "@pages/myRecipe/MyRecipeRegister";
import Signup from "@pages/user/Signup";
import MyPage from "@pages/user/MyPage";
import SignupStepOne from "@pages/user/SignupStepOne";
import SignupStepTwo from "@pages/user/SignupStepTwo";
import SignupStepThree from "@pages/user/SignupStepThree";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/recipe/list", element: <RecipeList /> },
      { path: "/recipe/list/:name", element: <RecipeDetail /> },
      { path: "/today/list", element: <TodayRecipeList /> },
      { path: "/user/login", element: <Login /> },
      { path: "/user/signup", element: <Signup /> },
      { path: "/user/mypage", element: <MyPage /> },
      { path: "/user/signupStepOne", element: <SignupStepOne /> },
      { path: "/user/signupStepTwo", element: <SignupStepTwo /> },
      { path: "/user/signupStepThree", element: <SignupStepThree /> },
      { path: "/myrecipe/register", element: <MyRecipeRegister /> },
    ],
  },
]);

export default router;
