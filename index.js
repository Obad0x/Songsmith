//in package.json type is set to module so import statement is used

import 'express', {NextFunction} from "express"
const app = express(); 
import  openai  from 'openai'
import  multer from 'multer'
import {Essentia , EssentiaWASM} from 'essentia.js'
const essentia = new Essentia(EssentiaWASM);
import fs from 'fs'
import decodeAudio from 'audio-decode'
const port = process.env.PORT ;





// setting view engine , view folder and public folder
app.set('view engine', 'ejs');
app.set('views', 'views');
app.set(express.static('public'));

// 

//create a new multer instance

const upload = multer({ dest : 'uploads/'});


app.get('/' , (req,res)=>{
	
	res.render('index.ejs');


});

//route to handle file uploads

app.post('/uploads/beat', upload.single('audio'), (req,res)=>{

// get the uploaded file

const file = req.file;

const path = file.path;
// save the file to the uploads folder

fs.renameSync(path, `uploads/${file.originalname}`);


//using audio-decode to decode the audio
 const decodedaudio = async(path)=>{

const buffer = fs.readFileSync(file.path);
const Audio = await decode(buffer)
const audioVector = essentia.arrayToVector(audio._channelData[0]);
return audioVector;
}



});



//start the server

app.listen(3000, ()=>{
console.log('server started on ' + port );
})







