const express= require('express');
const { 
    handleGetAllUsers,
    handelGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUsers
 }= require('../controllers/user')
 
const route= express.Router();

// route for users api 
route.route('/')
.get(handleGetAllUsers)
.post(handleCreateNewUsers)

// Route is used to combine the methods with same path -> get,patch,delete
// api/users/:id route is same for get,patch and del so we combined with route 
route.route('/:id')
.get(handelGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)

module.exports = route;