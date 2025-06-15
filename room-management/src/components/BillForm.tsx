import { useState } from "react";
import type { Bill, PaidType } from "../types/Bill";
import { v4 as uuidv4 } from 'uuid'

interface PaidProps {
    onAddPaid: (
        bill : Bill
    ) => void
}

export default function BillForm({ onAddPaid }: PaidProps) {
    const [inputMonth, setInputMonth] = useState(() => new Date().toISOString().slice(0, 7))
    const [inputElectric, setInputElectric] = useState<string>("")
    const [inputServiceCharge, setServiceCharge] = useState<string>("")
    const [inputWater, setInputWater] = useState<string>("")
    const [inputPaid, setInputPaid] = useState<PaidType>("UnPaid")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const electricNum = Number(inputElectric);
        const waterNum = Number(inputWater);
        const serviceNum = Number(inputServiceCharge);

        if (
            !inputElectric.trim() || isNaN(electricNum) || electricNum < 0 ||
            !inputWater.trim() || isNaN(waterNum) || waterNum < 0 ||
            !inputServiceCharge.trim() || isNaN(serviceNum) || serviceNum < 0
        ) {
            alert("Vui lòng nhập số hợp lệ và lớn hơn hoặc bằng 0!");
            return;
        }
        const totalFull = electricNum + waterNum + serviceNum;
        const newBill : Bill = {
        id : uuidv4(),
        month: inputMonth,
        electric: inputElectric,
        water: inputWater,
        serviceCharge: inputServiceCharge,
        paid: inputPaid,
        total:  String(totalFull)
        }
        onAddPaid(newBill)
        setInputElectric("")
        setInputWater("")
        setServiceCharge("")

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="month" name="" id="" value={inputMonth} onChange={(e) => setInputMonth(e.target.value)} />
                <input type="text" name="" id="" value={inputElectric} onChange={(e) => setInputElectric(e.target.value)} />
                <input type="text" name="" id="" value={inputServiceCharge} onChange={(e) => setServiceCharge(e.target.value)} />
                <input type="text" name="" id="" value={inputWater} onChange={(e) => setInputWater(e.target.value)} />
                <select name="" id="" value={inputPaid} onChange={e => setInputPaid(e.target.value as PaidType)}>
                    <option value="Paid">Paid</option>
                    <option value="UnPaid">Unpaid</option>
                </select>
                <button type="submit">➕ Add Bill</button>
            </form>
        </div>
    )

}