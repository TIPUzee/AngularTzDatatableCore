# AngularTzDatatableCore

AngularTzDatatableCore is a powerful and flexible Angular library designed to streamline the creation and management of data tables in your Angular applications. It offers features such as searching, sorting, pagination, and customizable column visibility, making it an essential tool for developers looking to build interactive data-driven applications.

It is a generic, strictly-typed Angular library designed for flexible and type-safe datatable management.

Use AngularTzDatatableCore to build beautiful, customizable Angular datatables effortlessly.

Note that this library will support API data fetching in the future.

## Installation

To install AngularTzDatatableCore, run the following command in your Angular project:

```bash
npm install angular-tz-datatable-core
```

## API Reference

Suppose ```T``` is the type of the data you want to display in the table (here ```T``` will be ```User```). In that case, you can use the following methods to interact with the AngularTzDatatableCore service:

```typescript
import { TzDatatable } from 'angular-tz-datatable-core';

export class YourComponent
{
    protected readonly dt: TzDatatable<User> = new TzDatatable();
}
```

For the following methods, ```dt``` is the instance of the ```TzDatatable``` service.

| API                                      | Return Type                        | Usage                                                      |
|:-----------------------------------------|:-----------------------------------|:-----------------------------------------------------------|
| ```dt.initColsConfig(ColumnsConfig)```   | ```void```                         | Initializes table ```columns```                            |
| ```dt.setData(Array<TExtended>)```       | ```void```                         | Initializes table ```data```                               |
| ```dt.getColsConfigAsArray()```          | ```Array<ColumnsConfigExtended>``` | Get ```columns configurations```                           |
| ```dt.getData()```                       | ```Array<TExtended>```             | Get ```data```                                             |
| ```dt.getViewMode()```                   | ```"NORMAL" \| "SEARCH"```         | Get the current view mode                                  |
| -                                        | -                                  | -                                                          |
| ```dt.getTotalRows()```                  | ```number```                       | -                                                          |
| ```dt.getTotalPages()```                 | ```number```                       | -                                                          |
| ```dt.gotoPage(number)```                | ```void```                         | Go to a specific page                                      |
| -                                        | -                                  | -                                                          |
| ```dt.setPageNb(number)```               | ```void```                         | Set the current page number                                |
| ```dt.getPageNb()```                     | ```number```                       | -                                                          |
| ```dt.getPageSize()```                   | ```number```                       | Current Page Size                                          |
| ```dt.getPageDataView()```               | ```Array<TExtended>```             | Get data for the current page **view**                     |
| ```dt.getPageDataViewAsAny()```          | ```Array<any>```                   | Get data for the current page **view** (in specific cases) |
| -                                        | -                                  | -                                                          |
| ```dt.toggleRowSelection(number)```      | ```void```                         | Toggle row selection                                       |
| ```dt.toggleAllRowsSelectionInPage()```  | ```void```                         | Toggle all rows selection in the current page              |
| ```dt.selectAllRowsInPage()```           | ```void```                         | Select all rows in the current page                        |
| ```dt.unselectAllRowsInPage()```         | ```void```                         | Unselect all rows in the current page                      |
| ```dt.getSelectedRowCountOnPage()```     | ```number```                       | Get the number of selected rows in current page            |
| ```dt.getUnselectedRowCountOnPage()```   | ```number```                       | Get the number of unselected rows in current page          |
| ```dt.getSelectedRowCountBeyondPage()``` | ```number```                       | Get the number of selected rows beyond current page        |
| ```dt.getSelectedRowCountInTotal()```    | ```number```                       | Get the number of selected rows beyond current page        |
| ```dt.getUnselectedRowCountInTotal()```  | ```number```                       | Get the number of unselected rows in total                 |
| ```dt.getSelectedRowCountInTotal()```    | ```number```                       | Get the number of selected rows in total                   |
| -                                        | -                                  | -                                                          |
| ```dt.getSortingKey()```                 | ```string```                       | Get the current sorting column                             |
| ```dt.setSortingKey(string)```           | ```void```                         | Set the current sorting column                             |
| -                                        | -                                  | -                                                          |
| ```dt.toggleColVisibility(string)```     | ```void```                         | Toggle column visibility                                   |
| ```dt.resetColsVisibility()```           | ```void```                         | Reset column visibility                                    |
| -                                        | -                                  | -                                                          |
| ```dt.toggleSearchCol(string)```         | ```void```                         | Toggle column as ```isSearchable```                        |
| ```dt.search(string)```                  | ```void```                         | -                                                          |
| ```dt.resetSearchCols()```               | ```void```                         | -                                                          |
| ```dt.clearSearchCols()```               | ```void```                         | -                                                          |
| ```dt.getSearchQuery()```                | ```string```                       | -                                                          |
| ```dt.getSearchChunks()```               | ```Array<string>```                | - (search query words split by whitespaces)                |
| ```dt.getSearchCols()```                 | ```Array<string>```                | - (searchable columns)                                     |

### Events

You can listen to the following events using the ```addEventListener``` method:

```typescript
dt.addEventListener("RowClick", (row) =>
{
    console.log(row);
});
```

| Event                                                      | Callback Arguments                                                                                                |
|:-----------------------------------------------------------|:------------------------------------------------------------------------------------------------------------------|
| ```dt.addEventListener("BeforeSearch", callback)```        | 1. ```processedQuery: { query: string, chunks: Array<string> }``` <br> 2. ```e: { preventDefault: () => true }``` |
| ```dt.addEventListener("AfterSearch", callback)```         | No arguments                                                                                                      |
| ```dt.addEventListener("RowHover", callback)```            | 1. ```row: TExtended```                                                                                           |
| ```dt.addEventListener("RowClick", callback)```            | 1. ```row: TExtended```                                                                                           |
| ```dt.addEventListener("CellClick", callback)```           | 1. ```row: TExtended``` <br> 2. ```column: string```                                                              |
| ```dt.addEventListener("RowsSelectionChange", callback)``` | 1. ```rows: Array<TExtended>``` - only effected rows                                                              |
| ```dt.addEventListener("PageChange", callback)```          | 1. ```pageNb: number``` <br> 2. ```prevPageNb: number```                                                          |
| ```dt.addEventListener("ColumnSort", callback)```          | 1. ```column: string``` <br> 2. ```direction: "ASC" \| "DESC"```                                                  |
| ```dt.addEventListener("ColumnsVisibility", callback)```   | 1. ```columns: Array<{ column: string, isVisible: boolean }>``` - only effected columns                           |
| ```dt.addEventListener("ColumnsSearch", callback)```       | 1. ```columns: Array<{ column: string, isSearchable: boolean }>``` - only effected columns                        |

### Extended Properties and Methods

| Property / Method                | Return Type   | Usage                                                                               |
|:---------------------------------|:--------------|:------------------------------------------------------------------------------------|
| ```row._dataIndex_```            | ```number```  | Get the assigned unique id of the row in the data array                             |
| ```row._selected_```             | ```boolean``` | Get the selection status of the row                                                 |
| ```column.isSearchableDefault``` | ```boolean``` | Get the default search status of the column <br> (set in the columns configuration) |

## Usage

### Using the Library

To use the AngularTzDatatableCore library in your Angular component, import the ```TzDatatable``` class and create an instance of it in your component:

```ts
import { TzDatatable } from 'angular-tz-datatable-core';

@Component({
    imports: [
        // No need to import TzDatatable
    ]
})
export class YourComponent
{
    protected readonly dt: TzDatatable<User> = new TzDatatable();
}
```

### Basic Example

Here’s a simple example of how to use the AngularTzDatatableCore in a component:

#### 1. Sample Columns configuration

```ts
// test-data/data.ts

import { ColumnsConfig } from "angular-tz-datatable-core";

export type User = {
    id: number;
    name: string;
    age: number | null;
};

const columnsConfigs: ColumnsConfig = {
    id: {
        title: 'ID',
        width: 50,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    name: {
        title: 'Name',
        width: 150,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: 'N/A',
    },
    age: {
        title: 'Age',
        width: 50,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
};
```

#### 2. Sample Data

```ts
// test-data/data.ts

import { User } from './data';

export const data: Array<User> = [
    { id: 2, name: 'Jane Smith', age: 34 },
    { id: 5, name: 'Chris White', age: 30 },
    { id: 10, name: 'Sophia Wilson', age: 27 },
    { id: 1, name: 'John Doe', age: 29 },
    { id: 3, name: 'Mike Johnson', age: 41 },
    { id: 7, name: 'David Martin', age: 26 },
    { id: 19, name: 'Benjamin Scott', age: 37 },
    { id: 4, name: 'Emily Davis', age: 23 },
    { id: 6, name: 'Ava Taylor', age: 38 },
    { id: 8, name: 'Olivia Brown', age: 31 },
]
```

#### 3. Create datatable instance

```ts
import { TzDatatable } from 'angular-tz-datatable-core';
import { data } from '../test-data/data'; // Sample data
import { columnsConfigs, User } from '../test-data/data'; // Sample columns configuration

@Component({
    // Your component configuration
})
export class DatatableTestComponent
{
    protected readonly dt: TzDatatable<User> = new TzDatatable();
    
    
    constructor()
    {
        this.initializeData();
    }
    
    
    private initializeData()
    {
        this.dt.initColsConfig(columnsConfig); // Must be called before setData
        this.dt.setData(data);
    }
}
```

### HTML Template Example

Here’s how you can create the HTML template for the datatable:

```angular2html

<table>
   <!-- Header -->
   <tr>
      <th
         *ngFor="let col of dt.getColsConfigAsArray(); trackBy: col.key"
         *ngIf="col.isVisible"
      >
         {{ col.title }}
      </th>
   </tr>
   <!-- Header -->

   <!-- Body -->
   <tbody>

      <!-- Row -->
      <tr
         *ngFor="let row of dt.getPageDataViewAsAny(); trackBy: row._dataIndex_"
      >
         <!-- Cell -->
         <td
            *ngFor="let col of dt.getColsConfigAsArray(); trackBy: col.key"
            *ngIf="col.isVisible"
         >
            {{ row[col.key] }}
         </td>
         <!-- Cell -->
      </tr>
      <!-- Row -->

   </tbody>
   <!-- Body -->

</table>
```

## Contributors

- TIPUzee: [GitHub](https://www.github.com/tipuzee) / [LinkedIn](https://www.linkedin.com/in/tipuzee)
