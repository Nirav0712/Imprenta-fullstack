import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function resetAdmins() {
  await mongoose.connect(process.env.MONGODB_URI);

  const nikhilHash = await bcrypt.hash('Nikhil@1980', 10);
  await mongoose.connection.collection('users').updateOne(
    { email: 'nikhil@imprenta.in' },
    { $set: { password: nikhilHash, role: 'admin', isActive: true } }
  );

  const meetHash = await bcrypt.hash('Alto@0819', 10);
  await mongoose.connection.collection('users').updateOne(
    { email: 'meetpatel125@gmail.com' },
    { $set: { password: meetHash, role: 'admin', isActive: true } }
  );

  console.log('Admin credentials updated successfully!');
  process.exit(0);
}

resetAdmins();

