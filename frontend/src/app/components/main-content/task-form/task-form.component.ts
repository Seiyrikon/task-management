import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, map, startWith } from 'rxjs';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{
  taskForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showSpinner: boolean = false;
  showForm: boolean = false;
  showAddButton: boolean = true;
  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions!: Observable<string[]>;

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

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.showSpinner = true;
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
      ).add(() => {
        this.showSpinner = false;
      });
    } else {
      console.error('Form is invalid. Please check the fields');
      this.showSpinner = false;
    }
  }

  openSnackBar() {
    this._snackbar.open('Hello', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  onShowForm() {
    this.showForm = !this.showForm;
    this.showAddButton = !this.showAddButton;
  }

  onHideForm() {
    this.showForm = !this.showForm;
    this.showAddButton = !this.showAddButton;
  }
}
