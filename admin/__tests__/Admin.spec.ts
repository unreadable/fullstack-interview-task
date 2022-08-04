// Unit Testing proof of concept

const axios = require('axios');
const request = require('supertest');
const assert = require('assert');

const { mocks } = require('./mocks');
const { app } = require('../src/index');

jest.mock('axios');

describe('GET /report', function() {
    it('responds with json', async () => {
        axios.get.mockImplementation(url => {
            if (url === mocks.investmentsServiceUrl + '/investments') {
                return Promise.resolve({ data: mocks.allInvestments });
            } else if (url === mocks.financialCompaniesServiceUrl + '/companies') {
                return Promise.resolve({ data: mocks.allCompanies });
            } else {
                return Promise.resolve({ data: [] });
            }
        });

        const response = await request(app).get('/report');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });

        // quick workaround not to keep the server open
        setTimeout(() => process.exit(0), 200);
    });
});
