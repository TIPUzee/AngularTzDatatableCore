import { Inject, Injectable, InjectionToken } from '@angular/core';
import { TExtended } from "../data.type";

export const GET_DATA_TOKEN = new InjectionToken<() => Array<TExtended<any>>>('GET_DATA_TOKEN');
export const GET_PAGE_DATA_VIEW_TOKEN = new InjectionToken<() => Array<TExtended<any>>>('GET_PAGE_DATA_VIEW_TOKEN');

@Injectable()
export class TzSelect<T extends object>
{
    
    constructor(
        @Inject(GET_DATA_TOKEN) private getData: () => Array<TExtended<T>>,
        @Inject(GET_PAGE_DATA_VIEW_TOKEN) private getPageDataView: () => Array<TExtended<T>>,
    )
    {}
    
    
    /** Get Methods */
    
    
    public getDataIndexes(): Array<number>
    {
        return this.getData().map(row => row['_dataUuid_']);
    }
    
    
    public countSelectedWithin(rowIndexes: Array<number>): number
    {
        return rowIndexes.filter(id => this.getDataIndexes().includes(id)).length;
    }
    
    
    public countUnselectedWithin(rowIndexes: Array<number>): number
    {
        return rowIndexes.filter(id => !this.getDataIndexes().includes(id)).length;
    }
    
    
    /** Set Methods */
    
    
    public toggleRowSelection(dataIndex: number)
    {
        const a = this.getData().find(row => row['_dataUuid_'] === dataIndex);
        if (a && a._selected_)
        {
            if (a) a['_selected_'] = false;
        } else
        {
            if (a) a['_selected_'] = true;
        }
    }
    
    
    /** Operations */
    
    
    public selectAllInPage(): Array<TExtended<T>>
    {
        const alreadySelectedRow = this.getPageDataView().filter(row => row['_selected_'] === true);
        this.getPageDataView().forEach(row => row['_selected_'] = true);
        return this.getPageDataView().filter(row => !alreadySelectedRow.includes(row));
    }
    
    
    public unselectAllInPage(): Array<TExtended<T>>
    {
        const alreadyUnselectedRow = this.getPageDataView().filter(row => row['_selected_'] === false);
        this.getPageDataView().forEach(row => row['_selected_'] = false);
        return this.getPageDataView().filter(row => !alreadyUnselectedRow.includes(row));
    }
    
    
    public toggleAllInPage(): Array<TExtended<T>>
    {
        const allSelected = this.getPageDataView().every(row => row['_selected_']);
        this.getPageDataView().forEach(row => row['_selected_'] = !allSelected);
        return this.getPageDataView();
    }
}
