const express = require('express');
const app = express(); 
const openai = require('openai')
const formidable = require('formidable')
const uid = require('uid');
const {Essentia , EssentiaWASM} = require ('essentia.js')
const essentia = new Essentia(EssentiaWASM);
const fs = require('fs');
const port = process.env.PORT ;






app.set('view engine', 'ejs');
app.set('views', 'views');
app.set(express.static('public'));







const decodeAudio = async (filepath: string) => {
    const buffer = fs.readFileSync(filepath);
    const audio = await decode(buffer);
    const audioVector = essentia.arrayToVector(audio._channelData[0]);
    return audioVector;
}; 
