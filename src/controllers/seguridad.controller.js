
import { pool } from "../database/conexion.js";
import jwt from "jsonwebtoken";

export const validar = async (req, res) => {

    try {

        let {correo_electronico, password} = req.body
        let sql = `SELECT identificacion, nombre, telefono, tipo_usuario, correo_electronico, password, estado FROM usuarios WHERE correo_electronico='${correo_electronico}' and password='${password}'`

        const [user] = await pool.query(sql)

        if(user.length>0){
            let token = jwt.sign({user}, 'nasdhkajsdhakjsdhakjsdbskdaghdasd', {expiresIn:'24h'})

            return res.status(200).json({ 'user':user,'token':token})
        }else{
            res.status(404).json({'status': 404, 'message': 'Usuario no autorizado'})
        }

    } catch (error) {
        res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}

export const validarToken = async (req, res, next) => {

    try {
        
        let tokenClient = req.headers['token']

        if(!tokenClient){
            return res.status(403).json({'message': 'Token es requerido'})
        }else{
            const token = jwt.verify(tokenClient,'nasdhkajsdhakjsdhakjsdbskdaghdasd', (error, decoded) => {
                if(error){
                    return res.status(403).json({message: 'Token es obligatorio'})
                }else{
                    next()
                }
            })
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}