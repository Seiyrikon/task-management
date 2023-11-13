import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private _taskService: TaskService,
    private _formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
  ) {
    this.taskForm = this._formBuilder.group({
      task_name: ['', Validators.required],
      task_description: [''],
      task_start: [''],
      task_end: [''],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTaskData = this.taskForm.value;
      this._taskService.addNewTask(newTaskData).subscribe(
        (response) => {
          console.log('Task added Successfully', response);
          this._taskService.notifyTaskAdded(response);
          this.openSnackBar();
        },
        (error) => {
          console.error('Error adding task', error);
        }
      );
    } else {
      console.error('Form is invalid. Please check the fields');
    }
  }

  openSnackBar() {
    this._snackbar.open('Hello', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }
}
