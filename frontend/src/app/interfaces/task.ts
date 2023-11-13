import { Time } from "@angular/common"

export interface Task {
    task_id: number,
    task_name: string,
    task_start: Time,
    task_end: Time,
    task_description: string,
    priority_id: number,
    del_flag: number
}
