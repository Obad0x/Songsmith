import express from "express";
import multer from "multer";
import { Essentia, EssentiaWASM } from "essentia.js";
import fs from "fs";
import decode from "audio-decode";
import dotenv from "dotenv";
import OpenAI from 'openai';



const app = express();
dotenv.config();

const essentia = new Essentia(EssentiaWASM);


const openai= new OpenAI({
  apiKey: process.env.API_KEY,
});




const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});



const decodeAudio = async (filepath) => {
    const buffer = fs.readFileSync(filepath);
    const audio = await decode(buffer);
	const audioBuffer = audio.getChannelData(0)
    const audioVector = essentia.arrayToVector(audioBuffer);
    return audioVector;
}

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/uploads/beat", upload.single("audio"), async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No audio file uploaded.");
  }

  try {
    const data = await decodeAudio(file.path);

    // Other audio processing using 'data'

    const danceability = essentia.Danceability(data).danceability;
    const duration = essentia.Duration(data).duration;
    const energy = essentia.Energy(data).energy;

         try {
      const completion = await api.createCompletion({
      model: 'text-davinci-003',
       prompt: `Write a poem about a cat to a beat with duration of ${duration}`,
  
  });

      const generatedLyrics = completion.data.choices[0].text;

      // Rendering the EJS template with generated lyrics
      res.render("index.ejs",generatedLyrics);
      console.log(generatedLyrics)
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while processing with OpenAI.");
    }
  } catch (decodeError) {
    console.log(decodeError);
    res.status(500).send("Error while decoding audio.");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


// Still buggy as f**ck