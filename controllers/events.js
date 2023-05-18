const { response } = require('express')
const Evento = require('../models/Events')

const getEvento = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name');

    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        console.log(evento.user = req.uid);
        const eventoGuardado = await evento.save()
        res.status(200).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Habla con un admin'
        })
    }

}


const actualizarEvento = async (req, res = response) => {

    /*     const eventoId = req.body.id;
        const uid = req.uid;
        console.log(eventoId)
    
    try {
        const evento = await Evento.findById( eventoId );
        if( !evento ){
            res.status(404).json({
                ok: false,
                msg: 'El evento no existe por ese id'
            })
        }
    
        if( evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'el user no puede mofiicar este evento que no es suyo'
            })
        }
    
        const nuevoEvento = {
            ...req.body,
            user: uid
        }
    
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true });
    
        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    } */

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'el user no puede mofiicar este evento que no es suyo'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }

    res.json({
        ok: true,
        eventoId
    })


}

const eliminarEvento = async(req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {
        const evento = await Evento.findById(eventoId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'el user no puede eliminar este evento que no es suyo'
            })
        }

        await Evento.findOneAndDelete(eventoId);

        res.status(200).json({ok: true })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })

    }
}

module.exports = {
    crearEvento,
    actualizarEvento,
    eliminarEvento,
    getEvento
}