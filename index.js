import express  from "express";
import body_parser from 'body-parser'
import routeAnalisis from './src/routes/analisis.routes.js'
import routeFincas from './src/routes/fincas.routes.js'
import routeLotes from './src/routes/lotes.routes.js'
import routeResultados from './src/routes/route.resultados.js'
import routeMuestras from './src/routes/routeMuestras.js'
import routeVariables from './src/routes/routeVariables.js'
import routeUsuarios from "./src/routes/usuarios.route.js";
import routeVariedades from './src/routes/variedades.routes.js'
import rutaValidacion from "./src/routes/seguridad.route.js"; 
import RutaMunicipios from "./src/routes/municipios.route.js";
import routeTipoAnalisis from "./src/routes/route.tipoAnalisis.js";
import routeReportes from "./src/routes/route.reporte.js";
import cors from 'cors'
import { PORT } from "./config.js";
import routerGraficas from "./src/routes/router.graficas.js";

const servidor = express();

servidor.use(cors());

servidor.use(express.json());
servidor.use(express.urlencoded({ extended: false }));


servidor.use('/usuarios', routeUsuarios)
servidor.use('/fincas', routeFincas)
servidor.use('/lotes', routeLotes)
servidor.use('/variedades', routeVariedades)
servidor.use('/muestras', routeMuestras)
servidor.use('/analisis', routeAnalisis)
servidor.use('/variables', routeVariables)
servidor.use('/resultados', routeResultados)
servidor.use('/municipios', RutaMunicipios)
servidor.use('/tipoanalisis', routeTipoAnalisis)
servidor.use('/reportes', routeReportes)
servidor.use(routerGraficas)
servidor.use(rutaValidacion)

servidor.set('view engine', 'ejs')

servidor.set('views', './views')

servidor.use(express.static('./public'))

servidor.get('/document', (req, res) => {
    res.render('document.ejs')
})

//listen 
servidor.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
