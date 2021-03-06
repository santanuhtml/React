22. Send Form data in App.js
    [Pass data Child to Parent]

Passing Data Flow using Props:

'ExpenseForm.js' -->  'NewExpense.js' --> 'App.js'
    
-----------------------------------------------------------
First we pass data form 'ExpenseForm.js' to 'NewExpense.js'  
which is stored in 'expenseData' in 'ExpenseForm.js'
-----------------------------------------------------------

STEP 1:


In 'NewExpense.js' we already add the component 'ExpenseForm.js' that is
<ExpenseForm> 

Now we have to add Prop to called onSaveExpenseData={} 
On 'onSaveExpenseData' paranthesis {} we add a function called 'SaveExpenseDataHandler'

*** SaveExpenseDataHandler is not executed in the paranthesis {} so we don't use 
    SaveExpenseDataHandler() in place of SaveExpenseDataHandler
    SaveExpenseDataHandler just trigger under the paranthesis {}
    {SaveExpenseDataHandler}

-----
<ExpenseForm onSaveExpenseData={SaveExpenseDataHandler} />
----

Now crate a function 'SaveExpenseDataHandler' just like
'ExpenseForm.js' file.
-----

const SaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData ={
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    console.log(expenseData);
  };

----
Note:
i.   Here the parameter 'enteredExpenseData' is also up to you.
ii.  in 'expenseData' Object we need to add more data so we use
     ... + Parameter name called enteredExpenseData.
     Here id is new added data in 'expenseData'

iii. Math.random().toString() => it generate random numbers. It is
     not perfect to generate random key but in this simple project 
     it is ok. 
     .toString() use to make this Random generated data in to String.


Full CODE

NewExpense.js
------------------------

import React from 'react';
import ExpenseForm from './ExpenseForm';
import  './NewExpense.css';
const NewExpense = () =>{

  const SaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData ={
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    console.log(expenseData);
  };

  return(
        <div className="new-expense">
          <ExpenseForm onSaveExpenseData={SaveExpenseDataHandler} />
        </div>
  );
};

export default NewExpense;

------------------------

STEP 2:

i.
Since we use Props to transfer data we need to add 'props' parameter in
ExpenseForm() function under 'ExpenseForm.js' file

ii. 
We need to get 'expenseData' Object data under the props 'onSaveExpenseData' using

----------
props.onSaveExpenseData(expenseData);
---------

which is already called under the component <ExpenseForm/> in 'NewExpense.js'

After getting the 'expenseData' Object data using the props 'onSaveExpenseData'
we send it in 'NewExpense.js' under the component <ExpenseForm/> appling the 
same props 'onSaveExpenseData' like this

-------
<ExpenseForm onSaveExpenseData={SaveExpenseDataHandler} />
------


Full CODE

ExpenseForm.js
------------------------

import React, {useState} from 'react';
import  './ExpenseForm.css';


const ExpenseForm = (props) =>{

    const [enteredTitle, setEnteredTitle ] = useState('');
    const [enteredAmount, setEnteredAmount ] = useState('');
    const [enteredDate, setEnteredDate ] = useState('');

    const titleChangeHandler = (event) => {
        setEnteredTitle(event.target.value);
    }

    const amounChangeHandler = (event) => {
        setEnteredAmount(event.target.value);
    }

    const dateChangeHandler = (event) =>{
        setEnteredDate(event.target.value);
    }

    const submitHandler = (event) =>{
        event.preventDefault(); /* It is sending Request for not to load the browser */

        const expenseData = {
            title: enteredTitle,
            amount: enteredAmount,
            date: new Date(enteredDate)
        };
        

        props.onSaveExpenseData(expenseData);
        
        /* Clear input set Data */
        setEnteredTitle('');
        setEnteredAmount('');
        setEnteredDate('');
    };

    return(
        <form onSubmit={submitHandler}>
            <div className="new-expense__controls">
                <div className="new-expense__control">
                    <label>Title</label>
                    <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Amount</label>
                    <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amounChangeHandler} />
                </div>
                <div className="new-expense__control">
                    <label>Date</label>
                    <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateChangeHandler}/>
                </div>
            </div>
            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
            </div>
        </form>
    );
};
export default ExpenseForm;


========================================
Here we sussfully Pass the Form data from

'ExpenseForm.js' -->  'NewExpense.js'

Now we have to pass this data form 

'NewExpense.js' --> 'App.js'

========================================

STEP 1:

Now in App.js we we already add the component 'NewExpense.js' that is
<NewExpense />

Now we have to add Prop to called onAddExpense={} 
On 'onSaveExpenseData' paranthesis {} we add a function called 'addExpenseDataHandler'

------
<NewExpense onAddExpense={addExpenseDataHandler} />
------

Now crate a function 'addExpenseDataHandler'

-----

const addExpenseDataHandler = (expense) =>{
   console.log('In App.js');
   console.log(expense);
}

-----


Full CODE

App.js
------------------------

import React from 'react';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';

function App() {
  const expenses = [
    {
      id: 'e1',
      title: 'Toilet Paper',
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    { id: 'e2', 
      title: 'New TV', 
      amount: 799.49, 
      date: new Date(2021, 2, 12) 
    },
    {
      id: 'e3',
      title: 'Car Insurance',
      amount: 294.67,
      date: new Date(2021, 2, 28),
    },
    {
      id: 'e4',
      title: 'New Desk (Wooden)',
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ];

  const addExpenseDataHandler = (expense) =>{
    console.log('In App.js');
    console.log(expense);
  }

  return (
    <div>
      <h2>Let's get started.</h2>
      <p>This is also visible</p>
      <NewExpense onAddExpense={addExpenseDataHandler} />
      <Expenses items={expenses}></Expenses>
    </div>
  );
}

export default App;


------------------------

STEP 2:

i.
Since we use Props to transfer data we need to add 'props' parameter in
NewExpense = () function under 'NewExpense.js' file

ii. 
We need to get 'expenseData' Object data under the props 'onAddExpense' using

----------
props.onAddExpense(expenseData);
---------

FULL UPDATED CODE
NewExpense.js

------------------------

import React from 'react';
import ExpenseForm from './ExpenseForm';
import  './NewExpense.css';
const NewExpense = (props) =>{

  const SaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData ={
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    
    props.onAddExpense(expenseData);
  };

  return(
        <div className="new-expense">
          <ExpenseForm onSaveExpenseData={SaveExpenseDataHandler} />
        </div>
  );
};

export default NewExpense;


------------------------

=======================
Now we can see it in consol that the Input data that passes 
to App.js
=======================