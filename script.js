"use strict";

// DOM MANIPULATION
const container = document.querySelector(".container");
const btn = document.querySelector(".calculate-btn");
const input = document.querySelector(".input-amount");
const output = document.querySelector(".output");
const outputError = document.querySelector(".output-error");
const outputValue = document.querySelector(".output-value");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  const value = parseLocalizedNumber(input.value);

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

function parseLocalizedNumber(input) {
  if (typeof input !== "string") return NaN;

  input = input.trim();

  const lastComma = input.lastIndexOf(",");
  const lastDot = input.lastIndexOf(".");

  let decimalSeparator = null;
  let thousandsSeparator = null;

  // Determinar cuál es el separador decimal (el último que aparece)
  if (lastComma > lastDot) {
    decimalSeparator = ",";
    thousandsSeparator = ".";
  } else if (lastDot > lastComma) {
    decimalSeparator = ".";
    thousandsSeparator = ",";
  }

  // Si no hay separadores, intentamos convertir directamente
  if (decimalSeparator === null) return parseFloat(input);

  // Eliminamos todos los separadores de miles (anteriores al último separador)
  const parts = input.split(decimalSeparator);
  let integerPart = parts[0].replace(
    new RegExp(`\\${thousandsSeparator}`, "g"),
    ""
  );
  let decimalPart = parts[1] || "";

  // Unimos usando punto como separador decimal universal
  const normalized = `${integerPart}.${decimalPart}`;

  const result = parseFloat(normalized);
  return isNaN(result) ? NaN : result;
}
