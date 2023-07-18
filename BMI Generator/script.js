let calculateBtn = document.getElementById("calculate");
let calculateAgainBtn = document.getElementById("calculateAgain");
let calculationDiv = document.getElementById("calculation");
let guideDiv = document.getElementById("guide");
let result = document.getElementById("result");

let inputs = document.querySelectorAll(".myInput");
let warnings = document.querySelectorAll(".warning");

inputs.forEach((input, index) => {
    input.addEventListener('input', function() {
      if ((isNaN(input.value) && input.value.trim() !== '') || input.value.trim() === '') {
        warnings[index].style.display = 'block';
      } else {
        warnings[index].style.display = 'none';
      }
  
      // Check if any input field is empty
      var isAnyInputEmpty = Array.from(inputs).some(input => input.value.trim() === '');
      
      // Check if there are any warnings displayed
      var isAnyWarningDisplayed = Array.from(warnings).some(warning => warning.style.display === 'block');
  
      // If there are no warnings displayed and no input fields are empty, enable the submit button
      if (!isAnyWarningDisplayed && !isAnyInputEmpty) {
        calculateBtn.disabled = false;
      } else {
        calculateBtn.disabled = true;
      }
    });
  });

calculateBtn.addEventListener("click", () => {
  let height = document.getElementById("height").value;
  let weight = document.getElementById("weight").value;

  height = parseInt(height) / 100;
  weight = parseInt(weight);

  let bmiRatio = weight / (height * height);

  result.textContent = "Your BMI Ratio = " + bmiRatio.toFixed(2);
  calculationDiv.classList.add("result");
  guideDiv.classList.add("response");
  inputs.forEach((input) => {
    input.value = ""; // Clear each input field
  });
});

calculateAgainBtn.addEventListener("click", () => {
  calculationDiv.classList.remove("result");
  guideDiv.classList.remove("response");
  result.textContent = "";
  calculateBtn.disabled = true;
});
