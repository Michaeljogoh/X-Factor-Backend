const express = require('express');
const app = express();
const { PORT } = require('./config/key')
const {connectMongodb} = require('./config/mongodb');
const { errorHandler } = require('./middleware/errorHandler');
const  userRoute  = require('./routes/users.route');
const talentsRoute = require('./routes/talent.routes');
const adminRoute = require('./routes/admin.route');
const cors = require('cors');

// error handler
errorHandler();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({origin:"*", credentials:true , methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']}))

// connect mongodb
connectMongodb();

// Routes
app.get('/', (req , res)=>{
    res.send('WELCOME TO X-PRODUCTION API')
});

app.use('/api/v1/user', userRoute);
app.use('/api/v1/talent', talentsRoute);
app.use('/api/v1/admin', adminRoute);



app.listen(PORT , ()=>{
    console.log(`Server started at ${PORT}`)
});