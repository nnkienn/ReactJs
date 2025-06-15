import { useState } from "react";
import type { Bill, PaidType } from "../types/Bill"

interface PaidProps {
  initialBill: Bill; 
  onEditPaid: (bill: Bill) => void;
  onCancel: () => void;
}

export default function BillEditForm({initialBill,onEditPaid ,onCancel}: PaidProps) {
    const [inputMonth, setInputMonth] = useState(initialBill.month)
    const [inputElectric, setInputElectric] = useState(initialBill.electric)
    const [inputServiceCharge, setServiceCharge] =  useState(initialBill.serviceCharge)
    const [inputWater, setInputWater] =  useState(initialBill.water)
    const [inputPaid, setInputPaid] = useState(initialBill.paid)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const electricNum = Number(inputElectric);
        const waterNum = Number(inputWater);
        const serviceNum = Number(inputServiceCharge);

        const totalFull = electricNum + waterNum + serviceNum;
        const updatedBill : Bill = {
        id : initialBill.id,
        month: inputMonth,
        electric: inputElectric,
        water: inputWater,
        serviceCharge: inputServiceCharge,
        paid: inputPaid,
        total:  String(totalFull)
        }
        onEditPaid(updatedBill)
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
                <button type="submit">💾 Save</button>
                <button type="button" onClick={onCancel}>❌ Cancel</button>
            </form>
        </div>
    )

}