import { Request, Response } from "express";
import { createUser, validatePassword , getUserByEmail} from '../services/user.service';
import jwt from 'jsonwebtoken';
import { User } from "../interfaces/User";

interface authResponse {
    success: boolean;
    message: string;
    userCreate?: any;
    userFound?: User;
    token?: string;
}

export const signup = async (req: Request, res: Response) : Promise<authResponse> => {
    const user = req.body;
    try {
        const response = await createUser(user, res);
        console.log("Response de singup", response.userCreate);
        return { success: true, message: 'User updated successfully.', userCreate: response.userCreate , token : response.token};
    } catch (error) {
        console.error("Error updating user: ", error);
        return { success: false, message: 'Error updating user.' };
    }
};

export const signin = async (req: Request, res: Response) : Promise<authResponse> => {
    const email = req.body.email;
    const password = req.body.password;
    const user : User | null = await getUserByEmail(email, res);
    if (!user) {
        return { success: false, message: 'User not found.' };
    }
    console.log("User encontrado ", user);

    const correctPassword : boolean = await validatePassword(password, user?.pwdUser)


    if(!correctPassword)
        return { success: false, message: 'Password not match.' };

    try {
        const token = jwt.sign({_id : user.idUser}, process.env.TOKEN_SECRET || ' ', {
            expiresIn: 60 * 60  //una hora
        })
        res.cookie("token", token)
        return { success: true, message: 'User found.', userFound: user , token : token};
        
    } catch (error) {
        console.error("Error en generar el token. ", error);
        return { success: false, message: 'Error finding User.' };
    }
};

// export const profile = async (req : Request, res : Response) => {
//     const user: User | null = await getUserById(req.userId)

//     if (!user) return res.status(404).json('No se encontro al usuario.')
//     res.status(200).json(user)
// };