import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, startWith, switchMap } from 'rxjs';
import { Priority } from 'src/app/interfaces/priority';
import { Task } from 'src/app/interfaces/task';
import { PriorityService } from 'src/app/services/priority/priority.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent implements OnInit, OnDestroy {
  constructor(
    private _taskService: TaskService,
    private _route: ActivatedRoute,
    private _priorityService: PriorityService,
    private _snackbar: MatSnackBar,
    private _formBuilder: FormBuilder,
  ) { }

  task_name!: FormControl;
  task_description!: FormControl;
  task_start!: FormControl;
  task_end!: FormControl;
  priority_name!: FormControl;

  private _subscription!: Subscription;
  task!: Task;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  showSpinner: boolean = false;
  myControl = new FormControl('');
  priorities!: Priority[];
  options!: string[];
  filteredOptions!: Observable<string[]>;

  editTaskForm: FormGroup = new FormGroup({
    task_name: new FormControl('', Validators.required),
    task_description: new FormControl('', Validators.required),
    task_start: new FormControl('', Validators.required),
    task_end: new FormControl('', Validators.required),
    priority_name: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    const taskId = this._route.snapshot.params['task_id'];
    console.log(taskId);
    
    this._subscription = this._taskService.getTaskById(taskId).pipe(
      switchMap((response) => {
        this.task = response;
        return this._priorityService.getPriorityById(this.task.priority_id);
      })
    ).subscribe((priority) => {
      this.editTaskForm = this._formBuilder.group({
        task_name: this.task.task_name,
        task_description: this.task.task_description,
        task_start: this.task.task_start,
        task_end: this.task.task_end,
        priority_name: priority.priority_name // Assuming priority object has priority_name
      });
    }, 
    (error) => {
      console.error(error);
    });

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
    const priorityName = this.editTaskForm.get('priority_name')?.value;
    const priorityId = this.getPriorityId(priorityName);

    console.log('Form Task', this.editTaskForm.value);
    console.log('Priority name', priorityName);
    
    if (this.editTaskForm.valid && priorityId !== undefined) {
      this.showSpinner = true;
      const newTaskData = this.editTaskForm.value;
      
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
    if(this._subscription) {
      this._subscription.unsubscribe();
    }
  }

}
