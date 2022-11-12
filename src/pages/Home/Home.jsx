import { useNavigate } from "react-router-dom";
import "react-day-picker/dist/style.css";
import { useState } from "react";
import "./Home.scss";
import React from "react";
import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import range from "lodash/range";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {states, departments} from "../../datas/datas";
import Modal from "../../components/Modal/Modal";


export default function Home() {
  const [birthDate, setBirthDate] = useState();
  const [startDate, setStartDate] = useState();
  const [isModal, setIsModal] = useState(false);
  const navigate = useNavigate();
  const years = range(1940, getYear(new Date()) + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
    const [department, setDepartment] = useState('Sales');
    const [state, setState] = useState('Alabama');


    const handleDepartment = (e) => {
      setDepartment(e.value);
    };
    const handleState = (e) => {
      setState(e.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedBirthDate = `${birthDate.getMonth()+1}/${birthDate.getDate()}/${birthDate.getFullYear().toString().slice(2,4)}`;
    const formattedStartDate = `${startDate.getMonth()+1}/${startDate.getDate()}/${startDate.getFullYear().toString().slice(2,4)}`;
    const obj = {
      birthDate   : formattedBirthDate,
      city        : e.target.city.value,
      department  : department,
      firstName   : e.target.firstName.value,
      lastName    : e.target.lastName.value,
      startDate   : formattedStartDate,
      state       : state,
      street      : e.target.street.value,
      zipCode     : e.target.zipCode.value,
    };
    const employees = JSON.parse(localStorage.getItem("employeesList")) || [];
    employees.push(obj);
    localStorage.setItem("employeesList", JSON.stringify(employees));
    setIsModal(true);
  };
  const customHeader= ({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div
                    style={{
                      margin: 10,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <button
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      {"<"}
                    </button>

                    <select
                      value={months[getMonth(date)]}
                      onChange={({ target: { value } }) =>
                        changeMonth(months.indexOf(value))
                      }
                    >
                      {months.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={getYear(date)}
                      onChange={({ target: { value } }) => changeYear(value)}
                    >
                      {years.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      {">"}
                    </button>
                  </div>
                );

  return (
    <main className="home">
      <Modal isModal={isModal} />
      <div className="formContainer">
        <h1>Create an Employee</h1>
        <form className="formParts" onSubmit={handleSubmit}>
          <div className="formPartsContainer">
            <div className="formInformation">
              <h2>Informations</h2>
              <div className="formRow">
                <label htmlFor="firstName">First name</label>
                <input type="text" id="firstName" className="formInput" />
                <p className="errorMessage"></p>
              </div>
              <div className="formRow">
                <label htmlFor="lastName">Last name</label>
                <input type="text" id="lastName" className="formInput" />
                <p className="errorMessage"></p>
              </div>
              <div className="formRow">
                <label htmlFor="birthDate">Date of Birth</label>
                <DatePicker
                  renderCustomHeader={customHeader}
                  selected={birthDate}
                  onChange={(date) => setBirthDate(date)}
                  id="birthDate"
                  className="formInput"
                />
                {/* <div className="birthDateContainer"> */}
                <p className="errorMessage"></p>
                {/* </div> */}
              </div>
              <div className="formRow">
                <label htmlFor="startDate">Start date</label>
                <DatePicker
                  renderCustomHeader={customHeader}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  id="startDate"
                  className="formInput"
                />
                <p className="errorMessage"></p>
              </div>
              <div className="formRow">
                <label htmlFor="departement">Department</label>
                <Select
                  options={departments}
                  id="departement"
                  defaultValue={departments[0]}
                  onChange={handleDepartment}
                  value={departments.filter((obj) => obj.value === department)}
                />
                <p className="errorMessage"></p>
              </div>
            </div>

            <fieldset className="formAddress">
              <legend>Address</legend>
              <div className="formRow">
                <label htmlFor="street">Street</label>
                <input type="text" id="street" className="formInput" />
                <p className="errorMessage"></p>
              </div>
              <div className="formRow">
                <label htmlFor="city">City</label>
                <input type="text" id="city" className="formInput" />
                <p className="errorMessage"></p>
              </div>
              <div className="formRow">
                <label htmlFor="state">State</label>
                <Select
                  options={states}
                  id="state"
                  defaultValue={states[0]}
                  onChange={handleState}
                  value={states.filter((obj) => obj.value === state)}
                />
                <p className="errorMessage"></p>
              </div>
              <div className="formRow">
                <label htmlFor="zipCode">Zip code</label>
                <input type="text" id="zipCode" className="formInput" />
                <p className="errorMessage"></p>
              </div>
            </fieldset>
          </div>
          <div className="buttonsContainer">
            <button
              className="cancelButton btn"
              onClick={() => navigate("/Employees")}
            >
              Cancel
            </button>
            <input className="submitButton btn" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    </main>
  );
};