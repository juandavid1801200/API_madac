import { pool } from "../database/conexion.js";

export const graficas = async (req, res) => {
    try {
        const { tipo_analisis, fecha_inicio, fecha_fin } = req.body;
        const {identificacion } = req.params
        let query = `
        SELECT u.nombre, AVG(r.valor) AS promedio, DATE_FORMAT(r.fecha, '%Y-%m-%d') AS fecha
        FROM resultados r
        JOIN analisis a ON r.fk_analisis = a.codigo
        JOIN usuarios u ON a.fk_analista = u.identificacion
        JOIN tipo_analisis t ON a.fk_tipo_analisis = t.id
        WHERE 1=1 AND u.identificacion =? AND t.id =?
        `;
        
        const queryParams = [identificacion, tipo_analisis];

        if (fecha_inicio) {
            query += 'ND a.fecha >=?';
            queryParams.push(fecha_inicio);
        }

        if (fecha_fin) {
            query += 'ND a.fecha <=?';
            queryParams.push(fecha_fin);
        }

        query += ' GROUP BY u.nombre, fecha';

        const [resultados] = await pool.query(query, queryParams);

        if (resultados.length > 0) {
            res.status(200).json(resultados);
        } else {
            res.status(404).json({
                'tatus': 404,
                'essage': 'No se encontró el resultado'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor: ' ,error
        });
    }
};
export const obtenerUltimoResultado = async (req, res) => {
    try {
        const { identificacion } = req.body;

        const query = `
        SELECT resultados.valor
        FROM usuarios
        JOIN fincas ON usuarios.identificacion = fincas.fk_caficultor
        JOIN lotes ON fincas.codigo = lotes.fk_finca
        JOIN muestras ON lotes.codigo = muestras.fk_lote
        JOIN analisis ON muestras.codigo = analisis.fk_muestra
        JOIN resultados ON analisis.codigo = resultados.fk_analisis
        WHERE usuarios.identificacion = ?
        ORDER BY resultados.fecha DESC
        LIMIT 1;
        `;

        const [resultados] = await pool.query(query, [identificacion]);

        if (resultados.length > 0) {
            res.status(200).json(resultados[0]);
          } else {
            res.status(404).json({
              status: 404,
              message: 'No se encontró el resultado'
            });
          }
        } catch (error) {
          if (error.name === 'SequelizeDatabaseError') {
            // Error de base de datos
            res.status(500).json({
              status: 500,
              message: 'Error de base de datos: ' + error.message
            });
          } else if (error.name === 'SequelizeValidationError') {
            // Error de validación
            res.status(400).json({
              status: 400,
              message: 'Error de validación: ' + error.message
            });
          } else {
            // Error desconocido
            res.status(500).json({
              status: 500,
              message: 'Error del servidor: ' + error.message
            });
          }
        }
};