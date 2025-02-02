import { useState } from 'react'
import ryanFace from './assets/ryan.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={ryanFace} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Bang Counter</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          The RS Guy has banged <code>{count}</code> times this stream.
        </p>
      </div>
    </>
  )
}

export default App
