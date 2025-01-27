import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private srv: TasksService,
    private spnr: NgxSpinnerService,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog
  ) {}

  users: any = [
    { name: 'Moahmed', id: '6797236a2de8a6f3d624d9d0' },
    { name: 'Ali', id: '679724392de8a6f3d624d9d3' },
    { name: 'Ahmed', id: '679724582de8a6f3d624d9d6' },
  ];
  fileName = '';
  newTaskFrm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newTaskFrm = this.fb.group({
      title: ['', Validators.required, Validators.minLength(5)],
      userId: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  selectImg(e: any) {
    this.fileName = e.target.value;
    this.newTaskFrm.get('image')?.setValue(e.target.files[0]);
  }
  createTask() {
    this.spnr.show();
    let dataModel = this.createFrmData();
    this.srv.createTask(dataModel).subscribe(
      (res) => {
        this.spnr.hide();
        this.dialog.close(true);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: 'success',
          title: 'Task Added successfully',
        });
      },
      (er) => {
        this.spnr.hide();
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: er.error.message,
          footer: er.message,
        });
      }
    );
  }
  createFrmData() {
    let newData = moment(this.newTaskFrm.value['deadline']).format(
      'DD-MM-YYYY'
    );
    //this.newTaskFrm.get('deadline')?.setValue(newData);
    let frmData = new FormData();

    Object.entries(this.newTaskFrm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        frmData.append(key, newData);
      } else {
        frmData.append(key, value);
      }
    });
    return frmData;
  }
}
