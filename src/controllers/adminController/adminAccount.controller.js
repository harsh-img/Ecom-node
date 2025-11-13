import User from '../../models/userAccount.model..js';
import {hashPassword , generateToken} from '../../utils/AuthenticateJWT.js';

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // email or password daala bhi hai ye nhi
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required'});
    }

    //Check kro ki email or password jo daale hai woh hamare credentials se match karte hai ki nhi 
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({success: false,message: 'Invalid admin credentials'});
    }

    // kya admin database mai exist karta hai 
    let admin = await User.findOne({ email: process.env.ADMIN_EMAIL, role: 'admin' });

    if (!admin) {
      const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
      const hashedPassword = await hashPassword(ADMIN_PASSWORD);

      admin = new User({
        email: ADMIN_EMAIL,
        password: hashedPassword,
        roles: 'admin',
      });
      await admin.save();
    }
    // Generate token
    const token = generateToken({userId: admin._id,email: admin.email, role: 'admin'});
    return res.status(200).json({success: true,message: 'Admin login successful',token,admin});

  } catch (error) {
    return res.status(500).json({success: false, message: 'Admin login failed',error: error.message});
  }
};
