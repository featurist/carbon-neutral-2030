import hyperdom from 'hyperdom'
import SolutionLookup from './solutionLookup'
import locationPicker from './locationPicker'
import debounce from './debounce'
import http from 'httpism'

class App {
  constructor () {
    this.initiative = {
      location: {}
    }
    this.solution = new SolutionLookup()
  }
  onadd () {
    this.locationPicker = locationPicker('location', this.initiative.location)
  }
  escapeRegExp(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  render () {
    return <div class="AddInitiative-form">
      <h2 class="AddInitiative-formHeading">Initiative</h2>
      
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Name:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.name" placeholder="Food for life" />
      </label>      
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Summary:</span>
        <textarea class="AddInitiative-textarea" binding="this.initiative.summary" placeholder="Provides food for those in need in the Pleasentville area"></textarea>
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Initiative Image:</span>
        <input type="file" />
      </label>

      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Anticipated Carbon Saving:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.anticipatedCarbonSaving" placeholder="200kgCO2e" />
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
        <span class="AddInitiative-text">Telephone:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.telephone" placeholder="075 555 555 55" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Lead Group:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.leadGroup" placeholder="Transition Pleasentville" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Status:</span>
        <select class="AddInitiative-input" binding="this.initiative.status">
          <option>Initiation</option>
          <option>Planning</option>
          <option>Implementation</option>
          <option>Operational</option>
          <option>Completed</option>
          <option>Abandoned</option>
        </select>
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Related Initiative(s):</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.relatedInitiatives" placeholder="Pleasentville Energy Trust, Hopeville Solar" />
      </label>

      <h2 class="AddInitiative-formHeading">Solutions</h2>
      
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Solutions:</span>
          {this.renderSolutions()}
      </label>
      <div class="AddInitiative-formItem">
        <span class="AddInitiative-text">Add Solution:</span>
          {this.solution}
      </div>

      <h2 class="AddInitiative-formHeading">Location</h2>

      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Locality:</span> <input type="text" binding="this.initiative.location.locality" placeholder="Pleasentville Town Centre" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Postcode:</span> <input type="text" binding="this.initiative.location.postcode" placeholder="PT2 3HS" oninput={() => this.lookupPostcodeCoordinates()} />
        {this.renderInvalidPostcodeMessage()}
      </label>
      <label class="AddInitiative-formItem">
        <p>Drag the marker to the location of the initiative</p>
        <div class="AddInitiative-location" id="location">
        </div>
      </label>

      <h2 class="AddInitiative-formHeading">Partner Group</h2>

      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Partner Group(s):</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.partnerGroups" placeholder="Transition Pleasentville" />
      </label>
      <label class="AddInitiative-formItem">
        <span class="AddInitiative-text">Partner Group(s) Role:</span>
        <input class="AddInitiative-input" type="text" binding="this.initiative.partnerGroupsRole" placeholder="GCEC are providing fulfilment of the project while XYZ Schools Trust have underwritten the financial case" />
      </label>
      <div class="AddInitiative-formItem">
      </div>
      <label class="AddInitiative-formItem AddInitiative-fullWidth">
        <button>Add Initiative</button>
      </label>
    </div>
  }

  renderInvalidPostcodeMessage() {
    if (this.invalidPostcode) {
      return <span class="AddInitiative-inputError">The supplied postcode is invalid - please enter a valid postcode</span>
    }
  }

  async lookupPostcodeCoordinates() {
    if (!this.locationPicker.isDefaultLocation()) {
      return
    }
    debounce(async () => {
      const {status, result} = await http.get(`https://api.postcodes.io/postcodes/${this.initiative.location.postcode}`, {exceptions: false})
      this.invalidPostcode = status !== 200
      this.refresh()
      if (status === 200) {
        this.locationPicker.markerAt([result.latitude, result.longitude])
      }
    }, 1000)()
  }

  renderSolutions() {
    if (this.solution.solutions.length === 0) {
      return <div>Please select a solution</div>
    } else {
      return <ul class="AddInitiativeSolution-solutions">{this.solution.solutions.map(solution => {
        return <li>{solution.sector} > {solution.theme} > {solution.class} > {solution.solution} <span class="AddInitiativeSolution-removeSolution" onclick={() => this.solution.removeSolution(solution)}>[ remove ]</span></li>
      })}
    </ul>
    }
  }
}

export default function () {
  hyperdom.append(
    document.querySelector('#add-initiative'),
    new App(),
  )
}
