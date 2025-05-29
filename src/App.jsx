import "./App.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import {
  Box,
  createTheme,
  CssBaseline,
  IconButton,
  Typography,
} from "@mui/material";
import { Toaster } from "react-hot-toast";
import ErrorBoundry from "./utils/ErrorBoundry";
import { ThemeProvider } from "@emotion/react";
import { ThemeContext, useTheme } from "./utils/ThemeContext";

const CreateUser = lazy(() => import("./DashBoard/CreateUser"));
const UserDashboard = lazy(() => import("./DashBoard/UserDashboard"));
const CreateBill = lazy(() => import("./FormComponents/CreateBill"));
const AdminDashboard = lazy(() => import("./DashBoard/AdminDashboard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThemeContext>
        <App />
      </ThemeContext>
    ),
    errorElement: (
      <Typography sx={{ textAlign: "center" }} variant="h2">
        404 NOT FOUND
      </Typography>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense
            fallback={
              <Typography variant="h2" sx={{ textAlign: "center", mt: 4 }}>
                Loading...
              </Typography>
            }
          >
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "/create-user",
        element: (
          <Suspense
            fallback={
              <Typography variant="h2" sx={{ textAlign: "center", mt: 4 }}>
                Loading...
              </Typography>
            }
          >
            <CreateUser />,
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense
            fallback={
              <Typography variant="h2" sx={{ textAlign: "center", mt: 4 }}>
                Loading...
              </Typography>
            }
          >
            <UserDashboard />,
          </Suspense>
        ),
      },
      {
        path: "/create-bill",
        element: (
          <Suspense
            fallback={
              <Typography variant="h2" sx={{ textAlign: "center", mt: 4 }}>
                Loading...
              </Typography>
            }
          >
            <CreateBill />,
          </Suspense>
        ),
      },
    ],
  },
]);
function App() {
  const [isDark, setIsDark] = useTheme();
  const theme = createTheme({
    palette: {
      mode: isDark ? "dark" : "light",
    },
  });
  return (
    <>
      {/* {createPortal(<CreateUser />, document.body)} */}
      <ErrorBoundry
        fallback={
          <Typography variant="subtitle2">Something went wrong!!! </Typography>
        }
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toaster />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={() => setIsDark((prev) => !prev)}>
              <DarkModeIcon />
            </IconButton>
          </Box>
          <Outlet />
        </ThemeProvider>
      </ErrorBoundry>
    </>
  );
}

export default App;
