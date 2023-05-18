const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {

    /* return new Promise ((resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }), (err, token) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }

            resolve(token)
        }
    }
    ) */

    const payload = { uid, name};

    const token = jwt.sign(payload, process.env.SECRET_JWT_SEED, {
        expiresIn: '2h'
    })

    if(!token){
        return 'No se pudo generar el token'
    }

    return token;
}

module.exports = {
    generarJWT
}