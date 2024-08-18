import React, { Suspense, useEffect, useMemo } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { fetchUserData } from "../../redux/actions/noteActions";
import Login from "../../pages/LogIn/LogIn";
import SignUp from "../../pages/SignUp/SignUp";
import Homepage from "../../pages/Homepage/Homepage";
import LoadingSection from "../../components/LoadingScreen/LoadingSection";

const useAuth = () => {
  const username = useSelector((state: any) => state.userName);

  const isLoggedIn = !!username;
  const isFailed = username === "";
  const isLoading = username === null;

  useEffect(() => {
    const fetchAndLoadUser = async () => {
      await fetchUserData();
    };

    fetchAndLoadUser();
  }, []);

  return { isLoggedIn, isLoading, isFailed };
};

function RootLayout() {
  const { isLoggedIn, isLoading, isFailed } = useAuth();

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          path: "/",
          element: isLoggedIn ? (
            isLoading ? (
              <>Loading</>
            ) : (
              <Homepage />
            )
          ) : (
            <Navigate to="/users/signin" />
          ),
        },
        {
          path: "users/signin",
          element: isLoggedIn ? (
            <Navigate to="/" />
          ) : isLoading ? (
            <LoadingSection />
          ) : (
            <Login />
          ),
        },
        {
          path: "users/signup",
          element: isLoggedIn ? (
            <Navigate to="/" />
          ) : isLoading ? (
            <LoadingSection />
          ) : (
            <SignUp />
          ),
        },
        {
          path: "*",
          element: isLoggedIn ? <Navigate to="/" /> : <Navigate to="/users/signin" />,
        },
      ]),
    [isLoggedIn, isLoading]
  );

  return (
    <main className="min-h-screen bg-white bg-cover">
      <RouterProvider router={router} />
    </main>
  );
}

export default RootLayout;
