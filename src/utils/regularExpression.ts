const regex = {
  password: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)\S{8,30}$/),
  username: new RegExp(/^(\w)*?$/),
  phoneNumber: new RegExp(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  ),
};
export default regex;
