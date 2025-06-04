export interface Transaction {
    id : string;
    date : string;
    type : TransactionType;
    amount : string;
    note : string;
}
export type TransactionType = "income" | "outcome"