import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { TransactionsDetailsService } from '../transactions-details.service';
import { TransactionDetailsDialogComponent } from './transaction-details-dialog/transaction-details-dialog.component';

@Component({
  selector: 'transactions-search',
  templateUrl: './transactions-search.component.html',
  styleUrls: [ './transactions-search.component.less' ]
})

@Injectable()
export class TransactionsSearchComponent {
  public transactionDetails: any = {};
  public isHashValid: boolean = null;
  public isLengthValid: boolean = null;
  public waitingForData: boolean = false;
  private detailsNames: any = {
    'adresses': 'Adresses',
    'block_hash': 'Block hash',
    'block_height': 'Block height',
    'block_index': 'Block index',
    'confidence': 'Confidence',
    'confirmations': 'Confirmations',
    'confirmed': 'Confirmed',
    'fees': 'Fees',
    'hash': 'Hash/Transaction Id',
    'preference': 'Preference',
    'received': 'Received',
    'size': 'Size (bytes)'
  };
  public strokeWidth: number = 10;
  public diameter: number = 50;

  constructor(public dialog: MatDialog, private transactionsDetailsService: TransactionsDetailsService) {}

  validate(term: any): void {
    if (term.length == 64) {
      this.isLengthValid = true;
    }
    if (term.length != 64) {
      this.isLengthValid = false;
    }
    if (/^[0-9a-f]+$/i.test(term)) {
      this.isHashValid = true;
    }
    if (!/^[0-9a-f]+$/i.test(term)) {
      this.isHashValid = false;
    }
  }

  openDialog(): void {
    let details = this.transactionDetails;
    let dialogRef = this.dialog.open(TransactionDetailsDialogComponent, {
      width: '1000px',
      data: details
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);
    });
  }

  getTransactionDetails(hash: string) {
    this.waitingForData = true;
    this.transactionsDetailsService.getTransactionDetails(hash).subscribe( (data) => {
      console.log('data:', data);
      this.transactionDetails.hasData = true;
      this.transactionDetails.hash = hash;
      this.transactionDetails.data = this.preparePropertiesForDialogData(this.detailsNames, data);
      this.waitingForData = false;
      this.openDialog();
    },
    (error) => {
      console.log('error:', error);
      this.transactionDetails.hasData = false;
      this.transactionDetails.hash = hash;
      this.transactionDetails.error = error;
      this.waitingForData = false;
      this.openDialog();
    });
  }

  preparePropertiesForDialogData(customNames: any, transDetails: any): any {
    let customDetails: any = [];
    let names: any = [];
    let values: any = [];

    for (var detail in transDetails) {
      if (transDetails.hasOwnProperty(detail) && customNames.hasOwnProperty(detail)) {
        let key = customNames[detail];
        let value = transDetails[detail];
        names.push(key);
        values.push(value)
      }
    }
    customDetails.push(names);
    customDetails.push(values);
    return customDetails;
  }
}