import { Component } from '@angular/core';
import { GetusersService } from '../../service/getusers.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-issuebook-report',
  imports: [CommonModule],
  templateUrl: './issuebook-report.component.html',
  styleUrl: './issuebook-report.component.css'
})
export class IssuebookReportComponent {
reports: any[] = [];


   constructor(private getUserService: GetusersService) {
      
    }
  

 ngOnInit(): void {
    this.getUserService.issuebookreport().subscribe(
      (data) => {
        this.reports = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );

  }

    loadUser(){
    this.getUserService.issuebookreport().subscribe((data: any[])=>{
     this.reports = data;
  });
  }

  downloadPDF() {
      const doc = new jsPDF();
  
      doc.text('Pending Book Returns', 14, 15);
      
      const head = [['Sr. No.','User ID', 'FirstName', 'LastName','TotalBooks Issued']];
      const data = this.reports.map((report, index) => [
         index + 1,
        report.userId,
        report.firstName,
        report.lastName,
        report.totalBooksIssued
      ]);
  
      autoTable(doc, {
        head: head,
        body: data,
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [0, 0, 0] }
      });
  
      doc.save('report.pdf');
    }

}
