import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Auth0 from '../../auth/Auth';

function SecuredRoute(props) {
    const { component: Component, path, checkingSession } = props;
    return (
        <Route path={path} render={() => {
            // if (checkingSession) return <h3>Validaion Session</h3>
            // <button onClick={() => Auth0.signIn()} className="py-6 px-8 text-3xl rounded shadow bg-blue-500 hover:bg-blue-200 text-yellow-darker">Log In Again</button>;
            console.log(Auth0.isAuthenticated())
            if (!Auth0.isAuthenticated()) {
                console.log("Hello")
                Auth0.signIn();
                return <div></div>;
            }
            return <Component />
        }} />

    );
}

export default withRouter(SecuredRoute);