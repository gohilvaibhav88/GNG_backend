import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import AllCanteenPage from "./components/userCanteenInteraction/AllCanteenPage";
import Main3 from "./components/Main3";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import ResOwnerPage from "./components/ResOwnerPage";
import AllRestaurantsPage from "./components/AllRestaurantsPage";
import TiffinPage from "./components/TiffinService";
import AllTiffin from "./components/AllTiffin"; // ✅ Import AllTiffin component
import TiffinRequest from "./components/TiffinRequest";
import CanteenService from "./components/CanteenService";
import OwnerCanteenDashboard from "./components/OwnerCanteenDashboard";
import CanteenPage from "./components/userCanteenInteraction/CanteenPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Main3 />} />
        <Route path="/canteens" element={<AllCanteenPage />} />
        <Route path="/canteenpage/:canteenId" element={<CanteenPage />} />  {/* <-- dynamic route */}
        <Route path="/resowner" element={<ResOwnerPage />} />
        <Route path="/all-restaurants" element={<AllRestaurantsPage />} />
        <Route path="/tiffin" element={<TiffinPage />} />
        <Route path="/alltiffin" element={<AllTiffin />} /> {/* ✅ New route */}
        <Route path="/tiffinRequests" element={<TiffinRequest />} /> //{" "}
        <Route path="/canteenservice" element={<CanteenService />} /> //{" "}
        <Route path="/owner/canteen/:id" element={<OwnerCanteenDashboard/>} />

        {/* <-- New route */}
      </Routes>
    </Router>
  );
}

export default App;
