import { Injectable, Inject, InjectionToken } from '@angular/core';
import { TExtended } from "../data.type";

export const GET_ROWS_PER_PAGE_TOKEN = new InjectionToken<() => number>('GET_ROWS_PER_PAGE_TOKEN');
export const GET_DATA_TOKEN = new InjectionToken<() => Array<TExtended<any>>>(
    'GET_DATA_TOKEN'
);

@Injectable()
export class NormalViewPagination<T extends object>
{
    protected pageNb: number = 0;
    public totalRows: number = 0;
    
    
    constructor(
        @Inject(GET_ROWS_PER_PAGE_TOKEN) private getRowsPerPage: () => number,
        @Inject(GET_DATA_TOKEN) private getData: () => Array<TExtended<T>>,
    )
    {
    }
    
    
    /** Page Data */
    
    
    public getPageDataView(): Array<TExtended<T>>
    {
        const start = this.pageNb * this.getRowsPerPage();
        const end = (
            this.pageNb + 1
        ) * this.getRowsPerPage();
        
        return this.getData().slice(start, end);
    }
    
    
    public getPageSize(): number
    {
        const start = this.pageNb * this.getRowsPerPage();
        const end = (
            this.pageNb + 1
        ) * this.getRowsPerPage();
        
        return this.getData().slice(start, end).length;
    }
    
    
    public getPageDataIndexes(): Array<number>
    {
        const start = this.pageNb * this.getRowsPerPage();
        const end = (
            this.pageNb + 1
        ) * this.getRowsPerPage();
        
        return Array.from({ length: end - start }, (_, i) => start + i);
    }
    
    
    /** Page Nb */
    
    
    public setPageNb(pageNb: number): void
    {
        if (pageNb >= 0 && pageNb < this.getTotalPages())
        {
            this.pageNb = pageNb;
        }
    }
    
    
    public getPageNb(): number
    {
        return this.pageNb;
    }
    
    
    /** Total Pages */
    
    
    public getTotalPages(): number
    {
        return Math.ceil(this.getTotalRows() / this.getRowsPerPage());
    }
    
    
    /** Total Rows */
    
    
    public setTotalRows(totalRows: number): void
    {
        this.totalRows = totalRows;
    }
    
    
    public getTotalRows(): number
    {
        return this.totalRows;
    }
}
