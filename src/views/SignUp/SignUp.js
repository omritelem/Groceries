import React, { useState, useCallback, useContext, useEffect } from "react";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import CircularProgress from '@material-ui/core/CircularProgress';

import './SignUp.css';
import { AuthContext } from '../../Hooks/UseAuthProvider';
import Copyright from '../../components/Copywrite/CopyWrite';
import Message from "../../components/Message/Message";
import { emailValidation, passwordValidation } from '../../utils/validations';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(1),
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(2),
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    },
}));

const SignUp = ({ history }) => {
    const { signUp } = useContext(AuthContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [emailErrText, setEmailErrText] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [passwordErrText, setPasswordErrText] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [repeatPasswordInvalid, setRepeatPasswordInvalid] = useState(false);
    const [repeatPasswordErrText, setRepeatPasswordErrText] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [errMessage, setErrorMessage] = useState('');

    const handleSignUp = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            if (password !== repeatPassword) {
                setErrorMessage('Passwords are not match');
                setIsMessageOpen(true);
                setIsLoading(false);
                return;
            }
            await signUp(email, password);
            history.push("/");
        } catch (error) {
            setErrorMessage(error.message);
            setIsMessageOpen(true);
            setIsLoading(false);
        } finally {
        }
    }, [signUp, history, email, password, repeatPassword]);

    const validateEmail = useCallback((value) => {
        const emailInvalid = emailValidation(value);
        setEmail(value);
        setEmailInvalid(emailInvalid);
        setEmailErrText(emailInvalid ? 'Email is invalid' : '');
    }, []);

    const validatePassword = useCallback((value) => {
        const passwordInvalid = passwordValidation(value);
        setPassword(value);
        setPasswordInvalid(passwordInvalid);
        setPasswordErrText(passwordInvalid ? 'Password should be at least 6 letters' : '');
    }, []);

    const validateRepeatPassword = useCallback((value) => {
        const repeatPasswordInvalid = passwordValidation(value);
        setRepeatPassword(value);
        setRepeatPasswordInvalid(repeatPasswordInvalid);
        setRepeatPasswordErrText(repeatPasswordInvalid ? 'Password should be at least 6 letters' : '');
    }, []);

    const closeModal = useCallback(() => {
        setIsMessageOpen(false);
    }, []);

    useEffect(() => {
        setFormValid(firstName !== '' && lastName !== '' && email !== '' && password !== '' && repeatPassword !== ''
            && !emailInvalid && !passwordInvalid && !repeatPasswordInvalid);
    }, [firstName, lastName, email, password, repeatPassword, emailInvalid, passwordInvalid, repeatPasswordInvalid]);

    const classes = useStyles();

    return (
        <div className='SignUp'>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <form autoComplete='off'>
                <TextField
                    value={firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    className={classes.textField}
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    value={lastName}
                    variant="outlined"
                    required
                    fullWidth
                    className={classes.textField}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    value={email}
                    variant="outlined"
                    label="Email Address *"
                    placeholder="Email Address *"
                    className={classes.textField}
                    name="email"
                    type='email'
                    autoComplete="email"
                    helperText={emailErrText}
                    error={emailInvalid}
                    onChange={(e) => validateEmail(e.target.value)} />
                <TextField
                    value={password}
                    variant="outlined"
                    label="Password *"
                    placeholder="Password"
                    className={classes.textField}
                    type='password'
                    name="password"
                    helperText={passwordErrText}
                    error={passwordInvalid}
                    onChange={(e) => validatePassword(e.target.value)} />
                <TextField
                    value={repeatPassword}
                    label="Repeat Password *"
                    placeholder="Repeat password"
                    className={classes.textField}
                    name="repeatPassword"
                    variant="outlined"
                    type='password'
                    helperText={repeatPasswordErrText}
                    error={repeatPasswordInvalid}
                    onChange={(e) => validateRepeatPassword(e.target.value)} />
                {
                    !isLoading ? <Button
                    variant="contained"
                    color="primary"
                    disabled={!formValid}
                    className={classes.button}
                    onClick={handleSignUp}>
                    Sign Up
                    </Button> : <CircularProgress />
                }
            </form>
            <Link to='/signin' variant="body2">
                {"Already have an account? Sign In"}
            </Link>
            <Copyright color="textPrimary" />
            <Message
                isOpen={isMessageOpen}
                onClose={closeModal}
                variant="error"
                message={errMessage}
            />
        </div>
    );
};

export default withRouter(SignUp);
