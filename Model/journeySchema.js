import mongoose from 'mongoose'

const journeySchema = mongoose.Schema({
    passengerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Passenger'
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    isReturn:{
        type:Boolean,
        default:false
    },
    charge:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    }
},{
    timestamps:true
})

export const Journey = mongoose.model('Journey',journeySchema)