import { sendVerificationEamil, senWelcomeEmail, senForgotPasswordEmail, sendSuccessForgotPasswordEmail} from "../middlewares/Email.js"
import { generateTokenAndSetCookies } from "../middlewares/GenerateToken.js"
import { Usermodel } from "../models/User.js"
import bcryptjs from 'bcryptjs'

const Reigster = async (req, res) => {
  try {
    const { fullName, email, country, phone, password } = req.body
    if (!fullName || !email || !country || !phone || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }
    const ExistsUser = await Usermodel.findOne({ email })
    if (ExistsUser) {
      if (ExistsUser.isVerified) {
        return res.status(400).json({ success: false, message: "User already exists. Please login." });
      } else {
        // If user exists but is not verified, overwrite and send a new token
        const verficationToken = Math.floor(100000 + Math.random() * 900000).toString()
        ExistsUser.fullName = fullName;
        ExistsUser.country = country;
        ExistsUser.phone = phone;
        ExistsUser.password = bcryptjs.hashSync(password, 10);
        ExistsUser.verficationToken = verficationToken;
        ExistsUser.verficationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
        await ExistsUser.save();
        await sendVerificationEamil(ExistsUser.email, verficationToken);
        return res.status(200).json({
          success: true,
          message: "A new verification token has been sent to your email.",
        });
      }
    }
    const hasePassowrd = await bcryptjs.hashSync(password, 10)
    const verficationToken = Math.floor(100000 + Math.random() * 900000).toString()
    const user = new Usermodel({
      fullName,
      email,
      country,
      phone,
      password: hasePassowrd,
      verficationToken,
      verficationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
    })
    await user.save()
    await sendVerificationEamil(user.email, verficationToken)
    return res.status(200).json({ success: true, user })
  } catch (error) {
    return res.status(400).json({ success: false, message: "internal server error" })
  }
}

const VerfiyEmail = async (req, res) => {
  try {
    const { code } = req.body
    const user = await Usermodel.findOne({
      verficationToken: code,
      verficationTokenExpiresAt: { $gt: Date.now() }
    })
    if (!user) {
      return res.status(400).json({ success: false, message: "Inavlid or Expired Code" })
    }
    user.isVerified = true;
    user.verficationToken = undefined;
    user.verficationTokenExpiresAt = undefined;
    await user.save()
    generateTokenAndSetCookies(res, user._id)
    await senWelcomeEmail(user.email, user.fullName)
    return res.status(200).json({ success: true, message: "Email Verifed Successfully" })
  } catch (error) {
    return res.status(400).json({ success: false, message: "internal server error" })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide the all fields!" })
    }
    const user = await Usermodel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ success: false, message: "User doesn't exists!" })
    }
    const isPasswordValid = bcryptjs.compareSync(password, user.password)
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Please provide the correct information" })
    }
    generateTokenAndSetCookies(res, user._id)
    return res.status(201).json({ success: true, user })
  } catch (error) {
    return res.status(500).json({ success: false, message: "internal server error" })
  }
}

const logOut = async (req, res) => {
  try {
    res.clearCookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await Usermodel.findById(req.user.userId);
    if (!user) {
      //return next(new ErrorHandler("User doesn't exists", 400));
      return res.status(400).json({ success: false, message: "User doesn't exists" })
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    // return next(new ErrorHandler(error.message, 500));
    return res.status(500).json({ success: false, message: "internal server error" })
  }
}

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await Usermodel.findOne({ email });
    if (userEmail) {
      // return next(new ErrorHandler("User already exists", 400));
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      // Set OTP expiration to 10 minutes
      userEmail.otp = otp;
      userEmail.otpExpire = Date.now() + 600000; // 10 minutes
      await userEmail.save();
      await senForgotPasswordEmail(userEmail.email, userEmail.fullName, otp)
      return res.status(200).json({ success: true, message: "Check your mail to verification code" })
    }
    else {
      //return next(new ErrorHandler("User not exists", 400));
      return res.status(400).json({ success: false, message: "User not exists" })
    }

  } catch (error) {
    //return next(new ErrorHandler(error.message, 400));
    return res.status(400).json({ success: false, message: error.message })

  }
}

const verifyOtp = async (req, res) => {
  try {
    const { email, otp, newPassword, confirmPassword } = req.body;
    if (!email || !otp || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" })
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const user = await Usermodel.findOne({
      email,
      otp,
      otpExpire: { $gt: Date.now() } // Check if OTP is valid and not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or OTP expired' });
    }
    const hasePassowrd = await bcryptjs.hashSync(newPassword, 10)
    // Hash the new password
    user.password = hasePassowrd;
    user.otp = undefined; // Clear the OTP
    user.otpExpire = undefined;
    await user.save();
    const respo = await sendSuccessForgotPasswordEmail(user.email, user.fullName)
    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export { Reigster, VerfiyEmail, loginUser, logOut, getUser, forgotPassword, verifyOtp }