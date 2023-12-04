import React from "react";
import { combineReducers, createStore } from "redux";

// const createStore()
const AccountInitialState = {
  loan: 0,
  loanPurpose: "",
  balance: 0,
};

const accountReducer = (state = AccountInitialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      //   Later
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

const customerInitialState = {
  fullName: "",
  nationalID: "",
  createAt: "",
};

const customerReducer = (state = customerInitialState, action) => {
  switch (action.type) {
    case "customer/create":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createAt: action.payload.createAt,
      };

    case "customer/update":
      return {
        ...state,
        fullName: action.payload.fullName,
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const deposit = (amount) => {
  return {
    type: "account/deposit",
    payload: amount,
  };
};

const withdraw = (amount) => {
  return {
    type: "account/withdraw",
    payload: amount,
  };
};

const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
};

const payLoad = () => {
  return {
    type: "account/payLoan",
  };
};

const customerCreate = (fullName, nationalID) => {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalID,
      createAt: new Date().toISOString(),
    },
  };
};

const customerUpdate = (fullName) => {
  return {
    type: "customer/update",
    payload: {
      fullName,
    },
  };
};

store.dispatch(deposit(1000));
console.log(store.getState());

store.dispatch(withdraw(500));
console.log(store.getState());

store.dispatch(requestLoan(1000, "to buy expensive car"));
console.log(store.getState());

store.dispatch(
  customerCreate({
    fullName: "Hello From the Other side",
    nationalID: new Date().toUTCString(),
  })
);

console.log(store.getState());

const Store = () => {
  return <div>Store</div>;
};

export default Store;
