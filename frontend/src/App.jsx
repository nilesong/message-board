import { useEffect, useState } from "react"
import './App.css'

function App(){

  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState()
  // const [updateDisplay, setUpdateDisplay] = useState(0);


  //GET USERNAME
  useEffect(()=>{
    let URL = window.location.pathname
    let user = URL.slice(8)
    setUsername(user);
  },[])

  //TO FIX INFINITE LOOP
  useEffect(()=>{
    if(username){
      const fetchData = async () => {
        const data = await fetch(`http://localhost:4000/post/${username}`)
        const json = await data.json();
        setPosts(json);
      }
    
      // call the function
      setInterval(fetchData, 5000)
    }
  }, [username])

  // useEffect(()=>{
  //   const fetchData = async () => {
  //     const data = await fetch('http://localhost:4000/post')
  //     const json = await data.json();
  //     setPosts(json);
  //   }
  
  //   // call the function
  //   fetchData()
  // }, [])

  //Force re-render
  // const forceRender = () => {
  //   setUpdateDisplay(updateDisplay+1);
  //   console.log(updateDisplay);
  // }

  //Create new post
  // const handleCreate = async () => {
  //   try{
  //     await fetch(`http://localhost:4000/post2`, {method: 'POST'})
  //   }catch(err){
  //     console.error(err);
  //   }
  // }
  

  //Edit Post Toggle
  const handleEdit = () =>{
    setVisible(!visible);
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
    setVisible(!visible);
  }

  //Send Edit
  const postEdit = async (message, id) => {
    await fetch(`http://localhost:4000/edit/${id}`, {
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
      await fetch(`http://localhost:4000/delete/${id}`, {method: 'DELETE'})
    }catch(err){
      console.error(err);
    }

  }

  //Submit Post
  const handleSubmit = (event) => {
    console.log(username);
    const sentMessage = {
      // thread: username,
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
    await fetch('http://localhost:4000/post', {
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
   <img src="./src/assets/github.svg" alt="test" className="logo"/>
   <form action="http://localhost:4000/logout" method="get">
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
      {visible && (
        <>
        <form onSubmit={(event) => handleEditPost(event, value._id)}>
          <div className="editDiv">
            <textarea name="message" id="message" placeholder="Write your thoughts..." cols="30" rows="10"></textarea>
            <div><button type="submit">Submit</button></div>
          </div>
        </form>

        </>
        )
      }
      {!visible && <button onClick={handleEdit}>Edit</button>}
      <button onClick={() => handleDelete(value._id)}>Delete</button>
    </li>
    )}
    </ul>
    

  </>
  )
}

export default App