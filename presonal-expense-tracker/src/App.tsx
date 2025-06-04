import { useEffect, useState } from "react"
import type { Transaction } from "./components/types"
import { v4 as uuidv4 } from 'uuid'
import TransactionForm from "./components/TransactionForm"
import TransactionItems from "./components/TransactionItems"
import { filterByType, sortByDateDesc, sumTransaction } from "./utils/transactionUtils"

function App() {
  type FilterType = 'all' | 'income' | 'outcome'
  const [transactionList, SetTransactionList] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<FilterType>("income")

  useEffect(() => {
    if (transactionList.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactionList))
    }
  }, [transactionList])

  useEffect(() => {
    const getItems = localStorage.getItem("transactions")
    if (getItems !== null) {
      const convertArray = JSON.parse(getItems) as Transaction[]
      if (Array.isArray(convertArray)) {
        SetTransactionList(convertArray);
      }
    }
  }, [])
  const handleAdd = (
    inputype: Transaction["type"],
    inputnote: string,
    inputamount: string,
    inputdate: string) => {
    const newTransaction: Transaction = ({
      id: uuidv4(),
      type: inputype,
      note: inputnote,
      amount: inputamount,
      date: inputdate
    })
    SetTransactionList([...transactionList, newTransaction])

  }
  const handleDelete = (idDelete: string) => {
    const newList = transactionList.filter((value) => value.id !== idDelete)
    SetTransactionList(newList)
  }
  const handleEdit = (idUpdate: string, updatedTransaction: Transaction) => {
    const newList = transactionList.map((transaction, value) => {
      return transaction.id === idUpdate ? updatedTransaction : transaction
    })
    SetTransactionList(newList)
  }



  const filtered = filterByType(transactionList, filter)
  const sorted = sortByDateDesc(filtered)

  return (
    <div>
      <TransactionForm onAdd={handleAdd}></TransactionForm>
      <select value={filter} onChange={(e) => setFilter(e.target.value as FilterType)}>
        <option value="all">all</option>
        <option value="income">income</option>
        <option value="outcome">outcome</option>
      </select>
      <ul>
        {
          sorted.map((transactionValue) =>
            <TransactionItems
              onEdit={handleEdit}
              transaction={transactionValue}
              onDelete={() => handleDelete(transactionValue.id)}>
            </TransactionItems>)
        }
      </ul>
      <p>Sum income : {sumTransaction(transactionList, "income")}</p>
      <p>Sum outcome : {sumTransaction(transactionList, "outcome")}</p>

    </div>

  )
}

export default App
