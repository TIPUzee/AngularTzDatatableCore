import { Injectable } from '@angular/core';
import { NormalViewPagination } from "../normal-view-pagination/normal-view-pagination.service";
import { SearchViewPagination } from "../search-view-pagination/search-view-pagination.service";
import { TzSelect } from "../select/select.service";
import { EventService } from "../event/event.service";
import { PaginatedDataSorter } from "../paginated-data-sorter/paginated-data-sorter.service";

import {
    ColumnsConfig, ColumnsConfigExtended,
    ViewMode, TExtended, TExtendedAsAny, StrictColumnsConfig,
} from "../data.type";

import {
    BeforeSearchTrigger,
    AfterSearchTriggerCallback,
    RowHoverTriggerCallback,
    RowClickTriggerCallback,
    CellClickTriggerCallback,
    RowSelectionChangeTriggerCallback,
    PageChangeTriggerCallback,
    ColumnSortTriggerCallback, ColumnsVisibilityTriggerCallback, SearchColumnsTriggerCallback
} from "../event.type";

@Injectable({
    providedIn: 'any'
})
export class TzDatatable<T extends object>
{
    private viewType: ViewMode = 'NORMAL';
    private cols: StrictColumnsConfig = {};
    private defaultVisibleCols: Array<string> = [];
    private data: Array<TExtended<T>> = [];
    
    private totalRows: number = 0;
    
    private nvPagination: NormalViewPagination<T>;
    private svPagination: SearchViewPagination<T>;
    private selection: TzSelect<T>;
    private sorter: PaginatedDataSorter<T>;
    private event: EventService<T>;
    
    private rowsPerPage: number = 5;
    
    
    constructor()
    {
        this.nvPagination = new NormalViewPagination(
            this.getRowsPerPage.bind(this),
            this.getDataView.bind(this)
        );
        this.svPagination = new SearchViewPagination(
            this.getRowsPerPage.bind(this),
            this.getDataView.bind(this),
            this.getColsConfigView.bind(this)
        );
        this.sorter = new PaginatedDataSorter(
            this.getDataView.bind(this),
            this.setDataInternal.bind(this),
            this.getColsConfigView.bind(this)
        );
        this.selection = new TzSelect(
            this.getDataView.bind(this),
            this.getPageDataView.bind(this)
        );
        this.event = new EventService();
    }
    
    
    /** Columns Configuration */
    
    
    public initColsConfig(cols: ColumnsConfig): void
    {
        this.cols = this.buildStrictColumnsConfig(cols);
        this.resetSearchCols();
        this.initDefaultVisibleCols();
    }
    
    
    public buildStrictColumnsConfig(cols: ColumnsConfig): StrictColumnsConfig
    {
        const strictColsConfig: StrictColumnsConfig = {};
        
        Object.keys(cols).forEach((key) =>
        {
            const column = cols[key];
            
            strictColsConfig[key] = {
                ...column,
                key: key,
                title: column.title,
                isVisible: column.isVisible ?? true,
                isSearchable: column.isSearchable ?? true,
                isSortable: column.isSortable ?? false,
                render: column.render ||
                    (
                        () => document.createElement('div')
                    ),
                defaultContent: column.defaultContent ?? '',
                isSearchableDefault: column.isSearchable ?? true,
            };
        });
        
        return strictColsConfig;
    }
    
    
    public getColsConfigView(): StrictColumnsConfig
    {
        return this.cols;
    }
    
    
    public getColsConfigAsArray(): Array<ColumnsConfigExtended>
    {
        return Object.keys(this.cols).map(key => (
            { ...this.cols[key], key }
        ));
    }
    
    
    public getColsNames(): Array<string>
    {
        return Object.keys(this.cols);
    }
    
    
    /** Columns Visibility */
    
    
    private initDefaultVisibleCols(): void
    {
        this.defaultVisibleCols = Object.keys(this.cols).filter(key => this.cols[key].isVisible);
        this.svPagination.search();
    }
    
    
    public resetColsVisibility(): void
    {
        Object.keys(this.cols).forEach(key => this.cols[key].isVisible = this.defaultVisibleCols.includes(key));
        this.viewType === 'SEARCH' ? this.svPagination.search() : null;
    }
    
    
    public toggleColVisibility(colKey: string): void
    {
        this.cols[colKey].isVisible = !this.cols[colKey].isVisible;
        this.viewType === 'SEARCH' ? this.svPagination.search() : null;
        this.event.emitColumnsVisibilityTriggers(
            [{ column: colKey, isVisible: this.cols[colKey].isVisible }]
        );
    }
    
    
    /** Data */
    
    
    public setData(data: Array<T>): void
    {
        this.data = this.extendData(data);
        this.totalRows = data.length;
        this.sorter.setSortingKey(this.getColsConfigAsArray()[0].key);
    }
    
    
    private setDataInternal(data: Array<TExtended<T>>): void
    {
        this.data = data;
    }
    
    
    public getDataView(): Array<TExtended<T>>
    {
        return this.data;
    }
    
    
    private extendData(data: Array<T>): Array<TExtended<T>>
    {
        return data.map((row, index) => (
            { ...row, _dataUuid_: index, _selected_: false }
        ));
    }
    
    
    /** View Mode */
    
    
    public getViewMode(): ViewMode
    {
        return this.viewType;
    }
    
    
    /** Rows Per Page */
    
    
    public setRowsPerPage(rowsPerPage: number): void
    {
        this.rowsPerPage = rowsPerPage;
    }
    
    
    public getRowsPerPage(): number
    {
        return this.rowsPerPage;
    }
    
    
    /** Search Cols */
    
    
    public setSearchCols(columns: Array<string>): void
    {
        this.svPagination.setSearchCols(columns);
    }
    
    
    public getSearchCols(): Array<string>
    {
        return this.svPagination.getSearchCols();
    }
    
    
    public toggleSearchCol(colKey: string): void
    {
        const prevState = this.cols[colKey].isSearchable;
        this.svPagination.toggleSearchCol(colKey);
        if (prevState === this.cols[colKey].isSearchable) return;
        this.event.emitSearchColumnsTriggers(
            [{ column: colKey, isSearchable: this.cols[colKey].isSearchable }]
        );
    }
    
    
    public resetSearchCols(): void
    {
        const modifiedCols = this.svPagination.resetSearchCols();
        if (!modifiedCols.length) return;
        this.event.emitSearchColumnsTriggers(modifiedCols.map(key => (
            { column: key, isSearchable: this.cols[key].isSearchable }
        )));
    }
    
    
    public clearSearchCols(): void
    {
        this.svPagination.clearSearchCols();
    }
    
    
    /** Rows */
    
    
    public setTotalRows(totalRows: number): void
    {
        this.viewType === 'NORMAL' ?
        this.nvPagination.setTotalRows(totalRows) :
        this.svPagination.setTotalRows(totalRows);
    }
    
    
    public getTotalRows(): number
    {
        return this.viewType === 'NORMAL' ? this.nvPagination.getTotalRows() : this.svPagination.getTotalRows();
    }
    
    
    /** Page Data */
    
    
    public getPageDataView(): Array<TExtended<T>>
    {
        return this.viewType === 'NORMAL' ?
               this.nvPagination.getPageDataView() :
               this.svPagination.getPageDataView();
    }
    
    
    public getPageDataViewAsAny(): Array<TExtendedAsAny>
    {
        return this.getPageDataView();
    }
    
    
    /** Sorting keys */
    
    
    public setSortingKey(key: string): void
    {
        this.sorter.setSortingKey(key);
        if (this.viewType === 'SEARCH') this.svPagination.search();
        this.event.emitColumnSortTriggers(key, this.sorter.getSortingOrder());
    }
    
    
    public getSortingKey(): string
    {
        return this.sorter.getSortingKey();
    }
    
    
    /** Pages */
    
    
    public getTotalPages(): number
    {
        if (this.viewType === 'NORMAL')
        {
            return this.nvPagination.getTotalPages();
        } else
        {
            return this.svPagination.getTotalPages();
        }
    }
    
    
    public getPageNb(): number
    {
        return (
            this.viewType === 'NORMAL' ? this.nvPagination.getPageNb() : this.svPagination.getPageNb()
        ) + 1;
    }
    
    
    public getPageSize(): number
    {
        if (this.viewType === 'NORMAL')
        {
            return this.nvPagination.getPageSize();
        } else
        {
            return this.svPagination.getPageSize();
        }
    }
    
    
    public gotoPage(pageNb: number): void
    {
        const prevPageNb = this.getPageNb();
        this.viewType === 'NORMAL' ? this.nvPagination.setPageNb(pageNb - 1) : this.svPagination.setPageNb(pageNb - 1);
        prevPageNb !== this.getPageNb() ? this.event.emitPageChangeTriggers(this.getPageNb(), prevPageNb) : null;
    }
    
    
    /** Selected Rows Count */
    
    
    public getSelectedRowCountOnPage(): number
    {
        return this.getPageDataView().filter(row => row._selected_).length;
    }
    
    
    public getUnselectedRowCountOnPage(): number
    {
        return this.getPageDataView().filter(row => !row._selected_).length;
    }
    
    
    public getSelectedRowCountInTotal(): number
    {
        return this.data.filter(row => row._selected_).length;
    }
    
    
    public getUnselectedRowCountInTotal(): number
    {
        return this.data.filter(row => !row._selected_).length;
    }
    
    
    public getSelectedRowCountBeyondPage(): number
    {
        return this.getSelectedRowCountInTotal() - this.getSelectedRowCountOnPage();
    }
    
    
    public getUnselectedRowCountBeyondPage(): number
    {
        return this.getUnselectedRowCountInTotal() - this.getUnselectedRowCountOnPage();
    }
    
    
    /** Rows Selection */
    
    
    public toggleRowSelection(dataIndex: number): void
    {
        this.selection.toggleRowSelection(dataIndex);
        const row = this.getPageDataView().find(row => row._dataUuid_ === dataIndex);
        if (!row) return;
        this.event.emitRowsSelectionChangeTriggers([row]);
    }
    
    
    public selectAllRowsInPage(): void
    {
        const modifiedRows = this.selection.selectAllInPage();
        this.event.emitRowsSelectionChangeTriggers(modifiedRows);
    }
    
    
    public unselectAllRowsInPage(): void
    {
        const modifiedRows = this.selection.unselectAllInPage();
        this.event.emitRowsSelectionChangeTriggers(modifiedRows);
    }
    
    
    public toggleAllRowsSelectionInPage(): void
    {
        const modifiedRows = this.selection.toggleAllInPage();
        this.event.emitRowsSelectionChangeTriggers(modifiedRows);
    }
    
    
    /** Search */
    
    
    public search(query: string): void
    {
        if (!query.trim().toLowerCase())
        {
            this.viewType = 'NORMAL';
            return;
        }
        
        const processedQuery = this.svPagination.processSearchQuery(query);
        this.svPagination.setSearchQuery(query);
        if (this.event.emitBeforeSearchTriggers(processedQuery))
        {
            this.viewType = 'SEARCH';
            this.svPagination.search();
            this.event.emitAfterSearchTriggers();
        }
    }
    
    
    public getSearchQuery(): string
    {
        return this.svPagination.getSearchQuery();
    }
    
    
    public getSearchChunks(): Array<string>
    {
        return this.svPagination.getSearchChunks();
    }
    
    
    /** Events */
    
    
    addEventListener(type: 'BeforeSearch', callback: BeforeSearchTrigger): void;
    addEventListener(type: 'AfterSearch', callback: AfterSearchTriggerCallback): void;
    addEventListener(type: 'RowHover', callback: RowHoverTriggerCallback<T>): void;
    addEventListener(type: 'RowClick', callback: RowClickTriggerCallback<T>): void;
    addEventListener(type: 'CellClick', callback: CellClickTriggerCallback<T>): void;
    addEventListener(type: 'RowsSelectionChange', callback: RowSelectionChangeTriggerCallback<T>): void;
    addEventListener(type: 'PageChange', callback: PageChangeTriggerCallback): void;
    addEventListener(type: 'ColumnSort', callback: ColumnSortTriggerCallback): void;
    addEventListener(type: 'ColumnsVisibility', callback: ColumnsVisibilityTriggerCallback): void;
    addEventListener(type: 'SearchColumns', callback: SearchColumnsTriggerCallback): void;
    
    public addEventListener(
        type: 'BeforeSearch' | 'AfterSearch' | 'RowHover' | 'RowClick' | 'CellClick' | 'RowsSelectionChange' |
            'PageChange' | 'ColumnSort' | 'ColumnsVisibility' | 'SearchColumns',
        callback: Function
    ): void
    {
        this.event.addEventListener(type, callback);
    }
    
    
    public emitRowHoverTrigger(dataIndex: number): void
    {
        const row = this.getPageDataView().find(row => row._dataUuid_ === dataIndex);
        if (!row) return;
        this.event.emitRowHoverTriggers(row);
    }
    
    
    public emitRowClickTrigger(dataIndex: number): void
    {
        const row = this.getPageDataView().find(row => row._dataUuid_ === dataIndex);
        if (!row) return;
        this.event.emitRowClickTriggers(row);
    }
    
    
    public emitCellClickTrigger(dataIndex: number, column: string): void
    {
        const row = this.getPageDataView().find(row => row._dataUuid_ === dataIndex);
        if (!row) return;
        this.event.emitCellClickTriggers(row, column);
    }
}
