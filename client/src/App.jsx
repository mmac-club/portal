import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import LeagueRegistration from "./pages/LeagueRegistration";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="/" element={<PrivateRoute component={Dashboard} />} />
      <Route path="signup" element={<SignUp></SignUp>}></Route>
      <Route path="signin" element={<SignIn></SignIn>}></Route>
      <Route
        path="league-registration"
        element={<LeagueRegistration></LeagueRegistration>}
      ></Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
