import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';
// @desc auth user/set token
// @ROUTE POST /api/users/auth
// @access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({email});
    if(user && (await user.matchPasswords(password))){
        generateToken(res, user.id);
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            email: user.email
        });
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
})

// @desc register a new user
// @ROUTE POST /api/users
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { firstname, middlename, lastname, email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    // create the user and put the variable
    const user = await User.create({
        firstname,
        middlename,
        lastname,
        email,
        password
    });

    // generating the token and storing it
    if(user){
        generateToken(res, user.id)
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            middlename: user.middlename,
            lastname: user.lastname,
            email: user.email
        });
    }else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

// @desc logout user
// @ROUTE POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message: 'User Logged Out'})
})

// @desc GET user profile
// @ROUTE GET /api/users/profile
// @access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        firstname: req.user.firstname,
        middlename: req.user.middlename,
        lastname: req.user.lastname,
        email: req.user.email
    }
    res.status(200).json(user)
})

// @desc update user profile
// @ROUTE PUT /api/users/profile
// @access private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); // find the user id on database

    // verify if the user exists and put it on the variable object
    if(user){
        user.firstname = req.body.firstname || user.firstname;
        user.middlename = req.body.middlename || user.middlename;
        user.lastname = req.body.lastname || user.lastname;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        // save the update on the user
       const updatedUser = await user.save();
       // return the if success
       res.status(200).json({
        _id: updatedUser._id,
        firstname: updatedUser.firstname,
        middlename: updatedUser.middlename,
        lastname: updatedUser.lastname,
        email: updatedUser.email
       })
    }else{
        res.status(404);
        throw new Error('User Not Found');
    }
})



export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
    };