import { useEffect, useState } from "react"

function App(){

  const [posts, setPosts] = useState([]);
  const [updateDisplay, setUpdateDisplay] = useState(0);

  //TO FIX INFINITE LOOP
  useEffect(()=>{
    const fetchData = async () => {
      const data = await fetch('http://localhost:4000/post')
      const json = await data.json();
      setPosts(json);
    }
  
    // call the function
    setInterval(fetchData, 30000)
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
  const forceRender = () => {
    setUpdateDisplay(updateDisplay+1);
    console.log(updateDisplay);
  }

  //Create new post
  const createPost = async () => {
    try{
      await fetch(`http://localhost:4000/post`, {method: 'POST'})
    }catch(err){
      console.error(err);
    }
  }

  const handleCreate = () => {
    createPost().then(()=>forceRender())
  }
  
  //Delete Post
  const deletePost = async (id) => {
    try{
      await fetch(`http://localhost:4000/delete/${id}`, {method: 'DELETE'})
    }catch(err){
      console.error(err);
    }

  }
  const handleDelete = (id) => {
    deletePost(id).then(()=>forceRender()) 
  }

  //Submit Post
  const handleSubmit = (event) => {
    const sentMessage = {
      name: event.target[0].value,
      message: event.target[1].value,
      postDate: new Date()
    }
    postMessage(sentMessage)
    event.preventDefault();
  }

  const postMessage = async (message) => {
    await fetch('http://localhost:4000/post2', {
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
  
   <p>{updateDisplay}</p>
   <h1>Message Board</h1>
   <button onClick={handleCreate}>Create</button>
   {/* <button onClick={handleRefresh}></button> */}

   <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name: </label>
    <input type="text" name="name" id="name" />
    <label htmlFor="message">Message: </label>
    <textarea name="message" id="message" cols="30" rows="10"></textarea>
    <button type="submit">Submit</button>
   </form>

   <button onClick={forceRender}>Render</button>

   <ul>
    {posts.map(value => 
    <>
      <li key={value._id}>{value.name} {value.message} {value.postDate}</li>
      <button onClick={() => handleDelete(value._id)}>Delete</button>
    </>
    )}
    </ul>
    

  </>
  )
}

export default App