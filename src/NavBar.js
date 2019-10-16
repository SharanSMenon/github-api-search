import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from './auth/Auth';
function NavBar(props) {
    const signOut = () => {
        auth0Client.signOut();
        props.history.replace('/');
    };
    return (
        <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6 mb-3">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">Github API Search</span>
            </div>
            <div className="">
                <div>
                    {
                        !auth0Client.isAuthenticated() &&
                        <button className="nline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={auth0Client.signIn}>Sign In</button>
                    }
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            {/* <label className="mr-2 text-white">{auth0Client.getProfile().name}</label> */}
                            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0" onClick={() => { signOut() }}>Sign Out</button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    );
}

export default withRouter(NavBar);