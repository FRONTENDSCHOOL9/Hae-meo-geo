import Layout from "@components/layout";
import ErrorPage from "@pages/ErrorPage";
import Home from "@pages/Home";
import RecipeList from "@pages/recipe/RecipeList";
import RecipeDetail from "@pages/recipe/RecipeDetail";
import TodayRecipeList from "@pages/todayRecipe/TodayRecipeList";
import Login from "@pages/user/Login";
import { createBrowserRouter } from "react-router-dom";
import MyRecipeRegister from "@pages/myRecipe/MyRecipeRegister";
import MyRecipeList from "@pages/myRecipe/myRecipeList/MyRecipeList";
import Kakao from "@pages/auth/Kakao";
import Signup from "@pages/user/Signup";
import SignupStepOne from "@pages/user/SignupStepOne";
import SignupStepTwo from "@pages/user/SignupStepTwo";
import SignupStepThree from "@pages/user/SignupStepThree";
import MyRecipeDetail from "@pages/myRecipe/MyRecipeDetail";
import MyPage from "@pages/mypage/MyPage";
import BookMark from "@pages/mypage/BookMark";
import EditProfile from "@pages/mypage/EditProfile";

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
      { path: "/user/signupStepOne", element: <SignupStepOne /> },
      { path: "/user/signupStepTwo", element: <SignupStepTwo /> },
      { path: "/user/signupStepThree", element: <SignupStepThree /> },
      { path: "/mypage/mypage", element: <MyPage /> },
      { path: "/mypage/bookmark", element: <BookMark /> },
      { path: "/mypage/editprofile", element: <EditProfile /> },
      { path: "/myrecipe/register", element: <MyRecipeRegister /> },
      { path: "/myrecipe/list", element: <MyRecipeList /> },
      { path: "/myrecipe/list/:_id", element: <MyRecipeDetail /> },
      { path: "/auth/kakao", element: <Kakao /> },
    ],
  },
]);

export default router;
