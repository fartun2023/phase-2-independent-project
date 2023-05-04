import React from 'react';

function TransactionList({ transactions, onDeleteTransaction }) {
  return (
    <div className="transaction-list">
      <h3>Transaction History</h3>
      <ul className="list">
        {transactions.map((transaction) => (
          <li className={`list-item ${transaction.amount < 0 ? 'minus' : 'plus'}`} key={transaction.id}>
            {transaction.description} <span>{transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount)}</span>
            <button className="delete-btn" onClick={() => onDeleteTransaction(transaction.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;