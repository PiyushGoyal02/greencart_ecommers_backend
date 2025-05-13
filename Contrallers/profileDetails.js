const profileDetailsModel = require("../Model/LoginSignupModel");

exports.profileDetails = async (req, res) => {
  // Get Details From Frontend Ui Form
  try {
    const {
      userId,
      address,
      landmark,
      pincode,
      number,
      houseNum,
      state,
      country,
      type,
      name,
      surname,
      email,
    } = req.body;

    // UserId Validation Check Is It here or Not
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required.",
      });
    }

    // One We Check UserId and Then Insert User Details
    const updatedUser = await profileDetailsModel.findByIdAndUpdate(
      userId,
      {
        address,
        landmark,
        pincode,
        number,
        houseNum,
        state,
        country,
        type,
        name,
        surname,
        email,
      },
      { new: true }   // Set to true to return the updated document
    );

    // Validation Check
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Successfully User profile data Created
    res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
