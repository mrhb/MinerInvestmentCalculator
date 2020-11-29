import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomMatPaginatorIntl } from './CustomPaginatorConfiguration';
export interface minerincom {
  name: string;
  hashrate: number;
  consumption: number;
  incom:number;
}

/** Constants used to fill up our data base. */
const MINERS=[
{name:"iBeLink BM-K1"		                          , hashrate:720  ,consumption:1300},
{name:"Innosilicon A10 Pro+ ETHMiner (720Mh)"		  , hashrate:6600 ,consumption:2400},
{name:"iBeLink BM-N1"		                          , hashrate:500	,consumption:750},
{name:"Bitmain Antminer Z15"		                  , hashrate:485	,consumption:850},
{name:"Innosilicon A10 ETHMaster (485Mh)"		      , hashrate:432	,consumption:740},
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
  static capacity=100000; //ضرفیت دیزل ژنراتور
  doller=35000;// قیمت دلار
  bitcoin=17518;//قیمت بیتکوین به دلار
  btc=0.00000784;// پاداش استخراج بیتکوین

  
  generators=GENERATORS;
  miners=MINERS;
  signupForm: FormGroup;
  loading = false;
  submitted = false;
  displayedColumns: string[] = [ 'name','hashrate','incom'];
  dataSource: MatTableDataSource<minerincom>;

  
  @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private formBuilder: FormBuilder){
    const MinerIncoms=Array.from(MINERS, x => new miner(x,this.bitcoin))
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(MinerIncoms);
  }
  
  ngOnInit(): void {
    
    this.signupForm = this.formBuilder.group({
      type: ['', Validators.required],
      dollar: ['', Validators.required],
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



export class miner {
  name: string;
  hashrate: number;
  consumption: number;

  constructor(obj) {
    Object.assign(this, obj);
  }

  get incom(): number {
    return this.hashrate + this.consumption;
  }
  get dailyIncom(): number {
    return this.hashrate *this.consumption*MainComponent.capacity;
  }
  get monthlyIncom(): number {
    return 30*this.hashrate *this.consumption;
  }
}



