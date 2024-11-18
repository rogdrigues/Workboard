const PermissionSet = require('../models/permissionSet');

const seedPermissions = async () => {
    try {
        // Clear existing permission sets
        await PermissionSet.deleteMany({});

        // Define roles and permissions
        const roles = [
            {
                roleName: 'Admin',
                permissions: [
                    'view_all_data', // View all system data
                    'view_users', // View user information
                    'view_bubbles', // View all bubbles (workspaces)
                    'view_tasks', // View all tasks
                    'view_dashboard', // View overall dashboard
                ],
            },
            {
                roleName: 'Manager',
                permissions: [
                    'create_bubble', // Create a new bubble (workspace)
                    'invite_users', // Invite users to a bubble
                    'manage_bubble', // Manage the bubble (e.g., members, settings)
                    'create_task', // Create tasks within the bubble
                    'edit_task', // Edit any task within the bubble
                    'delete_task', // Delete tasks within the bubble
                    'view_dashboard', // View the dashboard for the bubble
                ],
            },
            {
                roleName: 'User',
                permissions: [
                    'view_assigned_tasks', // View tasks assigned to them
                    'edit_assigned_tasks', // Edit tasks directly related to them
                    'view_bubble_data', // View data within the bubble they are part of
                ],
            },
            {
                roleName: 'Reviewer',
                permissions: [
                    'review_task', // Review tasks within the bubble
                    'approve_task', // Approve tasks after review
                    'view_bubble_data', // View data within the bubble
                ],
            },
        ];

        // Insert the roles into the database
        await PermissionSet.insertMany(roles);
        console.log('Permission sets created successfully!');
    } catch (err) {
        // Log any errors encountered
        console.error('Error while creating permission sets:', err.message);
    }
};

module.exports = seedPermissions;
