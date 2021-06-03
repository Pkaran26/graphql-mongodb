const express = require('express')
const { graphqlHTTP } = require('express-graphql')
cors = require('cors')
const schema = require('./rootSchema')
const app = express()

app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, ()=>{
  console.log('server running on port 4000')
})
