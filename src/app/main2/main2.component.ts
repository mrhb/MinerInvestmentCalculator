import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { CurrenciesService, CURRENCY } from 'src/_services/currencies.service';
import { IconService } from 'src/_services/icon.service';


/** Constants used to fill up our data base. */
const MINERS=[
{name:"S9j",hashrate:14.5	,consumption:1350},
{name:"S9i",hashrate:13	  ,consumption:1280},
{name:"S9i(14)",hashrate:14	  ,consumption:1320},
{name:"S9",hashrate:12.5	,consumption:1225},
{name:"S9Hydro",hashrate:18  	,consumption:1728},
{name:"M3",hashrate:12	,consumption:2000},
{name:"M3v2",hashrate:12	,consumption:2000},
{name:"M3X ",hashrate:12.5	,consumption:2050},
{name:"S11 ",hashrate:20.5	,consumption:1530},
{name:"S15 ",hashrate:28	,consumption:1596},
{name:"S17 ",hashrate:56	,consumption:2520},
{name:"S17Pro",hashrate:53	,consumption:2094},
{name:"S17",hashrate:73	,consumption:2920},
{name:"S17e",hashrate:64	,consumption:2880},
{name:"A1",hashrate:49	,consumption:5400},
{name:"Avalon 1047",hashrate:37	,consumption:2380},
{name:"Avalon 1066",hashrate:50	,consumption:3250},
{name:"Avalan 821",hashrate:11.5	,consumption:1200},
{name:"Avalan 841",hashrate:13.6	,consumption:1290},
{name:"Avalan 921",hashrate:20	,consumption:1700},
{name:"T17",hashrate:40	,consumption:2200},
{name:"T17+",hashrate:64	,consumption:3200},
{name:"T17e",hashrate:53	,consumption:2915},
{name:"T9",hashrate:12.5	,consumption:1576},
{name:"T9+",hashrate:10.5	,consumption:1432},
{name:"M20",hashrate:68	,consumption:3312},
{name:"S19",hashrate:110	,consumption:3250},
{name:"M20s",hashrate:68	,consumption:3360},
{name:"M32",hashrate:62	,consumption:3348},
{name:"M21s",hashrate:56	,consumption:3360},
{name:"T3+",hashrate:52	,consumption:2100},
{name:"T2T",hashrate:30	,consumption:2200},
{name:"S15",hashrate:28	,consumption:1596},
{name:"A1",hashrate:49	,consumption:5400},
];

const GENERATORS=[
  {name: "250KVA" ,generation:200,contPower:140, slCurrent:600},
  {name: "50KVA" ,generation:50,contPower:30 ,slCurrent:128},
  {name: "70KVA" ,generation:70,contPower:40 ,slCurrent:170},
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
  currencyForm:FormGroup;
  // signupForm: FormGroup;
  loading = false;
  submitted = false;
  displayedColumns: string[] = [ 'name','hashrate','count','MonthlyIncom','MonthlyIncom_Toman'];
  dataSource: MatTableDataSource<minerincom>;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  MinerIncoms:minerincom[];

  constructor(
    private formBuilder: FormBuilder,
    private Currencies: CurrenciesService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private iconService: IconService
    ){
      this.iconService.registerIcons();
      // this.matIconRegistry.addSvgIcon(
      //   'btc',
      //   this.domSanitizer.bypassSecurityTrustResourceUrl('assets/cryptocurrency-icons/svg/color/btc.svg')
      // );
      }
  
  generator =new FormControl(this.generators[0]); //ظرفیت دیزل ژنراتور
  dollar   =new FormControl(26000);// قیمت دلار
  bitcoin  =new FormControl(17518);//قیمت بیتکوین به دلار
  btc      =new FormControl(0.00000784);// پاداش استخراج بیتکوین
  device =new FormControl(this.miners[0]); //نوع ماینر

  ngOnInit(): void {

    this.onReset();
    this.signupForm = this.formBuilder.group({
      generator:this.generator,
      device:this.device
    });

    this.currencyForm=this.formBuilder.group({
      dollar:this.dollar,
      bitcoin:this.bitcoin,
      btc:this.btc,
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

    this.Currencies.getInfo("BTC").subscribe(
      data => {
      console.log(data);
      var reward=data[0].reward_block;
        var hashrate=data[0].network_hashrate;
        var coeff=144000000000000*100000000;
      var temp=Math.floor(coeff*reward/hashrate)/100000000;
      this.btc.setValue(temp);//      =new FormControl(temp);// پاداش استخراج بیتکوین
      
      this.bitcoin.setValue(Math.floor(data[0].price*100)/100);//قیمت بیتکوین به دلار
    });


    this.Currencies.getDoller().subscribe(
      data => {
      console.log(data);
      //var temp=data.list[0].price;;
      var x=data[29].price;
      var temp=parseFloat(x.replace(",","."))*100;
      this.dollar=new FormControl(Math.floor(temp));// پاداش استخراج بیتکوین

    });

    this.generator.setValue(this.generators[0]); //ظرفیت دیزل ژنراتور

   
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



