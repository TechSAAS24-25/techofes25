const jwt = require('jsonwebtoken');
require('express-async-errors');
const express = require('express');
const Merchandise = require('../models/merchandise'); // Adjust the path to the Merchandise model
const Purchase = require('../models/purchase'); // Adjust the path to the Purchase model
const userExtractor = require('../utils/middleware').userExtractor; // Middleware to extract user
const merchandiseRouter = express.Router();
const purchaseMerchRouter = express.Router();

// Route to get all merchandise
merchandiseRouter.get('/', async (request, response) => {
    const merchandise = await Merchandise.find({});
    response.status(200).json(merchandise);
});
  
// Route to purchase a specific merchandise
purchaseMerchRouter.post('/:merchandiseId/purchase', userExtractor, async (request, response) => {
    const merchandiseID = request.params.merchandiseId; // Extract merchandiseId from route parameter
    const { quantity } = request.body; // Extract quantity from request body
    const T_ID = request.T_ID; // Extract user T_ID from userExtractor middleware

    // Check if the merchandise exists
    const merchandise = await Merchandise.findOne({merchandiseID});
    if (!merchandise) {
        return response.status(404).json({ error: 'Merchandise not found' });
    }
    if(merchandise.availability < 1){
        return response.status(404).json({ error: 'Merchandise not available'})
    }

    // Create a new purchase
    const purchase = new Purchase({
        T_ID,
        merchandiseID,
        quantity,
    });

    //payment logic
    //total price calculation
    //payment gateway
    //if payment success following code executed
    
    const savedPurchase = await purchase.save(); 
    merchandise.availability -= 1
    await merchandise.save()
    response.status(201).json({ message: 'Purchase successful', purchase: savedPurchase });
});
  
module.exports = {
    merchandiseRouter,
    purchaseMerchRouter,
};
