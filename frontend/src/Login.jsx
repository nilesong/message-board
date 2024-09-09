import { Link } from "react-router-dom"

const loginURL = "https://message-board-backend-xgp8.onrender.com/login";

function Login(){

    return(
        <>
            <form action={loginURL} method="post">
                <h1>LOGIN:</h1>
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