const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let count = 0

fs.createReadStream('data/initiatives.csv')
  .pipe(csv())
  .on('data', (data) => {
    count++
    results.push({"location": {
      "name": data['Location / town'],
      "address": data['Address'],
      "latlng": {
        "lat": data['Latitude'],
        "lng": data['Longitude'],
      }
    },
      "name": data['Initiative name'],
      "group": data['Group / organisation'],
      "contactName": data['Contact name'],
      "email": data['Email'],
      "website": data['Website'],
      "summary": data['Brief description'],
      "status": "implementation",
      "sector": data['Sector'],
      "theme": data['Theme'],
      "solution": data['Solution'],
      "addedBy": data['Added by'],
      "notes": data['Notes'],
      "timestamp": data['Timestamp'],
    })
  })
  .on('end', () => {
    fs.writeFile('data/initiatives.json', JSON.stringify(results, null, 2), function(err) {
      if (err) {
        console.log('Error', err)
      } else {
        console.log('updated')
      }
    })
  });
