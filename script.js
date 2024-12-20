document.addEventListener('DOMContentLoaded', () => {
  const steps = Array.from(document.querySelectorAll('.form-step'));
  const nextBtns = document.querySelectorAll('.btn-next');
  const prevBtns = document.querySelectorAll('.btn-prev');
  const form = document.getElementById('registrationForm');

  let currentStep = 0;

  // Navigate to the next step
  nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (validateForm(steps[currentStep])) {
        steps[currentStep].classList.remove('form-step-active');
        currentStep++;
        steps[currentStep].classList.add('form-step-active');
      }
    });
  });

  // Navigate to the previous step
  prevBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      steps[currentStep].classList.remove('form-step-active');
      currentStep--;
      steps[currentStep].classList.add('form-step-active');
    });
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulate form submission
    setTimeout(() => {
      showPopup("Form submitted successfully!");
      form.reset();
      steps.forEach(step => step.classList.remove('form-step-active'));
      steps[0].classList.add('form-step-active');
      currentStep = 0;
    }, 500);
  });

  // Validate the current step's inputs
  function validateForm(step) {
    const inputs = Array.from(step.querySelectorAll('input'));
    return inputs.every((input) => input.value.trim() !== '');
  }

  // Show popup with message
  function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.classList.add('popup-fade-out');
      popup.addEventListener('transitionend', () => popup.remove());
    }, 3000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const formSteps = document.querySelectorAll(".form-step");
  const nextButtons = document.querySelectorAll(".btn-next");
  const prevButtons = document.querySelectorAll(".btn-prev");
  let currentStep = 0;

  // Show the current form step
  const showStep = (stepIndex) => {
      formSteps.forEach((step, index) => {
          if (index === stepIndex) {
              step.classList.add("form-step-active");
          } else {
              step.classList.remove("form-step-active");
          }
      });
  };

  // Show the first step initially
  showStep(currentStep);

  // Handle next button click
  nextButtons.forEach(button => {
      button.addEventListener("click", () => {
          if (currentStep < formSteps.length - 1) {
              currentStep++;
              showStep(currentStep);
          }
      });
  });

  // Handle previous button click
  prevButtons.forEach(button => {
      button.addEventListener("click", () => {
          if (currentStep > 0) {
              currentStep--;
              showStep(currentStep);
          }
      });
  });

  // Review Section (Display form values before submit)
  const reviewSection = document.getElementById("reviewSection");
  const formElements = document.querySelectorAll("input, select, textarea");

  formElements.forEach(element => {
      element.addEventListener("input", () => {
          const formData = new FormData(document.getElementById("registrationForm"));
          reviewSection.innerHTML = "<h3>Review your data:</h3>";
          formData.forEach((value, key) => {
              const p = document.createElement("p");
              p.textContent = `${key}: ${value}`;
              reviewSection.appendChild(p);
          });
      });
  });
});

document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();  // This prevents the form from submitting directly
  
  // Create a FormData object to send the form data via AJAX
  var formData = new FormData(this);
  
  // Send the form data using fetch or XMLHttpRequest
  fetch("submit.php", {
      method: "POST",
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);  // Handle the response from the server
  })
  .catch(error => console.error("Error:", error));
});
