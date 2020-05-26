const express = require("express" );
const app = express() ;
const bodyParser = require("body-parser") ;
const morgan = require("morgan") ;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({})) ;

app.get("/" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/home.html") ;
}) 
.get("/Index/post.html" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/post.html") ;
})
.get("/Index/view.html" , ( req , res ) => {
    res.sendFile( __dirname + "/Index/view.html") ;
})
.post("/data" , (req,res)=>{
    const a = req.body.postname ;
    const b = req.body.date ;
    const c = req.body.Content ;
    const d = req.body.postedby ;
    const e = req.body.uid ;
    console.log(req.body) ;
    res.send({
        message : "Got the information" ,
        data : req.body,
        Go_to_home : "http://localhost:3000/"
    }); 
});

app.listen( 3000 , () => {
    console.log("Server started at http://localhost:3000/")
}) ;