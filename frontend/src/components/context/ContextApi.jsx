import React, { createContext, useState } from 'react';

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [expenseState, setExpenseState] = useState([]);
  const [incomeState, setIncomeState] = useState([]);

  return (
    <ContextApi.Provider value={[expenseState, setExpenseState, incomeState, setIncomeState]}>
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };