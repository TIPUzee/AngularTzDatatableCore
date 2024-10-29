import { Injectable, Inject, InjectionToken } from '@angular/core';
import { TExtended, ProcessedSearchQuery, StrictColumnsConfig } from "../data.type";
import { TzDatatableCoreConfigs } from "../config";

export const GET_ROWS_PER_PAGE_TOKEN = new InjectionToken<() => number>('GET_ROWS_PER_PAGE_TOKEN');
export const GET_DATA_TOKEN = new InjectionToken<() => Array<TExtended<any>>>('GET_DATA_TOKEN');
export const GET_COLS_CONFIG_TOKEN = new InjectionToken<() => StrictColumnsConfig>('GET_COLS_CONFIG_TOKEN');

@Injectable()
export class SearchViewPagination<T extends object>
{
    protected pageNb: number = 0;
    protected searchQuery: string = '';
    protected searchChunks: Array<string> = [];
    protected searchColumns: Array<string> = [];
    protected dataIndexes: Array<number> = [];
    protected totalRowsByApi: number = -1;
    
    
    constructor(
        @Inject(GET_ROWS_PER_PAGE_TOKEN) private getRowsPerPage: () => number,
        @Inject(GET_DATA_TOKEN) private getData: () => Array<TExtended<T>>,
        @Inject(GET_COLS_CONFIG_TOKEN) private getColsConfig: () => StrictColumnsConfig,
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
        
        return this.dataIndexes.slice(start, end)
            .map(i => this.getData()
                .filter(row => row._dataUuid_ === i)[0]
            );
    }
    
    
    public getPageSize(): number
    {
        const start = this.pageNb * this.getRowsPerPage();
        const end = (
            this.pageNb + 1
        ) * this.getRowsPerPage();
        
        return this.dataIndexes.slice(start, end).length;
    }
    
    
    public getPageDataIndexes(): Array<number>
    {
        const start = this.pageNb * this.getRowsPerPage();
        const end = (
            this.pageNb + 1
        ) * this.getRowsPerPage();
        
        return this.dataIndexes.slice(start, end);
    }
    
    
    public getDataIndexes(): Array<number>
    {
        return this.dataIndexes;
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
    
    
    public getPageStartIndex(): number
    {
        return this.pageNb * this.getRowsPerPage();
    }
    
    
    public partiallyResetPageNb(): void
    {
        if (this.getTotalPages() === 0)
        {
            this.pageNb = 0;
        } else if (this.pageNb >= this.getTotalPages())
        {
            this.pageNb = this.getTotalPages() - 1;
        } else
        {
            this.pageNb = 0;
        }
    }
    
    
    /** Total Pages */
    
    
    public getTotalPages(): number
    {
        return Math.ceil(this.getTotalRows() / this.getRowsPerPage());
    }
    
    
    /** Total Rows */
    
    
    public setTotalRows(totalRows: number): void
    {
        this.totalRowsByApi = totalRows;
    }
    
    
    public getTotalRows(): number
    {
        return this.totalRowsByApi === -1 ? this.dataIndexes.length : this.totalRowsByApi;
    }
    
    
    /** Search Cols */
    
    
    public setSearchCols(searchColumns: Array<string>): void
    {
        this.searchColumns = searchColumns;
        this.search();
    }
    
    
    public getSearchCols(): Array<string>
    {
        return this.searchColumns;
    }
    
    
    public toggleSearchCol(key: string): void
    {
        if (TzDatatableCoreConfigs.dataExtendedProperties.includes(key)) return;
        if (!this.getColsConfig()[key].isSearchableDefault || !this.getColsConfig()[key].isVisible) return;
        
        const index = this.searchColumns.indexOf(key);
        
        if (index === -1)
        {
            this.searchColumns.push(key);
            this.getColsConfig()[key]['isSearchable'] = true;
        } else
        {
            this.searchColumns.splice(index, 1);
            this.getColsConfig()[key]['isSearchable'] = false;
        }
        
        this.search();
    }
    
    
    public resetSearchCols(): Array<string>
    {
        const modifiedSearchColumns: Array<string> = [];
        
        for (const [key, value] of Object.entries(this.getColsConfig()))
        {
            if (TzDatatableCoreConfigs.dataExtendedProperties.includes(key)) continue;
            if (this.searchColumns.includes(key)) continue;
            
            if (value.isVisible && value.isSearchable)
            {
                this.searchColumns.push(key);
                this.getColsConfig()[key]['isSearchable'] = true;
                modifiedSearchColumns.push(key);
            }
        }
        
        this.search();
        return modifiedSearchColumns;
    }
    
    
    public clearSearchCols(): void
    {
        this.searchColumns = [];
        this.search();
    }
    
    
    /** Search Query */
    
    
    public processSearchQuery(query: string): ProcessedSearchQuery
    {
        return {
            query: query.trim().toLowerCase(),
            chunks: this.splitSearchQuery(query),
        }
    }
    
    
    public setSearchQuery(query: string): void
    {
        this.searchQuery = query.trim().toLowerCase();
        this.searchChunks = this.splitSearchQuery(query);
    }
    
    
    public getSearchQuery(): string
    {
        return this.searchQuery;
    }
    
    
    public getSearchChunks(): Array<string>
    {
        return this.searchChunks;
    }
    
    
    private splitSearchQuery(query: string): Array<string>
    {
        return query.trim().toLowerCase().split(/\s+/);
    }
    
    
    /** Search */
    
    
    public search(): void
    {
        this.totalRowsByApi = -1;
        
        this.dataIndexes = this.getData()
            .map((row, index) => (
                this.rowMatchesSearch(row) ? row._dataUuid_ : -1
            ))
            .filter(index => index !== -1);
        
        this.partiallyResetPageNb();
    }
    
    
    private rowMatchesSearch(row: T): boolean
    {
        const remainingChunks = [...this.searchChunks];
        
        for (const [key, value] of Object.entries(row))
        {
            if (
                TzDatatableCoreConfigs.dataExtendedProperties.includes(key) ||
                !this.searchColumns.includes(key) ||
                !this.getColsConfig()[key].isSearchable ||
                !this.getColsConfig()[key].isVisible
            )
            {
                continue;
            }
            
            const searchValue = value?.toString().toLowerCase() || '';
            
            let matchedInCurrentColumn = false;
            for (let i = remainingChunks.length - 1; i >= 0; i--)
            {
                const chunk = remainingChunks[i];
                
                if (searchValue.includes(chunk) && !matchedInCurrentColumn)
                {
                    remainingChunks.splice(i, 1);
                    matchedInCurrentColumn = true;
                }
            }
            
            if (remainingChunks.length === 0)
            {
                return true;
            }
        }
        
        return false;
    }
    
}
