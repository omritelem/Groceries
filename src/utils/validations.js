const emailValidation = (value) => {
    return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
};

const passwordValidation = (value) => {
    return value.trim().length < 6;
};

export {
    emailValidation,
    passwordValidation,
}
