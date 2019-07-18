import hyperdom from 'hyperdom'
import SolutionLookup from './solutionLookup'
import locationPicker from './locationPicker'

class App {
  constructor () {
    this.initiative = {
      location: {}
    }
    this.solution = new SolutionLookup()
  }
  onadd () {
    locationPicker('location', this.initiative.location)
  }
  escapeRegExp(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  render () {
    return <div class="AddInitiative-form">
      
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Name:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.name" placeholder="Food for life" />
      </label>      
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Description:</span>
        <textarea class="AddInitiative-textarea" binding="this.initiative.summary" placeholder="Provides food for those in need in the Pleasentville area"></textarea>
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Website:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.website" placeholder="https://foodforlife.example" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Contact Name:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.contactName" placeholder="John Foodie" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Email:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.email" placeholder="john@foodforlife.example" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Group:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.group" placeholder="Transition Pleasentville" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Status:</span>
        <select class="AddInitiative-input" binding="this.initiative.status"><option>Planning</option><option>In Progress</option><option>Complete</option><option>Ongoing</option></select>
      </label>
      <div class="AddInitiative-formItem">
      </div>

      
      <h2 class="AddInitiative-formHeading">Solutions</h2>
      
      {/* Needs refactor to follow the format above */}
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Solutions:</span>
          {this.renderSolutions()}
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Add Solution:</span>
          {this.solution}
      </label>
      <h2 class="AddInitiative-formHeading">Location</h2>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Name:</span> <input type="text" binding="this.initiative.location.name" placeholder="Pleasentville Town Centre" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Address:</span> <input type="text" binding="this.initiative.location.address" placeholder="23a High St, Pleasentville, PL3 5VL" />
      </label>
      <label class="AddInitiative-formItem">
        <p>Drag the marker to the location of the initiative</p>
        <div class="AddInitiative-location" id="location">
        </div>
      </label>
      <label class="AddInitiative-formItem AddInitiative-fullWidth">
        <button>Add Initiative</button>
      </label>
    </div>
  }

  renderSolutions() {
    if (this.solution.solutions.length === 0) {
      return <div>Please select a solution</div>
    } else {
    return this.solution.solutions.map(solution => {
      return <div>{solution.sector} > {solution.theme} > {solution.class} > {solution.solution}</div>
    })
    }
  }
}

export default function () {
  hyperdom.append(
    document.querySelector('#add-initiative'),
    new App(),
  )
}
