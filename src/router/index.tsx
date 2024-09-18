import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PageNotFound from "../pages/PageNotFound";
import RootLayout from "../pages/Layout";
import ErrorHandler from "../components/errors/ErrorHandler";
import HomePage from "../pages";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";

// const isLoggedIn = false;
// const userData: { email: string } | null = isLoggedIn ? { email: "email@gmail.com" } : null;

const userDataStored=JSON.parse(` ${localStorage.getItem('StrapiToDoUserData')}`)


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />}>
        <Route
          index
          element={
            <ProtectedRoute isAllowed={userDataStored} redirectPath="/login" data={userDataStored}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAllowed={userDataStored} redirectPath="/login" data={userDataStored}>
            <h3 className="text-center bg-gray-400 text-indigo-600 py-3" > hello welcom to profile </h3>
            </ProtectedRoute>
          }
        />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!userDataStored} redirectPath="/" data={userDataStored}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!userDataStored} redirectPath="/login" data={userDataStored}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Page Not Found */}
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default router;
