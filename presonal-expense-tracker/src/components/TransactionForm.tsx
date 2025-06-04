import React, { useState } from "react";
import type { TransactionType } from "./types";

interface Props {
    onAdd: (
        type: TransactionType,
        note: string,
        amount: string,
        date: string
    ) => void
}
export default function TransactionForm({ onAdd }: Props) {
    const [inputType, setInputType] = useState<TransactionType>("income")
    const [inputDate, setInputDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [inputNote, setInputNote] = useState<string>("")
    const [inputAmount, setInputAmount] = useState<string>("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputNote.trim() || isNaN(Number(inputAmount)) || Number(inputAmount) <0) {
            alert("Vui lòng nhập đầy đủ và hợp lệ");
            return;
        }
        onAdd(inputType, inputNote.trim(), inputAmount, inputDate)
        setInputAmount("")
        setInputNote("")


    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select name="" id="" value={inputType} onChange={(e) => setInputType(e.target.value as TransactionType)}>
                    <option value="income">income</option>
                    <option value="outcome">outcome</option>
                </select>
                <input type="text" value={inputAmount} placeholder="Input amount" name="" id="" onChange={e => setInputAmount(e.target.value)} />
                <input type="text" value={inputNote} placeholder="Input note" name="" id="" onChange={e => setInputNote(e.target.value)} />
                <input type="date" value={inputDate} name="" id="" onChange={e => setInputDate(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}