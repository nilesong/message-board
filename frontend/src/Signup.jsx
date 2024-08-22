function Signup(){

    return(
        <>
        <form action="http://localhost:4000/register" method="post">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" placeholder="username" type="text" />
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
            <button type="submit">SIGN UP</button>
        </form>
        </>
    )
}

export default Signup