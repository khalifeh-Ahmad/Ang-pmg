import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private srv: TasksService,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog
  ) {}

  users: any = [
    { name: 'Moahmed', id: 1 },
    { name: 'Ali', id: 2 },
    { name: 'Ahmed', id: 3 },
    { name: 'Zain', id: 4 },
  ];
  fileName = '';
  newTaskFrm!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.newTaskFrm = this.fb.group({
      title: ['', Validators.required],
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
    let formModel = new FormData();

    formModel.append('title', this.newTaskFrm.value['title']);
    formModel.append('userId', this.newTaskFrm.value['userId']);
    formModel.append('image', this.newTaskFrm.value['image']);
    formModel.append('description', this.newTaskFrm.value['description']);
    formModel.append('deadline', this.newTaskFrm.value['deadline']);
    this.srv.createTask(formModel).subscribe((res) => {});
  }
}
