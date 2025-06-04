import { useState } from "react"
import type { Transaction } from "./types"

interface TransactionItemsProps {
    transaction: Transaction,
    onDelete: (id: string) => void,
    onEdit: (id: string , updatedTransaction : Transaction) => void
}


export default function TransactionItems({ transaction, onDelete, onEdit }: TransactionItemsProps) {
    const [isEditing, setEditing] = useState(false)
    const [noteEdit, setNoteEdit] = useState(transaction.note)
    const [amountEdit, setAmountEdit] = useState(transaction.amount)
    const [dateEdit, setDateEdit] = useState(transaction.date)
    const handleSubmitEdit = () => {
        const updatedTransaction: Transaction = {
            ...transaction,
            note: noteEdit,
            amount: amountEdit,
            date: dateEdit
        }
        onEdit(transaction.id,updatedTransaction)
        setEditing(true)
    }
    return (
        (

            <li>
                <button onClick={() => onDelete(transaction.id)}>❌</button>
                <button onClick={() => setEditing(true)}>✏️</button>
                {
                    isEditing ? (
                        <>
                            <input value={noteEdit} type="text" name="" id="" onChange={e => setNoteEdit(e.target.value)} />
                            <input value={amountEdit} type="text" name="" id="" onChange={e => setAmountEdit(e.target.value)} />
                            <input value={dateEdit} type="date" name="" id="" onChange={e => setDateEdit(e.target.value)} />
                            <button type="submit" onClick={handleSubmitEdit}>Submit</button>
                        </>
                    ) : (<>{transaction.date} {transaction.amount} {transaction.note} {transaction.type}</>)
                }

            </li>
        )
    )
}