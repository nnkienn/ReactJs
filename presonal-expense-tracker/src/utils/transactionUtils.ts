import type { Transaction } from "../components/types";

export function sumTransaction(transactionList : Transaction[], type : "income"|"outcome"){
    return transactionList.reduce((sum,t) =>{
        return t.type === type ? sum + Number(t.amount) : sum
    },0)
}

export function filterByType(transactionList : Transaction[], type :"all" |"income"|"outcome"){
    return transactionList.filter((transaction,index) =>{
        if(type === "all") return transactionList
        return transaction.type === type
    })
}
export function sortByDateDesc(list: Transaction[]) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date));
}


