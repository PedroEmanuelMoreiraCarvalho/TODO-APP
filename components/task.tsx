import { FC, useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/theme_context';
import { TaskType, TasksType, ThemeType } from '../types/types';
import styles from '../styles/Task.module.css'
import { TasksContext } from '../contexts/tasks_context';

interface TaskProps {
    task: TaskType
}

const Task: FC<TaskProps> = (props) => {
    const { color_theme } = useContext<ThemeType>(ThemeContext)
    const { delete_task } = useContext<TasksType>(TasksContext)
    const card_ref = useRef(null)

    useEffect(
    ()=>{
      if(color_theme=="night"){
        card_ref.current.style.backgroundColor = "#444"
        card_ref.current.style.color = "#ddd"
      }else{
        card_ref.current.style.backgroundColor = "#ddd"
        card_ref.current.style.color = "#000"
      }
    }
    ,[color_theme])

    function deleteTask(){
        delete_task(props.task.task_id)
    } 

    return(
    <div className={styles.tasks} ref={card_ref}>
        <div>
            <div id={styles.title}>{props.task.task_name}</div>
            <div id={styles.description}>{props.task.task_description}</div>
            <div id={styles.date}>{props.task.task_end_date} {props.task.task_end_time ? props.task.task_end_time : null}</div>
        </div>
        <div className={styles.buttons}>
            <button id={styles.check}>
                <img src='/check.svg'/>
            </button>
            <button id={styles.trash} onClick={()=>{deleteTask()}}>
                <img src='/trash.svg'/>
            </button>
        </div>
    </div>
    )
};

export default Task;