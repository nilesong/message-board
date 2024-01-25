import { useEffect, useState } from "react"

function App(){

  const [trigger, setTrigger] = useState(Boolean);
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const data = await fetch('http://localhost:4000/post')
      const json = await data.json();
      setPosts(json);
    }
  
    // call the function
    fetchData()
  })

  const handleCreate = async () => {
    await fetch(`http://localhost:4000/post`, {method: 'POST'})
  }

  const handleDelete = async (id) => {
    await fetch(`http://localhost:4000/delete/${id}`, {method: 'DELETE'})
    console.log(`http://localhost:4000/delete/${id}`)
  }

  const handleSubmit = (event) => {
    const dateNow = new Date();
    const sentMessage = {
      name: event.target[0].value,
      message: event.target[1].value,
      date: dateNow
    } 
    console.log(sentMessage);
    event.preventDefault();
  }


  
  return (
  <>
   <button onClick={handleCreate}>Create</button>

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
      <li key={value._id}>{value.message}{value._id}</li>
      <button onClick={() => handleDelete(value._id)}>Delete</button>
    </>
    )}
    </ul>
  </>
  )
}

export default App