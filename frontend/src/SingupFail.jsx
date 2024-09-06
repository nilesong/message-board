import { Link } from "react-router-dom"

function SignupFail(){

    return(
        <>
        <h1>Username already Taken. Please try again</h1>
        <form action="http://localhost:4000/register" method="post">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="username" type="text" required/>
            <label htmlFor="password">Password</label>
            <input id="password" name="password" placeholder="password" type="password" required />
            <button type="submit">Sign Up</button>
            <Link to="/"><button>Back to Log In</button></Link>
        </form>
        </>
    )
}

export default SignupFail