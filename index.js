//in package.json type is set to module so import statement is used

import express  from "express"
const app = express(); 
import  { Configuration, OpenAIApi }  from 'openai'
import  multer from 'multer'
import {Essentia , EssentiaWASM} from 'essentia.js'
const essentia = new Essentia(EssentiaWASM);
import fs from 'fs'
import decode from 'audio-decode'
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT ;
const configuration = new Configuration({api Key : process.env.OPENAI_API})
const openAi = new OpenAiAPI(configuration);

const prompt = 'test'






// setting view engine , view folder and public folder
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set(express.static('public'));

// specify dir and filename
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the uploaded files
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Generate a unique name for the file
    cb(null, Date.now() + '-' + file.originalname);
  }
});


//create a new multer instance

const upload = multer({ storage : storage,
	limits : { 
	filesize : 10 * 1024 * 1024 , } ,
});

// decoding 


const decodeAudio  = async ( filepath  ) =>{

	const buffer = readFileSync(filepath)
	const audio = decode(buffer)
	const audioVector = essentia.arrayToVector(audio.channel._channelData[0])
	return audioVector;



}



app.get('/' , (req,res)=>{
	
	res.render('index.ejs');


});

//route to handle file uploads

app.post('/uploads/beat', upload.single('audio'),async (req,res)=>{

// get the uploaded file

const file = req.file;

const path = file.path;

//decode the audio

const data = await  decodeAudio(path)





});



//start the server

app.listen(3000, ()=>{
console.log('server started on ' + port );
})







