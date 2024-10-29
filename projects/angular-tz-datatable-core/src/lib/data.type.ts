type ExcludeDivElement = Exclude<any, HTMLDivElement>;

/** Column Types */

export type ColumnConfig = {
    title: string,
    width?: number,
    isVisible?: boolean,
    isSearchable?: boolean,
    isSortable?: boolean,
    render?: (value: ExcludeDivElement, rowNumber: number, meta: Object) => HTMLDivElement,
    defaultContent?: string,
}

export type StrictColumnConfig = {
    title: string,
    width?: number,
    isVisible: boolean,
    isSearchable: boolean,
    isSortable: boolean,
    render: (value: ExcludeDivElement, rowNumber: number, meta: Object) => HTMLDivElement,
    defaultContent: string,
}

export type ColumnsConfig = {
    [key: string]: ColumnConfig;
};

export type StrictColumnsConfig = {
    [key: string]: StrictColumnConfig & { key: string, isSearchableDefault: boolean };
};

export type ColumnsConfigExtended = ColumnConfig & { key: string, isSearchableDefault: boolean };

export type ViewMode = 'NORMAL' | 'SEARCH';

export type Data = {
    [key: string]: any;
};

export type TExtended<T extends object> = T & { _dataUuid_: number, _selected_: boolean };

export type TExtendedAsAny = { [key: string]: any, _dataUuid_: number, _selected_: boolean };

/** Search */

export type RowSelectEvent<T extends Data> = (row: T, selected: boolean) => void;
export type ColumnClickEvent<T extends Data> = (column: string) => void;
export type ColumnHoverEvent<T extends Data> = (column: string) => void;
export type ColumnSortEvent<T extends Data> = (column: string, direction: 'asc' | 'desc') => void;
export type PageChangeEvent = (pageNb: number) => void;
export type RowsPerPageChangeEvent = (rowsPerPage: number) => void;
export type ViewModeChangeEvent = (viewMode: ViewMode) => void;

/** Sort */


export type SortDirection = 'ASC' | 'DESC';

export type ProcessedSearchQuery = { query: string, chunks: Array<string> }
