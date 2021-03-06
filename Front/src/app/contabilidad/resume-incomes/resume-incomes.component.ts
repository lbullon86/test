import { Component, OnInit } from "@angular/core";
import { ResumeIncomesService } from "./resume-incomes.service";
import { InvoicingClass } from "../invoicing/invoicingClass-model";
import { Invoicing } from "../invoicing/invoicing-model";
import { MatDialog } from '@angular/material/dialog';
import { PdfInvoicesComponent } from 'src/app/pdf-invoices/pdf-invoices.component';

@Component({
  selector: "app-resume-incomes",
  templateUrl: "./resume-incomes.component.html",
  styleUrls: ["./resume-incomes.component.css"]
})
export class ResumeIncomesComponent implements OnInit {
  displayedColumns: string[] = ["sum"];
  invoicingClass: InvoicingClass;
  invoicinPayment: Invoicing;
  dataClass = [];
  dataPayment = [];
  colorScheme = {
    domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"]
  };
  date: Date;
  year: number;
  months = [];
  quarter: number;
  monthSelected: number;
  parameter: boolean;

  constructor(private serviceInvoicing: ResumeIncomesService, private dialog: MatDialog
  ) {
    this.invoicingClass = new InvoicingClass();
    this.invoicinPayment = new Invoicing();
    this.date = new Date();
    this.year = this.date.getFullYear();
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.parameter = true;
  }

  ngOnInit() {
    this.getIncomingYearByClass();
    this.getIncomingYearByPayment();
  }

  getMonthsOfQuarter(quarter: number) {
    var months = [];

    switch (quarter) {
      case 1:
        return (months = [1, 3]);
        break;
      case 2:
        return (months = [4, 6]);
        break;
      case 3:
        return (months = [7, 9]);
        break;
      case 4:
        return (months = [10, 12]);
        break;

      default:
        break;
    }
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getIncomingYearByClass() {
    this.serviceInvoicing
      .getInvoicingClass(this.year)
      .subscribe(
        invoicing => ((this.invoicingClass = invoicing), this.getDataByClass())
      );
  }

  getIncomingYearByPayment() {
    this.serviceInvoicing
      .getInvoicingPayment(this.year)
      .subscribe(
        invoicing => (
          (this.invoicinPayment = invoicing), this.getDataByMethodPayment()
        )
      );
  }

  getIncomingMonthByPayment() {
    this.serviceInvoicing
      .getInvoicingOneMonthByPayment(this.year, this.monthSelected)
      .subscribe(
        invoicing => (
          (this.invoicinPayment = invoicing), this.getDataByMethodPayment()
        )
      );
  }

  getIncomingQuarterByPayment() {
    this.serviceInvoicing
      .getInvoicingQuarterPayment(
        this.year,
        this.getMonthsOfQuarter(this.quarter)[0],
        this.getMonthsOfQuarter(this.quarter)[1]
      )
      .subscribe(
        invoicing => (
          (this.invoicinPayment = invoicing), this.getDataByMethodPayment()
        )
      );
  }

  getIncomingQuarterByClass() {
    this.serviceInvoicing
      .getInvoicingClassQuarter(
        this.year,
        this.getMonthsOfQuarter(this.quarter)[0],
        this.getMonthsOfQuarter(this.quarter)[1]
      )
      .subscribe(
        invoicing => (
          (this.invoicingClass = invoicing[this.quarter - 1]),
          this.getDataByClass()
        )
      );
  }

  getInvoicingMonthsByClass() {
    this.serviceInvoicing
      .getInvoicingOneMonthByClass(this.year, this.monthSelected)
      .subscribe(
        invoicing => ((this.invoicingClass = invoicing), this.getDataByClass())
      );
  }

  getDataByClass() {
    this.dataClass = [
      {
        name: "Reformer",
        value: this.invoicingClass.R1 + this.invoicingClass.R2
      },
      {
        name: "Mat",
        value: this.invoicingClass.MAT1 + this.invoicingClass.MAT2
      },
      {
        name: "Bonos",
        value: this.invoicingClass.B8 + this.invoicingClass.B16
      },
      {
        name: "Total Barre",
        value: this.invoicingClass.TB1 + this.invoicingClass.TB2
      }
    ];
  }

  getDataByMethodPayment() {
    this.dataPayment = [
      {
        name: "Efectivo",
        value: this.invoicinPayment.sumCash
      },
      {
        name: "Bizum",
        value: this.invoicinPayment.sumBizum
      },
      {
        name: "Tpv",
        value: this.invoicinPayment.sumTpv
      },
      {
        name: "Transferencia",
        value: this.invoicinPayment.sumTransfer
      }
    ];
  }

  getPdf() {
    let dialogRef = this.dialog.open(PdfInvoicesComponent, {
      width: "450px",
      height: "500px",

    });
    dialogRef.afterClosed().subscribe()
  }
}
