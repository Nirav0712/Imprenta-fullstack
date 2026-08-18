import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    const hash = await bcrypt.hash('admin123', 10);
    await mongoose.connection.collection('users').updateOne(
        { email: 'admin@imprenta.com' },
        { $set: { password: hash } }
    );
    console.log('Password reset successfully!');
    process.exit(0);
});
