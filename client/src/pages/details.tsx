import React, {  useState, useEffect } from 'react';
import { Button, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import AuthContainer from '../components/AuthContainer';
import IUserDetails from '../interfaces/details';
import logging from '../config/logging';
const Details: React.FunctionComponent<IUserDetails> = props => {
    const [name, setName] = useState<string>('');
    const [e_mail, setEmail] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [response, setResponse] = useState<boolean>(false);
    const { email, id } = props
    const NAMESPACE = 'Updating profle';
    useEffect(() => {
        if(email) {
            setEmail(email)
        }
    }, [email])
    const updateUserProfile = () => {
        if(window.localStorage.getItem('token')) {
            axios.put(
                `http://localhost:3001/profile/${id}`,
                {email: email, name: name,country: country},
                { headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}}
            )
            .then(data => {
                if(data) {
                    setResponse(true)
                    setEmail('')
                    setName('')
                    setCountry('')
                }
            })
            .catch(error => {
                logging.error('Cang get data from server', NAMESPACE)
                return error
            })
        }
    }
    return(
        <AuthContainer header="Update details">
            <FormGroup>
                <Input 
                    type="text"
                    name="name"
                    id="name"
                    placeholder="update your name"
                    onChange={event => setName(event.target.value)}
                    value={name}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="update your email"
                    onChange={event => setEmail(event.target.value)}
                    value={e_mail}
                />
            </FormGroup>
            <FormGroup>
                <Input 
                    type="text"
                    name="country"
                    id="country"
                    placeholder="update your country"
                    onChange={event => setCountry(event.target.value)}
                    value={country}
                />
            </FormGroup>
            <Button
                disabled={false}
                color="success"
                block
                onClick={updateUserProfile}
            >
                Update
            </Button>
            <hr className="bg-info m-3" />
            {
                response ? <h1>Huuura, we just updated your profile info :)</h1> : null
            }
        </AuthContainer>
    )
}

export default Details;
