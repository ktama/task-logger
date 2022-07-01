import React, { useEffect, useState, useMemo } from 'react';
import { Column } from 'react-table';
import { Data, TaskData } from './types/DataType';
import './App.css';
import { listen } from '@tauri-apps/api/event';
import dayjs from 'dayjs';
import TaskTable from './components/TaskTable';

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

  const taskData: Array<TaskData> = useMemo(
    () => [
      {
        num: 1,
        key: 111,
        project: 'AAA',
        category: 'A',
        task: 'TaskA',
        // start: new Date(2022, 1, 1),
        // end: new Date(2022, 1, 2),
      },
      {
        num: 2,
        key: 222,
        project: 'BBB',
        category: 'B',
        task: 'TaskB1',
        // start: new Date(2022, 2, 1),
        // end: new Date(2022, 2, 2),
      },
      {
        num: 2,
        key: 222,
        project: 'BBB',
        category: 'B',
        task: 'TaskB2',
        // start: new Date(2022, 2, 5),
        // end: new Date(2022, 2, 10),
      },
    ],
    []
  );
  const columnsTask: Array<Column<TaskData>> = useMemo(
    () => [
      {
        Header: 'Num',
        accessor: 'num',
      },
      {
        Header: 'Key',
        accessor: 'key',
      },
      {
        Header: 'Project',
        accessor: 'project',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Task',
        accessor: 'task',
      },
      // {
      //   Header: 'Start',
      //   accessor: 'start',
      // },
      // {
      //   Header: 'End',
      //   accessor: 'end',
      // },
    ],
    []
  );

  const data: Array<Data> = useMemo(
    () => [
      {
        num: 1,
        key: 111,
        project: 'AAA',
        category: 'A',
        task: 'TaskA',
        // start: new Date(2022, 1, 1),
        // end: new Date(2022, 1, 2),
      },
      {
        num: 2,
        key: 222,
        project: 'BBB',
        category: 'B',
        task: 'TaskB1',
        // start: new Date(2022, 2, 1),
        // end: new Date(2022, 2, 2),
      },
      {
        num: 2,
        key: 222,
        project: 'BBB',
        category: 'B',
        task: 'TaskB2',
        // start: new Date(2022, 2, 5),
        // end: new Date(2022, 2, 10),
      },
    ],
    []
  );
  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: 'Num',
        accessor: 'num',
      },
      {
        Header: 'Key',
        accessor: 'key',
      },
      {
        Header: 'Project',
        accessor: 'project',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Task',
        accessor: 'task',
      },
      // {
      //   Header: 'Start',
      //   accessor: 'start',
      // },
      // {
      //   Header: 'End',
      //   accessor: 'end',
      // },
    ],
    []
  );
  return (
    <div className="App">
      <header className="App-header">
        <p>{nowStr}</p>
      </header>
      <body className='App-body'>
        <p>Body</p>
        <TaskTable columns={columnsTask} data={taskData} />
      </body>
    </div>
  )
}

export default App
