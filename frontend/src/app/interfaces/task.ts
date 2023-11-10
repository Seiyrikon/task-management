export interface TaskOutput {
    task_id: number,
    task_name: string,
    task_description: string,
    del_flag: number
}

export interface TaskInput {
    task_name: string,
    task_description: string,
}
