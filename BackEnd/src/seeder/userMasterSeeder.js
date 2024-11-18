const bcrypt = require('bcryptjs');
const UserMaster = require('../models/UserMaster');
const PermissionSet = require('../models/PermissionSet');

const seedUsers = async () => {
    try {
        // Clear all users
        await UserMaster.deleteMany();

        // Fetch roles
        const adminRole = await PermissionSet.findOne({ roleName: 'Admin' });
        const managerRole = await PermissionSet.findOne({ roleName: 'Manager' });
        const userRole = await PermissionSet.findOne({ roleName: 'User' });
        const reviewerRole = await PermissionSet.findOne({ roleName: 'Reviewer' });

        // Seed admin
        const admin = {
            username: 'admin',
            email: 'admin@gmail.com',
            displayName: 'AdminU',
            password: await bcrypt.hash('admin123', 10),
            role: adminRole._id,
            profile: {
                fullName: 'System Administrator',
                dateOfBirth: new Date('1980-01-01'),
                gender: 'Male',
                phoneNumber: '0123456789',
                location: 'Head Office',
                avatar: 'https://via.placeholder.com/150',
            },
            lastLogin: new Date(),
        };

        // Seed other roles
        const managerUsers = Array.from({ length: 2 }, async (_, index) => ({
            username: `manager${index + 1}`,
            email: `manager${index + 1}@gmail.com`,
            displayName: `Manager${index + 1}`,
            password: await bcrypt.hash('manager123', 10),
            role: managerRole._id,
            profile: {
                fullName: `Manager ${index + 1}`,
                dateOfBirth: new Date(`198${index + 1}-03-15`),
                gender: index % 2 === 0 ? 'Male' : 'Female',
                phoneNumber: `098765432${index}`,
                location: 'Branch Office',
                avatar: 'https://via.placeholder.com/150',
            },
            lastLogin: new Date(),
        }));

        const userUsers = Array.from({ length: 2 }, async (_, index) => ({
            username: `user${index + 1}`,
            email: `user${index + 1}@gmail.com`,
            displayName: `User${index + 1}`,
            password: await bcrypt.hash('user123', 10),
            role: userRole._id,
            profile: {
                fullName: `User ${index + 1}`,
                dateOfBirth: new Date(`199${index + 1}-05-10`),
                gender: index % 2 === 0 ? 'Male' : 'Female',
                phoneNumber: `097654321${index}`,
                location: 'Remote',
                avatar: 'https://via.placeholder.com/150',
            },
            lastLogin: new Date(),
        }));

        const reviewerUsers = Array.from({ length: 2 }, async (_, index) => ({
            username: `reviewer${index + 1}`,
            email: `reviewer${index + 1}@gmail.com`,
            displayName: `Reviewer${index + 1}`,
            password: await bcrypt.hash('reviewer123', 10),
            role: reviewerRole._id,
            profile: {
                fullName: `Reviewer ${index + 1}`,
                dateOfBirth: new Date(`198${index + 1}-07-25`),
                gender: index % 2 === 0 ? 'Male' : 'Female',
                phoneNumber: `091234567${index}`,
                location: 'City Office',
                avatar: 'https://via.placeholder.com/150',
            },
            lastLogin: new Date(),
        }));

        // Combine and insert users
        const allUsers = [
            admin,
            ...(await Promise.all(managerUsers)),
            ...(await Promise.all(userUsers)),
            ...(await Promise.all(reviewerUsers)),
        ];

        await UserMaster.insertMany(allUsers);
        console.log('UserMaster data seeded successfully!');
    } catch (error) {
        console.error('Error seeding UserMaster:', error.message);
    }
};

module.exports = seedUsers;
