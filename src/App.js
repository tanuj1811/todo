import React, { useState, useEffect } from 'react'
import MobileTearSheet from './Components/MoblieTearSheet'
import { LIST } from './shared/object'
import './app.scss'
import { Card } from './Components/'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRotateRight,
  faTrashArrowUp,
} from '@fortawesome/free-solid-svg-icons'

function App() {
  const [completedTask, setCompletedTask] = useState([])
  const [unCompletedTask, setUnCompletedTask] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    let compTask = LIST.filter((task) => task.isDone)
    setCompletedTask(compTask)
    let unCompTask = LIST.filter((task) => !task.isDone)
    setUnCompletedTask(unCompTask)
  }, [])

  const taskHandler = (task) => {
    console.log('clicked' + task.isDone)
    const data = {
      _id: task._id,
      todo: task.todo,
      isDone: task.isDone ? false : true,
    }
    if (!task.isDone) {
      setCompletedTask((oldItems) => [...oldItems, data])
      let data2 = unCompletedTask.filter((t) => t._id !== data._id)
      setUnCompletedTask(data2)
    } else {
      setUnCompletedTask((oldItems) => [data, ...oldItems])
      let data2 = completedTask.filter((t) => t._id !== data._id)
      setCompletedTask(data2)
    }
  }

  const inputHandler = (e) => {
    if (e.key === 'Enter') {
      const data = {
        _id: 'fsfsfsf' + input,
        todo: input,
        isDone: false,
      }
      setUnCompletedTask((oldtasks) => [data, ...oldtasks])
      console.log(unCompletedTask)
      setInput('')
    }
  }

  const resetHandler = () => {
    setCompletedTask([])
    setUnCompletedTask([])
  }

  return (
    <div className="App">
      <header className="header">
        <h1>Todo List</h1>
      </header>
      <div className="container">
        <input
          placeholder="Add task"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={inputHandler}
          value={input}
        />
        <MobileTearSheet>
          <div className="features">
            <span>
              <FontAwesomeIcon onClick={resetHandler} icon={faTrashArrowUp} />
            </span>
            <span>
              <FontAwesomeIcon icon={faArrowRotateRight} />
            </span>
          </div>
          <h4>Things to do</h4>
          <ul>
            {unCompletedTask &&
              unCompletedTask.map((task) => (
                <Card onClick={() => taskHandler(task)}>{task.todo}</Card>
              ))}
            {unCompletedTask.length === 0 && <h3>Empty</h3>}
          </ul>
          <h4>{completedTask.length > 0 && 'History '}</h4>
          <ul>
            {completedTask &&
              completedTask.map((task) => (
                <Card onClick={() => taskHandler(task)}>{task.todo}</Card>
              ))}
          </ul>
        </MobileTearSheet>
      </div>
    </div>
  )
}

export default App
