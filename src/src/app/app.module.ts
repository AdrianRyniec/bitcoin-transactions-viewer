import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { CdkTableModule } from '@angular/cdk/table';

import {
    MatFormFieldModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent }         from './app.component';
import { TransactionsSearchComponent } from './transactions-search/transactions-search.component';
import { TransactionDetailsDialogComponent } from './transactions-search/transaction-details-dialog/transaction-details-dialog.component';
import { TransactionsDetailsService }          from './transactions-details.service';

@NgModule({
  exports: [
    CdkTableModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule {}

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularMaterialModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent, TransactionsSearchComponent, TransactionDetailsDialogComponent
  ],
  entryComponents: [TransactionDetailsDialogComponent],
  providers: [ TransactionsDetailsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }