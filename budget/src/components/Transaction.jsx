import React, { useState } from 'react';
function Transaction(props) {
  const { transactions, deleteTransaction } = props;

  const getIncome = () => {
    let income = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].amount > 0)
        income += transactions[i].amount
    }
    return income;
  }

  const getExpense = () => {
    let expense = 0;
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].amount < 0)
        expense += transactions[i].amount
    }
    return expense;
  }

  const getTotal = () => {
    let total = 0;
    for (let i = 0; i < transactions.length; i++) {
      total += transactions[i].amount
    }
    return total;
  }

  return (
    <div className="transaction">
      <h3>Balance</h3>
      <h2>${getTotal()}</h2>
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
      <ul className="list">
        {transactions.map((transaction) => (
          <li className={transaction.amount > 0 ? 'plus' : 'minus'} key={transaction.id}>
            {transaction.description} ({transaction.date})
            <span>{transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount)}</span>
            <button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Transaction;