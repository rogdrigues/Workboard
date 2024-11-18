const mongoose = require('mongoose');

const permissionSetSchema = new mongoose.Schema({
    roleName: { type: String, required: true, unique: true },
    permissions: { type: [String], default: [] },
}, { timestamps: true });

const PermissionSet =
    mongoose.models.PermissionSet || mongoose.model('PermissionSet', permissionSetSchema);

module.exports = PermissionSet;