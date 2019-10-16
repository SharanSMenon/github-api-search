import React, { Component } from 'react';
import Auth0 from '../../auth/Auth';

class Protected extends Component {
    constructor(props) {
        super(props)
        this.state = { message: '', user: null, inp:'' };
        this.getGithubUser = this.getGithubUser.bind(this);
    }

    componentDidMount() {
        // this.input$
        //     .pipe(
        //         debounceTime(3000),
        //         filter(value => value.length > 3),
        //         flatMap(this.githubUser$)
        //     )
        //     .subscribe(user => {
        //         this.setState({ user });
        //     });
    }

    async getGithubUser() {
        const user = await fetch(
            `https://api.github.com/users/${this.state.inp}`
        ).then(res => res.json());
        this.setState({
            user
        })
    }
    render() {
        const { user } = this.state;
        console.log(user)
        return (
            <div>
                <p className="mb-10 text-xl">
                    Type in any GitHub username to view information
                </p>

                {user && (
                    <div className="mb-4 text-center">
                        <img src={user.avatar_url} alt="GitHub Avatar" width="200" className="shadow rounded mb-2 mx-auto" />
                        <h3 className="text-2xl text-blue-500"><a href={user["html_url"]} target="_blank" rel="noopener noreferrer">{user.login}</a></h3>
                        <h5 className="text-2xl text-blue-50">Repos: {user["public_repos"]}</h5>
                        <h5 className="text-2xl text-blue-50">Followers: {user["followers"]}</h5>
                    </div>
                )}
                <div className="flex items-center border-b border-b-2 py-2 w-4/12 text-center mx-auto">
                    <input className="rounded shadow w-full text-gray-700 mr-3 py-3 px-4 leading-tight focus:outline-none" value={this.state.inp} type="text" onChange={e => this.setState({
                        inp:e.target.value
                    })} placeholder="Github Username Here" aria-label="Full name" />
                    <button className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-2 px-4 rounded shadow" type="button" onClick={this.getGithubUser}>
                        Search
                    </button>
                </div>
                {/* <div className="flex flex-wrap -mx-3 mb-6">

                    <input onChange={e => this.input$.next(e.target.value)} placeholder="GitHub Username Here" className="py-3 px-4 rounded shadow w-64 outline-none" />
                    <button onClick={() => Auth0.signOut()} className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1">
                        Log Out
                    </button>
                </div> */}
            </div>
        );
    }
}

export default Protected;