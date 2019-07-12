const fs = require('fs')
const flatten = require('lowscore/flatten')
const sectors = require('../data/taxonomy-hierarchy')

const flat = flatten(sectors.map(sector => {
  return sector.themes.map(theme => {
    return theme.classes.map(initiativeClass => {
      return initiativeClass.solutions.map(solution => {
        return {
          sector: sector.name,
          theme: theme.name,
          class: initiativeClass.name,
          solution: solution.name,
        }
      })
    })
  })
}))

fs.writeFile('data/taxonomy.json', JSON.stringify(flat, null, 2), error => {
  if(error) {
    console.log('Error', error)
  } else {
    console.log('Done')
  }
})
