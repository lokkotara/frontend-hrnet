import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  birthDate: "",
  city: "",
  department: "Sales",
  firstName: "",
  lastName: "",
  startDate: "",
  state: "Alabama",
  street: "",
  zipCode: "",
};

export const employeeFormSlice = createSlice({
  name: "employeeForm",
  initialState,
  reducers: {
    getEmployeeFormPending: {
      reducer: (draft) => {
        draft.birthDate= "";
        draft.city = "";
        draft.department = "";
        draft.firstName = "";
        draft.lastName = "";
        draft.startDate = "";
        draft.state = "";
        draft.street = "";
        draft.zipCode = "";
        draft.status = "pending";
      },
    },

    getEmployeeFormFailed: {
      reducer: (draft) => {
        draft.status = 400;
      },
    },

    getEmployeeFormCompleted: {
      prepare: (data) => ({
        payload: { data },
      }),
      reducer: (draft, action) => {
        draft.birthDate   = action.payload.data.birthDate;
        draft.city        = action.payload.data.city;
        draft.firstName   = action.payload.data.firstName;
        draft.lastName    = action.payload.data.lastName;
        draft.startDate   = action.payload.data.startDate;
        draft.state       = action.payload.data.state;
        draft.status      = action.payload.data.status;
        draft.street      = action.payload.data.street;
        draft.zipCode     = action.payload.data.zipCode;
      },
    },

    resetInfos: {
      reducer: (draft) => {
        draft.birthDate = "";
        draft.city = "";
        draft.firstName = "";
        draft.lastName = "";
        draft.startDate = "";
        draft.state = "Alabama";
        draft.status = "Sales";
        draft.street = "";
        draft.zipCode = "";
        draft.status = null;
      },
    },
  },
});

export const {
  getEmployeeFormPending,
  getEmployeeFormFailed,
  getEmployeeFormCompleted,
  resetInfos,
} = employeeFormSlice.actions;

export default employeeFormSlice.reducer;
