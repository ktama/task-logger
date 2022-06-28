import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { listen } from '@tauri-apps/api/event'
import dayjs from 'dayjs'

function App() {
  const [count, setCount] = useState(0);
  const [nowStr, getNow] = useState(dayjs().format('YYYY-MM-DD HH:mm:ss'));

  useEffect(() => {
    let unlisten: any;
    async function getDate() {
      unlisten = await listen('get-date', event => {
        console.log(`get-date ${event.payload} ${new Date()}`)
        getNow(dayjs().format('YYYY-MM-DD HH:mm:ss'));
      });
    }
    getDate();

    return () => {
      if (unlisten) {
        unlisten();
      }
    }
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <p>{nowStr}</p>
      </header>
      <body className='App-body'>
        <p>Body</p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </body>
    </div>
  )
}

export default App
