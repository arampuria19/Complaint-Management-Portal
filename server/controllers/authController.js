const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { OAuth2Client } = require('google-auth-library');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: 'None',
    secure: req.secure || req.header('x-forwarded-proto') === 'https'
  });

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    sameSite: 'None',
    secure: req.secure || req.header('x-forwarded-proto') === 'https'
  });
  res.status(200).json({ status: 'success' });
};

exports.googleLogin = catchAsync(async (req, res, next) => {
  const { tokenId } = req.body;

  client
    .verifyIdToken({
      idToken: tokenId,
      requiredAudience: process.env.GOOGLE_CLIENT_ID
    })
    .then(async googleRes => {
      const isEmailVerified = googleRes.payload.email_verified;

      const { name, email, picture } = googleRes.payload;

      if (!isEmailVerified) {
        return next(new AppError('Unauthorized. Email not verified!', 401));
      }

      let user = await User.findOne({ email });

      if (!user) {
        const newUserObj = {
          name: name,
          email: email,
          photo: picture
        };
        user = await User.create(newUserObj);
      }

      createSendToken(user, 200, req, res);
    });
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // console.log(token);

  //Check if token is not there in headers but browser automatically sent it in cookie
  if (!token && req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};
