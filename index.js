// Step 1: Simulate User Behavior
// - Add event listeners for button clicks and form submissions.
// - Use JavaScript to dynamically update the DOM based on user actions.

// Step 2: DOM Manipulation Functions
// - Implement functions to add, update, and remove DOM elements.
// - Ensure all elements are dynamically created with appropriate attributes and content.

// Step 3: Error Handling
// - Display error messages in the DOM for invalid inputs or missing elements.
// - Create reusable functions to handle common error cases.

// Step 4: Reusable Utilities
// - Create modular utility functions, such as createElement(tag, attributes).
// - Ensure all functions follow DRY principles for maintainability.
function addElementToDOM(elementId, text) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = text;
  }
}

function removeElementFromDOM(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.remove();
  }
}

function simulateClick(elementId, newText) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = newText;
  }
}

function handleFormSubmit(formId, outputId) {
  const form = document.getElementById(formId);
  const input = document.getElementById('user-input');
  const output = document.getElementById(outputId);
  const error = document.getElementById('error-message');

  const value = input.value.trim();

  if (!value) {
    error.textContent = 'Input cannot be empty';
    error.classList.remove('hidden');
    return;
  }

  // hide error if input is valid
  error.classList.add('hidden');
  error.textContent = '';

  output.textContent = value;
}

// Export functions so Jest can access them
module.exports = {
  addElementToDOM,
  removeElementFromDOM,
  simulateClick,
  handleFormSubmit,
};
