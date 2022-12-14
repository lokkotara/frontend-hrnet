import "./Home.scss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import Select from "react-select";
import range from "lodash/range";
import { Modal } from "@lokkotara/custom-modal";
import { getMonth, getYear } from "date-fns";
import { states, departments } from "../../datas/datas";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

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

  const formatDate = (date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date
      .getFullYear()
      .toString()
      .slice(2, 4)}`;
  };

  function submitHandler(formData) {
    if (isValid) {
      const obj = {
        birthDate   : formatDate(formData.birthDate),
        city        : formData.city,
        department  : formData.department.value,
        firstName   : formData.firstName,
        lastName    : formData.lastName,
        startDate   : formatDate(formData.startDate),
        state       : formData.state.abbreviation,
        street      : formData.street,
        zipCode     : formData.zipCode,
      };

      const employees = JSON.parse(localStorage.getItem("employeesList")) || [];
      employees.push(obj);
      localStorage.setItem("employeesList", JSON.stringify(employees));

      reset({
        birthDate   : "",
        city        : "",
        department: {
          value   : departments[0].value,
          label   : departments[0].label,
        },
        firstName   : "",
        lastName    : "",
        startDate   : "",
        state: {
          value           : states[0].value,
          label           : states[0].label,
          abbreviation    : states[0].abbreviation,
        },
        street    : "",
        zipCode   : "",
      });
      setIsModal(true);
    }
  }

  const customHeader = ({
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
        margin            : 10,
        display           : "flex",
        justifyContent    : "space-between",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256.05 448.15"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="navigateButtons"
      >
        <g id="chevron-left" data-name="chevron-left">
          <path d="M9.38,201.47a32,32,0,0,0,0,45.3l192,192a32,32,0,0,0,45.3-45.3L77.28,224.08,246.58,54.67a32,32,0,0,0-45.3-45.29l-192,192Z" />
        </g>
      </svg>
      <select
        value={months[getMonth(date)]}
        onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
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

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256.05 448.15"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="navigateButtons"
      >
        <g id="chevron-right" data-name="chevron-right">
          <path d="M246.68,201.47a32,32,0,0,1,0,45.3l-192,192a32,32,0,0,1-45.3-45.3l169.4-169.39L9.47,54.67A32,32,0,0,1,54.77,9.38l192,192Z" />
        </g>
      </svg>
    </div>
  );

  return (
    <main className="home">
      <Modal
        isOpen={isModal}
        message="Employee successfully created with component"
        icon="success"
        onClose={() => {
          setIsModal(false);
        }}
        modalStyle={{
          backgroundColor: "#f1f2f3",
          maxWidth: "500px",
          minHeight: "250px",
        }}
        modalMode={true}
        messageStyle={{ fontSize: "1.2rem" }}
      />
      <div className="formContainer">
        <h1>Create an Employee</h1>
        <form
          className="formParts"
          id="employeeForm"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="formPartsContainer">
            <div className="formInformation">
              <h2>Informations</h2>
              <div className="formRow">
                <label htmlFor="firstName">First name</label>
                <input
                  {...register("firstName", {
                    required: "First name is required",
                    pattern: {
                      value:
                        /^[a-zA-Z??-??\u00f1\u00d1]+(\s*[a-zA-Z??-??\u00f1\u00d1]*)*[a-zA-Z??-??\u00f1\u00d1]+$/i,
                      message: "First name only allows letters and spaces",
                    },
                    minLength: {
                      value: 3,
                      message: "First name must be at least 3 characters",
                    },
                  })}
                  type="text"
                  id="firstName"
                  className="formInput"
                />
                <p className="errorMessage">
                  {errors.firstName && errors.firstName.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="lastName">Last name</label>
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 3,
                      message: "Last name must be at least 3 characters",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z??-??\u00f1\u00d1]+(\s*[a-zA-Z??-??\u00f1\u00d1]*)*[a-zA-Z??-??\u00f1\u00d1]+$/i,
                      message: "Last name only allows letters and spaces",
                    },
                  })}
                  type="text"
                  id="lastName"
                  className="formInput"
                />
                <p className="errorMessage">
                  {errors.lastName && errors.lastName.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="birthDate">Date of Birth</label>
                <Controller
                  control={control}
                  name="birthDate"
                  rules={{
                    required: "Date of birth is required",
                  }}
                  render={({ field }) => (
                    <DatePicker
                      renderCustomHeader={customHeader}
                      {...field}
                      selected={field.value}
                      onChange={field.onChange}
                      id="birthDate"
                      className="formInput"
                    />
                  )}
                />
                <p className="errorMessage">
                  {errors.birthDate && errors.birthDate.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="startDate">Start date</label>
                <Controller
                  control={control}
                  name="startDate"
                  rules={{
                    required: "Start date is required",
                  }}
                  render={({ field }) => (
                    <DatePicker
                      renderCustomHeader={customHeader}
                      selected={field.value}
                      onChange={field.onChange}
                      id="startDate"
                      className="formInput"
                    />
                  )}
                />
                <p className="errorMessage">
                  {errors.startDate && errors.startDate.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="department">Department</label>
                <Controller
                  control={control}
                  rules={{ required: "Department is required" }}
                  id="department"
                  defaultValue={departments[0]}
                  name="department"
                  render={({ field }) => (
                    <Select
                      {...field}
                      options={departments}
                      aria-label="department"
                    />
                  )}
                />
                <p className="errorMessage">
                  {errors.departement && errors.departement.message}
                </p>
              </div>
            </div>
            <fieldset className="formAddress">
              <legend>Address</legend>
              <div className="formRow">
                <label htmlFor="street">Street</label>
                <input
                  {...register("street", {
                    required: "Street is required",
                    minLength: {
                      value: 3,
                      message: "Street must be at least 3 characters",
                    },
                    pattern: {
                      value: /\d*([\s,]{0,2}\w+)([\s-]{1}?\w+)/g,
                      message: "Street allows numbers, letters and spaces",
                    },
                  })}
                  type="text"
                  id="street"
                  className="formInput"
                />
                <p className="errorMessage">
                  {errors.street && errors.street.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="city">City</label>
                <input
                  {...register("city", {
                    required: "City is required",
                    minLength: {
                      value: 3,
                      message: "City must be at least 3 characters",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z??-??\u00f1\u00d1]+(\s*[a-zA-Z??-??\u00f1\u00d1]*)*[a-zA-Z??-??\u00f1\u00d1]+$/i,
                      message: "City only allows letters and spaces",
                    },
                  })}
                  type="text"
                  id="city"
                  className="formInput"
                />
                <p className="errorMessage">
                  {errors.city && errors.city.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="state">State</label>
                <Controller
                  control={control}
                  name="state"
                  id="state"
                  defaultValue={states[0]}
                  render={({ field }) => (
                    <Select {...field} options={states} aria-label="state" />
                  )}
                />
                <p className="errorMessage">
                  {errors.state && errors.state.message}
                </p>
              </div>
              <div className="formRow">
                <label htmlFor="zipCode">Zip code</label>
                <input
                  {...register("zipCode", {
                    required: "Zip Code is required",
                    pattern: {
                      value: /^[0-9]{5}(?:-[0-9]{4})?$/,
                      message: "Zip Code must be 5 digits or 5digits-4digits",
                    },
                  })}
                  type="text"
                  id="zipCode"
                  className="formInput"
                />
                <span className="errorMessage">
                  {errors.zipCode && errors.zipCode.message}
                </span>
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
}
