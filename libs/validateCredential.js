const validator = require('validator');

const validateEmail = (email) => {
    if (!validator.isEmail(email)) {
        return 'Please provide a valid email address';
    }
    return null;
}

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/])[a-zA-Z\d!@#$%^&*()_\-+={}[\]\\|:;'<>,.?/]{8,}$/;
    if (!regex.test(password)) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, one special character, and one number';
    }
    return null;
};

module.exports = { validateEmail, validatePassword }