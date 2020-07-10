exports.userValidator = (req, res, next) => {
  req.check('username', 'Name is required field').notEmpty()

  req.check('password', 'Password is required field').notEmpty();

  req.check('password').isLength({ min: 8 }).matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
    .withMessage('Password should be at least 8 characters long, should have at least one alphabet letter, one special character and at least one number.');


  const errors = req.validationErrors()

  if (errors) {

    const firstError = errors.map(err => err.msg)[0]
    return res.status(400).json({ error: firstError })
  }

  next();
}