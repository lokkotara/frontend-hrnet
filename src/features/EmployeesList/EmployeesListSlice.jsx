import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employeesList: []
};

export const employeesListSlice = createSlice({
  name: "employeesList",
  initialState,
  reducers: {
    getListPending: {
      reducer: (draft) => {
        draft.status = "pending";
      },
    },

    getListFailed: {
      reducer: (draft) => {
        draft.status = 400;
      },
    },

    getListCompleted: {
      prepare: (data) => ({
        payload: { data },
      }),
      reducer: (draft, action) => {
        draft.employeesList = action.payload.data.body.employeesList;
      },
    },

    addEmployee: {
      prepare: (employee) => ({
        payload: { employee },
      }),
      reducer: (draft, action) => {
        draft.employeesList.push(action.payload.employee);
      },
    },
  },
});

export const { getListPending, getListFailed, getListCompleted, addEmployee } =
  employeesListSlice.actions;

export default employeesListSlice.reducer;