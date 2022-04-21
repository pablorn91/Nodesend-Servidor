import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const conectarDB = async () => {

    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true
        });
        console.log('DB conectada')

    } catch (error) {
        console.log('Hubo un error');
        console.log(error);
        process.exit(1);
    }
}

export default conectarDB;
