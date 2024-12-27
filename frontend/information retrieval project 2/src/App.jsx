import { ToastContainer, toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Analyzer from "./pages/Analyzer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Home from "./pages/Home";
import WebsiteDetail from "./pages/WebsiteDetail";
import Dashboard from "./pages/Dashboard";
import PersonalInformation from "./pages/PersonalInformation";
import Security from "./pages/Security";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import AddWebsite from "./pages/AddWebsite";
import DeleteWebsite from "./pages/DeleteWebsite";
import EditWebsite from "./pages/EditWebsite";
import PageNotFound from "./pages/PageNotFound";
import AddKeyword from "./pages/AddKeyword";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/base.module.css";
import { useSelector } from "react-redux";

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontFamily: "Rajdhani",
  },
  palette: {
    primary: {
      main: "#42d392",
      tint1: "#88d6b3",
      tint2: "#a5cbba",
      shade1: "#02d878",
      shade2: "#039c57",
    },
    secondary: {
      main: "#589cd9",
      tint1: "#70a6d5",
      tint2: "#8ab2d5",
      shade1: "#268be3",
      shade2: "#3f92db",
    },
  },
});

export default function App() {
  const { email } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Home />} />
            {/* <Route path={"/websites/:websiteID"} element={<WebsiteDetail />} /> */}
            {email && <Route path={"/add-website"} element={<AddWebsite />} />}
            {email && (
              <Route path={"/delete-website"} element={<DeleteWebsite />} />
            )}
            {email && (
              <Route path={"/edit-website"} element={<EditWebsite />} />
            )}
            {email && (
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<PersonalInformation />} />
                <Route
                  path="personal-information"
                  element={<PersonalInformation />}
                />
                <Route path="security" element={<Security />} />
                <Route path="add-keyword" element={<AddKeyword />} />
                <Route path="analyze" element={<Analyzer />} />
              </Route>
            )}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={10}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme={"light"}
        transition:Slide
      />
    </ThemeProvider>
  );
}
