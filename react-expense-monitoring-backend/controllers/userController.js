import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
// @desc auth user/set token
// @ROUTE POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'auth user'})
})

// @desc register a new user
// @ROUTE POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'register user'})
})

// @desc logout user
// @ROUTE POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'logout user'})
})

// @desc GET user profile
// @ROUTE GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'user profile'})
})

// @desc update user profile
// @ROUTE PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'update user profile'})
})



export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
    };