import React, { useState, useCallback, useContext, useEffect } from 'react';
import { withRouter, Redirect } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import './SignIn.css';
import { AuthContext } from "../../Hooks/UseAuthProvider";
import { Link } from "react-router-dom";
import Message from "../../components/Message/Message";
import Copyright from '../../components/Copywrite/CopyWrite';
import { emailValidation, passwordValidation } from '../../utils/validations';

const useStyles = makeStyles(theme => ({
    textField: {
        margin: theme.spacing(2),
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

const SignIn = ({ history }) => {
    const { user, signIn } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [emailErrText, setEmailErrText] = useState('');
    const [password, setPassword] = useState('');
    const [passwordInvalid, setPasswordInvalid] = useState(false);
    const [passwordErrText, setPasswordErrText] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isMessageOpen, setIsMessageOpen] = useState(false);
    const [errMessage, setErrorMessage] = useState('');

    const classes = useStyles();

    const handleSignIn = useCallback(async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await signIn(email, password);
            history.push("/");
        } catch (error) {
            setErrorMessage(error.message);
            setIsMessageOpen(true);
            setIsLoading(false);
        }
    }, [signIn, history, email, password]);

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

    const closeModal = useCallback(() => {
        setIsMessageOpen(false);
    }, []);

    useEffect(() => {
        setFormValid(email !== '' && password !== '' && !emailInvalid && !passwordInvalid);
    }, [email, password, emailInvalid, passwordInvalid]);

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className='SignIn'>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form autoComplete='off'>
                <TextField
                    variant="outlined"
                    value={email}
                    label="Email Address *"
                    placeholder="Email Address"
                    className={classes.textField}
                    name="email"
                    type='email'
                    autoFocus
                    autoComplete="email"
                    helperText={emailErrText}
                    error={emailInvalid}
                    onChange={(e) => validateEmail(e.target.value)} />
                <TextField
                    variant="outlined"
                    value={password}
                    label="Password *"
                    placeholder="Password"
                    className={classes.textField}
                    type='password'
                    name="password"
                    helperText={passwordErrText}
                    error={passwordInvalid}
                    onChange={(e) => validatePassword(e.target.value)} />
                {
                    !isLoading ? <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!formValid}
                        className={classes.button}
                        onClick={handleSignIn}>
                        Sign In
                    </Button> : <CircularProgress />
                }
            </form>
            <Link to='/signup' variant="body2">
                {"Don't have an account? Sign Up"}
            </Link>
            <Copyright color="textPrimary"/>
            <Message
                isOpen={isMessageOpen}
                onClose={closeModal}
                variant="error"
                message={errMessage}
            />
        </div>
    );
};

export default withRouter(SignIn);
