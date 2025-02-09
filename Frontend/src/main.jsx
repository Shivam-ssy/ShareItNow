import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store.js";
import App from "./App.jsx";
import ProtectedRoute from "./components/mainRoutes/ProtectedRoute.jsx";
import "./index.css";
import Login from "./components/RegistorPages/Login.jsx";
import "remixicon/fonts/remixicon.css";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import GetStarted from "./components/Page/GetStarted.jsx";
import SignUp from "./components/RegistorPages/Signup.jsx";
import Home from "./components/Home/Home.jsx";
import Download from "./components/Page/Download.jsx";
import Myfile from "./components/mainRoutes/Myfiles.jsx";
import SharePage from "./components/mainRoutes/Share.jsx";
import DirectShare from "./components/mainRoutes/DirectShare.jsx";
import Profile from "./components/mainRoutes/Profile.jsx";
import LandingPage from "./components/Page/LandingPage.jsx";
const data = localStorage.getItem("token");
const router = createBrowserRouter(
  createRoutesFromElements(
 
    <Route path="/" element={<App />}>
      <Route index path="/" element={
        <ProtectedRoute>
          <GetStarted />
        </ProtectedRoute>
      } />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<SignUp />} />
      <Route
        path="/Home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Home/share/upload"
        element={
          <ProtectedRoute>
            <SharePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Home/share/directshare"
        element={
          <ProtectedRoute>
            <DirectShare />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Home/myfile"
        element={
          <ProtectedRoute>
            <Myfile />
          </ProtectedRoute>
        }
      />
      <Route path="/download/:uuid" element={<GetStarted />} />
      <Route
        path="/home/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
