const { JSDOM } = require('jsdom');
const { validateDonationForm } = require('../donation_tracker.js');

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
});

describe('DOM Integration Tests', () => {
    let dom, document;

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
            </body>
            </html>`);
        document = dom.window.document;

        // Mock `document` globally for tests
        global.document = document;
    });

    afterEach(() => {
        // Cleanup the global mock
        delete global.document;
    });

    test('Form elements should have correct initial values', () => {
        expect(document.getElementById('charity-name').value).toBe('Red Cross');
        expect(document.getElementById('donation-amount').value).toBe('50');
        expect(document.getElementById('donation-date').value).toBe('2024-11-28');
    });
});
