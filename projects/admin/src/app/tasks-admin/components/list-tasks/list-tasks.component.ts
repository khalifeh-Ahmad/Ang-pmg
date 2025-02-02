import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import Swal from 'sweetalert2';

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
    { name: 'Moahmed', id: '6797236a2de8a6f3d624d9d0' },
    { name: 'Ali', id: '679724392de8a6f3d624d9d3' },
    { name: 'Ahmed', id: '679724582de8a6f3d624d9d6' },
  ];
  imgPath = 'https://bc-crud.onrender.com/';
  status: any = [{ name: 'Complete' }, { name: 'In-Progress' }];
  page: any = 1;
  total: any;
  filter: any = {
    page: this.page,
    limit: 5,
  };
  timeOutId: any;

  constructor(public dlg: MatDialog, private srv: TasksService) {}

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.srv.getTasks(this.filter).subscribe(
      (res: any) => {
        this.dataSource = res.tasks;
        //  console.log(res)
        this.total = res.totalItems;
      },
      (er) => {
        console.log(JSON.stringify(er.message));
      }
    );
  }

  addTask() {
    const dlgRef = this.dlg.open(AddTaskComponent, {
      width: '600px',
      height: '500px',
      disableClose: true, //to disable closing the dialog when click on screen
    });
    dlgRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllTasks();
      }
    });
  }

  updateTask(task: any) {
    const dlgRef = this.dlg.open(AddTaskComponent, {
      width: '600px',
      height: '500px',
      data: task,
    });

    dlgRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getAllTasks();
      }
    });
  }

  deleteTask(id: any) {
    this.srv.deleteTask(id).subscribe((res) => {
      alert(JSON.stringify(res));
      //console.log(res);
      this.getAllTasks();
    });
  }

  updateFilter(key: string, value: any, debounce: boolean = false) {
    this.page = 1;
    this.filter['page'] = 1;
    if (debounce) {
      clearTimeout(this.timeOutId);
      this.timeOutId = setTimeout(() => {
        this.filter[key] = value.value;
        this.getAllTasks();
      }, 2000);
    } else {
      this.filter[key] = value?.trim ? value.trim() : value;
      this.getAllTasks();
    }
  }
  dateRangeFilter1(e: any, type: string) {
    // Ensure the selected date is valid before formatting
    const formattedDate = moment(e.value).format('DD-MM-YYYY');
    if (!moment(formattedDate, 'DD-MM-YYYY', true).isValid()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Please select a valid date.',
      });
      return; // Exit the function if the date is invalid
    }

    // Update filter
    this.filter[type] = formattedDate;

    // Check if both fromDate and toDate are set
    if (this.filter['fromDate'] && this.filter['toDate']) {
      // Parse the dates into moment objects
      const fromDate = moment(this.filter['fromDate']);
      const toDate = moment(this.filter['toDate']);

      // Ensure the toDate is not earlier than fromDate
      if (toDate.isBefore(fromDate)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'End date cannot be earlier than start date!',
        });
        return; // Prevent the search call
      }

      // Proceed to fetch tasks if both dates are valid
      this.getAllTasks();
    }
  }
  dateRangeFilter(e: any, type: string) {
    this.page = 1;
    this.filter['page'] = 1;
    const formattedDate = moment(e.value).format('YYYY-MM-DD');
    this.filter[type] = formattedDate;
    if (type == 'toDate' && this.filter['toDate'] !== 'Invalid date') {
      this.getAllTasks();
    }
  }

  changePage(e: any) {
    this.page = e;
    this.filter['page'] = e;
    this.getAllTasks();
  }
}
