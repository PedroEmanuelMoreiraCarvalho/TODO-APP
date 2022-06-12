import React,{ FC, useCallback, useState } from "react";
import { TasksType, TaskArrayType, TaskType } from "../types/types";

interface PropsType {
    children: any
}

export const TasksContext = React.createContext<TasksType | null>(null);

const TasksProvider: FC<PropsType> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskArrayType>({tasks: [{
        task_id: 1,
        task_name: "xd",
        task_description: "a blulbublbu ",
        task_end_date: "dasasd",
        task_finished: false
    }]})

    const UpdateTasks = useCallback(
        (Tasks:TaskType[])=>{
            setTasks({
                tasks: Tasks
            })
        }
    ,[tasks,setTasks])

    const add_task = useCallback(
        (task: TaskType)=>{
            task.task_id = tasks.tasks.length + 1
            task.task_finished = false
            UpdateTasks([...tasks.tasks, task])
        },
    [tasks,setTasks])

    const delete_task = useCallback(
        (task_id: number)=>{
            let alr_tasks:TaskType[] = tasks.tasks
            let new_task_list:TaskType[] = alr_tasks.filter(
                (task)=>{
                    return task.task_id != task_id
                }
            )
            UpdateTasks(new_task_list)
        },
    [tasks,setTasks])

    return <TasksContext.Provider value={{tasks: tasks.tasks, add_task, delete_task}}>
      {children}
    </TasksContext.Provider>;
};

export default TasksProvider;