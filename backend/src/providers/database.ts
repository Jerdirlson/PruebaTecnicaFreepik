import { Response } from 'express';
import { createConnection, Connection, OkPacket } from 'mysql'


export const initDatabase = async (res: Response) => {
    const database: DataBase = new DataBase(res);
    const response = await database.createConnection()
    if(!response){
        process.exit()
    }
    return database;
}


export class DataBase {
    //Lo que se debe cambiar en caso de utilizar una base de datos diferentes
    private readonly host: string = 'localhost';
    private readonly user: string = 'root';
    private readonly password: string = 'root';
    private readonly database: string = 'prueba_tecnica';
    private readonly port: number = parseInt('3306');

    private response: Response;
    public connection!: Connection;

    constructor(res: Response) {
        this.response = res
    }

    async createConnection() {
        let connected: boolean
        try{
            connected = await new Promise((resolve, reject) => {
                try {
                    this.connection = createConnection({
                        host: this.host,
                        user: this.user,
                        password: this.password,
                        database: this.database,
                        port: this.port
                    });
                    this.connection.connect((err) => {
                        console.log(err);
                        err ? reject(false) : resolve(true);
                    });
                } catch (err: any) {
                    reject(false);
                }
            });
        }catch(error: any){
            console.error("Error in DB connection", error)
            this.response.status(500);
            this.response.send("Contact with the provider");
            return false
        }
        if (!connected) {
            this.response.status(500);
            this.response.end();
        }
        return true;
    }

    async insertQuery(query: string, values: string[] | null): Promise<OkPacket> {
        return await new Promise((resolve, reject) => {
            if (values === null) {
                this.connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            } else {
                this.connection.query(query, values, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            }
        });
    }

    async readQuery<T>(query: string, values: string[] | null): Promise<T[]> {
        return await new Promise((resolve, reject) => {
            if (values === null) {
                this.connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            } else {
                this.connection.query(query, values, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            }
        });
    }

    async updateQuery(query: string, values: string[] | null): Promise<OkPacket> {
        return await new Promise((resolve, reject) => {
            if (values === null) {
                this.connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            } else {
                this.connection.query(query, values, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            }
        });
    }

    async deleteQuery(query: string, values: string[] | null): Promise<OkPacket> {
        return await new Promise((resolve, reject) => {
            if (values === null) {
                this.connection.query(query, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            } else {
                this.connection.query(query, values, (err, res) => {
                    if (err) reject(new Error(err.sqlMessage))
                    resolve(res)
                });
            }
        });
    }

    

    closeConnection() {
        this.connection.end()
    }

}

