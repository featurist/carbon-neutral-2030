const ghpages = require('gh-pages')

ghpages.publish(
  'public',
  {
    branch: 'gh-pages',
    repo: 'git@github.com:featurist/carbon-neutral-2030.git',
  },
  (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Deploy Complete!')
    }
  }
)
