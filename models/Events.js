const { Schema, model} = require('mongoose')
const Usuario = require('./Usuario')

const EventoSchema = Schema({

    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

})

/* EventoSchema.method('toJSON', function(){
   const { __v, _id, ...object } = this.toObject()
   object.id = _id;
   return object;
}) */

EventoSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

module.exports = model('Evento', EventoSchema)