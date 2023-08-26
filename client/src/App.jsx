
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/Signup'
import LeagueRegistration from './pages/LeagueRegistration'
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="signup" element = {<AuthProvider><SignUp></SignUp></AuthProvider>}></Route>
      <Route path="signin" element = {<SignIn></SignIn>}></Route>
      <Route path="league-registration" element = {<LeagueRegistration></LeagueRegistration>}></Route>
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
