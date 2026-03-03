    const UserModel = require("../model/userModel");
    const bcrypt = require("bcryptjs");
    const nodemailer = require("nodemailer");
    const jwt = require("jsonwebtoken");

    const signup = async (req, res) => {
        try {
            const { name, email, password } = req.body;
    
            const existingUser = await UserModel.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "User already exists" });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const newUser = new UserModel({
                name,
                email,
                password: hashedPassword,
                role: "user",
            });
    
            await newUser.save();
    
            res.status(200).json({ message: "Successfully signed up" });
    
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error during signup" });
        }
    };
    
    // Login
    const login = async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("Login request received for email:", email);
    
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
    
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }
    
            // ✅ JWT_SECRET check before generating token
            if (!process.env.JWT_SECRET) {
                console.error("❌ JWT_SECRET is missing in environment variables!");
                return res.status(500).json({ message: "Internal server error" });
            }
    
            const token = jwt.sign(
                { email: user.email, userId: user._id, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
            );
    
            res.status(200).json({
                message: "Successfully logged in",
                user: user._id,
                token,
                role: user.role,
                email: user.email,
                name: user.name,
            });
    
        } catch (error) {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Error during login" });
        }
    };
    
    

    // Forgot Password
    const forgotPassword = async (req, res) => {
        const { email } = req.body;

        try {
            const user = await UserModel.findOne({ email: email });
            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            // Nodemailer setup
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.GMAIL_USER, 
                    pass: process.env.GMAIL_PASSWORD,
                },
            });

            const mailOptions = {
                from: process.env.GMAIL_USER,  
                to: user.email, 
                subject: 'Reset Your Password',
                text: `Click the following link to reset your password:  http://localhost:3000/resetpassword/${user._id}/${token}`
            };

            // Send the email
            transporter.sendMail(mailOptions, function (error, info) {

                if (error) {
                    console.error(error);  
                    return res.status(500).json({
                        message: "Error sending email"
                    });
                } else {
                    return res.status(200).json({
                        message: 'Password reset email sent successfully!'
                    });
                }
            });

        } catch (error) {
            console.error(error);  
            return res.status(500).json({
                message: "An unexpected error occurred"
            });
        }
    };

    const ResetPassword = async (req, res) => {
        const { id, token } = req.params;
        const { password } = req.body;

        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            //decoded refers to the data that is extracted from the token once it has been successfully verified.

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserModel.findByIdAndUpdate(id, { password: hashedPassword });

            if (!user) {
                return res.status(400).json({
                    message: "User not found"
                });
            }

            res.status(200).json({
                message: "Password reset successfully"
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Error resetting password"
            });
        }
    };


    module.exports = { login, signup, forgotPassword,ResetPassword };



























