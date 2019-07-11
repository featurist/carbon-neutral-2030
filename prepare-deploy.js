const fs = require('fs-extra')

return fs.mkdirp('public/dist/images')
  .then(async () => {
    await fs.copy('index.html', 'public/index.html')
    await fs.copy('node_modules/leaflet/dist/images', 'dist/images')
    await fs.copy('dist', 'public/dist')
    await fs.copy('images', 'public/images')
    await fs.copy('logos', 'public/logos')
  })
