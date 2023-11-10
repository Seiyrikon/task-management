import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TaskOutput } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

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
export class TaskTableComponent implements OnInit {
  // columnsToDisplay = ['ID', 'Name', 'Description', 'Del'];
  // columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  // expandedElement!: Task | null;
  displayedColumns: string[] = ['ID', 'Name', 'Description', 'Del'];
  dataSource!: TaskOutput[];

  constructor(
    private _taskService: TaskService
  ) { }

  ngOnInit(): void {
    this._taskService.getAllTasks().subscribe((data) => {
      this.dataSource = data;
    });

    this._taskService.getTaskAddedSubject().subscribe((newTask) => {
      this.dataSource.push(newTask);
    })
  }
  
}
