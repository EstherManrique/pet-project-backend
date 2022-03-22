const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Role = require("../models/roleModel");
const helpers = require("../helpers/validateHelper");
const accessControl = require("../helpers/accessControl");

// @desc    Get users list
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(
    accessControl.permissions.users.get
  );
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const users = await User.find({}, { password: 0 })
      .populate({
        path: "roleId",
        model: "Role",
      })
      .populate({
        path: "storeId",
        model: "Store",
      });

    res.status(200).json(users);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// @desc    Get user
// @route   GET /api/users/:id
// @access  Private
const getUser = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(
    accessControl.permissions.users.get
  );
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const id = req.params.id;
    const user = await User.findById(id, {
      password: 0,
    })
      .populate({
        path: "roleId",
        model: "Role",
      })
      .populate({
        path: "storeId",
        model: "Store",
      });
    res.status(200).json({ message: "Get user", user });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// @desc    Admin creation user
// @route   POST /api/users
// @access  Private
const createUser = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(
    accessControl.permissions.users.post
  );
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const { name, email, userName, password, roleId, storeId } = req.body;
    if (!name || !userName || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exist");
    }
    // Hash password (encrypt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user object
    const newUser = User({
      name,
      userName,
      password: hashedPassword,
      email,
      storeId,
    });
    // Validate if user has roles
    if (roleId) {
      // Assign roles ID's
      newUser.roleId = roleId;
    } else {
      // Asign default role
      const role = await Role.findOne({ name: "Client" });
      newUser.roleId = role._id;
    }
    // Create user
    await newUser.save();
    if (newUser) {
      res.status(200).json({
        _id: newUser.id,
        name: newUser.name,
        userName: newUser.userName,
        email: newUser.email,
        roleId: newUser.roleId,
        storeId: newUser.storeId,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// @desc    Register new User
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, userName, password, roleId, storeId } = req.body;

  if (!name || !userName || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }

  // Hash password (encrypt)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user object
  const newUser = User({
    name,
    userName,
    password: hashedPassword,
    email,
    storeId,
  });

  // Validate if user has roles
  if (roleId) {
    // Assign roles ID's
    newUser.roleId = roleId;
  } else {
    // Asign default role
    const role = await Role.findOne({ name: "Client" });
    newUser.roleId = role._id;
  }
  const roleData = await Role.findOne({_id: newUser.roleId});

  // Create user
  await newUser.save();

  if (newUser) {
    res.status(201).json({
      _id: newUser.id,
      name: newUser.name,
      userName: newUser.userName,
      email: newUser.email,
      roles: roleData,
      storeId: newUser.storeId,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email })
    .populate({
      path: "roleId",
      model: "Role",
    })
    .populate({
      path: "storeId",
      model: "Store",
    });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      userName: user.userName,
      email: user.email,
      roles: user.roleId,
      store: user.storeId,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(
    accessControl.permissions.users.put
  );
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const updateUserId = req.params.id;
    const user = await User.findById(updateUserId);
    if (!user) {
      res.status(400);
      throw new Error("User not found");
    }

    const { name, email, userName, password, roleId, storeId } = req.body;

    const userData = {
      name,
      userName,
      email
    };

    // Hash password (encrypt)
    if(password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      userData.password = hashedPassword;
    }

    // Validate user has store
    if(storeId !== '') {
      userData.storeId = storeId
    }

    // Validate if user has roles
    if (roleId) {
      // Assign roles ID's
      userData.roleId = roleId;
    } else {
      // Asign default role
      const role = await Role.findOne({ name: "Client" });
      userData.roleId = role._id;
    }

    const updateUser = await User.findByIdAndUpdate(updateUserId, userData, {
      new: true,
    });
    res.status(200).json(updateUser);
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const allowedRoles = await helpers.getMongoRoles(
    accessControl.permissions.users.delete
  );
  if (helpers.compareRoles(allowedRoles, req.user.roleId)) {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(400);
      throw new Error("Service not found");
    }
    await user.remove();
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(403).json({ message: "Forbidden" });
  }
});

// Generate Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
