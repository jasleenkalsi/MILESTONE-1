
  // Pure function to validate the donation form inputs
function validateDonationForm({ charityName, donationAmount, donationDate }) {
    const errors = [];

    if (!charityName) errors.push('Charity name is required.');
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
        errors.push('Donation amount must be a positive number.');
    }
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

    // Store donation data
    const donationData = {
        charityName,
        amount: donationAmount,
        date: donationDate,
        comment: donorComment,
    };

    // Save to localStorage
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    donations.push(donationData);
    localStorage.setItem('donations', JSON.stringify(donations));

    // Reload the table
    loadDonations();

    console.log('Donation submitted:', donationData);
    alert('Thank you for your donation!');

    // Reset form
    document.getElementById('donation-form').reset();
}

// Function to load donations from localStorage and populate the table
function loadDonations() {
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    const tableBody = document.querySelector('#donationTable tbody');
    tableBody.innerHTML = '';

    donations.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${donation.charityName}</td>
            <td>${donation.amount}</td>
            <td>${donation.date}</td>
            <td>${donation.comment || 'No comment'}</td>
            <td><button data-index="${index}" class="delete-btn">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    updateSummary();
}

// Function to update the summary section
function updateSummary() {
    const donations = JSON.parse(localStorage.getItem('donations')) || [];
    const totalAmount = donations.reduce((sum, donation) => sum + parseFloat(donation.amount), 0);
    document.getElementById('summary').textContent = `Total Donations: $${totalAmount.toFixed(2)}`;
}

// Function to handle deletion of a donation record
document.querySelector('#donationTable').addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        const donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.splice(index, 1);
        localStorage.setItem('donations', JSON.stringify(donations));
        loadDonations();
    }
});

// Attach the event listener to the form
if (typeof document !== 'undefined') {
    document.getElementById('donation-form').addEventListener('submit', handleFormSubmission);
}

// Initial load of donations
if (typeof document !== 'undefined') {
    loadDonations();
}

// Export functions for testing
module.exports = { validateDonationForm };
