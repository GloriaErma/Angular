// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-grilla-upd',
//
// })
// export class GrillaUpdComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {AgGridAngular} from 'ag-grid-angular';
import {AllCommunityModules} from "@ag-grid-community/all-modules"
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
//import { RangeSelectionModule } from "@ag-grid-enterprise/range-selection";
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { Module } from 'ag-grid-community';



function actionCellRenderer(params: { api: { getEditingCells: () => any; }; node: { rowIndex: any; }; }) {
  let eGui = document.createElement("div");

  let editingCells = params.api.getEditingCells();
  // checks if the rowIndex matches in at least one of the editing cells
  let isCurrentRowEditing = editingCells.some((cell: { rowIndex: any; }) => {
    return cell.rowIndex === params.node.rowIndex;
  });

  if (isCurrentRowEditing) {
    eGui.innerHTML = `
<button  class="action-button update"  data-action="update"> update  </button>
<button  class="action-button cancel"  data-action="cancel" > cancel </button>
`;
  } else {
    eGui.innerHTML = `
<button class="action-button edit"  data-action="edit" > edit  </button>
<button class="action-button delete" data-action="delete" > delete </button>
`;
  }

  return eGui;
}

@Component({
  selector: 'app-grilla-upd',
  templateUrl: './grilla-upd.component.html',
  // template: `<ag-grid-angular
  //   #agGrid
  //   style="width: 100%; height: 600px;"
  //   id="myGrid"
  //   class="ag-theme-alpine"
  //   [modules]="modules"
  //   [columnDefs]="columnDefs"
  //   [defaultColDef]="defaultColDef"
  //   [enableRangeSelection]="true"
  //   [rowData]="rowData"
  //   (gridReady)="onGridReady($event)"
  //   (rowEditingStopped)="onRowEditingStopped($event)"
  //   (rowEditingStarted)="onRowEditingStarted($event)"
  //   (cellClicked)="onCellClicked($event)"
  //   editType="fullRow"
  //   [suppressClickEdit]="true"
  // ></ag-grid-angular>`

})
export class GrillaUpdComponent implements OnInit {

  @ViewChild('agGrid') agGrid!: AgGridAngular;

  private gridApi: any;
  private gridColumnApi: any;

  //public modules: Module[] = [ClientSideRowModelModule, RangeSelectionModule];

  public modules: Module[] = [];
  columnDefs: any;
  defaultColDef:any;
  rowData: [] | null | any;
  title = "probaremos ag-grid";

  constructor(private http: HttpClient) {
    this.columnDefs = [
      { field: "athlete", minWidth: 150 },
      { field: "age", maxWidth: 90 },
      {
        headerName: "action",
        minWidth: 150,
        cellRenderer: actionCellRenderer,
        editable: false,
        colId: "action"
      }
    ];
    this.defaultColDef = {
      editable: true
    };
    this.rowData = null;
  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  onGridReady(params: { api: any; columnApi: any; }) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http.get("https://www.ag-grid.com/example-assets/olympic-winners.json").subscribe((data) => {
      this.rowData = data;
    });
  }

  onCellClicked(params: {
      column: { colId: string; }; event: { target: { dataset: { action: any; }; }; }; api: {
        startEditingCell: (arg0: {
          rowIndex: any;
          // gets the first columnKey
          colKey:
          //   constructor() { }
          //   ngOnInit(): void {
          //   }
          // }
          any;
        }) => void; applyTransaction: (arg0: {
          remove: any[] // }
          ;
        }) => void; stopEditing: (arg0: boolean) => void;
      }; node: { rowIndex: any; data: any; }; columnApi: { getDisplayedCenterColumns: () => { colId: any; }[]; };
    } ) {
    // Handle click event for action cells
    console.log("on cell")
    if (params.column.colId === "action" && params.event.target.dataset.action) {
      let action = params.event.target.dataset.action;

      if (action === "edit") {
        params.api.startEditingCell({
          rowIndex: params.node.rowIndex,
          // gets the first columnKey
          colKey: params.columnApi.getDisplayedCenterColumns()[0].colId
        });
      }

      if (action === "delete") {
        params.api.applyTransaction({
          remove: [params.node.data]
        });
      }

      if (action === "update") {
        params.api.stopEditing(false);
      }

      if (action === "cancel") {
        params.api.stopEditing(true);
      }
    }
  }

  onRowEditingStarted(params: { api: { refreshCells: (arg0: { columns: string[]; rowNodes: any[]; force: boolean; }) => void; }; node: any; }) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
  onRowEditingStopped(params: { api: { refreshCells: (arg0: { columns: string[]; rowNodes: any[]; force: boolean; }) => void; }; node: any; }) {
    params.api.refreshCells({
      columns: ["action"],
      rowNodes: [params.node],
      force: true
    });
  }
}
