import { Component } from '@angular/core';
import {
    TzDatatable
} from "../../../projects/angular-tz-datatable-core/src/lib/tz-datatable/tz-datatable.service";
import { User, columnsConfig, data } from "../test-data/data";
import { FormsModule } from "@angular/forms";
import { NgIf, NgStyle } from "@angular/common";

@Component({
    selector: 'app-datatable-test',
    standalone: true,
    imports: [
        FormsModule,
        NgStyle,
        NgIf,
    ],
    templateUrl: './datatable-test.component.html',
    styleUrl: './datatable-test.component.scss'
})
export class DatatableTestComponent
{
    protected readonly dt: TzDatatable<User> = new TzDatatable();
    
    searchValue: string = '';
    
    
    constructor()
    {
        this.test();
        this.setEvents();
    }
    
    
    private test()
    {
        this.dt.initColsConfig(columnsConfig);
        this.dt.setData(data);
        this.dt.setTotalRows(62)
    }
    
    
    public setEvents()
    {
        this.dt.addEventListener('BeforeSearch', (p, e) =>
        {
            console.log('BeforeSearchTrigger', p, e);
        })
        
        this.dt.addEventListener('AfterSearch', () =>
        {
            console.log('AfterSearchTrigger');
        })
        
        this.dt.addEventListener('RowHover', (row) =>
        {
            console.log('RowHover', row);
        })
        
        this.dt.addEventListener('RowClick', (row) =>
        {
            console.log('RowClick', row);
        })
        
        this.dt.addEventListener('CellClick', (row, column) =>
        {
            console.log('CellClick', row, column);
        })
        
        this.dt.addEventListener('RowsSelectionChange', (rows) =>
        {
            console.log('RowSelect', rows);
        })
        
        this.dt.addEventListener('PageChange', (pageNb, prevPageNb) =>
        {
            console.log('PageChange', pageNb, prevPageNb);
        })
        
        this.dt.addEventListener('ColumnSort', (column, sort) =>
        {
            console.log('ColumnSort', column, sort);
        })
        
        this.dt.addEventListener('ColumnsVisibility', (columns) =>
        {
            console.log('ColumnVisibility', columns);
        })
        
        this.dt.addEventListener('SearchColumns', (columns) =>
        {
            console.log('SearchColumn', columns);
        })
        
    }
}
