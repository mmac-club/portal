import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import LeagueRegistration from "./pages/LeagueRegistration";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/About";
import AccountSetting from "./pages/AccountSetting";

import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* <Route index element={<PrivateRoute path="/" component={Home} />} /> */}
      <Route index element={<Home />} />{" "}
      <Route path="signup" element={<SignUp />} />{" "}
      {/* No need for empty elements */}
      <Route path="signin" element={<SignIn />} />
      <Route path="league-registration" element={<LeagueRegistration />} />
      <Route path="about" element={<About />} />
      <Route path="account-setting" element={<PrivateRoute component={AccountSetting} />} />
      <Route path="dashboard" element={<PrivateRoute component={AdminDashboard} />} />
      {/* <Route path="home" element={<Dashboard />} /> */}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
