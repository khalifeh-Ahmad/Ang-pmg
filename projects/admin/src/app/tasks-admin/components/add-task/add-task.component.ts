import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
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
  originalFormValue: any;

  ngOnInit(): void {
    this.createForm();
    this.originalFormValue = this.newTaskFrm.getRawValue();
  }

  createForm() {
    this.newTaskFrm = this.fb.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [this.data?.userId._id || '', [Validators.required]],
      image: [
        this.data?.image || '',
        [Validators.required, Validators.minLength(5)],
      ],
      description: [
        this.data?.description || '',
        [Validators.required, Validators.minLength(5)],
      ],
      deadline: [
        this.data
          ? new Date(
              this.data?.deadline.split('-').reverse().join('-')
            ).toISOString()
          : '',
        [Validators.required, Validators.minLength(5)],
      ],
    });
  }

  selectImg(e: any) {
    this.fileName = e.target.value;
    this.newTaskFrm.get('image')?.setValue(e.target.files[0]);
  }

  taskOperation() {
    this.spnr.show();
    let dataModel = this.createFrmData();
    const taskOperation = this.data?._id
      ? this.srv.updateTask(dataModel, this.data._id)
      : this.srv.createTask(dataModel);

    taskOperation.subscribe(
      (res) => {
        this.spnr.hide();
        this.dialog.close(true);
        this.handleSuccess(
          this.data?._id
            ? 'Task Updated Successfully'
            : 'Task Added Successfully'
        );
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

  onClose() {
    if (this.newTaskFrm.dirty && !this.isFormUnchanged()) {
      const dlgRef = this.matDialog.open(ConfirmationComponent, {
        width: '600px',
        disableClose: true,
      });
      dlgRef.afterClosed().subscribe((res) => {
        if (res) {
        }
      });
    } else {
      this.dialog.close();
    }
  }
  isFormUnchanged() {
    const currentValue = this.newTaskFrm.getRawValue();
    return (
      JSON.stringify(currentValue) === JSON.stringify(this.originalFormValue)
    );
  }
  handleSuccess(message: string) {
    this.spnr.hide();
    this.dialog.close(true);
    Swal.fire({
      icon: 'success',
      title: message,
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
  }

  handleError(er: any) {
    this.spnr.hide();
    Swal.fire({ icon: 'error', title: 'Oops...', text: er.error.message });
  }
}
