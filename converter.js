import fs from 'fs';
import Papa from 'papaparse';

// Regex to clean quotations
function validateString(string) {
    return JSON.parse(string.replace(/'/g, '"').replace(/"#/g, '\\"#').replace(/",/g, '", '));
}

// Read CSV, save to list, parse list
const fileContent = fs.readFileSync('./assets/data.csv', 'utf8');

const parsedData = Papa.parse(fileContent);

const headerProps = parsedData.data[0]

// Iterate and store values to object
try {
const jsonArr = []
for (let i = 1; i < parsedData.data.length;i++) {
    const line = parsedData.data[i]
 
    const obj = { iduser: line[0], f_name: line[1], l_name: line[2], DOB: line[3], gender: line[4], homeStatus_home_type: line[5], homeStatus_mortgage: line[6], occupation_occ_name: line[7], occupation_occ_desc: line[8], income_income_level: line[9], income_income_desc: line[10], education_edu_level: line[11], education_edu_desc: line[12], education_alma_mater: line[13], affiliations: validateString(line[14]), socialViews: validateString(line[15]), socialMedia: validateString(line[16]), posts: validateString(line[17]) }
    
    jsonArr.push(obj)
    
    // Write file
    const content = JSON.stringify(jsonArr)
    await fs.writeFileSync('./assets/data.json',content)

}
} catch(err) {
    console.log('parsing error: ',err)
}

