import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import TaskTable from './TaskTable'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <TaskTable />
  </React.StrictMode>
)
