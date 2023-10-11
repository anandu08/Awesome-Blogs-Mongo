const colors = require('colors');
const mongoose = require('mongoose')


const mongoURL = "mongodb://localhost:27017/Awesome-Blogs"
const connectToMongo = () => {

    mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((res) => {
            console.log('> Connected to mongoDB...'.bgCyan)





        })
        .catch(err => console.log(`> Error while connecting to mongoDB : ${err.message}`.underline.red))
}
module.exports = connectToMongo;