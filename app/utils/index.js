const isValidEmail = (email) => {
  var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return filter.test(email);
};

const isValidPass = (password) => {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

const isValidName = (name) => {
  var re = /^[a-zA-Z ]{4,30}$/;
  return re.test(name);
};

const isValidPhone = (phone) => {
  console.log('phone;;;;', phone);
  try {
    var re = /^[789]\d{9}$/;
    var abcd = re.test(phone);
    console.log('abcd:::', abcd);
  } catch (e) {
    console.log(e);
  }
  return abcd;
};

module.exports = {
  isValidEmail,
  isValidPass,
  isValidName,
  isValidPhone,
};
