import { useParams } from "react-router-dom"
import { useRoom } from "../RoomContext"
import { useState } from "react"
import BillEditForm from "../components/BillEditForm"
import BillForm from "../components/BillForm"
import EditTenantForm from "../components/EditTenantForm"
import TenantForm from "../components/TenantForm"

export default function RoomDetailPage() {
  const { id } = useParams()
  const {
    roomsList,
    handleAddTenant,
    handleAddBill,
    handleDeleteBill,
    handleTogglePaid,
    handleDeleteTenant,
    handleEditTenant,
    handleEditBill
  } = useRoom()
  const room = roomsList.find((r) => r.id === id)
  const [editingTenantId, setEditingTenantId] = useState<string | null>(null)
  const [editingBillId, setEditingBillId] = useState<string | null>(null)
    if (!room) return <p>Không tìm thấy phòng</p>

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Chi tiết phòng {room.name}</h1>
      <p>💵 Giá: {room.price}</p>
      <p>📌 Ghi chú: {room.note}</p>
      <p>📦 Trạng thái: {room.status}</p>

      <hr className="my-4" />

      {room.status === "occupied" && room.tenant === undefined ? (
        <TenantForm onAddTenant={(tenant) => handleAddTenant(room.id, tenant)} />
      ) : (
        <>
          <p>👤 Tên: {room.tenant?.name}</p>
          <p>📞 SĐT: {room.tenant?.phone}</p>
          <p>🗓️ Bắt đầu: {room.tenant?.startDate}</p>
          <button onClick={() => handleDeleteTenant(room.id)}>❌ Xoá người thuê</button>
          <button onClick={() => setEditingTenantId(room.id)}>✏️ Sửa</button>

          {editingTenantId === room.id && room.tenant && (
            <EditTenantForm
              initialTenant={room.tenant}
              onSave={(updatedTenant) => {
                handleEditTenant(room.id, updatedTenant)
                setEditingTenantId(null)
              }}
              onCancel={() => setEditingTenantId(null)}
            />
          )}
        </>
      )}

      <hr className="my-4" />
      <h2 className="font-bold text-lg">💡 Hoá đơn</h2>

      <BillForm onAddPaid={(bill) => handleAddBill(room.id, bill)} />
      <table>
        <thead>
          <tr>
            <th>Tháng</th>
            <th>Điện</th>
            <th>Nước</th>
            <th>DV</th>
            <th>Tổng</th>
            <th>Đã trả</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {room.bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.month}</td>
              <td>{bill.electric}</td>
              <td>{bill.water}</td>
              <td>{bill.serviceCharge}</td>
              <td>{bill.total}</td>
              <td>
                <button onClick={() => handleTogglePaid(room.id, bill.month)}>
                  {bill.paid === "Paid" ? "✅" : "❌"}
                </button>
              </td>
              <td>
                <button onClick={() => handleDeleteBill(room.id, bill.id)}>🗑️</button>
                <button onClick={() => setEditingBillId(bill.id)}>✏️</button>
                {editingBillId === bill.id && (
                  <BillEditForm
                    initialBill={bill}
                    onEditPaid={(updatedBill) => {
                      handleEditBill(room.id, updatedBill)
                      setEditingBillId(null)
                    }}
                    onCancel={() => setEditingBillId(null)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}
