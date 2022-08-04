const express = require('express');
const config = require('config');
const axios = require('axios');
const R = require('ramda');

const { createObjectCsvStringifier } = require('csv-writer');

const app = express();

app.use(express.json({ limit: '10mb' }))

app.get('/investments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data } = await axios.get(`${config.investmentsServiceUrl}/investments/${id}`);

        res.send(data);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

app.get('/report', async (_, res) => {
    try {
        const allInvestments = await axios.get(`${config.investmentsServiceUrl}/investments`);
        const allFinancialCompanies = await axios.get(`${config.financialCompaniesServiceUrl}/companies`);
    
        const records = [];
        const csv = createObjectCsvStringifier({
            header: [
                { id: 'user', title: 'User'},
                { id: 'firstName', title: 'First Name'},
                { id: 'lastName', title: 'Last Name'},
                { id: 'date', title: 'Date'},
                { id: 'holding', title: 'Holding'},
                { id: 'value', title: 'Value'}
            ]
        });
    
        allInvestments.data.map(({ userId, firstName, lastName, date, investmentTotal, holdings }) => {
            holdings.map(({ id, investmentPercentage }) => {
                const value = investmentTotal * investmentPercentage;
                const company = R.find(R.propEq('id', id))(allFinancialCompanies.data);
        
                records.push({
                    user: userId,
                    firstName,
                    lastName,
                    date,
                    holding: company.name,
                    value
                });
            });
        });
    
        await axios.post(`${config.investmentsServiceUrl}/investments/export`, {
            report: csv.getHeaderString() + csv.stringifyRecords(records)
        });
    
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
})

app.listen(config.port, (err) => {
    if (err) {
        console.error('Error occurred starting the server', err);
        process.exit(1);
    }

    console.log(`Server running on port ${config.port}`);
})

module.exports = { app };
