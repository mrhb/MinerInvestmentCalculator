import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomMatPaginatorIntl } from './CustomPaginatorConfiguration';
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const MINERS=[
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350},
  {name: "SJ9" , hashrate:14.5, consumption:1350}
];
const GENERATORS=[
  {name: "100KVA" ,generation:1350},
  {name: "200KVA" ,generation:1350},
];
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [
   {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
 ]
})
export class MainComponent implements OnInit {
  
  generators=GENERATORS;
  miners=MINERS;
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<UserData>;

  
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private formBuilder: FormBuilder
  ) {

    
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  
  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      address: [''],
      firstname: [''],
      lastname: [''],
    });
    
    // this.paginator._intl.itemsPerPageLabel="Test String";
    this.paginator._intl=new CustomMatPaginatorIntl;
  }
  onSubmit()
  {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}


