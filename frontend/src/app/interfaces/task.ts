import { Time } from "@angular/common"

export interface TaskOutput {
    task_id: number,
    task_name: string,
    task_start: Time,
    task_end: Time,
    task_description: string,
    del_flag: number
}

export interface TaskInput {
    task_name: string,
    task_start: Time,
    task_end: Time,
    task_description: string,
}
