const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserMaster = require('../models/userMaster');
const generateToken = require('../services/authService');
const { validationResult } = require('express-validator');
const { get } = require('mongoose');
const PermissionSet = require('../models/permissionSet');
const xlsx = require('xlsx');
const validator = require('validator');
const multer = require('multer');
const memoryStorage = multer.memoryStorage();
const upload = multer({ storage: memoryStorage });
const cloudinary = require('cloudinary').v2;
const { sanitizeString, generateDisplayName } = require('../utils/stringUtils');
const { isValidEmail } = require('../utils/validInput');

module.exports = {
    addNewUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                EC: 1,
                message: "Validation failed",
                data: {
                    result: null,
                    errors: errors.array()
                }
            });
        }

        let { email, role, profile } = req.body;

        email = sanitizeString(email);
        profile.fullName = sanitizeString(profile.fullName);
        profile.phoneNumber = sanitizeString(profile.phoneNumber);
        profile.location = sanitizeString(profile.location);

        try {
            const existingUser = await UserMaster.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    EC: 1,
                    message: "Email already exists",
                    data: {
                        result: null
                    }
                });
            }

            const validRole = await PermissionSet.findById(role);
            if (!validRole) {
                return res.status(400).json({
                    EC: 1,
                    message: "Role does not exist",
                    data: {
                        result: null
                    }
                });
            }

            let username = profile.fullName.replace(/\s+/g, '').toLowerCase();
            let existingUsername = await UserMaster.findOne({ username });
            while (existingUsername) {
                const code = Math.floor(100 + Math.random() * 900);
                username = `${username}${code}`;
                existingUsername = await UserMaster.findOne({ username });
            }
            const displayName = generateDisplayName(profile.fullName);

            const password = process.env.DEFAULT_PASSWORD;
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new UserMaster({
                username,
                displayName,
                email,
                password: hashedPassword,
                role,
                profile
            });

            await newUser.save();

            return res.status(201).json({
                EC: 0,
                message: "User added successfully",
                data: {
                    result: newUser
                }
            });

        } catch (error) {
            console.error("Error adding new user:", error.message);
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while adding the user",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
    updateUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                EC: 1,
                message: "Validation failed",
                data: {
                    result: null,
                    errors: errors.array()
                }
            });
        }

        const { userId } = req.params;
        let { role, profile, password } = req.body;

        profile.fullName = sanitizeString(profile.fullName);
        profile.phoneNumber = sanitizeString(profile.phoneNumber);
        profile.location = sanitizeString(profile.location);

        try {
            const user = await UserMaster.findById(userId)
                .populate('role')


            if (!user) {
                return res.status(404).json({
                    EC: 1,
                    message: "User not found",
                    data: {
                        result: null
                    }
                });
            }

            if (role && role !== user.role.toString()) {
                const validRole = await PermissionSet.findById(role);
                if (!validRole) {
                    return res.status(400).json({
                        EC: 1,
                        message: "Role does not exist",
                        data: {
                            result: null
                        }
                    });
                }
                user.role = role;
            }

            if (profile && profile.fullName) {
                let username = profile.fullName.replace(/\s+/g, '').toLowerCase();
                let existingUsername = await UserMaster.findOne({ username });

                while (existingUsername && existingUsername._id.toString() !== user._id.toString()) {
                    const code = Math.floor(100 + Math.random() * 900);
                    username = `${username}${code}`;
                    existingUsername = await UserMaster.findOne({ username });
                }

                user.username = username;
                user.displayName = generateDisplayName(profile.fullName);
            }

            if (password) {
                user.password = await bcrypt.hash(password, 10);
            }

            user.profile = { ...user.profile, ...profile };

            await user.save();

            return res.status(200).json({
                EC: 0,
                message: "User updated successfully",
                data: {
                    result: user
                }
            });

        } catch (error) {
            console.error("Error updating user:", error.message);
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while updating the user",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
    updateUserProfile: async (req, res) => {
        const userId = req.user.id;
        const profileFields = ['fullName', 'dateOfBirth', 'gender', 'phoneNumber', 'location'];
        const updateFields = {};

        profileFields.forEach(field => {
            if (req.body[field]) {
                updateFields[`profile.${field}`] = req.body[field];
            }
        });

        if (updateFields['profile.fullName']) {
            updateFields['profile.fullName'] = sanitizeString(updateFields['profile.fullName']);
        }
        if (updateFields['profile.phoneNumber']) {
            updateFields['profile.phoneNumber'] = sanitizeString(updateFields['profile.phoneNumber']);
        }
        if (updateFields['profile.location']) {
            updateFields['profile.location'] = sanitizeString(updateFields['profile.location']);
        }

        try {
            const user = await UserMaster.findById(userId)
                .populate('role')

            if (!user) {
                return res.status(404).json({
                    EC: 1,
                    message: "User not found",
                    data: { result: null }
                });
            }

            if (Object.keys(updateFields).length > 0) {
                user.set(updateFields);
                await user.save();
            }

            if (req.file) {
                if (user.profile.avatar) {
                    const publicId = user.profile.avatar.split('/').pop().split('.')[0];
                    await cloudinary.uploader.destroy(publicId);
                }

                user.set({ 'profile.avatar': req.file.path });
                await user.save();
            }

            return res.status(200).json({
                EC: 0,
                message: "Profile updated successfully",
                data: {
                    result: user.profile
                }
            });
        } catch (error) {
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while updating profile",
                data: { result: null, error: error.message }
            });
        }
    },


    getUserById: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await UserMaster.findById(userId)
                .populate('role')

            if (!user) {
                return res.status(404).json({
                    EC: 1,
                    message: "User not found",
                    data: {
                        result: null
                    }
                });
            }

            return res.status(200).json({
                EC: 0,
                message: "User fetched successfully",
                data: {
                    result: user
                }
            });

        } catch (error) {
            console.error("Error fetching user:", error.message);
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while fetching the user",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
    getUsers: async (req, res) => {
        try {
            const { includeDeleted } = req.query;
            const sortCriteria = { deleted: 1, createdAt: -1 };

            let users;

            if (includeDeleted) {
                users = await UserMaster.findWithDeleted()
                    .populate('role')
                    .sort(sortCriteria)
                    .select('-password -refreshToken')
                    .exec();
            } else {
                users = await UserMaster.find()
                    .populate('role')
                    .sort(sortCriteria)
                    .select('-password -refreshToken')
                    .exec();
            }

            const totalUsers = await UserMaster.countDocuments();

            return res.status(200).json({
                EC: 0,
                message: "Users fetched successfully",
                data: {
                    result: users
                }
            });

        } catch (error) {
            console.error("Error fetching users:", error.message);
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while fetching users",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
    deleteUser: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await UserMaster.findById(userId)
                .populate('role')

            if (!user) {
                return res.status(404).json({
                    EC: 1,
                    message: "User not found",
                    data: {
                        result: null
                    }
                });
            }

            await user.delete();

            return res.status(200).json({
                EC: 0,
                message: "User deleted successfully",
                data: {
                    result: user
                }
            });

        } catch (error) {
            console.error("Error deleting user:", error.message);
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while deleting the user",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
    restoreUser: async (req, res) => {
        const { userId } = req.params;

        try {
            const user = await UserMaster.findOneWithDeleted({ _id: userId }).select("-password");
            if (!user) {
                return res.status(404).json({
                    EC: 1,
                    message: "User not found",
                    data: {
                        result: null
                    }
                });
            }

            await user.restore();

            return res.status(200).json({
                EC: 0,
                message: "User restored successfully",
                data: {
                    result: user
                }
            });

        } catch (error) {
            console.error("Error restoring user:", error.message);
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while restoring the user",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
    loginUser: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                EC: 1,
                message: "Validation failed",
                data: {
                    result: null,
                    errors: errors.array()
                }
            });
        }

        let { email, password } = req.body;

        email = sanitizeString(email);

        try {
            let user = await UserMaster.findOneWithDeleted({ email })
                .populate('role')

            if (!user) {
                return res.status(400).json({
                    EC: 1,
                    message: "Cannot find user with this email",
                    data: {
                        result: null
                    }
                });
            }

            if (user.deleted) {
                return res.status(403).json({
                    EC: 1,
                    message: "Your account has been deactivated. Please contact support.",
                    data: {
                        result: null
                    }
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    EC: 1,
                    message: "Invalid Credentials",
                    data: {
                        result: null
                    }
                });
            }

            const accessToken = generateToken(user._id, 'access');
            const refreshToken = generateToken(user._id, 'refresh');

            user.refreshToken = refreshToken;
            await user.save();

            const accessTokenExpiresAt = Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN) * 60 * 1000;

            return res.status(200).json({
                EC: 0,
                message: "Login successful",
                data: {
                    result: {
                        access_token: accessToken,
                        refresh_token: refreshToken,
                        access_token_expires_at: accessTokenExpiresAt
                    },
                    metadata: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        profile: {
                            avatar: user.profile.avatar || null,
                        },
                        lastLogin: user.lastLogin || null
                    }
                }
            });
        } catch (err) {
            return res.status(500).json({
                EC: 1,
                message: "An error occurred while logging in",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },

    refreshAccessToken: async (req, res) => {
        const refreshToken = req.headers.cookie;
        if (!refreshToken) {
            return res.status(403).json({
                EC: 1,
                message: "Refresh token not provided",
                data: {
                    result: null
                }
            });
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

            const user = await UserMaster.findById(decoded.user.id)
                .populate('role')

            if (!user || user.refreshToken !== refreshToken) {
                return res.status(403).json({
                    EC: 1,
                    message: "Invalid or expired refresh token",
                    data: {
                        result: null
                    }
                });
            }

            const accessToken = generateToken(user._id, 'access');

            const newRefreshToken = generateToken(user._id, 'refresh');
            user.refreshToken = newRefreshToken;
            await user.save();

            const accessTokenExpiresAt = Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN) * 60 * 1000;

            return res.status(200).json({
                EC: 0,
                message: "Access token refreshed successfully",
                data: {
                    result: {
                        access_token: accessToken,
                        refresh_token: newRefreshToken,
                        access_token_expires_at: accessTokenExpiresAt
                    },
                    metadata: {
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                        profile: {
                            avatar: user.profile.avatar || null,
                        },
                        lastLogin: user.lastLogin || null
                    }
                }
            });

        } catch (error) {
            console.error("Error refreshing access token:", error.message);
            return res.status(403).json({
                EC: 1,
                message: "Invalid refresh token",
                data: {
                    result: null,
                    error: error.message
                }
            });
        }
    },
};
