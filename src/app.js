const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs")
const bcrypt = require("bcryptjs")


require("./db/conn");
require("./db/upload"); 

const Signin = require("./models/sign_in");
const Upload = require("./models/upload");  
              

const port = process.env.PORT || 8000;

const  static_path = path.join(__dirname, "../public");
const  templates_path = path.join(__dirname, "../templates/views");
const  partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static('public'));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views",templates_path)
hbs.registerPartials(partials_path);

app.get('/', function(req, res) {
  if (req.query.button === 'student') {
    res.redirect('/login');
  } else if (req.query.button === 'faculty') {
    res.redirect('/login1');
  } else {
    res.render('index');
  }
  
});

app.get('/login', function(req, res) {
    if (req.query.button === 'login') {
      res.redirect('/login');
    } else if (req.query.button === 'sign_in') {
      res.redirect('/sign_in');
    } else {
      res.render('login');   
    }
  });

  app.get('/login1', function(req, res) {
    if (req.query.button === 'login') {
      res.redirect('/login1');
    } else if (req.query.button === 'sign_in') {
      res.redirect('/sign_in1');
    } else {
      res.render('login1'); 
    }
  });
  
  app.get('/',(req, res)=>{   
    res.render("index")
  });
  
  app.get('/sign_in', function(req, res) {
    res.render('sign_in');

  });
  app.get('/sign_in1', function(req, res) {
    res.render('sign_in1');

  });
  
  
  app.get('/login', function(req, res)  {
    res.render('login');
  });
  app.get('/login1',function(req,res){
    res.render('login1')
  })
  app.get('/upload',function(req,res) {
    res.render("upload");  
 
  });
  app.get('/sprofile',function(req,res) {
    res.render("sprofile");
  });
  app.get('/cevent1',function(req,res) {   
    res.render("cevent1");
  });
  app.get('/cevent2',function(req,res) {   
    res.render("cevent2");
  });
  app.get('/cevent3',function(req,res) {   
    res.render("cevent3");
  });
  app.get('/sevent1',function(req,res) {   
    res.render("sevent1");
  });
  app.get('/sevent2',function(req,res) {   
    res.render("sevent2");
  });
  app.get('/sevent3',function(req,res) {   
    res.render("sevent3");
  });
  app.get('/tevent1',function(req,res) {   
    res.render("tevent1");
  });
  app.get('/tevent2',function(req,res) {   
    res.render("tevent2");
  });
  app.get('/tevent3',function(req,res) {   
    res.render("tevent3");
  });
  app.get('/devent1',function(req,res) {   
    res.render("devent1");
  });app.get('/devent2',function(req,res) {   
    res.render("devent2");
  });app.get('/devent3',function(req,res) {   
    res.render("devent3");
  });
 
  
  

  app.post('/sign_in', async (req, res) =>{
    try{

      const password = req.body.password;   
      const confirm_password = req.body.confirm_password;

      if(password === confirm_password)
      {
        const registerStudent = new Signin({
          username: req.body.username,
          password:password,
          confirm_password:confirm_password

        })
        const registered =await  registerStudent.save();
        res.status(201).render("login");

      }else{
        res.send("passwords are not matching")
      }


      console.log(req.body.username);
      res.send(req.body.username)

    }catch (error){
      res.status(400).send(error);

    }
    
  });

  app.post('/sign_in1', async (req, res) =>{
    try{

      const password = req.body.password;   
      const confirm_password = req.body.confirm_password;

      if(password === confirm_password)
      {
        const registerStudent = new Signin({
          username: req.body.username,
          password:password,
          confirm_password:confirm_password

        })
        const registered =await  registerStudent.save();
        res.status(201).render("login1");

      }else{
        res.send("passwords are not matching")
      }


      console.log(req.body.username);
      res.send(req.body.username)

    }catch (error){
      res.status(400).send(error);

    }
    
  });


  app.post('/login', async(req, res)=>  {
   try{   
    const username = req.body.username;
    const password = req.body.password;

    const enrollmentno = await Signin.findOne({username:username});

    const isMatch = await bcrypt.compare(password, enrollmentno.password) 
    if(isMatch){
      res.status(201).render("home1");
    }else{
      res.send("invalid login details");
    }


   }catch(error){
    res.status(400).send("invalid login details")

   }
  });
  app.post('/login1', async(req, res)=>  {
    try{
     const username = req.body.username;
     const password = req.body.password;
 
     const enrollmentno = await Signin.findOne({username:username});
 
     const isMatch = await bcrypt.compare(password, enrollmentno.password)     
     if(isMatch){
       res.status(201).render("home");
     }else{
       res.send("invalid login details");
     }
    
   
    }catch(error){
     res.status(400).send("invalid login details")
 
    }
   });
  app.post('/upload', async(req,res) =>{
    try{

      const uploadEvent = new Upload({   
        name: req.body.name,
        date: req.body.date,
        venue: req.body.venue,
        info: req.body.info 

  
      })

      const upload= await uploadEvent.save(); 
      res.status(201).render("home");

    }catch{
      res.status(400).send(error)
    }
 
  });
              


  app.get('/cultural', (req, res) => {
    res.render('cultural');
  });
  
  app.get('/technical', (req, res) => {
    res.render('technical');
  });
  
  app.get('/sports', (req, res) => {
    res.render('sports');
  });
  
  app.get('/design', (req, res) => {
    res.render('design');
  });
  app.get('/profile', (req, res) => {
    res.render('profile'); 
  });
  app.get('/upload', (req, res) => {
    res.render('upload'); 
  });

  
  

app.listen(port, ()=> {
    console.log('server is running at port no ${port}');
})
