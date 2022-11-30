// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-grilla-edit',
//   templateUrl: './grilla-edit.component.html',
//   styleUrls: ['./grilla-edit.component.css']
// })
// export class GrillaEditComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit } from '@angular/core';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-grilla-edit',
  templateUrl: './grilla-edit.component.html',
  // template: `<div class="example-wrapper">
  //   <div
  //     style="margin-bottom: 5px; display: flex; justify-content: space-between;"
  //   >
  //     <div>
  //       <button (click)="onBtStartEditing()">edit (0)</button>
  //       <button (click)="onBtStartEditing(46)">edit (0, Delete)</button>
  //       <button (click)="onBtStartEditing(null, 'T')">edit (0, 'T')</button>
  //       <button (click)="onBtStartEditing(null, null, 'top')">
  //         edit (0, Top)
  //       </button>
  //       <button (click)="onBtStartEditing(null, null, 'bottom')">
  //         edit (0, Bottom)
  //       </button>
  //     </div>
  //     <div>
  //       <button (click)="onBtStopEditing()">stop ()</button>
  //       <button (click)="onBtNextCell()">next ()</button>
  //       <button (click)="onBtPreviousCell()">previous ()</button>
  //     </div>
  //     <div>
  //       <button (click)="onBtWhich()">which ()</button>
  //     </div>
  //   </div>
  //   <div class="grid-wrapper">
  //     <ag-grid-angular
  //       #agGrid
  //       style="width: 100%; height: 100%;"
  //       id="myGrid"
  //       class="ag-theme-alpine"
  //       [rowData]="rowData"
  //       [columnDefs]="columnDefs"
  //       [defaultColDef]="defaultColDef"
  //       [pinnedTopRowData]="pinnedTopRowData"
  //       [pinnedBottomRowData]="pinnedBottomRowData"
  //       (gridReady)="onGridReady($event)"
  //     ></ag-grid-angular>
  //   </div>
  // </div>`,
})
export class GrillaEditComponent implements OnInit {
  private gridApi: any;
  private gridColumnApi: any;

  rowData: any;
  columnDefs: any;
  defaultColDef: any;
  pinnedTopRowData: any;
  pinnedBottomRowData: any;

  constructor() {
    this.rowData = [
      {
        firstName: 'Bob',
        lastName: 'Harrison',
        gender: 'Male',
        address:
          '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Mary',
        lastName: 'Wilson',
        gender: 'Female',
        age: 11,
        address:
          '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
        mood: 'Sad',
        country: 'Ireland',
      },
      {
        firstName: 'Sadiq',
        lastName: 'Khan',
        gender: 'Male',
        age: 12,
        address:
          '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Jerry',
        lastName: 'Mane',
        gender: 'Male',
        age: 12,
        address:
          '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Bob',
        lastName: 'Harrison',
        gender: 'Male',
        address:
          '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Mary',
        lastName: 'Wilson',
        gender: 'Female',
        age: 11,
        address:
          '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
        mood: 'Sad',
        country: 'Ireland',
      },
      {
        firstName: 'Sadiq',
        lastName: 'Khan',
        gender: 'Male',
        age: 12,
        address:
          '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Jerry',
        lastName: 'Mane',
        gender: 'Male',
        age: 12,
        address:
          '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Bob',
        lastName: 'Harrison',
        gender: 'Male',
        address:
          '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Mary',
        lastName: 'Wilson',
        gender: 'Female',
        age: 11,
        address:
          '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
        mood: 'Sad',
        country: 'Ireland',
      },
      {
        firstName: 'Sadiq',
        lastName: 'Khan',
        gender: 'Male',
        age: 12,
        address:
          '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Jerry',
        lastName: 'Mane',
        gender: 'Male',
        age: 12,
        address:
          '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Bob',
        lastName: 'Harrison',
        gender: 'Male',
        address:
          '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Mary',
        lastName: 'Wilson',
        gender: 'Female',
        age: 11,
        address:
          '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
        mood: 'Sad',
        country: 'Ireland',
      },
      {
        firstName: 'Sadiq',
        lastName: 'Khan',
        gender: 'Male',
        age: 12,
        address:
          '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Jerry',
        lastName: 'Mane',
        gender: 'Male',
        age: 12,
        address:
          '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Bob',
        lastName: 'Harrison',
        gender: 'Male',
        address:
          '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Mary',
        lastName: 'Wilson',
        gender: 'Female',
        age: 11,
        address:
          '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
        mood: 'Sad',
        country: 'Ireland',
      },
      {
        firstName: 'Sadiq',
        lastName: 'Khan',
        gender: 'Male',
        age: 12,
        address:
          '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Jerry',
        lastName: 'Mane',
        gender: 'Male',
        age: 12,
        address:
          '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Bob',
        lastName: 'Harrison',
        gender: 'Male',
        address:
          '1197 Thunder Wagon Common, Cataract, RI, 02987-1016, US, (401) 747-0763',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Mary',
        lastName: 'Wilson',
        gender: 'Female',
        age: 11,
        address:
          '3685 Rocky Glade, Showtucket, NU, X1E-9I0, CA, (867) 371-4215',
        mood: 'Sad',
        country: 'Ireland',
      },
      {
        firstName: 'Sadiq',
        lastName: 'Khan',
        gender: 'Male',
        age: 12,
        address:
          '3235 High Forest, Glen Campbell, MS, 39035-6845, US, (601) 638-8186',
        mood: 'Happy',
        country: 'Ireland',
      },
      {
        firstName: 'Jerry',
        lastName: 'Mane',
        gender: 'Male',
        age: 12,
        address:
          '2234 Sleepy Pony Mall , Drain, DC, 20078-4243, US, (202) 948-3634',
        mood: 'Happy',
        country: 'Ireland',
      },
    ];
    this.columnDefs = [
      { field: 'firstName' },
      { field: 'lastName' },
      { field: 'gender' },
      { field: 'age' },
      { field: 'mood' },
      { field: 'country' },
      {
        field: 'address',
        minWidth: 550,
      },
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 110,
      editable: true,
      resizable: true,
    };
    this.pinnedTopRowData = getPinnedTopData();
    this.pinnedBottomRowData = getPinnedBottomData();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onBtStopEditing() {
    this.gridApi.stopEditing();
  }

  onBtStartEditing(key: any, char: any, pinned: any) {
    this.gridApi.setFocusedCell(0, 'lastName', pinned);
    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: 'lastName',
      rowPinned: pinned,
      keyPress: key,
      charPress: char,
    });
  }

  onBtNextCell() {
    this.gridApi.tabToNextCell();
  }

  onBtPreviousCell() {
    this.gridApi.tabToPreviousCell();
  }

  onBtWhich() {
    var cellDefs = this.gridApi.getEditingCells();
    if (cellDefs.length > 0) {
      var cellDef = cellDefs[0];
      console.log(
        'editing cell is: row = ' +
          cellDef.rowIndex +
          ', col = ' +
          cellDef.column.getId() +
          ', floating = ' +
          cellDef.rowPinned
      );
    } else {
      console.log('no cells are editing');
    }
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}

function getPinnedTopData() {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##',
    },
  ];
}
function getPinnedBottomData() {
  return [
    {
      firstName: '##',
      lastName: '##',
      gender: '##',
      address: '##',
      mood: '##',
      country: '##',
    },
  ];
}
function getCharCodeFromEvent(event: any) {
  event = event || window.event;
  return typeof event.which === 'undefined' ? event.keyCode : event.which;
}
function isCharNumeric(charStr: string) {
  return !!/\d/.test(charStr);
}
function isKeyPressedNumeric(event: any) {
  var charCode = getCharCodeFromEvent(event);
  var charStr = String.fromCharCode(charCode);
  return isCharNumeric(charStr);
}
