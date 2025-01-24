import React, { createContext, useState } from 'react';

//create content
const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  //state to manage expense
  const [expenseState, setExpenseState] = useState([]);
  //state to manage income
  const [incomeState, setIncomeState] = useState([]);

  return (
    //provide context value to child component
    <ContextApi.Provider value={{expenseState, setExpenseState, incomeState, setIncomeState}}>
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };