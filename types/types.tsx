export interface ThemeType {
    color_theme: string,
    altern_theme: Function
}

export interface TaskType {
    task_id?: number,
    task_name: string,
    task_description: string,
    task_end_date: string,
    task_end_time?: string,
    task_finished?: boolean
}

export interface TasksType {
    tasks: TaskType[],
    add_task: Function,
    delete_task: Function
}

export interface TaskArrayType {
    tasks: TaskType[]
}
