/**
 * This script gathers datasets of court case documents, motions, and decisions/orders
 * related to NYC housing court involving illegal apartments converted from commercial
 * to residential, contradicting the certificate of occupancy and/or lacking a certificate
 * of occupancy. The sources used are CaseText and Justia.
 */

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const CASETEXT_URL = 'https://casetext.com';
const JUSTIA_URL = 'https://www.justia.com';

async function fetchCaseTextData() {
    const searchUrl = `${CASETEXT_URL}/search?q=NYC+housing+court+illegal+apartments+converted+from+commercial+to+residential+certificate+of+occupancy`;
    const response = await fetch(searchUrl);
    const body = await response.text();
    const $ = cheerio.load(body);

    const cases = [];
    $('.search-result').each((i, element) => {
        const title = $(element).find('.search-result-title').text().trim();
        const link = $(element).find('.search-result-title a').attr('href');
        const snippet = $(element).find('.search-result-snippet').text().trim();
        cases.push({ title, link: `${CASETEXT_URL}${link}`, snippet });
    });

    return cases;
}

async function fetchJustiaData() {
    const searchUrl = `${JUSTIA_URL}/search?q=NYC+housing+court+illegal+apartments+converted+from+commercial+to+residential+certificate+of+occupancy`;
    const response = await fetch(searchUrl);
    const body = await response.text();
    const $ = cheerio.load(body);

    const cases = [];
    $('.result').each((i, element) => {
        const title = $(element).find('.result-title').text().trim();
        const link = $(element).find('.result-title a').attr('href');
        const snippet = $(element).find('.result-snippet').text().trim();
        cases.push({ title, link: `${JUSTIA_URL}${link}`, snippet });
    });

    return cases;
}

async function gatherData() {
    try {
        const caseTextData = await fetchCaseTextData();
        const justiaData = await fetchJustiaData();

        const data = {
            caseText: caseTextData,
            justia: justiaData
        };

        const outputPath = path.join(__dirname, 'court_cases.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
        console.log('Data successfully gathered and saved to court_cases.json');
    } catch (error) {
        console.error('Error gathering data:', error);
    }
}

gatherData();