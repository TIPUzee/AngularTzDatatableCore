import { Data, ProcessedSearchQuery, SortDirection, TExtended } from './data.type';

export type EventType =
    'RowClick' | 'BeforeSearch' | 'AfterSearch' | 'RowHover' | 'CellClick' | 'RowsSelectionChange' |
    'PageChange' | 'ColumnSort' | 'ColumnsVisibility' | 'SearchColumns';

export type BeforeSearchTriggerConfig = { preventDefault: () => true }
export type ColumnsVisibilityTriggerConfig = { column: string, isVisible: boolean }
export type SearchColumnTriggerConfig = { column: string, isSearchable: boolean }

export type BeforeSearchTrigger = (processedQuery: ProcessedSearchQuery, e: BeforeSearchTriggerConfig) => void;
export type AfterSearchTriggerCallback = () => void;
export type RowHoverTriggerCallback<T extends Data> = (row: TExtended<T>) => void;
export type RowClickTriggerCallback<T extends Data> = (row: TExtended<T>) => void;
export type CellClickTriggerCallback<T extends Data> = (row: TExtended<T>, column: string) => void;
export type RowSelectionChangeTriggerCallback<T extends Data> = (row: Array<TExtended<T>>) => void;
export type PageChangeTriggerCallback = (pageNb: number, prevPageNb: number) => void;
export type ColumnSortTriggerCallback = (column: string, direction: SortDirection) => void;
export type ColumnsVisibilityTriggerCallback = (columns: Array<ColumnsVisibilityTriggerConfig>) => void;
export type SearchColumnsTriggerCallback = (columns: Array<SearchColumnTriggerConfig>) => void;
