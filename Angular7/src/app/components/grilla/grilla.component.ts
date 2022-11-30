import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/todo/services/todo.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoClass } from 'src/app/todo/models/todo-class';
import { Todo } from 'src/app/todo/models/todo';
import { AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-grilla',
  templateUrl: './grilla.component.html',
  styleUrls: ['./grilla.component.css']
})
export class GrillaComponent implements OnInit {
  /* import styles to  ag-grid de grilla  ascii alt 126--2.Ag_grid GECS */
  /* import styles to  ag-grid de grilla  ascii alt 126--2.Ag_grid GECS */
  @ViewChild('agGrid') agGrid!: AgGridAngular;

  columnDefs = [
    { headerName: 'MAKE',field: 'make', sortable: true, filter:true, checkboxSelection: true  },
    { headerName: 'MODEL',field: 'model', editable:true },
    { headerName: 'PRICE',field: 'price'}
  ];

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Toyota', model: 'Corola', price: 55000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];
  //rowData?: Observable<any[]>= null || undefined;   //=  new Observable<any>() ;  Opcional ?

  rowData!: Observable<any[] | null | undefined | any >;
  info:any={} //donde guardaremos los datos y
  cargada=false;
  private gridApi: { startEditingCell: (arg0: { rowIndex: number; colKey: string; }) => void; stopEditing: () => void; getEditingCells: () => any; } | undefined;
  private gridColumnApi: any;
  ///////dataSource = new MatTableDataSource<CotizacionDetalle>();
  array: Todo[] = [];
  todo: Todo[] = [];
  sel: TodoClass = new TodoClass;
  form!: FormGroup;
  public toDay: Date = new Date();
  NoVerFecha: boolean = true;


  public datosForm: FormGroup;
  //////dataSource = new MatTableDataSource<CotizacionDetalle>();
  dataSource: any[] = [];

  constructor(public http: HttpClient,
              private service: TodoService,
              protected formBuilder: FormBuilder,
          ) {


                this.datosForm = this.formBuilder.group({
                  id: [''],
                  idPrefijoDocumento: [1],
                  fechaDocumento: [''],
                  fechaExpiracion: ['', Validators.required],
                  documentoExterno: [''],
                  idProveedor: [1, Validators.required],
                  idTerceroUnidad: [0],
                  idTerceroSucursal: [0],
                  concepto: ['', Validators.required],
                  idFormaPago: [0, Validators.required],
                  idMoneda: [1, Validators.required],
                  idEmpleadoSolicita: [1, Validators.required],
                  plazo: [20, Validators.required],
                  cantidadTotal: [0],
                  valorSubTotal: [0],
                  valorDescuento: [0],
                  valorIva: [0],
                  valorImpoconsumo: [0],
                  valorTotal: [0],
                  texDescuentosFinancieros: [''],
                  texVigenciaCotizacion: [''],
                  texTiempoEntrega: [''],
                  texDisponibilidad: [''],
                  texLugarEntrega: [''],
                  texObservaciones: [''],
                  consecutivo: [null],
                  anno: [null],
                  isDeleted: [false],
                  activo: [true],
                  direccion: [''],
                  contacto: [''],
                  telefono: [''],
                  ciudad: [''],
                  idEmpresa:[800345678],
                  cotizacionesDetalle: ['']
                });
            }


  deleteRowFieldValue(idx:any,fuente:number) {
    if(fuente===1){
    //   this.listDetalleArray.splice(idx, 1);
    //   this.dataSource.data = this.listDetalleArray;
    // //this.idVinculados--;
    //   this.subtotal = 0;
    //   this.descuentos = 0;
    //   this.iva = 0;
    //   this.impoconsumo = 0;
    //   this.total = 0;
    //   if(this.listDetalleArray.length > 0){
    //     this.listDetalleArray.forEach(item => {
    //       item.valorIva = item.tarifaIva*item.valorUnitario*item.cantidadTotal
    //       item.valorIvaPromocion = item.cantidadTotal*item.valorUnitario*item.tarifaIva
    //       item.valorImpoconsumo = item.tarifaImpoconsumo*item.valorUnitario*item.cantidadTotal
    //       item.valorTotal = item.valorUnitario*item.cantidadTotal
    //       this.datosForm.controls.valorSubTotal.setValue(this.subtotal += item.valorTotal);
    //       this.datosForm.controls.valorDescuento.setValue(this.descuentos += item.valorIvaPromocion);
    //       this.datosForm.controls.valorIva.setValue(this.iva += item.valorIva);
    //       this.datosForm.controls.valorImpoconsumo.setValue(this.impoconsumo += item.valorImpoconsumo);
    //       this.datosForm.controls.valorTotal.setValue(this.total = this.subtotal-this.descuentos+this.iva+this.impoconsumo);
    //     });
    //   }else{
    //     this.datosForm.controls.valorSubTotal.setValue(0)
    //     this.datosForm.controls.valorDescuento.setValue(0)
    //     this.datosForm.controls.valorIva.setValue(0)
    //     this.datosForm.controls.valorImpoconsumo.setValue(0)
    //     this.datosForm.controls.valorTotal.setValue(0)
    //   }
    }
  }

  ngOnInit(): void {
    this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/small-row-data.json');
    this.rowData = this.http.get<any[]>('https://www.ag-grid.com/example-assets/row-data.json');
    // this.rowData = this.service.getGrilla('https://www.ag-grid.com/example-assets/small-row-data.json').subscribe(resp => {
    //           console.log("", resp);
    //           this.info = resp;
    //           this.cargada = true;},
    //           err => {
    //             console.log("Error: tratar subscribe Grid");
    //           })
    this.form = this.formBuilder.group({
      title: [this.sel.title,Validators.required],
      descripcion: [this.sel.descripcion, Validators.required],
      createdDate: [this.sel.createdDate, Validators.required],
      done: [this.sel.done ],
      updatedDate: [this.sel.updatedDate, Validators.required],
    });


    this.mostrar();
    // start editing country cell on first row
  }

  AddEdit(){
    // NO hay empleado seleccionado == 0
    if (this.sel.id === 0){
      this.sel.id = this.array.length+1;
      if (!this.sel.done){
        this.sel.done = false
      }

      this.sel.title = this.form.controls['title'].value,
      this.sel.descripcion = this.form.controls['descripcion'].value
      this.sel.done = this.form.controls['done'].value
      this.sel.createdDate = this.toDay;
      this.sel.updatedDate = this.form.controls['updatedDate'].value

      console.log ("sel:  ", this.sel)
      this.array.push(this.sel);
      console.log("PUSH:TODO::", this.todo)
      console.log("PUSH::ARRAY:", this.array)
    }
      // limpiar input
    this.sel = new TodoClass();
  }

  delete(){
    // El método filter te genera un nuevo array,
    // tomado del array principal, con los elementos que cumplan una condición.
    if(confirm("Are you sure you want to delete it?")){
      this.array= this.array.filter(x=>x!=this.sel);
      this.sel = new TodoClass();
    }
  }

  onCellValueChanged(){
    console.log ("onCellValueChanged")
  }





  mostrar(){
    console.log("**mostrar***********", this.rowData)

  }

}



