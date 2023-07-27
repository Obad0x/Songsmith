//in package.json type is set to module so import statement is used
import express  from "express"
const app = express(); 
import  multer from 'multer';
import {Essentia , EssentiaWASM} from 'essentia.js'
const essentia = new Essentia(EssentiaWASM);
import fs from 'fs'
import decode from 'audio-decode'
import dotenv from 'dotenv'
dotenv.config();
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 3000 





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




const decodeAudio = async (filepath) => {
    const buffer = fs.readFileSync(filepath);
    const audio = await decode(buffer);
    const audioVector = essentia.arrayToVector(audio._channelData[0]);
    return audioVector;
)}



app.get('/' , (req,res)=>{
	
	res.render('index.ejs');


});

//route to handle file uploads

app.post('/uploads/beat', upload.single('audio'),async (req,res)=>{

// get the uploaded file

const file = req.file


  // Ensure that the file is available
  if (!file) {
    return res.status(400).send("No audio file uploaded.");
  }

  try {
    // Decode the audio (await for the decoding to finish)
    const data = await decodeAudio(file.path);

    // Perform other operations that depend on the 'data' variable
    const danceability = essentia.Danceability(data).danceability;
    const duration = essentia.Duration(data).duration;
    const energy = essentia.Energy(data).energy;

  

    // Now call OpenAI API using 'data' and 'danceability'
    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `generate lyrics for me from a beat with danceability value of ${danceability}`,
      });

      // Get the generated lyrics from the API response
      const generatedLyrics = completion.data.choices[0].text;

      // Respond to the client or do further processing with the generated lyrics
      res.send(generatedLyrics);
    } catch (error) {
      // Handle OpenAI API error
      console.log(error);
      res.status(500).send("Error while processing with OpenAI.");
    }
  } catch (decodeError) {
    // Handle decodeAudio error
    console.log(decodeError);
    res.status(500).send("Error while decoding audio.");
  }
});







//start the server

app.listen(3000, ()=>{
console.log('server started on ' + port );
})







//
