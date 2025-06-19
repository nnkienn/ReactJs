import type { Room } from "../types/room"
import { Link } from "react-router-dom"

interface RoomListProps {
    rooms: Room[],
    onDeleteRoom: (idRoom: string) => void,
}

export default function RoomList({ rooms , onDeleteRoom }: RoomListProps) {
    return (
        <li>
            {rooms.map((room, index) => {
                return (
                    <div>
                        {room.name} {room.price} {room.status} {room.note}
                        <Link to={`/rooms/${room.id}`}>
                            <button className="text-blue-600 underline">Chi tiết</button>
                        </Link>  
                        <button onClick={()=>onDeleteRoom(room.id)}>Delete</button>                      
                    </div>
                )
            })}
        </li>
    )
} 