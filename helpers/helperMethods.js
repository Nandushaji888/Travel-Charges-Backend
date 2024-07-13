import crypto from 'crypto'

export const getPassengerType = (age)=>{
    if(age<12)return 'Kid';
    if(age>=60)return 'Senior Citizen';
    return 'Adult';
}

export const chargeToBeDedudcted=(type)=>{
    if(type === 'Kid') return 30;
    if(type === 'Senior Citizen')return 20;
    return 100;
}   

export const getUniqueZeroCardNumber = ()=>{
    return parseInt(
        crypto.randomBytes(4).toString('hex'),16    
    )
}