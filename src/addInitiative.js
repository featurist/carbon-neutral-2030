import hyperdom from 'hyperdom'
import CategoryLookup from './categoryLookup'
import locationPicker from './locationPicker'

class App {
  constructor () {
    this.initiative = {
      location: {}
    }
    this.category = new CategoryLookup()
  }
  onadd () {
    locationPicker('location', this.initiative.location)
  }
  escapeRegExp(str) {
    return str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  render () {
    return <div class="add-initiative-form">
      <div class="add-initiative-pair">
        <label><span class="add-initiative-text">Name:</span> <input type="text" binding="this.initiative.name" placeholder="Food for life" /></label>
        <label><span class="add-initiative-text">Description:</span> <textarea binding="this.initiative.summary" placeholder="Provides food for those in need in the Pleasentville area"></textarea></label>
      </div>
      <div class="add-initiative-pair">
        <label><span class="add-initiative-text">Website:</span> <input type="text" binding="this.initiative.website" placeholder="https://foodforlife.example" /></label>
        <label><span class="add-initiative-text">Contact Name:</span> <input type="text" binding="this.initiative.contactName" placeholder="John Foodie" /></label>
      </div>
      <div class="add-initiative-pair">
        <label><span class="add-initiative-text">Email:</span> <input type="text" binding="this.initiative.email" placeholder="john@foodforlife.example" /></label>
        <label><span class="add-initiative-text">Group:</span> <input type="text" binding="this.initiative.group" placeholder="Transition Pleasentville" /></label>
      </div>
      <div class="add-initiative-pair">
        <label><span class="add-initiative-text">Status:</span> <select binding="this.initiative.status"><option>Planning</option><option>In Progress</option><option>Complete</option><option>Ongoing</option></select></label>
        <label></label>
      </div>
      <h2>Categories</h2>
      <div class="add-initiative-pair">
        <label><span class="add-initiative-text">Categories:</span> 
          {this.renderCategories()}
        </label>
        <label><span class="add-initiative-text">Add Category:</span> 
          {this.category}
        </label>
      </div>
      <h2>Location</h2>
      <div class="add-initiative-pair">
        <label><span class="add-initiative-text">Name:</span> <input type="text" binding="this.initiative.location.name" placeholder="Pleasentville Town Centre" /></label>
        <label><span class="add-initiative-text">Address:</span> <input type="text" binding="this.initiative.location.address" placeholder="23a High St, Pleasentville, PL3 5VL" /></label>
      </div>
      <p>Drag the marker to the location of the initiative</p>
      <div class="add-initiative-location" id="location">
      </div>
      <button>Add Initiative</button>
    </div>
  }

  renderCategories() {
    if (this.category.categories.length === 0) {
      return <div>Please select a category</div>
    } else {
    return this.category.categories.map(category => {
      return <div>{category.sector} > {category.theme} > {category.class} > {category.solution}</div>
    })
    }
  }
}

    //"name": "The Fruit Exchange",
export default function () {
  hyperdom.append(
    document.querySelector('#add-initiative'),
    new App(),
  )
}
