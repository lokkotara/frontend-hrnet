import employeesListReducer from "../features/EmployeesList/EmployeesListSlice";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import employeeFormReducer from "../features/EmployeeForm/EmployeeFormSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

/* Combining the reducers into one reducer. */
const rootReducer = combineReducers({
  employeesList: employeesListReducer,
  employeeForm: employeeFormReducer,
});

/* Creating a configuration object for the persistReducer, setting the storage on sessionStorage. */
const persistConfig = {
  key       : "root",
  storage   : storage,
};

/* Creating a persistedReducer. */
const persistedReducer = persistReducer(persistConfig, rootReducer);


/* Creating a store with the persistedReducer and thunk middleware. */
export const store = configureStore({
  middleware    : [thunk],
  reducer       : persistedReducer,
});
