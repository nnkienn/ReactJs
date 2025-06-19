import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import RoomListPage from "./pages/RoomListPage";
import AddRoomPage from "./pages/AddRoomPage";
import RoomDetailPage from "./pages/RoomDetailPage";
import StatsPage from "./pages/StatsPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rooms" element={<RoomListPage />} />
            <Route path="/add-room" element={<AddRoomPage />} />
            <Route path="/rooms/:id" element={<RoomDetailPage />} />
            <Route path="/stats" element={<StatsPage />} />
        </Routes>
    )
}