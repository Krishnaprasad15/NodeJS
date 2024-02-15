const mongoose= require('mongoose');

async function connectMongoDB(url){
    return mongoose.connect(url)
    .then(()=>console.log('MongoDB Connected!'))
    .catch((err)=> console.log('MongoDb error',err));
}

module.exports= {
    connectMongoDB,
}