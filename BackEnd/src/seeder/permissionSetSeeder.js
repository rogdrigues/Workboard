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
                    'view_all_data',         // View all system data
                    'manage_users',          // Manage users (add, delete, edit)
                    'manage_roles',          // Manage roles
                    'view_audit_logs',       // View system audit logs
                    'manage_settings',       // Manage all system settings
                    'view_dashboard',        // View dashboard overview
                ],
            },
            {
                roleName: 'Manager',
                permissions: [
                    'create_bubble',         // Create a new Bubble
                    'manage_bubble',         // Manage Bubble (members, settings)
                    'invite_users',          // Invite users to Bubble
                    'view_bubble_dashboard', // View Bubble Dashboard
                    'create_task',           // Create a new task
                    'edit_task',             // Edit task in Bubble
                    'delete_task',           // Delete task in Bubble
                    'assign_task',           // Assign task to user
                    'view_bubble_data',      // View Bubble data
                ],
            },
            {
                roleName: 'User',
                permissions: [
                    'view_assigned_tasks',   // View assigned tasks
                    'edit_assigned_tasks',   // Edit tasks related to oneself
                    'view_bubble_data',      // View data in Bubble
                    'view_notifications',    // Receive notifications
                ],
            },
            {
                roleName: 'Reviewer',
                permissions: [
                    'review_task',           // Review task in Bubble
                    'approve_task',          // Approve task after review
                    'view_bubble_data',      // View data in Bubble
                    'view_bubble_dashboard', // View Bubble dashboard
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
