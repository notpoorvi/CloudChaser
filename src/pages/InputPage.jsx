import { useState} from 'react'
// import './InputPage.css';

function InputPage() {

  const [name, setName] = useState("");
  const [dream, setDream] = useState("");

  const handleChange = (event) => {
    const {name, value} = event.target;
    if (name === "username") {
      setName(value);
    } else if (name === "dream") {
      setDream(value);
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault()

    console.log("Name:", name);
    console.log("Dream:", dream)

    // pass values to gemini api here
}
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <header>CloudChaser</header>
        <h2>Start Building Your Dream</h2>
          <label>ENTER YOUR NAME:</label>
          <input 
            type="text" 
            name="username" 
            value={name || ""} 
            onChange={handleChange}
          />  
          <label>ENTER YOUR DREAM:</label>
          <input 
            type="text" 
            name="dream" 
            value={dream || ""} 
            onChange={handleChange}
          />

          <button type="submit">Generate Your Roadmap</button>
      </form>
    </>
  )
}

export default InputPage;
