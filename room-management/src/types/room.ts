import type { Bill } from "./Bill"
import type { Tenant } from "./Tenant"

export interface Room {
    id : string,
    name : string,
    price : string,
    status : Status,
    note ?: string,
    tenant ?: Tenant,
    bills : Bill[]

}
export type Status = "available" | "occupied"