# Songsmith
SongSmith is an innovative app that generates custom lyrics by analyzing a beat and a prompt. Our advanced algorithm creates unique and catchy lyrics that fit perfectly with the music. With SongSmith, creating original songs has never been easier. Try it out today and unleash your inner songwriter! 🎶
# Songsmith - Create Lyrics by Uploading Beats

Songsmith is a Node.js web application developed on Termux for mobile devices. It allows users to create lyrics by uploading beats, and it utilizes various libraries and APIs for audio processing and text generation.

## Technologies Used

- Node.js: The backend is built with Node.js to handle server-side logic and interactions.
- EJS: The app uses Embedded JavaScript templates for rendering dynamic content on the client-side.
- Express: Express is the web framework used to handle routes and requests.
- Multer: Multer is used for handling file uploads, specifically for processing audio files.
- Essentia.js: Essentia.js is used for audio processing tasks, including decoding and analyzing audio data.
- Audio-decode: This library is used to decode audio files into a format that can be processed further.
- Dotenv: Dotenv is used for loading environment variables, such as API keys.
- OpenAI API: The app utilizes the OpenAI API for generating lyrics based on the uploaded beats.

## Getting Started

1. Clone the repository to your local machine.
2. Install the required dependencies using npm or yarn.
3. Set up the required environment variables, including the OpenAI API key.
4. Run the server using `node app.js` or `npm start`.
5. Access the app in your mobile browser by visiting `http://localhost:3000/`.

## How to Use

1. Upon accessing the app, you'll see the "Audio Upload" page.
2. Click the "Upload Audio File" button and select a beat (audio file) to upload.
3. After the upload is successful, the app will process the audio and extract relevant information.
4. Using the Essentia library, the app calculates attributes like danceability, duration, and energy of the beat.
5. The app then uses the OpenAI API to generate lyrics based on the beat's attributes.
6. The generated lyrics will be displayed in the "Generated Lyrics" section on the page.

## Note

- This project was developed as a learning exercise and may not be optimized for production use.
- Ensure that you have the necessary API keys and environment variables set up for the app to function correctly.

Thank you for your interest in Songsmith! Have fun creating lyrics with your beats!
