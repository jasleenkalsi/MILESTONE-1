const { JSDOM } = require('jsdom');
const { validateDonationForm, handleFormSubmission } = require('../donation_tracker.js');

describe('Donation Tracker Form Validation', () => {
    test('Valid inputs should return no errors', () => {
        const validData = {
            charityName: 'Red Cross',
            donationAmount: 50,
            donationDate: '2024-11-28',
        };
        expect(validateDonationForm(validData)).toEqual([]);
    });

    test('Empty charity name should return an error', () => {
        const invalidData = {
            charityName: '',
            donationAmount: 50,
            donationDate: '2024-11-28',
        };
        expect(validateDonationForm(invalidData)).toContain('Charity name is required.');
    });

    test('Negative donation amount should return an error', () => {
        const invalidData = {
            charityName: 'Red Cross',
            donationAmount: -10,
            donationDate: '2024-11-28',
        };
        expect(validateDonationForm(invalidData)).toContain('Donation amount must be a positive number.');
    });

    test('Missing donation date should return an error', () => {
        const invalidData = {
            charityName: 'Red Cross',
            donationAmount: 50,
            donationDate: '',
        };
        expect(validateDonationForm(invalidData)).toContain('Donation date is required.');
    });

    test('Invalid donation amount (non-numeric) should return an error', () => {
        const invalidData = {
            charityName: 'Red Cross',
            donationAmount: 'invalid',
            donationDate: '2024-11-28',
        };
        expect(validateDonationForm(invalidData)).toContain('Donation amount must be a positive number.');
    });
});

describe('DOM Integration Tests', () => {
    let dom, document, window;

    beforeEach(() => {
        dom = new JSDOM(`<!DOCTYPE html>
            <html>
            <body>
                <form id="donation-form">
                    <input type="text" id="charity-name" value="Red Cross">
                    <input type="number" id="donation-amount" value="50">
                    <input type="date" id="donation-date" value="2024-11-28">
                    <textarea id="donor-comment"></textarea>
                    <button type="submit">Submit</button>
                </form>
                <div id="error-messages"></div>
            </body>
            </html>`);
        document = dom.window.document;
        window = dom.window;

        // Mock `document` and `window` globally for tests
        global.document = document;
        global.window = window;
    });

    afterEach(() => {
        // Cleanup the global mock
        delete global.document;
        delete global.window;
    });

    test('Form elements should have correct initial values', () => {
        expect(document.getElementById('charity-name').value).toBe('Red Cross');
        expect(document.getElementById('donation-amount').value).toBe('50');
        expect(document.getElementById('donation-date').value).toBe('2024-11-28');
    });

    test('Form submission with invalid data shows errors', () => {
        // Clear a required field to make the data invalid
        document.getElementById('charity-name').value = '';

        const mockEvent = { preventDefault: jest.fn() }; // Mock preventDefault
        handleFormSubmission(mockEvent);

        const errorMessages = document.getElementById('error-messages').textContent;
        expect(errorMessages).toContain('Charity name is required.');
    });

    test('Form submission with valid data does not show errors', () => {
        const mockEvent = { preventDefault: jest.fn() }; // Mock preventDefault
        handleFormSubmission(mockEvent);

        const errorMessages = document.getElementById('error-messages').textContent;
        expect(errorMessages).toBe(''); // No errors should be shown
    });
});
