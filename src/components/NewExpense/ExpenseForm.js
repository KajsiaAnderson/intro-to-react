import React, { useState } from 'react'

import './ExpenseForm.css'

const ExpenseForm = (props) => {
    const [enteredTitle, setEnteredTitle] = useState('')
    const [enteredAmount, setEnteredAmount] = useState('')
    const [enteredDate, setEnteredDate] = useState('')

    //If you list multiple useState do ^^^. 
    //If you just want one useState for multiple events do this: 
    // const [userInput, setUserInput] = useState({
    //     enteredTitle: '',
    //     enteredAmount: '',
    //     enteredDate: ''
    // })

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value)
        // ^ this is for multiple useState

        // setUserInput({
        //     ...userInput,
        //     enteredTitle: event.target.value
        // })
        // ^ this is for one useState, but not the best way if your state update depends on the previous state. 
        // ^ React schedules state updates, it doesn't perfom them instantly. 
        // ^ So if you schedule a lot of state updates at the same time, it could be using an outdated/incorrect state snapshot if you use this approach. 
        // ^ Use an inner function instead like below...

        // setUserInput((prevState) => {
        //     return { ...prevState, enteredTitle: event.target.value }
        // })
        // ^ if your state update depends on the previous state 
    }

    const amountChangeHandler = (e) => {
        setEnteredAmount(e.target.value)
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredAmount: e.target.value }
        // })
    }

    const dateChangeHandler = (e) => {
        setEnteredDate(e.target.value)
        // setUserInput((prevState) => {
        //     return { ...prevState, enteredDate: e.target.value }
        // })
    }

    const submitHandler = (event) => {
        event.preventDefault()

        const expenseData = {
            title: enteredTitle,
            amount: +enteredAmount,
            date: new Date(enteredDate)
        }

        props.onSaveExpenseData(expenseData)
        setEnteredTitle('')
        setEnteredAmount('')
        setEnteredDate('')
     }

    return (
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input 
                    type="text"
                    value={enteredTitle}
                    onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input
                    type='number'
                    min="0.01"
                    step="0.01"
                    value={enteredAmount}
                    onChange={amountChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input
                    type='date'
                    min="2019-01-01"
                    max="2023-12-31"
                    value={enteredDate}
                    onChange={dateChangeHandler} />
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="button" onClick={props.onCancel}>Cancel</button>
                <button type="submit">Add Expense</button>
            </div>
        </form>
    )
}

export default ExpenseForm