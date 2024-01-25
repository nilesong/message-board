import { useEffect, useState } from "react"

function App(){

  const [posts, setPosts] = useState([]);
  const [updateDisplay, setUpdateDisplay] = useState(0);

  //TO FIX INFITE LOOP
  useEffect(()=>{
    const fetchData = async () => {
      const data = await fetch('http://localhost:4000/post')
      const json = await data.json();
      setPosts(json);
    }
  
    // call the function
    fetchData()
  }, [updateDisplay])


  //Force re-render
  const forceRender = () => {
    setUpdateDisplay(updateDisplay+1);
    console.log(updateDisplay);
  }

  //Create new post
  const createPost = async () => {
    await fetch(`http://localhost:4000/post`, {method: 'POST'})
  }

  const handleCreate = () => {
    createPost()
    forceRender();
  }
  
  // const handleCreate = async => {
  //   await fetch(`http://localhost:4000/post`, {method: 'POST'})
  // }

  const handleDelete = async (id) => {
    try{
      await fetch(`http://localhost:4000/delete/${id}`, {method: 'DELETE'})
      console.log(`http://localhost:4000/delete/${id}`)
    }catch(err){
      alert(err);
    }

  }

  // const handleDelete = async (id) => {
  //   await fetch(`http://localhost:4000/delete/${id}`, {method: 'DELETE'})
  //   console.log(`http://localhost:4000/delete/${id}`)
  // }

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
   <button onClick={handleCreate}>Create</button>
   {/* <button onClick={handleRefresh}></button> */}

   <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name: </label>
    <input type="text" name="name" id="name" />
    <label htmlFor="message">Message: </label>
    <textarea name="message" id="message" cols="30" rows="10"></textarea>
    <button type="submit"></button>
   </form>

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