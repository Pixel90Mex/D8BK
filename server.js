import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import usersRoute from './routes/users.js';
import loginRoute from './routes/login.js';
import postsRoute from './routes/posts.js';
import sendMailRoute from './routes/sendEmail.js';
import dotenv from 'dotenv';
import path from 'path';
import { __dirname, __filename } from './esm.js';
import gitHubOauthRoute from './routes/gitHubOauth.js';

dotenv.config();

const server = express();

server.use('/uploads', express.static(path.join(__dirname, './uploads')));

server.use(express.json());
server.use(cors());

server.use('/', usersRoute);
server.use('/', loginRoute);
server.use('/', postsRoute);
server.use('/', sendMailRoute);
server.use('/', gitHubOauthRoute); 

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Errore di connessione al database...'));
db.once('open', () => {
  console.log('Connessione al database effettuata con successo...');
});

server.listen(process.env.PORT, () => console.log('Server avviato correttamente...'));
