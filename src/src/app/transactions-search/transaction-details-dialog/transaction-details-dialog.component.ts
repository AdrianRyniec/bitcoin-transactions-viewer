import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'transaction-details-dialog',
  templateUrl: 'transaction-details-dialog.component.html',
  styleUrls: ['transaction-details-dialog.component.less'],
})

export class TransactionDetailsDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<TransactionDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public details: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}