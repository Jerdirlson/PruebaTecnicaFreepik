import express, {Response, Request} from 'express';
import cors from 'cors';
import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import bodyParser from 'body-parser'
import authRoutes from './routes/auth.routes';
import playerRoutes from './routes/player.routes';
import * as dotenv from 'dotenv';
import { SocketSingleton } from './SocketSingleton';
import teamRoutes from './routes/team.routes';
import leagueRoutes from './routes/league.routes';
import countryRoutes from './routes/country.routes';
import nationalitiesRoutes from './routes/nationalities.routes';
import playerPositionRoutes from './routes/playerPosition.routes';
dotenv.config();

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json())
const port = 8081

const httpServer = createServer(app)
const socketOptions = {
    cors: {
        origin: '*'
    }
};

//Creamos el socket como un singleton 
SocketSingleton.initialize(httpServer, socketOptions);

app.use('/auth', authRoutes());
app.use('/player', playerRoutes());
app.use('/team', teamRoutes());
app.use('/league', leagueRoutes());
app.use('/country', countryRoutes());
app.use('/nationality', nationalitiesRoutes());
app.use('/playerPosition', playerPositionRoutes());


httpServer.listen(port, () => {
    console.log('Server is Running')
})