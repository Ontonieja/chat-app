import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Auth from "./pages/Auth.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import Profile from "./pages/Profile.tsx";
import { AuthRoute, ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { Toaster } from "sonner";
import Chat from "./pages/Chat.tsx";
import { ChatContextProvider } from "./context/ChatContext.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: (
      <AuthRoute>
        <Auth />
      </AuthRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatContextProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster closeButton />
      </AuthProvider>
    </ChatContextProvider>
  </StrictMode>
);
