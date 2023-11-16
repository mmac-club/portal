import User from "../models/User";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      phoneNumber: req.body.phoneNumber,
      postalCode: req.body.postalCode,
    })
    await newUser.save()
    res.status(200).send("User has been created")
  } catch (error) {
    next(error);
  }
};
