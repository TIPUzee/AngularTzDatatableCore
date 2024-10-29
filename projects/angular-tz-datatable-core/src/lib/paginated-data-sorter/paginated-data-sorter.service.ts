import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ColumnsConfig, TExtended, SortDirection } from "../data.type";


export const SET_DATA_TOKEN = new InjectionToken<(data: Array<TExtended<any>>) => void>('SET_DATA_TOKEN');
export const GET_DATA_TOKEN = new InjectionToken<() => Array<TExtended<any>>>('GET_DATA_TOKEN');
export const GET_COLS_CONFIG_TOKEN = new InjectionToken<() => ColumnsConfig>('GET_COLS_CONFIG_TOKEN');


@Injectable()
export class PaginatedDataSorter<T extends object>
{
    protected totalRowsByApi = -1;
    protected sortedByKey: string = '';
    protected sortedByOrder: SortDirection = 'ASC';
    
    
    constructor(
        @Inject(GET_DATA_TOKEN) private getData: () => Array<TExtended<T>>,
        @Inject(SET_DATA_TOKEN) private setData: (data: Array<TExtended<T>>) => void,
        @Inject(GET_COLS_CONFIG_TOKEN) private getColsConfig: () => ColumnsConfig,
    )
    {
    }
    
    
    /** Sorting key */
    
    
    public setSortingKey(key: string): void
    {
        if (!Object.keys(this.getColsConfig()).includes(key)) return;
        
        if (this.sortedByKey === key)
        {
            this.sortedByOrder = this.sortedByOrder === 'ASC' ? 'DESC' : 'ASC';
            this.reserve();
        }
        
        this.sortedByKey = key;
        
        this.sortDataByKey();
    }
    
    
    public getSortingKey(): string
    {
        return this.sortedByKey;
    }
    
    
    /** Sorting order */
    
    
    public getSortingOrder(): SortDirection
    {
        return this.sortedByOrder;
    }
    
    
    /** Sorting Data */
    
    
    public sortData(key: string = '', index: number, direction: SortDirection = 'ASC'): void
    {
        if (key === '') key = this.sortedByKey;
        
        if (!Object.keys(this.getColsConfig()).includes(key)) return;
        
        if (this.sortedByKey === key)
        {
            if (this.sortedByOrder === direction) return;
            return;
        }
        this.sortedByKey = key;
        
        this.sortDataByKey();
    }
    
    
    public sortDataByKey(): void
    {
        if (this.sortedByKey === '') return;
        
        this.setData(
            this.getData().sort(
                (a, b) =>
                {
                    // @ts-ignore
                    if (a[this.sortedByKey] > b[this.sortedByKey])
                    {
                        return this.sortedByOrder === 'ASC' ? 1 : -1;
                    }
                    // @ts-ignore
                    if (a[this.sortedByKey] < b[this.sortedByKey])
                    {
                        return this.sortedByOrder === 'ASC' ? -1 : 1;
                    }
                    return 0;
                }
            )
        );
    }
    
    
    public reserve(): void
    {
        this.getData().reverse();
    }
}
