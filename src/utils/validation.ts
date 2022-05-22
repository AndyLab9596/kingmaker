const validation = {
  email: {
    required: 'Email is required',
    invalid: 'Invalid email',
    existing: 'Email is already taken',
  },
  password: {
    required: 'Password is required',
    invalidPwdRegex:
      'Password must be at least 8 characters long contain a number, an uppercase letter and a special letter',
  },
  confirmPassword: {
    required: 'Confirm password is required',
    notMatch: `Confirm password doesn't match`,
  },
  username: {
    required: 'Username is required',
    existing: 'Username is already taken',
    invalid: 'Username can only contain letters, numbers, and underscores',
  },
  firstName: {
    required: 'Firstname is required',
  },
  lastName: {
    required: 'LastName is required',
  },
  city: {
    required: 'City is required',
  },
  billingAddress: {
    required: 'Billing address is required',
  },
  address: {
    required: 'Address is required',
  },
  zipcode: {
    required: 'Zipcode is required',
    invalid: 'Zipcode was entered incorrectly',
  },
  phoneNumber: {
    required: 'Phone Number is required',
    invalid: 'Phone number is invalid format',
    existing: 'Phone is already taken',
  },
  position: {
    required: 'Position is required',
  },
  governmentLevel: {
    required: 'Government Level is required',
  },
  state: {
    required: 'State is required',
  },
  race: {
    required: 'Race is required',
  },
  jurisdiction: {
    required: 'Jurisdiction is required',
  },
  description: {
    required: 'Description is required',
  },
};

export default validation;
