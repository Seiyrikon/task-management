import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Priority } from 'src/app/interfaces/priority';
import { PriorityService } from 'src/app/services/priority/priority.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  task_name!: FormControl;
  task_description!: FormControl;
  task_start!: FormControl;
  task_end!: FormControl;
  priority_name!: FormControl;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showSpinner: boolean = false;
  myControl = new FormControl('');
  priorities!: Priority[];
  options!: string[];
  filteredOptions!: Observable<string[]>;
  private _subscription!: Subscription;

  constructor(
    private _taskService: TaskService,
    private _priorityService: PriorityService,
    private _formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
  ) { }

  
  taskForm: FormGroup = new FormGroup({
    task_name: new FormControl('', Validators.required),
    task_description: new FormControl('', Validators.required),
    task_start: new FormControl('', Validators.required),
    task_end: new FormControl('', Validators.required),
    priority_name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this._subscription = this._priorityService.getAllPriority().subscribe(
      (data) => {
        this.priorities = data;
        this.options = this.priorities.map((priority) => priority.priority_name);
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      },
      (error) => {
        console.error(error);
      });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // Check if options is defined before filtering
    return this.options ? this.options.filter(option => option.toLowerCase().includes(filterValue)) : [];
  }

  onSubmit() {
    const priorityName = this.taskForm.get('priority_name')?.value;
    const priorityId = this.getPriorityId(priorityName);

    console.log('Form Task', this.taskForm.value);
    console.log('Priority name', priorityName);
    
    if (this.taskForm.valid && priorityId !== undefined) {
      this.showSpinner = true;
      const newTaskData = this.taskForm.value;
      
      this._taskService.addNewTask(newTaskData, priorityId).subscribe(
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

  getPriorityId(priorityName: string): number | undefined {
    const priority = this.priorities.find(p => p.priority_name === priorityName);
    return priority ? priority.priority_id : undefined;
  }

  openSnackBar() {
    this._snackbar.open('Hello', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }
}
