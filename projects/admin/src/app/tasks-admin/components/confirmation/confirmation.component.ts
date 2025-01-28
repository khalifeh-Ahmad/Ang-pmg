import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  constructor(
    public dlg: MatDialogRef<ConfirmationComponent>,
    public matDlg: MatDialog
  ) {}

  ngOnInit(): void {}

  confirm() {
    this.matDlg.closeAll();
  }
  close() {
    this.dlg.close();
  }
}
