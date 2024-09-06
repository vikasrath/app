import nodemailer from "nodemailer"

export const generateAndSendToken = async(email)=> {
    try {
        const token = Math.floor(1000 + Math.random() * 9000);
    
        console.log(process.env.EMAIL_USER);
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',  // Example using Gmail service
            secure:true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS   
            }
        });
    
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your Verification Token',
            text: `Your verification token is: ${token}`
        };
    
        const info = await transporter.sendMail(mailOptions);
    
        console.log('Email sent: ' + info.response);
    
        return token
    } catch (error) {
        console.error('Error sending token:', error.message);
        throw error;

    }

}