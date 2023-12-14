import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createAt: "",
};
const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerCreate: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createAt = action.payload.createAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
export const { customerCreate, updateName } = customerSlice.actions;
export default customerSlice.reducer;
/*
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

export const customerCreate = (fullName, nationalID) => {
  return {
    type: "customer/create",
    payload: {
      fullName,
      nationalID,
      createAt: new Date().toISOString(),
    },
  };
};

export const customerUpdate = (fullName) => {
  return {
    type: "customer/update",
    payload: {
      fullName,
    },
  };
};

export default customerReducer;
*/
