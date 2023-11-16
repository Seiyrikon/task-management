import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class TaskTableComponent implements OnInit, OnDestroy {
  // columnsToDisplay = ['ID', 'Name', 'Description', 'Del'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement!: Task | null;
  displayedColumns: string[] = ['id', 'name', 'priority', 'duration', 'description', 'action'];
  dataSource!: Task[];
  private _subscription!: Subscription;

  constructor(
    private _taskService: TaskService,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this._subscription = this._taskService.getAllTasks().subscribe((data) => {
      this.dataSource = data;
      this._cdr.detectChanges();
      console.log('Table Data Updated:', this.dataSource);
    });

    this._taskService.getTaskAddedSubject().subscribe((newTask) => {
      this.dataSource.push(newTask);
      this._cdr.detectChanges();
      console.log('New Task Added:', newTask);
    });

  }

  getPriorityColor(priorityName: string | undefined): string {
    // Define your color logic based on priorityName or priorityId
    // For example, you can use a switch statement or if conditions

    switch (priorityName) {
      case 'High':
        return 'warn'; // Use the 'warn' color for High priority
      case 'Normal':
        return 'primary'; // Use the 'primary' color for Normal priority
      case 'Low':
        return 'accent'; // Use the 'accent' color for Low priority
      default:
        return 'basic'; // Default color for other priorities
    }
  }

  ngOnDestroy(): void {
      if(this._subscription) {
        this._subscription.unsubscribe();
      }
  }
  
}
