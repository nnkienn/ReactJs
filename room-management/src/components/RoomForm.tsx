import { useState } from "react";
import type { Status } from "../types/room";
interface Props{
    onAdd: (
        name : string,
        price : string,
        note : string,
        status : Status,
    )=>void
}

export default function RoomForm({onAdd} : Props) {
    const [inputName, setInputName] = useState<string>("")
    const [inputPrice, setInputPrice] = useState<string>("")
    const [inputNote, setInputNote] = useState<string>("")
    const [inputStatus, setInputStatus] = useState<Status>("occupied")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!inputName.trim() || isNaN(Number(inputPrice)) || (Number(inputPrice) < 0)){
            alert("Type again!!!")
            return
        }
        onAdd(inputName,inputPrice,inputNote,inputStatus)
        setInputName("")
        setInputNote("")
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" value={inputName} onChange={e => setInputName(e.target.value)} placeholder="Type name" />
                <input type="text" name="" id="" value={inputPrice} onChange={e => setInputPrice(e.target.value)} placeholder="Type price" />
                <input type="text" name="" id="" value={inputNote} onChange={e => setInputNote(e.target.value)} placeholder="Type note" />
                <select value={inputStatus} onChange={(e) => setInputStatus(e.target.value as Status)}>
                    <option value="occupied">occupied</option>
                    <option value="available">available</option>
                </select>
                <button type="submit">Add</button>
            </form>
        </div>
    )

}