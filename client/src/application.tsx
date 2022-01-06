import React, { useEffect, useState } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import AuthRoute from './components/AuthRoute';
import { auth } from './config/firebase';
import logging from './config/logging';
import routes from './config/routes';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuth, setisAuth] = useState<boolean>(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                logging.info('User detected.');
                user.getIdToken()
                .then(t => {
                    window.localStorage.setItem('token', t)
                    setisAuth(true)
                })
            }
            else {
                logging.info('No user detected');
            }
            setLoading(false);
        })
    }, []);

    if(loading) {
        return <Spinner color="info" />
    }

    return (
        <div>
            <Switch>
                {routes.map((route, index) => 
                    <Route
                        key={index}
                        path={route.path} 
                        exact={route.exact} 
                        render={(routeProps: RouteComponentProps<any>) => {
                            if(route.protected) {
                                return <AuthRoute isAuth={isAuth}><route.component {...routeProps} /></AuthRoute>;
                            } else {
                                return <route.component  {...routeProps} />;
                            }

                        }}
                    />)}
            </Switch>
        </div>
    );
}

export default Application;