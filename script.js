"use strict";

// DOM MANIPULATION
const container = document.querySelector(".container");
const btn = document.querySelector(".calculate-btn");
const input = document.querySelector(".input-amount");
const output = document.querySelector(".output");
const outputError = document.querySelector(".output-error");
const outputValue = document.querySelector(".output-value");

// Variables

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const value = parseFloat(input.value);

  if (Number.isNaN(value)) {
    outputError.classList.remove("hidden");
    output.classList.add("hidden");
  } else {
    outputError.classList.add("hidden");
    outputValue.textContent = getRemainingAmount(value);
    output.classList.remove("hidden");
  }

  input.value = "";
});

const getRemainingAmount = (currentAmount) => {
  // Get the current date in an int
  const currentDate = new Date().getDate();

  // Get the total days in the current month in an int
  const totalDays = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  ).getDate();

  //   Remaining days of the month as an int
  const remainingDays = totalDays - currentDate;

  //   Getting the remaining amount for each day of the month and truncating it to only two decimals
  const output = Math.round((currentAmount / remainingDays) * 100) / 100;

  return output;
};
