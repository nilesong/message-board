import { useEffect, useState } from "react"
import './App.css'

function App(){

  const backendURL = "https://message-board-backend-xgp8.onrender.com";
  const logoutURL = "https://message-board-backend-xgp8.onrender.com/logout";

  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false);
  const [username, setUsername] = useState();

  //Get username
  useEffect(()=>{
    let URL = window.location.pathname
    let user = URL.slice(8)
    setUsername(user);
  },[])

  //Fetch from backend
  useEffect(()=>{
    if(username){
      const fetchData = async () => {
        const data = await fetch(`${backendURL}/post/${username}`)
        const json = await data.json();
        setPosts(json);
      }
    
      // call the function
      setInterval(fetchData, 5000)
    }
  }, [username])

  //Edit Post Toggle
  const handleEdit = (event) =>{
    event.target.classList.toggle("hidden");
    event.target.parentElement.children[2].classList.toggle("hidden");
  }

  //Edit Post Message
  const handleEditPost = (event, id) => {
    const sentMessage = {
      message: event.target[0].value,
    }
    postEdit(sentMessage, id);
    event.target[0].value = "";
    event.target[1].value = "";
    event.preventDefault();
    event.target.classList.toggle("hidden");
    event.target.parentElement.children[3].classList.toggle("hidden");
  }

  //Send Edit
  const postEdit = async (message, id) => {
    await fetch(`${backendURL}/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }, 
      body: JSON.stringify(message)
    })
  }

  //Delete Post
  const handleDelete = async (id) => {
    try{
      await fetch(`${backendURL}/delete/${id}`, {method: 'DELETE'})
    }catch(err){
      console.error(err);
    }

  }

  //Submit Post
  const handleSubmit = (event) => {
    console.log(username);
    const sentMessage = {
      name: event.target[0].value,
      message: event.target[1].value,
      postDate: new Date(),
      thread: username,
    }
    postMessage(sentMessage)
    event.target[0].value = "";
    event.target[1].value = "";
    event.preventDefault();
    setVisible(!visible);
  }

  //Send Post
  const postMessage = async (message) => {
    await fetch(`${backendURL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json'
      }, 
      body: JSON.stringify(message)
    })
  }

  const dateFormat = (date) => {
    const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateString = date.substring(0,10);
    const postDate = new Date(dateString);
    const postMonth = monthArray[postDate.getMonth()];
    const postDay = postDate.getDate();
    const postYear = postDate.getFullYear();
    return `${postMonth} ${postDay}, ${postYear}`;
  }

  
  return (
  <>
  
   <header>
   <form action={logoutURL} method="get" className="logout">
    <span>{username}</span>
    <button type="submit">Logout</button>
   </form>
   </header>

   <div className="title"><h1>Message Board</h1></div>
   <form onSubmit={handleSubmit}>
    <div>
    <input type="text" name="name" id="name" placeholder="Name"/>
    <textarea name="message" id="message" placeholder="Write your thoughts..." cols="30" rows="10"></textarea>
    <div><button type="submit">Submit</button></div>
    </div>
   </form>

    <ul className="posts">
    {posts.toReversed().map(value => 
    <li key={value._id}>
      <div><span className="username">{value.name}</span> <span className="postDate">{dateFormat(value.postDate)}</span></div>
      <p>{value.message}</p>
      <form className="hidden" onSubmit={(event) => handleEditPost(event, value._id)}>
        <div className="editDiv">
          <textarea name="message" id="message" placeholder="Write your thoughts..." cols="30" rows="10"></textarea>
          <div><button type="submit">Submit</button></div>
        </div>
      </form>
      <button className="" onClick={handleEdit}>Edit</button>
      <button onClick={() => handleDelete(value._id)}>Delete</button>
    </li>
    )}
    </ul>
    

  </>
  )
}

export default App