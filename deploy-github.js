const ghpages = require('gh-pages')
const fs = require('fs-extra')

fs.mkdir('public')
  .then(async () => {
    await fs.copy('index.html', 'public/index.html')
    await fs.copy('dist', 'public/dist')
    await fs.copy('images', 'public/images')
    await fs.copy('logos', 'public/logos')

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
  })
