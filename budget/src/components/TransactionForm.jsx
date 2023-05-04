import React, { useState } from 'react';

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const transaction = {
      description: description,
      amount: parseFloat(amount)
    };
    onAddTransaction(transaction);
    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <input type="text" id="description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Enter description..." required />
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Enter amount..." required />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}

export default TransactionForm;