import { Request, Response } from "express";
import { UserUpdate, User } from '../interfaces/User';
import { DataBase, initDatabase } from "../providers/database";
import { OkPacket } from "mysql";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

/**
 * Metodo para la creacion de usuarios 
 * @param user 
 * @returns 
 */

export async function createUser(user: User, res : Response) {
    try {
        console.log("este es el usuario ", user);
        const db: DataBase = await initDatabase(res)
        const hashedPassword = await encryptPassword(user.pwdUser);
        console.log("este es el password encriptado ", hashedPassword);

        //Mockeando 
        const userData = [
            user.nameUser, user.emailUser , hashedPassword
        ]
        const query = 'INSERT INTO User (nameUser, emailUser, pwdUser) VALUES (?,?,?)';
        const result: OkPacket = await db.insertQuery(query, userData)
        console.log('User created successfully.', result);
        if ( result.insertId > 0){
            console.log("Este es el token secret ", process.env.TOKEN_SECRET);
            const token = jwt.sign({_id : result.insertId}, process.env.TOKEN_SECRET || '')
            return { success: true, message: 'User created successfully.', token: token, userCreate : userData };
        }
        return { success: false, message: 'Error creating user.' };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, message: 'Error creating user.' };
    }
};

/**
 * Function para encryption de la contraseña 
 * @param password 
 * @returns 
 */
export async function encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

/**
 * Comparación de la contraseña que da el user 
 * vs la contraseña guardada en la base de datos
 * @param password 
 * @param hashedPassword 
 * @returns 
 */
export async function validatePassword(password: string, hashedPassword : string): Promise<boolean> {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        console.error(error);
        return false;
    }
}

/**
 * Metodo selct para obtener el usuario por email
 * @param email 
 * @returns 
 */
export async function getUserByEmail(email : string, res : Response): Promise<User | null>{
    try {
        const query = 'SELECT * FROM User WHERE emailUser = ?';
        const db: DataBase = await initDatabase(res)
        const result  = await db.readQuery<User>(query, [email]) 
        if (result.length > 0) {
            return result[0] as User;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        return null;
    }
}