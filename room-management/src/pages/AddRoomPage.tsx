import RoomForm from "../components/RoomForm";
import { useRoom } from "../RoomContext";

export default function AddRoomPage() {
const {
    handleAddRoom,
  } = useRoom();


  return (
    <div>
      <h1 className="text-xl font-bold mb-4">📄 add room</h1>
     <RoomForm onAdd={handleAddRoom}></RoomForm>

      </div>
  )}
