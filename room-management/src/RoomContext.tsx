import { createContext, useContext, useEffect, useState } from "react";

import type { Room, Status } from './types/room'
import { v4 as uuidv4 } from 'uuid'
import type { Tenant } from './types/Tenant'
import type { Bill } from './types/Bill'
interface RoomContextType {
    roomsList: Room[];
    handleAddRoom: (name: string, price: string, note: string, status: Room["status"]) => void;
    handleDeleteRoom: (idRoom: string) => void;
    handleAddTenant: (roomId: string, tenant: Tenant) => void;
    handleDeleteTenant: (roomId: string) => void;
    handleEditTenant: (roomId: string, tenant: Tenant) => void;
    handleAddBill: (roomId: string, bill: Bill) => void;
    handleEditBill: (roomId: string, bill: Bill) => void;
    handleDeleteBill: (roomId: string, billId: string) => void;
    handleTogglePaid: (roomId: string, month: string) => void;
    FilterRoomType: (rooms: Room[], type: "available" | "occupied" | "all") => Room[];
    totalMoney: (rooms: Room[]) => number,
    getTotalMoneyRoomPaid: (rooms: Room[]) => number,
    getTotalRoomPaid: (targetMonth: string) => number,
    getTotalRoomUnPaid: (targetMonth: string) => number,


}

const RoomContext = createContext<RoomContextType | null>(null);
export const useRoom = () => useContext(RoomContext)!;

export function RoomProvider({ children }: { children: React.ReactNode }) {
    const [roomsList, setRoomsList] = useState<Room[]>([])

    useEffect(() => {
        const stored = localStorage.getItem("rooms")
        if (stored !== null) {
            try {
                const convertArray = JSON.parse(stored) as Room[]
                if (Array.isArray(convertArray)) {
                    setRoomsList(convertArray)
                }
            } catch (error) {
                console.error("Failed to parse localStorage data", error)
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("rooms", JSON.stringify(roomsList))
    }, [roomsList])

    const handleAddRoom = (inputName: string, inputPrice: string, inputNote: string, inputStatus: Room["status"]) => {
        const newRooms: Room = {
            id: uuidv4(),
            name: inputName,
            price: inputPrice,
            status: inputStatus,
            note: inputNote,
            bills: []
        }
        setRoomsList(prev => [...prev, newRooms])
    }
    const handleDeleteRoom = (roomId: string): void => {
        const newListRoom = roomsList.filter(room => room.id !== roomId);
        setRoomsList(newListRoom);
    };
    const handleAddTenant = (roomId: string, newTenant: Tenant) => {
        setRoomsList(prev => prev.map((room, index) =>
            room.id === roomId ? { ...room, tenant: newTenant } : room
        ))
    }
    const handleAddBill = (roomId: string, newBill: Bill) => {
        setRoomsList(prev =>
            prev.map(room => {
                if (room.id !== roomId) return room;

                const isDuplicate = room.bills.some(bill => bill.month === newBill.month);
                if (isDuplicate) {
                    alert("Bill for this month already exists!");
                    return room;
                }
                return {
                    ...room,
                    bills: [...room.bills, newBill],
                };
            })
        );
    };
    const handleDeleteBill = (idRoom: string, idBill: string) => {
        setRoomsList(prev =>
            prev.map(room =>
                room.id === idRoom
                    ? {
                        ...room,
                        bills: room.bills.filter(bill => bill.id !== idBill)
                    }
                    : room
            )
        );
    };
    const handleTogglePaid = (roomId: string, billMonth: string) => {
        setRoomsList(prev =>
            prev.map(room =>
                room.id === roomId
                    ? {
                        ...room,
                        bills: room.bills.map(bill =>
                            bill.month === billMonth
                                ? { ...bill, paid: bill.paid === "Paid" ? "UnPaid" : "Paid" }
                                : bill
                        )
                    }
                    : room
            )
        )

    }
    const handleDeleteTenant = (roomId: string) => {
        setRoomsList(prev =>
            prev.map(room =>
                room.id === roomId
                    ? { ...room, tenant: undefined, status: "available" }
                    : room
            ))
    }
    const handleEditTenant = (roomId: string, updatedTenant: Tenant) => {
        setRoomsList(prev =>
            prev.map(room =>
                room.id === roomId
                    ? { ...room, tenant: updatedTenant }
                    : room
            )
        )
    }
    const handleEditBill = (roomId: string, updatedBill: Bill) => {
        setRoomsList(prev =>
            prev.map(room =>
                room.id === roomId
                    ? {
                        ...room,
                        bills: room.bills.map(bill => bill.id === updatedBill.id ? updatedBill : bill)
                    }

                    : room
            )
        )
    }
    const FilterRoomType = (rooms: Room[], type: "all" | "available" | "occupied"): Room[] => {
        if (type === "all") return rooms;
        return rooms.filter(room => room.status === type);
    }
    const totalMoney = (rooms: Room[]): number => {
        return rooms.reduce((total, room) => total + Number(room.price), 0);
    }

    const getTotalMoneyRoomPaid = (rooms: Room[]): number => {
        return rooms.reduce((total, room) => {
            const RoomTotal = room.bills.reduce((totalBill, bill) => {
                if (bill.paid === "Paid") {
                    return totalBill + Number(bill.total)
                }
                return totalBill
            }, 0)
            return total + RoomTotal
        }, 0);
    }

    const getTotalRoomPaid = (targetMonth: string): number => {
        return roomsList.reduce((count, room) => {
            const hasPaidRoom = room.bills.some(
                bill => bill.month === targetMonth && bill.paid === "Paid"
            )
            return hasPaidRoom ? count + 1 : count
        }, 0)
    }
    const getTotalRoomUnPaid = (targetMonth: string): number => {
        return roomsList.reduce((count, room) => {
            const hasPaidRoom = room.bills.some(
                bill => bill.month === targetMonth && bill.paid === "UnPaid"
            )
            return hasPaidRoom ? count + 1 : count
        }, 0)
    }




    return (
        <RoomContext.Provider
            value={{
                roomsList,
                handleAddRoom,
                handleDeleteRoom,
                handleAddTenant,
                handleDeleteTenant,
                handleEditTenant,
                handleAddBill,
                handleEditBill,
                handleDeleteBill,
                handleTogglePaid,
                FilterRoomType,
                totalMoney,
                getTotalMoneyRoomPaid,
                getTotalRoomPaid,
                getTotalRoomUnPaid
            }}
        >
            {children}
        </RoomContext.Provider>
    );
}