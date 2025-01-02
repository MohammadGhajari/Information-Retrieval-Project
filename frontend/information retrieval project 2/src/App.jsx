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
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { useEffect } from "react";
import { GlobalStyles } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function App() {
  const { email } = useSelector((state) => state.user);
  const { isDarkMode } = useSelector((state) => state.darkMode);

  const theme = createTheme({
    components: {
      MuiInputLabel: {
        style: {
          color: "var(--color-grey-3)",
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: "var(--color-grey-3)", // Input text color
          },
        },
      },
    },
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

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.style.setProperty(
          "var(--color-input)",
          "#4C4C4C"
        );

        document.documentElement.style.setProperty("--color-hero", "#3B3B3B");
        document.documentElement.style.setProperty("--color-grey-2", "#fff");
        document.documentElement.style.setProperty("--color-grey-3", "#eee");
        document.documentElement.style.setProperty("--color-grey-4", "#ddd");
        document.documentElement.style.setProperty("--color-grey-5", "#ccc");
        document.documentElement.style.setProperty("--color-grey-6", "#bbb");
        document.documentElement.style.setProperty(
          "--color-white-1",
          "#3B3B3B"
        ); //ok
        document.documentElement.style.setProperty(
          "--color-white-2",
          "#312f2f"
        );
        document.documentElement.style.setProperty("--color-white-3", "#444");
        document.documentElement.style.setProperty("--color-white-4", "#aaa");
        document.documentElement.style.setProperty(
          "--gradient-horizontal-footer",
          "linear-gradient(to right,rgb(2, 93, 52),rgb(4, 56, 102))"
        );
        document.documentElement.style.setProperty(
          "--gradient-vertical-footer",
          "linear-gradient(to bottom,rgb(2, 93, 52), rgb(4, 56, 102))"
        );
      } else {
        document.documentElement.style.setProperty(
          "var(--color-input)",
          "#f7f7f7"
        );

        document.documentElement.style.setProperty("--color-hero", "#fff");

        document.documentElement.style.setProperty("--color-grey-2", "#222");
        document.documentElement.style.setProperty("--color-grey-3", "#312f2f");
        document.documentElement.style.setProperty("--color-grey-4", "#444");
        document.documentElement.style.setProperty("--color-grey-5", "#aaa");
        document.documentElement.style.setProperty("--color-grey-6", "#cfcdcd");

        document.documentElement.style.setProperty("--color-white-1", "#fff");
        document.documentElement.style.setProperty("--color-white-2", "#eee");
        document.documentElement.style.setProperty("--color-white-3", "#ddd");
        document.documentElement.style.setProperty("--color-white-4", "#ccc");

        document.documentElement.style.setProperty(
          "--gradient-horizontal-footer",
          "linear-gradient(to right, var(--color-primary), var(--color-secondary))"
        );
        document.documentElement.style.setProperty(
          "--gradient-vertical-footer",
          "linear-gradient(to bottom, var(--color-primary), var(--color-secondary))"
        );
      }
    },
    [isDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ".MuiInputBase-root": {
            backgroundColor: `${isDarkMode ? "#4C4C4C" : "#f7f7f7"}`,
          },
        }}
      />

      {/* <style jsx global>{`
        ::placeholder {
          color: gray;
          font-size: 14px;
          opacity: 1;
        }
      `}</style> */}

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
