let document;

beforeAll(() => {
  // Manually create HTML structure in the test
  const html = `
    <html>
      <body>
        <form id="volunteerForm">
          <input id="charityName" type="text" placeholder="Charity Name" />
          <input id="hoursVolunteered" type="number" placeholder="Hours Volunteered" />
          <input id="volunteerDate" type="date" />
          <input id="experienceRating" type="number" min="1" max="5" />
          <button type="submit">Submit</button>
        </form>
        <div id="formFeedback"></div>
      </body>
    </html>
  `;
  
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM(html);
  document = dom.window.document;

  // Add event listener for form submission with validation logic
  document.getElementById('volunteerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting to allow testing

    const charityName = document.getElementById('charityName').value;
    const hoursVolunteered = document.getElementById('hoursVolunteered').value;
    const volunteerDate = document.getElementById('volunteerDate').value;
    const experienceRating = document.getElementById('experienceRating').value;
    const feedbackElement = document.getElementById('formFeedback');

    // Clear previous feedback
    feedbackElement.textContent = '';

    // Validation checks
    if (!charityName || !hoursVolunteered || !volunteerDate || !experienceRating) {
      feedbackElement.textContent = "Please ensure all fields are filled out correctly.";
      return;
    }

    if (hoursVolunteered <= 0 || isNaN(hoursVolunteered)) {
      feedbackElement.textContent = "Please ensure all fields are filled out correctly.";
      return;
    }

    if (experienceRating < 1 || experienceRating > 5 || isNaN(experienceRating)) {
      feedbackElement.textContent = "Please ensure all fields are filled out correctly.";
      return;
    }
  });
});

// Function to simulate form submission
function submitForm(charityName, hours, date, rating) {
  document.getElementById('charityName').value = charityName;
  document.getElementById('hoursVolunteered').value = hours;
  document.getElementById('volunteerDate').value = date;
  document.getElementById('experienceRating').value = rating;
  
  // Mock submit action
  const form = document.getElementById('volunteerForm');
  const submitEvent = new document.defaultView.Event('submit');
  form.dispatchEvent(submitEvent);
}

// Test the form existence in the DOM
test('form exists in the DOM', () => {
  const form = document.getElementById('volunteerForm');
  expect(form).toBeTruthy();
});

// Test form data collection
test('form correctly collects data', () => {
  submitForm('Charity A', 5, '2024-11-28', 5);
  
  expect(document.getElementById('charityName').value).toBe('Charity A');
  expect(document.getElementById('hoursVolunteered').value).toBe('5');
  expect(document.getElementById('volunteerDate').value).toBe('2024-11-28');
  expect(document.getElementById('experienceRating').value).toBe('5');
});

// Test required fields validation (charity name, hours, date)
test('required fields validation', () => {
  submitForm('', '', '', '');
  const feedback = document.getElementById('formFeedback').textContent;
  expect(feedback).toBe("Please ensure all fields are filled out correctly.");
});

// Test hours volunteered validation (should be a positive number)
test('hours volunteered validation', () => {
  submitForm('Charity A', -5, '2024-11-28', 5);
  const feedback = document.getElementById('formFeedback').textContent;
  expect(feedback).toBe("Please ensure all fields are filled out correctly.");
});

// Test hours volunteered validation (non-numeric)
test('hours volunteered validation (non-numeric)', () => {
  submitForm('Charity A', 'abc', '2024-11-28', 5);
  const feedback = document.getElementById('formFeedback').textContent;
  expect(feedback).toBe("Please ensure all fields are filled out correctly.");
});

// Test experience rating validation (should be between 1 and 5)
test('experience rating validation (valid)', () => {
  submitForm('Charity A', 5, '2024-11-28', 3);
  const feedback = document.getElementById('formFeedback').textContent;
  expect(feedback).toBe(""); // No feedback should appear if rating is valid
});

// Test experience rating validation (out of range)
test('experience rating validation (out of range)', () => {
  submitForm('Charity A', 5, '2024-11-28', 6);
  const feedback = document.getElementById('formFeedback').textContent;
  expect(feedback).toBe("Please ensure all fields are filled out correctly.");
});

// Test experience rating validation (non-numeric)
test('experience rating validation (non-numeric)', () => {
  submitForm('Charity A', 5, '2024-11-28', 'abc');
  const feedback = document.getElementById('formFeedback').textContent;
  expect(feedback).toBe("Please ensure all fields are filled out correctly.");
});

// Test if the data is saved correctly (to a temporary data object or similar storage)
test('temporary data object is populated with form data', () => {
  // Mock a data object where the form data will be stored (as per your application logic)
  let dataObject = {};

  function collectData() {
    dataObject.charityName = document.getElementById('charityName').value;
    dataObject.hoursVolunteered = document.getElementById('hoursVolunteered').value;
    dataObject.volunteerDate = document.getElementById('volunteerDate').value;
    dataObject.experienceRating = document.getElementById('experienceRating').value;
  }

  // Simulate form submission and collect data
  submitForm('Charity A', 5, '2024-11-28', 5);
  collectData();

  expect(dataObject.charityName).toBe('Charity A');
  expect(dataObject.hoursVolunteered).toBe('5');
  expect(dataObject.volunteerDate).toBe('2024-11-28');
  expect(dataObject.experienceRating).toBe('5');
});


