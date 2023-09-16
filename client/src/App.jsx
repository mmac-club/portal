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
        <Route index element={<PrivateRoute path="/" component={Dashboard} />} />
        <Route path="signup" element={<SignUp />} /> {/* No need for empty elements */}
        <Route path="signin" element={<SignIn />} />
        <Route path="league-registration" element={<LeagueRegistration />} />
      </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
