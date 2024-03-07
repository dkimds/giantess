const app = require('./app') // the actual Express application
const logger = require('./utils/logger')
const PORT = process.env.PORT

const cors = require('cors')
app.use(cors())

app.listen(PORT || 3001, () => {
  logger.info(`Server running on port ${PORT}`)
})