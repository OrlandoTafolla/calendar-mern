const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();
const { validarCampos } = require('../middlewares/validar-campos')
const { crearUsuario, loginUsuario, revalidartoken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt')

router.post('/new',
 [
    check('name', 'Es obligatorio tu name').not().isEmpty(),
    check('email', 'Es obligatorio tu email').isEmail(),
    check('password', 'el Pass debe ser de mas de 6 caracteres').isLength({min: 6 }),
    validarCampos

 ],
crearUsuario);

router.post('/', 
[
   check('email', 'Es obligatorio tu email').isEmail(),
   check('password', 'el Pass debe ser de mas de 6 caracteres').isLength({min: 6 }),
   validarCampos

],loginUsuario);

router.get('/renew', validarJWT, revalidartoken);



router.get('/',(req, res) => {
    console.log('se requiere /');

    res.json({
        ok:true
    })

})

module.exports = router;