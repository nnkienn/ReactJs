// src/router.tsx
import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/Homepage";
import RoomDetailPage from "../pages/RoomDetailPage";
import AddRoomPage from "../pages/AddRoomPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/add", element: <AddRoomPage /> },
  { path: "/room/:id", element: <RoomDetailPage /> },
]);

export default router;
