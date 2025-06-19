import { useRoom } from "../RoomContext";

export default function StatsPage() {
    const {
        roomsList,
        totalMoney,
        getTotalMoneyRoomPaid,
        getTotalRoomPaid,
        getTotalRoomUnPaid
    } = useRoom();


    return (
        <div>
            <h2>Thống kê doanh thu</h2>
            <p>Tổng tiền tất cả các phòng: {totalMoney(roomsList)} VND</p>
            <p>Tổng tiền tất cả các phòng đã trả: {getTotalMoneyRoomPaid(roomsList)} VND</p>
            <p>Tổng tất cả các phòng đã trả: {getTotalRoomPaid("2025-06")} VND</p>
            <p>Tổng tất cả các phòng chưa trả: {getTotalRoomUnPaid("2025-06")} VND</p>

        </div>
    );
}
