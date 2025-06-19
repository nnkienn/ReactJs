import { useState } from 'react'
import type { Room, Status } from './types/room'
import { v4 as uuidv4 } from 'uuid'
import RoomForm from './components/RoomForm'
import RoomList from './components/RoomList'
import type { Tenant } from './types/Tenant'
import type { Bill } from './types/Bill'
import AppRouter from './router'

function App() {

//   const [roomsList, setRoomsList] = useState<Room[]>([])
//   const handleAddRoom = (inputName: string, inputPrice: string, inputNote: string, inputStatus: Room["status"]) => {
//     const newRooms: Room = {
//       id: uuidv4(),
//       name: inputName,
//       price: inputPrice,
//       status: inputStatus,
//       note: inputNote,
//       bills: []
//     }
//     setRoomsList(prev => [...prev, newRooms])
//   }
//   const handleAddTenant = (roomId: string, newTenant: Tenant) => {
//     setRoomsList(prev => prev.map((room, index) =>
//       room.id === roomId ? { ...room, tenant: newTenant } : room
//     ))
//   }
//   const handleAddBill = (roomId: string, newBill: Bill) => {
//     setRoomsList(prev =>
//       prev.map(room => {
//         if (room.id !== roomId) return room;

//         const isDuplicate = room.bills.some(bill => bill.month === newBill.month);
//         if (isDuplicate) {
//           alert("Bill for this month already exists!");
//           return room;
//         }
//         return {
//           ...room,
//           bills: [...room.bills, newBill],
//         };
//       })
//     );
//   };
//   const handleDeleteBill = (idRoom: string, idBill: string) => {
//     setRoomsList(prev =>
//       prev.map(room =>
//         room.id === idRoom
//           ? {
//             ...room,
//             bills: room.bills.filter(bill => bill.id !== idBill)
//           }
//           : room
//       )
//     );
//   };
//   const handleTogglePaid = (roomId: string, billMonth: string) => {
//     setRoomsList(prev =>
//       prev.map(room =>
//         room.id === roomId
//           ? {
//             ...room,
//             bills: room.bills.map(bill =>
//               bill.month === billMonth
//                 ? { ...bill, paid: bill.paid === "Paid" ? "UnPaid" : "Paid" }
//                 : bill
//             )
//           }
//           : room
//       )
//     )

//   }
//   const handleDeleteTenant =(roomId : string)=>{
//     setRoomsList(prev => 
//       prev.map(room=>
//       room.id === roomId 
//       ? {...room,tenant : undefined, status : "available"}
//       : room
//     ))
//   }
//   const handleEditTenant = (roomId: string, updatedTenant: Tenant) => {
//   setRoomsList(prev =>
//     prev.map(room =>
//       room.id === roomId
//         ? { ...room, tenant: updatedTenant }
//         : room
//     )
//   )
// }
//   const handleEditBill = (roomId: string, updatedBill: Bill) => {
//   setRoomsList(prev =>
//     prev.map(room =>
//       room.id === roomId
//         ? {
//           ...room,
//           bills : room.bills.map(bill=> bill.id === updatedBill.id ? updatedBill : bill)
//         }
      
//         : room
//     )
//   )
// }


//   return (
//     <>
//       <div>
//         <RoomForm onAdd={handleAddRoom}></RoomForm>
//         <ul>
//           <RoomList rooms={roomsList} 
//           AddTenant={handleAddTenant} 
//           AddBill={handleAddBill} 
//           TogglePaid={handleTogglePaid} 
//           OnDeleteBill={handleDeleteBill} 
//           OnDeleteTenant={handleDeleteTenant}
//           OnEditTenant={handleEditTenant}
//           OnEditBill={handleAddBill}
//           ></RoomList>
//         </ul>
//       </div>
//     </>
//   )
    return <AppRouter/>
}

export default App
