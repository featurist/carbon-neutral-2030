import hyperdom from 'hyperdom'
const taxonomy = require('../data/taxonomy.json')
const taxonomyHierarchy = require('../data/taxonomy-hierarchy')

taxonomy.forEach(entry => {
  entry.search = `${entry.sector.toLowerCase()} ${entry.theme.toLowerCase()} ${entry.class.toLowerCase()} ${entry.solution.toLowerCase()}`
})
function renderLoading () {
  return 'Loading...'
}

export default class SolutionLookup {
  constructor() {
    this.isValid = false
    this.solutions = []
    this.value = ''
    this.results = []
    this.navigation = {}
  }

  render() {
    return <div class="AddInitiativeSolution-lookup">
      {this.renderResults()}
    </div>
  }

  navigate({sector, theme, solutionClass} = {}) {
    if (sector) {
      this.navigation = {sector}
      return
    }
    if (theme) {
      this.navigation = {
        sector: this.navigation.sector,
        theme,
      }
      return
    }
    if (solutionClass) {
      this.navigation = {
        sector: this.navigation.sector,
        theme: this.navigation.theme,
        solutionClass,
      }
      return
    }
    this.navigation = {}
  }

  renderResults() {
    if (this.inProgress) {
      return renderLoading('Searching')
    }
    if (this.value && this.results.length === 0) {
      return <p>No results</p>
    }
    if (this.results.length > 0) {
      return <ul class="AddInitiativeResults">{this.results.map(solution => {
        return <li class="AddInitiativeResults-item" onclick={() => this.addSolution(solution)}>
          {solution.sector} > {solution.theme} > {solution.class} > {solution.solution}
        </li>
      })}</ul>
    }
    if (this.navigation) {
      return <div class="AddInitiativeSolution-groupResults">
          {this.renderBreadcrumb()}
        <div class="AddInitiativeSolution-groupContainer">
            {this.renderSectors()}
            {this.renderThemes()}
            {this.renderClasses()}
            {this.renderSolutions()}
        </div>
      </div>
    }
  }

  renderBreadcrumb() {
    const self = this
    function renderSector() {
      if (self.navigation.sector) {
        return <span onclick={() => self.navigate({sector: self.navigation.sector})}>{self.navigation.sector.name}</span>
      }
    }
    function renderTheme() {
      if (self.navigation.theme) {
        return [<span>&nbsp;>&nbsp;</span>, <span onclick={() => self.navigate({theme: self.navigation.theme})}>{self.navigation.theme.name}</span>]
      }
    }
    function renderSolutionClass() {
      if (self.navigation.solutionClass) {
        return [<span>&nbsp;>&nbsp;</span>, <span onclick={() => self.navigate({solutionClass: self.navigation.solutionClass})}>{self.navigation.solutionClass.name}</span>]
      }
    }
    function renderClear() {
      if (self.navigation.sector || self.navigation.theme || self.navigation.solutionClass) {
        return <span class="AddInitiativeSolution-clear" onclick={() => self.navigate()}>[ clear ]</span>
      }
    }
    return <div class="AddInitiativeSolution-breadcrumb">
      {renderSector()}
      {renderTheme()}
      {renderSolutionClass()}
      {renderClear()}
    </div>
  }

  renderSectors() {
    return <ul class={{'AddInitiativeSolution-group': true, 'AddInitiativeSolution-groupSelected': this.navigation.sector}}>
        {taxonomyHierarchy.map(sector => {
          return <li onclick={() => this.navigate({sector})}>{sector.name}</li>
        })}
    </ul>
  }

  renderThemes() {
    if (this.navigation.sector) {
      return <ul class={{'AddInitiativeSolution-group': true, 'AddInitiativeSolution-groupSelected': this.navigation.theme}}>
          {this.navigation.sector.themes.map(theme => {
            return <li onclick={() => this.navigate({theme})}>{theme.name}</li>
          })}
          </ul>
    }
  }

  renderClasses() {
    if (this.navigation.theme) {
      return <ul class={{'AddInitiativeSolution-group': true, 'AddInitiativeSolution-groupSelected': this.navigation.solutionClass}}>
          {this.navigation.theme.classes.map(solutionClass => {
            return <li onclick={() => this.navigate({solutionClass})}>{solutionClass.name}</li>
          })}
          </ul>
    }
  }

  renderSolutions() {
    if (this.navigation.solutionClass) {
      return <ul class="AddInitiativeSolution-group">
          {this.navigation.solutionClass.solutions.map(solution => {
            return <li onclick={() => this.addSolution({
              sector: this.navigation.sector.name,
              theme: this.navigation.theme.name,
              class: this.navigation.solutionClass.name,
              solution: solution.name,
            })}>{solution.name} [ add ]</li>
          })}
          </ul>
    }
  }

  addSolution (solution) {
    this.solutions.push(solution)
    this.value = ''
    this.results = []
  }

  removeSolution (solution) {
    const solutionIndex = this.solutions.indexOf(solution)
    this.solutions.splice(solutionIndex, 1)
  }

  async search() {
    if (this.value) {
      this.inProgress = true
      const value = this.value.toLowerCase()
      const results = taxonomy.filter(entry => {
        return entry.search.includes(value)
      })
      this.results = results
    } else {
      this.results = []
    }
    this.inProgress = false
  }
}

