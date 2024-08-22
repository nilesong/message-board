function Login(){

    return(
        <>
            <form action="http://localhost:4000/login" method="post">
                <label htmlFor="username">Username</label>
                <input id="username" name="username" placeholder="username" type="text" />
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" />
                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default Login