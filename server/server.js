const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const path = require('path');
var session = require('express-session')
const cookieparser = require('cookie-parser');
const MongoDBStore = require('connect-mongodb-session')(session);
const connectstr = 'mongodb+srv://lanista:lanista2020@lanistateam-tq8uo.mongodb.net/gochem-app?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const userrouter = require('./api/controller/usercontroller')    
const blogcontroller = require('./api/controller/blogcontroller')
const slidecontroller = require('./api/controller/slidersController')
const videoController = require('./api/controller/videoController')
const referenceController = require('./api/controller/referenceController')
const sectorController = require('./api/controller/sectorController')
const aboutUsController=require('./api/controller/aboutUsController')
const productController = require('./api/controller/productController')
const pigmentController=require('./api/controller/pigmentController')
const employeController = require('./api/controller/employeController')
const contactController = require('./api/controller/contactController')
const loginController = require('./api/controller/loginController')
const logoController = require('./api/controller/logoController')
const searchController = require('./api/controller/searchController')
const morgan = require('morgan')
const history = require('connect-history-api-fallback');

const staticFileMiddleware = express.static(path.join(__dirname + '/dist'));
   
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(morgan('dev'))
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  }
app.use(bodyParser.urlencoded({
  extended: false, 
}));
app.use(bodyParser({limit: '500mb'}));


app.use(cookieparser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 180000
  },
  store: store
}))

var store = new MongoDBStore({
  uri: connectstr,
  collection: 'mySessions'
});
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/api/user',userrouter);
app.use('/api/blog',blogcontroller);
app.use('/api/slide',slidecontroller);
app.use('/api/video',videoController);
app.use('/api/reference',referenceController);
app.use('/api/sector',sectorController)
app.use('/api/aboutUs',aboutUsController)
app.use('/api/product',productController)
app.use('/api/pigment',pigmentController)
app.use('/api/employe',employeController)
app.use('/api/contact',contactController)
app.use('/api/login',loginController)
app.use('/api/logo',logoController)
app.use('/api/search',searchController)
const port = process.env.PORT || 4000;
mongoose.connect(connectstr, { useNewUrlParser: true ,useUnifiedTopology: true ,useFindAndModify: false }); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

app.set('view engine', ['css','icon']);

app.set('views','../src/assets');

app.use(express.static(path.join(__dirname, '../src/assets/upload')));

app.listen(port, () => {
  console.log(`server started on port ${port}`)
});