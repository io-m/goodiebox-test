import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import AuthContainer from '../../components/AuthContainer';
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    const [registering, setRegistering] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const NAMESPACE = 'Registering new user'
    const history = useHistory();

    const signUpWithEmailAndPassword = () => {
        // Checking whether passwords match
        if (password !== confirm) {
            setError('Paswword does not match');
            return;
        }
        // Crearing any existing error from state
        if (error !== '') setError('');

        setRegistering(true);

        // Firebase api call. Creating new User
        auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
            logging.info(result, NAMESPACE);
            axios.post('http://localhost:3001/register', {
                data: {
                    email: email,
                    password: password
                }
            })
            .then(data => {
                console.log("DATA: ", data)
            })
            .catch(error => {
                logging.error('Cang get data from server', NAMESPACE)
                return error
            })
            history.push('/login');
        })
        .catch(error => {
            logging.error(error);
            setError('We cannot register you. Try again later')
            setRegistering(false);
        });
    }

    return (
        <AuthContainer header="Register">
            <FormGroup>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email address"
                    onChange={event => setEmail(event.target.value)}
                    value={email}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    autoComplete="new-password"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    autoComplete="new-password"
                    type="password"
                    name="confirm"
                    id="confirm"
                    placeholder="confirm password"
                    onChange={event => setConfirm(event.target.value)}
                    value={confirm}
                />
            </FormGroup>
            <Button
                disabled={registering}
                color="success"
                block
                onClick={() => signUpWithEmailAndPassword()}
            >
                Sign Up
            </Button>
            <small>
                <p className='m-1 text-center'>Already have an account? <Link to="/login">Login.</Link></p>
            </small>
            <ErrorText error={error} />
        </AuthContainer>
    );
}

export default RegisterPage;