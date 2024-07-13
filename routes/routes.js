import express from 'express'
import { userSignup } from '../controller/userSignup.js'
import { createJourneyController } from '../controller/createJourneyController.js'
import { journeyPaymentController } from '../controller/journeyPaymentController.js'
import {ZeroCardRechargeController} from '../controller/ZeroCardRechargeController.js'
import { findZeroCardDetails } from '../controller/findZeroCardDetails.js'
import { adminDetailsCollectionController } from '../controller/adminDetailsCollectionController.js'

const router = express.Router()

router.post('/signup',userSignup)
router.post('/create-journey',createJourneyController)
router.post('/payment',journeyPaymentController)
router.post('/recharge',ZeroCardRechargeController)
router.post('/card-details',findZeroCardDetails)
router.get('/admin-details',adminDetailsCollectionController)

export default router