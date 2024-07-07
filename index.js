const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const dotenv=require("dotenv")
const app=express();
dotenv.config();
const port=process.env.PORT || 3000;


mongoose.connect("enter your mongodb link here" ,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});
const registerschema=mongoose.Schema({
    name:{type:String,
        required:true},
    email:{type:String,
        required:true},
    password:{type:String,
        required:true,
        minlength:6}
});
const registration=mongoose.model("registration",registerschema);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/index.html");
})
app.post("/register",async(req,res)=>
{
    try{
        const {name,email,password}=req.body;
        const registerdata=new registration({
            name,
            email,
            password
        });
        await registerdata.save();
        res.redirect("/success");

    }
    catch(error){
        console.log("error");
        res.redirect("/error");
    }
})
app.get("/success",(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/success.html");
    
})
app.get("/error",(req,res)=>{
    res.sendFile(__dirname+"/htmlpages/error.html");
    
})
app.listen(port,()=>
{
    console.log(`server is running on ${port}`);
})

