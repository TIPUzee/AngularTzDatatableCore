import { Injectable } from '@angular/core';

import { TExtended, ProcessedSearchQuery, SortDirection } from "../data.type";

import {
    BeforeSearchTrigger,
    BeforeSearchTriggerConfig,
    EventType,
    AfterSearchTriggerCallback,
    RowHoverTriggerCallback,
    RowClickTriggerCallback,
    CellClickTriggerCallback,
    RowSelectionChangeTriggerCallback,
    PageChangeTriggerCallback,
    ColumnSortTriggerCallback,
    ColumnsVisibilityTriggerCallback,
    ColumnsVisibilityTriggerConfig,
    SearchColumnTriggerConfig,
    SearchColumnsTriggerCallback,
} from "../event.type";

@Injectable()
export class EventService<T extends object>
{
    private beforeSearchTriggers: Array<BeforeSearchTrigger> = [];
    private afterSearchTriggers: Array<AfterSearchTriggerCallback> = [];
    private rowHoverTriggers: Array<RowHoverTriggerCallback<T>> = [];
    private rowClickTriggers: Array<RowClickTriggerCallback<T>> = [];
    private cellClickTriggers: Array<CellClickTriggerCallback<T>> = [];
    private rowsSelectionChangeTriggers: Array<RowSelectionChangeTriggerCallback<T>> = [];
    private pageChangeTriggers: Array<PageChangeTriggerCallback> = [];
    private columnSortTriggers: Array<ColumnSortTriggerCallback> = [];
    private columnsVisibilityTriggers: Array<ColumnsVisibilityTriggerCallback> = [];
    private searchColumnsTriggers: Array<SearchColumnsTriggerCallback> = [];
    
    
    constructor() { }
    
    
    public addEventListener(eventType: EventType, callback: any): void
    {
        switch (eventType)
        {
            case 'RowClick':
                this.rowClickTriggers.push(callback);
                break;
            case 'BeforeSearch':
                this.beforeSearchTriggers.push(callback);
                break;
            case 'AfterSearch':
                this.afterSearchTriggers.push(callback);
                break;
            case 'RowHover':
                this.rowHoverTriggers.push(callback);
                break;
            case 'CellClick':
                this.cellClickTriggers.push(callback);
                break;
            case 'RowsSelectionChange':
                this.rowsSelectionChangeTriggers.push(callback);
                break;
            case 'PageChange':
                this.pageChangeTriggers.push(callback);
                break;
            case 'ColumnSort':
                this.columnSortTriggers.push(callback);
                break;
            case 'ColumnsVisibility':
                this.columnsVisibilityTriggers.push(callback);
                break
            case 'SearchColumns':
                this.searchColumnsTriggers.push(callback);
                break;
            default:
                console.error('Datatable Event Type not found', eventType);
                break;
        }
    }
    
    
    /** Before Search Events */
    
    
    public removeBeforeSearchTrigger(callback: BeforeSearchTrigger): void
    {
        this.beforeSearchTriggers = this.beforeSearchTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitBeforeSearchTriggers(processedQuery: ProcessedSearchQuery): boolean
    {
        let prevent = false;
        const e: BeforeSearchTriggerConfig = {
            preventDefault: () => prevent = true,
        }
        
        for (const cb of this.beforeSearchTriggers)
        {
            cb(processedQuery, e);
        }
        return !prevent;
    }
    
    
    public clearBeforeSearchTriggers(): void
    {
        this.beforeSearchTriggers = [];
    }
    
    
    /** After Search Events */
    
    
    public removeAfterSearchTrigger(callback: AfterSearchTriggerCallback): void
    {
        this.afterSearchTriggers = this.afterSearchTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitAfterSearchTriggers(): void
    {
        this.afterSearchTriggers.forEach(cb => cb());
    }
    
    
    public clearAfterSearchTriggers(): void
    {
        this.afterSearchTriggers = [];
    }
    
    
    /** Row Click Events */
    
    
    public removeRowClickTrigger(callback: RowClickTriggerCallback<T>): void
    {
        this.rowClickTriggers = this.rowClickTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitRowClickTriggers(row: TExtended<T>): void
    {
        this.rowClickTriggers.forEach(cb => cb(row));
    }
    
    
    public clearRowClickTriggers(): void
    {
        this.rowClickTriggers = [];
    }
    
    
    /** Row Hover Events */
    
    
    public removeRowHoverTrigger(callback: RowHoverTriggerCallback<T>): void
    {
        this.rowHoverTriggers = this.rowHoverTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitRowHoverTriggers(row: TExtended<T>): void
    {
        this.rowHoverTriggers.forEach(cb => cb(row));
    }
    
    
    public clearRowHoverTriggers(): void
    {
        this.rowHoverTriggers = [];
    }
    
    
    /** Cell Click Events */
    
    
    public removeCellClickTrigger(callback: RowClickTriggerCallback<T>): void
    {
        this.cellClickTriggers = this.cellClickTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitCellClickTriggers(row: TExtended<T>, column: string): void
    {
        this.cellClickTriggers.forEach(cb => cb(row, column));
    }
    
    
    public clearCellClickTriggers(): void
    {
        this.cellClickTriggers = [];
    }
    
    
    /** Row Select Events */
    
    
    public removeRowsSelectionChangeTrigger(callback: RowSelectionChangeTriggerCallback<T>): void
    {
        this.rowsSelectionChangeTriggers = this.rowsSelectionChangeTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitRowsSelectionChangeTriggers(rows: Array<TExtended<T>>): void
    {
        this.rowsSelectionChangeTriggers.forEach(cb => cb(rows));
    }
    
    
    public clearRowsSelectionTriggers(): void
    {
        this.rowsSelectionChangeTriggers = [];
    }
    
    
    /** Page Change Events */
    
    
    public removePageChangeTrigger(callback: PageChangeTriggerCallback): void
    {
        this.pageChangeTriggers = this.pageChangeTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitPageChangeTriggers(pageNb: number, prevPageNb: number): void
    {
        this.pageChangeTriggers.forEach(cb => cb(pageNb, prevPageNb));
    }
    
    
    public clearPageChangeTriggers(): void
    {
        this.pageChangeTriggers = [];
    }
    
    
    /** Column Sort Events */
    
    
    public removeColumnSortTrigger(callback: ColumnSortTriggerCallback): void
    {
        this.columnSortTriggers = this.columnSortTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitColumnSortTriggers(column: string, sort: SortDirection): void
    {
        this.columnSortTriggers.forEach(cb => cb(column, sort));
    }
    
    
    public clearColumnSortTriggers(): void
    {
        this.columnSortTriggers = [];
    }
    
    
    /** Column Visibility Events */
    
    
    public removeColumnsVisibilityTrigger(callback: ColumnsVisibilityTriggerCallback): void
    {
        this.columnsVisibilityTriggers = this.columnsVisibilityTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitColumnsVisibilityTriggers(columns: Array<ColumnsVisibilityTriggerConfig>): void
    {
        this.columnsVisibilityTriggers.forEach(cb => cb(columns));
    }
    
    
    public clearColumnsVisibilityTriggers(): void
    {
        this.columnsVisibilityTriggers = [];
    }
    
    
    /** Column Searchable Status Events */
    
    
    public removeSearchColumnsTrigger(callback: SearchColumnsTriggerCallback): void
    {
        this.searchColumnsTriggers = this.searchColumnsTriggers.filter(cb => cb !== callback);
    }
    
    
    public emitSearchColumnsTriggers(columns: Array<SearchColumnTriggerConfig>): void
    {
        this.searchColumnsTriggers.forEach(cb => cb(columns));
    }
    
    
    public clearSearchColumnsTriggers(): void
    {
        this.searchColumnsTriggers = [];
    }
}
