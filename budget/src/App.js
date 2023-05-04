import { useState, useEffect } from 'react';
import './index.css';
import Transaction from './components/Transaction';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Retrieve all transactions from the server
    fetch('http://localhost:5000/transactions')
      .then(res => res.json())
      .then(data => setTransactions(data))
      .catch(err => console.log(err));
  }, []);

  const addTransaction = (transaction) => {
    // Add a new transaction to the server
    fetch('http://localhost:5000/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then(res => res.json())
      .then(data => setTransactions([...transactions, data]))
      .catch(err => console.log(err));
  };

  const deleteTransaction = (id) => {
    // Delete a transaction from the server
    fetch(`http://localhost:5000/transactions/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => setTransactions(transactions.filter(transaction => transaction.id !== id)))
      .catch(err => console.log(err));
  };

  const getIncome = () => {
    // Calculate the total income
    const income = transactions.filter(transaction => transaction.amount > 0)
      .reduce((total, transaction) => total + transaction.amount, 0)
      .toFixed(2);
    return income;
  };

  const getExpense = () => {
    // Calculate the total expense
    const expense = transactions
    .filter(transaction => transaction.amount < 0 || transaction.category === "Expense")
    .reduce((total, transaction) => total + transaction.amount, 0)
    .toFixed(2);
  return Math.abs(expense);
};

  const getBalance = () => {
    // Calculate the balance
    const balance = transactions.reduce((total, transaction) => total + transaction.amount, 0)
      .toFixed(2);
    return balance;
  };

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <TransactionForm onAddTransaction={addTransaction} />
      <TransactionList transactions={transactions} onDeleteTransaction={deleteTransaction} />
      <div className="balance">
        <h2>Current Balance</h2>
        <h3>${getBalance()}</h3>
        <p>As of {new Date().toLocaleDateString()}</p>
      </div>
      <div className="income-expense">
        <div className="income">
          <h4>Income</h4>
          <p>${getIncome()}</p>
        </div>
        <div className="expense">
          <h4>Expense</h4>
          <p>${getExpense()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;