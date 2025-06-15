import { useState } from "react";
import type { Tenant } from "../types/Tenant";

interface EditTenantFormProps {
    initialTenant: Tenant,
    onSave: (updatedTennat: Tenant) => void,
    onCancel: () => void
}

export default function EditTenantForm({ initialTenant, onSave, onCancel }: EditTenantFormProps) {
    const [inputName, setInputName] = useState(initialTenant.name)
    const [inputPhone, setInputPhone] = useState(initialTenant.phone)
    const [inputDate, setInputDate] = useState(initialTenant.startDate)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputName.trim() || !inputPhone.trim()) {
            alert("Type again!!!")
            return
        }
        const updatedTenants: Tenant = {
            name: inputName,
            phone: inputPhone,
            startDate: inputDate
        }
        onSave(updatedTenants)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" value={inputName} onChange={e => setInputName(e.target.value)} placeholder="Type name" />
                <input type="text" name="" id="" value={inputPhone} onChange={e => setInputPhone(e.target.value)} placeholder="Type phone" />
                <input type="date" name="" id="" value={inputDate} onChange={e => setInputDate(e.target.value)} />
                <button type="submit">💾 Save</button>
                <button type="button" onClick={onCancel}>❌ Cancel</button>            </form>
        </div>
    )
}