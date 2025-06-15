import { useState } from "react"
import type { Tenant } from "../types/Tenant"

interface TenantFormProps {
    onAddTenant: (
        tenantData: Tenant
    )=>void
}
export default function TenantForm({ onAddTenant }: TenantFormProps) {
    const [inputName, setInputName] = useState<string>("")
    const [inputPhone, setInputPhone] = useState<string>("")
    const [inputDate, setInputDate] = useState(() => new Date().toISOString().split("T")[0])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputName.trim() || !inputPhone.trim()) {
            alert("Type again!!!")
            return
        }
        const newTenants : Tenant = {
            name : inputName,
            phone : inputPhone,
            startDate : inputDate
        }
        onAddTenant(newTenants)

    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="" id="" value={inputName} onChange={e => setInputName(e.target.value)} placeholder="Type name" />
                <input type="text" name="" id="" value={inputPhone} onChange={e => setInputPhone(e.target.value)} placeholder="Type phone" />
                <input type="date" name="" id="" value={inputDate} onChange={e=> setInputDate(e.target.value)} />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}