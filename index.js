const express = require('express');
const app = express(); 
const openai = require('openai')
const multer = require('multer')
const uid = require('uid');
const {Essentia , EssentiaWASM} = require ('essentia.js')
const essentia = new Essentia(EssentiaWASM);
const fs = require('fs');
const port = process.env.PORT ;





// setting view engine , view folder and public folder
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set(express.static('public'));


//create a new multer instance

const upload = multer({ dest : 'uploads/'});


app.get('/' , (req,res)=>{
	
	res.render('index.ejs');


}

//route to handle file uploads

app.post('/uploads/beat', upload.single('audio'), (req,res)=>{

// get the uploaded file

const file = req.file;

// save the file to the uploads folder

fs.renameSync(file.path, `uploads/${file.originalname}`);


});



//start the server

app.listen(3000, ()=>{
console.log('server started on ' + port );
})







