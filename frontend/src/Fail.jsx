import { Link } from "react-router-dom"

function Login(){

    return(
        <>
            <h1>Failed to authenticate. Try to login again.</h1>
            <form action="http://localhost:4000/login" method="post">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" placeholder="username" type="text" required />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" placeholder="password" type="password" required />
                <button type="submit">Log In</button>
                <Link to="/signup"><button>Sign Up</button></Link>
            </form>
        </>
    )
}

export default Login