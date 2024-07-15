import mongoose from 'mongoose'

const zeroCardSchema = mongoose.Schema({
    cardNumber:{
        type:String,
        unique:true,
        required:true
    },
    balance:{
        type:Number,
        required:true,
        default:0
    },
    passengerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Passenger',
        required:true
    },
    serviceChargeCollected:{
        type:Number,
        default:0
    }
})

export const ZeroCards=mongoose.model('ZeroCards',zeroCardSchema)