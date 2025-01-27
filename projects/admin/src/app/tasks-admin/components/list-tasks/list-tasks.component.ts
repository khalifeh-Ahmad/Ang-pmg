import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { NgxSpinnerService } from 'ngx-spinner';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss'],
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'user',
    'deadLineDate',
    'status',
    'actions',
  ];
  dataSource = [];
  tasksFilter!: FormGroup;
  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];
  imgPath = 'https://bc-crud.onrender.com/';
  status: any = [
    { name: 'Complete', id: 1 },
    { name: 'In-Prossing', id: 2 },
  ];
  constructor(
    public dlg: MatDialog,
    private srv: TasksService,
    private spn: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.spn.show();
    this.srv.getTasks().subscribe(
      (res: any) => {
        this.spn.hide();
        this.dataSource = res.tasks;
        //     console.log(res);
      },
      (er) => {
        this.spn.hide();
        console.log(JSON.stringify(er.message));
      }
    );
  }

  addTask() {
    const dlgRef = this.dlg.open(AddTaskComponent, {
      width: '600px',
      height: '500px',
    });
    dlgRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllTasks();
      }
    });
  }
}
