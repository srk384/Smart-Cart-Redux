import Dashboard from "../compnonents/Dashboard"
import Navbar from "../compnonents/Navbar"
import Footer from "../compnonents/Footer"
import { useSelector } from "react-redux"

const ProfilePage = () => {
    const { user } = useSelector((state) => state.productData);
  
  return (
    <div>
      <Navbar/>
      <Dashboard user = {user}/>  //pass user here
      <Footer/>
    </div>
  )
}

export default ProfilePage
