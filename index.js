const express = require ('express')
const path = require( 'path' )
const app = express()
const fs = require ('fs')
const { unlink } = require('node:fs');


app.set( 'view engine', 'ejs' ) 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")))



//    <script src="https://cdn.tailwindcss.com"></script>
app.get('/',function(req,res){
   fs.readdir(`./files`,function(err,files){

    res.render("index", {files: files},  )
    console.log("running")
   })

  
})
app.get('/delete/:filename',function(req,res){
  
fs.unlink( `./files/${req.params.filename}`, function(){
    
    res.redirect("/");
    
    
});
  
})
app.get('/edit/:filename',function(req,res){
   
res.render('edit',{ filename: req.params.filename});
  
})
app.post("/edit", function (req , res) {  
   fs.rename(  `./files/${req.body.pn}`,`./files/${req.body.nn}`, function(err){
    res.redirect(`/`)
   })
})


app.get('/file/:filename', function(req,res){
  fs.readFile(`./files/${req.params.filename}`, "utf-8",function(err,fd){
   res.render("zoom" , {filename1:req.params.filename , ram:fd })
  })
 
  
})
app.post('/create',function(req,res){
fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.description , function(err){
 res.redirect("/")
});

  
})

app.listen(3000)