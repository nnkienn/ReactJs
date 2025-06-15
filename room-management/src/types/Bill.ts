export interface Bill 
{
    id : string
    month : string,
    electric : string,
    water : string,
    serviceCharge : string,
    paid : PaidType,
    total : string
}
export type PaidType = "Paid" | "UnPaid"