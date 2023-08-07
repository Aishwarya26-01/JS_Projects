const express = require('express');
const router = express.Router();

const Order = require('../models/order');

const addOrder = async(req, res, next) => {
    try{
        if(!req.body.amount) {
            throw new Error('Amount is mandatory');
        }

        const amt = req.body.amount;
        const details = req.body.details;
        const category = req.body.category;

        const data = await Order.create({
            amount: amt,
            details: details,
            category: category
        })
        console.log(data);
        res.status(201).json({newOrderDetail: data});
    } catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
}

const getOrder = async(req, res, next) => {
    try{
        const order = await Order.findAll();
        res.status(200).json({allOrders: order});
    } catch(error){
        console.log('Get order is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const deleteOrder = async(req, res, next) => {
    try{
        if(req.params.id == 'undefined') {
            console.log('Id is missing');
            return res.status(400).json({err: 'Id is missing'});
        }
        const uId = req.params.id;
        await Order.destroy({where: {id: uId}});
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addOrder,
    getOrder,
    deleteOrder
}