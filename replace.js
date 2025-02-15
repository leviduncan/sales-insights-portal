const fs = require('fs');
const path = require('path');

const filePath = './public/financial-data.json';
const fileContent = fs.readFileSync(filePath, 'utf8');
const regex = /"Discounts":" \$- /g;
const replacedContent = fileContent.replace(regex, (match) => {
  const randomNumber = (Math.floor(Math.random() * 9800) + 200).toFixed(2);
  return `"Discounts":"$${randomNumber}`;
});

fs.writeFileSync(filePath, replacedContent);