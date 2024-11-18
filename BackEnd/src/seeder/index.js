const seedPermissions = require('./permissionSetSeeder');
const seedUsers = require('./userMasterSeeder');

const seedAllData = async () => {
    try {
        await seedPermissions();
        await seedUsers();

        // For remove data

        console.log("Seeding completed successfully.");
    } catch (error) {
        console.log('Error during seeding:', error.message);
        throw error;
    }
};

module.exports = seedAllData;
