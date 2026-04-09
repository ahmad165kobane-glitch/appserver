import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

async function createUser() {
    const prisma = new PrismaClient();
    try {
        const hashedPassword = await bcrypt.hash('123456', 10);
        const user = await prisma.user.create({
            data: {
                username: 'testuser',
                email: 'test@gmail.com',
                password: hashedPassword,
                referralCode: 'TEST123',
                coins: 1000,
                gems: 100,
                level: 1,
                isEmailVerified: true
            }
        });
        console.log('✅ User created successfully!');
        console.log('ID:', user.id);
        console.log('Username:', user.username);
        console.log('Email:', user.email);
        console.log('Password: 123456');
        console.log('Referral Code:', user.referralCode);
    } catch (e) {
        console.error('Error:', e.message);
    } finally {
        await prisma.$disconnect();
    }
}

createUser();
