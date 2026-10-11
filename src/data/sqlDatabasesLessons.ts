import { LessonContent } from "./lessonsData";

export const SQL_DATABASES_LESSONS: Record<string, LessonContent> = {
  "sql-what-is-sql": {
    "id": "sql-what-is-sql",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "14 min read",
    "level": "Beginner",
    "title": "What is SQL? Relational Database Fundamentals",
    "subtitle": "Complete guide to What is SQL? Relational Database Fundamentals — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Relational Database Engine](/images/databases/sql-rdbms-arch.svg)\n\n- Structured Query Language (SQL) is the standard language used to interact with relational databases.\n\n- Allows users to store, retrieve, update and manage data efficiently through simple commands.\n- Known for its user-friendly syntax and powerful capabilities, SQL is widely used across industries.Before and After SQL",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for What is SQL? Relational Database Fundamentals."
        }
      },
      {
        "title": "2. Writing First SQL Query",
        "content": "Before running SQL queries you need to set up a database server like MySQL, PostgreSQL or SQLite. Here, we are going to use MySQL server. Follow below steps to set up a basic SQL Environment:\n\n- Install MySQL in your system\n- Start MySQL ServerAfter your MySQL environment is set up, you can write your SQL program. Below is the example to display \" Hello World\" using SQL.\n\n**Create a database named test_db**\n\n**Use the test_db database**\n\n**Create a table named greetings**\n\n**Insert the message 'Hello, World!' into the greetings table**\n\n**Retrieve the message from the greetings table**\n\n**Output:**\n\n**Note: **Try replacing \"Hello World!\" with your name in the SQL query. It's a fun way to see how databases store and display your own data! Give it a try and watch your name pop up!",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Writing First SQL Query",
          "snippet": "CREATE DATABASE test_db;"
        }
      },
      {
        "title": "3. Working of SQL",
        "content": "We interact with databases using SQL queries. DBMS tools like MySQL and SQL Server have their own SQL engine and an interface where users can write and execute SQL queries.\n\nWorking of SQLBelow are the detailed steps involved in the SQL query execution.\n\n- **Input:** The user sends a SQL query (like SELECT or INSERT).\n- **Parsing:** The system checks if the query is written correctly.\n- **Optimization:** It chooses the fastest way to run the query.\n- **Execution:** The database runs the query.\n- **Output:** The result or confirmation is sent back to the user."
      },
      {
        "title": "4. Components of a SQL System",
        "content": "Here are some key components of SQL system:\n\n- **Database:** A structured collection of data stored in tables with rows and columns.\n- **Tables:** Store data and apply rules to keep it accurate and consistent.\n- **Indexes:** Help the database find data faster without scanning the whole table.\n- **Views:** Virtual tables created from SELECT queries for easy access to data.\n- **Stored Procedures:** Pre-saved SQL code that runs tasks and improves performance and security.\n- **Transactions:** Group of SQL actions that either all succeed or all fail to keep data safe.\n- **Security & Permissions:** Control who can view, change or manage database data.\n- **Joins:** Combine data from different tables based on relationships."
      },
      {
        "title": "5. Rules for Writing SQL Queries",
        "content": "There are certain rules for SQL which would ensure consistency and functionality across databases. By following these rules, queries will be well formed and well executed in any database.\n\n- **Semicolon (;):** Ends an SQL statement.\n- **Case-Insensitive:** SQL keywords like SELECT and INSERT are not case-sensitive.\n- **Whitespace:** Spaces and new lines are allowed for better readability.\n- **Reserved Words:** Do not use SQL keywords as names or write them in quotes/backticks.**Comments:**\n\n- Single-line: -- comment\n- Multi-line: /* comment */**Data Constraints:** Use NOT NULL, UNIQUE, PRIMARY KEY, etc., to ensure data accuracy.\n\n**String Values:** Enclose strings in single quotes ('text').\n\n**Naming Rules: **\n\n- We Start with a letter.\n- We can only use Max 30 characters.\n- We only use letters, numbers and underscores (_)."
      },
      {
        "title": "6. Benefits of SQL",
        "content": "- **Efficient:** Uses indexing to retrieve data quickly.\n- **Standardized:** Follows common SQL standards used by most databases.\n- **Scalable:** Can manage both small and large amounts of data.\n- **Flexible:** Supports advanced features like PL/SQL, T-SQL and stored procedures."
      },
      {
        "title": "7. Limitations of SQL",
        "content": "- **Complex:** Query optimization can be difficult for large databases.\n- **Scalability Issues:** Not ideal for highly distributed systems.\n- **Different Implementations:** Some features vary between database systems.\n- **Limited Real-Time Processing:** Mainly designed for transactional data processing."
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: What is SQL? Relational Database Fundamentals",
      "initialCode": "CREATE DATABASE test_db;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: What is SQL? Relational Database Fundamentals ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing What is SQL? Relational Database Fundamentals in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via What is SQL? Relational Database Fundamentals",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "What is SQL? Relational Database Fundamentals is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-data-types": {
    "id": "sql-data-types",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "20 min read",
    "level": "Beginner",
    "title": "SQL Data Types (Numeric, Character, Temporal, JSON)",
    "subtitle": "Complete guide to SQL Data Types (Numeric, Character, Temporal, JSON) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In SQL, each column must be assigned a data type that defines the kind of data it can store, such as integers, dates, text or binary values. Choosing the correct data type is important for data integrity, query performance and efficient indexing.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Data Types (Numeric, Character, Temporal, JSON)."
        }
      },
      {
        "title": "1. Numeric Data Types",
        "content": "Numeric data types are used to store integer and decimal values. They support mathematical operations and are commonly used for financial, scientific and analytical data."
      },
      {
        "title": "3. Exact Numeric Datatype",
        "content": "Exact numeric types are used when precise numeric values are needed, such as for financial data, quantities and counts. Some common exact numeric types include:\n\nData TypeDescriptionRangeBIGINTLarge integer numbers-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807INTStandard integer values-2,147,483,648 to 2,147,483,647SMALLINTSmall integers-32,768 to 32,767TINYINTVery small integers0 to 255DECIMALExact fixed-point numbers (e.g., for financial values)-10^38 + 1 to 10^38 - 1NUMERICSimilar to DECIMAL, used for precision data-10^38 + 1 to 10^38 - 1**Example: **",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Exact Numeric Datatype",
          "snippet": "CREATE TABLE product_sales (    product_id INT PRIMARY KEY,    quantity SMALLINT,    unit_price DECIMAL(10,2),    total_amount DECIMAL(10,2));"
        }
      },
      {
        "title": "4. Approximate Numeric Datatype",
        "content": "These types are used to store approximate values, such as scientific measurements or large ranges of data that don't need exact precision.\n\nData TypeDescriptionRangeFLOATApproximate numeric values-1.79E+308 to 1.79E+308REALSimilar to FLOAT, but with less precision-3.40E+38 to 3.40E+38**Example: **\n\nData TypeDescriptionCHARStores fixed-length non-Unicode characters with a maximum length of 8000 charactersVARCHARStores variable-length non-Unicode characters with a maximum length of 8000 charactersVARCHAR(MAX)Stores variable-length non-Unicode data with a maximum size of 2³¹ − 1 characters (introduced in SQL Server 2005)TEXTStores variable-length non-Unicode data with a maximum size of 2,147,483,647 characters",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Approximate Numeric Datatype",
          "snippet": "CREATE TABLE measurements (    sensor_id INT,    temperature FLOAT,    humidity REAL);"
        }
      },
      {
        "title": "2. Character and String Data Types",
        "content": "Character data types are used to store text or character-based data. The choice between fixed-length and variable-length data types depends on the nature of your data.\n\n**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Character and String Data Types",
          "snippet": "CREATE TABLE employee_info (    emp_id INT PRIMARY KEY,    first_name VARCHAR(50),    last_name CHAR(30),    bio NVARCHAR(MAX));"
        }
      },
      {
        "title": "6. Unicode Character String Data Types",
        "content": "Unicode data types are used to store characters from any language, supporting a wider variety of characters. These are given in below table.\n\nData Type\n\nDescription\n\nNCHAR\n\nThe maximum length of 4000 characters(Fixed-Length Unicode Characters)\n\nNVARCHAR\n\nThe maximum length of 4000 characters.(Variable-Length Unicode Characters)\n\nNVARCHAR(MAX)\n\nThe maximum length of 231 - 1 characters(SQL Server 2005 only). (Variable Length Unicode data)\n\n**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Unicode Character String Data Types",
          "snippet": "CREATE TABLE international_users (    user_id INT PRIMARY KEY,    full_name NVARCHAR(100),    country NCHAR(50));"
        }
      },
      {
        "title": "3. Date and Time Data Type",
        "content": "SQL provides several data types for storing date and time information. They are essential for managing timestamps, events and time-based queries. These are given in the below table.\n\n**Data Type****Description****Storage Size**\n\nDATE\n\nStores the data of date (year, month, day)\n\n3 Bytes\n\nTIME\n\nStores the data of time (hour, minute,second)\n\n3 Bytes\n\nDATETIME\n\nStores both the data and time (year, month, day, hour, minute, second)\n\n8 Bytes\n\n**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Date and Time Data Type",
          "snippet": "CREATE TABLE orders (    order_id INT PRIMARY KEY,    order_date DATE,    order_time TIME,    shipped DATETIME);"
        }
      },
      {
        "title": "4. Binary Data Types in SQL",
        "content": "Binary data types are used to store binary data such as images, videos or other file types. These include\n\nData TypeDescriptionMax LengthBINARYFixed-length binary data.8000 bytesVARBINARYVariable-length binary data.8000 bytesIMAGEStores binary data as images.2,147,483,647 bytes**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Binary Data Types in SQL",
          "snippet": "CREATE TABLE product_images (    image_id INT PRIMARY KEY,    image_name VARCHAR(100),    image_data VARBINARY(MAX));"
        }
      },
      {
        "title": "5. Boolean Data Type in SQL",
        "content": "Boolean data types store logical values such as TRUE and FALSE. In SQLite, these values are typically represented using integers. where:\n\n- 1 represents TRUE\n- 0 represents FALSE**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Boolean Data Type in SQL",
          "snippet": "CREATE TABLE user_status (    user_id INT PRIMARY KEY,    is_active INTEGER,    is_verified INTEGER);"
        }
      },
      {
        "title": "6. Special Data Types",
        "content": "SQL also supports some specialized data types for advanced use cases:\n\n- **XML Data Type:** Used to store XML data and manipulate XML structures in the database**Example:**\n\n- **Spatial Data Type (Geometry): **stores planar spatial data, such as points, lines and polygons, in a database table.**Example:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Special Data Types",
          "snippet": "CREATE TABLE xml_records (    record_id INT PRIMARY KEY,    config_data XML);"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Data Types (Numeric, Character, Temporal, JSON)",
      "initialCode": "CREATE TABLE product_sales (    product_id INT PRIMARY KEY,    quantity SMALLINT,    unit_price DECIMAL(10,2),    total_amount DECIMAL(10,2));",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Data Types (Numeric, Character, Temporal, JSON) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Data Types (Numeric, Character, Temporal, JSON) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Data Types (Numeric, Character, Temporal, JSON)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Data Types (Numeric, Character, Temporal, JSON) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-operators": {
    "id": "sql-operators",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "SQL Operators (Arithmetic, Comparison, Logical, Bitwise)",
    "subtitle": "Complete guide to SQL Operators (Arithmetic, Comparison, Logical, Bitwise) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL operators are symbols or keywords used to perform operations on data in SQL queries.\n\n- Perform operations like calculations, comparisons and logical checks.\n- Enable filtering, calculating and updating data in databases.\n- Essential for query optimization and accurate data management.SQL Operators",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Operators (Arithmetic, Comparison, Logical, Bitwise)."
        }
      },
      {
        "title": "2. Arithmetic Operators",
        "content": "Arithmetic operators are used to perform mathematical operations on numeric values.\n\nOperatorDescriptionExample`+`Addition`10 + 20``-`Subtraction`20 - 10``*`Multiplication`10 * 20``/`Division`20 / 10``%`Modulus`10 % 3`**Example**\n\n**Output:**\n\n- Arithmetic operators are useful for calculations such as salaries, prices, quantities, discounts and totals.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Arithmetic Operators",
          "snippet": "SELECT    10 + 20 AS addition,    20 - 10 AS subtraction,    10 * 20 AS multiplication,    20 / 10 AS division,    10 % 3 AS modulus;"
        }
      },
      {
        "title": "3. Comparison Operators",
        "content": "Comparison operators are used to compare two values or expressions. They are commonly used with the WHERE clause to filter records.\n\nOperatorDescriptionExample`=`Equal to`10 = 10``!=`Not equal to`10 != 20``<>`Not equal to`10 <> 20``>`Greater than`20 > 10``<`Less than`10 < 20``>=`Greater than or equal to`20 >= 20``<=`Less than or equal to`10 <= 20`**Example:**\n\nConsider an employees table:\n\nThe following query uses the greater-than operator:\n\n**Output:**\n\nThe query returns employees whose salary is greater than `50000`.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Comparison Operators",
          "snippet": "SELECT    name,    salaryFROM employeesWHERE salary > 50000;"
        }
      },
      {
        "title": "4. Logical Operators",
        "content": "Logical operators are used to combine or modify multiple conditions.\n\nOperatorDescriptionANDReturns TRUE when all conditions are trueORReturns TRUE when at least one condition is trueNOTReverses the result of a condition**Example:**\n\n**Output:**\n\n- Both conditions must be satisfied for a row to be returned.**Example:**\n\n**Output:**\n\n- The `OR` operator returns rows that satisfy at least one condition.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Logical Operators",
          "snippet": "SELECT    name,    salaryFROM employeesWHERE salary > 50000  AND salary < 70000;"
        }
      },
      {
        "title": "5. Special Operators",
        "content": "SQL also provides operators for specific filtering and conditional operations."
      },
      {
        "title": "6. BETWEEN",
        "content": "The BETWEEN operator checks whether a value falls within a specified range.\n\n**Output:**\n\n- BETWEEN includes both boundary values.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. BETWEEN",
          "snippet": "SELECT    name,    salaryFROM employeesWHERE salary BETWEEN 40000 AND 60000;"
        }
      },
      {
        "title": "7. IN",
        "content": "The IN operator checks whether a value matches any value in a specified list.\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. IN",
          "snippet": "SELECT    name,    salaryFROM employeesWHERE salary IN (40000, 70000);"
        }
      },
      {
        "title": "8. LIKE",
        "content": "The LIKE operator is used to search for a specific pattern in text values.\n\n**Output:**\n\n- Here, `%` represents zero or more characters.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. LIKE",
          "snippet": "SELECT    nameFROM employeesWHERE name LIKE 'A%';"
        }
      },
      {
        "title": "9. EXISTS",
        "content": "The EXISTS operator checks whether a subquery returns at least one row.\n\n**Output:**\n\n- The subquery checks whether at least one employee has a salary above 50000. If so, EXISTS returns TRUE and the query returns all employees.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. EXISTS",
          "snippet": "SELECT *FROM employees eWHERE EXISTS (    SELECT 1    FROM employees    WHERE salary > 50000);"
        }
      },
      {
        "title": "10. IS NULL",
        "content": "The IS NULL operator checks whether a value is NULL.\n\n**Output:**\n\n- This query returns employees whose manager_id is NULL, meaning they do not have a manager assigned.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. IS NULL",
          "snippet": "SELECT    nameFROM employeesWHERE manager_id IS NULL;"
        }
      },
      {
        "title": "11. IS NOT NULL",
        "content": "The IS NOT NULL operator checks whether a value is not NULL.\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 11. IS NOT NULL",
          "snippet": "SELECT    nameFROM employeesWHERE manager_id IS NOT NULL;"
        }
      },
      {
        "title": "12. Bitwise Operators",
        "content": "SQL bitwise operators are used to perform operations on the individual bits of integer values. These operators work on the binary representation of numbers and are commonly used with flags, permissions and status values."
      },
      {
        "title": "13. Types of Bitwise Operators",
        "content": "OperatorDescription`&`Bitwise AND`Bitwise OR`^`Bitwise XOR`~`Bitwise NOT`<<`Left Shift`>>`Right Shift**Note:** Bitwise operator support and syntax may vary between SQL database systems."
      },
      {
        "title": "14. Example",
        "content": "Consider the following values:\n\n**Output**\n\nFor a database system that supports these operators:\n\nA bitwise AND operation can be used to check whether a particular permission is enabled:\n\n**Output:**\n\nThe `&` operator checks whether the least significant bit of `permissions` is set to `1`. This can be used to determine whether a particular permission flag is enabled",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 14. Example",
          "snippet": "SELECT    12 & 10 AS bitwise_and,    12 | 10 AS bitwise_or,    12 ^ 10 AS bitwise_xor,    ~12 AS bitwise_not,    12 << 2 AS left_shift,    12 >> 2 AS right_shift;"
        }
      },
      {
        "title": "15. Compound Operators",
        "content": "Compound operators combine an arithmetic or bitwise operation with an assignment operation. They allow a value to be modified and assigned back to the same variable or column in a single statement."
      },
      {
        "title": "16. Types of Compound Operators",
        "content": "OperatorDescription`+=`Adds a value and assigns the result`-=`Subtracts a value and assigns the result`*=`Multiplies a value and assigns the result`/=`Divides a value and assigns the result`%=`Calculates modulus and assigns the result`&=`Performs bitwise AND and assigns the result`=``^=`Performs bitwise XOR and assigns the result"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Operators (Arithmetic, Comparison, Logical, Bitwise)",
      "initialCode": "SELECT    10 + 20 AS addition,    20 - 10 AS subtraction,    10 * 20 AS multiplication,    20 / 10 AS division,    10 % 3 AS modulus;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Operators (Arithmetic, Comparison, Logical, Bitwise) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Operators (Arithmetic, Comparison, Logical, Bitwise) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Operators (Arithmetic, Comparison, Logical, Bitwise)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Operators (Arithmetic, Comparison, Logical, Bitwise) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-command-types": {
    "id": "sql-command-types",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "22 min read",
    "level": "Beginner",
    "title": "SQL DDL, DQL, DML, DCL and TCL Commands",
    "subtitle": "Complete guide to SQL DDL, DQL, DML, DCL and TCL Commands — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL commands are fundamental building blocks used to perform given operations on database. The operations include queries of data. Creating a table, adding data to tables, dropping the table, modifying the table and setting permissions for users. Before learning SQL command types, it is important to understand some basic terms:\n\n- **Database: ** A collection of organized data.\n- **Table:** Stores data in rows and columns.\n- **Row (Record):** A single entry in a table.\n- **Column (Field):** An attribute of the data.\n- **Primary Key:** Uniquely identifies each record.\n- **Query:** A request to access or modify data.\n- **Constraint:** Rules applied to ensure valid data.SQL Commands are mainly categorized into five categories:\n\nSQL COMMANDS",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL DDL, DQL, DML, DCL and TCL Commands."
        }
      },
      {
        "title": "1. DDL - Data Definition Language",
        "content": "DDL (Data Definition Language) consists of SQL commands that can be used for defining, altering and deleting database structures such as tables, indexes and schemas. It simply deals with descriptions of the database schema and is used to create and modify the structure of database objects in the database\n\nCommandDescriptionSyntaxCREATECreate database or its objects (table, index, function, views, stored procedure and triggers)CREATE TABLE table_name (column1 data_type, column2 data_type, ...);DROPDelete objects from the databaseDROP TABLE table_name;ALTERAlter the structure of the databaseALTER TABLE table_name ADD COLUMN column_name data_type;TRUNCATERemove all records from a table, including all spaces allocated for the records are removedTRUNCATE TABLE table_name;COMMENTAdd comments to the data dictionaryCOMMENT ON TABLE table_name IS 'comment_text';RENAMERename an object existing in the databaseRENAME TABLE old_table_name TO new_table_name;"
      },
      {
        "title": "3. Example:",
        "content": "In this example, a new table called employees is created with columns for employee ID, first name, last name and hire date.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Example:",
          "snippet": "CREATE TABLE employees (    employee_id INT PRIMARY KEY,    first_name VARCHAR(50),    last_name VARCHAR(50),    hire_date DATE);"
        }
      },
      {
        "title": "2. DQL - Data Query Language",
        "content": "DQL is used to fetch data from the database. The main command is SELECT, which retrieves records based on the query. The output is returned as a result set (a temporary table) that can be viewed or used in applications.\n\nCommandDescriptionSyntaxSELECT\n\nIt is used to retrieve data from the database\n\nSELECT column1, column2, ...FROM table_name WHERE condition;\n\nFROM\n\nIndicates the table(s) from which to retrieve data.\n\nSELECT column1**FROM table_name;\n\nWHERE\n\nFilters rows before any grouping or aggregation\n\nSELECT column1\nFROM table_name\nWHERE condition;\n\nGROUP BY\n\nGroups rows that have the same values in specified columns.\n\nSELECT column1, AVG_FUNCTION(column2)\nFROM table_name\nGROUP BY column1;\n\nHAVING\n\nFilters the results of GROUP BY\n\nSELECT column1, AVG_FUNCTION(column2)\nFROM table_name\nGROUP BY column1\nHAVING condition;\n\nDISTINCT\n\nRemoves duplicate rows from the result set\n\nSELECT DISTINCT column1, column2, ...\nFROM table_name;\n\nORDER BY\n\nSorts the result set by one or more columns\n\nSELECT column1\nFROM table_name\nORDER BY column1 [ASC | DESC];\n\nLIMIT\n\nUsed to restrict the number of rows returned in a SELECT query (commonly supported in MySQL and PostgreSQL).\n\nSELECT * FROM table_name LIMIT number;\n\nNote:** DQL has only one command, SELECT. Other terms like FROM, WHERE, GROUP BY, HAVING, ORDER BY, DISTINCT and LIMIT are clauses of SELECT, not separate commands."
      },
      {
        "title": "5. Example:",
        "content": "This query retrieves employees first and last names, along with their hire dates, from the employees table, specifically for those in the 'Sales' department, sorted by hire date.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example:",
          "snippet": "SELECT first_name, last_name, hire_dateFROM employeesWHERE department = 'Sales'ORDER BY hire_date DESC;"
        }
      },
      {
        "title": "3. DML - Data Manipulation Language",
        "content": "DML commands are used to manipulate the data stored in database tables. With DML, you can insert new records, update existing ones, delete unwanted data or retrieve information.\n\nCommandDescriptionSyntaxINSERTInsert data into a tableINSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);UPDATEUpdate existing data within a tableUPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;DELETEDelete records from a database tableDELETE FROM table_name WHERE condition;"
      },
      {
        "title": "7. Example:",
        "content": "This query inserts a new record into employees table with first name 'Jane', last name 'Smith' and department 'HR'.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example:",
          "snippet": "INSERT INTO employees (first_name, last_name, department) VALUES ('Jane', 'Smith', 'HR');"
        }
      },
      {
        "title": "4. DCL - Data Control Language",
        "content": "DCL (Data Control Language) includes commands such as GRANT and REVOKE which mainly deal with the rights, permissions and other controls of the database system. These commands are used to control access to data in the database by granting or revoking permissions.\n\nCommandDescriptionSyntaxGRANTAssigns new privileges to a user account, allowing access to specific database objects, actions or functions.GRANT privilege_type [(column_list)] ON [object_type] object_name TO user [WITH GRANT OPTION];REVOKERemoves previously granted privileges from a user account, taking away their access to certain database objects or actions.REVOKE [GRANT OPTION FOR] privilege_type [(column_list)] ON [object_type] object_name FROM user [CASCADE];"
      },
      {
        "title": "9. Example:",
        "content": "This command grants the user user_name the permissions to select and update records in the employees table.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. Example:",
          "snippet": "GRANT SELECT, UPDATE ON employees TO user_name;"
        }
      },
      {
        "title": "5. TCL - Transaction Control Language",
        "content": "Transactions group a set of tasks into a single execution unit. Each transaction begins with a specific task and ends when all the tasks in the group are successfully completed. If any of the tasks fail, transaction fails. Therefore, a transaction has only two results: success or failure.\n\nCommandDescriptionSyntaxBEGIN TRANSACTIONStarts a new transactionBEGIN TRANSACTION [transaction_name];COMMITSaves all changes made during the transactionCOMMIT;ROLLBACKUndoes all changes made during the transactionROLLBACK;SAVEPOINTCreates a savepoint within the current transactionSAVEPOINT savepoint_name;"
      },
      {
        "title": "11. Example:",
        "content": "In this example, a transaction is started, changes are made and a savepoint is set. If needed, the transaction can be rolled back to the savepoint before being committed.\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 11. Example:",
          "snippet": "BEGIN TRANSACTION;UPDATE employees SET department = 'Marketing' WHERE department = 'Sales';SAVEPOINT before_update;UPDATE employees SET department = 'IT' WHERE department = 'HR';ROLLBACK TO SAVEPOINT before_update;COMMIT;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL DDL, DQL, DML, DCL and TCL Commands",
      "initialCode": "CREATE TABLE employees (    employee_id INT PRIMARY KEY,    first_name VARCHAR(50),    last_name VARCHAR(50),    hire_date DATE);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL DDL, DQL, DML, DCL and TCL Commands ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL DDL, DQL, DML, DCL and TCL Commands in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL DDL, DQL, DML, DCL and TCL Commands",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL DDL, DQL, DML, DCL and TCL Commands is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-database-ops": {
    "id": "sql-database-ops",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "12 min read",
    "level": "Beginner",
    "title": "SQL Database Operations (CREATE, SELECT, RENAME, DROP)",
    "subtitle": "Complete guide to SQL Database Operations (CREATE, SELECT, RENAME, DROP) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL databases or relational databases are widely used for storing, managing and organizing structured data in a tabular format. These databases store data in tables consisting of rows and columns. SQL is the standard programming language used to interact with these databases. It enables users to create, update, retrieve and manage data effectively.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Database Operations (CREATE, SELECT, RENAME, DROP)."
        }
      },
      {
        "title": "2. Why Do SQL Databases Exist?",
        "content": "- **Efficient Data Handling**: SQL databases are designed to store, retrieve and manipulate structured data effectively.\n- **Reliability**: They ensure data consistency and integrity, making them ideal for high priority applications.\n- **Complex Relationships**: SQL databases can model complex data relationships, essential for transactional and enterprise systems.\n- **Transaction Support**: They provide reliable transaction processing, ensuring consistency even under high-demand scenarios.\n- **Scalability**: SQL databases efficiently scale to handle growing data volumes while maintaining performance.\n- **ACID Compliance**: SQL databases guarantee data accuracy and reliability through ACID properties (Atomicity, Consistency, Isolation, Durability).\n- **Universal Adoption**: As the standard for relational data, SQL databases are widely used across industries, from business to government."
      },
      {
        "title": "3. How SQL Databases Work",
        "content": "SQL databases work using a client-server system. The database server stores all the data, while the client interacts with the server by sending queries to retrieve or update the data.\n\n- **Data Storage**: Data is stored in tables, each containing rows and columns. Each column defines a specific attribute, and each row represents a unique entity or record.\n- **Query Processing**: When a user submits a query, the database server processes it by parsing the SQL command, optimizing the query for performance, and executing it to retrieve or manipulate the data.\n- **Data Retrieval**: SQL queries can retrieve specific data using `SELECT` statements and filter results using `WHERE` clauses. The server returns the queried data in a structured format for use by applications."
      },
      {
        "title": "4. SQL Database Management",
        "content": "It explains the key processes involved in creating, selecting, renaming and dropping SQL databases. Understanding these commands is essential for managing your databases effectively.\n\n1. **CREATE Database**\n\nThe `CREATE DATABASE` command is used to initialize a new database. It creates an empty database that acts as a container for your tables and other database objects. It allows you to organize and manage data easily.\n\n**Example:**\n\n2. **SELECT Database**\n\nThe USE or `SELECT DATABASE` command allows you to select a specific database for the current session. Once selected, the database becomes the active database, and all subsequent queries will be executed on it. This command is essential when working with multiple databases.\n\n3. **RENAME Database**\n\n`The ``RENAME DATABASE` command can be used where you need to rename an existing database. All databases does not support this command, it can be useful when we need to update the name of a database to show its content.\n\n4. **DROP Database**\n\nThe `DROP DATABASE` command is used to permanently delete a database, along with all its tables, data and objects. This action is irreversible, so it should be used carefully. It is helpful when you no longer need a database and want to free up system resources.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. SQL Database Management",
          "snippet": "CREATE DATABASE test_db;"
        }
      },
      {
        "title": "5. Difference Between SQL and NoSQL Databases",
        "content": "Below you will find the key differences between SQL and NoSQL databases:\n\n**Feature****SQL Databases****NoSQL Databases****Data Structure**Tables with rows and columns.Key-value pairs, documents, columns, graphs.**Schema**Fixed schema.Flexible schema.**Data Integrity**ACID compliance for consistency.Eventual consistency.**Scalability**Vertically scalable.Horizontally scalable.**Query Language**Uses SQL for queries.Various query languages (e.g., MongoDB, Cassandra).**Transactions**Supports ACID transactions.Limited transaction support.**Use Cases**Best for structured data and complex queries.Ideal for unstructured data and scalability.**Examples**MySQL, PostgreSQL, SQL Server.MongoDB, Cassandra, Redis.**Relationships**Supports complex joins and relationships.Limited relationship support.**Flexibility**Less flexible.Highly flexible."
      },
      {
        "title": "6. Conclusion",
        "content": "SQL databases are used for managing structured data in many applications. They provide various benefits such as data consistency, optimized performance, scalibility and minimum redundancy. SQL Databases are ideal for handling complex queries and transactional systems.\n\nComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Database Operations (CREATE, SELECT, RENAME, DROP)",
      "initialCode": "CREATE DATABASE test_db;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Database Operations (CREATE, SELECT, RENAME, DROP) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Database Operations (CREATE, SELECT, RENAME, DROP) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Database Operations (CREATE, SELECT, RENAME, DROP)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Database Operations (CREATE, SELECT, RENAME, DROP) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-create-table": {
    "id": "sql-create-table",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "16 min read",
    "level": "Beginner",
    "title": "SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE",
    "subtitle": "Complete guide to SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The CREATE TABLE statement in SQL is used to define a new table in a database. It specifies the table structure including column names and their data types.\n\n- Used to create a new table in a database.\n- Defines column names and their data types.\n- Helps in organizing and storing data systematically",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **table_name**: The name you assign to the new table.\n- **column1, column2, ... **: The names of the columns in the table.\n- **datatype(size):** Defines the data type and size of each column.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "CREATE TABLE table_name\n(\ncolumn1 datatype (size),\ncolumn2 datatype (size),\n.\n.\ncolumnN datatype(size)\n);"
        }
      },
      {
        "title": "3. Query",
        "content": "Query examples and implementation details for **Query**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Query",
          "snippet": "CREATE TABLE customer(\n    customer_id INT PRIMARY KEY,\n    first_name VARCHAR(50),\n    last_name VARCHAR(50),\n    country VARCHAR(50),\n    age INT CHECK (age >= 0 AND age <= 99),\n    phone INT(10)\n);"
        }
      },
      {
        "title": "4. Inserting Data into the Table",
        "content": "After creating the table, you can use INSERT INTO command to add data into it. Here is how to add some sample records into the customer table:\n\n**Output:**\n\n**Note:** If you are working with a large amount of data, consider using bulk inserts or importing data from external files to optimize performance.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Inserting Data into the Table",
          "snippet": "INSERT INTO customer (customer_id, first_name, last_name, country, age, phone)\nVALUES\n(1, 'Luca', 'Bianchi', 'Italy', 23, 'xxxxxxxxxx'),\n(2, 'Aiko', 'Tanaka', 'Japan', 21, 'xxxxxxxxxx'),\n(3, 'Carlos', 'Gomez', 'Spain', 24, 'xxxxxxxxxx'),\n(4, 'Sofia', 'Müller', 'Germany', 22, 'xxxxxxxxxx'),\n(5, 'Ethan', 'Johnson', 'USA', 25, 'xxxxxxxxxx');"
        }
      },
      {
        "title": "5. Create Table from Existing Table",
        "content": "The CREATE TABLE AS SELECT statement creates a new table using selected columns and data from an existing table."
      },
      {
        "title": "6. Syntax",
        "content": "Query examples and implementation details for **Syntax**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Syntax",
          "snippet": "CREATE TABLE new_table_name AS\nSELECT column1, column2, ...\nFROM existing_table_name;"
        }
      },
      {
        "title": "7. Example",
        "content": "**Output:**\n\n**Note:** We can use * instead of column name to copy whole table to another table.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example",
          "snippet": "CREATE TABLE customer_subset AS\nSELECT customer_id, first_name\nFROM customer;"
        }
      },
      {
        "title": "8. Tips for Using CREATE TABLE",
        "content": "To ensure the smooth creation and management of your tables, keep these points in mind:\n\n1. The CREATE TABLE statement can also define constraints like NOT NULL, UNIQUE and DEFAULT.\n\n**2. **If you attempt to create a table that already exists, SQL will throw an error. To avoid this, you can use the IF NOT EXISTS clause.\n\n**3. **Always define appropriate data types for each column (e.g., VARCHAR(50) for names and INT for IDs) to optimize performance and storage.\n\n**4. **After creating a table, use the following command to view the structure of your table:\n\n**5. **If you need to change the table’s structure after creation (e.g., renaming a column, adding a new column), use the ALTER TABLE statement.\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Tips for Using CREATE TABLE",
          "snippet": "CREATE TABLE IF NOT EXISTS customer (...);"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE",
      "initialCode": "CREATE TABLE table_name\n(\ncolumn1 datatype (size),\ncolumn2 datatype (size),\n.\n.\ncolumnN datatype(size)\n);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL CREATE TABLE, ALTER, TRUNCATE & DROP TABLE is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-aliases-comments": {
    "id": "sql-aliases-comments",
    "badge": "Module 1 • SQL & PostgreSQL",
    "readingTime": "10 min read",
    "level": "Beginner",
    "title": "SQL Aliases (AS) and Schema Documentation",
    "subtitle": "Complete guide to SQL Aliases (AS) and Schema Documentation — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In SQL, aliases provide temporary names for columns or tables to make queries cleaner and easier to understand. They are especially helpful in complex queries or when dealing with lengthy names.\n\n**Example:** First, we create a demo SQL database and table, on which we will use the Aliases command.\n\n**Query:**\n\n**Output:**\n\n- The query selects the emp_id column from the employees table.\n- It assigns a temporary alias id to the emp_id column in the result set.\n- The output displays the employee IDs under the column name id.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "SELECT emp_id AS id\nFROM employees;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Aliases (AS) and Schema Documentation."
        }
      },
      {
        "title": "2. Types of aliases",
        "content": "There are two types of aliases:"
      },
      {
        "title": "3. Column Aliases",
        "content": "A column alias is used to rename a column just for the output of a query. They are useful when:\n\n- Displaying aggregate data\n- Making results more readable\n- Performing calculations**Syntax:**\n\n- **column_name:** column on which we are going to create an alias name.\n- **alias_name:** temporary name that we are going to assign for the column or table.\n- **AS:** It is optional. If you have not specified it, there is no effect on the query execution. Let's understand Aliases in SQL with the help of example. First, we will create a demo SQL database and table, on which we will use the Aliases command.\n\n**Query:**\n\n**Output:**\n\n- The output displays customer IDs under the column name id.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Column Aliases",
          "snippet": "SELECT column_name AS alias_name\nFROM table_name;"
        }
      },
      {
        "title": "4. Table Aliases",
        "content": "A table alias is used when you want to give a table a temporary name for the duration of a query.\n\n**Query:**\n\n**Output:**\n\n- The query uses table aliases (c1 and c2) for the same customer table.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Table Aliases",
          "snippet": "SELECT DISTINCT c1.customer_name, c1.country\nFROM customer AS c1\nJOIN customer AS c2\nON c1.age = c2.age\nAND c1.country = c2.country\nAND c1.customer_id <> c2.customer_id;"
        }
      },
      {
        "title": "5. Combining Column & Table Aliases",
        "content": "We want to fetch customers who are aged 21 or older and rename the columns for better clarity. We will use both table and column aliases.\n\n**Query:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Combining Column & Table Aliases",
          "snippet": "SELECT c.customer_name AS name,\n       c.country AS location\nFROM customer AS c\nWHERE c.age >= 21;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Aliases (AS) and Schema Documentation",
      "initialCode": "SELECT emp_id AS id\nFROM employees;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Aliases (AS) and Schema Documentation ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Aliases (AS) and Schema Documentation in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Aliases (AS) and Schema Documentation",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Aliases (AS) and Schema Documentation is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-select-query": {
    "id": "sql-select-query",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "22 min read",
    "level": "Beginner",
    "title": "SQL SELECT Query & Projection",
    "subtitle": "Complete guide to SQL SELECT Query & Projection — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL SELECT statement is used to retrieve data from one or more tables and display it in a structured format of rows and columns.\n\n- Fetches all columns using * or specific columns by name.\n- Filters and sorts data using WHERE and ORDER BY.\n- Supports grouping, aggregation and table relationships using GROUP BY, HAVING and JOIN.**Example:** First, we create a demo SQL table, on which we use the SELECT query.\n\ncustomers**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "SELECT customers_id, first_nameFROM customers;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL SELECT Query & Projection."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **column1, column2:** columns you want to retrieve.\n- **table_name:** name of the table you're querying.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "SELECT column1,column2.... FROM table_name;"
        }
      },
      {
        "title": "3. Working",
        "content": "The SELECT statement is used to retrieve and display data from one or more tables in a structured and readable format."
      },
      {
        "title": "4. Example 1: Select Specific Columns",
        "content": "In this example, we will demonstrate how to retrieve specific columns from the customerss table. Here we will fetch only first_name and last_name for each record.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Select Specific Columns",
          "snippet": "SELECT first_name, last_name FROM customers;"
        }
      },
      {
        "title": "5. Example 2: Select All Columns",
        "content": "In this example, we will fetch all the fields from table customerss:\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Select All Columns",
          "snippet": "SELECT * FROM customers;"
        }
      },
      {
        "title": "6. Example 3: SELECT Statement with WHERE Clause",
        "content": "Suppose we want to see table values with specific conditions then WHERE Clause is used with select statement. In this example, filter customers who are 21 years old.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: SELECT Statement with WHERE Clause",
          "snippet": "SELECT first_nameFROM customersWHERE age = 21;"
        }
      },
      {
        "title": "7. Example 4: SELECT with GROUP BY Clause",
        "content": "In this example, we will use SELECT statement with GROUP BY Clause to group rows and perform aggregation. Here, we will count the number of customers from each country.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example 4: SELECT with GROUP BY Clause",
          "snippet": "SELECT country, COUNT(*) AS customer_countFROM customersGROUP BY country;"
        }
      },
      {
        "title": "8. Example 5: SELECT with DISTINCT Clause",
        "content": "In this example, we will use DISTINCT keyword to return only unique values from a column. Here, we will fetch unique countries from the customers table.\n\n**Query: **\n\n**Output: **",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Example 5: SELECT with DISTINCT Clause",
          "snippet": "SELECT DISTINCT countryFROM customers;"
        }
      },
      {
        "title": "9. Example 6: SELECT Statement with HAVING Clause",
        "content": "The HAVING clause is used to filter results after applying GROUP BY. In this example, we will find countries that have 2 or more customers in the customers table.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. Example 6: SELECT Statement with HAVING Clause",
          "snippet": "SELECT country, COUNT(*) AS customer_countFROM customersGROUP BY countryHAVING COUNT(*) >= 2;"
        }
      },
      {
        "title": "10. Example 7: SELECT Statement with ORDER BY clause",
        "content": "In this example, we will use SELECT Statement with ORDER BY clause. Here, Sort results by Age in descending order.\n\n**Query: **\n\n**Output: **",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. Example 7: SELECT Statement with ORDER BY clause",
          "snippet": "SELECT *FROM customersORDER BY age DESC;"
        }
      },
      {
        "title": "11. Example 8: SELECT Statement with LIMIT clause",
        "content": "In this example, we will use SELECT Statement with LIMIT clause\n\n**Query: **\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 11. Example 8: SELECT Statement with LIMIT clause",
          "snippet": "SELECT * FROM customersLIMIT 3;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL SELECT Query & Projection",
      "initialCode": "SELECT customers_id, first_nameFROM customers;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL SELECT Query & Projection ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL SELECT Query & Projection in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL SELECT Query & Projection",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL SELECT Query & Projection is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-insert-statement": {
    "id": "sql-insert-statement",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "14 min read",
    "level": "Beginner",
    "title": "SQL INSERT INTO & Bulk Multi-Row Inserts",
    "subtitle": "Complete guide to SQL INSERT INTO & Bulk Multi-Row Inserts — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL INSERT INTO statement is used to add new records into a table. It allows inserting data into all columns or specific ones, depending on the requirement.\n\n- Can insert a single row or multiple rows at once.\n- Supports inserting data directly or from another table using a subquery.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL INSERT INTO & Bulk Multi-Row Inserts."
        }
      },
      {
        "title": "2. Working",
        "content": "The INSERT INTO statement is used to add new records to a table. It can insert single rows, multiple rows, selected columns or data from another table."
      },
      {
        "title": "3. Inserting Data into All Columns",
        "content": "This method inserts values into all columns of a table by providing values in the same order as the columns are defined.\n\n**Syntax:**\n\n- **table_name:** name of the table where data will be inserted\n- **value1, value2... :** values that correspond to each column in order.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Inserting Data into All Columns",
          "snippet": "INSERT INTO table_name VALUES (value1, value2, value3, ...);"
        }
      },
      {
        "title": "4. Example",
        "content": "First, create a table named student.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example",
          "snippet": "INSERT INTO studentVALUES (5, 'Isabella', 'Rome', 'xxxxxxxxxx', 19);"
        }
      },
      {
        "title": "5. Inserting Data into Specific Columns",
        "content": "In some cases, you might want to insert data into only certain columns, leaving the others empty or with default values. In such cases, we can specify the column names explicitly.\n\n**Syntax:**\n\n- **table_name:** name of the table.\n- **column1, column2..:** name of first column, second column.\n- **value1, value2, value3..:**  the values for each specified column of the new record.**Example:** If we want to insert the roll_no, name and age into the student table and leave the address and phone number as NULL (the default value).\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Inserting Data into Specific Columns",
          "snippet": "INSERT INTO table_name (column1, column2, column3, ...)VALUES (value1, value2, value3, ...);"
        }
      },
      {
        "title": "6. Inserting Multiple Rows at Once",
        "content": "Instead of running multiple INSERT INTO commands, you can insert multiple rows into a table in a single query. This is more efficient and reduces the number of database operations.\n\n**Syntax:**\n\n**Example:** If we want to add multiple students to student table in one go, query would look like this:\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Inserting Multiple Rows at Once",
          "snippet": "INSERT INTO table_name (column1, column2, ...)VALUES (value1, value2, ...), (value1, value2, ...), (value1, value2, ...);"
        }
      },
      {
        "title": "7. Inserting Data from One Table into Another Table",
        "content": "We can copy records from old_student to student using the INSERT INTO SELECT statement.\n\nold_studentTable**Method 1:** Insert All Columns from Another Table\n\nInserts every column from source table into destination table.\n\n**Syntax:**\n\n**Example:** If you want to copy all data from the old_student table into the student table, use this query:\n\n**Output:**\n\n**Method 2:** Insert Specific Columns from Another Table\n\nAllows inserting only selected columns from the source table.\n\n**Syntax:**\n\n**Example:** If we want to copy only the Name and Age columns from old_student into student:\n\n**Output:**\n\n**Method 3:** Insert Specific Rows Based on Condition\n\nWe can also insert specific rows based on a condition by using the WHERE clause with the SELECT statement.\n\n**Syntax:**\n\n**Example:** If we want to copy only students older than 20 years from old_student to student, we would write:\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Inserting Data from One Table into Another Table",
          "snippet": "INSERT INTO target_tableSELECT * FROM source_table;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL INSERT INTO & Bulk Multi-Row Inserts",
      "initialCode": "INSERT INTO table_name VALUES (value1, value2, value3, ...);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL INSERT INTO & Bulk Multi-Row Inserts ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL INSERT INTO & Bulk Multi-Row Inserts in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL INSERT INTO & Bulk Multi-Row Inserts",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL INSERT INTO & Bulk Multi-Row Inserts is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-update-statement": {
    "id": "sql-update-statement",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "12 min read",
    "level": "Beginner",
    "title": "SQL UPDATE Statement & Conditional Modifications",
    "subtitle": "Complete guide to SQL UPDATE Statement & Conditional Modifications — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL UPDATE statement is used to modify existing data in a table by changing the values of one or more columns.\n\n- The WHERE clause specifies which rows should be updated.\n- Without WHERE, all rows in the table are modified.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL UPDATE Statement & Conditional Modifications."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **table_name: **Name of the table you want to update.\n- **SET: **The column(s) you want to update and their new values.\n- **WHERE: **Filters the specific rows you want to update. **Note: **The SET keyword assigns new values to columns, while the WHERE clause selects which rows to update. Without WHERE, all rows will be updated.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "UPDATE table_nameSET column1 = value1,    column2 = value2WHERE condition;"
        }
      },
      {
        "title": "3. Working",
        "content": "Consider the customer table shown below, which contains each customer’s unique ID, name, last name, phone number and country. This table will be used to demonstrate how the SQL UPDATE statement works."
      },
      {
        "title": "4. Example 1: Update Single Column",
        "content": "We have a customer table and we want to update the Age to 25 for the customer whose customer_name is 'Isabella'.\n\n**Query:**\n\n**Output:**\n\n- The query updates the age to 25 for the customer named 'Isabella'.\n- It affects only the row where customer_name = 'Isabella'.\n- It is used to modify existing data in a specific record.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Update Single Column",
          "snippet": "UPDATE customerSET  age = 25WHERE  customer_name = 'Isabella';"
        }
      },
      {
        "title": "5. Example 2: Updating Multiple Columns",
        "content": "We need to update both the customer_name and country for a specific customer_id.\n\n**Query:**\n\n**Output**:\n\n- The query targets the row where customer_id = 1.\n- It updates customer_name to 'John' and country to 'Spain'.\n- Both columns are updated simultaneously in a single SQL statement.**Note:** For updating multiple columns we have used comma( , ) to separate the names and values of two columns.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Updating Multiple Columns",
          "snippet": "UPDATE customer SET  customer_name = 'John',          country = 'Spain' WHERE customer_id = 1;"
        }
      },
      {
        "title": "6. Example 3: Omitting WHERE Clause in UPDATE Statement",
        "content": "If we accidentally omit the WHERE clause, all the rows in the table will be updated, which is a common mistake. Let’s update the customer_namefor every record in the table:\n\n**Query:**\n\n**Output:**\n\n- Updates the customer_name to 'Mike' for all rows in the customer table.\n- It affects every record because no WHERE clause is used.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: Omitting WHERE Clause in UPDATE Statement",
          "snippet": "UPDATE customerSET  customer_name = 'Mike';"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL UPDATE Statement & Conditional Modifications",
      "initialCode": "UPDATE table_nameSET column1 = value1,    column2 = value2WHERE condition;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL UPDATE Statement & Conditional Modifications ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL UPDATE Statement & Conditional Modifications in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL UPDATE Statement & Conditional Modifications",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL UPDATE Statement & Conditional Modifications is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-delete-statement": {
    "id": "sql-delete-statement",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "14 min read",
    "level": "Beginner",
    "title": "SQL DELETE Statement vs TRUNCATE",
    "subtitle": "Complete guide to SQL DELETE Statement vs TRUNCATE — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL DELETE statement is used to remove specific rows from a table while keeping the table structure intact. It is different from DROP, which deletes the entire table.\n\n- Removes rows based on conditions.\n- Retains table schema, constraints and indexes.\n- Can delete a single row or all rows. **Example: **First, we create a demo SQL database and table, on which we will use the SQL DELETE command.\n\n**Query:**\n\n**Output:**\n\n- This query deletes the row from the employees table where the employee_id is 5.\n- Only that specific record is removed; all other rows remain unchanged.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "DELETE FROM employeeWHERE employee_id = 5;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL DELETE Statement vs TRUNCATE."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **Some_condition: **A condition used to filter the rows you want to delete.\n- **table_name: **The name of the table from which you want to delete the rows.**Note:** We can delete single or multiple records using the WHERE clause; if it’s omitted, all records in the table are removed.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "DELETE FROM table_name WHERE some_condition;"
        }
      },
      {
        "title": "3. Working with the DELETE Statement",
        "content": "Consider the employee table in SQL, which stores employee details such as id, name, email and department, as shown below.\n\nemployees Table"
      },
      {
        "title": "4. Example 1: Deleting Single Record",
        "content": "We can use the DELETE statement with a condition to delete one or more rows that match the given condition a table. The WHERE clause ensures only the intended record is removed. We can delete the records named Ethan by using the below query:\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Deleting Single Record",
          "snippet": "DELETE FROM employees WHERE name = 'Ethan';"
        }
      },
      {
        "title": "5. Example 2: Deleting Multiple Records",
        "content": "To delete multiple records, you can specify a condition that matches several rows. Let's delete the rows from the table  employees where the department is \"Development\".\n\n**Query:**\n\n**Output**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Deleting Multiple Records",
          "snippet": "DELETE FROM employees WHERE department = 'Development';"
        }
      },
      {
        "title": "6. Example 3: Delete All Records from a Table",
        "content": "To delete all records from a table, omit the WHERE clause in the DELETE statement. The use of an asterisk (*) with DELETE is invalid in SQL.\n\n**Query:**\n\n**Output:**\n\n- All of the records in the table will be deleted, there are no records left to display. The table employees will become empty.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: Delete All Records from a Table",
          "snippet": "DELETE FROM employees;"
        }
      },
      {
        "title": "7. Rolling Back DELETE Operations",
        "content": "Since the DELETE statement is a DML operation, it can be rolled back when executed in a statement. If you accidentally delete records or need to repeat the process, you can use the ROLLBACK command.\n\n**Query:**\n\n- The ROLLBACK command will undo the changes made by the DELETE statement, effectively restoring the records that were deleted during the transaction.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Rolling Back DELETE Operations",
          "snippet": "BEGIN TRANSACTION;DELETE FROM employeesWHERE department = 'Development';ROLLBACK;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL DELETE Statement vs TRUNCATE",
      "initialCode": "DELETE FROM employeeWHERE employee_id = 5;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL DELETE Statement vs TRUNCATE ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL DELETE Statement vs TRUNCATE in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL DELETE Statement vs TRUNCATE",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL DELETE Statement vs TRUNCATE is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-where-clause": {
    "id": "sql-where-clause",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "18 min read",
    "level": "Beginner",
    "title": "SQL WHERE Clause & Predicate Filtering",
    "subtitle": "Complete guide to SQL WHERE Clause & Predicate Filtering — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL provides the WHERE clause to filter rows based on one or more conditions. It ensures that queries return or modify only the required records.\n\n- Filters data based on specified conditions.\n- Used with SELECT, UPDATE and DELETE statements.\n- Works with comparison and logical operators.**Example: **First, we will create a demo SQL database and employee table, on which we will use the WHERE Clause command.\n\n**Query: **\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "SELECT name, department, salaryFROM employeeWHERE salary > 50000;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL WHERE Clause & Predicate Filtering."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **column1, column2:** Columns you want to retrieve.\n- **table_name:** Table you are querying from.\n- **operator:** Comparison logic (e.g., =, <, >, LIKE).\n- **value:** The value or pattern to filter against.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "SELECT column1, column2FROM table_nameWHERE column_name operator value;"
        }
      },
      {
        "title": "3. Examples",
        "content": "We will create a basic employees table structure in SQL for performing all the where clause operation."
      },
      {
        "title": "4. Example 1: Where Clause with Logical Operators",
        "content": "To fetch records of  Employee with age equal to 24.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Where Clause with Logical Operators",
          "snippet": "SELECT * FROM employees WHERE age=24;"
        }
      },
      {
        "title": "5. Example 2: WHERE with Comparison Operators",
        "content": "To fetch the emp_id, Name and Country of employees with age greater than 21.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: WHERE with Comparison Operators",
          "snippet": "SELECT emp_id, name, country FROM employees WHERE age > 21;"
        }
      },
      {
        "title": "6. Example 3: Where Clause with BETWEEN Operator",
        "content": "The BETWEEN operator is used to filter records within a specified range and it includes both the start and end values. In this example, we want to find employees whose age is between 22 and 24, including both 22 and 24.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: Where Clause with BETWEEN Operator",
          "snippet": "SELECT * FROM employeesWHERE age BETWEEN 22 AND 24;"
        }
      },
      {
        "title": "7. Example 4: Where Clause with LIKE Operator",
        "content": "The LIKE operator is used to filter data by matching a specific pattern in the WHERE clause. In this example, we retrieve records of employees whose names start with the letter 'L'.\n\n- The % wildcard represents any number of characters (including zero).\n- The _ wildcard represents exactly one character. **Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example 4: Where Clause with LIKE Operator",
          "snippet": "SELECT * FROM employees WHERE name LIKE 'L%';"
        }
      },
      {
        "title": "8. Example 5: Where Clause with IN Operator",
        "content": "The IN operator filters data by matching a column against multiple specified values. Here, we find employees whose age is 21 or 23.\n\n**Query:**\n\n**Output: **",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Example 5: Where Clause with IN Operator",
          "snippet": "SELECT name FROM employeesWHERE age IN (21,23);"
        }
      },
      {
        "title": "9. Operators Used in WHERE Clause",
        "content": "**Operator****Description**>Greater Than>=Greater than or Equal to<Less Than<=Less than or Equal to=Equal to<>Not Equal toBETWEENIn an inclusive RangeLIKESearch for a patternINTo specify multiple possible values for a columnComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL WHERE Clause & Predicate Filtering",
      "initialCode": "SELECT name, department, salaryFROM employeeWHERE salary > 50000;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL WHERE Clause & Predicate Filtering ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL WHERE Clause & Predicate Filtering in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL WHERE Clause & Predicate Filtering",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL WHERE Clause & Predicate Filtering is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-group-order-having": {
    "id": "sql-group-order-having",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "8 min read",
    "level": "Beginner",
    "title": "GROUP BY, HAVING & ORDER BY Clauses in SQL",
    "subtitle": "Complete guide to GROUP BY, HAVING & ORDER BY Clauses in SQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. GROUP BY Clause: Aggregating Rows into Summary Groups",
        "content": "The **`GROUP BY`** statement in SQL groups rows that have the same values in specified columns into summary rows. It is almost always used alongside aggregate functions (`COUNT()`, `SUM()`, `AVG()`, `MAX()`, `MIN()`) to compute metrics per category, department, or time period.\n\nIn the SQL logical query execution order, `GROUP BY` runs **after** `FROM` and `WHERE`, and **before** `HAVING`, `SELECT`, and `ORDER BY`.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. GROUP BY Clause: Aggregating Rows into Summary Groups",
          "snippet": "SELECT department, COUNT(*) AS employee_count, ROUND(AVG(salary), 2) AS avg_salary\nFROM employees\nWHERE is_active = TRUE\nGROUP BY department;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for GROUP BY, HAVING & ORDER BY Clauses in SQL."
        }
      },
      {
        "title": "2. HAVING Clause: Filtering Aggregated Groups",
        "content": "While the `WHERE` clause filters individual rows **before** grouping, the **`HAVING`** clause filters aggregated groups **after** `GROUP BY` has been applied. You cannot use aggregate functions like `SUM(sales) > 10000` inside a `WHERE` clause — you must use `HAVING`.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. HAVING Clause: Filtering Aggregated Groups",
          "snippet": "SELECT department, COUNT(*) AS headcount, AVG(salary) AS avg_salary\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 5 AND AVG(salary) > 75000;"
        }
      },
      {
        "title": "3. ORDER BY Clause: Sorting Query Results",
        "content": "The **`ORDER BY`** clause sorts the final result set by one or more columns or expressions in ascending (`ASC`, default) or descending (`DESC`) order. In PostgreSQL and standard SQL, you can also control null placement using `NULLS FIRST` or `NULLS LAST`.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. ORDER BY Clause: Sorting Query Results",
          "snippet": "SELECT employee_id, full_name, department, salary\nFROM employees\nORDER BY department ASC, salary DESC NULLS LAST\nLIMIT 20;"
        }
      },
      {
        "title": "4. Advanced Grouping: GROUPING SETS, ROLLUP & CUBE",
        "content": "Modern relational databases (PostgreSQL, SQL Server, Oracle) support advanced analytical grouping extensions:\n\n- **`ROLLUP(a, b)`**: Generates hierarchical subtotals and a grand total.\n- **`CUBE(a, b)`**: Computes subtotals for all possible combinations of the specified dimensions.\n- **`GROUPING SETS`**: Explicitly defines multiple custom grouping combinations in a single pass.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Advanced Grouping: GROUPING SETS, ROLLUP & CUBE",
          "snippet": "SELECT region, quarter, SUM(revenue) AS total_revenue\nFROM sales\nGROUP BY ROLLUP (region, quarter)\nORDER BY region, quarter;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: GROUP BY, HAVING & ORDER BY Clauses in SQL",
      "initialCode": "SELECT department, COUNT(*) AS employee_count, ROUND(AVG(salary), 2) AS avg_salary\nFROM employees\nWHERE is_active = TRUE\nGROUP BY department;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: GROUP BY, HAVING & ORDER BY Clauses in SQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing GROUP BY, HAVING & ORDER BY Clauses in SQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via GROUP BY, HAVING & ORDER BY Clauses in SQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "GROUP BY, HAVING & ORDER BY Clauses in SQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-with-cte": {
    "id": "sql-with-cte",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "12 min read",
    "level": "Beginner",
    "title": "SQL WITH Clause & Common Table Expressions (CTEs)",
    "subtitle": "Complete guide to SQL WITH Clause & Common Table Expressions (CTEs) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL WITH clause (Common Table Expression or CTE) defines a temporary result set that can be used within a query. It simplifies complex SQL statements, making them easier to read, manage and reuse.\n\n- **WITH: **Starts the CTE definition, creating a temporary result set.\n- **QueryName:** User-defined name to reference the CTE later.\n- **AS:** Connects the CTE name with its subquery.\n- **( ) : **Encloses the subquery (e.g., a SELECT statement).\n- **Subquery:** Provides data for the CTE, improving readability and reuse.\n- **Flow:** Syntax, WITH QueryName AS (Subquery) followed by the main query.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL WITH Clause & Common Table Expressions (CTEs)."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- cte_name is the name of the Common Table Expression.\n- The query inside parentheses defines the temporary result set.\n- The main query uses this CTE as if it were a table.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "WITH cte_name (column1, column2, ...)AS (    SELECT column1, column2, ...    FROM table_name    WHERE condition)SELECT *FROM cte_name;"
        }
      },
      {
        "title": "3. Examples",
        "content": "First, we will create a demo SQL database and table, on which we will use the WITH Clause command."
      },
      {
        "title": "4. Example 1: Finding employees with Above-Average Salary",
        "content": "This example finds employees whose salary is above the overall average salary.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Finding employees with Above-Average Salary",
          "snippet": "WITH avg_salary_cte (average_salary) AS (    SELECT AVG(salary)    FROM employees)SELECT employee_id, name, salaryFROM employeesWHERE salary > (    SELECT average_salary    FROM avg_salary_cte);"
        }
      },
      {
        "title": "5. Example 2: Finding employees with the Lowest Salary",
        "content": "In this example, we find the employee or employees who earn the lowest salary in the company.\n\n**Query:**\n\n**Output:**\n\n- **CTE:** Calculates the lowest salary using MIN(salary).\n- **Main SELECT:** Retrieves employee details.\n- **WHERE Filter:** Returns employees whose salary equals the lowest salary.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Finding employees with the Lowest Salary",
          "snippet": "WITH min_salary_cte (min_salary) AS (    SELECT MIN(salary)    FROM employees)SELECT employee_id, name, salaryFROM employeesWHERE salary = (    SELECT min_salary    FROM min_salary_cte);"
        }
      },
      {
        "title": "6. Nested (Chained) WITH Clauses",
        "content": "A Nested or Chained WITH Clause defines multiple CTEs in one query, where each CTE can use the result of the previous one to simplify complex calculations.\n\n**Output: **\n\n- **dept_avg:** Calculates the average salary for each department.\n- **ranked_employees:** Ranks employees by salary within each department.\n- **Final SELECT:** Returns the highest-paid employee(s) from each department, including ties.**Note: **When a query with a WITH clause runs, the subquery inside it is executed first to create a temporary result set, which is then used by the main query.\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Nested (Chained) WITH Clauses",
          "snippet": "WITH dept_avg AS (    SELECT department, AVG(salary) AS avg_salary    FROM employees    GROUP BY department),ranked_employees AS (    SELECT        e.employee_id,        e.name,        e.department,        e.salary,        d.avg_salary,        RANK() OVER (            PARTITION BY e.department            ORDER BY e.salary DESC        ) AS salary_rank    FROM employees AS e    JOIN dept_avg AS d        ON e.department = d.department)SELECT *FROM ranked_employeesWHERE salary_rank = 1;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL WITH Clause & Common Table Expressions (CTEs)",
      "initialCode": "WITH cte_name (column1, column2, ...)AS (    SELECT column1, column2, ...    FROM table_name    WHERE condition)SELECT *FROM cte_name;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL WITH Clause & Common Table Expressions (CTEs) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL WITH Clause & Common Table Expressions (CTEs) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL WITH Clause & Common Table Expressions (CTEs)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL WITH Clause & Common Table Expressions (CTEs) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-like-in-between": {
    "id": "sql-like-in-between",
    "badge": "Module 2 • SQL & PostgreSQL",
    "readingTime": "8 min read",
    "level": "Beginner",
    "title": "Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL",
    "subtitle": "Complete guide to Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Pattern Matching with LIKE and ILIKE",
        "content": "The **`LIKE`** operator is used in a `WHERE` clause to search for a specified pattern in a text column using two standard wildcard characters:\n\n- **`%` (Percent Sign)**: Matches zero, one, or multiple characters.\n- **`_` (Underscore)**: Matches exactly one single character.\n- **`ILIKE` (PostgreSQL)**: Case-insensitive version of `LIKE`.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Pattern Matching with LIKE and ILIKE",
          "snippet": "-- Find users whose email ends with '@tncy.dev' or username starts with 'eng_'\nSELECT user_id, username, email\nFROM users\nWHERE email LIKE '%@tncy.dev'\n  AND username LIKE 'eng___';"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL."
        }
      },
      {
        "title": "2. Filtering Discrete Sets with IN and NOT IN",
        "content": "The **`IN`** operator allows you to specify multiple possible values in a `WHERE` clause, acting as a concise shorthand for multiple `OR` conditions. It can also accept a dynamic **subquery** returning a single column.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Filtering Discrete Sets with IN and NOT IN",
          "snippet": "SELECT order_id, customer_id, status, total_amount\nFROM orders\nWHERE status IN ('SHIPPED', 'DELIVERED')\n  AND customer_id IN (\n      SELECT customer_id FROM vip_customers WHERE tier = 'PLATINUM'\n  );"
        }
      },
      {
        "title": "3. Range Queries with BETWEEN",
        "content": "The **`BETWEEN`** operator selects values within a given inclusive range (`value >= low AND value <= high`). It works on numbers, text strings, and ISO timestamps/dates.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Range Queries with BETWEEN",
          "snippet": "SELECT product_id, product_name, price, created_at\nFROM products\nWHERE price BETWEEN 50.00 AND 250.00\n  AND created_at BETWEEN '2026-01-01' AND '2026-12-31';"
        }
      },
      {
        "title": "4. Handling Missing Values with IS NULL and IS NOT NULL",
        "content": "In SQL three-valued logic (`TRUE`, `FALSE`, `UNKNOWN`), `NULL` represents an unknown or missing value. Standard comparison operators (`= NULL` or `!= NULL`) always evaluate to `UNKNOWN`. Always use **`IS NULL`** or **`IS NOT NULL`** to test for nullity.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Handling Missing Values with IS NULL and IS NOT NULL",
          "snippet": "SELECT order_id, shipped_date, COALESCE(tracking_code, 'PENDING') AS tracking\nFROM orders\nWHERE shipped_date IS NULL\n  AND cancelled_at IS NULL;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL",
      "initialCode": "-- Find users whose email ends with '@tncy.dev' or username starts with 'eng_'\nSELECT user_id, username, email\nFROM users\nWHERE email LIKE '%@tncy.dev'\n  AND username LIKE 'eng___';",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Pattern Matching (LIKE, Wildcards), IN, BETWEEN & IS NULL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-keys-relational": {
    "id": "sql-keys-relational",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "Types of Keys in Relational Model (Super, Candidate, Primary, Foreign)",
    "subtitle": "Complete guide to Types of Keys in Relational Model (Super, Candidate, Primary, Foreign) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Keys are fundamental elements of the relational database model that ensure uniqueness, data integrity, and efficient data access.\n\n- They uniquely identify each row in a table.\n- They prevent data duplication and maintain consistency.\n- They create relationships between different tables.Keys in DBMS",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Types of Keys in Relational Model (Super, Candidate, Primary, Foreign)."
        }
      },
      {
        "title": "2. Importance of Keys in DBMS",
        "content": "- **Uniqueness:** Keys ensure that each record in a table is unique and can be identified distinctly.\n- **Data Integrity:** Keys prevent data duplication and maintain the consistency of the data.\n- **Efficient Data Retrieval:** Keys help in creating relationships between tables, allowing faster queries and better data organization.\n- Without keys, managing large databases would become difficult, and data retrieval would be slow and error-prone."
      },
      {
        "title": "1. Candidate Key",
        "content": "The minimal set of attributes that can uniquely identify a tuple is known as a candidate key. For Example, STUD_NO in STUDENT relation.\n\n- A candidate key is a minimal super key with no redundant attributes.\n- It must contain unique values, ensuring that no two rows have the same value in the candidate key’s columns.\n- Every table must have at least a single candidate key.\n- A table can have multiple candidate keys but only one primary key.** Example:** For the STUDENT table below, STUD_NO can be a candidate key, as it uniquely identifies each record.\n\nSTUDENT Table**Table: **STUDENT_COURSE\n\nSTUDENT_COURSE TableA composite candidate key example: {STUD_NO, COURSE_NO} can be a candidate key for a STUDENT_COURSE table."
      },
      {
        "title": "2. Super Key",
        "content": "The set of one or more attributes (columns) that can uniquely identify a tuple (record) is known as Super Key. It may include extra attributes that aren't important for uniqueness but still uniquely identify the row. For Example, STUD_NO, (STUD_NO, STUD_NAME), etc.\n\n- A super key can contain extra attributes that aren’t necessary for uniqueness.\n- For example, if the \"STUD_NO\" column can uniquely identify a student, adding \"SNAME\" to it will still form a valid super key, though it's unnecessary.**Example:** Consider the STUDENT table\n\nSTUDENT TableA super key could be a combination of STUD_NO and PHONE, as this combination uniquely identifies a student.\n\nRelation between Primary Key, Candidate Key, and Super Key"
      },
      {
        "title": "3. Alternate Key",
        "content": "An alternate key is any candidate key in a table that is not chosen as the primary key. In other words, all the keys that are not selected as the primary key are considered alternate keys.\n\n- An alternate key is also referred to as a secondary key because it can uniquely identify records in a table, just like the primary key.\n- An alternate key can consist of one or more columns (fields) that can uniquely identify a record, but it is not the primary key**Example:** In the STUDENT table, both STUD_NO and PHONE are candidate keys. If STUD_NO is chosen as the primary key, then PHONE would be considered an alternate key.\n\nPrimary Key, Candidate Key, and Alternate Key"
      },
      {
        "title": "4. Foreign Key",
        "content": "A foreign key is an attribute in one table that refers to the primary key in another table. The table that contains the foreign key is called the referencing table and the table that is referenced is called the referenced table.\n\nRelation between Primary Key and Foreign Key\n- A foreign key in one table points to the primary key in another table, establishing a relationship between them.\n- It helps connect two or more tables, enabling you to create relationships between them. This is important for maintaining data integrity and preventing data redundancy.\n- They act as a cross-reference between the tables.** Example:** Consider the STUDENT_COURSE table\n\nSTUDENT_COURSE Table\n- STUD_NO in the STUDENT_COURSE table is a foreign key that refers to the STUD_NO primary key of the STUDENT table.\n- Unlike a primary key, a foreign key can contain duplicate values and may be NULL. For example, STUD_NO appears multiple times in STUDENT_COURSE because a student can enroll in more than one course.\n- However, STUD_NO in the STUDENT table is a primary key, so it must always be unique and non-NULL."
      },
      {
        "title": "5. Partial Key",
        "content": "A partial key is chosen from a weak entity to help identify records, but it cannot uniquely identify a record by itself.\n\n- Helps distinguish records in a weak entity when combined with data from a related strong entity.\n- It cannot be NULL, as it is needed to identify records with other data.\n- It can be a single column or a combination of columns.\n- Ensures consistency when paired with data from a strong entity.Example: In a `STUDENT_COURSE` table, the combination of `STUD_NO` and `COURSE_CODE` can be a partial key."
      },
      {
        "title": "6. Primary Key",
        "content": "A primary key is chosen from the set of candidate keys to uniquely identify each record in a table. For example, in the STUDENT table, both STUD_NO and STUD_PHONE can be candidate keys, but STUD_NO is selected as the primary key.\n\n- It cannot be NULL, as each record must have a valid identifier.\n- It may be single-column or composite (made of multiple columns).\n- Databases often organize data using the primary key to allow faster access and searching.**Example: **The STUDENT table has the structure Student(STUD_NO, SNAME, ADDRESS, PHONE), where STUD_NO is the primary key."
      },
      {
        "title": "7. Secondary Key",
        "content": "A Secondary Key is an attribute or a combination of attributes used to search or query records in a table, but it doesn’t guarantee uniqueness.\n\n- It helps in retrieving data quickly, often by creating indexes.\n- It doesn’t uniquely identify each record; multiple records can have the same value.\n- For example, STUD_NAME in a STUDENT table can be used to find students by name, even though many students may share the same name.\n- It’s mainly for improving search efficiency, not for maintaining data uniqueness.Here's an example of how the STUDENT table might look with STUD_NAME as a secondary key:\n\nSTUD_NOSTUD_NAMESTUD_AGESTUD_ADDRESS101John21123 Oak St102Emily22456 Pine St103John23789 Maple St104Michael20321 Birch St105Emily22654 Cedar St"
      },
      {
        "title": "8. Unique Key",
        "content": "A Unique Key is a database constraint that ensures that all values in a specific column or a combination of columns are unique across all the rows in a table. It guarantees that no two rows in the table can have the same value in the columns defined as part of the unique key.\n\n- Prevents duplicate values in the specified column(s).\n- It allows NULL values, but only one NULL per column.\n- It can be applied to a single column or multiple columns.\n- Helps maintain the integrity and accuracy of the data in the table.**Example:** In the STUDENT_COURSE table, the combination of STUD_EMAIL and STUD_NAME can form a Unique Key to ensure that each student’s email and name pair is unique across the table.\n\nSTUD_NOSTUD_EMAILSTUD_NAME101john@example.comJohn102emily@example.comEmily103michael@example.comMichael104sara@example.comSara105david@example.comDavid"
      },
      {
        "title": "9. Composite Key",
        "content": "Sometimes, a single column is not enough to uniquely identify all records in a table, so a combination of multiple attributes is used. An optimal set of such attributes is chosen to ensure that every row is uniquely identifiable.\n\nIt acts as a primary key if there is no primary key in a table\n\n- Two or more attributes are used together to make a composite key .\n- Different combinations of attributes may give different accuracy in terms of identifying the rows uniquely.**Example: **In the STUDENT_COURSE table, {STUD_NO, COURSE_NO} can form a composite key to uniquely identify each record."
      },
      {
        "title": "10. Surrogate Keys",
        "content": "A surrogate key is an artificial attribute created to uniquely identify each record in a table when no suitable natural key is available.\n\n- It is usually generated automatically by the system (like auto-increment numbers).\n- It acts as a primary key when natural or composite keys are not practical or efficient.\n- A single system-generated attribute is used to make a surrogate key.\n- It does not have any real-world meaning and is used only for identification purposes.**Example: **STUDENT_ID is used as a surrogate key to uniquely identify each record in the STUDENT_COURSE table, without relying on natural attributes like name or email.\n\nComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Types of Keys in Relational Model (Super, Candidate, Primary, Foreign)",
      "initialCode": "-- Types of Keys in Relational Model (Super, Candidate, Primary, Foreign)\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Types of Keys in Relational Model (Super, Candidate, Primary, Foreign) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Types of Keys in Relational Model (Super, Candidate, Primary, Foreign) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Types of Keys in Relational Model (Super, Candidate, Primary, Foreign)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Types of Keys in Relational Model (Super, Candidate, Primary, Foreign) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-primary-key": {
    "id": "sql-primary-key",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "16 min read",
    "level": "Intermediate",
    "title": "PRIMARY KEY & Composite Key Constraints in SQL",
    "subtitle": "Complete guide to PRIMARY KEY & Composite Key Constraints in SQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The PRIMARY KEY constraint in SQL uniquely identifies each record in a table and ensures strong data integrity. It prevents duplicate and NULL values, making it essential for reliable relational database design.\n\n- Ensures all values are unique.\n- Does not allow NULL values.\n- Only one primary key per table (can be composite).\n- Automatically creates a unique index for faster searches.**Query:**\n\n**Output:**\n\n- EmpID is the primary key, so it must be unique and cannot be NULL.\n- If you try inserting duplicate or NULL EmpID values, the database will throw an error.**Query:**\n\n**Error:**\n\n- First query fails because the primary key value 101 is duplicated.\n- Second query fails because the primary key cannot be NULL.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "CREATE TABLE employees (    emp_id INT PRIMARY KEY,    emp_name VARCHAR(50),    department VARCHAR(50));-- Insert data into employees tableINSERT INTO employees (emp_id, emp_name, department)VALUES    (101, 'Bob', 'Sales'),    (102, 'Lucas', 'HR');"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for PRIMARY KEY & Composite Key Constraints in SQL."
        }
      },
      {
        "title": "2. Syntax",
        "content": "SQL primary key syntax with CREATE TABLE statement is:\n\nSQL primary key syntax with ALTER TABLE statement is:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "CREATE TABLE table_name (    column1 data_type,    column2 data_type,    . . . . ,    PRIMARY KEY (column1, column2));"
        }
      },
      {
        "title": "3. Types of PRIMARY KEYS",
        "content": "There are two types of primary keys:\n\n- **Simple Primary Key:** A primary key that consists of a single column.\n- **Composite Primary Key:** A primary key that consists of multiple columns."
      },
      {
        "title": "4. Examples",
        "content": "Let's look at some examples of the PRIMARY KEY Constraint in SQL, and understand it's working."
      },
      {
        "title": "1. Create PRIMARY KEY in SQL",
        "content": "In this example, we will create primary key in a new table using CREATE TABLE statement.\n\n**Query**\n\n**Output:**\n\n- person_id is the primary key, so it must be unique.\n- Two valid rows are inserted with unique IDs.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Create PRIMARY KEY in SQL",
          "snippet": "CREATE TABLE persons (    person_id INT PRIMARY KEY,    last_name VARCHAR(255),    first_name VARCHAR(255),    age INT);INSERT INTO personsVALUES    (1, 'Johnson', 'Emily', 25),    (2, 'Walker', 'James', 30);"
        }
      },
      {
        "title": "2. Verify SQL Primary key creation",
        "content": "To verify if the primary key has been successfully created, we will try adding duplicate and null values in primary key column, and SQL should return an error.\n\n**Query**\n\n**Error:**\n\n- First query fails because person_id = 1 is already used, and primary keys must be unique.\n- Second query fails because primary keys cannot be NULL.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Verify SQL Primary key creation",
          "snippet": "-- Duplicate primary key value (person_id = 1 already exists)INSERT INTO personsVALUES (1, 'Brown', 'Olivia', 27);-- NULL is not allowed in the primary key columnINSERT INTO personsVALUES (NULL, 'Miller', 'Ethan', 32);"
        }
      },
      {
        "title": "3. Add PRIMARY KEY to a Existing Table",
        "content": "In this example, we will add primary key to a already existing table using ALTER TABLE command.\n\n**Query:**\n\n- Adds a primary key to the table, ensuring person_id is unique and cannot be NULL.\n- Assigns the name PK_Person to the constraint for easy identification.**Query:**\n\n**Error:**\n\n- The first insert fails because person_id = 1 is already in the table, violating the uniqueness rule.\n- The second insert fails because primary keys cannot be NULL.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Add PRIMARY KEY to a Existing Table",
          "snippet": "ALTER TABLE personADD CONSTRAINT PK_Person PRIMARY KEY (person_id);"
        }
      },
      {
        "title": "8. Benefits of Using Primary Keys",
        "content": "Primary keys uniquely identify each record in a table and help maintain data integrity.\n\n- Speeds up data retrieval because a primary key automatically creates an index.\n- Supports reliable table relationships through foreign keys.\n- Prevents duplicate or NULL values, keeping the data consistent and clean.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: PRIMARY KEY & Composite Key Constraints in SQL",
      "initialCode": "CREATE TABLE employees (    emp_id INT PRIMARY KEY,    emp_name VARCHAR(50),    department VARCHAR(50));-- Insert data into employees tableINSERT INTO employees (emp_id, emp_name, department)VALUES    (101, 'Bob', 'Sales'),    (102, 'Lucas', 'HR');",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: PRIMARY KEY & Composite Key Constraints in SQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing PRIMARY KEY & Composite Key Constraints in SQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via PRIMARY KEY & Composite Key Constraints in SQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "PRIMARY KEY & Composite Key Constraints in SQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-foreign-key": {
    "id": "sql-foreign-key",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "FOREIGN KEY Constraint & Referential Integrity",
    "subtitle": "Complete guide to FOREIGN KEY Constraint & Referential Integrity — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A FOREIGN KEY constraint is a concept in SQL that enforces a valid relationship between two tables by ensuring that the values stored in the child table correspond to existing values in the parent table. This constraint protects the database from inconsistent or invalid relational data.\n\n- Uses CASCADE or RESTRICT rules to control related data changes.\n- Keeps table relationships consistent by enforcing referential integrity rules.**Query:**\n\n**Output:**\n\nstudent Tablecourses Table\n- reference_id in courses references student_id in student, creating a valid link.\n- The FOREIGN KEY ensures only existing student IDs can be used in the courses table.\n- This maintains proper referential integrity and prevents invalid references.**Syntax:**\n\nThe syntax to create a foreign key in CREATE TABLE statement is:\n\nThe syntax to add a foreign key with ALTER TABLE statement is:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "CREATE TABLE student ( student_id INT PRIMARY KEY, name VARCHAR(20),    address VARCHAR(20), age INT, dob DATE);CREATE TABLE courses ( course_name VARCHAR(20), instructor VARCHAR(20), reference_id INT, CONSTRAINT fk_refer  FOREIGN KEY (reference_id) REFERENCES student(student_id)); -- Insert into student tableINSERT INTO student VALUES (1, 'Michael', 'New York', 20, '2005-03-10');INSERT INTO student VALUES (2, 'Emma', 'London', 22, '2003-07-21');-- Insert into courses tableINSERT INTO courses VALUES ('mathematics', 'Dr. Smith', 1);INSERT INTO courses VALUES ('biology', 'Dr. Adams', 2);"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for FOREIGN KEY Constraint & Referential Integrity."
        }
      },
      {
        "title": "2. Foreign Key Constraint Examples",
        "content": "In these examples, we use the student and courses tables created earlier, where the foreign key concept was implemented."
      },
      {
        "title": "3. Example 1: Insert Value in Foreign Key Table",
        "content": "If a corresponding value in the foreign table doesn't exist, a record in the child table cannot be inserted.\n\n**Query:**\n\n**Error:**\n\n- reference_id = 5 doesn’t exist in the student table.\n- The insert fails because it violates the foreign key constraint.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Example 1: Insert Value in Foreign Key Table",
          "snippet": "INSERT INTO courses (course_name, instructor, reference_id)VALUES ('physics', 'Dr. Green', 5);"
        }
      },
      {
        "title": "4. Example 2: Delete a value in Foreign Key Table",
        "content": "When a record in the master table is deleted and the corresponding record in the child table exists, an error message is displayed and prevents the DELETE operation from going through.\n\n**Query:**\n\n**Error:**\n\n- student_id = 1 is already referenced in the courses table.\n- The delete fails because removing it would break the foreign key relationship.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 2: Delete a value in Foreign Key Table",
          "snippet": "DELETE FROM studentWHERE student_id = 1;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: FOREIGN KEY Constraint & Referential Integrity",
      "initialCode": "CREATE TABLE student ( student_id INT PRIMARY KEY, name VARCHAR(20),    address VARCHAR(20), age INT, dob DATE);CREATE TABLE courses ( course_name VARCHAR(20), instructor VARCHAR(20), reference_id INT, CONSTRAINT fk_refer  FOREIGN KEY (reference_id) REFERENCES student(student_id)); -- Insert into student tableINSERT INTO student VALUES (1, 'Michael', 'New York', 20, '2005-03-10');INSERT INTO student VALUES (2, 'Emma', 'London', 22, '2003-07-21');-- Insert into courses tableINSERT INTO courses VALUES ('mathematics', 'Dr. Smith', 1);INSERT INTO courses VALUES ('biology', 'Dr. Adams', 2);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: FOREIGN KEY Constraint & Referential Integrity ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing FOREIGN KEY Constraint & Referential Integrity in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via FOREIGN KEY Constraint & Referential Integrity",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "FOREIGN KEY Constraint & Referential Integrity is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-not-null-unique-check": {
    "id": "sql-not-null-unique-check",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "18 min read",
    "level": "Intermediate",
    "title": "NOT NULL, UNIQUE, CHECK & DEFAULT Constraints",
    "subtitle": "Complete guide to NOT NULL, UNIQUE, CHECK & DEFAULT Constraints — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In SQL, NOT NULL constraint in SQL ensures a column must always contain a value and cannot be left empty. Unlike a PRIMARY KEY, which uniquely identifies each record and also disallows NULLs, NOT NULL only enforces the presence of data without requiring uniqueness.\n\n- NOT NULL is used to enforce mandatory fields.\n- Prevents NULL values from being inserted or updated.\n- It is applicable at the column level.**Query:**\n\n**Output:**\n\n**Query:**\n\n**Error:**\n\n- The insert fails because student_id has a NULL value.\n- A NOT NULL column requires a valid value, so it rejects NULL.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "CREATE TABLE student (    student_id INT NOT NULL,    full_name VARCHAR(50),    city VARCHAR(50));--Insert data into student tableINSERT INTO student (student_id, full_name, city) VALUES(101, 'Bob', 'London'),(102, 'Lucas', 'London');"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for NOT NULL, UNIQUE, CHECK & DEFAULT Constraints."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **CREATE TABLE table_name: **creates a new table.\n- **column1 data_type(size): **defines a column with its name, data type, and size.\n- **NOT NULL: **ensures the column cannot have NULL (empty) values.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "CREATE TABLE table_Name(column1 data_type(size) NOT NULL,column2 data_type(size) NOT NULL,....);"
        }
      },
      {
        "title": "3. SQL NOT NULL Constraint Syntax",
        "content": "The syntax for applying the NOT NULL constraint can be as follows:"
      },
      {
        "title": "1. During Table Creation",
        "content": "Query examples and implementation details for **1. During Table Creation**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. During Table Creation",
          "snippet": "CREATE TABLE table_Name (    column1 data_type(size) NOT NULL,    column2 data_type(size) NOT NULL,    ...);"
        }
      },
      {
        "title": "2. Modifying an Existing Table",
        "content": "You can also add a NOT NULL constraint to an existing column in a table using the ALTER TABLE statement:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Modifying an Existing Table",
          "snippet": "ALTER TABLE table_nameMODIFY column_name data_type(size) NOT NULL;"
        }
      },
      {
        "title": "6. Example of SQL NOT NULL Constraint",
        "content": "Let's understand NOT NULL in SQL with examples. Here we will look at different examples of the SQL NOT NULL Constraint command."
      },
      {
        "title": "7. Example 1: Applying NOT NULL in Table Creation",
        "content": "Let’s look at an example where we create an employee table with a NOT NULL constraint applied to the emp_id column to ensure that each employee has a unique, non-null ID.\n\n**Query:**\n\n**Output:**\n\n- All rows insert successfully because emp_id has valid (non-NULL) values.\n- NOT NULL constraint is satisfied, so the database accepts the rows.**Query:**\n\n**Error:**\n\n- Fails because emp_id cannot be NULL due to the NOT NULL constraint.\n- Database returns an error saying the emp_id column cannot accept NULL values.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example 1: Applying NOT NULL in Table Creation",
          "snippet": "CREATE TABLE emp (    emp_id INT NOT NULL PRIMARY KEY,    name VARCHAR(50),    country VARCHAR(50),    age INT,    salary INT);INSERT INTO emp (emp_id, name, country, age, salary)VALUES(1, 'John', 'USA', 28, 35000),(2, 'Emma', 'Canada', 32, 55000),(3, 'Lucas', 'Germany', 26, 42000);"
        }
      },
      {
        "title": "8. Example 2: Adding NOT NULL to an Existing Table",
        "content": "You can add a NOT NULL constraint to an existing table using ALTER TABLE. Suppose the student table already exists which allows NULL values, and we now want to make the stud_id column non-nullable."
      },
      {
        "title": "9. Query:",
        "content": "- stud_id cannot store NULL values anymore.\n- Any future insert with NULL stud_id will fail with a NOT NULL error.**Query:**\n\n**Error**\n\n- Insert fails because stud_id is NULL.\n- The NOT NULL column cannot accept NULL values.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. Query:",
          "snippet": "ALTER TABLE studentMODIFY COLUMN stud_id SET NOT NULL;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: NOT NULL, UNIQUE, CHECK & DEFAULT Constraints",
      "initialCode": "CREATE TABLE student (    student_id INT NOT NULL,    full_name VARCHAR(50),    city VARCHAR(50));--Insert data into student tableINSERT INTO student (student_id, full_name, city) VALUES(101, 'Bob', 'London'),(102, 'Lucas', 'London');",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: NOT NULL, UNIQUE, CHECK & DEFAULT Constraints ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing NOT NULL, UNIQUE, CHECK & DEFAULT Constraints in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via NOT NULL, UNIQUE, CHECK & DEFAULT Constraints",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "NOT NULL, UNIQUE, CHECK & DEFAULT Constraints is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-joins-overview": {
    "id": "sql-joins-overview",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN",
    "subtitle": "Complete guide to SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL Joins are used to combine data from two or more tables based on a related column.\n\n- Matching records using common columns.\n- Improving data analysis by combining related information.\n- Creating meaningful result sets from separate tables.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN."
        }
      },
      {
        "title": "2. Types of SQL Joins",
        "content": "SQL joins are categorized into different types based on how rows from two tables are matched and combined. Consider the student and student_course tables, which share the roll_no column. SQL Joins combine their related data.\n\n**student table:**\n\n**student_course table:**"
      },
      {
        "title": "1. INNER JOIN",
        "content": "INNER JOIN is used to retrieve rows where matching values exist in both tables. It helps in:\n\n- Combining records based on a related column.\n- Returning only matching rows from both tables.\n- Excluding non-matching data from the result set.\n- Ensuring accurate data relationships between tables.**Syntax:**\n\nInner join**Note**: We can also write JOIN instead of INNER JOIN. JOIN is same as INNER JOIN.\n\n**Example of INNER JOIN:**\n\nTo find students enrolled in different courses\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. INNER JOIN",
          "snippet": "SELECT A.column1, A.column2, B.column1, ...FROM tableA AS AINNER JOIN tableB AS BON A.matching_column = B.matching_column;"
        }
      },
      {
        "title": "2. LEFT JOIN",
        "content": "LEFT JOIN is used to retrieve all rows from the left table and matching rows from the right table. It helps in:\n\n- Returning all records from the left table.\n- Showing matching data from the right table.\n- Displaying NULL values where no match exists in the right table.**Syntax:**\n\nLeft Join**Note**: We can also use LEFT OUTER JOIN instead of LEFT JOIN, both are the same.\n\n**Example:** In this example, the LEFT JOIN retrieves all rows from the student table and the matching rows from the student_course table based on the roll_no column.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. LEFT JOIN",
          "snippet": "SELECT A.column1, A.column2, B.column1, ...FROM tableA AS ALEFT JOIN tableB AS BON A.matching_column = B.matching_column;"
        }
      },
      {
        "title": "3. RIGHT JOIN",
        "content": "RIGHT JOIN is used to retrieve all rows from the right table and the matching rows from the left table. It helps in:\n\n- Returning all records from the right-side table.\n- Showing matching data from the left-side table.\n- Displaying NULL values where no match exists in the left table.\n- Performing outer joins, also known as RIGHT OUTER JOIN.**Syntax:**\n\nRight Join**Note**: We can also use RIGHT OUTER JOIN instead of RIGHT JOIN, both are the same\n\n**Example: **In this example, the RIGHT JOIN retrieves all rows from the student_course table and the matching rows from the student table based on the roll_no column.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. RIGHT JOIN",
          "snippet": "SELECT A.column1, A.column2, B.column1, ...FROM tableA AS ARIGHT JOIN tableB AS BON A.matching_column = B.matching_column;"
        }
      },
      {
        "title": "4. FULL JOIN",
        "content": "FULL JOIN is used to combine the results of both LEFT JOIN and RIGHT JOIN. It helps in:\n\n- Returning all rows from both tables.\n- Showing matching records from each table.\n- Displaying NULL values where no match exists in either table.\n- Providing complete data from both sides of the join.**Syntax:**\n\nFull Join**Example: **This example uses a FULL JOIN to return all rows from both tables. Matching records appear together, while non-matching records still show up with NULL values for the missing fields.\n\n**Query:**\n\n**Output** :\n\n**Note: **MySQL does not support FULL OUTER JOIN. To get the same result, you can simulate it using a UNION of a LEFT JOIN and a RIGHT JOIN.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. FULL JOIN",
          "snippet": "SELECT A.column1, A.column2, B.column1, ...FROM tableA AS AFULL JOIN tableB AS BON A.matching_column = B.matching_column;"
        }
      },
      {
        "title": "5. Natural Join",
        "content": "A Natural Join automatically combines two tables based on columns that have the same name and compatible data types. It returns only the rows where the values in the common columns match.\n\n- It joins tables using common columns with the same name.\n- It returns only rows where values in those columns match.\n- The common column appears only once in the result.**Syntax:**\n\n**Example:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Natural Join",
          "snippet": "SELECT column_namesFROM tableANATURAL JOIN tableB;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN",
      "initialCode": "SELECT A.column1, A.column2, B.column1, ...FROM tableA AS AINNER JOIN tableB AS BON A.matching_column = B.matching_column;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Joins: INNER, LEFT, RIGHT and FULL OUTER JOIN is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-left-right-full-join": {
    "id": "sql-left-right-full-join",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "12 min read",
    "level": "Intermediate",
    "title": "Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN",
    "subtitle": "Complete guide to Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- In SQL, the LEFT JOIN (also called LEFT OUTER JOIN) retrieves all records from the left table and only the matching records from the right table. If no match is found, NULL values are returned for the right table columns.\n\nSQL LEFT JOIN",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **SELECT column_name(s):** Specifies the columns to retrieve from the tables.\n- **FROM table:** Defines the left table from which all rows will be returned.\n- **LEFT JOIN table:** Joins the right table with the left table.\n- **ON tableA.column_name = tableB.column_name:** Specifies the matching condition between both tables",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "SELECT column_name(s) FROM tableA LEFT JOIN tableB ON tableA.column_name = tableB.column_name;"
        }
      },
      {
        "title": "3. Examples of SQL LEFT JOIN",
        "content": "First, we will create a demo SQL database and tables. Consider two tables: employee and department.\n\n**employee Table:**\n\n**department Table:**"
      },
      {
        "title": "4. Example 1: Performing a LEFT JOIN",
        "content": "To perform left-join on employee and department Tables** **we will use the following SQL query:\n\n**Query:**\n\n**Output:**\n\n- All employee (left table) are included.\n- Since each employee is assigned a department, we see matching details from the right table.\n- If an employee had no department assigned, the department columns would show NULL",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Performing a LEFT JOIN",
          "snippet": "SELECT e.emp_id,       e.name,       department.department_name,       d.department_head,       d.locationFROM employee AS eLEFT JOIN department AS d    ON e.department_id = d.department_id;"
        }
      },
      {
        "title": "5. Example 2: SQL LEFT JOIN with WHERE Clause",
        "content": "In this example, the WHERE clause filters the results to display only employee whose department location is 'London'. departments without employee will not appear in the output.\n\n**Query: **\n\n**Output: **",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: SQL LEFT JOIN with WHERE Clause",
          "snippet": "SELECT e.emp_id,       e.name,       d.department_name,       d.department_head,       d.locationFROM employee AS eLEFT JOIN department AS d    ON e.department_id = d.department_idWHERE d.location = 'London';"
        }
      },
      {
        "title": "6. Example 3: SQL LEFT JOIN as Aliases",
        "content": "In this example, aliases e and d are used for the tables to make the query shorter, simpler and easier to read.\n\n**Query:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: SQL LEFT JOIN as Aliases",
          "snippet": "SELECT e.emp_id,       e.name,       d.department_name,       d.department_head,       d.locationFROM employee AS eLEFT JOIN department AS d    ON e.department_id = d.department_idWHERE d.location = 'London';"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN",
      "initialCode": "SELECT column_name(s) FROM tableA LEFT JOIN tableB ON tableA.column_name = tableB.column_name;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Deep Dive into LEFT JOIN, RIGHT JOIN & FULL JOIN is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-cross-self-join": {
    "id": "sql-cross-self-join",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "6 min read",
    "level": "Intermediate",
    "title": "SQL CROSS JOIN (Cartesian Product) and SELF JOIN",
    "subtitle": "Complete guide to SQL CROSS JOIN (Cartesian Product) and SELF JOIN — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL CROSS JOIN combines every row from one table with every row from another table. It produces a Cartesian product, meaning each row of the first table is paired with every row of the second table.\n\n- Does not require a join condition.\n- If one table has m rows and the other has n rows, the result contains m × n rows. CROSS JOIN",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL CROSS JOIN (Cartesian Product) and SELF JOIN."
        }
      },
      {
        "title": "2. Syntax",
        "content": "Query examples and implementation details for **Syntax**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "SELECT * FROM table1CROSS JOIN table2;"
        }
      },
      {
        "title": "3. Examples",
        "content": "Before diving into queries, let’s create two sample tables: Customer and Orders. These tables will help us understand how CROSS JOIN combines data into multiple combinations.\n\n**customer table:**\n\n**orders table:**\n\n**Query:**\n\n**Output:**\n\n- Combines every row from both tables.\n- With 2 rows in each table, it returns 2 × 2 = 4 rows.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Examples",
          "snippet": "SELECT * FROM customerCROSS JOIN orders;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL CROSS JOIN (Cartesian Product) and SELF JOIN",
      "initialCode": "SELECT * FROM table1CROSS JOIN table2;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL CROSS JOIN (Cartesian Product) and SELF JOIN ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL CROSS JOIN (Cartesian Product) and SELF JOIN in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL CROSS JOIN (Cartesian Product) and SELF JOIN",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL CROSS JOIN (Cartesian Product) and SELF JOIN is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-set-operators": {
    "id": "sql-set-operators",
    "badge": "Module 3 • SQL & PostgreSQL",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT",
    "subtitle": "Complete guide to SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview of SQL Set Operators",
        "content": "SQL Set Operators combine the result sets of two or more `SELECT` queries into a single result. For any set operation to succeed, all participating queries must have:\n\n- The **exact same number of columns**.\n- **Compatible data types** in corresponding column positions.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview of SQL Set Operators",
          "snippet": "-- Combine active employees and external contractors into a unified directory\nSELECT full_name, email, 'Employee' AS role_type FROM employees\nUNION ALL\nSELECT full_name, email, 'Contractor' AS role_type FROM contractors;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT."
        }
      },
      {
        "title": "2. UNION vs UNION ALL",
        "content": "- **`UNION`**: Combines result sets and **removes duplicate rows** (requires an internal sort/hash deduplication step).\n- **`UNION ALL`**: Concatenates all rows from both queries **including duplicates**. Because it skips deduplication, `UNION ALL` is significantly faster and should always be preferred when duplicates are either impossible or acceptable.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. UNION vs UNION ALL",
          "snippet": "-- Deduplicated list of cities where we have either customers or warehouses\nSELECT city, country FROM customers\nUNION\nSELECT city, country FROM warehouses\nORDER BY country, city;"
        }
      },
      {
        "title": "3. INTERSECT: Finding Common Rows",
        "content": "The **`INTERSECT`** operator returns only the distinct rows that appear in **both** the first and second query result sets.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. INTERSECT: Finding Common Rows",
          "snippet": "-- Find users who are both registered buyers AND verified sellers\nSELECT user_id, email FROM buyers\nINTERSECT\nSELECT user_id, email FROM sellers;"
        }
      },
      {
        "title": "4. EXCEPT (MINUS): Set Difference",
        "content": "The **`EXCEPT`** operator (called `MINUS` in Oracle) returns distinct rows from the first (left) query that do **not** appear in the second (right) query.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. EXCEPT (MINUS): Set Difference",
          "snippet": "-- Find products in inventory that have never been ordered\nSELECT product_id FROM products\nEXCEPT\nSELECT DISTINCT product_id FROM order_items;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT",
      "initialCode": "-- Combine active employees and external contractors into a unified directory\nSELECT full_name, email, 'Employee' AS role_type FROM employees\nUNION ALL\nSELECT full_name, email, 'Contractor' AS role_type FROM contractors;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Set Operators: UNION, UNION ALL, INTERSECT & EXCEPT is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-aggregate-count-sum": {
    "id": "sql-aggregate-count-sum",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()",
    "subtitle": "Complete guide to SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX() — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL COUNT() function is used to return the number of rows or non-null values in a column. It helps summarize data in reports and analytics.\n\n- Counts all rows or rows with a condition\n- Counts unique values using COUNT(DISTINCT column)\n- Commonly used with GROUP BY and HAVING for grouped results**Example:** First, we create a demo SQL database and table, on which we will use the COUNT() functions.\n\nEmployee Table**Query:**\n\n**Output:**\n\n- First query returns total number of employees.\n- Second query returns count of unique departments.**Syntax:**\n\n**1. Count all rows:**\n\n**2. Count distinct values in a column:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "SELECT COUNT(*) AS TotalEmployees FROM Employee;SELECT COUNT(DISTINCT Department) AS UniqueDepartmentsFROM Employee;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()."
        }
      },
      {
        "title": "2. Examples of SQL Count Function",
        "content": "Let’s explore practical examples of the COUNT() function using a sample Customers table; consider the table below for all examples.\n\nCustomers Table"
      },
      {
        "title": "1. Counting the Number of Rows with COUNT(*)",
        "content": "When we want to count all the rows in a table, regardless of the column values, we can use COUNT(*). It counts every row, including rows with NULL values.\n\n**Query:**\n\n**Output:**\n\n- This query counts all the rows in the Customers table, including those with NULL values in any column.\n- The result 9 indicates that there are 9 rows in the Customers table.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Counting the Number of Rows with COUNT(*)",
          "snippet": "SELECT COUNT(*) AS TotalCustomersFROM Customers;"
        }
      },
      {
        "title": "2. Counting Unique Values with COUNT(DISTINCT …)",
        "content": "Sometimes, we may need to count only the distinct values in a column. The COUNT(DISTINCT column_name) function allows us to count only unique entries in a column, ignoring duplicates.\n\nQuery:\n\n**Output:**\n\n- This query counts the number of unique countries in the `Customers` table.\n- The result `4` indicates that there are four distinct countries listed in the table (Spain, Mexico, India, and Germany).",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Counting Unique Values with COUNT(DISTINCT …)",
          "snippet": "SELECT COUNT(DISTINCT Country) FROM Customers;"
        }
      },
      {
        "title": "3. Count Rows That Match a Condition Using COUNT() with CASE WHEN",
        "content": "We can use the COUNT() function along with CASE WHEN to count rows that match a specific condition. This is helpful when we want to count rows based on certain criteria without filtering the rows out of the result set.\n\n**Query:**\n\n**Output:**\n\n- This query counts the number of customers whose age is greater than 30.\n- The CASE WHEN expression checks if the condition Age > 30 is met. If it is, the value 1 is returned (otherwise, NULL is returned).\n- The COUNT() function then counts the non-NULL values, giving us the total number of customers over 30 years old.\n- The result 5 shows that five customers are older than 30 years.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Count Rows That Match a Condition Using COUNT() with CASE WHEN",
          "snippet": "SELECT COUNT(CASE WHEN Age > 30 THEN 1 ELSE NULL END) AS Adults FROM Customers;"
        }
      },
      {
        "title": "4. Count Rows in Groups Using COUNT() with GROUP BY",
        "content": "We can use the COUNT() function with GROUP BY to count rows within groups based on a column. This is useful when we want to categorize data and then count how many records exist in each category.\n\n**Query:**\n\n**Output:**\n\n- This query groups the rows in the `Customers` table by the `Country` column and then counts how many customers belong to each country.\n- The result shows the number of customers from each country: 1 from Germany, , 2 from India, 2 from Mexico, and 4 from Spain",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Count Rows in Groups Using COUNT() with GROUP BY",
          "snippet": "SELECT Country, COUNT(*) AS CustomerCountFROM CustomersGROUP BY Country;"
        }
      },
      {
        "title": "5. Filter Groups Using COUNT() with GROUP BY and HAVING",
        "content": "We can combine the COUNT() function with HAVING to filter the results after grouping. The HAVING clause is used to specify conditions on groups, similar to the WHERE clause, but for groups.\n\n**Query:**\n\n**Output:**\n\n- This query counts the number of customers from each country and filters out countries with fewer than 3 customers.\n- The result only includes Spain, as it is the only country with more than 2 customers.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Filter Groups Using COUNT() with GROUP BY and HAVING",
          "snippet": "SELECT Country, COUNT(*) AS CustomerCountFROM CustomersGROUP BY CountryHAVING COUNT(*) > 2;"
        }
      },
      {
        "title": "8. Best Practices for Using the COUNT() Function",
        "content": "The COUNT() function is powerful and widely used, but to keep queries efficient and easy to maintain, it's important to follow a few best practices."
      },
      {
        "title": "1. Optimize Queries for Large Datasets:",
        "content": "On large tables, COUNT() can be slow if the database must scan the entire dataset. Adding indexes to frequently counted columns improves performance.\n\n**Query:**\n\n**Output:**\n\n- The index on the Country column helps the database quickly find matching rows instead of scanning the entire table.\n- The COUNT(*) query then runs faster when counting customers from Spain.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Optimize Queries for Large Datasets:",
          "snippet": "-- Create index on Country columnCREATE INDEX idx_country ON Customers(Country);-- Faster COUNT query using the indexSELECT COUNT(*)FROM CustomersWHERE Country = 'Spain';"
        }
      },
      {
        "title": "2. Avoid Complex COUNT Queries for Large Tables:",
        "content": "Queries with many conditions or subqueries can be slow on very large tables. Simplify or break them into smaller parts to improve performance.\n\n**Query:**\n\n**Output:**\n\n- Counts customers who are from Spain or France, are older than 30, and live in Barcelona.\n- Such complex COUNT queries may be slow on large tables, and performance can improve by breaking the logic into smaller, simpler queries.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Avoid Complex COUNT Queries for Large Tables:",
          "snippet": "SELECT COUNT(*)FROM CustomersWHERE (Country = 'Spain' OR Country = 'France') AND Age > 30 AND City = 'Barcelona';"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()",
      "initialCode": "SELECT COUNT(*) AS TotalEmployees FROM Employee;SELECT COUNT(DISTINCT Department) AS UniqueDepartmentsFROM Employee;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX() ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX() in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX() is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-string-functions": {
    "id": "sql-string-functions",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "SQL String Manipulation Functions",
    "subtitle": "Complete guide to SQL String Manipulation Functions — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL string functions help manipulate and format text data efficiently. They are widely used for cleaning, comparing and extracting meaningful information from textual fields.\n\n- Improve query flexibility when working with textual data.\n- Help prepare data for analysis and presentation.The following advanced string functions help perform specialized text-processing operations in SQL.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL String Manipulation Functions."
        }
      },
      {
        "title": "2. CONCAT()",
        "content": "The CONCAT() function is used to concatenate (combine) two or more strings into one string. It is useful when we want to merge fields like first and last names into a full name.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. CONCAT()",
          "snippet": "SELECT CONCAT('John', ' ', 'Doe') AS FullName;"
        }
      },
      {
        "title": "3. CHAR_LENGTH() / CHARACTER_LENGTH()",
        "content": "The CHAR_LENGTH() or LENGTH() function returns the length of a string in characters. It’s essential for validating or manipulating text data, especially when you need to know how many characters a string contains.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. CHAR_LENGTH() / CHARACTER_LENGTH()",
          "snippet": "SELECT CHAR_LENGTH('Hello') AS StringLength;"
        }
      },
      {
        "title": "4. UPPER() and LOWER()",
        "content": "These UPPER() and LOWER() functions convert the text to uppercase or lowercase, respectively. They are useful for normalizing the case of text in a database.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. UPPER() and LOWER()",
          "snippet": "SELECT UPPER('hello') AS UpperCase;\nSELECT LOWER('HELLO') AS LowerCase;"
        }
      },
      {
        "title": "5. REPLACE()",
        "content": "The REPLACE() function replaces occurrences of a substring within a string with another substring. This is useful for cleaning up data, such as replacing invalid characters or formatting errors.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. REPLACE()",
          "snippet": "SELECT REPLACE('Hello World', 'World', 'SQL') AS UpdatedString;"
        }
      },
      {
        "title": "6. SUBSTRING() / SUBSTR()",
        "content": "The SUBSTRING() (or SUBSTR()) function is used to extract a substring from a string, starting from a specified position.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. SUBSTRING() / SUBSTR()",
          "snippet": "SELECT SUBSTRING('Hello World', 1, 5) AS SubStringExample;"
        }
      },
      {
        "title": "7. LEFT() and RIGHT()",
        "content": "The LEFT() and RIGHT() functions allow you to extract a specified number of characters from the left or right side of a string, respectively. It is used for truncating strings for display.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. LEFT() and RIGHT()",
          "snippet": "SELECT LEFT('Hello World', 5) AS LeftString;\nSELECT RIGHT('Hello World', 5) AS RightString;"
        }
      },
      {
        "title": "8. INSTR()",
        "content": "The INSTR() function is used to find the position of the first occurrence of a substring within a string. It returns the position (1-based index) of the substring. If the substring is not found, it returns 0.\n\n**Output**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. INSTR()",
          "snippet": "SELECT INSTR('Hello World', 'World') AS SubstringPosition;"
        }
      },
      {
        "title": "9. TRIM()",
        "content": "The TRIM() function removes leading and trailing spaces (or other specified characters) from a string. By default, it trims spaces but can also remove specific characters using TRIM(character FROM string).\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. TRIM()",
          "snippet": "SELECT TRIM(' ' FROM '  Hello World  ') AS TrimmedString;"
        }
      },
      {
        "title": "10. REVERSE()",
        "content": "The REVERSE() function reverses the characters in a string. It’s useful in situations where we need to process data backward, such as for password validation or certain pattern matching.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. REVERSE()",
          "snippet": "SELECT REVERSE('Hello') AS ReversedString;"
        }
      },
      {
        "title": "11. RTRIM()",
        "content": "RTRIM() removes trailing characters from the right side of a string. By default, it removes spaces, but you can specify other characters as well.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 11. RTRIM()",
          "snippet": "SELECT RTRIM('geeks   ');"
        }
      },
      {
        "title": "12. SPACE()",
        "content": "The SPACE() function generates a string consisting of a specified number of spaces. This is useful when you need to format output or create padding in your queries.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 12. SPACE()",
          "snippet": "SELECT SPACE(7);"
        }
      },
      {
        "title": "13. Advanced String Functions",
        "content": "Advanced string functions provide additional ways to manipulate and process text data in SQL."
      },
      {
        "title": "14. ASCII()",
        "content": "The ASCII() function returns the ASCII value of a single character. This is helpful when we need to find the numeric code corresponding to a character, often used in encoding and decoding text.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 14. ASCII()",
          "snippet": "SELECT ASCII('t');"
        }
      },
      {
        "title": "15. CONCAT_WS()",
        "content": "CONCAT_WS() stands for \"Concatenate With Separator.\" It allows us to join multiple strings with a specific separator between them. This is ideal when we need to merge columns like first name and last name with a custom separator.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 15. CONCAT_WS()",
          "snippet": "SELECT CONCAT_WS('_', 'geeks', 'for', 'geeks');"
        }
      },
      {
        "title": "16. FORMAT()",
        "content": "The FORMAT() function is used to format a number as a string in a specific way, often with commas for thousands or with a specific number of decimal places. It is handy when you need to display numbers in a user-friendly format.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 16. FORMAT()",
          "snippet": "SELECT FORMAT(0.981 * 100, 'N2') + '%' AS PercentageOutput;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL String Manipulation Functions",
      "initialCode": "SELECT CONCAT('John', ' ', 'Doe') AS FullName;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL String Manipulation Functions ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL String Manipulation Functions in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL String Manipulation Functions",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL String Manipulation Functions is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-date-functions": {
    "id": "sql-date-functions",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "SQL Date and Timestamp Functions",
    "subtitle": "Complete guide to SQL Date and Timestamp Functions — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL Date Functions are built-in tools used to handle, modify and analyze date/time values in a database. They help perform tasks like retrieving current dates, calculating differences and formatting results effectively.\n\n- Extract specific parts of a date (year, month, day).\n- Format dates for user-friendly display.\n- Track trends, deadlines or schedules in business processes.Let's use the sales table as the base for demonstrating each of the SQL Date Functions mentioned. Here’s the structure of the sales table:\n\nsales Table",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Date and Timestamp Functions."
        }
      },
      {
        "title": "1. NOW()",
        "content": "The NOW() function retrieves the server’s current date and time, making it useful for capturing exact event moments such as transaction timestamps, as well as for logging and comparing time-based records.\n\n**Query:**\n\n**Output:**\n\nOutput after using NOW()\n- Returns the current system date and time.\n- Shows both date and time in one value.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. NOW()",
          "snippet": "SELECT NOW() AS current_datetime;"
        }
      },
      {
        "title": "2. CURDATE()",
        "content": "The CURDATE() function returns today’s date in YYYY-MM-DD format and is useful when only the current date is needed, especially for reporting or filtering records by date.\n\n**Query:**\n\n**Output:**\n\nOutput after using CURDATE()\n- Returns today’s date only.\n- Time part is not included.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. CURDATE()",
          "snippet": "SELECT CURDATE() AS current_date;"
        }
      },
      {
        "title": "3. CURTIME()",
        "content": "The CURTIME() function returns the current time in HH:MM:SS format and is useful for time-based operations, such as scheduling or performing precise time comparisons.\n\n**Query:**\n\n**Output:**\n\nOutput after using CURTIME()\n- Returns the current system time.\n- Shows hours, minutes and seconds only.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. CURTIME()",
          "snippet": "SELECT CURTIME() AS current_time;"
        }
      },
      {
        "title": "4. DATE()",
        "content": "The DATE() function extracts only the date from a date or datetime value, making it useful for situations where the time component should be ignored, such as date-only comparisons or aggregations.\n\n**Query:**\n\n**Output**\n\nOutput after using DATE()\n- Extracts only the date part from sale_date.\n- Removes any time portion if present.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. DATE()",
          "snippet": "SELECT     sale_id,     product_name,    DATE(sale_date) AS sale_date_onlyFROM sales;"
        }
      },
      {
        "title": "5. EXTRACT()",
        "content": "The EXTRACT() function retrieves a specific part of a date such as the year, month or day, making it useful for grouping, filtering or performing time-based analysis including year-over-year reports.\n\n**Query:**\n\n**Output:**\n\nOutput after using EXTRACT()\n- Pulls out the year from the sale date.\n- Useful for grouping or filtering by year.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. EXTRACT()",
          "snippet": "SELECT sale_id, product_name, EXTRACT(YEAR FROM sale_date) AS sale_year FROM sales;"
        }
      },
      {
        "title": "6. DATE_ADD()",
        "content": "The DATE_ADD() function adds a chosen time interval such as days, months or years to a date, making it useful for calculating future dates and simplifying planning or scheduling tasks.\n\n**Query:**\n\n**Output:**\n\nOutput after using DATE_ADD()\n- Adds 7 days to the sale date.\n- Returns the new future date.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. DATE_ADD()",
          "snippet": "SELECT sale_id, product_name, DATE_ADD(sale_date, INTERVAL 7 DAY) AS sale_date_plus_7_days FROM sales;"
        }
      },
      {
        "title": "7. DATE_SUB()",
        "content": "The DATE_SUB() function subtracts a chosen time interval from a date, making it useful for determining past dates and performing retrospective data analysis.\n\n**Query:**\n\n**Output:**\n\nOutput after using DATE_SUB()\n- Subtracts 3 days from the sale date.\n- Returns an earlier date.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. DATE_SUB()",
          "snippet": "SELECT sale_id, product_name, DATE_SUB(sale_date, INTERVAL 3 DAY) AS sale_date_minus_3_days FROM sales;"
        }
      },
      {
        "title": "8. DATEDIFF()",
        "content": "The DATEDIFF() function returns the number of days between two dates, making it useful for calculating durations such as deadlines or overdue periods. In this case, it shows how many days remain from each sale date until August 15, 2024.\n\n**Query:**\n\n**Output:**\n\nOutput after using DATEDIFF()\n- Calculates days between two dates.\n- Shows how many days until 15-Aug-2024.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. DATEDIFF()",
          "snippet": "SELECT sale_id, product_name, sale_date,DATEDIFF('2024-08-15', sale_date) AS days_until_aug15FROM sales;"
        }
      },
      {
        "title": "9. DATE_FORMAT()",
        "content": "The DATE_FORMAT() function formats a date using a specified pattern, allowing customized output such as full day or month names and is useful for making reports clearer and more readable.\n\n**Query:**\n\n**Output:**\n\nOutput after using DATE_FORMAT()\n- Converts date into a readable text format.\n- Displays weekday, month name, day and year.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. DATE_FORMAT()",
          "snippet": "SELECT sale_id, product_name, DATE_FORMAT(sale_date, '%W, %M %d, %Y') AS formatted_sale_date FROM sales;"
        }
      },
      {
        "title": "10. ADDDATE()",
        "content": "The ADDDATE() function adds a specified time interval to a date. It is useful for calculating future or past dates based on a given date.\n\n**Query:**\n\n**Output:**\n\nOutput after using ADDDATE()\n- Adds 10 days to the sale date.\n- Same as DATE_ADD but without INTERVAL.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. ADDDATE()",
          "snippet": "SELECT sale_id, product_name, ADDDATE(sale_date, 10) AS sale_date_plus_10_days FROM sales;"
        }
      },
      {
        "title": "11. ADDTIME()",
        "content": "The ADDTIME() function adds a specified time interval to a time or datetime value. It is useful for adjusting times by adding hours, minutes or seconds.\n\n**Query:**\n\n**Output:**\n\nOutput after using ADDTIME()\n- Adds two time values together.\n- Returns the new time after addition.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 11. ADDTIME()",
          "snippet": "SELECT sale_id, product_name, ADDTIME('10:30:00', '02:30:00') AS sale_time_plus_2hrs_30min FROM sales;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Date and Timestamp Functions",
      "initialCode": "SELECT NOW() AS current_datetime;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Date and Timestamp Functions ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Date and Timestamp Functions in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Date and Timestamp Functions",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Date and Timestamp Functions is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-subqueries": {
    "id": "sql-subqueries",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "24 min read",
    "level": "Intermediate",
    "title": "SQL Subqueries & Nested Query Execution",
    "subtitle": "Complete guide to SQL Subqueries & Nested Query Execution — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A subquery in SQL is a query nested inside another SQL query. It allows complex filtering, aggregation and data manipulation by using the result of one query inside another. They are an essential tool when we need to perform operations like:\n\n- Apply aggregate functions like SUM, COUNT or AVG dynamically.\n- Update data using values from other tables.\n- Delete rows based on conditions returned by another query.**Example:** Create a demo SQL database and tables, on which we use the SQL Subqueries.\n\nOutput**Query:**\n\n**Output:**\n\nOutput\n- The subquery calculates the average score of all students.\n- The main query returns only the students whose score is higher than that average.**Syntax:**\n\n**Note:** Subqueries do not have a single fixed syntax, as they can be used in different clauses like SELECT, WHERE, FROM and HAVING",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "SELECT * FROM StudentsWHERE Score >  ( SELECT AVG(Score) FROM Students );"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Subqueries & Nested Query Execution."
        }
      },
      {
        "title": "2. SQL Clauses for Subqueries",
        "content": "Clauses that can be used with subqueries are:\n\n- Filters rows in the outer query based on the results returned by the WHERE clause.\n- Treats the subquery as a temporary (derived) table that can be queried like a normal table using the FROM clause.\n- Filters grouped or aggregated results using values produced by the HAVING clause."
      },
      {
        "title": "3. Types of Subqueries",
        "content": "Consider the following two tables for examples:\n\nEmployees TableDepartments Table"
      },
      {
        "title": "4. Single-Row Subquery",
        "content": "A single-row subquery is a subquery that returns only one value.\n\n- Returns exactly one row as the result.\n- Commonly used with comparison operators such as =, >, <**Example:**\n\n**Output:**\n\nOutput\n- Finds the highest salary in the Employees table.\n- Returns the employee(s) whose salary matches that maximum value.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Single-Row Subquery",
          "snippet": "SELECT * FROM EmployeesWHERE Salary = (SELECT MAX(Salary) FROM Employees);"
        }
      },
      {
        "title": "5. Multi-Row Subquery",
        "content": "A multi-row subquery is a subquery that returns more than one value.\n\n- Returns multiple rows as the result.\n- Requires operators that can handle multiple values, such as IN, ANY or ALL**Example:**\n\n**Output:**\n\nOutput\n- Identifies all departments located in New York.\n- Returns the employees who belong to any of those departments.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Multi-Row Subquery",
          "snippet": "SELECT * FROM EmployeesWHERE DepartmentID IN (SELECT DepartmentID FROM Departments WHERE Location = 'New York');"
        }
      },
      {
        "title": "6. Correlated Subquery",
        "content": "A correlated subquery is a subquery that depends on the outer query for its values.\n\n- A dependent subquery: it references columns from the outer query.\n- Executed once for each row of the outer query, making it slower for large datasets.**Example:**\n\n**Output:**\n\nOutput\n- Calculates the average salary within each employee's department.\n- Returns employees whose salary is higher than their department’s average.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Correlated Subquery",
          "snippet": "SELECT e.Name, e.SalaryFROM Employees eWHERE e.Salary > (SELECT AVG(Salary)                   FROM Employees                   WHERE DepartmentID = e.DepartmentID);"
        }
      },
      {
        "title": "7. Examples of Using SQL Subqueries",
        "content": "Consider the following two tables:\n\nStudent_InfoStudent_Section"
      },
      {
        "title": "8. Example 1: Fetching Data Using Subquery in WHERE Clause",
        "content": "This example uses a subquery in the `WHERE` clause. The inner query finds roll numbers of students in Section 'A' and the outer query displays their details from the `Student` table.\n\n**Query:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Example 1: Fetching Data Using Subquery in WHERE Clause",
          "snippet": "SELECT NAME, LOCATION, PHONE_NUMBER FROM Student_Info WHERE ROLL_NO IN (    SELECT ROLL_NO     FROM Student_Section     WHERE SECTION = 'A');"
        }
      },
      {
        "title": "9. Example 2: Using Subquery with DELETE",
        "content": "In this example, a subquery is used with `DELETE` to remove rows from the `Student` table. The subquery automatically finds the records that match the given condition.\n\n**Query:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. Example 2: Using Subquery with DELETE",
          "snippet": "DELETE FROM Student_InfoWHERE ROLL_NO IN (    SELECT ROLL_NO FROM (        SELECT ROLL_NO FROM Student_Info WHERE ROLL_NO <= 101 OR ROLL_NO = 201    ) AS temp);"
        }
      },
      {
        "title": "10. Example 3: Using Subquery with UPDATE",
        "content": "This example uses a subquery with UPDATE to change student names to \"Geeks\" for records that match the location returned by the subquery.\n\nQuery:\n\n**Output:**\n\nOutput",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. Example 3: Using Subquery with UPDATE",
          "snippet": "UPDATE Student_InfoSET NAME = 'Geeks'WHERE LOCATION IN (    SELECT LOCATION     FROM Student_Info     WHERE LOCATION IN ('London', 'Berlin'));"
        }
      },
      {
        "title": "11. Example 4: Simple Subquery in the FROM Clause",
        "content": "This example uses a subquery in the FROM clause as a temporary table to retrieve students whose location starts with 'T' and display their names and phone numbers.\n\n**Query:**\n\n**Output:**\n\nOutput",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 11. Example 4: Simple Subquery in the FROM Clause",
          "snippet": "SELECT NAME, PHONE_NUMBERFROM (    SELECT NAME, PHONE_NUMBER, LOCATION     FROM Student_Info     WHERE LOCATION LIKE 'T%') AS subquery_table;"
        }
      },
      {
        "title": "12. Example 5: Subquery with JOIN",
        "content": "This example uses a subquery with `JOIN`. The subquery retrieves roll numbers of students in Section **'A'** and the join returns their names, locations and section details.\n\n**Query:**\n\n**Output:**\n\nOutputComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 12. Example 5: Subquery with JOIN",
          "snippet": "SELECT s.NAME, s.LOCATION, ns.SECTIONFROM Student_Info sINNER JOIN (    SELECT ROLL_NO, SECTION     FROM Student_Section     WHERE SECTION = 'A') nsON s.ROLL_NO = ns.ROLL_NO;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Subqueries & Nested Query Execution",
      "initialCode": "SELECT * FROM StudentsWHERE Score >  ( SELECT AVG(Score) FROM Students );",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Subqueries & Nested Query Execution ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Subqueries & Nested Query Execution in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Subqueries & Nested Query Execution",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Subqueries & Nested Query Execution is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-correlated-subqueries": {
    "id": "sql-correlated-subqueries",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "16 min read",
    "level": "Intermediate",
    "title": "Correlated Subqueries & EXISTS / ANY / ALL in SQL",
    "subtitle": "Complete guide to Correlated Subqueries & EXISTS / ANY / ALL in SQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A correlated subquery is a subquery that depends on values from the outer query and is executed once for each row processed by the outer query. The following steps explain the working of a correlated subquery\n\n- Get a row from the outer query.\n- Execute the subquery using values from that row.\n- Use the result in the outer query.**Syntax:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "SELECT column1, column2, ...FROM table1 t1WHERE column1 operator      (SELECT column       FROM table2       WHERE expr1 = t1.expr2);"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Correlated Subqueries & EXISTS / ANY / ALL in SQL."
        }
      },
      {
        "title": "2. Correlated Subquery Examples",
        "content": "Consider the following two tables for the examples below:\n\nemployees Tabledepartments Table"
      },
      {
        "title": "1. Fetching Data Based on Row-Specific Conditions",
        "content": "Correlated subqueries are often used when you need to filter data based on a condition that involves comparing values from the outer query.\n\n** Query:**\n\n**Output:**\n\nOutput\n- Uses a subquery to calculate the department’s average salary for comparison.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Fetching Data Based on Row-Specific Conditions",
          "snippet": "SELECT last_name, salary, department_idFROM employees AS outerWHERE salary > (    SELECT AVG(salary)    FROM employees    WHERE department_id = outer.department_id);"
        }
      },
      {
        "title": "2. Using Correlated Subqueries with UPDATE",
        "content": "Correlated subqueries can also be used with UPDATE statements to modify data based on related information from another table.\n\n**Query:**\n\n**Output:**\n\nOutput\n- Uses a subquery to calculate the average salary for each department and rounds it to two decimal places.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Using Correlated Subqueries with UPDATE",
          "snippet": "UPDATE employeesSET salary = ROUND(    (SELECT AVG(salary)     FROM employees     WHERE department_id = employees.department_id), 2)WHERE department_id = 101;"
        }
      },
      {
        "title": "3. Using Correlated Subqueries with DELETE",
        "content": "We can use a correlated subquery within a DELETE statement to remove rows from one table based on conditions in another table.\n\n**Query:**\n\n**Output:**\n\nOutput\n- Uses a subquery to select the employee_ids of employees in department 101.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Using Correlated Subqueries with DELETE",
          "snippet": "DELETE FROM employeesWHERE employee_id IN (    SELECT employee_id    FROM employees    WHERE department_id = 101);"
        }
      },
      {
        "title": "4. Using EXISTS with Correlated Subqueries",
        "content": "The EXISTS operator is often used in correlated subqueries to test if a subquery returns any rows. It returns TRUE if the subquery has at least one row.\n\n**Query:**\n\n**Output:**\n\nOutput\n- Uses a subquery to check if any employee has manager_id matching the outer employee’s employee_id.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Using EXISTS with Correlated Subqueries",
          "snippet": "SELECT e.employee_id, e.last_name, e.job_id, e.department_idFROM employees eWHERE EXISTS (    SELECT 1    FROM employees sub    WHERE sub.manager_id = e.employee_id);"
        }
      },
      {
        "title": "5. Using NOT EXISTS with Correlated Subqueries",
        "content": "The NOT EXISTS operator is used to check if a subquery does not return any rows. This is useful for finding records that do not match specific criteria.\n\n**Query:**\n\n**Output:**\n\nOutput\n- Uses a subquery to check for the absence of matching employees in each department.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Using NOT EXISTS with Correlated Subqueries",
          "snippet": "SELECT d.department_id, d.department_nameFROM departments dWHERE NOT EXISTS (    SELECT 1    FROM employees e    WHERE e.department_id = d.department_id);"
        }
      },
      {
        "title": "8. Nested vs. Correlated Subqueries",
        "content": "Nested (Non-Correlated) SubqueryCorrelated SubqueryExecutes once before the outer query.Executes for each row of the outer query.Independent of the outer query.Dependent on values from the outer query.Usually more efficient for large datasets.Can be slower as it runs multiple times.Example: WHERE col IN (SELECT col FROM table2)Example: WHERE col > (SELECT AVG(col) FROM table 2 WHERE table2.id = outer.id)Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Correlated Subqueries & EXISTS / ANY / ALL in SQL",
      "initialCode": "SELECT column1, column2, ...FROM table1 t1WHERE column1 operator      (SELECT column       FROM table2       WHERE expr1 = t1.expr2);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Correlated Subqueries & EXISTS / ANY / ALL in SQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Correlated Subqueries & EXISTS / ANY / ALL in SQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Correlated Subqueries & EXISTS / ANY / ALL in SQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Correlated Subqueries & EXISTS / ANY / ALL in SQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-window-functions": {
    "id": "sql-window-functions",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)",
    "subtitle": "Complete guide to Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL window functions allow performing calculations across a set of rows that are related to the current row, without collapsing the result into a single value. They are commonly used for tasks like aggregates, rankings and running totals. The OVER clause defines the “window” of rows for the calculation. It can:\n\n- **PARTITION BY: **It divides the data into groups using PARTITION BY.\n- **ORDER BY:** It specifies the order of rows within each group using ORDER BY.With this, functions such as SUM(), AVG(), ROW_NUMBER(), RANK() and DENSE_RANK() can be applied in a controlled way.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **window_function:** Function used for calculation/ranking\n- **column_name1:** Column(s) to display\n- **column_name2:** Function column\n- **column_name3:** `PARTITION BY` column\n- **column_name4:** `ORDER BY` column\n- **new_column:** Result alias\n- **table_name:** Source table",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "SELECT column_name1,        window_function(column_name2)        OVER ([PARTITION BY column_name3] [ORDER BY column_name4]) AS new_columnFROM table_name;"
        }
      },
      {
        "title": "3. Types of Window Functions in SQL",
        "content": "SQL window functions are mainly of two types: aggregate window functions and ranking window functions.\n\n**Example:** First, we create a demo table Employee and now we will apply window functions on it."
      },
      {
        "title": "4. Aggregate Window Functions",
        "content": "Aggregate window functions calculate aggregates over a window of rows while retaining individual rows. Common aggregate functions include:\n\n- **SUM()**: Sums values within a window.\n- **AVG()**: Calculates the average value within a window.\n- **COUNT()**: Counts the rows within a window.\n- **MAX()**: Returns the maximum value in the window.\n- **MIN()**: Returns the minimum value in the window.**Example:** Using AVG(), we will calculate the average salary within each department.\n\n**Output**\n\n- **For Finance**: (50,000 + 50,000 + 20,000) ÷ 3 = 40,000.\n- **For Sales:** (30,000 + 20,000) ÷ 2 = 25,000.\n- This average value is displayed for each employee belonging to the same department.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Aggregate Window Functions",
          "snippet": "SELECT name, age, department, salary,       AVG(salary) OVER (           PARTITION BY department       ) AS avg_salaryFROM employee;"
        }
      },
      {
        "title": "5. Ranking Window Functions",
        "content": "These functions provide rankings of rows within a partition based on specific criteria. Common ranking functions include:\n\n- **RANK()**: Assigns ranks to rows, skipping ranks for duplicates.\n- **DENSE_RANK()**: Assigns ranks to rows without skipping rank numbers for duplicates.\n- **ROW_NUMBER()**: Assigns a unique number to each row in the result set.\n- **PERCENT_RANK():** Shows the relative rank of a row as a percentage between 0 and 1."
      },
      {
        "title": "6. RANK() Function",
        "content": "RANK() functions are used to assign ranks to rows within a group based on a specific order. Ranking functions are commonly used to organize and analyze data. Some common ranking functions include:\n\n**Example:** Using RANK(), we will rank employee by salary, allowing gaps in ranks when salaries are equal.\n\n**Output:**\n\n- RANK() function assigns a ranking within each department based on salary (highest salary = rank 1).\n- **Finance**: Andrew and Brian both earn 50,000, so both get rank 1. The next salary is 20,000, so it gets rank 3 (rank 2 is skipped).\n- **Sales**: Daniel earns 30,000, so he gets rank 1. Ethan earns 20,000, so he gets rank 2.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. RANK() Function",
          "snippet": "SELECT name, department, salary,       RANK() OVER (           PARTITION BY department           ORDER BY salary DESC       ) AS emp_rankFROM employee;"
        }
      },
      {
        "title": "7. DENSE RANK() Function",
        "content": "DENSE_RANK() gives the same rank to rows with equal values. It then continues with the next number without skipping, keeping the ranking sequence continuous.\n\n**Example:** Using DENSE_RANK(), we will rank employee by salary without skipping ranks.\n\n**Output**:\n\n- DENSE_RANK() works like RANK(), but it ensures the ranking sequence has no gaps.\n- **Finance**: Andrew and Brian both earn 50,000, so they get rank 1. The next salary (20,000) is assigned rank 2 (no gap).\n- **Sales**: Daniel earns the highest salary (30,000) and gets rank 1. Ethan earns 20,000 and gets rank 2.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. DENSE RANK() Function",
          "snippet": "SELECT name, department, salary,       DENSE_RANK() OVER (           PARTITION BY department           ORDER BY salary DESC       ) AS emp_dense_rankFROM employee;"
        }
      },
      {
        "title": "8. ROW NUMBER() Function",
        "content": "ROW_NUMBER() gives a unique number to each row in the result set. It increments by 1 for every row, even if values are the same, so no two rows have the same number.\n\n**Example: **Using ROW_NUMBER(), we will assign a unique number to each row based on salary order.\n\n**Output**:\n\n- In Finance andrew is row 1, Brian is row 2, Charles is row 3.\n- In Sales, Daniel is row 1, Ethan is row 2.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. ROW NUMBER() Function",
          "snippet": "SELECT name, department, salary,       ROW_NUMBER() OVER (           PARTITION BY department           ORDER BY salary DESC       ) AS emp_row_noFROM employee;"
        }
      },
      {
        "title": "9. PERCENT RANK() Function",
        "content": "PERCENT_RANK() shows where a row stands compared to others in the same group. The formula is:\n\n**Example:** Using PERCENT_RANK(), we will find the relative salary position of each employee within a department.\n\n**Output:**\n\n- **Finance:** Andrew & Brian = 0.00, Charles = 1.00.\n- **Sales:** Daniel = 0.00, Ethan = 1.00.\n- Values show the employee’s relative position within the department.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. PERCENT RANK() Function",
          "snippet": "PERCENT_RANK() = (RANK - 1)/(Total Rows in Partition - 1)"
        }
      },
      {
        "title": "10. Fixing Window Function Issues",
        "content": "This helps to identify and fix problems like incorrect partitioning, wrong order or slow performance when using window functions.\n\n- **Partition carefully:** Without Partition by, the whole table is treated as one group.\n- **Check Order by :** It controls the calculation order in the window.\n- **Optimize performance:** Window functions can be slow on large datasets; use indexes if needed.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)",
      "initialCode": "SELECT column_name1,        window_function(column_name2)        OVER ([PARTITION BY column_name3] [ORDER BY column_name4]) AS new_columnFROM table_name;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Window Functions in SQL (ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-pivot-unpivot": {
    "id": "sql-pivot-unpivot",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "10 min read",
    "level": "Intermediate",
    "title": "PIVOT and UNPIVOT Relational Transformations in SQL",
    "subtitle": "Complete guide to PIVOT and UNPIVOT Relational Transformations in SQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Pivot and Unpivot in SQL are used to transform data by switching rows and columns. They help make data more readable, organized and useful for reporting and analysis.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for PIVOT and UNPIVOT Relational Transformations in SQL."
        }
      },
      {
        "title": "2. Pivot in SQL",
        "content": "Pivot in SQL is used to change rows into columns. It helps show data in a table format that is easier to read and analyze. We usually use functions like SUM, COUNT or AVG to summarize the data. Each different value becomes a new column in the result.\n\n**Syntax:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Pivot in SQL",
          "snippet": "SELECT column_namesFROM table_namePIVOT (    aggregate_function(column_to_aggregate)    FOR pivot_column IN (pivot_values)) AS alias;"
        }
      },
      {
        "title": "3. Example",
        "content": "We create a table named geeksforgeeks to store course details and then use PIVOT to get the total price for each course category.\n\n**Query:**\n\nOutput:\n\n- PIVOT converts course_category rows into columns.\n- SUM(price) calculates the total price for each category.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Example",
          "snippet": "SELECT course_name, programming, interview_preparationFROM (    SELECT course_name, course_category, price    FROM geeksforgeeks) AS source_tablePIVOT (    SUM(price)    FOR course_category IN (programming, interview_preparation)) AS pivot_table;"
        }
      },
      {
        "title": "4. Unpivot in SQL",
        "content": "UNPIVOT is the reverse of PIVOT in SQL. It converts column-based data back into rows, which helps in reorganizing and normalizing the data so it can be easily analyzed in row format.\n\n** Syntax:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Unpivot in SQL",
          "snippet": "SELECT column_namesFROM table_nameUNPIVOT (    value_column    FOR pivot_column IN (pivot_column_values)) AS alias;"
        }
      },
      {
        "title": "5. Example of Unpivot Operation",
        "content": "We use the same geeksforgeeks table and apply UNPIVOT to reverse the PIVOT and get back the original data format.\n\n**Query:**\n\n**Output:**\n\n- The column values are converted back into rows for each course.\n- The result looks like the original table structure with category and price.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example of Unpivot Operation",
          "snippet": "SELECT course_name, course_category, priceFROM (    SELECT course_name, programming, interview_preparation    FROM (        SELECT course_name, course_category, price        FROM geeksforgeeks    ) AS source_table    PIVOT (        SUM(price)        FOR course_category IN (programming, interview_preparation)    ) AS pivot_table) AS pUNPIVOT (    price    FOR course_category IN (programming, interview_preparation)) AS unpivot_table;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: PIVOT and UNPIVOT Relational Transformations in SQL",
      "initialCode": "SELECT column_namesFROM table_namePIVOT (    aggregate_function(column_to_aggregate)    FOR pivot_column IN (pivot_values)) AS alias;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: PIVOT and UNPIVOT Relational Transformations in SQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing PIVOT and UNPIVOT Relational Transformations in SQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via PIVOT and UNPIVOT Relational Transformations in SQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "PIVOT and UNPIVOT Relational Transformations in SQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-case-coalesce": {
    "id": "sql-case-coalesce",
    "badge": "Module 4 • SQL & PostgreSQL",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "Conditional Expressions in SQL: CASE, COALESCE & NULLIF",
    "subtitle": "Complete guide to Conditional Expressions in SQL: CASE, COALESCE & NULLIF — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- PostgreSQL CASE expression is used to apply conditional logic in SQL queries. It works similarly to the IF...ELSE statement in programming languages, allowing you to return different values based on specified conditions.\n\n- Return different values based on one or more conditions.\n- Use conditional logic in SELECT, WHERE, ORDER BY, GROUP BY and HAVING clauses.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Conditional Expressions in SQL: CASE, COALESCE & NULLIF."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**General CASE Expression:**\n\n**Simple CASE Expression:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "CASE\n    WHEN condition1 THEN result1\n    WHEN condition2 THEN result2\n    ...\n    ELSE result\nEND"
        }
      },
      {
        "title": "3. Working with the CASE Expression",
        "content": "Firstly, create an Employee table and insert some records into it.\n\nEmployee Table"
      },
      {
        "title": "4. Example 1: Using the General CASE Expression",
        "content": "The following query classifies employees based on their salary.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Using the General CASE Expression",
          "snippet": "SELECT EmployeeName,\n       Salary,\n       CASE\n           WHEN Salary < 50000 THEN 'Low Salary'\n           WHEN Salary BETWEEN 50000 AND 70000 THEN 'Medium Salary'\n           ELSE 'High Salary'\n       END AS SalaryCategory\nFROM Employee;"
        }
      },
      {
        "title": "5. Example 2: Using CASE with an Aggregate Function",
        "content": "The following query counts employees in each salary category.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Using CASE with an Aggregate Function",
          "snippet": "SELECT\nSUM(CASE WHEN Salary < 50000 THEN 1 ELSE 0 END) AS LowSalary,\nSUM(CASE WHEN Salary BETWEEN 50000 AND 70000 THEN 1 ELSE 0 END) AS MediumSalary,\nSUM(CASE WHEN Salary > 70000 THEN 1 ELSE 0 END) AS HighSalary\nFROM Employee;"
        }
      },
      {
        "title": "6. Example 3: Using the Simple CASE Expression",
        "content": "The following query displays a description for each department.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: Using the Simple CASE Expression",
          "snippet": "SELECT EmployeeName,\n       Department,\n       CASE Department\n            WHEN 'HR' THEN 'Human Resources'\n            WHEN 'IT' THEN 'Information Technology'\n            WHEN 'Finance' THEN 'Finance Department'\n            ELSE 'Other Department'\n       END AS DepartmentDescription\nFROM Employee;"
        }
      },
      {
        "title": "7. Example 4: Using Simple CASE with an Aggregate Function",
        "content": "The following query counts employees in each department.\n\n**Query:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example 4: Using Simple CASE with an Aggregate Function",
          "snippet": "SELECT\nSUM(CASE Department WHEN 'HR' THEN 1 ELSE 0 END) AS HR,\nSUM(CASE Department WHEN 'IT' THEN 1 ELSE 0 END) AS IT,\nSUM(CASE Department WHEN 'Finance' THEN 1 ELSE 0 END) AS Finance\nFROM Employee;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Conditional Expressions in SQL: CASE, COALESCE & NULLIF",
      "initialCode": "CASE\n    WHEN condition1 THEN result1\n    WHEN condition2 THEN result2\n    ...\n    ELSE result\nEND",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Conditional Expressions in SQL: CASE, COALESCE & NULLIF ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Conditional Expressions in SQL: CASE, COALESCE & NULLIF in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Conditional Expressions in SQL: CASE, COALESCE & NULLIF",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Conditional Expressions in SQL: CASE, COALESCE & NULLIF is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-views": {
    "id": "sql-views",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "SQL Views: Creating, Updating & Dropping Virtual Tables",
    "subtitle": "Complete guide to SQL Views: Creating, Updating & Dropping Virtual Tables — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The SQL CREATE VIEW statement creates a virtual table based on a SELECT query. It does not store data itself but displays data from one or more tables when accessed.\n\n**Syntax:**\n\n- **CREATE VIEW view_name**: Creates a new view.\n- **AS**: Defines the query for the view.\n- **SELECT column1, column2...**: Specifies the columns to include.\n- **FROM table_name**: Specifies the source table(s).\n- **WHERE condition** (optional): Filters the data shown in the view.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Overview & Syntax",
          "snippet": "CREATE VIEW view_name ASSELECT column1, column2, ...FROM table_nameWHERE condition;"
        },
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Views: Creating, Updating & Dropping Virtual Tables."
        }
      },
      {
        "title": "2. Examples of CREATE VIEW Statement",
        "content": "The CREATE VIEW statement creates a virtual table based on a query result. It simplifies complex queries and helps control access to data."
      },
      {
        "title": "3. Example 1: Creating a Simple View",
        "content": "Consider the products table with columns product_id, product_name and price. The following view displays only the products whose price is greater than $100.\n\n**Query:**\n\n**Output:**\n\nOutput of Products priced above 100",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Example 1: Creating a Simple View",
          "snippet": "CREATE VIEW expensive_products ASSELECT product_id, product_name, priceFROM productsWHERE price > 100;"
        }
      },
      {
        "title": "4. Example 2: Creating a Joined View",
        "content": "Assume there are two tables, employees and departments. The following view combines data from both tables to display each employee's details along with their department name.\n\n**Query:**\n\n**Employees table:**\n\nEmployees table**Departments table:**\n\nDepartments table**Query:**\n\n**Output:**\n\nemployee_department_info View\n- A view named employee_department_info is created.\n- It displays employee_id, first_name, last_name and department_name.\n- An INNER JOIN is used between the employees and departments tables on department_id.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 2: Creating a Joined View",
          "snippet": "CREATE VIEW employee_department_info ASSELECT e.employee_id, e.first_name, e.last_name, d.department_nameFROM employees eJOIN departments d ON e.department_id = d.department_id;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Views: Creating, Updating & Dropping Virtual Tables",
      "initialCode": "CREATE VIEW view_name ASSELECT column1, column2, ...FROM table_nameWHERE condition;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Views: Creating, Updating & Dropping Virtual Tables ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Views: Creating, Updating & Dropping Virtual Tables in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Views: Creating, Updating & Dropping Virtual Tables",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Views: Creating, Updating & Dropping Virtual Tables is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-indexes": {
    "id": "sql-indexes",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "SQL Indexes: Accelerating Query Lookups",
    "subtitle": "Complete guide to SQL Indexes: Accelerating Query Lookups — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Relational Database Engine](/images/databases/sql-rdbms-arch.svg)\n\n- Indexes in SQL are special database structures that improve query performance by allowing faster access to data instead of scanning the entire table. They help retrieve records efficiently and enhance overall database performance.\n\n**Note:** Primary Key and Unique constraints automatically create indexes.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Indexes: Accelerating Query Lookups."
        }
      },
      {
        "title": "2. Creating an Index",
        "content": "There are three main ways to create an index in SQL, each serving different purposes based on how data is accessed and organized in a table. Indexes help improve query performance by allowing faster data retrieval."
      },
      {
        "title": "3. Single Column Indexes",
        "content": "A single-column index is created on just one column. It’s the most basic type of index and helps speed up queries when you frequently search, filter or sort by that column."
      },
      {
        "title": "4. Syntax",
        "content": "**Example:** First, we create a demo SQL database and table, on which we implement the Indexes.\n\n**Query:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Syntax",
          "snippet": "CREATE INDEX index_name \nON table_name (column);"
        }
      },
      {
        "title": "5. Multi Column Indexes",
        "content": "A multi-column index is created on two or more columns. It improves performance when queries filter or join based on multiple columns together.\n\n**Syntax:**\n\n**Query:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Multi Column Indexes",
          "snippet": "CREATE INDEX index_name \nON table_name (column1, column2,.....);"
        }
      },
      {
        "title": "6. Unique Indexes",
        "content": "A unique index ensures that all values in a column (or combination of columns) are unique preventing duplicates and maintaining data integrity.\n\n**Syntax:**\n\n**Query:**\n\nIf we try inserting a duplicate:\n\nIt will throw an error because customer_id = 201 already exists.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Unique Indexes",
          "snippet": "CREATE UNIQUE INDEX index_name \nON table_name (column_name);"
        }
      },
      {
        "title": "7. Confirming & Viewing Indexes",
        "content": "We can view the indexes of a table to confirm their names and structure using the `sp_helpindex` system procedure.\n\n**Syntax:**\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Confirming & Viewing Indexes",
          "snippet": "EXEC sp_helpindex 'table_name';"
        }
      },
      {
        "title": "8. Removing an Index",
        "content": "Indexes take up storage and add overhead on write operations (INSERT, UPDATE, DELETE). If an index is no longer needed, it can be removed.\n\n**Syntax:**\n\n**Query:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Removing an Index",
          "snippet": "DROP INDEX index_name \nON table_name;"
        }
      },
      {
        "title": "9. Altering an Index",
        "content": "If an index requires adjustments, such as reorganizing or rebuilding, it can be altered without affecting the data. This is useful for optimizing index performance as tables grow larger.\n\n**Syntax:**\n\n**Query:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 9. Altering an Index",
          "snippet": "ALTER INDEX index_name  \nON table_name REBUILD;"
        }
      },
      {
        "title": "10. Renaming an Index",
        "content": "In some cases, renaming an index might be necessary for clarity or consistency. While SQL does not directly support renaming indexes, we can use a combination of commands to achieve this.\n\n**Syntax:**\n\n**Query:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. Renaming an Index",
          "snippet": "EXEC sp_rename 'old_index_name', 'new_index_name', 'INDEX';"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Indexes: Accelerating Query Lookups",
      "initialCode": "CREATE INDEX index_name \nON table_name (column);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Indexes: Accelerating Query Lookups ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Indexes: Accelerating Query Lookups in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Indexes: Accelerating Query Lookups",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Indexes: Accelerating Query Lookups is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-clustered-nonclustered": {
    "id": "sql-clustered-nonclustered",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "12 min read",
    "level": "Intermediate",
    "title": "Clustered vs Non-Clustered Indexing Internals",
    "subtitle": "Complete guide to Clustered vs Non-Clustered Indexing Internals — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Indexing is a performance optimization technique in SQL Server that improves the speed of data retrieval. It help reduce query execution time by allowing the database to locate data more efficiently.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Clustered vs Non-Clustered Indexing Internals."
        }
      },
      {
        "title": "2. Clustered Index",
        "content": "A Clustered Index defines the physical order of rows in a table. When you create a clustered index on a column, SQL Server rearranges the actual data rows to match the index order. This is why a table can have only one clustered index. It is created only when both the following conditions are satisfied:\n\n- The data can be stored in a sequential or sorted manner.\n- The column used as the key must contain unique values."
      },
      {
        "title": "3. Example of Clustered Index",
        "content": "In the student table, roll_no is the primary key, so SQL Server automatically creates a clustered index on it. The rows are stored in ascending order of roll_no."
      },
      {
        "title": "4. Non-Clustered Index",
        "content": "A non-clustered index stores indexed values separately from the table and uses pointers to locate the actual rows. Multiple non-clustered indexes can be created to improve query performance.\n\n- Stores index data separately from the table.\n- Multiple non-clustered indexes can exist on a table.\n- Contains a copy of the indexed column(s) and a pointer to the actual data row."
      },
      {
        "title": "5. Example of Non-Clustered Index",
        "content": "In the student table, a non-clustered index can be created on the name column. It stores the indexed values separately along with pointers to the corresponding rows, improving search performance on the name column.\n\n** Query: **\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example of Non-Clustered Index",
          "snippet": "CREATE NONCLUSTERED INDEX nix_fte_name\nON student (name ASC);"
        }
      },
      {
        "title": "6. Clustered vs. Non-Clustered Index",
        "content": "Clustered IndexNon-Clustered IndexFaster for range-based queries and sorting.Better for specific lookups on non-key columns.Requires less memory for operations.Requires additional storage for the index structure.A table can have only one clustered index.A table can have multiple non-clustered indexes.Leaf nodes contain the actual table data.Leaf nodes contain index values and row pointers.Typically larger in size.Usually smaller in size.Ideal for range queries and ordered data retrieval.Suitable for optimizing searches, filters and joins on non-primary columns.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Clustered vs Non-Clustered Indexing Internals",
      "initialCode": "CREATE NONCLUSTERED INDEX nix_fte_name\nON student (name ASC);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Clustered vs Non-Clustered Indexing Internals ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Clustered vs Non-Clustered Indexing Internals in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Clustered vs Non-Clustered Indexing Internals",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Clustered vs Non-Clustered Indexing Internals is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-stored-procedures": {
    "id": "sql-stored-procedures",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "20 min read",
    "level": "Intermediate",
    "title": "Stored Procedures in SQL & PL/pgSQL",
    "subtitle": "Complete guide to Stored Procedures in SQL & PL/pgSQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Stored procedures are used to group SQL statements and business logic into a single reusable unit that runs inside the database. These help in tasks such as:\n\n- Executing multiple SQL statements as one operation.\n- Accepting input and returning output values.\n- Reducing repeated code in applications.\n- Enforcing consistent business rules across systems.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Stored Procedures in SQL & PL/pgSQL."
        }
      },
      {
        "title": "2. Syntax",
        "content": "- **CREATE PROCEDURE** – Creates a new stored procedure.\n- **@parameters** – Used to pass values into the procedure.\n- **BEGIN…END** – Contains the SQL code that the procedure runs.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "CREATE PROCEDURE procedure_name(parameter1 data_type, parameter2 data_type, ...)ASBEGIN   -- SQL statements to be executedEND"
        }
      },
      {
        "title": "3. Types of SQL Stored Procedures",
        "content": "SQL stored procedures are categorized into different types based on their use case and functionality. Understanding these categories can help developers choose the right type of procedure for a specific scenario"
      },
      {
        "title": "1. System Stored Procedures",
        "content": "These are predefined stored procedures provided by the SQL Server for performing administrative tasks such as database management, troubleshooting or system configuration. Examples include:\n\n- **sp_help: **viewing database object information\n- **sp_rename: **renaming database objects."
      },
      {
        "title": "2. User-Defined Stored Procedures (UDPs)",
        "content": "These are stored procedures created by users to perform specific business operations. Examples include:\n\n- procedures for calculating total sales\n- procedures for processing customer orders"
      },
      {
        "title": "3. Extended Stored Procedures",
        "content": "These are stored procedures that allow SQL Server to execute external programs written in languages such as C or C++. Examples include:\n\n- procedures that connect SQL Server to external tools\n- procedures that run operating system functions**4. CLR Stored Procedures**\n\nThese are stored procedures written in .NET languages like C# and executed inside SQL Server. Examples include:\n\n- procedures for complex string processing\n- procedures that call external web services"
      },
      {
        "title": "7. Benefits of SQL Stored Procedures",
        "content": "There are several key reasons why SQL Stored Procedures are widely used in database management:\n\n- **Performance Optimization: **Stored procedures run faster because they are precompiled.\n- **Security:** They limit direct access to tables and protect sensitive data.\n- **Code Reusability:** The same procedure can be used in many applications.\n- **Reduced Network Traffic:** Multiple operations run in one call.\n- **Easy Maintenance:** Updating a procedure updates all its uses automatically."
      },
      {
        "title": "8. Example",
        "content": "In this example, creates a stored procedure get_customers_by_country that takes a country and returns the customer_name and contact_name for customers from that country.\n\nBy passing a country as a parameter, the stored procedure dynamically fetches the relevant customer details from the table\n\n**Query:**\n\n**Output:**\n\n- The procedure takes a country name as input and filters the c`ustomers` table.\n- It returns customer_name and contact_name for all customers from that country (e.g., Sri Lanka).",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Example",
          "snippet": "CREATE PROCEDURE get_customers_by_country    @country VARCHAR(50)ASBEGIN    SELECT customer_name, contact_number    FROM customer    WHERE country = @country;END;EXEC get_customers_by_country @country = 'Sri Lanka';"
        }
      },
      {
        "title": "9. Real-World Use Cases",
        "content": "These are real-world scenarios where stored procedures are used.\n\n- **Order Processing System:** Automatically inserts new orders, updates stock and generates invoices.\n- **Employee Management System:** Calculates salaries, deducts taxes and creates monthly payslips.\n- **Data Validation:** Checks data (like existing email IDs) before inserting new records.\n- **Audit Logs:** Tracks changes to sensitive data such as user roles and permissions for security."
      },
      {
        "title": "10. Best Practices for Writing SQL Stored Procedures",
        "content": "These are guidelines for writing better stored procedures.\n\n- **Keep it Simple:** Write small and clear procedures for better readability.\n- **Use Error Handling:** Use TRY...CATCH to manage errors safely.\n- **Avoid Cursors:** Use set-based queries instead of cursors when possible.\n- **Use Parameters:** Don’t hardcode values; use parameters for flexibility.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Stored Procedures in SQL & PL/pgSQL",
      "initialCode": "CREATE PROCEDURE procedure_name(parameter1 data_type, parameter2 data_type, ...)ASBEGIN   -- SQL statements to be executedEND",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Stored Procedures in SQL & PL/pgSQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Stored Procedures in SQL & PL/pgSQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Stored Procedures in SQL & PL/pgSQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Stored Procedures in SQL & PL/pgSQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-triggers": {
    "id": "sql-triggers",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "28 min read",
    "level": "Intermediate",
    "title": "SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE)",
    "subtitle": "Complete guide to SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A trigger in SQL is a special stored procedure that runs automatically when an INSERT, UPDATE or DELETE operation occurs on a table. It helps automate actions and keep data consistent.\n\n**Example: **Automatically Track When a User Record Is Updated",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE)."
        }
      },
      {
        "title": "2. Step 1: Create Main Table",
        "content": "Query examples and implementation details for **Step 1: Create Main Table**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Step 1: Create Main Table",
          "snippet": "CREATE TABLE users (    id INT PRIMARY KEY,    name VARCHAR(50),    email VARCHAR(100),    updated_at TIMESTAMP);"
        }
      },
      {
        "title": "3. Step 2: Create Trigger",
        "content": "This trigger automatically updates the `updated_at` field whenever the user record is modified.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Step 2: Create Trigger",
          "snippet": "CREATE TRIGGER update_timestampBEFORE UPDATE ON usersFOR EACH ROWBEGIN    SET NEW.updated_at = CURRENT_TIMESTAMP;END;"
        }
      },
      {
        "title": "4. Step 3: Insert Sample Data",
        "content": "Query examples and implementation details for **Step 3: Insert Sample Data**:",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Step 3: Insert Sample Data",
          "snippet": "INSERT INTO users (id, name, email) VALUES (1, 'Amit', 'amit@example.com');"
        }
      },
      {
        "title": "5. Step 4: Update a Record",
        "content": "**Output:**\n\n**Syntax:**\n\n- The trigger has a name and runs on a specific table\n- It activates before or after an insert, update or delete action\n- It runs SQL code automatically for each affected row",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Step 4: Update a Record",
          "snippet": "UPDATE users SET email = 'amit_new@example.com' WHERE id = 1;"
        }
      },
      {
        "title": "6. Types of SQL Triggers",
        "content": "Triggers** **can be categorized into different types based on the action they are associated with:"
      },
      {
        "title": "1. DDL Triggers",
        "content": "Data Definition Language (DDL) triggers run when commands like CREATE, ALTER or DROP are used. They help track or stop changes to the database structure, such as creating, modifying or deleting tables.\n\n**Example: **Prevent Table Deletions\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. DDL Triggers",
          "snippet": "CREATE TRIGGER prevent_table_creationON DATABASEFOR CREATE_TABLE, ALTER_TABLE, DROP_TABLEAS BEGIN   PRINT 'you can not create, drop and alter table in this database';   ROLLBACK;END;"
        }
      },
      {
        "title": "2. DML Triggers",
        "content": "DML triggers fire when we manipulate data with commands like INSERT, UPDATE or DELETE. These triggers are perfect for scenarios where we need to validate data before it is inserted, log changes to a table or cascade updates across related tables.\n\n**Example:** To prevent unauthorized updates in a sensitive students table, we can create a trigger that blocks such changes.\n\n**Output:**\n\nDML Trigger**Note: **`ROLLBACK TRANSACTION` can included for safety, but in most cases `RAISERROR` itself will prevent the DML from completing.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. DML Triggers",
          "snippet": "CREATE TRIGGER prevent_updateON studentsFOR UPDATE, INSERT, DELETEASBEGIN    RAISERROR ('You can not insert, update and delete rows in this table.', 16, 1);END;"
        }
      },
      {
        "title": "3. Logon Triggers",
        "content": "Logon triggers run when a user logs in. They are used to track logins, control access and limit sessions. Messages from these triggers are stored in the SQL Server error log.\n\n**Example: **Track User Logins",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Logon Triggers",
          "snippet": "CREATE TRIGGER track_logonON LOGONASBEGIN   PRINT 'A new user has logged in.';END;"
        }
      },
      {
        "title": "1. Automatically Updating Related Tables (DML Trigger Example)",
        "content": "Triggers can automatically perform tasks when data changes in a table. For example, in a student database, when a student’s grades are updated, the total score should also be updated automatically.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Automatically Updating Related Tables (DML Trigger Example)",
          "snippet": "CREATE TRIGGER update_student_scoreAFTER UPDATE ON student_gradesFOR EACH ROWBEGIN   UPDATE total_scores   SET score = score + :new.grade   WHERE student_id = :new.student_id;END;"
        }
      },
      {
        "title": "2. Data Validation (Before Insert Trigger Example)",
        "content": "Triggers can be used to validate data before insertion. For example, a trigger can check that grades are between 0 and 100 before allowing them to be stored in the table.\n\nThe trigger checks if the inserted grade is valid. If not, it throws an error and prevents the insertion.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Data Validation (Before Insert Trigger Example)",
          "snippet": "CREATE TRIGGER validate_gradeBEFORE INSERT ON student_gradesFOR EACH ROWBEGIN   IF :new.grade < 0 OR :new.grade > 100 THEN      RAISE_APPLICATION_ERROR(-20001, 'Invalid grade value.');   END IF;END;"
        }
      },
      {
        "title": "12. Viewing and Managing Triggers in SQL",
        "content": "We can use a query to list all triggers in SQL Server, which helps us manage and track triggers across multiple databases.\n\n- **name**: The name of the trigger.\n- **is_instead_of_trigger**: Whether the trigger is an** **INSTEAD OF trigger.\n- **type = 'TR'**: This filters the results to show only triggers.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 12. Viewing and Managing Triggers in SQL",
          "snippet": "SELECT name, is_instead_of_triggerFROM sys.triggersWHERE type = 'TR';"
        }
      },
      {
        "title": "13. BEFORE and AFTER Triggers",
        "content": "SQL triggers can be specified to run BEFORE or AFTER the triggering event.\n\n- BEFORE Triggers run before an action (INSERT, UPDATE, DELETE) and are used for validation or changing values.\n- AFTER Triggers run after the action and are used for logging or updating other tables."
      },
      {
        "title": "14. Example: Using BEFORE Trigger for Calculations",
        "content": "In a Student Report Database, a trigger automatically calculates the total and percentage when a new record is added. A BEFORE INSERT trigger does this before saving the data.\n\n**Query:**\n\n**Output:**\n\nThis SQL statement creates a trigger that calculates total and percentage before inserting student marks into the database. The trigger runs automatically whenever new data is added.\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 14. Example: Using BEFORE Trigger for Calculations",
          "snippet": "mysql>>desc Student;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE)",
      "initialCode": "CREATE TABLE users (    id INT PRIMARY KEY,    name VARCHAR(50),    email VARCHAR(100),    updated_at TIMESTAMP);",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Triggers (BEFORE / AFTER INSERT, UPDATE, DELETE) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-cursors": {
    "id": "sql-cursors",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Database Cursors in SQL",
    "subtitle": "Complete guide to Database Cursors in SQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- A cursor in SQL is a database object used to process data one row at a time, useful when row-by-row handling is needed instead of bulk processing. It temporarily stores data for operations like SELECT, UPDATE or DELETE.\n\n- Useful for applying custom logic, conditional operations or step-by-step updates.\n- Common in PL/SQL or T-SQL for tasks like loops, conditional logic or complex procedures.Cursor",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Database Cursors in SQL."
        }
      },
      {
        "title": "2. Types of Cursors in SQL",
        "content": "SQL offers two main types of cursors, each suited for different scenarios and depending on how much control we want:"
      },
      {
        "title": "1. Implicit Cursors",
        "content": "In PL/SQL, when we perform INSERT, UPDATE or DELETE operations, an implicit cursor is automatically created. This cursor holds the data to be inserted or identifies the rows to be updated or deleted. We can refer to this cursor as the SQL cursor in our code. It is fully managed entirely by the SQL engine without explicit declaration.\n\n**Useful Attributes**:\n\n- **%FOUND**: True if the SQL operation affects at least one row.\n- **%NOTFOUND**: True if no rows are affected.\n- **%ROWCOUNT**: Returns the number of rows affected.\n- **%ISOPEN**: Checks if the cursor is open."
      },
      {
        "title": "4. Example: Using Implicit Cursor for Bulk Updates",
        "content": "This program updates a table by increasing the salary of each employee by 1500. After the update, the SQL%ROWCOUNT attribute is used to find out how many rows were affected by the operation.\n\n**Query:**\n\n**Output:**\n\n**Explanation:**\n\n- %BULK_ROWCOUNT and %BULK_EXCEPTIONS are used with the FORALL statement.\n- The FORALL statement is used to perform multiple DML operations efficiently.\n- %BULK_ROWCOUNT returns the number of rows affected by each DML operation.\n- %BULK_EXCEPTIONS returns information about exceptions that occur during bulk operations.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example: Using Implicit Cursor for Bulk Updates",
          "snippet": "DECLARE  \n   total_rows number; \nBEGIN \n   UPDATE employe\n   SET salary = salary + 1500; \n \n   total_rows := SQL%ROWCOUNT;\n \n   dbms_output.put_line(total_rows || ' rows updated.'); \nEND;"
        }
      },
      {
        "title": "2. Explicit Cursors",
        "content": "These are user-defined cursors created explicitly by users for custom operations. They provide complete control over every part of their lifecycle: declaration, opening, fetching, closing and deallocating.It is used for fetching data row-by-row with complete control over the cursor lifecycle.\n\n**Explicit cursors are useful when:**\n\n- We need to loop through results manually\n- Each row needs to be handled with custom logic\n- We need access to row attributes during processing"
      },
      {
        "title": "6. Example: Using an Explicit Cursor",
        "content": "Here is a complete example of declaring, opening, fetching, closing and deallocating a cursor. This workflow demonstrates how to use explicit cursors for row-by-row operations, including resource management and result retrieval.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example: Using an Explicit Cursor",
          "snippet": "DECLARE emp_cursor CURSOR FOR\nSELECT name, salary\nFROM employees;\n\nBEGIN\n    OPEN emp_cursor;\n\n    FETCH NEXT FROM emp_cursor INTO @name, @salary;\n\n    WHILE @@FETCH_STATUS = 0\n    BEGIN\n        PRINT 'Name: ' + @name + ', Salary: ' + CAST(@salary AS VARCHAR);\n\n        FETCH NEXT FROM emp_cursor INTO @name, @salary;\n    END;\n\n    CLOSE emp_cursor;\n    DEALLOCATE emp_cursor;\nEND;"
        }
      },
      {
        "title": "7. Cursor Syntax Breakdown in SQL",
        "content": "SQL Cursors allow you to process query results one row at a time. Below is a step-by-step explanation of how to create and use explicit cursors with simplified explanations and examples."
      },
      {
        "title": "1. Declare a Cursor",
        "content": "The first step in creating an explicit cursor is to declare it. This defines the cursor and associates it with a SQL query that determines the result set.\n\n**Syntax:**\n\n**Example:**\n\n**Explanation: **The DECLARE statement creates a cursor named s1, which is linked to the query SELECT * FROM employees. This cursor will allow row-by-row processing of the employees table.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Declare a Cursor",
          "snippet": "DECLARE cursor_name CURSOR FOR SELECT * FROM table_name"
        }
      },
      {
        "title": "2. Open Cursor Connection",
        "content": "After declaring the cursor, it needs to be opened. The OPEN statement executes the query associated with the cursor and prepares it for fetching rows. The OPEN s1 command initializes the cursor s1 and establishes a connection to its result set.\n\n**Syntax:**\n\n**Example:**\n\n**Explanation**: The cursor executes the associated query and makes the result set available for row-by-row processing.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Open Cursor Connection",
          "snippet": "OPEN cursor_connection"
        }
      },
      {
        "title": "3. Fetch Data from the Cursor",
        "content": "To retrieve data from the cursor, use the FETCH statement. SQL provides six methods to access data:\n\nModeDescriptionFIRSTFetches the first row in the result setLASTFetches the last rowNEXTFetches the next row (default behavior)PRIORFetches the previous rowABSOLUTE nFetches the nth rowRELATIVE nFetches a row relative to current position**Syntax:**\n\n**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Fetch Data from the Cursor",
          "snippet": "FETCH NEXT/FIRST/LAST/PRIOR/ABSOLUTE n/RELATIVE n FROM cursor_name"
        }
      },
      {
        "title": "4. Close Cursor Connection",
        "content": "After completing the required operations, the cursor should be closed to release the lock on the result set and free up resources.\n\n**Syntax:**\n\n**Example:**\n\n**Explanation:**\n\nThe CLOSE statement closes the cursor s1, terminating its connection to the result set. This ensures that the cursor is no longer available for fetching data.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Close Cursor Connection",
          "snippet": "CLOSE cursor_name"
        }
      },
      {
        "title": "5. Deallocate Cursor Memory",
        "content": "The final step is to deallocate the cursor to free up server memory. The DEALLOCATE statement removes the cursor definition and its associated resources from the memory. The DEALLOCATE statement completely removes the cursor s1 from memory, ensuring efficient resource usage.\n\n**Syntax:**\n\n**Example:**\n\n**Explanation**: This permanently removes the cursor definition from memory, keeping your server efficient.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Deallocate Cursor Memory",
          "snippet": "DEALLOCATE cursor_name"
        }
      },
      {
        "title": "13. How To Create an Implicit Cursor",
        "content": "An implicit cursor is automatically created by SQL when we execute a SQL statement. These cursors are managed behind the scenes by the SQL engine and do not require explicit declaration or management. To create an implicit cursor in PL/SQL, we simply need to execute a SQL statement.\n\n**Query:**\n\n**Explanation**: This loop implicitly creates a cursor to iterate through each row in the emp table and prints out employee names.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 13. How To Create an Implicit Cursor",
          "snippet": "BEGIN\n  FOR emp_rec IN SELECT * FROM emp LOOP\n    DBMS_OUTPUT.PUT_LINE('Employee name: ' || emp_rec.ename);\n  END LOOP;\nEND;"
        }
      },
      {
        "title": "14. SQL Cursor Exceptions",
        "content": "When using SQL cursors, there is always a possibility of encountering unexpected errors during execution. These errors can occur due to improper usage or conflicting operations. Below are some common exceptions you might face while working with cursors:"
      },
      {
        "title": "1. Duplicate Value Error",
        "content": "- This error occurs when the cursor attempts to insert a record or row that already exists in the database, causing a conflict due to duplicate values.\n- **Solution: **Use proper error handling mechanisms such as TRY-CATCH blocks or check for existing records before inserting data."
      },
      {
        "title": "2. Invalid Cursor State",
        "content": "- This error is triggered when the cursor is in an invalid state, such as attempting to fetch data from a cursor that is not open or already closed.\n- **Solution**: Ensure the cursor is properly opened before fetching data and closed only after completing all operations."
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Database Cursors in SQL",
      "initialCode": "DECLARE  \n   total_rows number; \nBEGIN \n   UPDATE employe\n   SET salary = salary + 1500; \n \n   total_rows := SQL%ROWCOUNT;\n \n   dbms_output.put_line(total_rows || ' rows updated.'); \nEND;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Database Cursors in SQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Database Cursors in SQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Database Cursors in SQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Database Cursors in SQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-transactions-acid": {
    "id": "sql-transactions-acid",
    "badge": "Module 5 • SQL & PostgreSQL",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID",
    "subtitle": "Complete guide to SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- An SQL transaction groups one or more SQL operations (e.g., `INSERT`, `UPDATE`, `DELETE`) into a single unit of work to ensure reliable data processing. It guarantees that all operations are completed successfully or none are applied, preserving data integrity.\n\n- Ensures consistency by committing all changes together.\n- Rolls back changes if any operation fails.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID."
        }
      },
      {
        "title": "2. ACID Properties of SQL Transactions",
        "content": "The reliability of SQL transactions is ensured by the ACID properties:\n\n- **Atomicity: ** A transaction is either fully completed or fully rolled back. If any part fails, the entire transaction fails.\n- **Consistency:** A transaction moves the database from one valid state to another while following all rules and constraint.\n- **Isolation:** Transactions run independently of each other, even when executed at the same time.\n- **Durability:** Once a transaction is committed, its changes remain permanent, even after a system failure"
      },
      {
        "title": "3. SQL Transaction Control Commands",
        "content": "Transaction Control Commands are used to manage transactions and control when changes are saved or undone."
      },
      {
        "title": "1. BEGIN TRANSACTION Command",
        "content": "Starts a new transaction. All SQL commands after this are treated as part of the same transaction until `COMMIT` or `ROLLBACK` is used.\n\n**Syntax:**\n\n**Example:** SQL Transaction with a Bank Transfer Scenario\n\nLet’s look at an example of a bank transfer between two accounts. This example demonstrates the usage of multiple queries in a single transaction.\n\n- Both UPDATE queries are executed as part of a single transaction.\n- If all updates succeed, COMMIT permanently saves the changes.\n- If any update fails, ROLLBACK cancels all changes to maintain consistency.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. BEGIN TRANSACTION Command",
          "snippet": "BEGIN TRANSACTION transaction_name ;"
        }
      },
      {
        "title": "2. COMMIT Command",
        "content": "The COMMIT command is used to save all changes made during the current transaction to the database. Once a transaction is committed, the changes are permanent.\n\n**Syntax:**\n\n**Example:** The student table contains basic details like id, name and age and will be used to demonstrate transaction commands such as SAVEPOINT, ROLLBACK and RELEASE.\n\nFollowing is an example which would delete those records from the table which have age = 20 and then COMMIT the changes in the database.\n\n**Query:**\n\n**Output**:\n\n- Rows with age = 20 are deleted.\n- The deletion is now permanent and cannot be undone."
      },
      {
        "title": "3. ROLLBACK Command",
        "content": "The ROLLBACK command undoes all changes in the current transaction, useful if something goes wrong or you want to cancel the changes. The database will revert to the state it was in before the BEGIN TRANSACTION was executed.\n\n**Syntax:**\n\n**Query:**\n\n**Output:**\n\n- Rows with age = 20 are deleted temporarily.\n- ROLLBACK restores the table to its original state before the delete.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. ROLLBACK Command",
          "snippet": "ROLLBACK;"
        }
      },
      {
        "title": "4. SAVEPOINT Command",
        "content": "A SAVEPOINT is like a marker inside a transaction. It lets you go back to a specific point without canceling the whole transaction.\n\n**Syntax:**\n\n**Query:**\n\n**Output:**\n\n- Create SP1 before deleting.\n- Delete students with age 20.\n- Create SP2 after deleting.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. SAVEPOINT Command",
          "snippet": "SAVEPOINT SAVEPOINT_NAME;"
        }
      },
      {
        "title": "5. ROLLBACK TO SAVEPOINT",
        "content": "The ROLLBACK TO SAVEPOINT command allows us to roll back the transaction to a specific savepoint, effectively undoing changes made after that point.\n\n**Syntax:**\n\n**Query:**\n\n**Output:**\n\n- Undo the delete, so students with age 20 come back.\n- Table goes back to how it was at SP1.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. ROLLBACK TO SAVEPOINT",
          "snippet": "ROLLBACK TO SAVEPOINT SAVEPOINT_NAME;"
        }
      },
      {
        "title": "6. RELEASE SAVEPOINT Command",
        "content": "RELEASE SAVEPOINT removes a savepoint so you can’t rollback to it. It helps manage transactions and their changes. It is used to initiate a database transaction and used to specify characteristics of the transaction that follows.\n\n**Syntax:**\n\n**Query:**\n\n**Output:**\n\n- Now SP2 is gone.\n- You cannot do ROLLBACK TO SP2 anymore.\n- Table does not change, it stays as it was after the last rollback.**For Example:** In banking system transactions ensure money transfers are safe by making sure either all steps succeed or all fail, keeping data consistent.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. RELEASE SAVEPOINT Command",
          "snippet": "RELEASE SAVEPOINT SAVEPOINT_NAME;"
        }
      },
      {
        "title": "10. Types of SQL Transactions",
        "content": "There are different types of transactions based on their nature and the specific operations they perform:\n\n- **Read Transactions**: Used to only read the data, typically with SELECT queries.\n- **Write Transactions**: These involve modifying the data in the database with INSERT, UPDATE or DELETE operations.\n- **Distributed Transactions**: These transactions span multiple databases and ensure consistency across them.\n- **Implicit Transactions**: Automatically started by SQL Server for certain operations.\n- **Explicit Transactions**: Manually controlled transactions where the user begins and ends the transaction using BEGIN TRANSACTION, COMMIT and ROLLBACK."
      },
      {
        "title": "11. Optimization",
        "content": "Following best practices helps improve transaction performance and reduces the risk of conflicts.\n\n- Monitor locks to avoid conflicts and deadlocks.\n- Keep transactions small to improve performance.\n- Use batching for handling large data operations efficiently.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID",
      "initialCode": "BEGIN TRANSACTION transaction_name ;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Transactions (COMMIT, ROLLBACK, SAVEPOINT) & ACID is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-er-model": {
    "id": "sql-er-model",
    "badge": "Module 6 • SQL & PostgreSQL",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Introduction to Entity-Relationship (ER) Model",
    "subtitle": "Complete guide to Introduction to Entity-Relationship (ER) Model — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The Entity-Relationship Model (ER Model) is a conceptual model for designing a database. This model represents the logical structure of a database, including entities, their attributes, and relationships between them.\n\n- **Entity:** An object that is stored as data. E.g: Student, Course, or Company.\n- **Attribute: **Properties that describe an entity. E.g: StudentID, CourseName, or EmployeeEmail.\n- **Relationship:** A connection between entities. E.g: Student enrolls in a Course.Components of ER DiagramThe graphical representation of this model is called an Entity-Relation Diagram (ERD).",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Introduction to Entity-Relationship (ER) Model."
        }
      },
      {
        "title": "2. ER Model in Database Design Process",
        "content": "We typically follow the below steps for designing a database for an application.\n\n- Gather the requirements (functional and data) by asking questions to the database users.\n- Create a logical or conceptual design of the database. This is where ER model plays a role. It is the most used graphical representation of the conceptual design of a database.\n- After this, focus on physical database design (like indexing) and external design (like views)."
      },
      {
        "title": "3. Uses of ER Diagrams in DBMS",
        "content": "- ER diagrams represent the E-R model in a database, making them easy to convert into relations (tables).\n- These diagrams serve the purpose of real-world modeling of objects which makes them intently useful.\n- Unlike technical schemas, ER diagrams require no technical knowledge of the underlying DBMS used.\n- They visually model data and its relationships, making complex systems easier to understand."
      },
      {
        "title": "4. Symbols Used in ER Model",
        "content": "ER Model is used to model the logical view of the system from a data perspective which consists of these symbols:\n\nSymbols used in ER Diagram"
      },
      {
        "title": "5. Entity",
        "content": "It represents a real-world object, concept or thing about which data is stored in a database. It act as a building block of a database. Tables in relational database represent these entities.\n\nExample of entities:\n\n- **Real-World Objects:** Person, Car, Employee etc.\n- **Concepts: **Course, Event, Reservation etc.\n- **Things: **Product, Document, Device etc.The entity type defines the structure of an entity, while individual instances of that type represent specific entities."
      },
      {
        "title": "6. Types of Entity",
        "content": "There are two main types of entities:"
      },
      {
        "title": "1. Strong Entity",
        "content": "A type of entity that has a key Attribute that can uniquely identify each instance of the entity. A Strong Entity does not depend on any other Entity in the Schema for its identification. It has a primary key that ensures its uniqueness and is represented by a rectangle in an ER diagram."
      },
      {
        "title": "2. Weak Entity",
        "content": "It cannot be uniquely identified by its own attributes alone. It depends on a strong entity to be identified. A weak entity is associated with an identifying entity (strong entity), which helps in its identification. A weak entity are represented by a double rectangle. The participation of weak entity types is always total. The relationship between the weak entity type and its identifying strong entity type is called identifying relationship and it is represented by a double diamond.\n\n**Example:**\n\nA company may store the information of dependents (Parents, Children, Spouse) of an Employee. But the dependents can't exist without the employee. So dependent will be a Weak Entity Type and Employee will be identifying entity type for dependent, which means it is Strong Entity Type.\n\nStrong Entity and Weak Entity"
      },
      {
        "title": "9. Entity Set",
        "content": "Refers to an individual object of an entity type, and the collection of all entities of a particular type is called an entity set. For example, E1 is an entity that belongs to the entity type \"Student,\" and the group of all students forms the entity set.\n\nEntity SetWe can represent the entity sets in an ER Diagram but we can't represent individual entities because an entity is like a row in a table, and an ER diagram shows the structure and relationships of data, not specific data entries (like rows and columns). An ER diagram is a visual representation of the data model, not the actual data itself."
      },
      {
        "title": "10. Attributes in ER Model",
        "content": "Attributes are the properties that define the entity type. For example, for a Student entity Roll_No, Name, DOB, Age, Address, and Mobile_No are the attributes that define entity type Student. In ER diagram, the attribute is represented by an oval.\n\nAttribute"
      },
      {
        "title": "1. Key Attribute",
        "content": "The attribute which uniquely identifies each entity in the entity set is called the key attribute. For example, Roll_No will be unique for each student. In ER diagram, the key attribute is represented by an oval with an underline.\n\nKey Attribute"
      },
      {
        "title": "2. Composite Attribute",
        "content": "An attribute composed of many other attributes is called a composite attribute. For example, the Address attribute of the student Entity type consists of Street, City, State, and Country. In ER diagram, the composite attribute is represented by an oval comprising of ovals.\n\nComposite Attribute"
      },
      {
        "title": "3. Multivalued Attribute",
        "content": "An attribute consisting of more than one value for a given entity. For example, Phone_No (can be more than one for a given student). In ER diagram, a multivalued attribute is represented by a double oval.\n\nMultivalued Attribute"
      },
      {
        "title": "4. Derived Attribute",
        "content": "An attribute that can be derived from other attributes of the entity type is known as a derived attribute. e.g.; Age (can be derived from DOB). In ER diagram, the derived attribute is represented by a dashed oval.\n\nDerived Attribute The Complete Entity Type Student with its Attributes can be represented as:\n\nEntity and Attributes"
      },
      {
        "title": "15. Relationship Type and Relationship Set",
        "content": "A Relationship Type represents the association between entity types. For example, ‘Enrolled in’ is a relationship type that exists between entity type Student and Course. In ER diagram, the relationship type is represented by a diamond and connecting the entities with lines.\n\nEntity-Relationship SetA set of relationships of the same type is known as a relationship set. The following relationship set depicts S1 as enrolled in C2, S2 as enrolled in C1, and S3 as registered in C3.\n\nRelationship Set"
      },
      {
        "title": "16. Degree of a Relationship Set",
        "content": "The number of different entity sets participating in a relationship set is called the degree of a relationship set.\n\n**1. Unary/Recursive Relationship:** When there is only ONE entity set participating in a relation. For example, one person is married to only one person.\n\nUnary Relationship**Read more about - Recursive Relationship\n\n2. Binary Relationship:** When there are TWO entities set participating in a relationship. For example, a Student is enrolled in a Course.\n\nBinary Relationship**3. Ternary Relationship:** When there are three entity sets participating in a relationship.\n\nTernary Relationship**4. N-ary Relationship:** When there are n entities set participating in a relationship, the relationship is called an n-ary relationship.\n\nN-ary Relationship"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Introduction to Entity-Relationship (ER) Model",
      "initialCode": "-- Introduction to Entity-Relationship (ER) Model\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Introduction to Entity-Relationship (ER) Model ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Introduction to Entity-Relationship (ER) Model in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Introduction to Entity-Relationship (ER) Model",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Introduction to Entity-Relationship (ER) Model is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-er-diagrams": {
    "id": "sql-er-diagrams",
    "badge": "Module 6 • SQL & PostgreSQL",
    "readingTime": "18 min read",
    "level": "Advanced",
    "title": "How to Design Entity-Relationship Diagrams (ERDs)",
    "subtitle": "Complete guide to How to Design Entity-Relationship Diagrams (ERDs) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- An Entity Relationship Diagram (ERD) is a graphical representation of a database that shows entities, attributes, and relationships between them.\n\n- Serves as a blueprint for database design.\n- Improves communication between designers, developers, and users.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for How to Design Entity-Relationship Diagrams (ERDs)."
        }
      },
      {
        "title": "2. Steps to Create an ERD",
        "content": "A step-by-step process to draw an entity relation diagram (ERD) is:\n\n- **Identifying Entities**: Determine the main objects you want to represent in the database. E.g., \"students\", \"courses\" or \"products\".\n- **Drawing Entities: **Draw entities as rectangles and label them with their names.\n- ** Defining Attributes: **Identify the properties (attributes) of each entity. These attributes provide more details about an entity.\n- **Adding Attributes: **Add attributes to the entities by either writing them inside the rectangle or connecting them using ovals and lines.\n- **Specifying Relationships: **Create relationships between entities to show how they interact with each other. Relationships are usually verbs like teaches, studies or sells.\n- **Connecting Entities: **Draw lines between the related entities to represent their connection.\n- **Specifying Cardinality: **Indicate the minimum and maximum number of relationship instances associated with an entity using notations like crow's foot.\n- **Organizing ER Diagram: **Organize all entities and relationships in a clean way for better readability and understanding."
      },
      {
        "title": "3. Sample ER Diagram",
        "content": "After learning how to draw an ER diagram, let’s create a demo using a bank example to understand its design and methods."
      },
      {
        "title": "4. Entity Relationship Diagram for BANK",
        "content": "An entity is a real-world object, either physical or conceptual, represented by a rectangle in an ER diagram.\n\n**Entities for Bank: **Bank, Branch, Employee, customer, loan, account."
      },
      {
        "title": "5. Adding Attributes",
        "content": "Attributes are the kind of properties that describe the entities. They are represented by ovals.\n\n**Attributes for Bank are: **\n\n- For Bank Entity the Attributes are Bname, code.\n- For Branch Entity the Attributes are Blocation, Bname.\n- For Employee Entity the Attributes are Eid, Designation, salary.\n- For Customer Entity the Attributes are Cid, Cname, Address, DOB.\n- For Loan Entity the Attributes are Loan_no, amount, rate.\n- For Account Entity the Attributes are acc_no, type."
      },
      {
        "title": "6. Establishing Relationships",
        "content": "Entities have some relationships with each other. Relationships define how entities are associated with each other.\n\n**Let's Establishing Relationships between them are:**\n\n- The Bank has branches.\n- The Branch provides loan.\n- The Employee works in branch.\n- The Branch contains customers.\n- The Customers has account.\n- The Branch maintains account.\n- The Customer avails loan."
      },
      {
        "title": "7. Specifying Cardinality",
        "content": "Cardinality defines the numerical constraints on the relationships between entities. It is a notation that tells the ERD reader whether there are one, many or some combination of those factors between each entity.\n\n**1. One to One relationship(1:1)**\n\nA One-to-One (1:1) relationship in an ERD means one entity in a table is linked to exactly one entity in another table. Examples:\n\n- One Driver → One License\n- One Person → One Passport**2. One to Many relationship(1:N)**\n\nA One-to-Many relationship means one entity in a table can be associated with multiple entities in another table. Examples:\n\n- One Bank → Many Branches\n- One Branch → Many Employees**3. Many to One(N:1)**\n\nA Many-to-One relationship means multiple entities in one table are linked to a single entity in another table. Examples:\n\n- Many Employees → One Branch\n- Many Accounts → One Customer\n- Many Loans → One Branch**4. Many to Many relationship(M:N)**\n\nA Many-to-Many relationship means multiple entities in one table are associated with multiple entities in another table. Examples:\n\n- Many Students ↔ Many Courses\n- Many Customers ↔ Many Products\n- Many Doctors ↔ Many Patients**Specify cardinality for Bank:**\n\n- Bank → Branch : One-to-Many (One bank has many branches)\n- Branch → Loan : One-to-Many (One branch provides many loans)\n- Branch → Employee : One-to-Many (One branch employs many employees)\n- Branch → Account : One-to-Many (One branch maintains many accounts)\n- Branch → Customer : One-to-Many (One branch has many customers)\n- Customer → Account : One-to-Many (One customer has many accounts)\n- Customer → Loan : One-to-Many (One customer can take many loans)"
      },
      {
        "title": "8. Identify Primary Keys",
        "content": "Primary keys are the unique identifier for each record in database table. It is denoted by an underline under the attribute name.\n\n- The Primary key of Bank is code.\n- The Primary key of Branch is Bcode.\n- The Primary key of Employee is Eid.\n- The Primary key of Customer is Cid.\n- The Primary key of Loan is loan_no.\n- The Primary key of Account is acc_no."
      },
      {
        "title": "9. Final ER Diagram",
        "content": "The below diagram is our final entity relationship diagram for bank with all entities, their attributes and the relationship between them with the PRIMARY KEY and Cardinality ratio.\n\nComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: How to Design Entity-Relationship Diagrams (ERDs)",
      "initialCode": "-- How to Design Entity-Relationship Diagrams (ERDs)\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: How to Design Entity-Relationship Diagrams (ERDs) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing How to Design Entity-Relationship Diagrams (ERDs) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via How to Design Entity-Relationship Diagrams (ERDs)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "How to Design Entity-Relationship Diagrams (ERDs) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-er-to-relational": {
    "id": "sql-er-to-relational",
    "badge": "Module 6 • SQL & PostgreSQL",
    "readingTime": "12 min read",
    "level": "Advanced",
    "title": "Mapping ER Models to Relational Schemas",
    "subtitle": "Complete guide to Mapping ER Models to Relational Schemas — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Converting an Entity-Relationship (ER) diagram to a Relational Model is an important step in database design. The ER model represents the conceptual structure of a database, and the Relational Model is a physical representation that can be directly implemented using a Relational Database Management System (RDBMS) like Oracle or MySQL.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Mapping ER Models to Relational Schemas."
        }
      },
      {
        "title": "2. Case 1: Binary Relationship with 1:1 cardinality with total participation of an entity",
        "content": "Binary Relationship with 1:1 cardinality with total participation of an entity **Note:** A person has 0 or 1 passport number and Passport is always owned by 1 person. So it is 1:1 cardinality with full participation constraint from Passport.\n\n- First Convert each entity and relationship to tables.\n- Person table corresponds to Person Entity with key as Per-Id. Similarly Passport table corresponds to Passport Entity with key as Pass-No.\n- Has Table represents relationship between Person and Passport (Which person has which passport). So it will take attribute Per-Id from Person and Pass-No from Passport. **  Table 1         **\n\n**Person** **Has** **Passport****Per-Id****Other Person Attribute****Per-Id****Pass-No****Pass-No****Other PassportAttribute**PR1-PR1PS1PS1-PR2-PR2PS2PS2-PR3-\n- As we can see from Table 1, each Per-Id and Pass-No has only one entry in  Has Table.\n- So we can merge all three tables into 1 with attributes shown in Table 2. Each Per-Id will be unique and not null. **Table 2**\n\nPer-IdOther Person AttributePass-NoOther PassportAttribute**Note: **So it will be the key. Pass-No can’t be key because for some person, it can be NULL."
      },
      {
        "title": "3. Case 2: Binary Relationship with 1:1 cardinality and partial participation of both entities",
        "content": "Binary Relationship with 1:1 cardinality and partial participation of both entities\n- A male marries 0 or 1 female and vice versa as well. So it is 1:1 cardinality with partial participation constraint from both.\n- First Convert each entity and relationship to tables.\n- Male table corresponds to Male Entity with key as M-Id. Similarly Female table corresponds to Female Entity with key as F-Id.\n- Marry Table represents relationship between Male and Female (Which Male marries which female). So it will take attribute M-Id from Male and F-Id from Female. **Table 3**\n\n**Male** **Marry** **Female**M-IdOther Male AttributeM-IdF-IdF-IdOther FemaleAttributeM1-M1F2F1-M2-M2F1F2-M3-    F3-\n- As we can see from Table 3, some males and some females do not marry.\n- If we merge 3 tables into 1, for some M-Id, F-Id will be NULL. So there is no attribute which is always not NULL.\n- So we can’t merge all three tables into 1. We can convert into 2 tables. In table 4, M-Id who are married will have F-Id associated. For others, it will be NULL.\n- Table 5 will have information of all females. Primary Keys have been underlined. **Table 4   **\n\nM-IdOther Male AttributeF-Id**Table 5    **\n\nF-IdOther FemaleAttribute**Note:** Binary relationship with 1:1 cardinality will have 2 table if partial participation of both entities in the relationship. If atleast 1 entity has total participation, number of tables required will be 1."
      },
      {
        "title": "4. Case 3: Binary Relationship with n: 1 cardinality",
        "content": "Binary Relationship with n: 1 cardinality\n- In this scenario, every student can enroll only in one elective course but for an elective course there can be more than one student.\n- First Convert each entity and relationship to tables.  Student table corresponds to Student Entity with key as S-Id.\n- Similarly Elective_Course table corresponds to Elective_Course Entity with key as E-Id.\n- Enrolls Table represents relationship between Student and Elective_Course (Which student enrolls in which course). So it will take attribute S-Id from Student and E-Id from Elective_Course. **Table 6**\n\n**Student** **Enrolls** **Elective_Course**S-IdOther Student AttributeS-IdE-IdE-IdOther Elective CourseAttributeS1-S1E1E1-S2-S2E2E2-S3- S3E1 E3-S4- S4E1\n- As we can see from Table 6, S-Id is not repeating in Enrolls Table. So it can be considered as a key of Enrolls table.\n- Both Student and Enrolls Table’s key is same. We can merge it as a single table. **Table 7 **\n\nS-IdOther Student AttributeE-Id**Table 8**\n\nE-IdOther Elective CourseAttribute**Note:** The resultant tables are shown in Table 7 and Table 8. Primary Keys have been underlined."
      },
      {
        "title": "5. Case 4: Binary Relationship with m: n cardinality",
        "content": "Binary Relationship with m: n cardinality\n- In this scenario, every student can enroll in more than 1 compulsory course and for a compulsory course there can be more than 1 student.\n- First Convert each entity and relationship to tables.  Student table corresponds to Student Entity with key as S-Id.\n- Similarly Compulsory_Courses table corresponds to Compulsory Courses Entity with key as C-Id.\n- Enrolls Table represents relationship between Student and Compulsory_Courses (Which student enrolls in which course). So it will take attribute S-Id from Student and C-Id from Compulsory_Courses. **Table 9**\n\n**Student** **Enrolls** **Compulsory_Courses**S-IdOther Student AttributeS-IdC-IdC-IdOther Compulsory CourseAttributeS1-S1C1C1-S2-S1C2C2-S3- S3C1 C3-S4- S4C3 C4-   S4C2      S3C3\n- As we can see from Table 9, S-Id and C-Id both are repeating in Enrolls Table.\n- But its combination is unique; so it can be considered as a key of Enrolls table. **Note:** All tables’ keys are different, these can’t be merged.  Primary Keys of all tables have been underlined."
      },
      {
        "title": "6. Case 5: Binary Relationship with weak entity",
        "content": "Binary Relationship with weak entity\n- In this scenario, an employee can have many dependents and one dependent can depend on one employee.\n- A dependent does not have any existence without an employee (e.g; you as a child can be dependent of your father in his company).\n- So it will be a weak entity and its participation will always be total. Weak Entity does not have key of its own.\n- So its key will be combination of key of its identifying entity (E-Id of Employee in this case) and its partial key (D-Name). ** Table 10**\n\n**Employee** **Has** **Dependents**E-IdOther Employee AttributeE-IdD-NameD-NameE-IdOther DependentsAttributeE1-E1RAMRAME1-E2-E1SRINISRINIE1-E3-E2RAMRAME2-  E3ASHISHASHISHE3-\n- First Convert each entity and relationship to tables.  Employee table corresponds to Employee Entity with key as E-Id.\n- Similarly Dependents table corresponds to Dependent Entity with key as  D-Name and E-Id.\n- Has Table represents relationship between Employee and Dependents (Which employee has which dependents). So it will take attribute E-Id from Employee and D-Name from Dependents.  **Table 11**\n\nE-IdOther Employee Attribute\n- As we can see from Table 10, E-Id, D-Name is key for **Has** as well as Dependents Table.\n- So we can merge these two into 1. **Table 12**\n\nD-NameE-IdOther DependentsAttribute**Note**: So the resultant tables are shown in Tables 11 and 12. Primary Keys of all tables have been underlined.\n\nComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Mapping ER Models to Relational Schemas",
      "initialCode": "-- Mapping ER Models to Relational Schemas\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Mapping ER Models to Relational Schemas ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Mapping ER Models to Relational Schemas in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Mapping ER Models to Relational Schemas",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Mapping ER Models to Relational Schemas is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-functional-dependency": {
    "id": "sql-functional-dependency",
    "badge": "Module 6 • SQL & PostgreSQL",
    "readingTime": "10 min read",
    "level": "Advanced",
    "title": "Functional Dependency and Attribute Closure in DBMS",
    "subtitle": "Complete guide to Functional Dependency and Attribute Closure in DBMS — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Functional dependency and attribute closure are essential for maintaining data integrity and building effective, organized, and normalized databases. The attribute closure of an attribute set can be defined as a set of attributes that can be functionally determined from it.\n\n- Helps to identify all possible attributes that can be derived from a set of given attributes.\n- It can be computationally expensive, especially for large datasets.\n- Helps in database design by showing how attributes and tables are related, which can improve query performance.\n- It becomes complex to manage as the number of attributes and tables increases.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Functional Dependency and Attribute Closure in DBMS."
        }
      },
      {
        "title": "2. Find the Attribute Closure of an Attribute Set",
        "content": "- Add elements of the attribute set to the result set.\n- Recursively add elements to the result set that can be functionally determined from the elements of the result set.STUD_NOSTUD_NAMESTUD_PHONESTUD_STATESTUD_COUNTRYSTUD_AGE1JOHN2025550147CaliforniaUSA202EMMA3035550192TexasUSA193LIAM4165550138OntarioCanada184SOPHIA2075550175LondonUK21Using FD set of table 1, attribute closure can be determined as:\n\n(STUD_NO)+= {STUD_NO, STUD_NAME, STUD_PHONE, STUD_STATE, STUD_COUNTRY, STUD_AGE}\n(STUD_STATE)+ = {STUD_STATE, STUD_COUNTRY}"
      },
      {
        "title": "3. Find Candidate Keys and Super Keys Using Attribute Closure",
        "content": "- If attribute closure of an attribute set contains all attributes of relation, the attribute set will be super key of the relation.\n- If no subset of this attribute set can functionally determine all attributes of the relation, the set will be candidate key as well. For Example, using FD set of table 1(STUD_NO, STUD_NAME)+ = {STUD_NO, STUD_NAME, STUD_PHONE, STUD_STATE, STUD_COUNTRY, STUD_AGE}\n\n(STUD_NO)+= {STUD_NO, STUD_NAME, STUD_PHONE, STUD_STATE, STUD_COUNTRY, STUD_AGE}\n\n(STUD_NO, STUD_NAME) will be super key but not candidate key because its subset (STUD_NO)+ is equal to all attributes of the relation. So, STUD_NO will be a candidate key."
      },
      {
        "title": "4. Prime and Non-Prime Attributes",
        "content": "Attributes which are parts of any candidate key of relation are called as prime attribute, others are non-prime attributes. For Example, STUD_NO in STUDENT relation is prime attribute, others are non-prime attribute.\n\nRead more about - Finding Attribute Closure and Candidate Keys using Functional Dependencies"
      },
      {
        "title": "5. GATE Questions",
        "content": "**Q.1: **Consider the relation scheme R = {E, F, G, H, I, J, K, L, M, N} and the set of functional dependencies {{E, F} -> {G}, {F} -> {I, J}, {E, H} -> {K, L}, K -> {M}, L -> {N} on R. What is the key for R? (GATE-CS-2014)\n\nA. {E, F} **B. {E, F, H}\nC. {E, F, H, K, L}\nD. {E}\n\nSolution:**\n\n** Finding attribute closure of all given options, we get:\n{E,F}+ = {EFGIJ}\n{E,F,H}+= {EFHGIJKLMN}\n{E,F,H,K,L}+ = {EFHGIJKLMN}\n{E}+= {E}\n{EFH}+ and {EFHKL}+ results in set of all attributes, but EFH is minimal. So it will be candidate key. So correct option is (B).\n\nQ.2:** How to check whether an FD can be derived from a given FD set?\n\n**Solution:**\n\n**To check whether an FD A->B can be derived from an FD set F,\n\n- Find (A)+ using FD set F.\n- If B is subset of (A)+, then A->B is true else not true.\n\nQ.3:** In a schema with attributes A, B, C, D and E following set of functional dependencies are given **{A -> B, A -> C, CD -> E, B -> D, E -> A}\nWhich of the following functional dependencies is NOT implied by the above set? (GATE IT 2005)\n\nA. CD -> AC\nB. BD -> CD\nC. BC -> CD\nD. AC -> BC\n\nSolution:**\n\n**Using FD set given in question,\n(CD)+ = {CDEAB} which means CD -> AC also holds true.\n(BD)+ = {BD} which means BD -> CD can't hold true. So this FD is no implied in FD set. So (B) is the required option.\nOthers can be checked in the same way.\n\nQ.4:** Consider a relation scheme R = (A, B, C, D, E, H) on which the following functional dependencies hold: {A–>B, BC–> D, E–>C, D–>A}. What are the candidate keys of R? [GATE 2005]\n\n(a) AE, BE **(b) AE, BE, DE\n(c) AEH, BEH, BCH\n(d) AEH, BEH, DEH\n\nSolution:**\n\n(AE)+ = {ABECD} which is not set of all attributes. So AE is not a candidate key. Hence option A and B are wrong.\n(AEH)+= {ABCDEH}\n(BEH)+ = {BEHCDA}\n(BCH)+= {BCHDA} which is not set of all attributes. So BCH is not a candidate key. Hence option C is wrong.\nSo correct answer is D.\n\nComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Functional Dependency and Attribute Closure in DBMS",
      "initialCode": "-- Functional Dependency and Attribute Closure in DBMS\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Functional Dependency and Attribute Closure in DBMS ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Functional Dependency and Attribute Closure in DBMS in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Functional Dependency and Attribute Closure in DBMS",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Functional Dependency and Attribute Closure in DBMS is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-normalization-intro": {
    "id": "sql-normalization-intro",
    "badge": "Module 6 • SQL & PostgreSQL",
    "readingTime": "8 min read",
    "level": "Advanced",
    "title": "Database Normalization & Anomaly Elimination",
    "subtitle": "Complete guide to Database Normalization & Anomaly Elimination — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Database normalization is the process of organizing data into well-structured tables to reduce data redundancy and prevent data anomalies.\n\n- It divides large tables into smaller related tables and establishes relationships between them.\n- It helps maintain data consistency and reduces insertion, update, and deletion anomalies.**\n- Before Normalization:** The table may contain redundant data and suffer from insertion, update, and deletion anomalies.\n- **After Normalization:** The data is divided into logical, related tables to reduce redundancy, prevent anomalies, and improve data consistency.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Database Normalization & Anomaly Elimination."
        }
      },
      {
        "title": "2. Need of Normalization",
        "content": "Normalization is used to reduce problems that occur when the same data is stored repeatedly in a database.\n\n- **Insertion Anomaly:** Occurs when poor table design prevents a new fact from being added without also requiring unrelated or unnecessary data.\n- **Update Anomaly:** Occurs when the same data is stored in multiple rows and must be updated in several places.\n- **Deletion Anomaly:** Occurs when deleting data unintentionally removes other important information."
      },
      {
        "title": "3. Features of Database Normalization",
        "content": "- **Reduces Data Redundancy:** Minimizes unnecessary repetition of the same data.\n- **Improves Data Consistency:** Helps ensure that the same information remains consistent across the database.\n- **Reduces Data Anomalies:** Prevents insertion, update, and deletion problems.\n- **Improves Database Structure:** Organizes data into related tables, making the database easier to maintain.\n- **Maintains Data Integrity:** Helps ensure that relationships and dependencies between data are properly maintained."
      },
      {
        "title": "4. Normal Forms in DBMS",
        "content": "Normal Forms\n\nDescription of Normal Forms\n\n**First Normal Form (1NF)**\n\nEach attribute contains atomic (single) values, and there are no repeating groups.\n\n**Second Normal Form (2NF)**\n\nThe relation is in 1NF and every non-prime attribute is fully functionally dependent on the whole candidate key, with no partial dependency.\n\n**Third Normal Form (3NF)**\n\nThe relation is in 2NF and has no transitive dependency of a non-prime attribute on a candidate key.\n\n**Boyce-Codd Normal Form (BCNF)**\n\nFor every non-trivial functional dependency X → Y, X must be a superkey.\n\n**Fourth Normal Form (4NF)**\n\nThe relation is in BCNF and has no non-trivial multivalued dependency unless its determinant is a superkey.\n\n**Fifth Normal Form (5NF)**\n\nThe relation is in 4NF and has no non-trivial join dependencies that require further lossless decomposition.\n\nComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Database Normalization & Anomaly Elimination",
      "initialCode": "-- Database Normalization & Anomaly Elimination\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Database Normalization & Anomaly Elimination ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Database Normalization & Anomaly Elimination in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Database Normalization & Anomaly Elimination",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Database Normalization & Anomaly Elimination is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-normal-forms": {
    "id": "sql-normal-forms",
    "badge": "Module 6 • SQL & PostgreSQL",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF)",
    "subtitle": "Complete guide to Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF) — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Normal forms are a set of progressive rules (or design checkpoints) for relational schemas that reduce redundancy and prevent data anomalies. Each normal form ( 1NF, 2NF, 3NF, BCNF, 4NF, 5NF ) is stricter than the previous one: meeting a higher normal form implies the lower ones are satisfied. Think of them as layers of cleanliness for your tables: the deeper you go, the fewer redundancy and integrity problems you’ll have.\n\n**Benefits of using Normal Forms**\n\n- Reduce duplicate data and wasted storage.\n- Prevent insert, update, and delete anomalies.\n- Improve data consistency and integrity.\n- Make the schema easier to maintain and evolve.Hierarchy of Database Normal FormsThe above diagram shows the hierarchy of database normal forms. Each inner circle represents a stricter level of normalization, starting from 1NF (basic structure) to 5NF (most refined). As you move inward, data redundancy reduces, and data integrity improves. Each level builds upon the previous one to ensure a cleaner and more efficient database design.\n\nLet's break down the various normal forms step-by-step to understand the conditions that need to be satisfied at each level:",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF)."
        }
      },
      {
        "title": "1. First Normal Form (1NF): Eliminating Duplicate Records",
        "content": "A table is in 1NF if it satisfies the following conditions:\n\n- All columns contain atomic values (i.e., indivisible values).\n- Each row is unique (i.e., no duplicate rows).\n- Each column has a unique name.\n- The order in which data is stored does not matter.**Example of 1NF Violation: **If a table has a column \"Phone Numbers\" that stores multiple phone numbers in a single cell, it violates 1NF. To bring it into 1NF, you need to separate phone numbers into individual rows."
      },
      {
        "title": "2. Second Normal Form (2NF): Eliminating Partial Dependency",
        "content": "A relation is in 2NF if it satisfies the conditions of 1NF and additionally, contains no partial dependency exists, meaning every non-prime attribute (non-key attribute) must depend on the entire primary key, not just a part of it.\n\n**Example:** For a composite key (StudentID, CourseID), if the \"StudentName\" depends only on \"StudentID\" and not on the entire key, it violates 2NF. To normalize, move StudentName into a separate table where it depends only on \"StudentID\"."
      },
      {
        "title": "3. Third Normal Form (3NF): Eliminating Transitive Dependency",
        "content": "A relation is in 3NF if it satisfies 2NF and additionally, there are no transitive dependencies. In simpler terms, non-prime attributes should not depend on other non-prime attributes.\n\n**Example:** Consider a table with (StudentID, CourseID, Instructor). If Instructor depends on \"CourseID\", and \"CourseID\" depends on \"StudentID\", then Instructor indirectly depends on \"StudentID\", which violates 3NF. To resolve this, place Instructor in a separate table linked by \"CourseID\"."
      },
      {
        "title": "4. Boyce-Codd Normal Form (BCNF): The Strongest Form of 3NF",
        "content": "BCNF is a stricter version of 3NF where for every non-trivial functional dependency (X → Y), X must be a superkey (a unique identifier for a record in the table).\n\n**Example:** If a table has a dependency (StudentID, CourseID) → Instructor, but neither \"StudentID\" nor \"CourseID\" is a superkey, then it violates BCNF. To bring it into BCNF, decompose the table so that each determinant is a candidate key."
      },
      {
        "title": "5. Fourth Normal Form (4NF): Removing Multi-Valued Dependencies",
        "content": "A table is in 4NF if it is in BCNF and has no multi-valued dependencies. A multi-valued dependency occurs when one attribute determines another, and both attributes are independent of all other attributes in the table.\n\n**Example:** Consider a table where (StudentID, Language, Hobby) are attributes. If a student can have multiple hobbies and languages, a multi-valued dependency exists. To resolve this, split the table into separate tables for Languages and Hobbies."
      },
      {
        "title": "6. Fifth Normal Form (5NF): Eliminating Join Dependency",
        "content": "5NF is achieved when a table is in 4NF and all join dependencies are removed. This form ensures that every table is fully decomposed into smaller tables that are logically connected without losing information.\n\n**Example:** If a table contains (StudentID, Course, Instructor) and there is a dependency where all combinations of these columns are needed for a specific relationship, you would split them into smaller tables to remove redundancy."
      },
      {
        "title": "8. Common Challenges of Over-Normalization",
        "content": "While normalization is a powerful tool for optimizing databases, it's important not to over-normalize your data. Excessive normalization can lead to:\n\n- **Complex Queries**: Too many tables may result in multiple joins, making queries slow and difficult to manage.\n- **Performance Overhead**: Additional processing required for joins in overly normalized databases may hurt performance, especially in large-scale systems.In many cases, denormalization (combining tables to reduce the need for complex joins) is used for performance optimization in specific applications, such as reporting systems."
      },
      {
        "title": "9. When to Use Normalization and Denormalization",
        "content": "- **Normalization** is best suited for transactional systems where data integrity is paramount, such as banking systems and enterprise applications.\n- **Denormalization** is ideal for read-heavy applications like data warehousing and reporting systems where performance and query speed are more critical than data integrity."
      },
      {
        "title": "10. Applications",
        "content": "- **Ensures Data Consistency**: Prevents data anomalies by ensuring each piece of data is stored in one place, reducing inconsistencies.\n- **Reduces Data Redundancy**: Minimizes repetitive data, saving storage space and avoiding errors in data updates or deletions.\n- **Improves Query Performance**: Simplifies queries by breaking large tables into smaller, more manageable ones, leading to faster data retrieval.\n- **Easier Database Maintenance**: Simplifies updates, deletions, and modifications by ensuring that changes only need to be made in one place, reducing the risk of errors.\n- **Supports Better Data Modeling**: Helps in designing databases that are logically structured, with clear relationships between tables, making it easier to understand and manage.\n- **Optimizes Storage Efficiency**: By organizing data into smaller tables, storage is used more efficiently, reducing the overhead for large databases."
      },
      {
        "title": "11. Related Links",
        "content": "- GATE CS 2012, Question 2\n- GATE CS 2013, Question 54\n- GATE CS 2013, Question 55\n- GATE CS 2005, Question 29\n- GATE CS 2002, Question 23\n- GATE CS 2002, Question 50\n- GATE CS 2001, Question 48\n- GATE CS 1999, Question 32\n- GATE IT 2005, Question 22\n- GATE IT 2008, Question 60\n- GATE CS 2016 (Set 1), Question 31Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF)",
      "initialCode": "-- Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF)\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF) ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF) in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF)",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Normal Forms in DBMS (1NF, 2NF, 3NF, BCNF, 4NF) is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-mysql-vs-postgresql": {
    "id": "sql-mysql-vs-postgresql",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "5 min read",
    "level": "Advanced",
    "title": "MySQL vs PostgreSQL: Architectural Comparison",
    "subtitle": "Complete guide to MySQL vs PostgreSQL: Architectural Comparison — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- MySQL and PostgreSQL are two popular open-source relational database management systems (RDBMS). Both use SQL to store, manage and retrieve data, but they differ in features, performance and use cases.\n\n- **MySQL** is known for its simplicity, speed and ease of use.\n- **PostgreSQL** is known for its advanced features, extensibility and standards compliance.The table below shows the major differences between MySQL and PostgreSQL:\n\nMySQLPostgreSQLMySQL is an open-source relational database developed by Oracle.PostgreSQL is an open-source relational database developed by the PostgreSQL community.Focuses on speed and simplicity.Focuses on advanced features and extensibility.Easier for beginners to learn and manage.Offers more advanced functionality and customization.Better suited for simple web applications.Better suited for complex and large-scale applications.Provides limited support for advanced SQL features.Supports many advanced SQL features and standards.Supports JSON data, but with fewer advanced features.Provides powerful JSON and JSONB support.Commonly used in websites, blogs and e-commerce applications.Commonly used in analytics, enterprise systems and geospatial applications.Examples: WordPress, Joomla, Drupal.Examples: Data warehouses, GIS applications, financial systems.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for MySQL vs PostgreSQL: Architectural Comparison."
        }
      },
      {
        "title": "2. How to Choose Between MySQL and PostgreSQL",
        "content": "The choice between MySQL and PostgreSQL depends on your application requirements, performance needs and complexity of data operations.\n\n**Choose MySQL if:**\n\n- You need a simple and easy-to-manage database.\n- Your application is primarily read-heavy.\n- You are building websites, blogs or e-commerce platforms.\n- Fast query performance for straightforward operations is important.\n- You want broad hosting and community support. **Choose PostgreSQL if:**\n\n- You need advanced SQL features and standards compliance.\n- Your application requires complex queries and transactions.\n- You work with JSON, geospatial or analytical data.\n- Data integrity and reliability are critical.\n- You are building enterprise, financial or data-intensive applicationsComment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: MySQL vs PostgreSQL: Architectural Comparison",
      "initialCode": "-- MySQL vs PostgreSQL: Architectural Comparison\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: MySQL vs PostgreSQL: Architectural Comparison ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing MySQL vs PostgreSQL: Architectural Comparison in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via MySQL vs PostgreSQL: Architectural Comparison",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "MySQL vs PostgreSQL: Architectural Comparison is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-postgresql-upsert-cte": {
    "id": "sql-postgresql-upsert-cte",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes",
    "subtitle": "Complete guide to PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The PostgreSQL UPSERT operation is used to insert a new row into a table or update an existing row if a conflict occurs. It is implemented using the INSERT ... ON CONFLICT clause, which helps prevent duplicate records and simplifies insert-or-update operations.\n\n- Prevent duplicate records based on PRIMARY KEY or UNIQUE constraints.\n- Simplify data synchronization and bulk data operations.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**Where:**\n\n- **table_name:** The table where data will be inserted or updated.\n- **conflict_column:** A column with a `PRIMARY KEY` or `UNIQUE` constraint used to detect conflicts.\n- **EXCLUDED:** Refers to the values that were attempted to be inserted.\n- **DO UPDATE:** Updates the existing row if a conflict occurs.\n- **DO NOTHING:** Skips the insert operation if a conflict occurs.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "INSERT INTO table_name (column1, column2, ...)\nVALUES (value1, value2, ...)\nON CONFLICT (conflict_column)\nDO UPDATE\nSET column1 = EXCLUDED.column1,\n    column2 = EXCLUDED.column2;"
        }
      },
      {
        "title": "3. Working with the UPSERT Statement",
        "content": "Firstly, create an Inventory table and insert some records into it.\n\nInventory Table"
      },
      {
        "title": "4. Example 1: Update an Existing Row Using UPSERT",
        "content": "The following query attempts to insert a row with ID = 1. Since the row already exists, PostgreSQL updates the existing record.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Update an Existing Row Using UPSERT",
          "snippet": "INSERT INTO Inventory (ID, Name, Price, Quantity)\nVALUES (1, 'A', 16.99, 120)\nON CONFLICT (ID)\nDO UPDATE\nSET\n    Price = EXCLUDED.Price,\n    Quantity = EXCLUDED.Quantity;\n\nSELECT * FROM Inventory\nWHERE ID = 1;"
        }
      },
      {
        "title": "5. Example 2: Insert a New Row Using UPSERT",
        "content": "The following query inserts a new row because ID = 4 does not exist.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Insert a New Row Using UPSERT",
          "snippet": "INSERT INTO Inventory (ID, Name, Price, Quantity)\nVALUES (4, 'D', 29.99, 20)\nON CONFLICT (ID)\nDO UPDATE\nSET\n    Price = EXCLUDED.Price,\n    Quantity = EXCLUDED.Quantity;\n\nSELECT * FROM Inventory\nWHERE ID = 4;"
        }
      },
      {
        "title": "6. Example 3: Skip Insert Using ON CONFLICT DO NOTHING",
        "content": "The following query skips the insert operation if a row with the same ID already exists.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: Skip Insert Using ON CONFLICT DO NOTHING",
          "snippet": "INSERT INTO Inventory (ID, Name, Price, Quantity)\nVALUES (1, 'A', 16.99, 120)\nON CONFLICT (ID)\nDO NOTHING;\n\nSELECT * FROM Inventory\nWHERE ID = 1;"
        }
      },
      {
        "title": "7. Example 4: UPSERT Using ON CONFLICT ON CONSTRAINT",
        "content": "The following query uses the primary key constraint to detect conflicts.\n\n**Query:**\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example 4: UPSERT Using ON CONFLICT ON CONSTRAINT",
          "snippet": "INSERT INTO Inventory (ID, Name, Price, Quantity)\nVALUES (1, 'A', 18.99, 150)\nON CONFLICT ON CONSTRAINT inventory_pkey\nDO UPDATE\nSET\n    Price = EXCLUDED.Price,\n    Quantity = EXCLUDED.Quantity;\n\nSELECT * FROM Inventory\nWHERE ID = 1;"
        }
      },
      {
        "title": "8. Example 5: UPSERT Using WHERE",
        "content": "The following query updates the existing row only if the current quantity is greater than 50.\n\n**Query:**\n\n**Output:**\n\nComment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Example 5: UPSERT Using WHERE",
          "snippet": "INSERT INTO Inventory (ID, Name, Price, Quantity)\nVALUES (1, 'A', 19.99, 80)\nON CONFLICT (ID)\nDO UPDATE\nSET Price = EXCLUDED.Price,\n    Quantity = EXCLUDED.Quantity\nWHERE Inventory.Quantity > 50;\n\nSELECT * FROM Inventory\nWHERE ID = 1;"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes",
      "initialCode": "INSERT INTO table_name (column1, column2, ...)\nVALUES (value1, value2, ...)\nON CONFLICT (conflict_column)\nDO UPDATE\nSET column1 = EXCLUDED.column1,\n    column2 = EXCLUDED.column2;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "PostgreSQL Advanced Features: UPSERT & Multicolumn Indexes is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-postgresql-roles": {
    "id": "sql-postgresql-roles",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "14 min read",
    "level": "Advanced",
    "title": "Role-Based Access Control (GRANT & REVOKE) in PostgreSQL",
    "subtitle": "Complete guide to Role-Based Access Control (GRANT & REVOKE) in PostgreSQL — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- The `GRANT` statement in PostgreSQL is used to assign privileges to users or roles on database objects such as tables, schemas, databases, sequences and functions.\n\n- Improve database security through permission management.\n- Assign different levels of access for different users.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Role-Based Access Control (GRANT & REVOKE) in PostgreSQL."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**Grant Privileges on a Table**\n\n**Grant All Privileges**\n\n**Where:**\n\n- **privilege:** The permission to grant, such as SELECT, INSERT, UPDATE or DELETE.\n- **table_name:** The table on which the privilege is granted.\n- **role_name:** The user or role receiving the privilege.**Note:** Only the object owner or a superuser can grant privileges on a database object.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Syntax",
          "snippet": "GRANT privilege [, ...]\nON TABLE table_name\nTO role_name;"
        }
      },
      {
        "title": "3. Examples",
        "content": "Firstly, create a role and a table.\n\n**Query:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Examples",
          "snippet": "CREATE ROLE analyst\nLOGIN\nPASSWORD 'Analyst@123';\n\nCREATE TABLE Employees (\n    EmployeeID INT PRIMARY KEY,\n    EmployeeName VARCHAR(50),\n    Department VARCHAR(50)\n);\n\nINSERT INTO Employees VALUES\n(101, 'James Carter', 'Sales'),\n(102, 'Emily Johnson', 'Finance');"
        }
      },
      {
        "title": "4. Example 1: Grant SELECT Privilege",
        "content": "The following query grants permission to read data from the Employees table.\n\n**Query:**\n\n**Output:**\n\n**Explanation:**\n\n- The SELECT privilege allows the analyst role to retrieve data from the Employees table.\n- The role cannot modify the table because only read permission is granted.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Example 1: Grant SELECT Privilege",
          "snippet": "GRANT SELECT\nON Employees\nTO analyst;"
        }
      },
      {
        "title": "5. Example 2: Grant Multiple Privileges",
        "content": "The following query grants SELECT and INSERT privileges to the analyst role.\n\n**Query:**\n\n**Output:**\n\n- The analyst role can now view existing records and insert new records.\n- Other privileges such as UPDATE and DELETE are not granted.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Example 2: Grant Multiple Privileges",
          "snippet": "GRANT SELECT, INSERT\nON Employees\nTO analyst;"
        }
      },
      {
        "title": "6. Example 3: Grant ALL Privileges",
        "content": "The following query grants all available privileges on the Employees table.\n\n**Query:**\n\n**Output:**\n\n- The analyst role receives all privileges on the Employees table.\n- The role can perform operations such as SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES and TRIGGER, depending on the object type.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 6. Example 3: Grant ALL Privileges",
          "snippet": "GRANT ALL PRIVILEGES\nON Employees\nTO analyst;"
        }
      },
      {
        "title": "7. Example 4: Verify Granted Privileges",
        "content": "The following query displays the privileges granted on the Employees table.\n\n**Query:**\n\n**Output:**\n\n- The information_schema.role_table_grants view displays table privileges.\n- The query lists all privileges granted to the analyst role on the Employees table.Comment",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Example 4: Verify Granted Privileges",
          "snippet": "SELECT\n    grantee,\n    privilege_type\nFROM information_schema.role_table_grants\nWHERE table_name = 'employees';"
        }
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Role-Based Access Control (GRANT & REVOKE) in PostgreSQL",
      "initialCode": "GRANT privilege [, ...]\nON TABLE table_name\nTO role_name;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Role-Based Access Control (GRANT & REVOKE) in PostgreSQL ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Role-Based Access Control (GRANT & REVOKE) in PostgreSQL in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Role-Based Access Control (GRANT & REVOKE) in PostgreSQL",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Role-Based Access Control (GRANT & REVOKE) in PostgreSQL is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-performance-tuning": {
    "id": "sql-performance-tuning",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "SQL Performance Tuning & Execution Plan Optimization",
    "subtitle": "Complete guide to SQL Performance Tuning & Execution Plan Optimization — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "![Relational Database Engine](/images/databases/sql-rdbms-arch.svg)\n\n- SQL performance tuning is the process of optimizing queries to make database operations faster and more efficient. It helps reduce response time, lower server load, and improve overall database performance.These are the key elements that influence how fast or slow a SQL query executes.\n\n- **Table Size:** Large tables take more time to scan and process.\n- **Joins:** Complex joins increase query execution time.\n- **Aggregations:** Functions like `SUM`, `COUNT`, and `AVG` require more processing.\n- **Concurrency:** Many users running queries at the same time slow down the database.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Performance Tuning & Execution Plan Optimization."
        }
      },
      {
        "title": "2. Ways to Find Slow SQL Queries in SQL Server",
        "content": "These are methods used to identify and analyze queries that take a long time to execute."
      },
      {
        "title": "1. Creating an Execution Plan",
        "content": "SQL Server Management Studio allows users to view the execution plan, which details how SQL Server processes a query. This plan helps identify inefficiencies like missing indexes or unnecessary table scans. To create an execution plan:\n\n- Start by selecting \"Database Engine Query\" from the toolbar of SQL Server Management Studio.\n- Enter the query after that, and then select \"Include Actual Execution Plan\" from the Query option.\n- It's time to run your query at this point. You can do that by pressing F5 or the \"Execute\" toolbar button.\n- The execution plan will then be shown in the results pane, under the \"Execution Pane\" tab, in SQL Server Management Studio."
      },
      {
        "title": "2. Monitor Resource Usage",
        "content": "Monitoring CPU, memory, and disk usage helps maintain SQL Server performance and identify possible bottlenecks.\n\nIt helps in tasks such as:\n\n- Tracking system resources like CPU, memory, and disk.\n- Identifying performance issues using monitoring tools.\n- Comparing Windows and SQL Server activity to detect slowdowns.\n- Ensuring smooth and efficient database operation."
      },
      {
        "title": "3. Use SQL DMVs to Find Slow Queries",
        "content": "SQL Server provides DMVs to help monitor and analyze database performance by tracking queries, execution plans, and resource usage.They are used to:\n\n- Find slow-running queries.\n- View execution plans.\n- Monitor CPU, memory, and I/O usage."
      },
      {
        "title": "6. SQL Query Optimization Techniques",
        "content": "Poor or inefficient queries can slow down the database and affect other users, so it is important to optimize queries for better performance."
      },
      {
        "title": "1. SELECT fields instead of using SELECT *",
        "content": "Using SELECT * retrieves all columns, which can slow down queries.It is better to select only the required columns to improve performance.\n\n**Example:**\n\n**Inefficient: **\n\n**Efficient: **",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. SELECT fields instead of using SELECT *",
          "snippet": "SELECT * FROM geeks_table;"
        }
      },
      {
        "title": "2. Avoid SELECT DISTINCT",
        "content": "Using SELECT DISTINCT removes duplicates but requires extra processing.It is better to write queries that return unique results naturally for better performance.\n\n**Inefficient**:\n\n**Efficient:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Avoid SELECT DISTINCT",
          "snippet": "SELECT DISTINCT first_name, last_name, state\nFROM geeks_table;"
        }
      },
      {
        "title": "3. Use INNER JOIN Instead of WHERE for Joins",
        "content": "Joining tables using the WHERE clause can lead to inefficiencies and unnecessary computations. It's more efficient to use INNER JOIN or LEFT JOIN for combining tables.\n\n**Inefficient:**\n\n**Efficient:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Use INNER JOIN Instead of WHERE for Joins",
          "snippet": "FROM gfg1, gfg2\nWHERE gfg1.customer_id = gfg2.customer_id"
        }
      },
      {
        "title": "4. Use WHERE Instead of HAVING",
        "content": "Use WHERE to filter data before grouping instead of HAVING, as it is faster and more efficient. For example: To find sales per client in 2019, filter the year in WHERE before using GROUP BY.\n\n**Inefficient:**\n\n**Efficient:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Use WHERE Instead of HAVING",
          "snippet": "SELECT customer_id, SUM(sales) AS total_sales\nFROM sales\nGROUP BY customer_id\nHAVING sale_date BETWEEN '2019-01-01' AND '2019-12-31';"
        }
      },
      {
        "title": "5. Run Queries During Off-Peak Hours",
        "content": "Running heavy queries during off-peak hours reduces the load on the database, minimizing the impact on other users. About planning any query to run at a time when it won't be as busy in order to reduce the impact of our analytical queries on the database. When the number of concurrent users is at its lowest, which is often overnight, the query should be executed."
      },
      {
        "title": "12. Index Tuning",
        "content": "Index tuning is the process of optimizing indexes to improve query performance. It helps the database retrieve data faster without requiring users to manually adjust indexes.These points help you create efficient and effective indexes for better database performance.\n\n- Use short indexes to save space and speed up searches.\n- Choose columns with unique values for better filtering.\n- Use clustered indexes on frequently accessed data.\n- Avoid using frequently changing columns in clustered indexes.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Performance Tuning & Execution Plan Optimization",
      "initialCode": "SELECT * FROM geeks_table;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Performance Tuning & Execution Plan Optimization ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Performance Tuning & Execution Plan Optimization in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Performance Tuning & Execution Plan Optimization",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Performance Tuning & Execution Plan Optimization is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-orm-dbms": {
    "id": "sql-orm-dbms",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "Object-Relational Mapping (ORM) in Database Systems",
    "subtitle": "Complete guide to Object-Relational Mapping (ORM) in Database Systems — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- Object-relational mapping (ORM) is a key concept in the field of Database Management Systems (DBMS), addressing the bridge between the object-oriented programming approach and relational databases. ORM is useful in data interaction simplification, code optimization, and smooth blending of applications and databases.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Object-Relational Mapping (ORM) in Database Systems."
        }
      },
      {
        "title": "2. Object-Relational Database Management System (ORDBMS)",
        "content": "An ORDBMS stands for an object-relational database management system that further enhances the functionalities of a relational database by incorporating object-oriented principles.\n\n- ORDBMS deals with complex data types, encapsulation, and inheritance.\n- It supports applications that require both relational and object-oriented abilities."
      },
      {
        "title": "3. Entities",
        "content": "In the realm of ORM, entities are synonymous with the objects or classes in object-oriented programming that are bound to tables in relational databases. They serve as abstractions of business objects or the concepts within the application, and their definition is in the code.\n\n- The ORM component carries out the transformation of these entities into database tables.\n- It provides smooth communication between the application and the database beneath it."
      },
      {
        "title": "4. Relationships",
        "content": "The relationships in ORM map how entities are related to each other, which describes relationships between tables in a database. These relationships define the way different elements relate to each other, and these relationships are the essence of data integrity and also serve as a mirror between various components that are implemented in the application."
      },
      {
        "title": "5. Persistence",
        "content": "Persistence refers to the capability to keep data after an application is ended. The use of Object Relational Mapping (ORM) causes data to persist even when the application is closed or restarted because it is stored in a relational database.\n\n- Makes it secure and available even when the application is off.\n- It allows the temporal persistence of the data used by the application."
      },
      {
        "title": "6. Object-Relational Mapping (ORM) in DBMS",
        "content": "With Object-Relational Mapping, it becomes much easier to work with an object-oriented programming language and relational database. Fundamentally, it acts as a translator, translating data between the database and the application without any hitch. ORM enables developers to work with objects in their programming language which are mapped to corresponding database entities, such as tables, views, or stored procedures.\n\n- **Object-Oriented Paradigm:** ORM focuses on OOP principles that data and behavior are encapsulated within objects. In ORM, database entities are mapped to objects and developers use objects to interact and manipulate data in a fairly easy way.\n- **Mapping:** The main purpose of ORM is object mapping to database tables and back. The mapping is defined through the metadata which represents interconnections between objects and the corresponding database schemas. Metadata of ORM frameworks is used for the generation of SQL queries and management of data flow between the application and the database."
      },
      {
        "title": "7. Entity Mapping",
        "content": "The first initialization step in the Object-Relational Mapping (ORM) process is to identify entities from the object-oriented model and match them with corresponding tables in the relational database. Developers specify objects or classes for business entities in their code.\n\n- The ORM framework manages the conversion of such entities into tables in databases.\n- Each feature in the class maps to a new column in the table, and instances of the class turn into rows in the table."
      },
      {
        "title": "8. Relationship Mapping",
        "content": "Having entities mapped the next important stage is to provide relations between them and structuring the relational database schema accordingly. ORM frameworks provide functions that enable us to represent the relationship between entities like one-to-one, one-to-many, and many-to-many. Relationships are transformed into foreign keys, which allow the data to be kept both consistent and valid even when stored in tables that could be related."
      },
      {
        "title": "9. Data Type Mapping",
        "content": "Data mapping is the practice of an object-oriented model mapping the data type to the database. ORM frameworks handle the conversion of data types.\n\n- Enable the objects of the application to align with the data types .\n- It ensures cohesion and preventing data type mismatches that will result in errors."
      },
      {
        "title": "10. CRUD Operations",
        "content": "Crud (Create, Read, Update, Delete) operations constitute the basis of any database interaction. The use of ORM libraries simplifies the process of the implementation of these operations by implementing the high-level abstractions. Developers can make changes to entities in their program and then the ORM allows for translation of these operations into corresponding SQL queries. That process feeds the need to write complex SQL conditions by developers automatically, creating the interaction with the database more user-friendly and with less errors."
      },
      {
        "title": "11. Query Language",
        "content": "ORM framework is usually a query language designed with object-oriented features for interacting with the database. For example, Hibernate Package which is a Java-based ORM framework, makes use of Hibernate Query Language (HQL). HQL allows developers to express database queries by using object-oriented syntax enabling themselves to get data with ease, manipulating it without directly dealing with SQL."
      },
      {
        "title": "12. Benefits of ORM",
        "content": "- **Abstraction of Database Complexity:** ORM insulates the developers from the complexity of SQL queries and database schema features. Illustration: Such abstraction enables the programmers to concentrate on their application's logic and mechanics while avoiding lower-level database interactions.\n- **Portability:** ORM ensures code portability through abstraction between the application and the database. Developers can switch between various database systems with little code changes since the object-relational mapping framework deals with the details of database-specific queries.\n- **Code Reusability:** ORM boosts the code reusability by a classic way of relationship with databases. Developers can use a single codebase with different databases which makes it easier to maintain and scale applications.\n- **Maintenance and Scalability:** ORM facilitates application maintenance via schema change and updates management. Aside from that, it enables scalability due to the ability for developers to optimize and fine-tune database interactions without major changes in application code."
      },
      {
        "title": "13. Significance in Modern Software Development",
        "content": "With the progress of software development, effective and adaptable data management becomes crucial. It facilitates developers to take advantage of the pros of object-oriented programming, as well as relational databases, without all the complications of manual data processing.\n\n- Object-relational mapping (ORM) is a critical part of modern software development\n- It increases productivity, shortens development time and results in a more neat and maintainable code quality. Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Object-Relational Mapping (ORM) in Database Systems",
      "initialCode": "-- Object-Relational Mapping (ORM) in Database Systems\nSELECT id, name, created_at\nFROM users\nWHERE is_active = TRUE\nORDER BY created_at DESC\nLIMIT 10;",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Object-Relational Mapping (ORM) in Database Systems ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Object-Relational Mapping (ORM) in Database Systems in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Object-Relational Mapping (ORM) in Database Systems",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Object-Relational Mapping (ORM) in Database Systems is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-injection-security": {
    "id": "sql-injection-security",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "SQL Injection Vulnerabilities & Parameterized Queries",
    "subtitle": "Complete guide to SQL Injection Vulnerabilities & Parameterized Queries — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL Injection (SQLi) is a web application vulnerability where attackers inject malicious SQL queries through user inputs to manipulate backend database operations, potentially leading to unauthorized access, modification, or deletion of data. It is one of the most critical and widely exploited security flaws in web applications.\n\n- Exploits improper validation of user input in SQL queries\n- Can expose sensitive data such as passwords, emails and financial records\n- Enables bypass of authentication mechanisms\n- May result in full database or server compromise\n- Prevented through secure coding and input sanitization practices",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for SQL Injection Vulnerabilities & Parameterized Queries."
        }
      },
      {
        "title": "2. SQL Injection Security Levels (DVWA)",
        "content": "DVWA (Damn Vulnerable Web Application) provides different security levels for SQL Injection to help learners understand how security measures affect vulnerability and exploitation techniques."
      },
      {
        "title": "1. Low Security",
        "content": "At this level, user input is directly included in the SQL query without any validation or sanitization, making it highly vulnerable to SQL injection attacks.\n\n- **Input ':** Breaks the query and causes a database error, revealing vulnerability\n- **Input 1' OR '1'='1:** Always true condition, returns all user records\n- **Input 1' UNION SELECT user, password FROM users:** Extracts sensitive data like usernames and passwords",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Low Security",
          "snippet": "$id = $_GET['id'];$query = \"SELECT first_name, last_name FROM users WHERE user_id = '$id';\";"
        }
      },
      {
        "title": "2. Medium Security",
        "content": "At this level, basic input sanitization is applied using functions like addslashes(), which escapes special characters such as '.\n\n- Simple injection using ' is neutralized (converted to \\')\n- However, attackers may still bypass protection using numeric-based injections**Example:**\n\n- **1 OR 1=1:** Can still manipulate query logic and return all records",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Medium Security",
          "snippet": "$id = addslashes($_GET['id']);$query = \"SELECT first_name, last_name FROM users WHERE user_id = '$id';\";"
        }
      },
      {
        "title": "3. High Security",
        "content": "At this level, the application uses prepared statements (parameterized queries), which separate SQL logic from user input.\n\n**Security impact:**\n\n- Input is treated strictly as data, not executable SQL code\n- Common injection attempts like ', OR 1=1, or UNION SELECT are ineffective\n- Prevents unauthorized data extraction and query manipulation",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. High Security",
          "snippet": "$stmt = $pdo->prepare(\"SELECT first_name, last_name FROM users WHERE user_id = ?\");$stmt->execute([$id]);"
        }
      },
      {
        "title": "6. Types of SQL Injection",
        "content": "There are different types of SQL Injection"
      },
      {
        "title": "1. Error-Based SQL Injection",
        "content": "Error-based SQL injection is a type of in-band SQL injection where an attacker intentionally causes the database to generate an error message. The attacker then analyzes this error message to gain valuable information about the database's structure, like table names and column names, which can be used to craft further, more precise attacks.\n\n**How It Works:**\n\nThis attack targets applications that reveal raw database errors instead of showing generic messages. By injecting malicious input that breaks the SQL syntax, attackers trigger these errors and gain valuable clues about the database structure.\n\n- **Identify a Vulnerable Input:** The attacker finds an input field (such as a search box or URL parameter) that interacts directly with the database without proper validation or sanitization.\n- **Inject Malicious Input:** The attacker inserts special characters (such as a single quote ') or malformed SQL queries to break the normal query execution.\n- **Trigger Database Errors:** The database returns error messages due to incorrect query syntax or structure.\n- **Analyze Error Messages:** These errors may reveal like database type (MySQL, Oracle, SQL Server, etc.), database version, SQL query structure, table and column names.\n- **Refine the Attack:** Using the extracted information, the attacker can modify their payload to perform more advanced attacks such as data extraction."
      },
      {
        "title": "8. Example (DVWA Setup)",
        "content": "**Step 1: Set Up Environment**\n\n- Launch DVWA. It's typically accessed by navigating to a URL like http://localhost/dvwa in your browser.\n- Log in to DVWA with the default credentials: admin / password.\n- Go to the DVWA Security tab and set the security level to low. This will ensure the vulnerabilities are easy to exploit. **Step 2: Identify Vulnerability**\n\nThe SQL Injection page has a simple input box where you can enter a user ID.\n\n**The backend query is typically:**\n\n- Enter a valid ID, like 1, into the input box and click \"Submit.\" You should see the details for the user with ID 1. **SQL Injection Source:**\n\nPHP\n\n`\n`\n**Step 3: Trigger the Error**\n\nNow, try to break the query. Enter a single quote ' in the input box and submit.\n\n**The query becomes:**\n\n- The database encounters an extra quote and cannot complete the query\n- Instead of returning data, it displays an SQL error message (something like \"You have an error in your SQL syntax…\")**This is called Error-Based SQL Injection because:**\n\n- The attacker sends invalid input (')\n- The database throws an error\n- That error leaks useful information about the database (like type of DB, number of columns, structure, etc.)",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Example (DVWA Setup)",
          "snippet": "SELECT * FROM users WHERE id = 'user_input';"
        }
      },
      {
        "title": "2. Union-Based SQL Injection",
        "content": "Union-based SQL Injection is a technique where attackers use the UNION operator to combine the results of two or more SELECT statements into a single result set. This can allow them to extract information from other tables in the database. The UNION operator can only be used if:\n\n- Both queries have the same number of columns\n- The columns have similar data types\n- The columns are in the same orderUNION Operator: The UNION operator is used to combine the result-set of two or more SELECT statements.\n\n- Each SELECT statement within UNION must have the same number of columns\n- The columns must have similar data types\n- The columns must be in the same order**UNION Syntax:**\n\n**Example (DVWA Setup):**\n\n**Step 1: Identify Vulnerability**\n\n- Firstly we have to find the number of columns of the existing table in the website to inject UNION based SQL Injection\n- The SQL Injection page has a simple input box where you can enter a user ID. The backend query is likely something like\n\n- Now, try to break the query. Enter a single quote ' in the input box and submit.\n- If vulnerable, the application may return an SQL error such as:**You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' at line 1\n\nStep 2: Find Number of Columns**\n\n- Use the UNION Keyword to Discover the Number of Columns\n- Before using UNION, the attacker must determine how many columns exist in the query.**Try to sort the results by column:**\n\n- Submit. It should work.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Union-Based SQL Injection",
          "snippet": "SELECT column_name(s) FROM table1UNIONSELECT column_name(s) FROM table2;"
        }
      },
      {
        "title": "10. SQL Injection Source",
        "content": "PHP\n\n`\n`\n\n- **Increment the number:**\nSubmit. It should work.\n\n- Keep incrementing until you get an error.\n- For example, 1 ORDER BY 4 might give you: Unknown column '4' in 'order clause'\n- This means the query has 3 columns.**Step 3: Prepare for UNION Injection**\n\n- Once the number of columns is known, the attacker can use the UNION operator to combine their own query with the original one and extract additional data.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 10. SQL Injection Source",
          "snippet": "<?php\nif( isset( $_REQUEST[ 'Submit' ] ) ) {\n    // Get input\n    $id = $_REQUEST[ 'id' ];\n\n    switch ($_DVWA['SQLI_DB']) {\n        case MYSQL:\n            // Check database\n            $query  = \"SELECT first_name, last_name FROM users WHERE user_id = '$id';\";\n            $result = mysqli_query($GLOBALS[\"___mysqli_ston\"],  $query ) or die( '<pre>' . ((is_object($GLOBALS[\"___mysqli_ston\"])) ? mysqli_error($GLOBALS[\"___mysqli_ston\"]) : (($___mysqli_res = mysqli_connect_error()) ? $___mysqli_res : false)) . '</pre>' );\n\n            // Get results\n            while( $row = mysqli_fetch_assoc( $result ) ) {\n                // Get values\n                $first = $row[\"first_name\"];\n                $last  = $row[\"last_name\"];\n\n                // Feedback for end user\n                echo \"<pre>ID: {$id}<br />First name: {$first}<br />Surname: {$last}</pre>\";\n            }\n\n            mysqli_close($GLOBALS[\"___mysqli_ston\"]);\n            break;\n        case SQLITE:\n            global $sqlite_db_connection;\n\n            #$sqlite_db_connection = new SQLite3($_DVWA['SQLITE_DB']);\n            #$sqlite_db_connection->enableExceptions(true);\n\n            $query  = \"SELECT first_name, last_nam"
        }
      },
      {
        "title": "3. Blind-Based SQL Injection",
        "content": "Blind SQL Injection occurs when attackers cannot see query results directly on the webpage. Instead, they infer information from subtle changes in the application’s behavior or response time. Although slower and more tedious than classic SQLi, it can be equally effective.\n\n**Types of Blind SQL Injection:**\n\n**1. Boolean-Based Blind SQL Injection**\n\n- The attacker sends SQL queries that return either true or false conditions\n- The application behaves differently based on the result\n- Differences may appear as changes in page content, messages, or layout**2. Time-Based Blind SQL Injection**\n\n- The attacker injects SQL commands that delay database response (e.g., SLEEP() function)\n- If the condition is true, the response is delayed\n- If false, the response is immediate\n- The attacker uses response time to infer information**Example:**\n\nConsider a login page where you enter a username and password.\n\n**The application constructs a SQL query like this:**\n\n**Boolean-Based Testing:**\n\n- A blind SQL injection would involve manipulating the user_input field to ask the database a question.\n- Instead of getting a direct response, the attacker might try something like this:\n\n- If the page loads normally, the attacker knows that 1=1 is a true statement.\n\n- If the page shows an error or behaves differently, the attacker knows that 1=2 is a false statement. By using a series of these true/false questions, an attacker can systematically guess and extract information, one character at a time. The process can be automated to guess everything from table names to user passwords.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 3. Blind-Based SQL Injection",
          "snippet": "SELECT * FROM users WHERE username = 'user_input' AND password = 'password_input';"
        }
      },
      {
        "title": "12. Impact of SQL Injection Attacks",
        "content": "- **Unauthorized access to sensitive data:** Attackers can retrieve personal, financial, or confidential information stored in the database.\n- **Data integrity issues:** Attackers can modify, delete, or corrupt critical data, impacting the application's functionality.\n- **Privilege escalation:** Attackers can bypass authentication mechanisms and gain administrative privileges.\n- **Service downtime:** SQL injection can overload the server, causing performance degradation or system crashes.\n- **Reputation damage:** A successful attack can severely harm the reputation of an organization, leading to a loss of customer trust."
      },
      {
        "title": "13. Preventing SQL Injection Attacks",
        "content": "There are several best practices to prevent SQL injection attacks:"
      },
      {
        "title": "1. Use Prepared Statements and Parameterized Queries",
        "content": "- Treats user input as data, not executable SQL code\n- Prevents attackers from modifying query structure**Example in PHP (using MySQLi):**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 1. Use Prepared Statements and Parameterized Queries",
          "snippet": "$stmt = $conn->prepare(\"SELECT * FROM users WHERE username = ? AND password = ?\");$stmt->bind_param(\"ss\", $username, $password);$stmt->execute();"
        }
      },
      {
        "title": "2. Employ Stored Procedures",
        "content": "- Predefined SQL queries stored in the database\n- Reduces risk of dynamic query manipulation\n- Helps separate application logic from SQL code**Example:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 2. Employ Stored Procedures",
          "snippet": "CREATE PROCEDURE GetUserByUsername (IN username VARCHAR(50))BEGIN   SELECT * FROM users WHERE username = username;END;"
        }
      },
      {
        "title": "3. Whitelist Input Validation",
        "content": "- Allow only valid input formats (e.g., letters, numbers)\n- Blocks malicious characters like ', --, or ;\n- Commonly used for fields like usernames and emails"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: SQL Injection Vulnerabilities & Parameterized Queries",
      "initialCode": "$id = $_GET['id'];$query = \"SELECT first_name, last_name FROM users WHERE user_id = '$id';\";",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: SQL Injection Vulnerabilities & Parameterized Queries ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing SQL Injection Vulnerabilities & Parameterized Queries in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via SQL Injection Vulnerabilities & Parameterized Queries",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "SQL Injection Vulnerabilities & Parameterized Queries is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  },
  "sql-encryption-backup": {
    "id": "sql-encryption-backup",
    "badge": "Module 7 • SQL & PostgreSQL",
    "readingTime": "18 min read",
    "level": "Advanced",
    "title": "Database Encryption, Backup & Recovery Strategies",
    "subtitle": "Complete guide to Database Encryption, Backup & Recovery Strategies — query syntax, storage internals, indexing, and production database examples.",
    "sections": [
      {
        "title": "1. Overview & Syntax",
        "content": "- SQL Data Encryption converts sensitive database information into an unreadable format to protect it from unauthorized access.\n\n- Protects confidential information such as passwords, financial records and personal data.\n- Ensures that data remains secure during storage and transmission.\n- Helps organizations comply with security and privacy regulations.\n- Reduces the risk of data theft and unauthorized disclosure.The SQL database supports various encryption methods, each with its unique characteristics and applications. Modern SQL databases support various encryption techniques, each catering to specific use cases and different levels of protection.",
        "callout": {
          "type": "info",
          "title": "Database Engineering Concept",
          "message": "Master query syntax, indexing, and data modeling best practices for Database Encryption, Backup & Recovery Strategies."
        }
      },
      {
        "title": "2. Types of SQL Data Encryption",
        "content": "This section explores the various methods of securing data in SQL databases, including Transparent Data Encryption (TDE) and Column-Level Encryption (CLE). Each type is explained with its use cases, implementation steps and benefits."
      },
      {
        "title": "1. Transparent Data Encryption(TDE)",
        "content": "Transparent Data Encryption (TDE) encrypts the entire database, including the data and log files stored at rest. This process runs seamlessly in the background without affecting user applications.\n\n- Provides a transparent layer of security over the database with no significant changes required to the database schema.\n- Operates at the file level, encrypting the database files stored on disk.\n- Encryption and decryption occur automatically when data is read from or written to the database.\n- Uses a symmetric key to secure the database."
      },
      {
        "title": "4. Steps to Implement TDE",
        "content": "Firstly implement TDE using the following steps. First, we will set up a demo table for better understanding:\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 4. Steps to Implement TDE",
          "snippet": "CREATE TABLE Student (    StudentID INT PRIMARY KEY,     StudentName VARCHAR(30) NOT NULL,     RollNumber VARCHAR(10) NOT NULL);INSERT INTO Student VALUES(1, 'John', '1234'),(2, 'Michael', '4321'),(3, 'Emily', '4554'),(4, 'Sophia', '7896');"
        }
      },
      {
        "title": "5. Step-by-Step Implementation",
        "content": "1. **Create a Database Master Key**\n\nThe master key secures the encryption hierarchy. Use the following command and choose the password of your choice\n\n**2. Create a Certificate**\n\nA certificate is used to protect the encryption keys.\n\n**3. Create an Encryption Key**\n\nDefine the database encryption key using a specific algorithm:\n\n**4.** **Enable Encryption**\n\nConfigure the database to enable encryption using the below command\n\n**Output**\n\nAfter Encryption",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 5. Step-by-Step Implementation",
          "snippet": "USE dba;GoCreate MASTER KEY ENCRYPTION BY PASSWORD = \"ABC@123\"Go"
        }
      },
      {
        "title": "2. Column-Level Encryption",
        "content": "This method of encryption involves encrypting specific columns within a table rather than the whole table or the database. This method allows organizations to selectively secure their data.\n\n- Column level encryption is useful while dealing with databases that stores a combination of both sensitive and unsensitive data.\n- CLE also operates on the file level which encrypts the database files on the disk.\n- CLE uses also use the asymmetric key for data encryption."
      },
      {
        "title": "7. Steps to Implement CLE",
        "content": "In order to implement the encryption we are creating the same table Student we used for TDE for better understanding.\n\n**Output:**",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 7. Steps to Implement CLE",
          "snippet": "CREATE TABLE Student (    StudentID INT PRIMARY KEY,     StudentName VARCHAR(30) NOT NULL,     RollNumber VARCHAR(10) NOT NULL);INSERT INTO Student VALUES(10, 'James', '1234'),(20, 'Olivia', '4321'),(30, 'William', '4554'),(40, 'Emma', '7896');"
        }
      },
      {
        "title": "8. Step-by-Step Implementation",
        "content": "1. Create a Database Master Key\n\n2. Create a Self-Signed Certificate\n\n3. Configure a Symmetric Key\n\n4. Encrypt Specific Columns\n\n**Output**\n\nAfter encryptionThe `RollNumber_Encrypted` column will now contain encrypted values, rendering them unreadable to unauthorized users.",
        "code": {
          "language": "sql",
          "caption": "SQL / PostgreSQL Query — 8. Step-by-Step Implementation",
          "snippet": "USE Student;GOCREATE MASTER KEY ENCRYPTION BY PASSWORD = '123@4321';"
        }
      },
      {
        "title": "9. Benefits of SQL Data Encryption",
        "content": "- **Data Protection:** Ensures sensitive data remains secure from unauthorized access.\n- **Enhanced Security:** Reduces the risk of data breaches and leaks.\n- **Data Integrity:** Maintains the accuracy and consistency of sensitive data.\n- **Selective Encryption:** Allows encrypting only critical data, optimiing performance.\n- **Compliance:** Meets regulatory requirements for data protection, such as GDPR or HIPAA.Comment"
      }
    ],
    "playground": {
      "title": "SQL & PostgreSQL Query Lab: Database Encryption, Backup & Recovery Strategies",
      "initialCode": "CREATE TABLE Student (    StudentID INT PRIMARY KEY,     StudentName VARCHAR(30) NOT NULL,     RollNumber VARCHAR(10) NOT NULL);INSERT INTO Student VALUES(1, 'John', '1234'),(2, 'Michael', '4321'),(3, 'Emily', '4554'),(4, 'Sophia', '7896');",
      "expectedOutput": [
        "[DB ENGINE] Executing query for: Database Encryption, Backup & Recovery Strategies ...",
        "[PLANNER] Index Scan using idx_primary (cost=0.15..8.17 rows=10 width=64)",
        "[SUCCESS] Query executed in 1.8 ms (10 rows returned)."
      ],
      "language": "sql",
      "engineBadge": "PostgreSQL 16 • SQL Engine"
    },
    "quiz": {
      "question": "What is a primary advantage of properly utilizing Database Encryption, Backup & Recovery Strategies in database systems?",
      "options": [
        "It disables all disk persistence and deletes transaction logs",
        "It ensures efficient data querying, schema integrity, or horizontal scalability via Database Encryption, Backup & Recovery Strategies",
        "It forces every query to perform a full sequential table scan",
        "It prevents concurrent client connections"
      ],
      "correctIndex": 1,
      "explanation": "Database Encryption, Backup & Recovery Strategies is a fundamental capability in SQL & PostgreSQL for high-performance data storage, querying, and reliability."
    }
  }
};
