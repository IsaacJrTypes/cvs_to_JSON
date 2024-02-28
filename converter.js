import fs from 'fs';
import Papa from 'papaparse';

// Regex to clean quotations
function validateString(string) {
    return JSON.parse(string.replace(/'/g, '"').replace(/"#/g, '\\"#').replace(/",/g, '", '));
}

// Read CSV, save to list, parse list
const fileContent = fs.readFileSync('./assets/data.csv', 'utf8');

const parsedData = Papa.parse(fileContent);

const headerProps = parsedData.data[0];

// Iterate and store values to object
try {
    const jsonArr = [];
    for (let i = 1; i < parsedData.data.length; i++) {
        const parsedLine = parsedData.data[i];
        const obj = {};
        for (let j = 0; j < headerProps.length; j++) {
            const nestedJsonString = 14;
            if (j < nestedJsonString) {
                obj[headerProps[j]] = parsedLine[j];
                continue;
            }
            obj[headerProps[j]] = validateString(parsedLine[j]);
        }
        jsonArr.push(obj);

        // Write file
        const content = JSON.stringify(jsonArr, null, 2);
        await fs.writeFileSync('./assets/data.json', content);

    }
} catch (err) {
    console.log('parsing error: ', err);
}

