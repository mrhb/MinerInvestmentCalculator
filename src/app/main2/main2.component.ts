import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


/** Constants used to fill up our data base. */
const MINERS=[
{name:"S9j"     ,hashrate:	14.5	,consumption:1350},
{name:"S9Hydro" ,hashrate:  18	  ,consumption:1728},
{name:"M3"      ,hashrate:	12  	,consumption:2000},
{name:"S9i"     ,hashrate:	13   	,consumption:1280},
{name:"S9"      ,hashrate:	14	  ,consumption:1372},
{name:"M3X"     ,hashrate:	12.5	,consumption:2050},
{name:"S11"     ,hashrate:	20.5	,consumption:1530},
{name:"S15"     ,hashrate:	28	  ,consumption:1596},
{name:"S17"     ,hashrate:	53	  ,consumption:2385},
{name:"S17"     ,hashrate:	56	  ,consumption:2520},
{name:"S17Pro"  ,hashrate:  50  	,consumption:1975},
{name:"S17Pro"  ,hashrate:  53  	,consumption:2094},
{name:"S17+"    ,hashrate: 	73	  ,consumption:2920},
{name:"S17e"    ,hashrate:  64  	,consumption:2880},
{name:"A1"      ,hashrate:	49  	,consumption:5400},
];

const GENERATORS=[
  {name: "100KVA" ,generation:100000,contPower:70 ,slCurrent:2},
  {name: "200KVA" ,generation:200000,contPower:140, slCurrent:600},
];
@Component({
  selector: 'app-main2',
  templateUrl: './main2.component.html',
  styleUrls: ['./main2.component.scss'],
//   providers: [
//    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl}
//  ]
})
export class Main2Component implements OnInit {
  generators=GENERATORS;
  miners=MINERS;
  signupForm: FormGroup;
  // signupForm: FormGroup;
  loading = false;
  submitted = false;
  displayedColumns: string[] = [ 'name','hashrate','count','MonthlyIncom','MonthlyIncom_Toman'];
  dataSource: MatTableDataSource<minerincom>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MinerIncoms:minerincom[];

  constructor(private formBuilder: FormBuilder){
    // Assign the data to the data source for the table to render
  }
  
  generator =new FormControl(this.generators[0]); //ظرفیت دیزل ژنراتور
  dollar   =new FormControl(35750);// قیمت دلار
  bitcoin  =new FormControl(17518);//قیمت بیتکوین به دلار
  btc      =new FormControl(0.00000784);// پاداش استخراج بیتکوین


  // device =new FormControl(this.miners[0]); //نوع ماینر
  device =new FormControl(""); //نوع ماینر

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      generator:this.generator,
      dollar:this.dollar,
      bitcoin:this.bitcoin,
      btc:this.btc,
      device:this.device
    });
    this.calcute();
    // this.paginator._intl.itemsPerPageLabel="Test String";
  //  this.paginator._intl=new CustomMatPaginatorIntl;
  }
  onSubmit()
  {
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    this.calcute();
    
  }
  onReset()
  {
    this.generator =new FormControl(this.generators[0]); //ظرفیت دیزل ژنراتور
    this.dollar   =new FormControl(35750);// قیمت دلار
    this.bitcoin  =new FormControl(17518);//قیمت بیتکوین به دلار
    this.btc      =new FormControl(0.00000784);// پاداش استخراج بیتکوین

      this.calcute();
    
  }
  calcute()
  {
    miner.dollar=this.dollar.value;
    miner.capacity=this.generator.value;
    miner.doller=this.dollar.value;
    miner.bitcoin=this.bitcoin.value;
    miner.btc=this.btc.value;
    this.MinerIncoms=Array.from(MINERS, x => new miner(x));
    this.dataSource = new MatTableDataSource(this.MinerIncoms);
    this.ngAfterViewInit()
  }
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
export interface minerincom {
  name: string;
  hashrate: number;
  consumption: number;
  count:number;
  MonthlyIncom:number;
  MonthlyIncom_Toman:number;
}
  
  
  export class miner {
    static dollar;
    static capacity;
    static doller;
    static bitcoin;
    static btc;

    name: string;
    hashrate: number;
  consumption: number;
  
  constructor(obj) {
    Object.assign(this, obj);
  }

  get UnitDailyIncom(): number {
    return this.hashrate * miner.btc * miner.bitcoin;
  }
  get UnitMonthlyIncom(): number {
    return 30*this.UnitDailyIncom;
  }

  get count(): number {
    var cnt= Math.floor(miner.capacity/this.consumption) 
    return cnt ;
  }
  get MonthlyIncom(): number {
    return this.UnitMonthlyIncom*this.count;
  }
  get MonthlyIncom_Toman(): number {
    return this.MonthlyIncom* miner.dollar/1000;
  }
}



