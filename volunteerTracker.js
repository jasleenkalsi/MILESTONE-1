document.getElementById('volunteerForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission to handle validation

    // Collect form values
    const charityName = document.getElementById('charityName').value.trim();
    const hoursVolunteered = parseFloat(document.getElementById('hoursVolunteered').value.trim());
    const date = document.getElementById('date').value;
    const experienceRating = parseInt(document.getElementById('experienceRating').value.trim());

    const errorMessages = [];
    const data = {};

    // Validate charity name
    if (!charityName) {
        errorMessages.push("Charity Name is required.");
    } else {
        data.charityName = charityName;
    }

    // Validate hours volunteered
    if (isNaN(hoursVolunteered) || hoursVolunteered <= 0) {
        errorMessages.push("Hours Volunteered must be a valid positive number.");
    } else {
        data.hoursVolunteered = hoursVolunteered;
    }

    // Validate date
    if (!date) {
        errorMessages.push("Date is required.");
    } else {
        data.date = date;
    }

    // Validate experience rating
    if (isNaN(experienceRating) || experienceRating < 1 || experienceRating > 5) {
        errorMessages.push("Experience Rating must be a number between 1 and 5.");
    } else {
        data.experienceRating = experienceRating;
    }

    // Show error messages if there are any
    if (errorMessages.length > 0) {
        document.getElementById('errorMessages').innerHTML = errorMessages.join('<br>');
    } else {
        // Store data temporarily (this could be replaced with actual storage in a real application)
        console.log("Form Data Submitted: ", data);

        // Optionally, reset the form after successful submission
        document.getElementById('volunteerForm').reset();
        document.getElementById('errorMessages').innerHTML = '';

        // Display the results section
        document.getElementById('resultsContainer').innerHTML = `
            <p><strong>Charity Name:</strong> ${data.charityName}</p>
            <p><strong>Hours Volunteered:</strong> ${data.hoursVolunteered} hours</p>
            <p><strong>Date of Volunteering:</strong> ${data.date}</p>
            <p><strong>Experience Rating:</strong> ${data.experienceRating} / 5</p>
        `;
    }
});
