module.exports = [
  {
    name: 'Energy',
    themes: [
      {
        name: 'Electricty Generation',
        classes: [
          {
            name: 'Solar PV',
            solutions: [
              {name: 'Rooftop Solar PV'},
              {name: 'Solar PV Farms'},
            ],
          },
          {
            name: 'Wind',
            solutions: [
              {name: 'Micro Wind'},
              {name: 'Wind Turbines (Offshore)'},
              {name: 'Wind Turbines (Onshore)'},
            ],
          }
        ]
      }
    ]
  },
  {
    name: 'Food',
    themes: [
      {
        name: 'Agriculture & Land',
        classes: [
          {
            name: 'Farm Management',
            solutions: [
              {name: 'Farmland Irrigation'},
              {name: 'Farmland Restoration'},
            ]
          }
        ]
      }
    ],
  }
]
