import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

export default ( req, res, next) => {
    
    const authHeader = req.get('Authorization');

    if (authHeader) {
        //Obtener el token
        const token = authHeader.split(' ')[1];

        //comprobar el JWT
        try {
            
            const usuario = jwt.verify(token, process.env.SECRETA);
    
            req.usuario = usuario;
            
        } catch (error) {
            console.log('JWT no válido...')
            console.log(error)
        }
        
    } 

    return next();
}