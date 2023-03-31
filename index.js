const express = require('express');
const app = express();
const port = 8000;
var expressLayouts = require('express-ejs-layouts');




app.use(express.static('./assets'));


app.set('view engine','ejs');
app.use(expressLayouts);

// extract style and scripts from subpages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// use express router, if any request comes in then handle the route using router
app.use('/',require('./routes'));







// app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err)
    {
        // console.log('error in connecting to server',err);

        // or using interpolation, for accessing var directly in string
        console.log(`Error in running the server  :${err}`);
        return;
    }
    console.log(`Server is running on port ${port}`);
})







