import { useEffect, useState } from 'react'
import './App.css'
import { listen } from '@tauri-apps/api/event'
import dayjs from 'dayjs'

function App() {
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
      </body>
    </div>
  )
}

export default App
