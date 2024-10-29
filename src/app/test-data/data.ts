import { ColumnsConfig } from "angular-tz-datatable-core";

export type User = {
    id: number;
    name: string;
    age: number | null;
    salary: number | null;
    is_manager: boolean;
    hire_date: string;
    department: string;
    projects: number;
    rating: number;
    has_car: boolean;
    phone: string | null | undefined;
    email: string | null;
    address: string;
    gender: string;
    is_active: boolean;
};

export const data: Array<User> = [
    { id: 2, name: 'Jane Smith', age: 34, salary: 62000, is_manager: false, hire_date: '2019-11-01', department: 'HR', projects: 3, rating: 3.8, has_car: false, phone: '555-5678', email: 'jane.smith@example.com', address: '456 Oak St', gender: 'F', is_active: true },
    { id: 5, name: 'Chris White', age: 30, salary: 51000, is_manager: true, hire_date: '2020-03-30', department: 'Sales', projects: 4, rating: 3.6, has_car: false, phone: '555-1212', email: 'chris.white@example.com', address: '135 Maple St', gender: 'M', is_active: true },
    { id: 10, name: 'Sophia Wilson', age: 27, salary: 50000, is_manager: false, hire_date: '2021-05-17', department: 'Product', projects: 2, rating: 4.0, has_car: false, phone: '555-5555', email: 'sophia.wilson@example.com', address: '321 Elm St', gender: 'F', is_active: true },
    { id: 1, name: 'John Doe', age: 29, salary: 55000.50, is_manager: true, hire_date: '2021-04-15', department: 'IT', projects: 5, rating: 4.5, has_car: true, phone: '555-1234', email: 'john.doe@example.com', address: '123 Elm St', gender: 'M', is_active: true },
    { id: 3, name: 'Mike Johnson', age: 41, salary: null, is_manager: true, hire_date: '2018-06-24', department: 'Finance', projects: 7, rating: 4.9, has_car: true, phone: '555-9101', email: null, address: '789 Pine St', gender: 'M', is_active: false },
    { id: 7, name: 'David Martin', age: 26, salary: 46000, is_manager: false, hire_date: '2021-01-05', department: 'Operations', projects: 3, rating: 3.9, has_car: true, phone: '555-2222', email: null, address: '789 Spruce St', gender: 'M', is_active: true },
    { id: 19, name: 'Benjamin Scott', age: 37, salary: 66000, is_manager: true, hire_date: '2017-09-12', department: 'Sales', projects: 7, rating: 4.5, has_car: true, phone: '555-5050', email: 'benjamin.scott@example.com', address: '321 Elm St', gender: 'M', is_active: false },
    { id: 4, name: 'Emily Davis', age: 23, salary: 47000, is_manager: false, hire_date: '2022-09-13', department: 'Marketing', projects: 2, rating: 4.1, has_car: false, phone: undefined, email: 'emily.davis@example.com', address: '246 Cedar St', gender: 'F', is_active: true },
    { id: 6, name: 'Ava Taylor', age: 38, salary: 68000, is_manager: true, hire_date: '2017-07-19', department: 'IT', projects: 6, rating: 4.7, has_car: true, phone: '555-1111', email: 'ava.taylor@example.com', address: '333 Birch St', gender: 'F', is_active: true },
    { id: 8, name: 'Olivia Brown', age: 31, salary: null, is_manager: false, hire_date: '2019-02-12', department: 'Customer Support', projects: 4, rating: 4.2, has_car: false, phone: '555-3333', email: 'olivia.brown@example.com', address: '951 Willow St', gender: 'F', is_active: false },
    { id: 17, name: 'Lucas Clark', age: 44, salary: 74000, is_manager: false, hire_date: '2016-05-18', department: 'Operations', projects: 9, rating: 4.8, has_car: true, phone: '555-3030', email: 'lucas.clark@example.com', address: '951 Willow St', gender: 'M', is_active: true },
    { id: 9, name: 'Daniel Miller', age: 43, salary: 72000, is_manager: true, hire_date: '2016-12-01', department: 'R&D', projects: 9, rating: 4.8, has_car: true, phone: '555-4444', email: 'daniel.miller@example.com', address: '678 Poplar St', gender: 'M', is_active: true },
    { id: 22, name: 'Harper Hall', age: 24, salary: 45000, is_manager: false, hire_date: '2023-03-29', department: 'Marketing', projects: 2, rating: 3.9, has_car: false, phone: '555-8080', email: 'harper.hall@example.com', address: '246 Cedar St', gender: 'F', is_active: true },
    { id: 11, name: 'James Anderson', age: 50, salary: 80000, is_manager: true, hire_date: '2015-03-10', department: 'Management', projects: 12, rating: 4.9, has_car: true, phone: '555-6666', email: 'james.anderson@example.com', address: '456 Oak St', gender: 'M', is_active: true },
    { id: 12, name: 'Mia Thomas', age: 22, salary: 42000, is_manager: false, hire_date: '2023-07-21', department: 'Internship', projects: 1, rating: 3.5, has_car: false, phone: '555-7777', email: 'mia.thomas@example.com', address: '789 Pine St', gender: 'F', is_active: false },
    { id: 13, name: 'Alexander Lee', age: 33, salary: 61000, is_manager: true, hire_date: '2020-08-10', department: 'HR', projects: 5, rating: 4.3, has_car: true, phone: '555-8888', email: null, address: '246 Cedar St', gender: 'M', is_active: true },
    { id: 26, name: 'Isabella Baker', age: 38, salary: 70000, is_manager: true, hire_date: '2017-07-07', department: 'Legal', projects: 7, rating: 4.7, has_car: false, phone: '555-3033', email: 'isabella.baker@example.com', address: '321 Elm St', gender: 'F', is_active: true },
    { id: 14, name: 'Lily Garcia', age: 40, salary: 70000, is_manager: false, hire_date: '2018-11-19', department: 'Legal', projects: 8, rating: 4.6, has_car: false, phone: '555-9999', email: 'lily.garcia@example.com', address: '135 Maple St', gender: 'F', is_active: false },
    { id: 15, name: 'Henry Harris', age: 28, salary: 53000, is_manager: true, hire_date: '2021-03-03', department: 'Engineering', projects: 4, rating: 4.4, has_car: true, phone: '555-1010', email: 'henry.harris@example.com', address: '333 Birch St', gender: 'M', is_active: true },
    { id: 16, name: 'Ella Robinson', age: 35, salary: 59000, is_manager: true, hire_date: '2019-10-30', department: 'IT', projects: 6, rating: 4.7, has_car: false, phone: '555-2020', email: 'ella.robinson@example.com', address: '789 Spruce St', gender: 'F', is_active: true },
    { id: 29, name: 'Ethan Rivera', age: 46, salary: 76000, is_manager: true, hire_date: '2016-06-14', department: 'Finance', projects: 9, rating: 4.9, has_car: true, phone: '555-6066', email: 'ethan.rivera@example.com', address: '135 Maple St', gender: 'M', is_active: false },
    { id: 18, name: 'Charlotte King', age: 25, salary: 48000, is_manager: false, hire_date: '2022-12-04', department: 'Marketing', projects: 3, rating: 4.2, has_car: false, phone: '555-4040', email: 'charlotte.king@example.com', address: '678 Poplar St', gender: 'F', is_active: true },
    { id: 35, name: 'Aiden Walker', age: 35, salary: 62000, is_manager: true, hire_date: '2020-04-16', department: 'Sales', projects: 5, rating: 4.4, has_car: true, phone: '555-3034', email: 'aiden.walker@example.com', address: '246 Cedar St', gender: 'M', is_active: true },
    
    { id: 39, name: 'Elijah Martinez', age: 40, salary: 69000, is_manager: true, hire_date: '2018-03-17', department: 'R&D', projects: 8, rating: 4.7, has_car: true, phone: '555-7078', email: 'elijah.martinez@example.com', address: '456 Oak St', gender: 'M', is_active: true },
    { id: 21, name: 'Liam Young', age: 39, salary: 67000, is_manager: true, hire_date: '2016-04-01', department: 'IT', projects: 6, rating: 4.6, has_car: true, phone: '555-7070', email: 'liam.young@example.com', address: '123 Elm St', gender: 'M', is_active: true },
    { id: 40, name: 'Aubrey Clark', age: 23, salary: 45000, is_manager: false, hire_date: '2023-06-14', department: 'Internship', projects: 1, rating: 3.6, has_car: false, phone: '555-8089', email: 'aubrey.clark@example.com', address: '678 Poplar St', gender: 'F', is_active: false },
    { id: 45, name: 'William Watson', age: 49, salary: 79000, is_manager: true, hire_date: '2015-05-11', department: 'Engineering', projects: 10, rating: 4.9, has_car: true, phone: '555-4046', email: 'william.watson@example.com', address: '789 Pine St', gender: 'M', is_active: true },
    { id: 42, name: 'Charlotte Morris', age: 41, salary: 68000, is_manager: false, hire_date: '2019-01-07', department: 'Operations', projects: 7, rating: 4.5, has_car: true, phone: '555-1013', email: 'charlotte.morris@example.com', address: '123 Elm St', gender: 'F', is_active: true },
    { id: 34, name: 'Sofia Rodriguez', age: 44, salary: 74000, is_manager: false, hire_date: '2017-08-12', department: 'Finance', projects: 8, rating: 4.8, has_car: false, phone: '555-2023', email: 'sofia.rodriguez@example.com', address: '123 Elm St', gender: 'F', is_active: true },
    { id: 43, name: 'Henry Brooks', age: 47, salary: 74000, is_manager: true, hire_date: '2016-08-18', department: 'Management', projects: 9, rating: 4.8, has_car: true, phone: '555-2024', email: 'henry.brooks@example.com', address: '951 Willow St', gender: 'M', is_active: true },
    { id: 23, name: 'Sebastian Wright', age: 45, salary: 75000, is_manager: true, hire_date: '2015-08-15', department: 'Finance', projects: 9, rating: 4.8, has_car: true, phone: '555-9090', email: 'sebastian.wright@example.com', address: '789 Pine St', gender: 'M', is_active: true },
    { id: 49, name: 'Daniel Edwards', age: 38, salary: 70000, is_manager: false, hire_date: '2018-05-27', department: 'Finance', projects: 7, rating: 4.6, has_car: true, phone: '555-8080', email: 'daniel.edwards@example.com', address: '951 Willow St', gender: 'M', is_active: true },
    { id: 24, name: 'Zoey Hill', age: 29, salary: 54000, is_manager: false, hire_date: '2021-11-10', department: 'Customer Support', projects: 3, rating: 4.2, has_car: false, phone: '555-1011', email: 'zoey.hill@example.com', address: '951 Willow St', gender: 'F', is_active: false },
    { id: 44, name: 'Amelia Torres', age: 25, salary: 49000, is_manager: false, hire_date: '2022-02-13', department: 'HR', projects: 2, rating: 4.1, has_car: false, phone: '555-3035', email: 'amelia.torres@example.com', address: '246 Cedar St', gender: 'F', is_active: true },
    { id: 25, name: 'Logan Adams', age: 31, salary: 59000, is_manager: false, hire_date: '2020-05-25', department: 'Engineering', projects: 5, rating: 4.4, has_car: true, phone: '555-2022', email: 'logan.adams@example.com', address: '678 Poplar St', gender: 'M', is_active: true },
    { id: 46, name: 'Evelyn Flores', age: 31, salary: 60000, is_manager: false, hire_date: '2020-10-18', department: 'Product', projects: 5, rating: 4.2, has_car: false, phone: '555-5057', email: 'evelyn.flores@example.com', address: '678 Poplar St', gender: 'F', is_active: true },
    { id: 27, name: 'Jacob Carter', age: 42, salary: 73000, is_manager: false, hire_date: '2018-01-21', department: 'Operations', projects: 8, rating: 4.5, has_car: true, phone: '555-4044', email: 'jacob.carter@example.com', address: '456 Oak St', gender: 'M', is_active: true },
    { id: 48, name: 'Ella Griffin', age: 28, salary: 53000, is_manager: false, hire_date: '2021-12-09', department: 'Customer Support', projects: 4, rating: 4.3, has_car: false, phone: '555-7079', email: 'ella.griffin@example.com', address: '321 Elm St', gender: 'F', is_active: true },
    { id: 28, name: 'Avery Sanchez', age: 30, salary: 52000, is_manager: false, hire_date: '2021-02-08', department: 'HR', projects: 4, rating: 4.3, has_car: false, phone: '555-5055', email: 'avery.sanchez@example.com', address: '789 Pine St', gender: 'F', is_active: true },
    { id: 30, name: 'Abigail Parker', age: 36, salary: 64000, is_manager: false, hire_date: '2019-09-09', department: 'Product', projects: 6, rating: 4.6, has_car: false, phone: '555-7077', email: 'abigail.parker@example.com', address: '333 Birch St', gender: 'F', is_active: true },
    { id: 31, name: 'Mason Collins', age: 28, salary: 54000, is_manager: true, hire_date: '2021-07-18', department: 'IT', projects: 4, rating: 4.5, has_car: true, phone: '555-8088', email: 'mason.collins@example.com', address: '789 Spruce St', gender: 'M', is_active: true },
    { id: 32, name: 'Madison Turner', age: 32, salary: 61000, is_manager: false, hire_date: '2020-11-05', department: 'Legal', projects: 6, rating: 4.3, has_car: false, phone: '555-9099', email: 'madison.turner@example.com', address: '951 Willow St', gender: 'F', is_active: false },
    { id: 50, name: 'Mila Diaz', age: 35, salary: 62000, is_manager: true, hire_date: '2020-08-05', department: 'HR', projects: 5, rating: 4.5, has_car: false, phone: '555-9090', email: 'mila.diaz@example.com', address: '456 Oak St', gender: 'F', is_active: true },
    { id: 33, name: 'Lucas Nelson', age: 29, salary: 56000, is_manager: true, hire_date: '2021-06-23', department: 'Operations', projects: 5, rating: 4.7, has_car: true, phone: '555-1012', email: 'lucas.nelson@example.com', address: '678 Poplar St', gender: 'M', is_active: true },
    { id: 36, name: 'Chloe Perez', age: 37, salary: 64000, is_manager: false, hire_date: '2019-12-30', department: 'Customer Support', projects: 6, rating: 4.6, has_car: false, phone: '555-4045', email: 'chloe.perez@example.com', address: '789 Pine St', gender: 'F', is_active: false },
    { id: 37, name: 'Grayson Roberts', age: 50, salary: 80000, is_manager: true, hire_date: '2015-09-15', department: 'Management', projects: 10, rating: 4.9, has_car: true, phone: '555-5056', email: 'grayson.roberts@example.com', address: '951 Willow St', gender: 'M', is_active: true },
    { id: 38, name: 'Layla Mitchell', age: 27, salary: 51000, is_manager: false, hire_date: '2021-10-21', department: 'Marketing', projects: 3, rating: 4.1, has_car: false, phone: '555-6067', email: 'layla.mitchell@example.com', address: '321 Elm St', gender: 'F', is_active: true },
    { id: 41, name: 'Oliver Wright', age: 33, salary: 62000, is_manager: false, hire_date: '2020-02-28', department: 'Product', projects: 4, rating: 4.3, has_car: true, phone: '555-9091', email: 'oliver.wright@example.com', address: '951 Willow St', gender: 'M', is_active: true },
    { id: 47, name: 'James Sanders', age: 43, salary: 76000, is_manager: true, hire_date: '2017-02-22', department: 'Sales', projects: 8, rating: 4.7, has_car: true, phone: '555-6068', email: 'james.sanders@example.com', address: '951 Willow St', gender: 'M', is_active: true },
];


export const columnsConfig: ColumnsConfig = {
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
    salary: {
        title: 'Salary',
        width: 100,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    is_manager: {
        title: 'Is Manager',
        width: 100,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: 'No',
    },
    hire_date: {
        title: 'Hire Date',
        width: 120,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    department: {
        title: 'Department',
        width: 100,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: 'N/A',
    },
    projects: {
        title: 'Projects',
        width: 100,
        isVisible: false,
        isSearchable: true,
        isSortable: true,
        defaultContent: 'No projects',
    },
    rating: {
        title: 'Rating',
        width: 100,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    has_car: {
        title: 'Has Car',
        width: 100,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: 'No',
    },
    phone: {
        title: 'Phone',
        width: 120,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    email: {
        title: 'Email',
        width: 200,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    address: {
        title: 'Address',
        width: 200,
        isVisible: false,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    gender: {
        title: 'Gender',
        width: 80,
        isVisible: true,
        isSearchable: true,
        isSortable: true,
        defaultContent: '-',
    },
    is_active: {
        title: 'Is Active',
        width: 80,
        isVisible: true,
        isSearchable: false,
        isSortable: true,
        defaultContent: 'Inactive',
    },
};