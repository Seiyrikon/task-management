import { Component } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent {
  task_name!: FormControl;
  task_description!: FormControl;
  task_start!: FormControl;
  task_end!: FormControl;
  priority_name!: FormControl;

  editTaskForm: FormGroup = new FormGroup({
    task_name: new FormControl('', Validators.required),
    task_description: new FormControl('', Validators.required),
    task_start: new FormControl('', Validators.required),
    task_end: new FormControl('', Validators.required),
    priority_name: new FormControl('', Validators.required),
  })
}
