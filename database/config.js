const mongoose = require('mongoose')

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('db online')
        
    } catch (error) {
        console.log(error)
        throw new Error('error al iniciar BD')
    }
}

module.exports = {
    dbConnection
}