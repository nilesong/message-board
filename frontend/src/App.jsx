import { useEffect, useState } from "react"
import './App.css'

function App(){

  const [posts, setPosts] = useState([]);
  // const [updateDisplay, setUpdateDisplay] = useState(0);

  //TO FIX INFINITE LOOP
  useEffect(()=>{
    const fetchData = async () => {
      const data = await fetch('http://localhost:4000/post')
      const json = await data.json();
      setPosts(json);
    }
  
    // call the function
    setInterval(fetchData, 5000)
  }, [])

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
    const sentMessage = {
      name: event.target[0].value,
      message: event.target[1].value,
      postDate: new Date()
    }
    postMessage(sentMessage)
    event.target[0].value = "";
    event.target[1].value = "";
    event.preventDefault();
  }

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


  
  return (
  <>
  
   <h1>Message Board</h1>
   {/* <button onClick={handleCreate}>Create</button> */}

   <form onSubmit={handleSubmit}>
    <input type="text" name="name" id="name" placeholder="Name"/>
    <div>
    <textarea name="message" id="message" placeholder="Write your thoughts..." cols="30" rows="10"></textarea>
    <div><button type="submit">Submit</button></div>
    </div>
   </form>

    <ul className="posts">
    {posts.map(value => 
    <li key={value._id}>
      <div><span>{value.name}</span> <span>{value.postDate}</span></div>
      <p>{value.message}</p>
      <button onClick={() => handleDelete(value._id)}>Delete</button>
    </li>
    )}
    </ul>
    

  </>
  )
}

export default App