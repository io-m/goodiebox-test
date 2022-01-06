import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, Container } from 'reactstrap';
import IPageProps from '../interfaces/page';
// import serverConfiguration from '../config/server';
import logging from '../config/logging';
import Details from './details';

const HomePage: React.FunctionComponent<IPageProps> = props => {
    const [userData, setUserData] = useState<any[]>([])
    const NAMESPACE = 'dashboard'
    
    // const api = serverConfiguration('http://localhost:', '3001', '/profile')
    useEffect(() => {
        if(window.localStorage.getItem('token')) {
            axios.get('http://localhost:3001/profile', {
                headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}
            })
            .then(data => {
                if(data) {
                    setUserData(data.data)
                }
            })
            .catch(error => {
                logging.error('Cang get data from server', NAMESPACE)
                return error
            })
        }
    }, [])
    const displayAll = (data: any) => {
        for(const d of data) {
            console.log("ddd::",d)
            return (
                <Details id={d.id} email={d.email}/>
            )
        }
    }
    return (
        <Container>
            <Card>
                <CardBody>
                    {
                        userData ? displayAll(userData) : null
                    }
                    {userData.length > 0 ? <p>Welcome to this page that is protected by Friebase auth!</p> : <p>No users sorry. This is in memory DB so they might be lost</p>}
                    
                    <p>
                        Click <Link to='/logout'>here</Link> to logout.
                    </p>
                </CardBody>
            </Card>
        </Container>
    );
}

export default HomePage;