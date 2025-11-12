import Joi from "joi";
import User from "../../models/userSchema.js";
import bcrypt from 'bcrypt';

const register = async (req, res) => {

    try {
        const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        mobile: Joi.string().pattern(/^[0-9]{7,15}$/).required(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
            .messages({ 'any.only': 'Confirm password must match password' })
        });

        const { error, value } = schema.validate(req.body, { abortEarly: false });

        if (error) {
        const messages = error.details.map(d => d.message);
        return res.status(400).json({ error: true, messages });
        }

        const { name, email, mobile, password } = value;

        const existing = await User.findOne({ $or: [{ email }, { mobile }] });

        if (existing) {
            const message = existing.email === email ? 'Email already exists.' : 'Mobile already exists.';
            return res.status(400).json({ error: true, message });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, mobile, password: hashed });

        await user.save();
        return res.status(201).json({ error: false, message: 'User created successfully.',user:user });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: true, message: 'Something went wrong.' });
    }
};

export default {register}