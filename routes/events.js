const { Router } = require('express');
const router = Router();
const {  validarJWT } = require('../middlewares/validar-jwt')
const { validarCampos } = require('../middlewares/validar-campos')
const { check } = require('express-validator')
const {getEvento, crearEvento, actualizarEvento, eliminarEvento} = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

router.use(validarJWT);

router.get('/', getEvento)

router.post('/', [
    check('title','se necesita un titulo').not().isEmpty(),
    check('start','se necesita una fecha inicio').custom( isDate ),
    check('end','se necesita una fecha fin').custom( isDate ),
    validarCampos
]
,crearEvento)

router.put('/:id',  actualizarEvento)

router.delete('/:id',  eliminarEvento)


module.exports = router;