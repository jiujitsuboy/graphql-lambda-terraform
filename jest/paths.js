// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const rootDir = path.join(__dirname, '..')
const testDir = path.join(rootDir, 'test')
const typesDir = path.join(rootDir, 'types')

module.exports = {
  rootDir,
  testDir,
  typesDir,
}
