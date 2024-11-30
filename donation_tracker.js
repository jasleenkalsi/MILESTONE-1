// Pure function to validate the donation form inputs
function validateDonationForm({ charityName, donationAmount, donationDate }) {
    const errors = [];

    if (!charityName) errors.push('Charity name is required.');
    if (!donationAmount || donationAmount <= 0) errors.push('Donation amount must be a positive number.');
    if (!donationDate) errors.push('Donation date is required.');

    return errors;
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault();

    // Retrieve form inputs
    const charityName = document.getElementById('charity-name').value.trim();
    const donationAmount = parseFloat(document.getElementById('donation-amount').value);
    const donationDate = document.getElementById('donation-date').value;
    const donorComment = document.getElementById('donor-comment').value.trim();

    // Validate form inputs
    const errors = validateDonationForm({ charityName, donationAmount, donationDate });
    if (errors.length > 0) {
        alert(`Please fix the following errors:\n${errors.join('\n')}`);
        return;
    }

    // Store the data in a temporary object
    const donationData = {
        charityName,
        donationAmount,
        donationDate,
        donorComment
    };

    console.log('Donation submitted:', donationData);
    alert('Thank you for your donation!');
}

// Attach the event listener to the form
if (typeof document !== 'undefined') {
    document.getElementById('donation-form').addEventListener('submit', handleFormSubmission);
}

// Export functions for testing
module.exports = { validateDonationForm };
