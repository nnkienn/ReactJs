import { useState } from "react"
import type { Bill } from "../types/Bill"
import type { Room } from "../types/room"
import type { Tenant } from "../types/Tenant"
import BillForm from "./BillForm"
import TenantForm from "./TenantForm"
import EditTenantForm from "./EditTenantForm"
import BillEditForm from "./BillEditForm"

interface RoomListProps {
    rooms: Room[],
    AddTenant: (idRoom: string, tenant: Tenant) => void,
    AddBill: (idRoom: string, bill: Bill) => void,
    TogglePaid: (idRoom: string, billMonth: string) => void
    OnDeleteBill: (idRoom: string, idBill: string) => void,
    OnDeleteTenant: (idRoom: string) => void,
    OnEditTenant: (idRoom: string, tenant: Tenant) => void,
    OnEditBill: (idRoom: string, bill: Bill) => void
}

export default function RoomList({ rooms, AddTenant, AddBill, TogglePaid, OnDeleteBill, OnDeleteTenant, OnEditTenant, OnEditBill }: RoomListProps) {
    const [editingTenantId, setEditingTenantId] = useState<string | null>(null)
    const [editingBillId, setEditingBillId] = useState<string | null>(null)

    return (
        <li>
            {rooms.map((room, index) => {
                return (
                    <div>
                        {room.name} {room.price} {room.status} {room.note}

                        {room.status === "occupied" && room.tenant === undefined
                            ? <TenantForm onAddTenant={(tenant) => AddTenant(room.id, tenant)}></TenantForm>
                            : (
                                <div>
                                    👤{room.tenant?.name}
                                    📞{room.tenant?.phone}
                                    🗓️{room.tenant?.startDate}
                                    <button onClick={() => OnDeleteTenant(room.id)}  >❌</button>
                                    <button onClick={() => setEditingTenantId(room.id)}  >✏️</button>
                                    {
                                        editingTenantId === room.id && room.tenant && (
                                            <EditTenantForm
                                                initialTenant={room.tenant}
                                                onSave={(updatedTenant) => {
                                                    OnEditTenant(room.id, updatedTenant)
                                                    setEditingTenantId(null)
                                                }}
                                                onCancel={() => setEditingTenantId(null)}
                                            />
                                        )
                                    }
                                    <BillForm onAddPaid={(bill) => AddBill(room.id, bill)} ></BillForm>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Month</th>
                                                <th>electric</th>
                                                <th>water</th>
                                                <th>Total</th>
                                                <th>Paid</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                room.bills.map((bill, index) => (
                                                    <tr key={index}>
                                                        <td>{bill.month}</td>
                                                        <td>{bill.electric}</td>
                                                        <td>{bill.water}</td>
                                                        <td>{bill.total}</td>
                                                        <td>
                                                            <button onClick={() => TogglePaid(room.id, bill.month)}>
                                                                {bill.paid === "Paid" ? "✅" : "❌"}
                                                            </button></td>
                                                        <td><button onClick={() => OnDeleteBill(room.id, bill.id)}  >❌</button></td>
                                                        <td>
                                                            <button onClick={() => setEditingBillId(bill.id)}  >✏️</button>
                                                            {
                                                                bill.id === editingBillId && (
                                                                    <BillEditForm
                                                                        initialBill={bill}
                                                                        onEditPaid={(updatedBill) => {
                                                                            OnEditBill(room.id, updatedBill)
                                                                            setEditingBillId(null)
                                                                        }}
                                                                        onCancel={() => setEditingBillId(null)}
                                                                    ></BillEditForm>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                )
            })}
        </li>
    )
} 