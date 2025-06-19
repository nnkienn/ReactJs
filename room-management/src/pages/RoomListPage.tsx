import { useState } from "react";
import RoomList from "../components/RoomList";
import { useRoom } from "../RoomContext";



export default function RoomListPage() {
  const {
    roomsList,
    handleDeleteRoom, FilterRoomType
  } = useRoom();
  type FilterType = "all" | "available" | "occupied"
  const [filterType, setFilterType] = useState<FilterType>("available")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRooms = FilterRoomType(roomsList, filterType).filter(room => 
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  )


  return (
    <div>
      <h1 className="text-xl font-bold mb-4">📄 Danh sách phòng</h1>
      <input type="text" name="" id="" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}   placeholder="🔍 Tìm phòng theo tên..."/>
      <select value={filterType} onChange={(e) => setFilterType(e.target.value as FilterType)}>
        <option value="all">All</option>
        <option value="available">available</option>
        <option value="occupied">occupied</option>
      </select>
      <RoomList
        rooms={filteredRooms}
        onDeleteRoom={handleDeleteRoom}
      />

    </div>
  )
}
