import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;

  constructor(
    private _taskService: TaskService,
    private _formBuilder: FormBuilder,
  ) {
    this.taskForm = this._formBuilder.group({
      task_name: ['', Validators.required],
      task_description: [''],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTaskData = this.taskForm.value;
      this._taskService.addNewTask(newTaskData).subscribe(
        (response) => {
          console.log('Task added Successfully', response);
          this._taskService.notifyTaskAdded(response);
        },
        (error) => {
          console.error('Error adding task', error);
        }
      );
    } else {
      console.error('Form is invalid. Please check the fields');
    }
  }
}
