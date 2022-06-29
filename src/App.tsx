import React, { useEffect, useState, useMemo } from 'react';
import { Column } from 'react-table';
import { Data, DataButton } from './types/DataType';
import './App.css';
import { listen } from '@tauri-apps/api/event';
import dayjs from 'dayjs';
import TaskTable from './components/TaskTable';
import PrimaryButton from './components/PrimaryButton';

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

  const onClickAlert = (name: string) => {
    alert(name);
  };
  const dataButton: Array<DataButton> = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: <PrimaryButton name={'hello'} callback={onClickAlert} />,
      },
      {
        col1: 'react-table',
        col2: <PrimaryButton name={'react-table'} callback={onClickAlert} />,
      },
      {
        col1: 'whatever',
        col2: <PrimaryButton name={'whatever'} callback={onClickAlert} />,
      },
    ],
    []
  );
  const columnsButton: Array<Column<DataButton>> = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
    ],
    []
  );

  const data: Array<Data> = useMemo(
    () => [
      {
        col1: 'Hello',
        col2: 'World',
      },
      {
        col1: 'react-table',
        col2: 'rocks',
      },
      {
        col1: 'whatever',
        col2: 'you want',
      },
    ],
    []
  );
  const columns: Array<Column<Data>> = useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1',
      },
      {
        Header: 'Column 2',
        accessor: 'col2',
      },
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
        <TaskTable columns={columnsButton} data={dataButton} />
      </body>
    </div>
  )
}

export default App
