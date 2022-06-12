import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Header from '../components/header'
import Task from '../components/task'
import { TasksContext } from '../contexts/tasks_context'
import { ThemeContext } from '../contexts/theme_context'
import styles from '../styles/Home.module.css'
import { TasksType, TaskType, ThemeType } from '../types/types'

export default function Home() {
  const { color_theme } = useContext<ThemeType>(ThemeContext)
  const { tasks, add_task } = useContext<TasksType>(TasksContext)
  const [formIsOpened, setFormState] = useState<boolean>(false)

  const [taskState,setTaskState] = useState<TaskType>({
    task_name: "",
    task_description: "",
    task_end_date: "",
  })

  const background_ref = useRef(null)
  const form_ref = useRef(null)

  const HandleTask = useCallback(
    (newTaskState:any)=>{
      if(newTaskState.task_name != undefined){
        setTaskState({
          ...taskState,
          task_name: newTaskState.task_name
        })
      }
      if(newTaskState.task_description != undefined){
        setTaskState({
          ...taskState, 
          task_description: newTaskState.task_description
        })
      }
      if(newTaskState.task_end_date != undefined){
        setTaskState({
          ...taskState, 
          task_end_date: newTaskState.task_end_date
        })
      }
      if(newTaskState.task_end_time != undefined){
        setTaskState({
          ...taskState, 
          task_end_time: newTaskState.task_end_time
        })
      }
    }
  ,[taskState,setTaskState])

  useEffect(
    ()=>{
      if(color_theme=="night"){
        background_ref.current.style.backgroundColor = "#444"
        background_ref.current.style.color = "#ddd"
        form_ref.current.style.backgroundColor = "#555"
      }else{
        background_ref.current.style.backgroundColor = "#eee"
        background_ref.current.style.color = "#000"
        form_ref.current.style.backgroundColor = "#eee"
      }
    }
  ,[color_theme])
  
  function openNewTaskForm(){
    setFormState(!formIsOpened)
    if(!formIsOpened){
      form_ref.current.style.display = "flex"
    }else{
      form_ref.current.style.display = "none"
    }
  }

  function AddTask(e:React.FormEvent){
    e.preventDefault()
    let new_task:TaskType = taskState
    add_task(new_task)
  }

  return (
    <div ref={background_ref} className={styles.background}>
      <Header/>
      <div className={styles.add_task_field}>
        <button className={styles.add_task} onClick={()=>{openNewTaskForm()}}>
          Add Task ✏️
        </button>
        <div ref={form_ref} className={styles.new_task_form}>
          <input type='text' placeholder='Task Name' onChange={(e)=>{HandleTask({task_name: e.target.value})}}/>
          <input type='text' placeholder='Task Description' onChange={(e)=>{HandleTask({task_description: e.target.value})}}/>
          <div>
            <input type='date' onChange={(e)=>{HandleTask({task_end_date: e.target.value})}}/>
            <input type='time' onChange={(e)=>{HandleTask({task_end_time: e.target.value})}}/>
          </div>
          <button type='submit' onClick={(e)=>{AddTask(e)}}>Add Task</button>
        </div>
      </div>
      <div className={styles.tasks}>
        {
          tasks.length 
          ? tasks.map((task,key)=>{
            return(
              <Task task={task} key={key}/>
            )
          })
          :
          'No tasks'
        }
      </div>
    </div>
  )
}
