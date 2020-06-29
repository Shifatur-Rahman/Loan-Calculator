//form
const loanForm = document.querySelector(".loan-form");
//loading
const loading = document.querySelector("#loading");
//results
const results = document.querySelector("#results");

// input form user
const loan_amount = document.querySelector("#loan");
const interest = document.querySelector("#interest");
const years = document.querySelector("#years");
// Result input
const result_monthly_payment = document.querySelector("#monthly-payment");
const result_total_payment = document.querySelector("#total-payment");
const result_total_interest = document.querySelector("#total-interest");

loanForm.addEventListener("submit", function (e) {
  loading.style.display = "block";
  results.style.display = "none";
  setTimeout(newResult, 1000);
  e.preventDefault();
});
function newResult() {
  // Monthly payment
  const principal = parseFloat(loan_amount.value);
  const total_interest = parseFloat(interest.value) / 100 / 12;
  const total_years = parseFloat(years.value) * 12;
  const upper_value = principal * total_interest;
  const down_value = 1 - Math.pow(1 + total_interest, -total_years);
  const monthly_pay = upper_value / down_value;
  //console.log(monthly_pay.toFixed(3));
  const total_payment = monthly_pay * total_years;
  //console.log(total_payment.toFixed(3));
  const total_interest_value = total_payment - principal;

  if (isFinite(monthly_pay)) {
    result_monthly_payment.value = monthly_pay.toFixed(2);
    result_total_payment.value = total_payment.toFixed(2);
    result_total_interest.value = total_interest_value.toFixed(2);

    loading.style.display = "none";
    results.style.display = "block";
  } else {
    showError("Please Check The Number");
  }
}

function showError(error) {
  loading.style.display = "none";
  results.style.display = "none";

  //Error Div

  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  var card = document.querySelector(".card");
  var heading = document.querySelector(".heading");

  card.insertBefore(errorDiv, heading);
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
