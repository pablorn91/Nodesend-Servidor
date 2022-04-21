import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({

    email: {
        type:  String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true    
    },
    nombre: {
        type:  String,
        required: true,
        trim: true    
    },
    password: {
        type:  String,
        required: true,
        trim: true    
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
