import User from "../models/User.js";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      firebase_uid: req.body.firebase_uid,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
    })
    newUser.save()
    res.status(200).send("User has been created")
  } 
  catch (error) {
    console.log()
    next(error);
  }
};
