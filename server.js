const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser =require('body-parser')
const configToUse = require('./config/keys')
const PORT = process.env.port || 3000
const CONCURRENCY = process.env.WEB_CONCURRENCY || 1;


//connect to mongodb
mongoose.connect(
    configToUse.dbURL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex : true,
    },
    (error) => {
      if (!error) {
        console.log(`La connection à la base des données a reussie`);
      } else {
        console.log(`La connection à la base des données a échouée: ${error}`);
      }
    }
  )

//config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use('/user', require('./src/User/user.router'))


//main route
app.get('/', (request, response) => {
    console.log(request.rawHeaders[9])
    response.render('home')
})


// listen server
app.listen(PORT, () => {
    `Server running on localhost:${PORT}`
})