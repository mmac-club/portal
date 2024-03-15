import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import NavbarEvent from '../components/NavbarEvent'
import Footer from '../components/Footer'

export default function RootLayout() {
  return (
    <div>
        <Navbar />
        {/* <NavbarEvent></NavbarEvent> */}
        <Outlet />
        <Footer></Footer>
    </div>
  )
}
