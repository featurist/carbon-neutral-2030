import hyperdom from 'hyperdom'
const taxonomy = require('../data/taxonomy.json')

taxonomy.forEach(entry => {
  entry.search = `${entry.sector.toLowerCase()} ${entry.theme.toLowerCase()} ${entry.class.toLowerCase()} ${entry.solution.toLowerCase()}`
})
function renderLoading () {
  return 'Loading...'
}

export default class SolutionLookup {
  constructor() {
    this.results = []
    this.isValid = false
    this.solutions = []
  }

  render() {
    return <div class="AddInitiativeSolution-lookup">
      <div>
        <input type="text" binding="this.value" placeholder="Search solutions e.g. Solar" />
        <button onclick={() => this.toggleAll()}>&#x21b4;</button>
      </div>
      {this.renderResults()}
    </div>
  }

  toggleAll() {
    if (this.results.length === taxonomy.length) {
      this.results = []
    } else {
      this.results = taxonomy.slice(0)
    }
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
  }

  addSolution (solution) {
    this.solutions.push(solution)
    this.value = ''
    this.results = []
  }

  async search() {
    if (this.value) {
      this.inProgress = true
      const value = this.value.toLowerCase()
      const results = taxonomy.filter(entry => {
        return entry.search.includes(value)
      })
      console.log('search', results, taxonomy, this.value)
      this.results = results
    } else {
      this.results = []
    }
    this.inProgress = false
    this.refresh()
  }

  onadd(element) {
    element
      .querySelector('input[type=text]')
      .addEventListener('input', () => {
        this.inProgress = true
        this.search()
      })
  }
}

