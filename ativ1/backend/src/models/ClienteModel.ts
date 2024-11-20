import mongoose, { Schema, model, Document } from 'mongoose';


interface ICliente extends Document {
  nome: string;
  email: string;
}


const ClienteSchema = new Schema<ICliente>({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  }
}, {
  timestamps: true 
});


export default mongoose.model<ICliente>("Cliente", ClienteSchema, "cliente") ;

