import { LessonContent } from "./lessonsData";

export const DATA_SCIENCE_LESSONS: Record<string, LessonContent> = {
  "ds-numpy-guide": {
    "id": "ds-numpy-guide",
    "badge": "Module 1 • Data Science",
    "readingTime": "14 min read",
    "level": "Beginner",
    "title": "NumPy for Data Science",
    "subtitle": "In-depth guide to NumPy for Data Science — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "![Data Science Pipeline](/images/ai-ml/ds-pipeline.svg)\n\n- Numpy** **is a general-purpose array-processing package. It provides a high-performance multidimensional array object and tools for working with these arrays. It is the fundamental package for scientific computing with Python. Besides its obvious scientific uses, Numpy can also be used as an efficient multi-dimensional container of generic data.\n\nNumpy Fundamentals",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of NumPy for Data Science."
        }
      },
      {
        "title": "2. Arrays in Numpy",
        "content": "A NumPy array (ndarray) is a collection of elements of the same data type stored in a multidimensional structure. Arrays provide an efficient way to store and perform operations on numerical data.\n\n- Number of dimensions in an array is called its rank.\n- Size of the array along each dimension is called its shape.\n- Elements are accessed using square brackets [] and arrays are commonly created from Python lists."
      },
      {
        "title": "3. Creating a Numpy Array",
        "content": "NumPy arrays are created using the np.array() function. They can be created from Python sequences such as lists and tuples.\n\n`\n`\n**Output**\n**Explanation:**\n\n- np.array([1, 2, 3]) creates a one-dimensional array from a list.\n- np.array([[1, 2, 3], [4, 5, 6]]) creates a two-dimensional array from a nested list.\n- np.array((1, 3, 2)) creates a one-dimensional array from a tuple.",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Creating a Numpy Array",
          "snippet": "import numpy as np\n \narr = np.array([1, 2, 3])\nprint(arr)\n \narr = np.array([[1, 2, 3], [4, 5, 6]])\nprint(arr)\n \narr = np.array((1, 3, 2))\nprint(arr)"
        }
      },
      {
        "title": "4. Accessing the Array Index",
        "content": "Elements in a NumPy array can be accessed using indexing and slicing. Indexing retrieves specific elements, while slicing extracts a range of elements from an array.\n\n`\n`\n**Output**\n**Explanation:**\n\n- arr[:2, ::2] selects the first two rows and alternate columns (0 and 2).\n- arr[[1, 1, 0, 3], [3, 2, 1, 0]] retrieves elements from the specified row-column index pairs.",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Accessing the Array Index",
          "snippet": "import numpy as np\n\narr = np.array([\n    [-1, 2, 0, 4],\n    [4, -0.5, 6, 0],\n    [2.6, 0, 7, 8],\n    [3, -7, 4, 2.0]\n])\n\narr2 = arr[:2, ::2]\nprint(\"First 2 rows and alternate columns:\\n\", arr2)\n\narr3 = arr[[1, 1, 0, 3], [3, 2, 1, 0]]\nprint(\"Selected elements:\", arr3)"
        }
      },
      {
        "title": "5. Basic Array Operations",
        "content": "NumPy arrays support various mathematical operations that can be performed on individual elements or between multiple arrays. These operations are applied efficiently without using explicit loops.\n\n`\n`\n**Output**\n**Explanation:**\n\n- a + 1 adds 1 to every element of array a.\n- b - 2 subtracts 2 from every element of array b.\n- a.sum() returns the sum of all elements in a.\n- a + b performs element-wise addition between the two arrays.",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Basic Array Operations",
          "snippet": "import numpy as np\n\na = np.array([[1, 2],\n              [3, 4]])\n\nb = np.array([[4, 3],\n              [2, 1]])\n\nprint(\"Adding 1 to every element:\\n\", a + 1)\nprint(\"Subtracting 2 from each element:\\n\", b - 2)\nprint(\"Sum of all array elements:\", a.sum())\nprint(\"Array sum:\\n\", a + b)"
        }
      },
      {
        "title": "6. Data Types in Numpy",
        "content": "Every NumPy array has a data type (dtype) that determines the type of values stored in the array. NumPy can automatically detect the data type or you can specify it explicitly while creating the array.\n\n`\n`\n**Output**\n**Explanation:**\n\n- np.array([1, 2]) creates an integer array, so its data type is int64.\n- np.array([1.0, 2.0]) creates a floating-point array, so its data type is float64.\n- dtype=np.int64 explicitly sets the array's data type to int64.\n- The dtype attribute is used to view the data type of a NumPy array.",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Data Types in Numpy",
          "snippet": "import numpy as np\n \nx = np.array([1, 2])  \nprint(x.dtype)         \n \nx = np.array([1.0, 2.0]) \nprint(x.dtype)  \n \nx = np.array([1, 2], dtype = np.int64)   \nprint(x.dtype)"
        }
      },
      {
        "title": "7. Math Operations on DataType Array",
        "content": "NumPy provides built-in functions for performing mathematical operations on arrays. These operations are applied element-wise and can be performed efficiently on entire arrays at once.\n\n`\n`\n**Output**\n**Explanation:**\n\n- np.add(arr1, arr2) performs element-wise addition of the two arrays.\n- np.sum(arr1) returns the sum of all elements in arr1.\n- np.sqrt(arr1) calculates the square root of each element.\n- arr1.T returns the transpose of the array by swapping rows and columns.To learn about default numpy methods, refer to Numpy Methods.",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Math Operations on DataType Array",
          "snippet": "import numpy as np\n\narr1 = np.array([[4, 7], [2, 6]], dtype=np.float64)\narr2 = np.array([[3, 6], [2, 8]], dtype=np.float64)\n\nprint(np.add(arr1, arr2))\nprint(np.sum(arr1))\nprint(np.sqrt(arr1))\nprint(arr1.T)"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: NumPy for Data Science",
      "initialCode": "import numpy as np\n \narr = np.array([1, 2, 3])\nprint(arr)\n \narr = np.array([[1, 2, 3], [4, 5, 6]])\nprint(arr)\n \narr = np.array((1, 3, 2))\nprint(arr)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-numpy-guide.py ...",
        "[INFO] Loaded module for: NumPy for Data Science",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of NumPy for Data Science?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for NumPy for Data Science workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "NumPy for Data Science is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-pandas-guide": {
    "id": "ds-pandas-guide",
    "badge": "Module 1 • Data Science",
    "readingTime": "28 min read",
    "level": "Beginner",
    "title": "Pandas Step-by-Step Guide",
    "subtitle": "In-depth guide to Pandas Step-by-Step Guide — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Pandas is a popular open-source Python library used for data manipulation and analysis. It provides powerful tools for working with structured data and integrates seamlessly with libraries such as NumPy and Matplotlib. Pandas operates around two core data structures:\n\n- **Series (1D): **Used to handle single columns of data efficiently.\n- **DataFrame (2D): **Used for structured, tabular data similar to spreadsheets or SQL tables.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Pandas Step-by-Step Guide."
        }
      },
      {
        "title": "1. Installing and Importing Pandas",
        "content": "To install Pandas, run the following command in your terminal or command prompt:\n\npip install pandas\n\nAfter installation, import Pandas into your Python script or notebook using the standard alias `pd`.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Installing and Importing Pandas",
          "snippet": "import pandas as pd"
        }
      },
      {
        "title": "2. Creating DataFrames",
        "content": "A DataFrame is a two-dimensional table with labeled rows and columns, similar to a spreadsheet or SQL table. Each column can store different data types, such as numbers, text, or dates. DataFrames can be created from lists, dictionaries, or other data sources.\n\n**Example: **Creating a DataFrame using a Dictionary\n\nIn this example, a dictionary is converted into a DataFrame using the `pd.DataFrame()` function.\n\n`\n`\n**Output:**\n\nDataFrame",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Creating DataFrames",
          "snippet": "import pandas as pd\n\ndata = {\n    'Name': [\"Player_A\", \"Player_B\", \"Player_C\"],\n    'Age': [25, 30, 35]}\n    \ndf = pd.DataFrame(data)\n\nprint(df)"
        }
      },
      {
        "title": "3. Creating Series",
        "content": "A Series is a one-dimensional labeled array that can store any data type, such as integers, strings, or floats. Each value is associated with an index, which can be default (0, 1, 2, ...) or custom labels. Series can be created from lists, NumPy arrays, dictionaries, or scalar values.\n\n**Example: **Creating a Series using a List\n\n`\n`\n**Output:**\n\nSeries",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Creating Series",
          "snippet": "import pandas as pd\nage_series = pd.Series([25, 30, 35], index=[\"Player_A\", \"Player_B\", \"Player_C\"])\nprint(age_series)"
        }
      },
      {
        "title": "4. Reading CSV and JSON Files",
        "content": "CSV (Comma-Separated Values) files are commonly used to store tabular data. Pandas provides the `read_csv()` function to load a CSV file into a DataFrame. By default, Pandas displays only a preview of large datasets. To display all rows, you can use `to_string()` or adjust the `pd.options.display.max_rows` setting.\n\n`\n`\n**Output:**\n\nPandas Read CSVPandas supports multiple file formats such as CSV and JSON (JavaScript Object Notation). You can load a JSON file into a DataFrame using the `read_json()` function.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Reading CSV and JSON Files",
          "snippet": "import pandas as pd \ndf = pd.read_csv(\"people.csv\")\nprint(df)"
        }
      },
      {
        "title": "5. Understanding and Analyzing the Data Frame",
        "content": "After creating or loading a DataFrame, inspecting and summarizing the data is an important step in understanding dataset. Pandas provides various functions to help you view and analyze the data.\n\n- **head():**** **View the first n rows of the DataFrame (default is 5 rows).\n- **tail(): **View the last n rows of the DataFrame (default is 5 rows).\n- **info():**** **Shows a summary of the DataFrame, including column names, data types, and non-null values.\n- **describe():**** **Provides summary statistics such as count, mean, and standard deviation for numerical columns. Use describe(include=\"all\") to include non-numeric data.Let's see an example demonstrating the use of .head(), .tail(), .info() and .describe() methods:\n\n`\n`\n**Output:**\n\nUnderstanding Data in PandasPandas provides versatile tools to inspect and understand data quickly. These functions help in summarizing datasets and exploring key attributes efficiently.\n\n- View basic statistical details\n- Get information about the DataFrame (data types, non-null counts, etc.)\n- Check for missing data\n- Inspect the DataFrame shape (rows and columns)\n- Checking rows with minimum and maximum values",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Understanding and Analyzing the Data Frame",
          "snippet": "import pandas as pd\n\ndata = {'Name': ['Alice', 'Bob', 'Charlie', 'David', 'Eva'],\n        'Age': [24, 27, 22, 32, 29],\n        'City': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']}\ndf = pd.DataFrame(data)\n\nprint(\"First 3 rows using head():\")\nprint(df.head(3))\n\nprint(\"\\nLast 2 rows using tail():\")\nprint(df.tail(2))\n\nprint(\"\\nDataFrame summary using info():\")\ndf.info()"
        }
      },
      {
        "title": "6. Indexing in Pandas",
        "content": "Indexing in Pandas refers to accessing and selecting data from a DataFrame or Series. There are multiple ways to do this, including selecting columns, slicing data, and filtering using conditions.\n\n**Example : **Basic Indexing (Selecting a single column) with use of [ ] operator.\n\n`\n`\n**Output:**\n\nIndexingWe can also select multiple columns by passing a list of column names, such as `['Name', 'Age']`, which returns a new DataFrame. Pandas provides two main methods for selecting rows:\n\n- **.loc[] **: Label-based indexing using row/column names or index labels.\n- **.iloc[] **: Position-based indexing using integer positions (0, 1, 2, ...).\n\n`\n`\n**Output:**\n\nIndexingFor more advanced selection techniques, you can explore topics like selecting multiple columns, slicing, and Boolean indexing.\n\n- Using loc[] and iloc[] for Advanced Row and Column Selection\n- Boolean Indexing in Pandas\n- Slicing dataFrames and series",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Indexing in Pandas",
          "snippet": "import pandas as pd\n\ndata = {'Name': ['Alice', 'Bob', 'Charlie'],'Age': [25, 30, 35]}\ndf = pd.DataFrame(data)\n\nage_column = df['Age']\nprint(age_column)"
        }
      },
      {
        "title": "7. Selecting and Filtering Data Based on Conditions",
        "content": "Filtering data means selecting only those rows or columns that meet specific conditions instead of working with the entire dataset. This helps in extracting relevant data for analysis using logical conditions.\n\nIn the example below, we filter rows where the `Age` column is greater than 28, returning only matching records.\n\n`\n`\nYou can also refer to following resources for advanced techniques and more conditions in filtering and selection:\n\n- Select Rows With Multiple Filters in Pandas\n- Filtering by Column Value\n- Filter rows based on a list of values\n- Filter Pandas Dataframe with multiple conditions\n- Selecting Rows from a DataFrame Based on Column Values",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Selecting and Filtering Data Based on Conditions",
          "snippet": "import pandas as pd\n\ndata = {'Name': ['Alice', 'Bob', 'Charlie'],'Age': [25, 30, 35]}\ndf = pd.DataFrame(data)\nfiltered_df = df[df['Age'] > 28]\n\nprint(filtered_df)"
        }
      },
      {
        "title": "8. Dealing with Rows and Columns in Pandas DataFrame",
        "content": "It involves various data manipulation techniques in Pandas, such as adding and deleting columns, truncating data, iterating over DataFrames and sorting data. For more detailed explanations of each concept and step, you can refer to Dealing with Rows and Columns in Pandas DataFrame.\n\n**1. Adding a New Column to DataFrame**: We can easily add new columns by assigning values to them by direct assignment.\n\n`\n`\n**Output:**\n\nAdding a new column**There are multiple methods, for that refer to: Adding new column to existing dataFrame in pandas. If you want to add columns from one dataFrame to another, refer to Adding Columns from Another DataFrame.\n\n2. Renaming Columns in a DataFrame:** We can use the rename() method for selective renaming of specific columns or directly modify the columns attribute when renaming all columns at once.\n\n`\n`\n**Output:**\n\nRenamed Columns**We can also Rename column by index in Pandas\n\n3. Reindexing Data with Pandas:** Reindexing in Pandas is used to change the row or column labels of a DataFrame or Series. It helps align data with new labels, handle missing values, and restructure datasets. The `reindex()` method updates indices or column names as needed.\n\n**Note:** If the new index includes labels not present in the original DataFrame, the corresponding values will be set to NaN by default.\n\n`\n`\n**Output:**\n\nReindexed RowsWhat if you want to reset the index? for that refer to: Convert Index to Column in Pandas Dataframe",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Dealing with Rows and Columns in Pandas DataFrame",
          "snippet": "import pandas as pd\n\ndf = pd.DataFrame({'Name': ['Alice', 'Bob', 'Charlie'], 'Age': [25, 30, 35]})\n\ndf['Salary'] = [50000, 60000, 70000]\nprint(df)"
        }
      },
      {
        "title": "9. Handling Missing Data in Pandas",
        "content": "Working with missing data is one of the most common tasks in data manipulation. Pandas provides several functions to identify, fill, and remove missing values efficiently. This helps ensure data quality before performing analysis.\n\n**1. Identifying Missing Data With Pandas using ****isnull() and notnull()**:\n\n- **`isnull():**`` `Returns `True w`here values are missing (NaN) and False where values are present.\n- **`notnull():**`` `Returns True where values are present and False where they are missing. **Example:**\n\n`\n`\n**Output:**\n\nChecking Missing ValuesWhen working with real world datasets, missing values are common. Broadly, we have two main ways to deal with missing data:\n\n- Impute (Fill) the missing values\n- Remove (Delete) the missing values**2. Filling Missing Data: **Missing values can be replaced using the `fillna()` method.\n\n**For example:** Replacing all missing values with 0. This method modifies the dataset directly when inplace=True is used.\n\n`\n`\n**Output:**\n\nFilled Missing Values with 0We can also fill missing values with below techniques:\n\n**\n- Replacing with the mean, median, or mode of the column\n- Forward fill - Fill missing values with the last valid observation\n- Backward fill- Fill missing values with the next valid observation\n\n3. Dropping Missing Data With Pandas: **We can remove missing values using the dropna() method. Depending on the requirement, Pandas allows different ways to drop data.\n\nCommon approaches include:\n\n- Removing columns that contain missing values using df.dropna(axis=1)\n- Dropping rows where certain columns have missing values using df.dropna(subset=['Column1', 'Column2'])To explore more variations of dropping data, you can refer to topics like Dropping Rows from a Pandas DataFrame with Missing Values and Dropping One or Multiple Columns.\n\n** For example:**\n\n`\n`\n**Output:**\n\nMissing Data Dropped",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Handling Missing Data in Pandas",
          "snippet": "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'Col1': [1, 2, np.nan],'Col2': [3, np.nan, np.nan]})\n\nprint(df.isnull())"
        }
      },
      {
        "title": "10. Aggregation and Grouping With Pandas",
        "content": "Aggregation and grouping in Pandas are used to analyze and summarize data. Grouping divides data into categories, while aggregation performs operations like sum, mean, or count to extract insights.\n\nThe groupby() function is commonly used for grouping data, followed by aggregation functions like sum(), mean(), size(), or custom operations.\n\n**Example:**\n\n- **groupby('Category'):** Groups data by the 'Category' column.\n- **.sum(), .mean(), and .size():** Perform aggregation on the grouped data.\n\n`\n`\n**Output:**\n\nGrouping in Pandas\n- For more detailed information and practical examples, refer Grouping and Aggregating with Pandas\n- For more advanced operations, you can use `.agg()` to apply custom aggregation functions.\n- Grouping Rows in pandas",
        "code": {
          "language": "python",
          "caption": "Python Example — 10. Aggregation and Grouping With Pandas",
          "snippet": "import pandas as pd\n\ndata = {'Category': ['A', 'B', 'A', 'B'], 'Value': [10, 20, 30, 40]}\ndf = pd.DataFrame(data)\n\ngrouped_sum = df.groupby('Category').sum()\nprint(\"Sum:\\n\", grouped_sum)\n\ngrouped_mean = df.groupby('Category')['Value'].mean()\nprint(\"\\nMean:\\n\", grouped_mean)\n\ngrouped_agg = df.groupby('Category').agg(['sum', 'mean'])\nprint(\"\\nAggregated:\\n\", grouped_agg)"
        }
      },
      {
        "title": "11. Merging and Concatenating Data in Pandas",
        "content": "This section explains how to combine multiple DataFrames or Series into a single DataFrame. These operations are commonly used to integrate datasets and organize data for analysis.\n\n**1. Merging DataFrames**: Combines data based on common column or index using functions like `merge` or `join`. There are mainly 4 types of joins:\n\n- **Inner Join:** Keeps rows that match in both DataFrames.\n- **Left Join:** Keeps all rows from the left DataFrame and match data from the right.\n- **Right Join and Outer Join: ** Keep similar but differ in data retention rules.**Example:**\n\n`\n`\n**Output:**\n\nMerging in Pandas**2. Concatenating Data**: Concatenation is used to stack DataFrames either vertically (row-wise) or horizontally (column-wise) using pd.concat(). Let's create two dataFrames and concatenate it with the original one:\n\n**Example:**\n\n- By default, pd.concat() concatenates DataFrames row-wise (axis=0), stacking them vertically.\n- ignore_index=True resets the index to create a continuous sequence instead of keeping original indices.\n\n`\n`\n**Output:**\n\nConcatenated Dataframe\n- Learn Concatenate Two or More Pandas DataFrames with all operations and multiple examples. For more, Go Through below articles:\n- Concatenate values in different columns to one column\n- Merge two dataFrames on certain columns\n- Merge multiple CSV Files into single dataframe",
        "code": {
          "language": "python",
          "caption": "Python Example — 11. Merging and Concatenating Data in Pandas",
          "snippet": "import pandas as pd\n\ndata1 = {\n    'Name': ['Alice', 'Charlie', 'Edward', 'Grace'],\n    'Years_Experience': [2, 3, 4, 6]\n}\ndf1 = pd.DataFrame(data1)\n\ndata2 = {\n    'Name': ['Alice', 'Charlie', 'Frank', 'Grace'],\n    'Role': ['Manager', 'Analyst', 'Developer', 'HR']\n}\ndf3 = pd.DataFrame(data2)\n\ndf_merged_inner = pd.merge(df1, df3, on='Name', how='inner')\n\ndf_merged_outer = pd.merge(df1, df3, on='Name', how='outer')\n\nprint(\"\\nInner Merge (Intersection of Names):\\n\", df_merged_inner)\nprint(\"\\nOuter Merge (Union of Names):\\n\", df_merged_outer)"
        }
      },
      {
        "title": "12. Reshaping Data in Pandas",
        "content": "Reshaping data means changing the structure of rows and columns to better organize or analyze data. Common operations include pivoting, melting, stacking, and unstacking.\n\n**1. Pivot Tables in Pandas**: Pivot tables reshape data based on column values and are useful for creating aggregated views using the pivot_table() method.\n\n`\n`\n**Output:**\n\nPivoting in Pandas**2. Melting : **Multiple columns are combined into a single key value pair.\n\nWhen you melt data:\n\n- The column names become the keys.\n- The values in the columns become the values.**Note:** To melt data, you must specify columns that act as \"identifiers\" (`id_vars`) and others that need to be melted (`value_vars`).\n\n`\n`\n**Output:**\n\nMelting in Pandas**3. Stacking and Unstacking With Pandas**: Reshapes data by changing rows and columns, especially useful with MultiIndex DataFrames. These methods help reorganize the structure of data for better analysis.\n\n- **Stacking**: Converts columns into rows, making the DataFrame taller.\n- **Unstacking**: Converts rows into columns, making the DataFrame wider.**Example:** When columns are stacked into rows using stack(), the DataFrame structure changes. The data now has a MultiIndex in the rows:\n\n- First level Product (e.g., Product_A, Product_B)\n- Second level Category (e.g., Sales, Expenses)\n- The quarter values (Q1, Q2) remain as columns, while the higher level column labels move into the row index.\n\n`\n`\n**Output:**\n\nStacking and Unstacking in PandasLet’s compare and understand in depth with more examples the stack(), unstack(), and melt() methods. We can also use the transpose() method to swap rows and columns when needed.",
        "code": {
          "language": "python",
          "caption": "Python Example — 12. Reshaping Data in Pandas",
          "snippet": "import pandas as pd\n\ndata = {'Date': ['2024-10-01', '2024-10-01', '2024-10-02', '2024-10-02'],'Category': ['A', 'B', 'A', 'B'],'Values': [10, 20, 15, 25]}\ndf = pd.DataFrame(data)\n\npivot_table = df.pivot_table(values='Values', index='Date', columns='Category', aggfunc='sum')\nprint(pivot_table)"
        }
      },
      {
        "title": "13. Handling Large Datasets With Pandas",
        "content": "When working with large datasets or heavy computations, performance optimization becomes important for faster processing and better memory usage. Pandas provides several techniques to improve efficiency.\n\n- **Working with Chunks of Data****:** For datasets that don’t fit into memory, the chunksize parameter in pd.read_csv() be used to load data in parts. This allows processing data in smaller, manageable chunks instead of loading the entire dataset at once.\n- **Optimizing Memory Usage by Changing Data Types****:** By default, Pandas may use larger data types (e.g., `int64`) even when not needed. Using .astype() to convert columns to smaller or more appropriate types helps reduce memory usage, especially in large datasets.**Related Articles:**\n\n- Handling Large Datasets in Pandas\n- Pandas Exercises and Programs\n- Pandas Tutorial\n\nComment"
      }
    ],
    "playground": {
      "title": "Python Lab: Pandas Step-by-Step Guide",
      "initialCode": "import pandas as pd\n\ndata = {\n    'Name': [\"Player_A\", \"Player_B\", \"Player_C\"],\n    'Age': [25, 30, 35]}\n    \ndf = pd.DataFrame(data)\n\nprint(df)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-pandas-guide.py ...",
        "[INFO] Loaded module for: Pandas Step-by-Step Guide",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Pandas Step-by-Step Guide?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Pandas Step-by-Step Guide workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Pandas Step-by-Step Guide is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-matplotlib-guide": {
    "id": "ds-matplotlib-guide",
    "badge": "Module 1 • Data Science",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Data Visualization with Matplotlib",
    "subtitle": "In-depth guide to Data Visualization with Matplotlib — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Matplotlib is a Python library used for creating static, animated and interactive data visualizations. It is built on the top of NumPy and it can easily handles large datasets for creating various types of plots such as line charts, bar charts, scatter plots, etc.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Data Visualization with Matplotlib."
        }
      },
      {
        "title": "2. Visualizing Data with Pyplot using Matplotlib",
        "content": "Pyplot is a module in Matplotlib that provides a simple interface for creating plots. It allows users to generate charts like line graphs, bar charts and histograms with minimal code. Let’s explore some examples with simple code to understand how to use it effectively."
      },
      {
        "title": "1. Line Chart",
        "content": "Line chart is one of the basic plots and can be created using plot() function. It is used to represent a relationship between two data X and Y on a different axis.\n\n**Syntax:**\n\n**matplotlib.pyplot.plot(x, y)\n\nParameter: **x, y Coordinates for data points.\n\n**Example: **This code plots a simple line chart with labeled axes and a title using Matplotlib.\n\n`\n`\n**Output**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Line Chart",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [10, 20, 30, 40]\ny = [20, 25, 35, 55]\n\nplt.plot(x, y)\nplt.title(\"Line Chart\")\nplt.ylabel('Y-Axis')\nplt.xlabel('X-Axis')\nplt.show()"
        }
      },
      {
        "title": "2. Bar Chart",
        "content": "Bar chart displays categorical data using rectangular bars whose lengths are proportional to the values they represent. It can be plotted vertically or horizontally to compare different categories.\n\n**Syntax:**\n\n**matplotlib.pyplot.bar(x, height)\n\nParameter:**\n\n- **x: **Categories or positions on x-axis**.**\n- **height:** Heights of the bars (y-axis values).**Example: **This code creates a simple bar chart to show total bills for different days. X-axis represents the days and Y-axis shows total bill amount.\n\n`\n`\n**Output**\n\nBar Chart",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Bar Chart",
          "snippet": "import matplotlib.pyplot as plt\n\nx = ['Thur', 'Fri', 'Sat', 'Sun']\ny = [170, 120, 250, 190]\n\nplt.bar(x, y)\nplt.title(\"Bar Chart\")\nplt.xlabel(\"Day\")\nplt.ylabel(\"Total Bill\")\nplt.show()"
        }
      },
      {
        "title": "3. Histogram",
        "content": "Histogram shows the distribution of data by grouping values into bins. The hist() function is used to create it, with X-axis showing bins and Y-axis showing frequencies.\n\n**Syntax:**\n\n**matplotlib.pyplot.hist(x, bins=None)\n\nParameter:**\n\n- **x: **Input data.\n- **bins:** Number of bins (intervals) to group data.**Example: **This code plots a histogram to show frequency distribution of total bill values from the list x. It uses 10 bins and adds axis labels and a title for clarity.\n\n`\n`\n**Output**\n\nHistogram",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Histogram",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [7, 8, 9, 10, 10, 12, 12, 12, 13, 14, 14, 15, 16, 16, 17, 18, 18, 19, 20, 20,\n     21, 22, 23, 24, 25, 25, 26, 28, 30, 32, 35, 36, 38, 40, 42, 44, 48, 50]\n\nplt.hist(x, bins=10, color='steelblue')\nplt.title(\"Histogram\")\nplt.xlabel(\"Total Bill\")\nplt.ylabel(\"Frequency\")\nplt.show()"
        }
      },
      {
        "title": "4. Scatter Plot",
        "content": "Scatter plots are used to observe relationships between variables. The scatter() method in the matplotlib library is used to draw a scatter plot.\n\n**Syntax:**\n\n**matplotlib.pyplot.scatter(x, y)\n\nParameter: x, y** Coordinates of the points.\n\n**Example: **This code creates a scatter plot to visualize the relationship between days and total bill amounts using scatter().\n\n`\n`\n**Output**\n\nScatter Plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Scatter Plot",
          "snippet": "import matplotlib.pyplot as plt\n\nx = ['Thur', 'Fri', 'Sat', 'Sun', 'Thur', 'Fri', 'Sat', 'Sun']\ny = [170, 120, 250, 190, 160, 130, 240, 200]\n\nplt.scatter(x, y)\nplt.title(\"Scatter Plot\")\nplt.xlabel(\"Day\")\nplt.ylabel(\"Total Bill\")\nplt.show()"
        }
      },
      {
        "title": "5. Pie Chart",
        "content": "Pie chart is a circular chart used to show data as proportions or percentages. It is created using the pie(), where each slice (wedge) represents a part of the whole.\n\n**Syntax:**\n\n**matplotlib.pyplot.pie(x, labels=None, autopct=None)\n\nParameter:**\n\n- **x:** Data values for pie slices.\n- **labels:** Names for each slice.\n- **autopct:** Format to display percentage (e.g., '%1.1f%%').**Example: **This code creates a simple pie chart to visualize distribution of different car brands. Each slice of pie represents the proportion of cars for each brand in the dataset.\n\n`\n`\n**Output**\n\nPie Chart",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Pie Chart",
          "snippet": "import matplotlib.pyplot as plt\nimport pandas as pd\n\ncars = ['AUDI', 'BMW', 'FORD','TESLA', 'JAGUAR',]\ndata = [23, 10, 35, 15, 12]\n\nplt.pie(data, labels=cars)\nplt.title(\" Pie Chart\")\nplt.show()"
        }
      },
      {
        "title": "6. Box Plot",
        "content": "Box plot is a simple graph that shows how data is spread out. It displays the minimum, maximum, median and quartiles and also helps to spot outliers easily.\n\n**Syntax:**\n\n**matplotlib.pyplot.boxplot(x, notch=False, vert=True)\n\nParameter:**\n\n- **x:** Data for which box plot is to be drawn (usually a list or array).\n- **notch: **If True, draws a notch to show the confidence interval around the median.\n- **vert:** If True, boxes are vertical. If False, they are horizontal.**Example: **This code creates a box plot to show the data distribution and compare three groups using matplotlib\n\n`\n`\n**Output**\n\nBox Plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Box Plot",
          "snippet": "import matplotlib.pyplot as plt\n\ndata = [ [10, 12, 14, 15, 18, 20, 22],\n         [8, 9, 11, 13, 17, 19, 21],\n         [14, 16, 18, 20, 23, 25, 27] ]\n\nplt.boxplot(data)\nplt.xlabel(\"Groups\")\nplt.ylabel(\"Values\")\nplt.title(\"Box Plot\")\nplt.show()"
        }
      },
      {
        "title": "7. Heatmap",
        "content": "Heatmap is a graphical representation of data where values are shown as colors. It helps visualize patterns, correlations or intensity in a matrix-like format. It is created using **imshow()** method in Matplotlib.\n\n**Syntax:**\n\n**matplotlib.pyplot.imshow(X, cmap='viridis')\n\nParameter: **\n\n- **X:** 2D array (data to display as an image or heatmap).\n- **cmap:** Sets the color map.**Example: **This code creates a heatmap of random 10×10 data using imshow(). It uses 'viridis' color map and colorbar() adds a color scale.\n\n`\n`\n**Output**\n\nHeatmap**Explanation:**\n\n- **np.random.seed(0):** Ensures same random values every time (reproducibility).\n- **np.random.rand(10, 10):** Generates a 10×10 array of random numbers between 0 and 1.",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Heatmap",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(0)\ndata = np.random.rand(10, 10)\n\nplt.imshow(data, cmap='viridis', interpolation='nearest')\n\nplt.colorbar()\nplt.xlabel('X-axis Label')\nplt.ylabel('Y-axis Label')\nplt.title('Heatmap')\nplt.show()"
        }
      },
      {
        "title": "10. How to Customize Matplotlib Visualizations",
        "content": "Customization in Matplotlib allows you to improve look and clarity of plots by adjusting elements like colors, styles, labels, titles and gridlines. It helps make visualizations more informative and visually appealing for better data communication. Let’s explore different ways to customize visualizations:"
      },
      {
        "title": "1. Customizing Line Chart",
        "content": "Line charts can be customized using various properties:\n\n- **Color: **Change the color of the line\n- **Linewidth**: Adjust the width of the line\n- **Marker**: Change the style of plotted points\n- **Markersize**: Change the size of the markers\n- **Linestyle**: Define the style of the line like solid, dashed, etc.**Example: **This code creates a customized line chart with a green dashed line, thicker width, large circular markers and labeled axes and title.\n\n`\n`\n**Output**\n\nCustomizing Line Chart",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Customizing Line Chart",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [10, 20, 30, 40]\ny = [20, 25, 35, 55]\n\nplt.plot(x, y, color='green', linewidth=3, marker='o', markersize=15, linestyle='--')\n\nplt.title(\"Customizing Line Chart\")\nplt.ylabel('Y-Axis')\nplt.xlabel('X-Axis')\nplt.show()"
        }
      },
      {
        "title": "2. Customizing Bar Chart",
        "content": "Bar charts can be made more informative and visually appealing by customizing:\n\n- **Color:** Fill color of the bars\n- **Edgecolor:** Color of the bar edges\n- **Linewidth: **Thickness of the edges\n- **Width: **Width of each bar**Example:** This code creates a customized bar chart with green bars, blue edges, thicker border lines and labeled axes and title.\n\n`\n`\n**Output**\n\nCustomizing Bar plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Customizing Bar Chart",
          "snippet": "import matplotlib.pyplot as plt\n\nx = ['Thur', 'Fri', 'Sat', 'Sun']\ny = [170, 120, 250, 190]\n\nplt.bar(x, y, color='green', edgecolor='black', linewidth=2)\n\nplt.title(\"Customizing Bar Chart\")\nplt.xlabel(\"Day\")\nplt.ylabel(\"Total Bill\")\nplt.show()"
        }
      },
      {
        "title": "3. Customizing Histogram Plot",
        "content": "To make histogram plots more effective various customizations can be applied:\n\n- **Bins: **Number of groups (bins) to divide data into\n- **Color**: Bar fill color\n- **Edgecolor**: Bar edge color\n- **Linestyle**: Style of the edges like solid, dashed, etc.\n- **Alpha**: Transparency level (0 = transparent, 1 = opaque)**Example: **This code creates a customized histogram with green bars, blue edges, dashed border lines, semi-transparent fill and labeled axes and title.\n\n`\n`\n**Output**\n\nCustomizing Histogram",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Customizing Histogram Plot",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [7, 8, 9, 10, 10, 12, 12, 12, 13, 14, 14, 15, 16, 16, 17,\n     18, 18, 19, 20, 20, 21, 22, 23, 24, 25, 25, 26, 28, 30,\n     32, 35, 36, 38, 40, 42, 44, 48, 50]\n\nplt.hist(x, bins=10, color='green', edgecolor='blue',linestyle='--', alpha=0.5)\n\nplt.title(\"Customizing Histogram Plot\")\nplt.xlabel(\"Total Bill\")\nplt.ylabel(\"Frequency\")\nplt.show()"
        }
      },
      {
        "title": "4. Customizing Scatter Plot",
        "content": "Scatter plots can be enhanced with:\n\n- **S:** Marker size (single value or array)\n- **C:** Color of markers or sequence of colors\n- **Marker:** Marker style like circle, diamond, etc.\n- **Linewidths:** Width of marker borders\n- **Edgecolor:** Color of marker borders\n- **Alpha:** Blending value, between 0 (transparent) and 1 (opaque)**Example: **This code creates a customized scatter plot using diamond-shaped markers, where color represents size, marker size reflects the total bill and transparency is added for better visualization. It includes labeled axes and a title.\n\n`\n`\n**Output**\n\nCustomizing Scatter Plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Customizing Scatter Plot",
          "snippet": "import matplotlib.pyplot as plt\n\nx = ['Thur', 'Fri', 'Sat', 'Sun', 'Thur', 'Fri', 'Sat', 'Sun']\ny = [170, 120, 250, 190, 180, 130, 260, 200]\nsize = [2, 3, 4, 2, 3, 2, 4, 3]  \nbill = [170, 120, 250, 190, 180, 130, 260, 200]  \n\nplt.scatter(x, y, c=size, s=bill, marker='D', alpha=0.5)\n\nplt.title(\"Customizing Scatter Plot\")\nplt.xlabel(\"Day\")\nplt.ylabel(\"Total Bill\")\nplt.show()"
        }
      },
      {
        "title": "5. Customizing Pie Chart",
        "content": "To make pie charts more effective and visually appealing use:\n\n- **Explode: **Moving the wedges of the plot\n- **Autopct: **Label the wedge with their numerical value.\n- **Color:** Colors of the slices\n- **Shadow:** Used to create a shadow effect**Example:** This code creates a customized pie chart with colored slices, exploded segments for emphasis, percentage labels with two decimal places and a shadow effect for better visual appeal.\n\n`\n`\n**Output**",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Customizing Pie Chart",
          "snippet": "import matplotlib.pyplot as plt\nimport pandas as pd\n\ncars = ['AUDI', 'BMW', 'FORD','TESLA', 'JAGUAR',]\ndata = [23, 13, 35, 15, 12]\nexplode = [0.1, 0.5, 0, 0, 0]\ncolors = ( \"orange\", \"cyan\", \"yellow\",\"grey\", \"green\",)\n\nplt.pie(data, labels=cars, explode=explode, autopct='%1.2f%%',colors=colors, shadow=True)\nplt.show()"
        }
      },
      {
        "title": "16. Matplotlib’s Core Components: Figures and Axes",
        "content": "Before we proceed let’s understand two classes which are important for working with Matplotlib."
      }
    ],
    "playground": {
      "title": "Python Lab: Data Visualization with Matplotlib",
      "initialCode": "import matplotlib.pyplot as plt\n\nx = [10, 20, 30, 40]\ny = [20, 25, 35, 55]\n\nplt.plot(x, y)\nplt.title(\"Line Chart\")\nplt.ylabel('Y-Axis')\nplt.xlabel('X-Axis')\nplt.show()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-matplotlib-guide.py ...",
        "[INFO] Loaded module for: Data Visualization with Matplotlib",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Data Visualization with Matplotlib?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Data Visualization with Matplotlib workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Data Visualization with Matplotlib is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-seaborn-guide": {
    "id": "ds-seaborn-guide",
    "badge": "Module 1 • Data Science",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Statistical Visualization with Seaborn",
    "subtitle": "In-depth guide to Statistical Visualization with Seaborn — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Seaborn is a Python library for creating attractive statistical visualizations. Built on Matplotlib and integrated with Pandas, it simplifies complex plots like line charts, heatmaps and violin plots with minimal code.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Statistical Visualization with Seaborn."
        }
      },
      {
        "title": "2. Creating Plots with Seaborn",
        "content": "Seaborn makes it easy to create clear and informative statistical plots with just a few lines of code. It offers built-in themes, color palettes, and functions tailored for different types of data.\n\nLet’s see various types of plots with simple code to understand how to use it effectively."
      },
      {
        "title": "1. Line plot",
        "content": "A line plot shows the relationship between two numeric variables, often over time. It can also compare multiple groups using different lines.\n\n**Syntax: **\n\n**sns.lineplot(x=None, y=None, data=None)\n\nParameters:**\n\n- **x, y**: Numeric input variables. These can be arrays, lists or column names from a DataFrame.\n- **data**: DataFrame containing the data.**Example:**\n\n`\n`\n**Output**\n\nLine plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Line plot",
          "snippet": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.lineplot(x=df.index, y='Age', data=df)\nplt.xlabel('Index')\nplt.ylabel('Age')\nplt.title('Age Line Plot')\nplt.show()"
        }
      },
      {
        "title": "2. Scatter Plot",
        "content": "Scatter plots are used to visualize the relationship between two numerical variables. They help identify correlations or patterns. It can draw a two-dimensional graph.\n\n**Syntax:**\n\n**sns.scatterplot(x=None, y=None, data=None)\n\nParameters:**\n\n- **x, y:** Input data variables that should be numeric.\n- **data (optional)**: Dataset containing the variables.**Returns:** An Axes object with the scatter plot.\n\n**Example:**\n\n`\n`\n**Output**\n\nScatter plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Scatter Plot",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.scatterplot(x=df.index, y='Age', data=df)\nplt.show()"
        }
      },
      {
        "title": "3. Box plot",
        "content": "A box plot is the visual representation of the depicting groups of numerical data with their quartiles against continuous/categorical data.\n\nIt consists of 5 key statistics: Minimum ,First Quartile or 25% , Median (Second Quartile) or 50%, Third Quartile or 75% and Maximum\n\n**Syntax:**\n\n**sns.boxplot(x=None, y=None, hue=None, data=None)\n\nParameters:**\n\n- **x, y, hue:** Variables for plotting long-form data.\n- **data:** Dataset to plot. If x and y are absent data is treated as wide-form.**Returns:** An Axes object with the box plot.\n\n**Example:**\n\n`\n`\n**Output**\n\nBox plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Box plot",
          "snippet": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 45]} \ndf = pd.DataFrame(data)\n\nsns.boxplot(y='Age', data=df)\nplt.show()"
        }
      },
      {
        "title": "4. Violin Plot",
        "content": "A violin plot is similar to a boxplot. It shows several quantitative data across one or more categorical variables such that those distributions can be compared.\n\n**Syntax****: **\n\n**sns.violinplot(x=None, y=None, hue=None, data=None)\n\nParameters****:**\n\n- **x, y, hue:** Inputs for plotting long-form data.\n- **data:** Dataset for plotting. **Example:**\n\n`\n`\n**Output**\n\nViolin plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Violin Plot",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.violinplot(y='Age', data=df)\nplt.show()"
        }
      },
      {
        "title": "5. Swarm plot",
        "content": "A swarm plot displays individual data points without overlap along a categorical axis which provides a clear view of distribution density.\n\n**Syntax****:**\n\n** sns.swarmplot(x=None, y=None, hue=None, data=None)\n\nParameters****:**\n\n- **x, y, hue:** Inputs for plotting long-form data.\n- **data:** Dataset for plotting. **Example:**\n\n`\n`\n**Output**\n\nSwarmplot",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Swarm plot",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.swarmplot(x=df.index, y='Age', data=df)\nplt.show()"
        }
      },
      {
        "title": "6. Bar plot",
        "content": "Barplot represents an estimate of central tendency for a numeric variable with the height of each rectangle and provides some indication of the uncertainty around that estimate using error bars.\n\n**Syntax:**\n\n**sns.barplot(x=None, y=None, hue=None, data=None)\n\nParameters :**\n\n- **x, y :** Variables or column names for long-form data.\n- **hue :** (optional) Column for color encoding.\n- **data :** (optional) Dataset to plot.**Returns: **Axes object with the bar plot.\n\n**Example:**\n\n`\n`\n**Output**\n\nBar plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Bar plot",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.barplot(x='Name', y='Age', data=df)\nplt.show()"
        }
      },
      {
        "title": "7. Point plot",
        "content": "Point plot** **show point estimates and confidence intervals using scatter glyphs which represents the central tendency of a numeric variable.\n\n**Syntax****:**\n\n**sns.pointplot(x=None, y=None, hue=None, data=None)\n\nParameters****:**\n\n- **x, y: **Inputs for plotting long-form data.\n- **hue: **(optional) column name for color encoding.\n- **data:** Dataframe as a Dataset for plotting.**Return:** Axes object with the point plot.\n\n**Example:**\n\n`\n`\n**Output**\n\nPoint Plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Point plot",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'],'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.pointplot(x='Name', y='Age', data=df)\nplt.show()"
        }
      },
      {
        "title": "8. Count plot",
        "content": "A Count plot displays the number of occurrences of each category using bars to visualize the distribution of categorical variables.\n\n**Syntax :**\n\n**sns.countplot(x=None, y=None, hue=None, data=None)\n\nParameters :**\n\n- **x, y: **Inputs for plotting long-form data.\n- **hue: **(optional) column name for color encoding.\n- **data:** Dataframe as a Dataset for plotting.**Returns: **Axes object with the count plot.\n\n**Example: **\n\n`\n`\n**Output**\n\nCountplot",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Count plot",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndata = {'Name': ['ANSH', 'SAHIL', 'ANSH', 'JAYAN', 'ANURAG', 'ANURAG', 'ANURAG', 'SAHIL']}\ndf = pd.DataFrame(data)\n\nsns.countplot(x='Name', data=df)\nplt.title(\"Frequency of Names\")\nplt.show()"
        }
      },
      {
        "title": "9. KDE Plot",
        "content": "KDE Plot (**Kernel Density Estimate)** is used for visualizing the Probability Density of a continuous variable at different values in a continuous variable. We can also plot a single graph for multiple samples which helps in more efficient data visualization.\n\n**Syntax: **\n\n**sns.kdeplot(data=None, x=None, y=None, fill=False)\n\nParameters:**\n\n- **x, y: **Vectors or data keys**.**\n- **vertical: **Boolean to plot vertically.\n- **palette: **Color palette.\n- **data:** Dataframe **Example:**\n\n`\n`\n**Output**\n\nKDE plot",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. KDE Plot",
          "snippet": "from sklearn.datasets import load_iris\nimport pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\niris = load_iris()\ndf = pd.DataFrame(iris.data, columns=iris.feature_names)\ndf['Species'] = iris.target\ndf['Species'] = df['Species'].map({ 0: 'Setosa', 1: 'Versicolor', 2: 'Virginica'})\n\nsns.kdeplot(data=df[df['Species'] == 'Virginica'], x='sepal length (cm)', fill=True, label='Virginica')\nplt.legend()\nplt.show()"
        }
      },
      {
        "title": "12. How to Customize Seaborn Plots with Python?",
        "content": "Customizing Seaborn plots increases their readability and visual appeal which makes the data insights clearer and more informative. Here are several ways we can customize our plots in Seaborn:"
      },
      {
        "title": "1. Adding Titles and Axis Labels",
        "content": "Adding descriptive titles and axis labels makes our plots more understandable and informative. Using Matplotlib's **plt.title()**, **plt.xlabel()** and **plt.ylabel()** to set titles and axis labels.\n\n`\n`\n**Output**\n\nAdding Titles and Labels",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Adding Titles and Axis Labels",
          "snippet": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\niris = sns.load_dataset('iris')\nsns.scatterplot(x='sepal_length', y='sepal_width', data=iris)\n\n# Add plot title and axis labels\nplt.title('Sepal Length vs Sepal Width')\nplt.xlabel('Sepal Length (cm)')\nplt.ylabel('Sepal Width (cm)')\nplt.show()"
        }
      },
      {
        "title": "2. Built-in Styles and Grids in Seaborn",
        "content": "Seaborn provides built-in styles that control the background and grid of your plots. These styles improve readability and can be chosen based on your presentation needs.\n\n**Available Styles:**\n\n- darkgrid – Dark background with light gridlines. Great for clear contrast.\n- whitegrid – White background with light gridlines. Ideal for statistical plots.\n- dark – Dark background without gridlines. Clean and modern look.\n- white – Plain white background without gridlines. Good for simple visuals.\n- ticks – White background with axis ticks styled sharply. Suitable for publications.\n\n`\n`\n**Output**\n\nRepresentation of Whitegrid in Boxplot",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Built-in Styles and Grids in Seaborn",
          "snippet": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\nsns.set_style(\"whitegrid\")\n\nsns.boxplot(x='species', y='petal_length', data=sns.load_dataset('iris'))\nplt.title('Petal Length Distribution by Species')\nplt.show()"
        }
      },
      {
        "title": "3. Customizing Color Palettes",
        "content": "Seaborn makes it easy to enhance the appearance of plots using color palettes. You can choose from built-in palettes like \"deep\", \"muted\", or \"bright\" or define your own using sns.color_palette(). Customizing colors improves clarity and helps match your data’s theme or purpose.\n\n**a) Using a Built-in Palette:**\n\n`\n`\n**Output**\n\nUsing Built in palette**b) Using a Custom Palette:**\n\n`\n`\nUsing custom palette",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Customizing Color Palettes",
          "snippet": "sns.set_palette(\"pastel\") \n\nsns.violinplot(x='species', y='petal_length', data=sns.load_dataset('iris'))\nplt.title('Petal Length Distribution by Species')\nplt.show()"
        }
      },
      {
        "title": "4. Adjusting Figure Size and Aspect Ratio",
        "content": "We can adjust the figure size using **plt.figure(figsize=(width,height))** to control the plot's dimensions. This allows for better customization to fit different presentation or reports.\n\n`\n`\n**Output**\n\nAdjusting Figure Size and Aspect Ratio",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Adjusting Figure Size and Aspect Ratio",
          "snippet": "plt.figure(figsize=(10, 6))\n\nsns.lineplot(x='year', y='passengers', data=sns.load_dataset('flights'))\nplt.title('Number of Passengers Over Time')\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Statistical Visualization with Seaborn",
      "initialCode": "import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\ndata = {'Name': ['ANSH', 'SAHIL', 'JAYAN', 'ANURAG'], 'Age': [21, 23, 20, 24]}\ndf = pd.DataFrame(data)\n\nsns.lineplot(x=df.index, y='Age', data=df)\nplt.xlabel('Index')\nplt.ylabel('Age')\nplt.title('Age Line Plot')\nplt.show()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-seaborn-guide.py ...",
        "[INFO] Loaded module for: Statistical Visualization with Seaborn",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Statistical Visualization with Seaborn?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Statistical Visualization with Seaborn workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Statistical Visualization with Seaborn is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-plotly-guide": {
    "id": "ds-plotly-guide",
    "badge": "Module 1 • Data Science",
    "readingTime": "32 min read",
    "level": "Beginner",
    "title": "Interactive Plots with Plotly",
    "subtitle": "In-depth guide to Interactive Plots with Plotly — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Plotly is a data visualization library that enables users to create interactive, publication ready charts and dashboards in Python, R and JavaScript. It is widely used for exploratory data analysis, business reporting and web‑based visualisations.\n\n- Built on top of the Plotly JavaScript library (plotly.js).\n- Creates interactive charts like line plots, bar charts, scatter plots and maps\n- Works seamlessly with Python libraries such as NumPy and Pandas",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Interactive Plots with Plotly."
        }
      },
      {
        "title": "2. Installation and Setup",
        "content": "To get started with Plotly simply install it using the following command:\n\npip install plotly\n\nInstallationThis may take some time as it will install all the dependencies required for it."
      },
      {
        "title": "3. Understanding Plotly Modules",
        "content": "Plotly consists of two key modules:\n\n- **plotly.graph_objects: **Low-level API of Plotly that contains objects such as Figure, layout and data which are responsible for plotting.\n- **plotly.express: **This is a high-level interface that simplifies the process of creating complex visualizations and automatic styling.**Example:**\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Understanding Plotly Modules",
          "snippet": "import plotly.express as px\n\nfig = px.line(x=[1, 2], y=[3, 4])\n\nprint(fig)"
        }
      },
      {
        "title": "4. Basic Charts in Plotly",
        "content": "Here we will see how to generate basic charts using Plotly and apply various customizations to enhance their appearance and functionality. We will learn how to visualize different graph like line charts, scatter plots, bar charts, histograms and pie charts. We will cover the following customizations:\n\n- Adjusting chart layout\n- Adding annotations\n- Customizing markers and lines"
      },
      {
        "title": "1. Line chart",
        "content": "Plotly line chart is one of the simple plots where a line is drawn to show relation between the X-axis and Y-axis. It can be created using the** px.line()** method with each data position is represented as a vertex of a polyline mark in 2D space.\n\n**Syntax:**\n\n**plotly.express.line(data_frame=None, x=None, y=None, color=None, title=None)\n\nParameters**:\n\n- **data_frame: **Dataset to plot.\n- **x: **Column name for the X-axis.\n- **y: **Column name for the Y-axis.\n- **color:** Color the lines based on this column.\n- **title:** Title of the plot.**Return:** A plotly.express.Figure object.\n\n**Example:** We will be using Iris dataset and it is directly available as part of scikit-learn. df = px.data.iris() from the plotly.express library loads it into a Pandas DataFrame.\n\n`\n`\n**Output:**\n\nIn the above example, we can see that:\n\n- Plotly automatically assigns labels to the X and Y axes.\n- The data points for both axes are displayed.\n- We can zoom in, zoom out or select specific parts of the data.\n- It provides interactive tools in the top-right corner for chart manipulation.\n- We can also save the chart locally as a static image.Now let's try to customize our graph a little.\n\n**Example 1: **In this example we will use the line dash parameter which is used to group the lines according to the dataframe column passed.\n\n`\n`\n**Output:**\n\n**Example 2: **In this example, we will group and color the data according to the species. We will also change the line format. For this we will use two attributes such line_dash and color.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Line chart",
          "snippet": "import plotly.express as px\n\ndf = px.data.iris()\n\nfig = px.line(df, y=\"sepal_width\",)\n\nfig.show()"
        }
      },
      {
        "title": "2. Bar Chart",
        "content": "A bar chart is a pictorial representation of data that presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent. These data sets contain the numerical values of variables that represent the length or height. It can be created using the px.bar() method.\n\n**Syntax:**\n\n**plotly.express.bar(data_frame=None, x=None, y=None, color=None, title=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **x: **The column name for the X-axis.\n- **y:** The column name for the Y-axis.\n- **color: **Color the bars based on this column.\n- **title:** Title of the plot.**Return: **A plotly.express.Figure object.\n\n**Example:** We will be using tips dataset and this dataset contains 244 rows and 7 columns with each row representing a single restaurant bill and associated information.\n\n`\n`\n**Output:**\n\nLet's try to customize this plot.\n\n- **color**: Used to color the bars.\n- **facet_row: **Divides the graph into rows according to the data passed\n- **facet_col:** Divides the graph into columns according to the data passed\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Bar Chart",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.bar(df, x='day', y=\"total_bill\")\n\nfig.show()"
        }
      },
      {
        "title": "3. Scatter Plot",
        "content": "A scatter plot is a set of dotted points to represent individual pieces of data in the horizontal and vertical axis. A graph in which the values of two variables are plotted along X-axis and Y-axis, the pattern of the resulting points reveals a correlation between them and it can be created using the px.scatter() method.\n\n**Syntax:**\n\n**plotly.express.scatter(data_frame=None, x=None, y=None, color=None, title=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **x: **The column name for the X-axis.\n- **y:** The column name for the Y-axis.\n- **color: **Color the bars based on this column.\n- **title:** Title of the plot.**Return**: A plotly.express.Figure object.\n\n**Example:**\n\n`\n`\n**Output:**\n\nLet's see various customizations available for this chart:\n\n- **color: **Color the points.\n- **symbol:** Gives a symbol to each point according to the data passed.\n- **size:** Size for each point.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Scatter Plot",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.scatter(df, x='total_bill', y=\"tip\")\n\nfig.show()"
        }
      },
      {
        "title": "4. Histogram",
        "content": "A histogram is used to represent data in the form of some groups. It is a type of bar plot where the X-axis represents the bin ranges while the Y-axis gives information about frequency. It can be created using the px.histogram() method.\n\n**Syntax: **\n\n**plotly.express.histogram(data_frame=None, x=None, y=None, color=None, nbins=None, histnorm=None, title=None, width=None, height=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **x:** The column name for the X-axis (values to be binned).\n- **color:** Color the bars based on this column.\n- **nbins:** Set the number of bins.\n- **histnorm:** Normalize the histogram (e.g\"percent\", \"density\").**Return**: A plotly.express.Figure object.\n\n**Example:**\n\n`\n`\n**Output:**\n\nLet's customize the above graph.\n\n- **color: **To color the bars\n- **nbins:** To set the number of bins\n- **histnorm: **Mode through which the bins are represented. Different values that can be passed using this argument.Here **barmode **can be either 'group', 'overlay' or 'relative'.\n\n- **group: **Bars are placed beside each other\n- **overlay: **Bars are drawn on the top of each other\n- **relative:** Bars are stacked above/below zero based on values\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Histogram",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.histogram(df, x=\"total_bill\")\n\nfig.show()"
        }
      },
      {
        "title": "5. Pie Chart",
        "content": "A pie chart is a circular statistical graphic which is divided into slices to show numerical proportions. It shows a special chart that uses “pie slices” where each sector shows the relative sizes of data. It can be created using the px.pie() method.\n\n**Syntax:**\n\n**plotly.express.pie(data_frame=None, names=None, values=None, color=None, hole=None, title=None, width=None, height=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **names: **Column name for the pie chart labels.\n- **values:** Column name for the size of the slices.\n- **hole:** Creates a donut chart when set between 0 and 1.**Return**: A plotly.express.Figure object.\n\n**Example:**\n\n`\n`\n**Output:**\n\nLet's customize the above graph.\n\n- **color_discrete_sequence: **Strings defining valid CSS colors\n- **opacity: **It finds how transparent or solid the markers (such as points on a scatter plot) appear. The value should be between 0 and 1\n- **hole: **Creates a hole in between to make it a donut chart. The value should be between 0 and 1\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Pie Chart",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.pie(df, values=\"total_bill\", names=\"day\")\nfig.show()"
        }
      },
      {
        "title": "6. Box Plot",
        "content": "A Box Plot is also known as Whisker plot and in this a box is created from the first quartile to the third quartile, a vertical line is also there which goes through the box at the median. Here x-axis denotes the data to be plotted while the y-axis shows the frequency distribution. It can be created using the px.box() method\n\n**Syntax:**\n\n**plotly.express.box(data_frame=None, x=None, y=None, color=None, facet_row=None, facet_col=None, title=None, width=None, height=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **x: **The column name for the X-axis.\n- **y:** The column name for the Y-axis.\n- **color: **Color the boxes based on this column.**Return**: A plotly.express.Figure object.\n\n**Example:**\n\n`\n`\n**Output:**\n\nLet's customize the above graph.\n\n- **color: **used to assign color to marks\n- **facet_row:** assign marks to facetted subplots in the vertical direction\n- **facet_col: **assign marks to facetted subplots in the horizontal direction\n- **boxmode: **One of ‘group’ or ‘overlay’ In ‘overlay’ mode, boxes are on drawn top of one another. In ‘group’ mode, boxes are placed beside each other.\n- **notched: **If True, boxes are drawn with notches\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Box Plot",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.box(df, x=\"day\", y=\"tip\")\n\nfig.show()"
        }
      },
      {
        "title": "7. Violin Plot",
        "content": "A Violin Plot shows the distribution of numerical data along with its density, combining features of a box plot and a density plot. It reveals patterns that box plots may miss, and in Plotly it can be created using px.violin().\n\n**Syntax:**\n\n**plotly.express.violin(data_frame=None, x=None, y=None, color=None, facet_row=None, facet_col=None, title=None, width=None, height=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **x: **The column name for the X-axis.\n- **y:** The column name for the Y-axis.\n- **color: **Color the violins based on this column.**Return**: A plotly.express.Figure object.\n\n**Example:**\n\n`\n`\n**Output:**\n\nLet's customize the above graph.\n\n**Example: **For customizing the violin plot we will use the same customizations available for the box plot except the boxmode and notched which are not available for the violin plot Setting this parameter to True will show a box plot inside the violin plot.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Violin Plot",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.violin(df, x=\"day\", y=\"tip\")\n\nfig.show()"
        }
      },
      {
        "title": "8. 3D Scatter Plot",
        "content": "3D Scatter Plot shows data points in three dimensions, adding extra information by adjusting color, size and style of the points. These adjustments help make the plot clearer and easier to understand. You can create a 3D scatter plot using the `scatter_3d` function from the plotly.express class.\n\n**Syntax:**\n\n**plotly.express.scatter_3d(data_frame=None, x=None, y=None, z=None, color=None, symbol=None, size=None, title=None, width=None, height=None)\n\nParameters:**\n\n- **data_frame:** Dataset to plot.\n- **x: **The column name for the X-axis.\n- **y:** The column name for the Y-axis.\n- **z:** The column name for the Z-axis.\n- **color**: Color the points based on this column.\n- **size: **Size of the points.**Return**: A plotly.express.Figure object.\n\n**Example:**\n\n`\n`\n**Output:**\n\nCustomizing the 3D scatter plot.\n\n- **color: **Set the color of the markers\n- **size: **Set the size of the marker\n- **symbol: **Set the symbol of the plot\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. 3D Scatter Plot",
          "snippet": "import plotly.express as px\n\ndf = px.data.tips()\n\nfig = px.scatter_3d(df, x=\"total_bill\", y=\"sex\", z=\"tip\")\n\nfig.show()"
        }
      },
      {
        "title": "13. Implementing Interactive Features in Plotly",
        "content": "Plotly provides various interactive features which allows users to zoom, hover and click for deeper insights. Beyond these built-in interactions it allows customization with tools like dropdown menus, buttons and sliders. These can be added using the update menu attribute in the plot layout. Let’s explore these features:"
      },
      {
        "title": "1. Dropdown Menu",
        "content": "A drop-down menu allows users to select different options to modify the chart. The update method is used to control the chart based on dropdown choices. In plotly there are 4 possible methods to modify the charts by using update menu method.\n\n- **restyle:** modify data or data attributes\n- **relayout:** modify layout attributes\n- **update:** modify data and layout attributes\n- **animate:** start or pause an animation**Example: **Here we will be using Tips dataset which contains 244 rows and 7 columns and with each row representing a single restaurant bill and associated information.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Dropdown Menu",
          "snippet": "import plotly.graph_objects as go\nimport plotly.express as px\nimport numpy as np\nimport pandas as pd\n\ndf = px.data.tips()\n\nplot = go.Figure(data=[go.Scatter(\n    x=df['day'],\n    y=df['tip'],\n    mode='markers',)\n])\n\nplot.update_layout(\n    updatemenus=[\n        dict(buttons=list([\n            dict(\n                args=[\"type\", \"scatter\"],\n                label=\"Scatter Plot\",\n                method=\"restyle\"\n            ),\n            dict(\n                args=[\"type\", \"bar\"],\n                label=\"Bar Chart\",\n                method=\"restyle\"\n            )\n        ]),\n            direction=\"down\",\n        ),\n    ]\n)\n\nplot.show()"
        }
      },
      {
        "title": "2. Adding Buttons",
        "content": "In plotly, adding custom Buttons are used to quickly make actions directly from a record. Custom Buttons can be added to page layouts in CRM, Marketing and Custom Apps. There are also 4 possible methods that can be applied in custom buttons:\n\n- **restyle:** modify data or data attributes\n- **relayout:** modify layout attributes\n- **update:** modify data and layout attributes\n- **animate:** start or pause an animation**Example:**\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Adding Buttons",
          "snippet": "import plotly.graph_objects as go\nimport plotly.express as px\nimport pandas as pd\n\ndf = px.data.tips()\n\nplot = go.Figure(data=[go.Scatter(\n    x=df['day'],\n    y=df['tip'],\n    mode='markers',)\n])\n\nplot.update_layout(\n    updatemenus=[\n        dict(\n            type=\"buttons\",\n            direction=\"left\",\n            buttons=list([\n                dict(\n                    args=[\"type\", \"scatter\"],\n                    label=\"Scatter Plot\",\n                    method=\"restyle\"\n                ),\n                dict(\n                    args=[\"type\", \"bar\"],\n                    label=\"Bar Chart\",\n                    method=\"restyle\"\n                )\n            ]),\n        ),\n    ]\n)\n\nplot.show()"
        }
      },
      {
        "title": "3. Creating Sliders and Selectors to the Plot",
        "content": "In Plotly, the range slider is an input control that allows users to select a value range between a specified minimum and maximum. It allows selecting pre-configured ranges and manually inputting minimum and maximum values or dates.\n\n**Example:**\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Creating Sliders and Selectors to the Plot",
          "snippet": "import plotly.graph_objects as go\nimport plotly.express as px\n\ndf = px.data.tips()\n\nfig = go.Figure()\n\nfig.add_trace(go.Scatter(\n    x=df['total_bill'],\n    y=df['tip'],\n    mode='markers'\n))\n\nfig.update_layout(\n    xaxis=dict(\n        rangeslider=dict(visible=True),\n        rangeselector=dict(\n            buttons=list([\n                dict(count=1, step=\"day\", stepmode=\"backward\"),\n                dict(step=\"all\")\n            ])\n        )\n    )\n)\n\nfig.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Interactive Plots with Plotly",
      "initialCode": "import plotly.express as px\n\nfig = px.line(x=[1, 2], y=[3, 4])\n\nprint(fig)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-plotly-guide.py ...",
        "[INFO] Loaded module for: Interactive Plots with Plotly",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Interactive Plots with Plotly?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Interactive Plots with Plotly workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Interactive Plots with Plotly is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-scikit-learn": {
    "id": "ds-scikit-learn",
    "badge": "Module 1 • Data Science",
    "readingTime": "20 min read",
    "level": "Beginner",
    "title": "Model Building with Scikit-Learn",
    "subtitle": "In-depth guide to Model Building with Scikit-Learn — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Scikit-learn is an open-source Python library that simplifies the process of building machine learning models. It offers a clean and consistent interface that helps both beginners and experienced users work efficiently.\n\n- Supports tasks like classification, regression, clustering and preprocessing\n- Makes model building fast and reliable\n- Provides ready-to-use tools for training and evaluation\n- Reduces complexity by avoiding manual implementation of algorithms",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Model Building with Scikit-Learn."
        }
      },
      {
        "title": "2. Installing and Using Scikit-learn",
        "content": "Before we start building models we need to install** Scikit-learn.** It requires Python 3.8 or newer and depends on two important libraries: NumPy and SciPy. Make sure these are installed first.\n\nTo install Scikit-learn run the following command:\n\npip install -U scikit-learn\n\nThis will download and install the latest version of Scikit-learn along with its dependencies. Lets see various steps involved in the process of building Model using Scikit-learn library."
      },
      {
        "title": "3. Step 1: Loading a Dataset",
        "content": "A dataset consists of:\n\n- **Features (X):** Input variables that describe the data\n- **Target (y): **The value we want to predictScikit-learn provides built-in datasets like Iris, Digits and Boston Housing. Using the Iris dataset:\n\n- load_iris() loads the data\n- X stores feature data\n- y stores target labels\n- feature_names and target_names give descriptive namesWe can inspect the first few rows to understand the structure. For custom datasets, Pandas is commonly used to load external files such as CSVs.\n\n`\n`\n**Output: **\n\nLoading datasetSometimes we need to work on our own custom data then we load an external dataset. For this we can use the pandas library for easy loading and manipulating datasets.\n\nFor this you can refer to our article on How to import csv file in pandas?",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Step 1: Loading a Dataset",
          "snippet": "from sklearn.datasets import load_iris \niris = load_iris() \n\nX = iris.data \ny = iris.target \n  \nfeature_names = iris.feature_names \ntarget_names = iris.target_names \n  \nprint(\"Feature names:\", feature_names) \nprint(\"Target names:\", target_names) \n\nprint(\"\\nType of X is:\", type(X)) \n\nprint(\"\\nFirst 5 rows of X:\\n\", X[:5])"
        }
      },
      {
        "title": "4. Step 2: Splitting the Dataset",
        "content": "To evaluate a model fairly, we split data into:\n\n- Training set: Used to train the model\n- Testing set: Used to evaluate how well the model generalizesUsing train_test_split, we split the Iris dataset so that 60% is for training and 40% for testing (test_size=0.4). random_state=1 ensures reproducibility.\n\nAfter splitting, we get:\n\n- X_train, y_train -> Training data\n- X_test, y_test -> Testing dataChecking the shapes ensures the data is split correctly.\n\n`\n`\nNow lets check the **Shapes **of the Splitted Data to ensures that both sets have correct proportions of data avoiding any potential errors in model evaluation or training.\n\n`\n`\n**Output:**\n\nShape of Splitted Data",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Step 2: Splitting the Dataset",
          "snippet": "from sklearn.model_selection import train_test_split\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4, random_state=1)"
        }
      },
      {
        "title": "5. Step 3: Handling Categorical Data",
        "content": "Machine learning algorithms work with numerical inputs, so categorical (text) data must be converted into numbers. If not encoded properly, models can misinterpret categories. Scikit-learn provides multiple encoding methods:\n\n**1. ****Label Encoding**: It converts each category into a unique integer. For example in a column with categories like 'cat', 'dog' and 'bird', it would convert them to 0, 1 and 2 respectively. This method works well when the categories have a meaningful order such as “Low”, “Medium” and “High”.\n\n- **LabelEncoder():** It is initialized to create an encoder object that will convert categorical values into numerical labels.\n- **fit_transform(): **This method first fits the encoder to the categorical data and then transforms the categories into corresponding numeric labels.\n\n`\n`\n**Output:**\n\n**Encoded feature: [1 2 2 1 0]\n\n2. ****One-Hot Encoding**: One-Hot Encoding creates separate binary columns for each category. This is useful when categories do not have any natural ordering. Example: cat, dog, bird -> 3 new columns (cat/dog/bird) with 1s and 0s.\n\n- Input must be reshaped into a 2D array\n- OneHotEncoder(sparse_output=False) generates binary columns\n\n`\n`\n**Output:**\n\nBesides Label Encoding and One-Hot Encoding there are other techniques like Mean Encoding.",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Step 3: Handling Categorical Data",
          "snippet": "from sklearn.preprocessing import LabelEncoder\n\ncategorical_feature = ['cat', 'dog', 'dog', 'cat', 'bird']\n\nencoder = LabelEncoder()\n\nencoded_feature = encoder.fit_transform(categorical_feature)\n\nprint(\"Encoded feature:\", encoded_feature)"
        }
      },
      {
        "title": "6. Step 4: Training the Model",
        "content": "Now that our data is ready, it’s time to train a machine learning model. Scikit-learn has many algorithms with a consistent interface for training, prediction and evaluation. Here we’ll use Logistic Regression as an example.\n\n**Note**: We will not go into the details of how the algorithm works as we are interested in understanding its implementation only.\n\n- **log_reg = LogisticRegression(max_iter=200): **Creating a logistic regression classifier object.\n- **log_reg.fit(X_train, y_train): **Using this** **the logistic regression model adjusts the model’s parameters to best fit the data.\n\n`\n`\nTraining Using Logistic Regression.",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Step 4: Training the Model",
          "snippet": "from sklearn.linear_model import LogisticRegression\nlog_reg = LogisticRegression(max_iter=200)\nlog_reg.fit(X_train, y_train)"
        }
      },
      {
        "title": "7. Step 5: Make Predictions",
        "content": "Once trained we use the model to make predictions on the test data X_test by calling the predict method. This returns predicted labels y_pred.\n\n- ** log_reg.predict:** It uses trained logistic regression model to predict labels for the test data X_test.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Step 5: Make Predictions",
          "snippet": "y_pred = log_reg.predict(X_test)"
        }
      },
      {
        "title": "8. Step 6: Evaluating Model Accuracy",
        "content": "Check how well our model is performing by comparing y_test and y_pred. Here we are using the metrics module's method accuracy_score.\n\n`\n`\n**Output:**\n\n**Logistic Regression model accuracy: 0.9666666666666667\n\nNow we want our model to make predictions on new sample data. Then the sample input can simply be passed in the same way as we pass any feature matrix. Here we used it as sample = [[3, 5, 4, 2], [2, 3, 5, 4]]\n\n`\n`\nOutput: **\n\nPredictions: [np.str_('virginica'), np.str_('virginica')]",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Step 6: Evaluating Model Accuracy",
          "snippet": "from sklearn import metrics\nprint(\"Logistic Regression model accuracy:\", metrics.accuracy_score(y_test, y_pred))"
        }
      },
      {
        "title": "9. Features of Scikit-learn",
        "content": "Scikit-learn is used because it makes building machine learning models straightforward and efficient. Here are some important reasons:\n\n- **Ready-to-Use Tools**: It provides built-in functions for common tasks like data preprocessing, training models and making predictions. This saves time by avoiding the need to code algorithms from scratch.\n- **Easy Model Evaluation**: With tools like cross-validation and performance metrics it helps to measure how well our model works and identify areas for improvement.\n- **Wide Algorithm Support**: It offers many popular machine learning algorithms including classification, regression and clustering which gives us flexibility to choose the right model for our problem.\n- **Smooth Integration**: Built on top of important Python libraries like NumPy and SciPy so it fits into our existing data analysis workflow.\n- **Simple and Consistent Interface**: The same straightforward syntax works across different models helps in making it easier to learn and switch between algorithms.\n- **Model Tuning Made Easy**: Tools like grid search help us fine-tune our model’s settings to improve accuracy without extra hassle."
      },
      {
        "title": "10. Benefits of using Scikit-learn",
        "content": "- **User-Friendly**: Scikit-learn’s consistent and simple interface makes it accessible for beginners and best for experts.\n- **Time-Saving: **Pre-built tools and algorithms reduce development time which allows us to focus more on solving problems than coding details.\n- **Better Model Performance**: Easy-to-use tuning and evaluation tools helps in improving model accuracy and reliability.\n- **Flexible and Scalable**: Supports a wide range of algorithms and integrates smoothly with other Python libraries helps in making it suitable for projects of any size.\n- **Strong Community Support**: A large, active community ensures regular updates, extensive documentation and plenty of resources to help when we get stuck.Comment"
      }
    ],
    "playground": {
      "title": "Python Lab: Model Building with Scikit-Learn",
      "initialCode": "from sklearn.datasets import load_iris \niris = load_iris() \n\nX = iris.data \ny = iris.target \n  \nfeature_names = iris.feature_names \ntarget_names = iris.target_names \n  \nprint(\"Feature names:\", feature_names) \nprint(\"Target names:\", target_names) \n\nprint(\"\\nType of X is:\", type(X)) \n\nprint(\"\\nFirst 5 rows of X:\\n\", X[:5])",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-scikit-learn.py ...",
        "[INFO] Loaded module for: Model Building with Scikit-Learn",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Model Building with Scikit-Learn?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Model Building with Scikit-Learn workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Model Building with Scikit-Learn is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-read-csv": {
    "id": "ds-read-csv",
    "badge": "Module 2 • Data Science",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "Reading CSV Files with Pandas",
    "subtitle": "In-depth guide to Reading CSV Files with Pandas — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- CSV files are Comma-Separated values files that allow storage of tabular data.\n\n- To access data from the CSV file, we require a function read_csv() from Pandas that retrieves data in the form of the data frame.\n- First, we must import the Pandas library, then using Pandas load this data into a DataFrameIn the code below, we are working with a CSV file named people.csv which contains people data.\n\nPYTHON\n\n`\n`\n**Output**\n\nPandas Read CSV in Python",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import pandas as pd\n\ndf = pd.read_csv(\"people.csv\")\ndf"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Reading CSV Files with Pandas."
        }
      },
      {
        "title": "2. read_csv() function",
        "content": "read_csv() function in Pandas is used to read data from CSV files into a Pandas DataFrame. A DataFrame is a data structure that allows you to manipulate and analyze tabular data efficiently. CSV files are plain-text files where each row represents a record and columns are separated by commas (or other delimiters)."
      },
      {
        "title": "3. Syntax",
        "content": "**pd.read_csv(filepath_or_buffer, sep=' ,' , header='infer',  index_col=None, usecols=None, engine=None, skiprows=None, nrows=None)\n\nParameters**there are no **:**\n\n- **filepath_or_buffer:** Location of the csv file. It accepts any string path or URL of the file.\n- **sep**: It stands for separator, default is ', '.\n- **header**: It accepts int, a list of int, row numbers to use as the column names and the start of the data. If no names are passed, i.e., header=None, then, it will display the first column as 0, the second as 1 and so on.\n- **usecols**: Retrieves only selected columns from the CSV file.\n- **nrows**: Number of rows to be displayed from the dataset.\n- **index_col: **If set to None, Pandas automatically assigns a default integer index (0, 1, 2, ...) to the dataset.\n- **skiprows**: Skips passed rows in the new data frame."
      },
      {
        "title": "1. Read specific columns using read_csv",
        "content": "The usecols parameter allows to load only specific columns from a CSV file. This reduces memory usage and processing time by importing only the required data.\n\n`\n`\n**Output**\n\nspecific columns using read_csv",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Read specific columns using read_csv",
          "snippet": "df = pd.read_csv(\"people.csv\", usecols=[\"First Name\", \"Email\"])\nprint(df)"
        }
      },
      {
        "title": "2. Setting an Index Column (index_col)",
        "content": "The index_col parameter sets one or more columns as the DataFrame index, making the specified column(s) act as row labels for easier data referencing.\n\n`\n`\n**Output**\n\nRead CSV in Python",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Setting an Index Column (index_col)",
          "snippet": "df = pd.read_csv(\"people.csv\", index_col=\"First Name\")\nprint(df)"
        }
      },
      {
        "title": "3. Handling Missing Values Using read_csv",
        "content": "The na_values parameter replaces specified strings (e.g., \"N/A\", \"Unknown\") with NaN, enabling consistent handling of missing or incomplete data during analysis.\\\n\n`\n`\nna_values only specifies which values should be treated as NaN; it does not guarantee that the dataset has no missing values.",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Handling Missing Values Using read_csv",
          "snippet": "df = pd.read_csv(\"people.csv\", na_values=[\"N/A\", \"Unknown\"])"
        }
      },
      {
        "title": "4. Reading CSV Files with Different Delimiters",
        "content": "In this example, we will take a CSV file and then add some special characters to see how the sepparameter works.\n\n`\n`\n**Output**\nThe sample data is stored in a multi-line string for demonstration purposes.\n\n- **Separator (****`sep**`**)**: The sep='[:, |_]' argument allows Pandas to handle multiple delimiters (:, |, _, ,) using a regular expression.\n- **Engine**: The engine='python' argument is used because the default C engine does not support regular expressions for delimiters.\n\n`\n`\n**Output**\n\nCSV Files with Different Delimiters",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Reading CSV Files with Different Delimiters",
          "snippet": "import pandas as pd\n\ndata = \"\"\"totalbill_tip, sex:smoker, day_time, size\n16.99, 1.01:Female|No, Sun, Dinner, 2\n10.34, 1.66, Male, No|Sun:Dinner, 3\n21.01:3.5_Male, No:Sun, Dinner, 3\n23.68, 3.31, Male|No, Sun_Dinner, 2\n24.59:3.61, Female_No, Sun, Dinner, 4\n25.29, 4.71|Male, No:Sun, Dinner, 4\"\"\"\n\nwith open(\"sample.csv\", \"w\") as file:\n    file.write(data)\nprint(data)"
        }
      },
      {
        "title": "5. Using nrows in read_csv()",
        "content": "The nrows parameter limits the number of rows read from a file, enabling quick previews or partial data loading for large datasets. Here, we just display only 3 rows using nrows parameter.\n\n`\n`\n**Output**\n\nData after using nrows",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Using nrows in read_csv()",
          "snippet": "df = pd.read_csv('people.csv', nrows=3)\ndf"
        }
      },
      {
        "title": "6. Using skiprows in read_csv()",
        "content": "The skiprows parameter skips unnecessary rows at the start of a file, which is useful for ignoring metadata or extra headers that are not part of the dataset.\n\n`\n`\n**Output**\n\nData after using skiprows",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Using skiprows in read_csv()",
          "snippet": "df= pd.read_csv(\"people.csv\")\nprint(\"Previous Dataset: \")\nprint(df)\n\ndf = pd.read_csv(\"people.csv\", skiprows = [4,5])\nprint(\"Dataset After skipping rows: \")\nprint(df)"
        }
      },
      {
        "title": "7. Parsing Dates (parse_dates)",
        "content": "The parse_dates parameter converts date columns into datetime objects, simplifying operations like filtering, sorting or time-based analysis.\n\n`\n`\n**Output**\n\nParsing Dates",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Parsing Dates (parse_dates)",
          "snippet": "df = pd.read_csv(\"people.csv\", parse_dates=[\"Date of birth\"])\nprint(df.info())"
        }
      },
      {
        "title": "11. Loading a CSV Data from a URL",
        "content": "Pandas allows you to directly read a CSV file hosted on the internet using the file's URL. This can be incredibly useful when working with datasets shared on websites, cloud storage or public repositories like GitHub.\n\n`\n`\n**Output**\n\nCSV Data from a URLComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 11. Loading a CSV Data from a URL",
          "snippet": "url = \"https://media.geeksforgeeks.org/wp-content/uploads/20241121154629307916/people_data.csv\"\ndf = pd.read_csv(url)\ndf"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Reading CSV Files with Pandas",
      "initialCode": "import pandas as pd\n\ndf = pd.read_csv(\"people.csv\")\ndf",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-read-csv.py ...",
        "[INFO] Loaded module for: Reading CSV Files with Pandas",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Reading CSV Files with Pandas?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Reading CSV Files with Pandas workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Reading CSV Files with Pandas is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-read-excel": {
    "id": "ds-read-excel",
    "badge": "Module 2 • Data Science",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Importing Excel Files into Pandas",
    "subtitle": "In-depth guide to Importing Excel Files into Pandas — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview of Reading Excel Files in Pandas",
        "content": "Pandas provides the powerful `pd.read_excel()` function to load Microsoft Excel spreadsheets (`.xlsx` and `.xls`) directly into a tabular `DataFrame`.\n\nUnder the hood, Pandas uses external engines such as **openpyxl** (for `.xlsx` files) and **xlrd** (for legacy `.xls` files) to parse workbook sheets, cell formatting, headers, and multi-index columns.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview of Reading Excel Files in Pandas",
          "snippet": "import pandas as pd\n\n# Read the first sheet of an Excel workbook\ndf = pd.read_excel('sales_data.xlsx')\nprint(df.head())"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Importing Excel Files into Pandas."
        }
      },
      {
        "title": "2. Specifying Sheet Names and Index Columns",
        "content": "Excel workbooks frequently contain multiple sheets. You can pass the `sheet_name` parameter as a string (sheet title), an integer (0-indexed sheet position), or `None` to load all sheets into a Python dictionary of DataFrames.\n\n- **`sheet_name='Q1_Revenue'`**: Loads a specific named sheet.\n- **`index_col=0`**: Uses the first column as the DataFrame row index.\n- **`usecols='A:D'`**: Reads only columns A through D to save memory.",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Specifying Sheet Names and Index Columns",
          "snippet": "import pandas as pd\n\n# Load a specific sheet and select columns\ndf_q1 = pd.read_excel(\n    'financials.xlsx',\n    sheet_name='Q1_Revenue',\n    index_col='Transaction_ID',\n    usecols=['Transaction_ID', 'Date', 'Region', 'Revenue']\n)\nprint(df_q1.info())"
        }
      },
      {
        "title": "3. Handling Missing Values and Skipping Rows",
        "content": "Real-world spreadsheets often include decorative headers, footnotes, or custom missing-value markers like `'N/A'` or `'-'`.\n\n- **`skiprows=2`**: Skips the first two rows before reading the table header.\n- **`na_values=['-', 'MISSING']`**: Converts custom strings into `np.nan` automatically.\n- **`dtype={'ZipCode': str}`**: Preserves leading zeros in identifier columns.",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Handling Missing Values and Skipping Rows",
          "snippet": "df_clean = pd.read_excel(\n    'customers.xlsx',\n    skiprows=2,\n    na_values=['-', 'NA', 'null'],\n    dtype={'Customer_ID': str, 'Balance': float}\n)\nprint(df_clean.isna().sum())"
        }
      },
      {
        "title": "4. Exporting DataFrames Back to Excel",
        "content": "After cleaning and analyzing your dataset, use `df.to_excel()` or `pd.ExcelWriter()` to write one or multiple DataFrames back to an `.xlsx` file without overwriting existing sheets.",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Exporting DataFrames Back to Excel",
          "snippet": "with pd.ExcelWriter('report_output.xlsx', engine='openpyxl') as writer:\n    df_q1.to_excel(writer, sheet_name='Cleaned_Q1', index=True)\n    df_q1.describe().to_excel(writer, sheet_name='Summary_Stats')"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Importing Excel Files into Pandas",
      "initialCode": "pip install pandas\r\npip install xlrd",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-read-excel.py ...",
        "[INFO] Loaded module for: Importing Excel Files into Pandas",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Importing Excel Files into Pandas?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Importing Excel Files into Pandas workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Importing Excel Files into Pandas is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-read-json": {
    "id": "ds-read-json",
    "badge": "Module 2 • Data Science",
    "readingTime": "8 min read",
    "level": "Intermediate",
    "title": "Parsing & Reading JSON Datasets",
    "subtitle": "In-depth guide to Parsing & Reading JSON Datasets — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- JSON (JavaScript Object Notation) store data using key-value pairs. Reading JSON files using Pandas is simple and helpful when you're working with data in .json format. There are mainly three methods to read Json file using Pandas Some of them are:\n\n- Using pd.read_json() Method\n- Using JSON Module and pd.json_normalize() Method\n- Using pd.Dataframe() Methods",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Parsing & Reading JSON Datasets."
        }
      },
      {
        "title": "1. Using pd.read_json() to Read JSON Files in Pandas",
        "content": "The pd.read_json() function helps to read JSON data directly into a DataFrame. This method is used when we working with standard JSON structures. If the file is located on a remote server we can also pass the URL instead of a local file path. Let’s say you have a file named data.json with the following content:\n\n**[\n\n{\"id\": 1, \"name\": \"Alice\", \"age\": 25},\n\n{\"id\": 2, \"name\": \"Bob\", \"age\": 30},\n\n{\"id\": 3, \"name\": \"Charlie\", \"age\": 22}\n\n]\n\nYou can read this JSON file using the code below:\n\n`\n`\nOutput:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Using pd.read_json() to Read JSON Files in Pandas",
          "snippet": "import pandas as pd\n\ndf = pd.read_json('data.json')\nprint(df.head())"
        }
      },
      {
        "title": "2. Using json Module and pd.json_normalize() method",
        "content": "`Th`e json_normalize() is used when we are working with nested JSON structues. JSON from APIs often comes in nested form and this method helps to **flatten** it into a tabular format that’s easier to work with in Pandas. This method is helpful when working with real-world JSON responses from APIs.\n\n`\n`\n**Output: **",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Using json Module and pd.json_normalize() method",
          "snippet": "import pandas as pd\nimport json\n\ndata = {\"One\": {\"0\": 60, \"1\": 60, \"2\": 60, \"3\": 45, \"4\": 45, \"5\": 60},\n        \"Two\": {\"0\": 110, \"1\": 117, \"2\": 103, \"3\": 109, \"4\": 117, \"5\": 102}}\n\njson_data = json.dumps(data)\n\ndf_normalize = pd.json_normalize(json.loads(json_data))\nprint(\"\\nDataFrame using JSON module and `pd.json_normalize()` method:\")\ndf_normalize"
        }
      },
      {
        "title": "3. Using pd.DataFrame with a Dictionary",
        "content": "If JSON data is stored as a dictionary we can directly use pd.DataFrame() convert it into a structured DataFrame. This is helpful when you are working with pre-loaded or manually created JSON data in memory.\n\n`\n`\n**Output: **\n\nThese methods help you to use JSON data into Pandas for analysis and visualization. With just a few lines of code you can turn raw JSON into a clean and usable DataFrame.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Using pd.DataFrame with a Dictionary",
          "snippet": "import pandas as pd\n\ndf = pd.DataFrame(data)\n\nprint(df)"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Parsing & Reading JSON Datasets",
      "initialCode": "import pandas as pd\n\ndf = pd.read_json('data.json')\nprint(df.head())",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-read-json.py ...",
        "[INFO] Loaded module for: Parsing & Reading JSON Datasets",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Parsing & Reading JSON Datasets?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Parsing & Reading JSON Datasets workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Parsing & Reading JSON Datasets is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-read-sql": {
    "id": "ds-read-sql",
    "badge": "Module 2 • Data Science",
    "readingTime": "6 min read",
    "level": "Intermediate",
    "title": "Reading SQL Databases with SQLAlchemy",
    "subtitle": "In-depth guide to Reading SQL Databases with SQLAlchemy — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- read_sql_table() is a Pandas function used to load an entire SQL database table into a Pandas DataFrame using SQLAlchemy. It allows you to access table data in Python by providing only the table name and database connection, without writing any SQL query.\n\n**Example:** This example creates a small SQLite database, inserts data into a table and then reads that table into a Pandas DataFrame.\n\n`\n`\n**Output**\n\nsnapshot of the terminal**Explanation:**\n\n- **create_engine(\"sqlite:///data.db\")** creates a connection to the SQLite database file.\n- **db.begin()** opens a transaction so that inserted data is saved (committed).\n- **con.execute(text(\"CREATE TABLE...\"))** creates the users table if it does not exist.\n- **con.execute(text(\"INSERT INTO users...\")) **adds two rows into the users table.\n- **pd.read_sql_table(\"users\", db)** reads the full users table into a DataFrame.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import pandas as pd\nfrom sqlalchemy import create_engine, text\n\ndb = create_engine(\"sqlite:///data.db\")\n\nwith db.begin() as con:\n    con.execute(text(\"CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)\"))\n    con.execute(text(\"DELETE FROM users\"))  # avoid duplicates\n    con.execute(text(\"INSERT INTO users VALUES (1,'John'),(2,'Emma')\"))\n\ndf = pd.read_sql_table(\"users\", db)\nprint(df)"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Reading SQL Databases with SQLAlchemy."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**pd.read_sql_table(table_name, con, schema=None, index_col=None, coerce_float=True, parse_dates=None, columns=None, chunksize=None)\n\nParameters:**\n\n- **table_name:** name of the SQL table to read\n- **con:** SQLAlchemy engine or connection\n- **schema (optional):** database schema\n- **index_col: **column(s) to use as index\n- **coerce_float:** convert numeric-like values to float\n- **parse_dates:** columns to convert to datetime\n- **columns:** columns to select\n- **chunksize:** rows per chunk"
      },
      {
        "title": "3. Examples",
        "content": "**Example 1: **This program creates a contacts table, inserts two records, and loads the table into a Pandas DataFrame.\n\npython\n\n`\n`\n**Output**:\n\nOutput**Explanation:** pd.read_sql_table(\"contacts\", db) loads all rows from the contacts table into the DataFrame df.\n\n**Example 2: **This program stores student records in a database and reads them into a DataFrame.\n\npython\n\n`\n`\n**Output:**\n\nOutput**Explanation:** pd.read_sql_table(\"students\", db) reads the full students table and stores it in df.\n\n**Example 3: **This example creates an employee table and retrieves it using read_sql_table().\n\npython\n\n`\n`\n**Output:**\n\nOutput**Explanation:** pd.read_sql_table(\"employee\", db) fetches the entire employee table and stores it in df.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Examples",
          "snippet": "import pandas as pd\nfrom sqlalchemy import create_engine, text\n\ndb = create_engine(\"sqlite:///contacts.db\")\n\nwith db.begin() as con:\n    con.execute(text(\"CREATE TABLE IF NOT EXISTS contacts (id INTEGER, name TEXT, email TEXT)\"))\n    con.execute(text(\"INSERT INTO contacts VALUES (1,'Liam','liam@gmail.com'),(2,'Sophia','sophia@gmail.com')\"))\n\ndf = pd.read_sql_table(\"contacts\", db)\nprint(df)"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Reading SQL Databases with SQLAlchemy",
      "initialCode": "import pandas as pd\nfrom sqlalchemy import create_engine, text\n\ndb = create_engine(\"sqlite:///data.db\")\n\nwith db.begin() as con:\n    con.execute(text(\"CREATE TABLE IF NOT EXISTS users (id INTEGER, name TEXT)\"))\n    con.execute(text(\"DELETE FROM users\"))  # avoid duplicates\n    con.execute(text(\"INSERT INTO users VALUES (1,'John'),(2,'Emma')\"))\n\ndf = pd.read_sql_table(\"users\", db)\nprint(df)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-read-sql.py ...",
        "[INFO] Loaded module for: Reading SQL Databases with SQLAlchemy",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Reading SQL Databases with SQLAlchemy?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Reading SQL Databases with SQLAlchemy workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Reading SQL Databases with SQLAlchemy is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-web-scraping": {
    "id": "ds-web-scraping",
    "badge": "Module 2 • Data Science",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "Web Scraping with BeautifulSoup",
    "subtitle": "In-depth guide to Web Scraping with BeautifulSoup — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- BeautifulSoup is a Python library used for web scraping. It helps parse HTML and XML documents making it easy to navigate and extract specific parts of a webpage. This article explains the steps of web scraping using BeautifulSoup.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Web Scraping with BeautifulSoup."
        }
      },
      {
        "title": "2. Steps involved in web scraping",
        "content": "- **Send an HTTP Request:** Use the **requests **library to send a request to the webpage URL and get the HTML content in response.\n- **Parse the HTML Content:** Use a parser like **html.parser** or **html5lib** to convert the raw HTML into a structured format (parse tree).\n- **Extract Data:** Use **BeautifulSoup** to navigate the parse tree and extract the required data using tags, classes, or IDs.Now, let’s go through the web scraping process step by step.\n\nBefore starting with the steps, make sure to install all the necessary libraries. Run the following commands on command prompt or terminal using pip:\n\npip install requests\npip install beautifulsoup4"
      },
      {
        "title": "3. Step 1: Fetch HTML Content",
        "content": "The first step in web scraping is to send an HTTP request to the target webpage and fetch its raw HTML content. This is done using **requests **library.\n\n`\n`\n**Explanation:**\n\n- **GET **request is sent to the URL using **requests **library.\n- **.text** attribute of the response object returns HTML content of the page as a **string**.**Note:** If you're facing issues like \"403 Forbidden\" try adding a browser user agent like below. You can find your user agent online based on device and browser.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Step 1: Fetch HTML Content",
          "snippet": "import requests\n\nurl = \"https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/\"\nresponse = requests.get(url)\nprint(response.text)"
        }
      },
      {
        "title": "4. Step 2: Parse HTML with BeautifulSoup",
        "content": "Now that we have raw HTML, the next step is to parse it using BeautifulSoup so we can easily navigate and extract specific parts of the content.\n\n`\n`\n**Explanation:**\n\n- Passing raw HTML to BeautifulSoup to create a parsed tree structure.\n- **html.parser** is Python's built-in HTML parser.**Note: **BeautifulSoup supports different parsers like html.parser, lxml and html5lib. Choose one by specifying it as the second argument.\nFor Example: soup = BeautifulSoup(response.text, 'html5lib')",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Step 2: Parse HTML with BeautifulSoup",
          "snippet": "from bs4 import BeautifulSoup\n\nsoup = BeautifulSoup(response.text, 'html.parser')\nprint(soup.prettify())  # prints well-formatted HTML"
        }
      },
      {
        "title": "5. Step 3: Extract Specific Data",
        "content": "Now that the HTML is parsed, specific elements like text, links or images can be extracted by targeting tags and classes using BeautifulSoup methods like **.find()** or **.find_all().**\n\nSuppose we want to extract quotes from a website then we will do:\n\n`\n`\n**Explanation:**\n\n- **soup.find_all():** locates all quote containers based on their class.\n- For each quote box **box.img['alt']** gives text containing quote lines and author and **split(\" #\")** separates the quote from the author.\n- A dictionary is created with theme, image_url, lines and author.\n- Extracts quotes into a list of dictionaries and prints the first 5 for brevity.",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Step 3: Extract Specific Data",
          "snippet": "import requests\nfrom bs4 import BeautifulSoup\nurl = \"https://www.passiton.com/inspirational-quotes\"\nresponse = requests.get(url)\nsoup = BeautifulSoup(response.text, 'html.parser')\nquotes = []\nquote_boxes = soup.find_all('div', class_='col-6 col-lg-3 text-center margin-30px-bottom sm-margin-30px-top')\nfor box in quote_boxes:\n    quote_text = box.img['alt'].split(\" #\")\n    quote = {\n        'theme': box.h5.text.strip(),\n        'image_url': box.img['src'],\n        'lines': quote_text[0],\n        'author': quote_text[1] if len(quote_text) > 1 else 'Unknown'\n    }\n    quotes.append(quote)\n# Display extracted quotes\nfor q in quotes[:5]:  # print only first 5 for brevity\n    print(q)"
        }
      },
      {
        "title": "6. Understanding the HTML Structure",
        "content": "Before extracting data, it’s helpful to inspect the HTML structure using **soup.prettify() **to** **find out where the information is written in the code of the page.\n\n**For example:** quotes is inside a **<div>** with a specific **id **or **class, **we can find it using:\n\n**container = soup.find('div', attrs={'id': 'all_quotes'})\n\nfind() **gets the first** <div> **that has** id=\"all_quotes\".**\n\nIf there are multiple quote boxes inside that section, we can use:\n\ncontainer.find_all()"
      },
      {
        "title": "7. Step 4: Save Data to CSV",
        "content": "Now that the data is extracted, it can be saved into a CSV file for easy storage and future use. Python’s built-in csv module is used to write the data in a structured format.\n\n`\n`\n**Explanation:**\n\n- **with open()** statement creates a new CSV file (quotes.csv) in write mode with UTF-8 encoding.\n- **csv.DictWriter()** sets up a writer object to write dictionaries to the file using specified column headers.\n- **writer.writeheader() **writes the header row to the CSV using the defined field names.\n- for loop writes each quote dictionary as a row in the CSV using **writer.writerow(quote)**This script scrapes inspirational quotes from the website, parses the HTML content, extracts relevant information and saves the data to a **quotes.csv** file for later use.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Step 4: Save Data to CSV",
          "snippet": "import csv\n\nfilename = \"quotes.csv\"\nwith open(filename, mode='w', newline='', encoding='utf-8') as file:\n    writer = csv.DictWriter(file, fieldnames=['theme', 'image_url', 'lines', 'author'])\n    writer.writeheader()\n    for quote in quotes:\n        writer.writerow(quote)"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Web Scraping with BeautifulSoup",
      "initialCode": "import requests\n\nurl = \"https://www.geeksforgeeks.org/dsa/dsa-tutorial-learn-data-structures-and-algorithms/\"\nresponse = requests.get(url)\nprint(response.text)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-web-scraping.py ...",
        "[INFO] Loaded module for: Web Scraping with BeautifulSoup",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Web Scraping with BeautifulSoup?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Web Scraping with BeautifulSoup workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Web Scraping with BeautifulSoup is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-data-preprocessing": {
    "id": "ds-data-preprocessing",
    "badge": "Module 3 • Data Science",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "Data Preprocessing in Python",
    "subtitle": "In-depth guide to Data Preprocessing in Python — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Data preprocessing is the first step in any data analysis or machine learning pipeline. It involves cleaning, transforming and organizing raw data to ensure it is accurate, consistent and ready for modeling. It has a big impact on model building such as:\n\n- Clean and well-structured data allows models to learn meaningful patterns rather than noise.\n- Properly processed data prevents misleading inputs, leading to more reliable predictions.\n- Organized data makes it simpler to create useful inputs for the model, enhancing model performance.\n- Organized data supports better Exploratory Data Analysis (EDA), making patterns and trends more interpretable.Data Preprocessing",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Data Preprocessing in Python."
        }
      },
      {
        "title": "2. Steps-by-Step implementation",
        "content": "Let's implement various preprocessing features,"
      },
      {
        "title": "3. Step 1: Import Libraries and Load Dataset",
        "content": "We prepare the environment with libraries like pandas, numpy, scikit learn, matplotlib and seaborn for data manipulation, numerical operations, visualization and scaling. Load the dataset for preprocessing.\n\n**The sample dataset can be downloaded from here.\n\n`\n`\nOutput:**\n\nDataset",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Step 1: Import Libraries and Load Dataset",
          "snippet": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import MinMaxScaler, StandardScaler\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('Geeksforgeeks/Data/diabetes.csv')\ndf.head()"
        }
      },
      {
        "title": "4. Step 2: Inspect Data Structure and Check Missing Values",
        "content": "We understand dataset size, data types and identify any incomplete (missing) data that needs handling.\n\n- **df.info():** Prints concise summary including count of non-null entries and data type of each column.\n- **df.isnull().sum(): **Returns the number of missing values per column.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Step 2: Inspect Data Structure and Check Missing Values",
          "snippet": "df.info()\nprint(df.isnull().sum())"
        }
      },
      {
        "title": "5. Step 3: Statistical Summary and Visualizing Outliers",
        "content": "Get numeric summaries like mean, median, min/max and detect unusual points (outliers). Outliers can skew models if not handled.\n\n- **df.describe():** Computes count, mean, std deviation, min/max and quartiles for numerical columns.\n- **Boxplots:** Visualize spread and detect outliers using matplotlib’s boxplot().\n\n`\n`\n**Output: **\n\nBoxplot",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Step 3: Statistical Summary and Visualizing Outliers",
          "snippet": "df.describe()\n\nfig, axs = plt.subplots(len(df.columns), 1, figsize=(7, 18), dpi=95)\nfor i, col in enumerate(df.columns):\n    axs[i].boxplot(df[col], vert=False)\n    axs[i].set_ylabel(col)\nplt.tight_layout()\nplt.show()"
        }
      },
      {
        "title": "6. Step 4: Remove Outliers Using the Interquartile Range (IQR) Method",
        "content": "Remove extreme values beyond a reasonable range to improve model robustness.\n\n- IQR = Q3 (75th percentile) – Q1 (25th percentile).\n- Values below Q1 - 1.5IQR or above Q3 + 1.5IQR are outliers.\n- Calculate lower and upper bounds for each column separately.\n- Filter data points to keep only those within bounds.\n\n`\n`\n**Note:** In practice, outlier removal should be applied across all relevant numerical columns to ensure consistent preprocessing.",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Step 4: Remove Outliers Using the Interquartile Range (IQR) Method",
          "snippet": "q1, q3 = np.percentile(df['Insulin'], [25, 75])\niqr = q3 - q1\nlower = q1 - 1.5 * iqr\nupper = q3 + 1.5 * iqr\nclean_df = df[(df['Insulin'] >= lower) & (df['Insulin'] <= upper)]"
        }
      },
      {
        "title": "7. Step 5: Correlation Analysis",
        "content": "Understand relationships between features and the target variable (Outcome). Correlation helps gauge feature importance.\n\n- **df.corr():** Computes pairwise correlation coefficients between columns.\n- Heatmap via seaborn visualizes correlation matrix clearly.\n- Sorting correlations with corr['Outcome'].sort_values() highlights features most correlated with the target.\n\n`\n`\n**Output: **",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Step 5: Correlation Analysis",
          "snippet": "corr = df.corr()\nplt.figure(dpi=130)\nsns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm')\nplt.show()\n\nprint(corr['Outcome'].sort_values(ascending=False))"
        }
      },
      {
        "title": "8. Step 6: Visualize Target Variable Distribution",
        "content": "Check if target classes (Diabetes vs Not Diabetes) are balanced, affecting model training and evaluation.\n\n- **plt.pie():** Pie chart to display proportion of each class in the target variable 'Outcome'.\n\n`\n`\n**Output: **\n\nResult",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Step 6: Visualize Target Variable Distribution",
          "snippet": "plt.pie(clean_df['Outcome'].value_counts(),\n        labels=['Diabetes', 'Not Diabetes'],\n        autopct='%.f%%', shadow=True)\nplt.title('Outcome Proportionality')       \nplt.show()"
        }
      },
      {
        "title": "9. Step 7: Separate Features and Target Variable",
        "content": "Prepare independent variables (features) and dependent variable (target) separately for modeling.\n\n- **df.drop(columns=[...]): **Drops the target column from features.\n- Direct column selection df['Outcome'] selects target column.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Step 7: Separate Features and Target Variable",
          "snippet": "X = df.drop(columns=['Outcome'])\ny = df['Outcome']"
        }
      },
      {
        "title": "10. Step 8: Feature Scaling: Normalization and Standardization",
        "content": "Scale features to a common range or distribution, important for many ML algorithms sensitive to feature magnitudes.\n\n**1. Normalization (Min-Max Scaling):** Rescales features between 0 and 1. Good for algorithms like k-NN and neural networks.\n\n- **Class: **MinMaxScaler from sklearn.\n- **.fit_transform():** Learns min/max from data and applies scaling.\n\n`\n`\n**Output: **\n\nNormalization**2. Standardization:** Transforms features to have mean = 0 and standard deviation = 1, useful for normally distributed features.\n\n- **Class:** StandardScaler from sklearn.\n\n`\n`\n**Output:**\n\nStandardization",
        "code": {
          "language": "python",
          "caption": "Python Example — 10. Step 8: Feature Scaling: Normalization and Standardization",
          "snippet": "scaler = MinMaxScaler()\nX_normalized = scaler.fit_transform(X)\nprint(X_normalized[:5])"
        }
      },
      {
        "title": "11. Advantages",
        "content": "- Cleans and organizes raw data for better analysis.\n- Removes noise and irrelevant data, leading to more precise predictions.\n- Handles outliers and redundant features, which reduces overfitting.\n- Scaling data helps models train faster by reducing computation time.\n- Converts data into formats suitable for machine learning models.Comment"
      }
    ],
    "playground": {
      "title": "Python Lab: Data Preprocessing in Python",
      "initialCode": "import pandas as pd\nimport numpy as np\nfrom sklearn.preprocessing import MinMaxScaler, StandardScaler\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('Geeksforgeeks/Data/diabetes.csv')\ndf.head()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-data-preprocessing.py ...",
        "[INFO] Loaded module for: Data Preprocessing in Python",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Data Preprocessing in Python?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Data Preprocessing in Python workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Data Preprocessing in Python is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-missing-data": {
    "id": "ds-missing-data",
    "badge": "Module 3 • Data Science",
    "readingTime": "28 min read",
    "level": "Intermediate",
    "title": "Working with Missing Data in Pandas",
    "subtitle": "In-depth guide to Working with Missing Data in Pandas — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- In Pandas, missing data occurs when some values are missing or not collected properly and these missing values are represented as:\n\n- **None**: A Python object used to represent missing values in object-type arrays.\n- **NaN**: A special floating-point value from NumPy which is recognized by all systems that use IEEE floating-point standards.In this article we see how to detect, handle and fill missing values in a DataFrame to keep the data clean and ready for analysis.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Working with Missing Data in Pandas."
        }
      },
      {
        "title": "2. Checking Missing Values in Pandas",
        "content": "Pandas provides two important functions which help in detecting whether a value is NaN helpful in making data cleaning and preprocessing easier in a DataFrame or Series are given below :"
      },
      {
        "title": "1. Using isnull()",
        "content": "**isnull()** returns a DataFrame of Boolean value where True represents missing data (NaN). This is simple if we want to find and fill missing data in a dataset.\n\n**Example 1: Finding Missing Values in a DataFrame**\n\nWe will be using Numpy and Pandas libraries for this implementation**.**\n\n`\n`\n**Output:**\n\n**Example 2: Filtering Data Based on Missing Values**\n\nHere we used random Employee dataset. The isnull() function is used over the \"Gender\" column in order to filter and print out rows containing missing gender data.\n\n**You can download the csv file from here\n\n`\n`\nOutput:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Using isnull()",
          "snippet": "import pandas as pd\nimport numpy as np\n\nd = {'First Score': [100, 90, np.nan, 95],\n        'Second Score': [30, 45, 56, np.nan],\n        'Third Score': [np.nan, 40, 80, 98]}\ndf = pd.DataFrame(d)\n\nmv = df.isnull()\n\nprint(mv)"
        }
      },
      {
        "title": "2. Using isna()",
        "content": "isna() returns a DataFrame of Boolean values where True indicates missing data (NaN). It is used to detect missing values just like isnull().\n\nExample: Finding Missing Values in a DataFrame\n\n`\n`\n**Output:**\n\nUsing isna()",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Using isna()",
          "snippet": "import pandas as pd\nimport numpy as np\n\ndata = {'Name': ['Amit', 'Sita', np.nan, 'Raj'],\n        'Age': [25, np.nan, 22, 28]}\n\ndf = pd.DataFrame(data)\n\n# Check for missing values using isna()\nprint(df.isna())"
        }
      },
      {
        "title": "3. Checking for Non-Missing Values Using notnull()",
        "content": "**notnull()** function returns a DataFrame with Boolean values where True indicates non-missing (valid) data. This function is useful when we want to focus only on the rows that have valid, non-missing values.\n\n**Example 1: Identifying Non-Missing Values in a DataFrame**\n\n`\n`\n**Output:**\n\n**Example 2: Filtering Data with Non-Missing Values**\n\nnotnull()** **function is used over the \"Gender\" column in order to filter and print out rows containing missing gender data.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Checking for Non-Missing Values Using notnull()",
          "snippet": "import pandas as pd\nimport numpy as np\n\nd = {'First Score': [100, 90, np.nan, 95],\n        'Second Score': [30, 45, 56, np.nan],\n        'Third Score': [np.nan, 40, 80, 98]}\ndf = pd.DataFrame(d)\n\nnmv = df.notnull()\n\nprint(nmv)"
        }
      },
      {
        "title": "6. Filling Missing Values in Pandas",
        "content": "Following functions allow us to replace missing values with a specified value or use interpolation methods to find the missing data."
      },
      {
        "title": "1. Using fillna()",
        "content": "**fillna()** used to replace missing values (NaN) with a given value. Lets see various example for this.\n\n**Example 1: Fill Missing Values with Zero**\n\n`\n`\n**Output:**\n\n**Example 2: Fill with Previous Value (Forward Fill)**\n\nThe pad method is used to fill missing values with the previous value.\n\n`\n`\n**Output:**\n\n**Example 3: Fill with Next Value (Backward Fill)**\n\nThe bfill function is used** **to fill it with the next value.\n\n`\n`\n**Output:**\n\n**Example 4: Fill NaN Values with 'No Gender'**\n\n`\n`\n**Output:**\n\nNow we are going to fill all the null values in Gender column with \"No Gender\"\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Using fillna()",
          "snippet": "import pandas as pd\nimport numpy as np\n\nd = {'First Score': [100, 90, np.nan, 95],\n        'Second Score': [30, 45, 56, np.nan],\n        'Third Score': [np.nan, 40, 80, 98]}\ndf = pd.DataFrame(d)\n\ndf.fillna(0)"
        }
      },
      {
        "title": "2. Using replace()",
        "content": "Use** ****replace()**** **function to replace NaN values with a specific value.\n\n**Example**\n\n`\n`\n**Output:**\n\nNow, we are going to replace the all NaN value in the data frame with -99 value.\n\n`\n`\n**Output**:",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Using replace()",
          "snippet": "import pandas as pd\nimport numpy as np\n\ndata = pd.read_csv(\"/content/employees.csv\")\ndata[10:25]"
        }
      },
      {
        "title": "3. Using interpolate()",
        "content": "The** ****interpolate()**** **function fills missing values using interpolation techniques such as the linear method.\n\n**Example**\n\n`\n`\n**Output:**\n\nLet’s interpolate the missing values using Linear method. This method ignore the index and consider the values as equally spaced.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Using interpolate()",
          "snippet": "import pandas as pd\n   \ndf = pd.DataFrame({\"A\": [12, 4, 5, None, 1], \n                   \"B\": [None, 2, 54, 3, None], \n                   \"C\": [20, 16, None, 3, 8], \n                   \"D\": [14, 3, None, None, 6]})  \nprint(df)"
        }
      },
      {
        "title": "10. Dropping Missing Values in Pandas",
        "content": "The **dropna()** function used to removes rows or columns with NaN values. It can be used to drop data based on different conditions."
      },
      {
        "title": "1. Dropping Rows with At Least One Null Value",
        "content": "Remove rows that contain at least one missing value.\n\n**Example**\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Dropping Rows with At Least One Null Value",
          "snippet": "import pandas as pd\nimport numpy as np\n\ndict = {'First Score': [100, 90, np.nan, 95],\n        'Second Score': [30, np.nan, 45, 56],\n        'Third Score': [52, 40, 80, 98],\n        'Fourth Score': [np.nan, np.nan, np.nan, 65]}\ndf = pd.DataFrame(dict)\n\ndf.dropna()"
        }
      },
      {
        "title": "2. Dropping Rows with All Null Values",
        "content": "We can drop rows where all values are missing using dropna(how='all').\n\n**Example**\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Dropping Rows with All Null Values",
          "snippet": "dict = {'First Score': [100, np.nan, np.nan, 95],\n        'Second Score': [30, np.nan, 45, 56],\n        'Third Score': [52, np.nan, 80, 98],\n        'Fourth Score': [np.nan, np.nan, np.nan, 65]}\ndf = pd.DataFrame(dict)\n\ndf.dropna(how='all')"
        }
      },
      {
        "title": "3. Dropping Columns with At Least One Null Value",
        "content": "To remove columns that contain at least one missing value we use dropna(axis=1).\n\n**Example**\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Dropping Columns with At Least One Null Value",
          "snippet": "dict = {'First Score': [100, np.nan, np.nan, 95],\n        'Second Score': [30, np.nan, 45, 56],\n        'Third Score': [52, np.nan, 80, 98],\n        'Fourth Score': [60, 67, 68, 65]}\ndf = pd.DataFrame(dict)\n\ndf.dropna(axis=1)"
        }
      },
      {
        "title": "4. Dropping Rows with Missing Values in CSV Files",
        "content": "When working with CSV files, we can drop rows with missing values using dropna().\n\n**Example**\n\n`\n`\n**Output:**\n\nDrop Rows with NaNSince the difference is 236, there were 236 rows which had at least 1 Null value in any column. By using these functions we can easily detect, handle and fill missing values.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Dropping Rows with Missing Values in CSV Files",
          "snippet": "import pandas as pd\nd = pd.read_csv(\"/content/employees.csv\")\n\nnd = d.dropna(axis=0, how='any')\n\nprint(\"Old data frame length:\", len(d))\nprint(\"New data frame length:\", len(nd))\nprint(\"Rows with at least one missing value:\", (len(d) - len(nd)))"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Working with Missing Data in Pandas",
      "initialCode": "import pandas as pd\nimport numpy as np\n\nd = {'First Score': [100, 90, np.nan, 95],\n        'Second Score': [30, 45, 56, np.nan],\n        'Third Score': [np.nan, 40, 80, 98]}\ndf = pd.DataFrame(d)\n\nmv = df.isnull()\n\nprint(mv)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-missing-data.py ...",
        "[INFO] Loaded module for: Working with Missing Data in Pandas",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Working with Missing Data in Pandas?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Working with Missing Data in Pandas workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Working with Missing Data in Pandas is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-remove-duplicates": {
    "id": "ds-remove-duplicates",
    "badge": "Module 3 • Data Science",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "Removing Duplicates in Datasets",
    "subtitle": "In-depth guide to Removing Duplicates in Datasets — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- The drop_duplicates() method in Pandas is designed to remove duplicate rows from a DataFrame based on all columns or specific ones. By default, it scans the entire DataFrame and retains the first occurrence of each row and removes any duplicates that follow. In this article, we will see how to use the drop_duplicates() method and its examples.\n\nLet's start with a basic example to see how drop_duplicates() works.\n\n`\n`\n**Output:**\n\nBasic ExampleThis example shows how duplicate rows are removed while retaining the first occurrence using dataframe.drop_duplicates().\n\n**Syntax: **\n\n**DataFrame.drop_duplicates(subset=None, keep='first', inplace=False)\n\nParameters:**\n\n**1. subset: **Specifies the columns to check for duplicates. If not provided all columns are considered.\n\n**2. keep**: Finds which duplicate to keep:\n\n- **'first' (default)**: Keeps the first occurrence, removes subsequent duplicates.\n- **'last'**: Keeps the last occurrence and removes previous duplicates.\n- **False**: Removes all occurrences of duplicates.**3. inplace**: If True it modifies the original DataFrame directly. If False (default), returns a new DataFrame.\n\n**Return type: **Method returns a new DataFrame with duplicates removed unless inplace=True.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import pandas as pd\n\ndata = {\n    \"Name\": [\"Alice\", \"Bob\", \"Alice\", \"David\"],\n    \"Age\": [25, 30, 25, 40],\n    \"City\": [\"NY\", \"LA\", \"NY\", \"Chicago\"]\n}\n\ndf = pd.DataFrame(data)\n\nprint(\"Original DataFrame:\")\nprint(df)\n\ndf_cleaned = df.drop_duplicates()\n\nprint(\"\\nModified DataFrame (no duplicates)\")\nprint(df_cleaned)"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Removing Duplicates in Datasets."
        }
      },
      {
        "title": "2. Examples",
        "content": "Below are some examples of dataframe.drop_duplicates() method:"
      },
      {
        "title": "1. Dropping Duplicates Based on Specific Columns",
        "content": "We can target duplicates in specific columns using the subset parameter. This is useful when some columns are more relevant for identifying duplicates.\n\n`\n`\n**Output:**\n\nDropping Duplicates Based on Specific ColumnsHere duplicates are removed only based on the Name column while Age and City are ignored for the purpose of removing duplicates.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Dropping Duplicates Based on Specific Columns",
          "snippet": "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Alice', 'David'],\n    'Age': [25, 30, 25, 40],\n    'City': ['NY', 'LA', 'SF', 'Chicago']\n})\n\ndf_cleaned = df.drop_duplicates(subset=[\"Name\"])\n\nprint(df_cleaned)"
        }
      },
      {
        "title": "2. Keeping the Last Occurrence of Duplicates",
        "content": "By default drop_duplicates() retains the first occurrence of duplicates. If we want to keep the last occurrence we can use** keep='last'.**\n\n`\n`\n**Output:**\n\nKeeping the Last OccurrenceHere the last occurrence of Alice is kept and the first occurrence is removed.",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Keeping the Last Occurrence of Duplicates",
          "snippet": "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Alice', 'David'],\n    'Age': [25, 30, 25, 40],\n    'City': ['NY', 'LA', 'NY', 'Chicago']\n})\n\ndf_cleaned= df.drop_duplicates(keep='last')\nprint(df_cleaned)"
        }
      },
      {
        "title": "3. Dropping All Duplicates",
        "content": "If we want to remove all rows that are duplicates, we can set **keep=False.**\n\n`\n`\n**Output:**\n\nDropping All DuplicatesWith keep=False both occurrences of Alice are removed leaving only the rows with unique values across all columns.",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Dropping All Duplicates",
          "snippet": "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Alice', 'David'],\n    'Age': [25, 30, 25, 40],\n    'City': ['NY', 'LA', 'NY', 'Chicago']\n})\ndf_cleaned = df.drop_duplicates(keep=False)\nprint(df_cleaned)"
        }
      },
      {
        "title": "4. Modifying the Original DataFrame Directly",
        "content": "If we want to modify the DataFrame in place without creating a new DataFrame set **inplace=True.**\n\n`\n`\n**Output:**\n\nModifying the Original DataFrameUsing inplace=True directly modifies the original DataFrame saving memory and avoiding the need to assign the result to a new variable.",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Modifying the Original DataFrame Directly",
          "snippet": "import pandas as pd\n\ndf = pd.DataFrame({\n    'Name': ['Alice', 'Bob', 'Alice', 'David'],\n    'Age': [25, 30, 25, 40],\n    'City': ['NY', 'LA', 'NY', 'Chicago']\n})\ndf.drop_duplicates(inplace=True)\nprint(df)"
        }
      },
      {
        "title": "5. Dropping Duplicates Based on Partially Identical Columns",
        "content": "Sometimes we might encounter situations where duplicates are not exact rows but have identical values in certain columns. For example after merging datasets we may want to drop rows that have the same values in a subset of columns.\n\n`\n`\n**Output:**\n\nDropping Partially Identical ColumnsHere duplicates are removed based on the Name and City columns leaving only unique combinations of Name and City.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Dropping Duplicates Based on Partially Identical Columns",
          "snippet": "import pandas as pd\n\ndata = {\n    \"Name\": [\"Alice\", \"Bob\", \"Alice\", \"David\", \"Bob\"],\n    \"Age\": [25, 30, 25, 40, 30],\n    \"City\": [\"NY\", \"LA\", \"NY\", \"Chicago\", \"LA\"]\n}\n\ndf = pd.DataFrame(data)\n\ndf_cleaned = df.drop_duplicates(subset=[\"Name\", \"City\"])\n\nprint(df_cleaned)"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Removing Duplicates in Datasets",
      "initialCode": "import pandas as pd\n\ndata = {\n    \"Name\": [\"Alice\", \"Bob\", \"Alice\", \"David\"],\n    \"Age\": [25, 30, 25, 40],\n    \"City\": [\"NY\", \"LA\", \"NY\", \"Chicago\"]\n}\n\ndf = pd.DataFrame(data)\n\nprint(\"Original DataFrame:\")\nprint(df)\n\ndf_cleaned = df.drop_duplicates()\n\nprint(\"\\nModified DataFrame (no duplicates)\")\nprint(df_cleaned)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-remove-duplicates.py ...",
        "[INFO] Loaded module for: Removing Duplicates in Datasets",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Removing Duplicates in Datasets?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Removing Duplicates in Datasets workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Removing Duplicates in Datasets is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-scaling-normalization": {
    "id": "ds-scaling-normalization",
    "badge": "Module 3 • Data Science",
    "readingTime": "32 min read",
    "level": "Intermediate",
    "title": "Feature Scaling, Normalization & Standardization",
    "subtitle": "In-depth guide to Feature Scaling, Normalization & Standardization — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Well-designed Feature engineering is the process of creating, transforming or selecting important features from raw data to improve model performance. These features help the model capture useful patterns and relationships in the data.\n\nFeature EngineeringIt contributes to model building in the following ways:\n\n- Well-designed features help the model to learn complex patterns more effectively.\n- Removing noise and irrelevant information improves model prediction accuracy.\n- Focusing on meaningful features helps the model to generalize better and reduces overfitting.\n- Clear and informative features make the model easier to understand and interpret.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Feature Scaling, Normalization & Standardization."
        }
      },
      {
        "title": "1. Absolute Maximum Scaling",
        "content": "Absolute Maximum Scaling is a feature scaling method where each value is divided by the maximum absolute value of that feature. This transformation rescales the data so that values fall within the range of −1 to 1.\n\n- **Sensitive to Outliers:** Extreme values can affect the maximum value and reduce scaling quality.\n- **Best for Clean Data: **Works better when the dataset does not contain strong outliers."
      },
      {
        "title": "3. Scaling Formula:",
        "content": "X_{\\rm {scaled }}=\\frac{X_{i}}{\\rm{max}\\left(|X|\\right)}"
      },
      {
        "title": "4. Implementation",
        "content": "** Dataset can be downloaded from here.\n\nStep 1: Import Libraries and Dataset**\n\n`\n`\n**Output:**\n\nDataset**Step 2: Apply Absolute Maximum Scaling**\n\n- **np.max(np.abs(df), axis=0)**: Calculates the maximum absolute value for each column.\n- **df / max_abs**: Divides each value by the maximum absolute value of its column to scale the data.\n- **scaled_df.head()**: Displays the first few rows of the scaled dataset.\n\n`\n`\n**Output:**\n\nAbsolute Maximum Scaling",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Implementation",
          "snippet": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('Housing.csv')\n\ndf = df.select_dtypes(include=np.number)\ndf.head()"
        }
      },
      {
        "title": "2. Min-Max Scaling",
        "content": "Min-Max Scaling rescales features by subtracting the minimum value and dividing by the difference between the maximum and minimum values. This usually maps feature values to the range 0 to 1 while preserving the original distribution."
      },
      {
        "title": "6. Scaling Formula:",
        "content": "X_{\\rm {scaled }}=\\frac{X_{i}-X_{\\text {min}}}{X_{\\rm{max}} - X_{\\rm{min}}}"
      },
      {
        "title": "7. Implementation",
        "content": "- **MinMaxScaler(): **Creates a scaler object for Min-Max scaling.\n- **scaler.fit_transform(df): **Calculates min and max values and scales the dataset between 0 and 1.\n\n`\n`\n**Output:**\n\nMin-Max Scaling",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Implementation",
          "snippet": "from sklearn.preprocessing import MinMaxScaler\n\nscaler = MinMaxScaler()\nscaled_data = scaler.fit_transform(df)\nscaled_df = pd.DataFrame(scaled_data, columns=df.columns)\n\nscaled_df.head()"
        }
      },
      {
        "title": "3. Normalization (Vector Normalization)",
        "content": "Normalization scales each data sample so that its vector length (Euclidean norm) becomes 1. It focuses on the direction of data points rather than their magnitude, making it useful in tasks like text classification and clustering."
      },
      {
        "title": "9. Scaling Formula:",
        "content": "**X_{\\text{scaled}} = \\frac{X_i}{\\| X \\|}\n\nWhere:**\n\n- {X_i} is each individual value.\n- {\\| X \\|} represents the Euclidean norm (or length) of the vector X.\n- Normalizes each sample to unit length.\n- Useful for direction-based similarity metrics."
      },
      {
        "title": "10. Implementation",
        "content": "- **Normalizer(): **Creates a normalizer object to scale data.\n- **scaler.fit_transform(df):** Normalizes each row so its vector length becomes 1.\n\n`\n`\n**Output:**\n\nNormalization",
        "code": {
          "language": "python",
          "caption": "Python Example — 10. Implementation",
          "snippet": "from sklearn.preprocessing import Normalizer\n\nscaler = Normalizer()\nscaled_data = scaler.fit_transform(df)\nscaled_df = pd.DataFrame(scaled_data, columns=df.columns)\n\nscaled_df.head()"
        }
      },
      {
        "title": "4. Standardization",
        "content": "Standardization scales features by subtracting the mean and dividing by the standard deviation. This transforms the data so that features have zero mean and unit variance, which helps many machine learning models perform better."
      },
      {
        "title": "12. Scaling Formula:",
        "content": "X_{\\rm {scaled }}=\\frac{X_{i}-\\mu}{\\sigma}\n\n- where \\mu = mean, \\sigma = standard deviation.\n- Produces features with mean 0 and variance 1.\n- Effective for data approximately normally distributed."
      },
      {
        "title": "13. Implementation",
        "content": "- **standardScaler()**: Creates a scaler for standardizing the data.\n- **scaler.fit_transform(df)**: Subtracts the mean and divides by the standard deviation.\n\n`\n`\n**Output:**\n\nStandardization",
        "code": {
          "language": "python",
          "caption": "Python Example — 13. Implementation",
          "snippet": "from sklearn.preprocessing import StandardScaler\n\nscaler = StandardScaler()\nscaled_data = scaler.fit_transform(df)\nscaled_df = pd.DataFrame(scaled_data,\n                         columns=df.columns)\nprint(scaled_df.head())"
        }
      },
      {
        "title": "5. Robust Scaling",
        "content": "Robust Scaling scales features using the median and interquartile range (IQR) instead of the mean and standard deviation. This makes it less sensitive to outliers and skewed data, making it suitable for datasets with extreme values or noise."
      },
      {
        "title": "15. Scaling Formula:",
        "content": "X_{\\rm {scaled }}=\\frac{X_{i}-X_{\\text {median }}}{IQR}"
      },
      {
        "title": "16. Implementation",
        "content": "- **RobustScaler()**: Creates a scaler that uses median and IQR for scaling.\n- **scaler.fit_transform(df)**: Scales the data while reducing the influence of outliers.\n\n`\n`\n**Output:**\n\nRobust Scaling",
        "code": {
          "language": "python",
          "caption": "Python Example — 16. Implementation",
          "snippet": "from sklearn.preprocessing import RobustScaler\n\nscaler = RobustScaler()\nscaled_data = scaler.fit_transform(df)\nscaled_df = pd.DataFrame(scaled_data,\n                         columns=df.columns)\nprint(scaled_df.head())"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Feature Scaling, Normalization & Standardization",
      "initialCode": "import pandas as pd\nimport numpy as np\n\ndf = pd.read_csv('Housing.csv')\n\ndf = df.select_dtypes(include=np.number)\ndf.head()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-scaling-normalization.py ...",
        "[INFO] Loaded module for: Feature Scaling, Normalization & Standardization",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Feature Scaling, Normalization & Standardization?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Feature Scaling, Normalization & Standardization workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Feature Scaling, Normalization & Standardization is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-groupby-aggregation": {
    "id": "ds-groupby-aggregation",
    "badge": "Module 3 • Data Science",
    "readingTime": "10 min read",
    "level": "Intermediate",
    "title": "Aggregating & Grouping Data (GroupBy)",
    "subtitle": "In-depth guide to Aggregating & Grouping Data (GroupBy) — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- The groupby() function in Pandas is important for data analysis as it allows us to group data by one or more categories and then apply different functions to those groups. This technique is used for handling large datasets efficiently and performing operations like aggregation, transformation and filtration on grouped data.\n\nThe groupby() operation is divided into three main steps:",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Aggregating & Grouping Data (GroupBy)."
        }
      },
      {
        "title": "2. Step 1: Splitting Data into Groups",
        "content": "The splitting process refers to dividing the dataset into groups based on a particular condition or key. This can be done using the groupby() function by passing one or more columns as keys."
      },
      {
        "title": "3. Methods for splitting data are as follows:",
        "content": "1. **Group data by a single key:** In order to group data with one key we pass only one key as an argument in groupby function. Here we will group the data by the Name column.\n\n`\n`\n**Output: **\n\nCustom datasetNow we print the first entries in all the groups formed.\n\n`\n`\n**Output:**\n\n**2. Grouping data with multiple keys:** In order to group data with multiple keys, we pass multiple keys in groupby function. Here we group a data of \"Name\" and \"Qualification\" together using multiple keys in groupby function.\n\n`\n`\n**Output:**\n\n**{('Abhi', 'MA'): [7], ('Anuj', 'B.com'): [5], ('Anuj', 'MA'): [1], ('Gaurav', 'B.Tech'): [4], ('Jai', 'MCA'): [2], ('Jai', 'Msc'): [0], ('Princi', 'Msc'): [6], ('Princi', 'Phd'): [3]}\n\n3. Grouping data by sorting keys:** Group keys are sorted by default using the groupby operation. Now we apply groupby() using sort.\n\n`\n`\n**Output:**\n\nNow we apply groupby() without using sort(we pass sort=False).\n\n`\n`\n**Output:**\n\n**4. Grouping data with object attributes: **Grouping data with object attributes in Pandas allows us to treat the groups attribute as a dictionary where the keys are unique group values and values are the indices (row labels) corresponding to each group.\n\n`\n`\n**Output:**\n\n**{'Abhi': [7], 'Anuj': [1, 5], 'Gaurav': [4], 'Jai': [0, 2], 'Princi': [3, 6]}\n\n5. Iterating through groups**: In order to iterate an element of groups, we can iterate through the object.\n\n`\n`\n**Output:**\n\nNow we iterate through groups containing multiple keys.\n\n`\n`\n**Output:**\n\n**6. Selecting a group: **In order to select a group, we can select group using **GroupBy.get_group()**. We can select a group by applying a function GroupBy.get_group this function select a single group.\n\n`\n`\n**Output:**\n\nNow we select an object grouped on multiple columns.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Methods for splitting data are as follows:",
          "snippet": "import pandas as pd\n\ndata1 = {'Name':['Jai', 'Anuj', 'Jai', 'Princi',\n                 'Gaurav', 'Anuj', 'Princi', 'Abhi'],\n        'Age':[27, 24, 22, 32,\n               33, 36, 27, 32],\n        'Address':['Nagpur', 'Kanpur', 'Allahabad', 'Kannuaj',\n                   'Jaunpur', 'Kanpur', 'Allahabad', 'Aligarh'],\n        'Qualification':['Msc', 'MA', 'MCA', 'Phd',\n                         'B.Tech', 'B.com', 'Msc', 'MA']}\ndf = pd.DataFrame(data1)\nprint(df)\n\n\ndf.groupby('Name')\nprint(df.groupby('Name').groups)"
        }
      },
      {
        "title": "4. Step 2: Applying Functions to Groups",
        "content": "After splitting the data into a group we apply a function to each group, in order to do that we have to perform some operations which are as follows:\n\n1. **Aggregation**: It allows us to find a summary statistic for each group like summing or averaging values.\n\n`\n`\n**Output:**\n\nNow we perform aggregation on a group containing multiple keys.\n\n`\n`\n**Output:**\n\nWhen we can apply a multiple functions at once by passing a list or dictionary of functions.\n\n`\n`\n**Output:**\n\n**2. Transformation: **It is a process in which we perform some group-specific computations and return a result with the same index as the original data.\n\nHere we are using some different datasets which is created randomly below.\n\n`\n`\n**Output:**\n\nTransformation**3. Filtration:** It is a process which is used to discard groups based on a condition. For example we can filter out groups where the number of records is less than a certain threshold.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Step 2: Applying Functions to Groups",
          "snippet": "import numpy as np\ngrp1 = df.groupby('Name')\ngrp1['Age'].aggregate(np.sum)"
        }
      },
      {
        "title": "5. Step 3: Combining Results",
        "content": "After applying the functions, results are combined back into a data structure like a DataFrame or Series. We can further analyze or visualize the data in its new form.\n\n`\n`\n**Output:**\n\nCombining ResultsWith the ability to group data by one or more keys and apply various operations, groupby simplifies tasks such as summarizing data, transforming values or filtering groups, making it essential for efficient and scalable data analysis.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Step 3: Combining Results",
          "snippet": "df.groupby('Name').agg({'Age': 'sum'})"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Aggregating & Grouping Data (GroupBy)",
      "initialCode": "import pandas as pd\n\ndata1 = {'Name':['Jai', 'Anuj', 'Jai', 'Princi',\n                 'Gaurav', 'Anuj', 'Princi', 'Abhi'],\n        'Age':[27, 24, 22, 32,\n               33, 36, 27, 32],\n        'Address':['Nagpur', 'Kanpur', 'Allahabad', 'Kannuaj',\n                   'Jaunpur', 'Kanpur', 'Allahabad', 'Aligarh'],\n        'Qualification':['Msc', 'MA', 'MCA', 'Phd',\n                         'B.Tech', 'B.com', 'Msc', 'MA']}\ndf = pd.DataFrame(data1)\nprint(df)\n\n\ndf.groupby('Name')\nprint(df.groupby('Name').groups)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-groupby-aggregation.py ...",
        "[INFO] Loaded module for: Aggregating & Grouping Data (GroupBy)",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Aggregating & Grouping Data (GroupBy)?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Aggregating & Grouping Data (GroupBy) workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Aggregating & Grouping Data (GroupBy) is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-label-one-hot": {
    "id": "ds-label-one-hot",
    "badge": "Module 3 • Data Science",
    "readingTime": "14 min read",
    "level": "Intermediate",
    "title": "Categorical Encoding: Label & One-Hot Encoding",
    "subtitle": "In-depth guide to Categorical Encoding: Label & One-Hot Encoding — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- One-Hot Encoding is a data preprocessing technique used to convert categorical data into a numerical format that machine learning models can understand. It creates separate binary columns for each category, where 1 represents the presence of a category and 0 represents its absence.\n\n- Converts categorical values into binary columns\n- Prevents models from assuming an incorrect order between categories\n- Improves machine learning model performance\n- Helps capture relationships between categorical features\n- Required for many machine learning algorithms that accept numerical input only",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Categorical Encoding: Label & One-Hot Encoding."
        }
      },
      {
        "title": "2. Working of One-Hot Encoding",
        "content": "One-Hot Encoding creates a separate column for each category in the dataset. In the fruit example, when the fruit is Apple, the Fruit_Apple column gets the value 1 while the other fruit columns contain 0. Similarly, for Mango and Orange, their respective columns contain 1 and the remaining columns contain 0.\n\n- Each category gets its own binary column\n- 1 indicates the presence of a category\n- 0 indicates the absence of a category\n- Converts categorical values into numerical format for machine learning modelsFruitCategorical value of fruitPriceapple15mango210apple115orange320The output after applying one-hot encoding on the data is given as follows\n\nFruit_appleFruit_mangoFruit_orangeprice1005010101001500120"
      },
      {
        "title": "3. Implementation",
        "content": "One-Hot Encoding can be implemented in Python using libraries such as Pandas and Scikit-learn, which provide simple and efficient methods for converting categorical data into binary columns."
      },
      {
        "title": "1. Using Pandas",
        "content": "Pandas provides the get_dummies() function to perform one-hot encoding on categorical columns.\n\n- Converts categorical values into binary columns\n- Easy and efficient for preprocessing datasets\n- drop_first=True removes one redundant column to avoid multicollinearity\n- Example: Gender with values M and F becomes Gender_M and Gender_F columns\n\n`\n`\n**Output:**\n\nOutput",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Using Pandas",
          "snippet": "import pandas as pd\n\ndata = {\n    'Employee_ID': [10, 20, 15, 25, 30],\n    'Gender': ['M', 'F', 'F', 'M', 'F'],\n    'Remarks': ['Good', 'Nice', 'Good', 'Great', 'Nice']\n}\n\ndf = pd.DataFrame(data)\n\nprint(\"Original Data:\")\nprint(df)\n\nencoded_df = pd.get_dummies(\n    df,\n    columns=['Gender', 'Remarks'],\n    drop_first=True\n)\n\nprint(\"\\nOne-Hot Encoded Data:\")\nprint(encoded_df)"
        }
      },
      {
        "title": "2. Using Scikit Learn Library",
        "content": "Scikit-learn (sklearn) provides the OneHotEncoder function to convert categorical variables into binary columns for machine learning models.\n\n- Converts categorical data into binary format\n- Automatically identifies categories\n- Useful for machine learning preprocessing\n- select_dtypes() helps select categorical columns automatically\n\n`\n`\n**Output:**\n\nOutputDownload full code from here",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Using Scikit Learn Library",
          "snippet": "import pandas as pd\nfrom sklearn.preprocessing import OneHotEncoder\n\ndata = {\n    'Employee_ID': [10, 20, 15, 25, 30],\n    'Gender': ['M', 'F', 'F', 'M', 'F'],\n    'Remarks': ['Good', 'Nice', 'Good', 'Great', 'Nice']\n}\n\ndf = pd.DataFrame(data)\n\nprint(\"Original Data:\")\nprint(df)\n\ncategorical_columns = df.select_dtypes(include=['object']).columns\n\nencoder = OneHotEncoder(sparse_output=False)\n\nencoded_data = encoder.fit_transform(df[categorical_columns])\n\nencoded_df = pd.DataFrame(\n    encoded_data,\n    columns=encoder.get_feature_names_out(categorical_columns)\n)\n\nfinal_df = pd.concat(\n    [df.drop(columns=categorical_columns), encoded_df],\n    axis=1\n)\n\nprint(\"\\nOne-Hot Encoded Data:\")\nprint(final_df)"
        }
      },
      {
        "title": "6. Advantages",
        "content": "- Converts categorical data into numerical format for machine learning models\n- Helps improve model performance by representing categories clearly\n- Prevents incorrect ordinal relationships between categories"
      },
      {
        "title": "7. Limitations",
        "content": "- Increases the number of columns in the dataset\n- Can create sparse datasets with many 0 values\n- May lead to overfitting when categories are too many and data is limitedComment"
      }
    ],
    "playground": {
      "title": "Python Lab: Categorical Encoding: Label & One-Hot Encoding",
      "initialCode": "import pandas as pd\n\ndata = {\n    'Employee_ID': [10, 20, 15, 25, 30],\n    'Gender': ['M', 'F', 'F', 'M', 'F'],\n    'Remarks': ['Good', 'Nice', 'Good', 'Great', 'Nice']\n}\n\ndf = pd.DataFrame(data)\n\nprint(\"Original Data:\")\nprint(df)\n\nencoded_df = pd.get_dummies(\n    df,\n    columns=['Gender', 'Remarks'],\n    drop_first=True\n)\n\nprint(\"\\nOne-Hot Encoded Data:\")\nprint(encoded_df)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-label-one-hot.py ...",
        "[INFO] Loaded module for: Categorical Encoding: Label & One-Hot Encoding",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Categorical Encoding: Label & One-Hot Encoding?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Categorical Encoding: Label & One-Hot Encoding workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Categorical Encoding: Label & One-Hot Encoding is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-outlier-zscore-iqr": {
    "id": "ds-outlier-zscore-iqr",
    "badge": "Module 3 • Data Science",
    "readingTime": "22 min read",
    "level": "Intermediate",
    "title": "Outlier Detection with Z-Score & IQR",
    "subtitle": "In-depth guide to Outlier Detection with Z-Score & IQR — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Outlier detection is an important task in data as identifying outliers can help us to understand the data better and improve the accuracy of our models. One common technique for detecting outliers is **Z score**. It is a statistical measurement that describes how far a data point is from the mean, expressed in terms of **standard deviations**. It helps us to identify if a data point is relatively higher or lower than the mean and how far it deviates from the average value.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Outlier Detection with Z-Score & IQR."
        }
      },
      {
        "title": "2. Z-Score Formula:",
        "content": "**Z = \\frac{X - \\mu}{\\sigma}\n\nWhere:**\n\n- X = Value of the data point\n- μ = Mean of the data\n- σ = Standard deviation of the data"
      },
      {
        "title": "3. Interpretation of Z-Score",
        "content": "**Outlier** can be detected using Z-scores as follows:\n\n- A **Z-score** of 0 shows that the data point is exactly at the mean.\n- A **positive Z-score** shows that the data point is above the mean.\n- A **negative Z-score** shows that the data point is below the mean.Commonly, data points with a **Z-score greater than 3 or less than -3** are considered outliers as they lie more than 3 standard deviations away from the mean. This threshold can be adjusted based on the dataset and the specific needs of the analysis."
      },
      {
        "title": "4. Why Use Z-Score for Outlier Detection?",
        "content": "Z-Score is useful for detecting outliers in** normal distribution**, as it highlights data points that lie far from the mean. A normal distribution****is shown below and it is estimated that 68% of the data points lie between +/- 1 standard deviation. 95% of the data points lie between +/- 2 standard deviation 99.7% of the data points lie between +/- 3 standard deviation\n\nnormal distributionFor example, in a survey, it was asked how many children a person had. Suppose the data obtained from people is\n\n**1, 2, 2, 2, 3, 1, 1, 15, 2, 2, 2, 3, 1, 1, 2\n\nHere, the value 15 is clearly an outlier as it deviates significantly from the other data points. The Z-Score for this data point will be much higher than the rest, showing it as an anomaly.\n\nLets see why it works so well:\n\n- Simple Calculation:** It’s easy to calculate using just the mean and standard deviation.\n- **Standardized Measure:** Z-Score standardizes the data which makes it easier to detect anomalies across different datasets with varying units or scales.\n- **Identifying Extremes:** Find outliers which are the data points that lie far from the mean. Since Z-Score measures how far a data point is from the mean, it’s perfect for identifying extremes in the data."
      },
      {
        "title": "5. Steps for Z-Score Based Outlier Detection in Python",
        "content": "Let’s see the steps of detecting outliers using the Z-Score method in Python."
      },
      {
        "title": "6. Step 1: Importing Necessary Libraries",
        "content": "We will be importing numpy, pandas, scipy and matplotlib for calculating the Z-Score and visualizing the outliers.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Step 1: Importing Necessary Libraries",
          "snippet": "import numpy as np\nimport pandas as pd\nfrom scipy.stats import zscore\nimport matplotlib.pyplot as plt"
        }
      },
      {
        "title": "7. Step 2: Creating the Dataset",
        "content": "For this example, we will use sample data and convert this into a pandas DataFrame.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Step 2: Creating the Dataset",
          "snippet": "data = [5, 2, 4.5, 4, 3, 2, 6, 20, 9, 2.5, 3.5, 4.75, 6.5, 2.5, 8, 1]\ndf = pd.DataFrame(data, columns=['Value'])"
        }
      },
      {
        "title": "8. Step 3: Calculating the Z-Scores",
        "content": "Now, we calculate the Z-scores for this dataset using the z-score function from scipy.stats.\n\n`\n`\n**Output: **\n\nCalculating the Z-ScoresThis give us the Z-Score for each data point in the dataset.",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Step 3: Calculating the Z-Scores",
          "snippet": "df['Z-score'] = zscore(df['Value'])\nprint(df)"
        }
      },
      {
        "title": "9. Step 4: Identifying Outliers",
        "content": "Next, we'll identify the data points that have a Z-score greater than 3 or less than -3 which are commonly considered outliers.\n\n`\n`\n**Output: **\n\nIdentifying Outliers",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Step 4: Identifying Outliers",
          "snippet": "outliers = df[df['Z-score'].abs() > 3]\nprint(outliers)"
        }
      },
      {
        "title": "10. Step 5: Visualizing the Data",
        "content": "To better understand the outliers, let’s create a scatter plot to visualize the dataset and highlight the outliers.\n\n`\n`\n**Output:**\n\nVisualizing the DataIn this case, the value 20 is an outlier because its Z-score is significantly higher than the rest of the values in the dataset.",
        "code": {
          "language": "python",
          "caption": "Python Example — 10. Step 5: Visualizing the Data",
          "snippet": "plt.figure(figsize=(10, 6))\n\nplt.scatter(df['Value'].index, df['Z-score'], label='Data Points')\nplt.scatter(outliers['Value'].index, outliers['Z-score'], color='red', label='Outlier')\n\nplt.xlabel('Index Value')\nplt.ylabel('Z-score')\nplt.title('Scatter Plot of Value vs. Z-score')\nplt.legend()\nplt.grid(True)\nplt.show()"
        }
      },
      {
        "title": "11. Best Practices for Using Z-Score for Outlier Detection",
        "content": "**While Z-Score is effective, there are a few important considerations:**\n\n- **Assumption of Normal Distribution:** Z-Score works best when the data follows a normal distribution. If our data is skewed, other methods like IQR (Interquartile Range) might be more appropriate.\n- **Threshold Selection: **The threshold of 3 is commonly used but it can be adjusted depending on the data and the application.\n- **Handle Multiple Outliers:** In large datasets, there might be several outliers. It’s important to decide whether to remove them or investigate further.By applying the Z-score method, we can quickly identify and deal with outliers which improves the accuracy of our data analysis and statistical models.\n\nComment"
      }
    ],
    "playground": {
      "title": "Python Lab: Outlier Detection with Z-Score & IQR",
      "initialCode": "import numpy as np\nimport pandas as pd\nfrom scipy.stats import zscore\nimport matplotlib.pyplot as plt",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-outlier-zscore-iqr.py ...",
        "[INFO] Loaded module for: Outlier Detection with Z-Score & IQR",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Outlier Detection with Z-Score & IQR?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Outlier Detection with Z-Score & IQR workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Outlier Detection with Z-Score & IQR is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-imbalanced-data": {
    "id": "ds-imbalanced-data",
    "badge": "Module 3 • Data Science",
    "readingTime": "16 min read",
    "level": "Intermediate",
    "title": "Handling Imbalanced Datasets",
    "subtitle": "In-depth guide to Handling Imbalanced Datasets — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Imbalanced data occurs when one class has far more samples than others, causing models to favour the majority class and perform poorly on the minority class. This often results in misleading accuracy, especially in critical applications like fraud detection or medical diagnosis.\n\n- ML models tend to get biased toward the majority class and predict it more frequently.\n- Minority class instances may be treated as noise, causing the model to overlook them.\n- Accuracy becomes misleading because the model performs well only on the dominant class.\n- Skewed decision boundaries lead to poor generalisation and weak performance on minority class predictions.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Handling Imbalanced Datasets."
        }
      },
      {
        "title": "1. Use Better Evaluation Metrics",
        "content": "Accuracy is not a reliable metric for imbalanced datasets because a model can predict only the majority class and still achieve high accuracy. Instead, metrics like Precision, Recall and F1-score give a clearer picture of performance.\n\nF1 = \\frac{2 \\times (\\text{Precision} \\times \\text{Recall})}{(\\text{Precision} + \\text{Recall})}\n\n- Precision measures how many predicted positives are actually correct.\n- Recall measures how many actual positives the model correctly identifies.\n- F1-score is the harmonic mean of precision and recall and is widely used for imbalanced datasets.Precision and F1 score decrease with more false positives while recall and F1 score drop when minority class samples are missed. F1 score improves only when both precision and recall increase making it ideal for imbalanced datasets."
      },
      {
        "title": "2. Resampling Techniques",
        "content": "Resampling adjusts the size of classes to make them more balanced.\n\n- **Oversampling: **Duplicates or generates minority class samples to help the model learn more patterns.\n- **Undersampling: **Removes majority class samples to balance the dataset and give equal importance to all classes.**Implementing Resampling**\n\n- Creates an imbalanced binary dataset with one minority and one majority class using synthetic data.\n- Prints the original number of samples in each class before balancing.\n- Applies oversampling to duplicate minority class samples and balance the dataset.\n- Uses undersampling to reduce majority class samples and achieve class balance.\n\n`\n`\n**Output:**\n\nOutput",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Resampling Techniques",
          "snippet": "import numpy as np\nfrom sklearn.datasets import make_classification\nfrom imblearn.over_sampling import RandomOverSampler\nfrom imblearn.under_sampling import RandomUnderSampler\nfrom collections import Counter\n\nX, y = make_classification(n_classes=2, class_sep=2, weights=[0.1, 0.9],\n                           n_informative=3, n_redundant=1, flip_y=0,\n                           n_features=20, n_clusters_per_class=1,\n                           n_samples=1000, random_state=42)\n\nprint(\"Original class distribution:\", Counter(y))\n\noversample = RandomOverSampler(sampling_strategy='minority')\nX_over, y_over = oversample.fit_resample(X, y)\nprint(\"Oversampled class distribution:\", Counter(y_over))\n\nundersample = RandomUnderSampler(sampling_strategy='majority')\nX_under, y_under = undersample.fit_resample(X, y)\nprint(\"Undersampled class distribution:\", Counter(y_under))"
        }
      },
      {
        "title": "3. Balanced Bagging Classifier",
        "content": "Balanced Bagging Classifier is an ensemble technique used to handle imbalanced datasets. It works like Bagging but balances each bootstrap sample so that minority classes are not ignored during training. Standard models favour the majority class due to which minority class predictions become poor. Balanced Bagging Classifier resamples data internally to fix this problem.\n\n**Implementing Balanced Bagging Classifier**\n\nHere in this code we create an imbalanced dataset and train a Random Forest model using balanced bootstrapped samples so that both majority and minority classes are learned fairly. The model is then evaluated on test data to check improved performance on the minority class.\n\n**Step 1: Import Required Libraries**\n\n- make_classification creates synthetic imbalanced data\n- BalancedBaggingClassifier helps handle class imbalance\n- matplotlib is used for visualization\n\n`\n`\n**Step 2: Create an Imbalanced Dataset**\n\n- weights=[0.1, 0.9] creates class imbalance\n- random_state ensures reproducible results\n\n`\n`\n**Step 3: Visualize Class Distribution**\n\nShows how one class dominates the dataset\n\n`\n`\n**Output:**\n\nClass Distribution**Step 4: Split Dataset into Train and Test**\n\n- 80% data used for training, 20% for testing\n- Same random state keeps split consistent\n\n`\n`\n**Step 5: Create Base Classifier**\n\nRandom Forest acts as the base learner\n\n`\n`\n**Step 6: Create BalancedBaggingClassifier**\n\n- sampling_strategy='auto' balances all classes\n- replacement=False avoids duplicate samples\n\n`\n`\n**Step 7: Train Model and Predict**\n\nModel learns from balanced bootstrapped samples\n\n`\n`\n**Step 8: Evaluate the Model**\n\n- Accuracy gives overall correctness\n- Classification report shows precision, recall, and F1-score\n\n`\n`\n**Output:**\n\nAccuracy and Classification Report",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Balanced Bagging Classifier",
          "snippet": "import matplotlib.pyplot as plt\nfrom sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom imblearn.ensemble import BalancedBaggingClassifier\nfrom sklearn.metrics import accuracy_score, classification_report"
        }
      },
      {
        "title": "4. Synthetic Minority Oversampling Technique (SMOTE)",
        "content": "SMOTE is a data level technique used to handle imbalanced datasets by creating new synthetic samples for the minority class instead of duplicating existing ones. In SMOTE a minority class data point is first selected then its k-nearest neighbors are identified and finally a new synthetic data point is generated between the selected point and one of its neighbors.\n\n**Handling Class Imbalance Using SMOTE**\n\n- Creates an imbalanced binary dataset and splits it into training and test sets.\n- Displays the class distribution of the training data before applying SMOTE.\n- Applies SMOTE to generate synthetic minority samples and balance the training dataset.\n\n`\n`\n**Output:**\n\nClass distribution before SMOTE: Counter({np.int64(1): 713, np.int64(0): 87})\nClass distribution after SMOTE: Counter({np.int64(1): 713, np.int64(0): 713})",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Synthetic Minority Oversampling Technique (SMOTE)",
          "snippet": "from sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom imblearn.over_sampling import SMOTE\nfrom collections import Counter\nX, y = make_classification(\n    n_classes=2,\n    class_sep=2,\n    weights=[0.1, 0.9],\n    n_informative=3,\n    n_redundant=1,\n    flip_y=0,\n    n_features=20,\n    n_clusters_per_class=1,\n    n_samples=1000,\n    random_state=42\n)\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42\n)\nprint(\"Class distribution before SMOTE:\", Counter(y_train))\nsmote = SMOTE(sampling_strategy='auto', random_state=42)\nX_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)\nprint(\"Class distribution after SMOTE:\", Counter(y_train_resampled)"
        }
      },
      {
        "title": "5. Threshold Moving",
        "content": "In classification, models often give probabilities for each class. By default a probability above 0.5 is labeled as the positive class. However for imbalanced dataset this default may not work well.\n\nTo improve performance the classification threshold can be adjusted. A lower or higher threshold can help the model better detect the minority class or reduce false positives.\n\n**Ways to find the best threshold:**\n\n- **ROC Curve: **Choose the threshold that balances true positive rate and false positive rate.\n- **Precision-Recall Curve:** Especially useful for imbalanced data to maximize precision and recall.\n- **Grid Search / Range Testing: **Experiment with multiple threshold values to find the one that gives the best performance metrics.**Implementing Threshold Tuning for Imbalanced Classification**\n\n- Trains a Random Forest classifier on the imbalanced training data.\n- Predicts probabilities for the positive class instead of direct labels.\n- Iteratively changes the decision threshold to observe how the F1-score varies and find a better balance between precision and recall.\n\n`\n`\n**Output:**\n\nOutputThis output shows how the F1 score changes with different classification thresholds. Higher thresholds (around 0.30–0.50) give perfect F1 scores (1.0), while lowering the threshold gradually reduces the F1 score, indicating a trade-off between precision and recall.",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Threshold Moving",
          "snippet": "from sklearn.datasets import make_classification\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score\n\n\nX, y = make_classification(n_classes=2, class_sep=2, weights=[0.1, 0.9],\n                           n_informative=3, n_redundant=1, flip_y=0,\n                           n_features=20, n_clusters_per_class=1,\n                           n_samples=1000, random_state=42)\n\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\n\n\nmodel = RandomForestClassifier(random_state=42)\nmodel.fit(X_train, y_train)\n\n\ny_proba = model.predict_proba(X_test)[:, 1]\n\nthreshold = 0.5\n\n\nwhile threshold >= 0:\n    y_pred = (y_proba >= threshold).astype(int)\n    f1 = f1_score(y_test, y_pred)\n\n    print(f\"Threshold: {threshold:.2f}, F1 Score: {f1:.4f}\")\n\n  \n    threshold -= 0.02"
        }
      },
      {
        "title": "6. Using Tree Based Models",
        "content": "The hierarchical structure of tree-based models such as Decision Trees, Random Forests and Gradient Boosted Trees allows them to handle imbalanced datasets better than non-tree-based models.\n\n- **Decision Trees:** Decision trees create a structure resembling a tree by dividing the feature space into regions according to feature values. By changing the decision boundaries to incorporate minority class patterns, decision trees can react to data that is unbalanced. They might experience overfitting, though.\n- **Random Forests:** Random Forests are made up of many Decision Trees that have been trained using arbitrary subsets of features and data. Random Forests improve generalization by reducing overfitting and strengthening robustness against imbalanced datasets by mixing numerous trees.\n- **Gradient Boosted Trees: **Boosted Gradient Trees grow in a sequential fashion, with each new growth repairing the mistakes of the older one. Gradient Boosted Trees perform well in imbalanced circumstances because of their ability to concentrate on misclassified occurrences through sequential learning. Although they often work effectively, they could be noise-sensitive."
      },
      {
        "title": "7. Using Anomaly Detection Algorithms",
        "content": "- Anomaly or Outlier Detection algorithms are one class classification algorithms that helps in identifying outliers ( rare data points) in the dataset.\n- In an Imbalanced dataset, assume Majority class records as Normal data and Minority Class records as Outlier data.\n- These algorithms are trained on Normal data.\n- A trained model can predict if the new record is Normal or Outlier.You can download full code from here\n\nComment"
      }
    ],
    "playground": {
      "title": "Python Lab: Handling Imbalanced Datasets",
      "initialCode": "import numpy as np\nfrom sklearn.datasets import make_classification\nfrom imblearn.over_sampling import RandomOverSampler\nfrom imblearn.under_sampling import RandomUnderSampler\nfrom collections import Counter\n\nX, y = make_classification(n_classes=2, class_sep=2, weights=[0.1, 0.9],\n                           n_informative=3, n_redundant=1, flip_y=0,\n                           n_features=20, n_clusters_per_class=1,\n                           n_samples=1000, random_state=42)\n\nprint(\"Original class distribution:\", Counter(y))\n\noversample = RandomOverSampler(sampling_strategy='minority')\nX_over, y_over = oversample.fit_resample(X, y)\nprint(\"Oversampled class distribution:\", Counter(y_over))\n\nundersample = RandomUnderSampler(sampling_strategy='majority')\nX_under, y_under = undersample.fit_resample(X, y)\nprint(\"Undersampled class distribution:\", Counter(y_under))",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-imbalanced-data.py ...",
        "[INFO] Loaded module for: Handling Imbalanced Datasets",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Handling Imbalanced Datasets?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Handling Imbalanced Datasets workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Handling Imbalanced Datasets is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-eda-python": {
    "id": "ds-eda-python",
    "badge": "Module 4 • Data Science",
    "readingTime": "18 min read",
    "level": "Advanced",
    "title": "Exploratory Data Analysis (EDA) in Python",
    "subtitle": "In-depth guide to Exploratory Data Analysis (EDA) in Python — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "![Data Science Pipeline](/images/ai-ml/ds-pipeline.svg)\n\n- EDA is an essential step in data analysis that focuses on understanding patterns, relationships and distributions within a dataset using statistical methods and visualizations. Python libraries such as pandas, NumPy, plotly, matplotlib and seaborn make this process efficient and insightful. Some common EDA techniques are:\n\n- **Data Inspection:** Check the size of the dataset, how it is organized, the types of data it contains and basic summary values.\n- **Handling Missing and Duplicate Data:** Find and fix empty values or repeated rows to keep the data clean.\n- **Univariate Analysis:** Study one variable at a time to understand its distribution, trend and outliers.\n- **Bivariate Analysis:** Compare two variables to see how they are related.\n- **Multivariate Analysis: **Analyze three or more variables together to understand deeper relationships.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Exploratory Data Analysis (EDA) in Python."
        }
      },
      {
        "title": "2. Step 1: Importing Required Libraries",
        "content": "We need to install Pandas, NumPy, Matplotlib and Seaborn libraries in python to proceed further.\n\n`\n`",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Step 1: Importing Required Libraries",
          "snippet": "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport warnings as wr\nwr.filterwarnings('ignore')"
        }
      },
      {
        "title": "3. Step 2: Reading Dataset",
        "content": "Let's read the dataset using pandas.\n\n**Download the dataset from this link\n\n`\n`\nOutput:**\n\nFirst 5 rows",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Step 2: Reading Dataset",
          "snippet": "df = pd.read_csv(\"/content/WineQT.csv\")\nprint(df.head())"
        }
      },
      {
        "title": "4. Step 3: Analyzing the Data",
        "content": "**1. df.shape():** This function is used to understand the number of rows (observations) and columns (features) in the dataset. This gives an overview of the dataset's size and structure.\n\n`\n`\n**Output:**\n\n**(1143, 13)\n\n2. df.info():** This function helps us to understand the dataset by showing the number of records in each column, type of data, whether any values are missing and how much memory the dataset uses.\n\n`\n`\n**Output:**\n\ninfo()**3. df.describe().T**: This method gives a statistical summary of the DataFrame (Transpose) showing values like count, mean, standard deviation, minimum and quartiles for each numerical column. It helps in summarizing the central tendency and spread of the data.\n\n`\n`\n**Output:**\n\ndescribe4. **df.columns.tolist():** This converts the column names of the DataFrame into a Python list making it easy to access and manipulate the column names.\n\n`\n`\n**Output:**\n\ncolumn names"
      },
      {
        "title": "5. Step 4 : Checking Missing Values",
        "content": "**df.isnull().sum():** This checks for missing values in each column and returns the total number of null values per column helping us to identify any gaps in our data.\n\n`\n`\n**Output:**\n\nMissing values in each column",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Step 4 : Checking Missing Values",
          "snippet": "df.isnull().sum()"
        }
      },
      {
        "title": "6. Step 5 : Checking for the duplicate values",
        "content": "**df.duplicated().sum():** Returns the number of duplicate rows in the dataset.\n\n`\n`\n**Output:**\n\nnunique()",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Step 5 : Checking for the duplicate values",
          "snippet": "df.duplicated().sum()"
        }
      },
      {
        "title": "7. Step 6: Univariate Analysis",
        "content": "In Univariate analysis plotting the right charts can help us to better understand the data making the data visualization so important.\n\n**1. Bar Plot for evaluating the count of the wine with its quality rate.**\n\n`\n`\n**Output:**\n\nBar PlotHere, this count plot graph shows the count of the wine with its quality rate.\n\n**2. Kernel density plots help visualize the distribution of data and identify patterns such as skewness and density.**\n\n`\n`\n**Output:**\n\nKernel density plotThe features in the dataset with a skewness of 0 shows a symmetrical distribution. Skewness > 0 indicates positive (right) skew, while skewness < 0 indicates negative (left) skew. In a right-skewed distribution the tail extends more to the right which shows the presence of extremely high values.\n\n**3. ****Swarm Plot**** for showing the outlier in the data**\n\n`\n`\n**Output:**\n\nSwarm PlotThis graph shows the swarm plot for the 'Alcohol' column. The distribution of points shows how the alcohol values are spread across the dataset, with areas having more points indicating a higher concentration of values. Isolated points that are far from the main distribution may represent potential outliers.",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Step 6: Univariate Analysis",
          "snippet": "quality_counts = df['quality'].value_counts()\n\nplt.figure(figsize=(8, 6))\nplt.bar(quality_counts.index, quality_counts, color='deeppink')\nplt.title('Count Plot of Quality')\nplt.xlabel('Quality')\nplt.ylabel('Count')\nplt.show()"
        }
      },
      {
        "title": "8. Step 7: Bivariate Analysis",
        "content": "In bivariate analysis two variables are analyzed together to identify patterns, dependencies or interactions between them. This method helps in understanding how changes in one variable might affect another.\n\n**1. Pair Plot for showing the distribution of the individual variables**\n\n`\n`\n**Output:**\n\nPair Plot\n- If the plot is diagonal , histograms of kernel density plots shows the distribution of the individual variables.\n- If the scatter plot is in the lower triangle, it displays the relationship between the pairs of the variables.\n- If the scatter plots above and below the diagonal are mirror images indicating symmetry.\n- If the histogram plots are more centered, it represents the locations of peaks.\n- Skewness is found by observing whether the histogram is symmetrical or skewed to the left or right. **2. ****Violin Plot**** for examining the relationship between alcohol and Quality.**\n\n`\n`\n**Output:**\n\nViolin PlotFor interpreting the Violin Plot:\n\n- If the width is wider, it shows higher density suggesting more data points.\n- Symmetrical plot shows a balanced distribution.\n- Peak or bulge in the violin plot represents most common value in distribution.\n- Longer tails shows great variability.\n- Median line is the middle line inside the violin plot. It helps in understanding central tendencies.**3. Box Plot for examining the relationship between alcohol and Quality**\n\n`\n`\n**Output:**\n\nBox PlotBox represents the IQR i.e longer the box, greater the variability.\n\n- Median line in the box shows central tendency.\n- Whiskers extend from box to the smallest and largest values within a specified range.\n- Individual points beyond the whiskers represents outliers.\n- A compact box shows low variability while a stretched box shows higher variability.",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Step 7: Bivariate Analysis",
          "snippet": "sns.set_palette(\"Pastel1\")\n\nplt.figure(figsize=(10, 6))\n\nsns.pairplot(df)\n\nplt.suptitle('Pair Plot for DataFrame')\nplt.show()"
        }
      },
      {
        "title": "9. Step 8: Multivariate Analysis",
        "content": "It involves finding the interactions between three or more variables in a dataset at the same time. This approach focuses to identify complex patterns, relationships and interactions which provides understanding of how multiple variables collectively behave and influence each other.\n\nHere, we are going to show the multivariate analysis using a correlation matrix plot.\n\n`\n`\n**Output:**\n\nCorrelation MatrixValues close to +1 shows strong positive correlation, -1 shows a strong negative correlation and 0 suggests no linear correlation.\n\n- Darker colors signify strong correlation, while light colors represents weaker correlations.\n- Positive correlation variable move in same directions. As one increases, the other also increases.\n- Negative correlation variable move in opposite directions. An increase in one variable is associated with a decrease in the other. You can download the source code from here.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Step 8: Multivariate Analysis",
          "snippet": "plt.figure(figsize=(15, 10))\n\nsns.heatmap(df.corr(), annot=True, fmt='.2f', cmap='Pastel2', linewidths=2)\n\nplt.title('Correlation Heatmap')\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Exploratory Data Analysis (EDA) in Python",
      "initialCode": "import pandas as pd\nimport numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport warnings as wr\nwr.filterwarnings('ignore')",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-eda-python.py ...",
        "[INFO] Loaded module for: Exploratory Data Analysis (EDA) in Python",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Exploratory Data Analysis (EDA) in Python?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Exploratory Data Analysis (EDA) in Python workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Exploratory Data Analysis (EDA) in Python is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-univariate-multivariate": {
    "id": "ds-univariate-multivariate",
    "badge": "Module 4 • Data Science",
    "readingTime": "24 min read",
    "level": "Advanced",
    "title": "Univariate, Bivariate & Multivariate Analysis",
    "subtitle": "In-depth guide to Univariate, Bivariate & Multivariate Analysis — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Data Visualisation is a graphical representation of information and data. By using different visual elements such as charts, graphs and maps data visualization tools provide us with an accessible way to find and understand hidden trends and patterns in data.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Univariate, Bivariate & Multivariate Analysis."
        }
      },
      {
        "title": "2. Univariate Analysis",
        "content": "Univariate Analysis is a type of data visualization where we visualize only a single variable at a time. Univariate Analysis helps us to analyze the distribution of the variable present in the data so that we can perform further analysis.\n\n**You can find the link to the dataset here.\n\n`\n`\nOutput:**\n\nOutput",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Univariate Analysis",
          "snippet": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\ndata = pd.read_csv('Employee_dataset.csv')\nprint(data.head())"
        }
      },
      {
        "title": "3. Histogram",
        "content": "Here we’ll be performing univariate analysis on Numerical variables using the histogram function.\n\n`\n`\n**Output:**\n\nHistogram",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Histogram",
          "snippet": "sns.histplot(data['age'])"
        }
      },
      {
        "title": "4. Bar Chart",
        "content": "Univariate analysis of categorical data. We’ll be using the count plot function from the seaborn library\n\n`\n`\n**Output:**\n\nBar Chart\nThe Bars in the chart are representing the count of each category present in the business travel column.",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Bar Chart",
          "snippet": "sns.countplot(data['gender_full'])"
        }
      },
      {
        "title": "5. Pie Chart",
        "content": "A piechart helps us to visualize the percentage of the data belonging to each category.\n\n`\n`\n**Output:**\n\nPie Chart",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Pie Chart",
          "snippet": "x = data['STATUS_YEAR'].value_counts()\nplt.pie(x.values,\n        labels=x.index,\n        autopct='%1.1f%%')\nplt.show()"
        }
      },
      {
        "title": "6. Bivariate analysis",
        "content": "Bivariate analysis is the simultaneous analysis of two variables. It explores the concept of the relationship between two variable whether there exists an association and the strength of this association or whether there are differences between two variables and the significance of these differences.\n\nThe main three types we will see here are:\n\n- Categorical v/s Numerical\n- Numerical V/s Numerical\n- Categorical V/s Categorical data"
      },
      {
        "title": "7. Categorical v/s Numerical",
        "content": "`\n`\n**Output:**\n\nOutput\nHere the Black horizontal line is indicating huge differences in the length of service among different departments.",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Categorical v/s Numerical",
          "snippet": "import matplotlib.pyplot as plt\nplt.figure(figsize=(15, 5))\nsns.barplot(x=data['department_name'], y=data['length_of_service'])\nplt.xticks(rotation=90)"
        }
      },
      {
        "title": "8. Numerical v/s Numerical",
        "content": "`\n`\n**Output:**\n\nOutput\nIt displays the age and length of service of employees in the organization as we can see that younger employees have less experience in terms of their length of service.",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Numerical v/s Numerical",
          "snippet": "sns.scatterplot(x=data['length_of_service'],\n                y=data['age'])"
        }
      },
      {
        "title": "9. Categorical v/s Categorical",
        "content": "Implementation and key details for **Categorical v/s Categorical**:",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Categorical v/s Categorical",
          "snippet": "sns.countplot(x='STATUS_YEAR', hue='STATUS', data=data)"
        }
      },
      {
        "title": "10. Multivariate Analysis",
        "content": "It is an extension of bivariate analysis which means it involves multiple variables at the same time to find correlation between them. Multivariate Analysis is a set of statistical model that examine patterns in multidimensional data by considering at once, several data variable."
      },
      {
        "title": "11. PCA",
        "content": "Implementation and key details for **PCA**:",
        "code": {
          "language": "python",
          "caption": "Python Example — 11. PCA",
          "snippet": "from sklearn import datasets, decomposition\niris = datasets.load_iris()\nX = iris.data\ny = iris.target\npca = decomposition.PCA(n_components=2)\nX = pca.fit_transform(X)\nsns.scatterplot(x=X[:, 0], y=X[:, 1], hue=y)"
        }
      },
      {
        "title": "12. HeatMap",
        "content": "Here we are using a heat map to check the correlation between all the columns in the dataset. It is a data visualisation technique that shows the magnitude of the phenomenon as colour in two dimensions. The values of correlation can vary from -1 to 1 where -1 means strong negative and +1 means strong positive correlation.\n\n`\n`\n**Output:**\n\nHeatmapComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 12. HeatMap",
          "snippet": "sns.heatmap(data.select_dtypes(include=['number']).corr(), annot=True)"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Univariate, Bivariate & Multivariate Analysis",
      "initialCode": "import pandas as pd\nimport seaborn as sns\nimport matplotlib.pyplot as plt\ndata = pd.read_csv('Employee_dataset.csv')\nprint(data.head())",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-univariate-multivariate.py ...",
        "[INFO] Loaded module for: Univariate, Bivariate & Multivariate Analysis",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Univariate, Bivariate & Multivariate Analysis?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Univariate, Bivariate & Multivariate Analysis workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Univariate, Bivariate & Multivariate Analysis is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-correlation": {
    "id": "ds-correlation",
    "badge": "Module 4 • Data Science",
    "readingTime": "6 min read",
    "level": "Advanced",
    "title": "Correlation Matrix & Analysis in Pandas",
    "subtitle": "In-depth guide to Correlation Matrix & Analysis in Pandas — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- DataFrame.corr() method in Pandas is used to calculate the correlation between numeric columns in a DataFrame. Correlation shows how strongly two columns are related. The result is returned as a new DataFrame called a correlation matrix, where each value ranges from -1 to 1.\n\n- 1: perfect positive correlation\n- -1: perfect negative correlation\n- 0: no correlationNon-numeric columns are ignored automatically.\n\n**Example: **This code creates a simple DataFrame and finds the correlation between its columns.\n\n`\n`\n**Output**\n**Explanation:**\n\n- df.corr() calculates correlation between all numeric columns.\n- Column B = Column A + 5, which is a perfect linear relationship and hence the correlation = 1.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import pandas as pd\n\nd = {\"A\": [10, 20, 30], \"B\": [15, 25, 35]}\ndf = pd.DataFrame(d)\n\nr = df.corr()\nprint(r)"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Correlation Matrix & Analysis in Pandas."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**DataFrame.corr(method='pearson', min_periods=1, numeric_only=False)\n\nParameters:**\n\n- **method:** Correlation method (pearson, spearman, kendall), we get pearson correlation by default.\n- **min_periods:** Minimum required matching values\n- **numeric_only:** Includes only numeric columns if True"
      },
      {
        "title": "3. Examples",
        "content": "**Example 1:** This code finds correlation between height and weight columns with strong positive correlation.\n\n`\n`\n**Output**\n**Explanation:**\n\n- Correlation is 0.97, which is close to +1 meaning Height and Weight increase together and and have a strong positive relationship, but not perfectly proportional.\n- Pearson correlation uses covariance of actual values and since most Height and Weight values increase together, covariance is high positive, giving a value close to +1.**Example 2: **This code shows negative correlation between two columns using Kendall rank method.\n\n`\n`\n**Output**\n\n** StudyHours StressLevel\nStudyHours 1.000000 -0.666667\nStressLevel -0.666667 1.000000\n\nExplanation:**\n\n- Correlation is -0.6, which shows a moderate negative relationship, meaning as StudyHours increase, StressLevel generally decreases, but not always.\n- Kendall correlation counts concordant and discordant rank pairs and since more pairs have opposite order than same order, result is negative, but not all pairs are opposite, so it is -0.6 instead of -1.**Example 3:** This code calculates correlation using sperman rank-based method.\n\n`\n`\n**Output**\n**Explanation:**\n\n- The correlation is -1.0, which shows a perfect negative relationship between the two columns.\n- Spearman correlation uses rank differences and here the rank order is exactly reversed, so rank difference is maximum opposite, resulting in perfect negative correlation (-1).Comment",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Examples",
          "snippet": "import pandas as pd\nd = {\"Height\": [150, 160, 170, 180], \"Weight\": [50, 65, 68, 80]}\ndf = pd.DataFrame(d)\nprint(df.corr())"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Correlation Matrix & Analysis in Pandas",
      "initialCode": "import pandas as pd\n\nd = {\"A\": [10, 20, 30], \"B\": [15, 25, 35]}\ndf = pd.DataFrame(d)\n\nr = df.corr()\nprint(r)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-correlation.py ...",
        "[INFO] Loaded module for: Correlation Matrix & Analysis in Pandas",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Correlation Matrix & Analysis in Pandas?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Correlation Matrix & Analysis in Pandas workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Correlation Matrix & Analysis in Pandas is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-sampling-dist": {
    "id": "ds-sampling-dist",
    "badge": "Module 4 • Data Science",
    "readingTime": "6 min read",
    "level": "Advanced",
    "title": "Sampling Distributions in Python",
    "subtitle": "In-depth guide to Sampling Distributions in Python — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- There are different types of distributions that we study in statistics like normal/gaussian distribution, exponential distribution, binomial distribution, and many others. We will study one such distribution today which is **Sampling Distribution**.\n\nLet's say we have some data then if we sample some finite number of data points from it and then calculate some statistical measure of it and let's do this some **n** number of times. Then if we draw the distribution curve of those sample statistics then the distribution obtained is known as **Sampling Distribution**.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Sampling Distributions in Python."
        }
      },
      {
        "title": "2. Sampling distribution Using Python",
        "content": "There is also a special case of the sampling distribution which is known as the **Central Limit Theorem **which says that if we take some samples from a distribution of data(no matter how it is distributed) then if we draw a distribution curve of the mean of those samples then it will be a normal distribution.\n\nLet's understand it by using an example:\n\nLet's take numbers from 1 to 10 and use them as our primary data.\n\n`\n`\n**Output:**\n\nNow, let's sample two points from the data and take the average of these two. Also, let's maintain a dictionary with the sample means and the number of times they appear.\n\n`\n`\n**Output:**\n\nNow, let's plot the sample statistics to visualize its distribution.\n\n`\n`\n**Output:**\n\nDistribution of the sample statisticFrom the above graph, we can observe that the distribution of the sample statistic is symmetric and if we will take infinite such points which are totally random then we'll be able to observe that the distribution formed will be a **normal/gaussian distribution**.\n\nThere are some error measurements that are related to the sampling distributions:\n\n- **Standard Error**\n- **Bootstrap Standard Error**",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Sampling distribution Using Python",
          "snippet": "import numpy as np\nnum = np.arange(10)\nnum"
        }
      },
      {
        "title": "3. Standard Error",
        "content": "Let's say we have a sampling distribution that has been calculated using some sample statistics then the SE of that statistics is calculated by dividing the standard deviation of those statistics by the square root of the sample size.\n\nSE = \\frac{\\sigma}{\\sqrt n}\n\n\\sigma \\rightarrow \\;\\text{Standard Deviation of the sample statistic.}\n\nn \\rightarrow \\;\\text{Number of the samples taken}\n\n`\n`\n**Output:**\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Standard Error",
          "snippet": "means = []\n\n# getting all the mean values also\n# taking account of number of times they occur\nfor key in sample_freq.keys():\n    for _ in range(sample_freq[key]):\n        means.append(key)\n\n# Applying standard error formula\nse = np.std(means)/np.sqrt(len(means))\nprint(f'Standard Error of the samples is {se}.')"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Sampling Distributions in Python",
      "initialCode": "import numpy as np\nnum = np.arange(10)\nnum",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-sampling-dist.py ...",
        "[INFO] Loaded module for: Sampling Distributions in Python",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Sampling Distributions in Python?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Sampling Distributions in Python workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Sampling Distributions in Python is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-hypothesis-testing": {
    "id": "ds-hypothesis-testing",
    "badge": "Module 4 • Data Science",
    "readingTime": "32 min read",
    "level": "Advanced",
    "title": "Understanding Hypothesis Testing",
    "subtitle": "In-depth guide to Understanding Hypothesis Testing — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Hypothesis testing compares two opposite ideas about a group of people or things and uses data from a small part of that group (a sample) to decide which idea is more likely true. We collect and study the sample data to check if the claim is correct.\n\nHypothesis TestingFor example, if a company says its website gets 50 visitors each day on average, we use hypothesis testing to look at past visitor data and see if this claim is true or if the actual number is different.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Understanding Hypothesis Testing."
        }
      },
      {
        "title": "2. Defining Hypotheses",
        "content": "- **Null Hypothesis (H₀): **The starting assumption. For example, \"The average visits are 50.\"\n- **Alternative Hypothesis (H₁): **The opposite, saying there is a difference. For example, \"The average visits are not 50.\""
      },
      {
        "title": "3. Key Terms of Hypothesis Testing",
        "content": "To understand the Hypothesis testing firstly we need to understand the key terms which are given below:\n\n- **Significance Level (α):** How sure we want to be before saying the claim is false. Usually, we choose 0.05 (5%).\n- **p-value****: **The chance of seeing the data if the null hypothesis is true. If this is less than α, we say the claim is probably false.\n- **Test Statistic: **A number that helps us decide if the data supports or rejects the claim.\n- **Critical Value: **The cutoff point to compare with the test statistic.\n- **Degrees of freedom****:** A number that depends on the data size and helps find the critical value."
      },
      {
        "title": "4. Types of Hypothesis Testing",
        "content": "It involves basically two types of testing:"
      },
      {
        "title": "1. One-Tailed Test",
        "content": "Used when we expect a change in only one direction either up or down, but not both. For example, if testing whether a new algorithm improves accuracy, we only check if accuracy increases.\n\nThere are two types of one-tailed test:\n\n- **Left-Tailed (Left-Sided) Test:** Checks if the value is less than expected. Example: H0​:\\mu \\geq 50\n\nand H1: \\mu < 50\n\n- **Right-Tailed (Right-Sided) Test**: Checks if the value is greater than expected. Example: H0 : \\mu \\leq50\n\nand H1:\\mu > 50"
      },
      {
        "title": "2. Two-Tailed Test",
        "content": "Used when we want to see if there is a difference in either direction higher or lower. For example, testing if a marketing strategy affects sales, whether it goes up or down\n\n**Example: **H0: \\mu = 50 and H1: \\mu \\neq 50\n\nTo go deeper into differences into both types of test: Refer to link"
      },
      {
        "title": "7. What are Type 1 and Type 2 errors in Hypothesis Testing?",
        "content": "In hypothesis testing Type I and Type II errors are two possible errors that can happen when we are finding conclusions about a population based on a sample of data. These errors are associated with the decisions we made regarding the null hypothesis and the alternative hypothesis.\n\n- **Type I error:** When we reject the null hypothesis although that hypothesis was true. Type I error is denoted by alpha(\\alpha\n\n).\n- **Type II errors****:** When we fail to reject the null hypothesis even though it is false, Type II errors are denoted by beta(\\beta\n\n).\n\nNull Hypothesis is True\n\nNull Hypothesis is False\n\nFail to Reject Null Hypothesis\n\nCorrect Decision\n\nType II Error (False Negative)\n\nAlternative Hypothesis is True (Reject)\n\nType I Error (False Positive)\n\nCorrect Decision"
      },
      {
        "title": "8. How does Hypothesis Testing work?",
        "content": "Working of Hypothesis testing involves various steps:\n\nSteps of Hypothesis Testing"
      },
      {
        "title": "9. Step 1: Define Hypotheses:",
        "content": "- **Null hypothesis (H₀):** Assumes no effect or difference.\n- **Alternative hypothesis (H₁): **Assumes there is an effect or difference.**Example: **Test if a new algorithm improves user engagement.\n\n**Note**: In this we assume that our data is **normally distributed**."
      },
      {
        "title": "10. Step 2: Choose significance level",
        "content": "We select a significance level (usually 0.05). This is the maximum chance we accept of wrongly rejecting the null hypothesis (Type I error). It also sets the confidence needed to accept results."
      },
      {
        "title": "11. Step 3: Collect and Analyze data.",
        "content": "- Now we gather data this could come from user observations or an experiment. Once collected we analyze the data using appropriate statistical methods to calculate the test statistic.\n- **Example**: We collect data on user engagement before and after implementing the algorithm. We can also find the mean engagement scores for each group."
      },
      {
        "title": "12. Step 4: Calculate Test Statistic",
        "content": "The test statistic measures how much the sample data deviates from what we did expect if the null hypothesis were true. Different tests use different statistics:\n\n- **Z-test****:** Used when population variance is known and sample size is large.\n- **T-test****:** Used when sample size is small or population variance unknown.\n- **Chi-square test****:** Used for categorical data to compare observed vs. expected counts."
      },
      {
        "title": "13. Step 5: Make a Decision",
        "content": "We compare the test statistic to a critical value from a statistical table or use the p-value:\n\n**1. Using Critical Value:**\n\n- If test statistic > critical value → reject H0​.\n- If test statistic ≤ critical value → fail to reject H0​.**2. Using P-value:**\n\n- If p-value ≤ α → reject H0​.\n- If p-value > α → insufficient evidence to reject H0​, not proof that H0​ is true.Example: If p-value is 0.03 and α is 0.05, we reject the null hypothesis because 0.03 < 0.05."
      },
      {
        "title": "14. Step 6: Interpret the Results",
        "content": "Based on the decision, we conclude whether there is enough evidence to support the alternative hypothesis or if we fail to reject the null hypothesis."
      },
      {
        "title": "15. Real life Examples of Hypothesis Testing",
        "content": "A pharmaceutical company tests a new drug to see if it lowers blood pressure in patients.\n\n**Data:**\n\n- Before Treatment: 120, 122, 118, 130, 125, 128, 115, 121, 123, 119\n- After Treatment: 115, 120, 112, 128, 122, 125, 110, 117, 119, 114"
      },
      {
        "title": "16. Step 1: Define the Hypothesis",
        "content": "- **Null Hypothesis**: (H0)The new drug has no effect on blood pressure.\n- **Alternate Hypothesis**: (H1)The new drug has an effect on blood pressure."
      }
    ],
    "playground": {
      "title": "Python Lab: Understanding Hypothesis Testing",
      "initialCode": "import numpy as np\nfrom scipy import stats\n\nb = np.array([120, 122, 118, 130, 125, 128, 115, 121, 123, 119])\na = np.array([115, 120, 112, 128, 122, 125, 110, 117, 119, 114])\n\nalpha = 0.05\n\nt_stat, p_val = stats.ttest_rel(a, b)\n\nm = np.mean(a - b)\ns = np.std(a - b, ddof=1)\nn = len(b)\nt_manual = m / (s / np.sqrt(n))\n\ndecision = \"Reject\" if p_val <= alpha else \"Fail to reject\"\nconcl = \"Significant difference.\" if decision == \"Reject\" else \"No significant difference.\"\n\nprint(\"T:\", t_stat)\nprint(\"P:\", p_val)\nprint(\"T manual:\", t_manual)\nprint(f\"Decision: {decision} H0 at α={alpha}\")\nprint(\"Conclusion:\", concl)",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-hypothesis-testing.py ...",
        "[INFO] Loaded module for: Understanding Hypothesis Testing",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Understanding Hypothesis Testing?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Understanding Hypothesis Testing workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Understanding Hypothesis Testing is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-t-test-z-test": {
    "id": "ds-t-test-z-test",
    "badge": "Module 4 • Data Science",
    "readingTime": "20 min read",
    "level": "Advanced",
    "title": "T-Test and Z-Test in Data Science",
    "subtitle": "In-depth guide to T-Test and Z-Test in Data Science — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- The t-test is used to compare the averages of two groups to see if they are significantly different from each other. Suppose you want to compare the test scores of two groups of students:\n\n- **Group 1: **30 students who studied with Method A.\n- **Group 2: **30 students who studied with Method B.We use a t-test to check if there is a significant difference in the average test scores between the two.\n\nT testIn a t-test, we start by assuming that both groups have the same average (this is called the null hypothesis). Then, we use the test to check if the difference we see is real or just due to chance. If it is not due to chance, we conclude that the groups are actually different.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of T-Test and Z-Test in Data Science."
        }
      },
      {
        "title": "2. Assumptions in T-test",
        "content": "- **Independence**: The observations within each group must be independent of each other means that the value of one observation should not influence the value of another observation.\n- **Normality**: The data within each group should be approximately normally distributed i.e., the data within each group being compared should resemble a normal bell-shaped distribution.\n- **Homogeneity of Variances**: The variances of the two groups being compared should be equal. This assumption ensures that the groups have a similar spread of values.\n- **Absence of Outliers: **There should be no outliers in the data as outliers can influence the results especially when sample sizes are small."
      },
      {
        "title": "3. Types of T-tests",
        "content": "There are three types of t-tests and they are categorized as dependent and independent t-tests.\n\nTypes of t-test"
      },
      {
        "title": "1. One sample T-test",
        "content": "One sample t-test is used for comparison of the sample mean of the data to a particularly given value. We can use this when the population standard deviation is unknown and the data is approximately normally distributed.** **It can be calculated as:.\n\nOne sample t-test**Example:** The weights of 25 obese people were taken before enrolling them into the nutrition camp. The population mean weight is found to be 45 kg before starting the camp. After finishing the camp for the same 25 people the sample mean was found to be 75 with a standard deviation of 25. Did the fitness camp work?"
      },
      {
        "title": "5. Python Implementation",
        "content": "Before its implementation we should have some basic knowledge about numpy and scipy.\n\n`\n`\n**Output**:\n\n**T-Statistic: 6.0\nCritical t-value: 1.7108820799094275\nP-Value: 1.703654035845048e-06\nWith T-value :\nSignificant difference. Camp had effect.\nWith P-value :\nNo significant difference. Camp had no effect.\n\nInterpretation**\n\n- T-value (6.0) is much greater than the critical t-value (1.71), so we reject the null hypothesis.\n- The P-value (0.0000017) is much smaller than 0.05, also indicating a significant result.The fitness camp had a significant effect on participants weights, causing a measurable change.",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Python Implementation",
          "snippet": "import scipy.stats as stats\nimport numpy as np\n\npopu_mean = 45\ns_mean = 75\ns_std = 25\ns_size = 25\n\nt_stat = (s_mean - popu_mean) / (s_std / np.sqrt(s_size))\ndf = s_size - 1\nalpha = 0.05\ncr_t = stats.t.ppf(1 - alpha, df)\n\np_v = 1 - stats.t.cdf(t_stat, df)\n\nprint(\"T-Statistic:\", t_stat)\nprint(\"Critical t-value:\", cr_t)\nprint(\"P-Value:\", p_v)\n\nprint('With T-value :')\nif t_stat > cr_t:\n    print(\"Significant difference. Camp had effect.\")\nelse:\n    print(\"No significant difference. Camp had no effect.\")\n\nprint('With P-value :')\nif p_v < alpha:\n    print(\"Significant difference. Camp had effect.\")\nelse:\n    print(\"No significant difference. Camp had no effect.\")"
        }
      },
      {
        "title": "2. Independent sample T-test",
        "content": "An Independent sample t-test commonly known as an unpaired sample t-test is used to find out if the differences found between two groups is actually significant or just a random occurrence. We can use this when:\n\n- the population mean or standard deviation is unknown. (information about the population is unknown)\n- the two samples are separate/independent. For i.e. boys and girls (the two are independent of each other)It can be calculated using:\n\n**Let's Take a example to understand**\n\nResearchers want to see if two teaching methods, A and B, produce different exam scores. Samples for both methods are collected independently.\n\nSample A (Teaching Method A): 78,84,92,88,75,80,85,90,87,79,78,84,92,88,75,80,85,90,87,79\nSample B (Teaching Method B): 82,88,75,90,78,85,88,77,92,80,82,88,75,90,78,85,88,77,92,80"
      },
      {
        "title": "7. Python Implementation",
        "content": "`\n`\n**Output:**\n\n**T-value: -0.008275847896130646\nP-Value: 0.9934425963209128\nCritical t-value: 2.0280940009804502\nT-test Result:\nNo significant difference.\nP-test Result:\nFail to reject H0. No strong evidence of difference.\n\nInterpretation**\n\n- T-value (0.989) is less than the critical t-value (2.1009), so we fail to reject the null hypothesis.\n- P-value (0.336) is greater than 0.05, meaning no significant difference.There is no statistically significant difference between exam scores of Teaching Method A and Teaching Method B.",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Python Implementation",
          "snippet": "from scipy import stats\nimport numpy as np\n\nA = np.array([78,84,92,88,75,80,85,90,87,79,78,84,92,88,75,80,85,90,87,79])\nB = np.array([82,88,75,90,78,85,88,77,92,80,82,88,75,90,78,85,88,77,92,80])\n\nt_val, p_val = stats.ttest_ind(A, B)\n\nalpha = 0.05\ndf = len(A)+len(B)-2\n\ncrit_t = stats.t.ppf(1 - alpha/2, df)\n\nprint(\"T-value:\", t_val)\nprint(\"P-Value:\", p_val)\nprint(\"Critical t-value:\", crit_t)\n\nprint('T-test Result:')\nif np.abs(t_val) >crit_t:\n    print('Significant difference found.')\nelse:\n    print('No significant difference.')\n\nprint('P-test Result:')\nif p_val < alpha:\n    print('Fail to reject H0. No strong evidence of difference.')\nelse:\n    print('Reject H0. Significant difference found.')"
        }
      },
      {
        "title": "3. Paired Two-sample T-test",
        "content": "Paired sample t-test also known as dependent sample t-test is used to find out if the difference in the mean of two samples is 0. The test is done on dependent samples usually focusing on a particular group of people or things. In this each entity is measured twice resulting in a pair of observations.\n\nWe can use this when**:**\n\n- Two similar samples are given. [i.e. Scores obtained in English and Math (both subjects)]\n- The dependent variable data is continuous.\n- The observations are independent of one another.\n- The dependent variable is approximately normally distributed.It can be calculated using\n\npaired t-test**Example Problem**\n\nConsider the following example. Scores (out of 25) of the subjects Math1 and Math2 are taken for a sample of 10 students. We have to perform the paired sample t-test for this data.\n\nMath1: 4, 4, 7, 16, 20, 11, 13, 9, 11, 15\nMath2: 15, 16, 14, 14, 22, 22, 23, 18, 18, 19"
      },
      {
        "title": "9. Python Implementation",
        "content": "`\n`\n**Output**:\n\nT-value: -4.953488372093023\nP-Value: 0.0007875235561560145\nCritical t-value: 2.2621571628540993\nT-test:\nSignificant difference found.\nP-test:\nFail to reject H0",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Python Implementation",
          "snippet": "from scipy import stats\nimport numpy as np\n\nA = np.array([4, 4, 7, 16, 20, 11, 13, 9, 11, 15])\nB = np.array([15, 16, 14, 14, 22, 22, 23, 18, 18, 19])\n\nt_val, p_val = stats.ttest_rel(A, B)\n\nalpha = 0.05\ndf = len(A)-1\n\nc_t = stats.t.ppf(1 - alpha/2, df)\n\nprint(\"T-value:\", t_val)\nprint(\"P-Value:\", p_val)\nprint(\"Critical t-value:\", c_t)\n\nprint('T-test:')\nif np.abs(t_val) >c_t:\n    print('Significant difference found.')\nelse:\n    print('No significant difference.')\n\nprint('P-test:')\nif p_val < alpha:\n    print('Reject H0')\nelse:\n    print('Fail to reject H0')"
        }
      },
      {
        "title": "10. Interpretation",
        "content": "- T-value is very close to 0 and much less than the critical t-value, so we fail to reject the null hypothesis.\n- The P-value is much greater than 0.05, indicating no significant difference.There is a significant difference between Math1 and Math2 scores. The difference is unlikely due to chance."
      }
    ],
    "playground": {
      "title": "Python Lab: T-Test and Z-Test in Data Science",
      "initialCode": "import scipy.stats as stats\nimport numpy as np\n\npopu_mean = 45\ns_mean = 75\ns_std = 25\ns_size = 25\n\nt_stat = (s_mean - popu_mean) / (s_std / np.sqrt(s_size))\ndf = s_size - 1\nalpha = 0.05\ncr_t = stats.t.ppf(1 - alpha, df)\n\np_v = 1 - stats.t.cdf(t_stat, df)\n\nprint(\"T-Statistic:\", t_stat)\nprint(\"Critical t-value:\", cr_t)\nprint(\"P-Value:\", p_v)\n\nprint('With T-value :')\nif t_stat > cr_t:\n    print(\"Significant difference. Camp had effect.\")\nelse:\n    print(\"No significant difference. Camp had no effect.\")\n\nprint('With P-value :')\nif p_v < alpha:\n    print(\"Significant difference. Camp had effect.\")\nelse:\n    print(\"No significant difference. Camp had no effect.\")",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-t-test-z-test.py ...",
        "[INFO] Loaded module for: T-Test and Z-Test in Data Science",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of T-Test and Z-Test in Data Science?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for T-Test and Z-Test in Data Science workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "T-Test and Z-Test in Data Science is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-chi-square-anova": {
    "id": "ds-chi-square-anova",
    "badge": "Module 4 • Data Science",
    "readingTime": "26 min read",
    "level": "Advanced",
    "title": "Chi-Square Test & One-Way ANOVA",
    "subtitle": "In-depth guide to Chi-Square Test & One-Way ANOVA — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Chi-Square test helps us determine if there is a significant relationship between two categorical variables. It is a non-parametric statistical test meaning it doesn’t follow normal distribution.\n\nExample of Chi-square testThe Chi-square test compares the observed frequencies (actual data) to the expected frequencies (what we would expect if there was no relationship). This helps identify which features are important for predicting the target variable in machine learning models.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Chi-Square Test & One-Way ANOVA."
        }
      },
      {
        "title": "2. Formula for Chi-square test",
        "content": "Chi-square statistic is calculated as:\n\n**\\chi^2 = \\sum \\frac{(O_i - E_i)^2}{E_i}\n\nwhere,\n\n- c is degree of freedom\n- O_{i} is the observed frequency in cell {i}\n- E_{i} is the expected frequency in cell {i}Often used with non-normally distributed data.** Before we jump into calculations. let's understand some important terms:\n\n- **Observed Values (O): **Actual counts from the data.\n- **Expected Values (E): **Counts expected if variables are independent.\n- **Contingency Table: **A table showing counts of two categorical variables.\n- **Degrees of Freedom (df): **Number of independent values, helps find critical values."
      },
      {
        "title": "3. Types of Chi-Square test",
        "content": "The two main types are the chi-square test for independence and the chi-square goodness-of-fit test.\n\nTypes of chi-square tests**1. Chi-Square Test for Independence:** This test is used whether there is a significant relationship between two categorical variables.\n\n- This test is applied when we have counts of values for two nominal or categorical variables.\n- To conduct this test two requirements must be met: independence of observations and a relatively large sample size.\n- We test if shopping preference (Electronics, Clothing, Books) is related to payment method (Credit Card, Debit Card, PayPal). The **null hypothesis** assumes no relationship between them. **2. Chi-Square Goodness-of-Fit Test:** The Chi-Square Goodness-of-Fit test is used to check if a variable follows a specific expected pattern or distribution.\n\n- This test is used with counts of categorical data to see if the observed values match what we expect based on a hypothesis. It helps determine if the data represents the whole population well.\n- For example, when testing if a six-sided die is fair, the null hypothesis assumes each face has an equal chance of landing face up meaning the die is unbiased and all sides occur equally often."
      },
      {
        "title": "4. Steps to perform Chi-square test",
        "content": "**Step 1: Define Your Hypotheses**\n\n- **Null Hypothesis (H₀):** The two variables are **independent** (no relationship).\n- **Alternative Hypothesis (H₁):** The two variables are **related** (there is a relationship).**Step 2: Create a Contingency Table**: This is simply a table that displays the frequency distribution of the two categorical variables.\n\n**Step 3: Calculate Expected Values: **To find the expected value for each cell use this formula:\n\n**E_{i} = \\frac{(Row\\ Total \\times Column\\ Total)}{Grand\\ Total}\n\nStep 4: Compute the Chi-Square Statistic: ** Now use the Chi-Square formula:\n\n**\\chi^2 = \\sum \\frac{(O_{i} - E_{i})^2}{E_{i}}\n\nwhere:**\n\n- **O****i** = Observed value\n- **E****i **= Expected valueIf the observed and expected values are very different the Chi-Square value will be high which indicate a strong relationship.\n\n**Step 5:** Compare with the Critical Value:\n\n- If \\chi^2 >** critical value** → Reject H₀ (There is a relationship).\n- If \\chi^2 < **critical value** → Fail to reject H₀ (No relationship)."
      },
      {
        "title": "5. Uses of the Chi-Square Test",
        "content": "The Chi-Square Test helps us find relationships or differences between categories. Its main uses are:\n\n- **Feature Selection in Machine Learning:** It helps decide if a categorical feature (like color or product type) is important for predicting the target (like sales or satisfaction), improving model performance.\n- **Testing Independence:** It checks if two categorical variables are related or independent. For example, whether age or gender affects product preferences.\n- **Assessing Model Fit:** It helps check if a model’s predicted categories match the actual data, which is useful to improve classification models."
      },
      {
        "title": "6. Example: Income Level vs Subscription Status",
        "content": "Let us examine a dataset with features including \"income level\" (low, medium, high) and \"subscription status\" (subscribed, not subscribed) indicate whether a customer subscribed to a service. The goal is to determine if this feature is relevant for predicting subscription status."
      },
      {
        "title": "7. Step 1: Make Hypothesis",
        "content": "- Null hypothesis: No significant association between features\n- Alternate Hypothesis: There is a significant association between features."
      },
      {
        "title": "8. Step 2: Contingency table",
        "content": "Income Level\n\nSubscribed\n\nNot subscribed\n\nRow Total\n\nLow\n\n20\n\n30\n\n**50**\n\nMedium\n\n40\n\n25\n\n65\n\nHigh\n\n10\n\n15\n\n25\n\nColumn Total\n\n**70**\n\n70\n\n**140**"
      },
      {
        "title": "9. Step 3: Now calculate the expected frequencies",
        "content": "For example the expected frequency for \"Low Income\" and \"Subscribed\" would be:\n\n- As Total count for each row R_i is 70 and each column C_j is 70 and Total number of observations are 140.\n- Low Income, subscribed=(50 \\times 70) \\div140 = 25Similarly we can find expected frequencies for other aspects as well:\n\nSubscribed\n\nNot Subscribed\n\nLow Income\n\n25\n\n25\n\nMedium Income\n\n32.5\n\n32.5\n\nHigh Income\n\n12.5\n\n12.5"
      },
      {
        "title": "10. Step 4: Calculate the Chi-Square Statistic",
        "content": "Let's summarize the observed and expected values into a table and calculate the Chi-Square value:\n\nSubscribed (O)\n\nNot Subscribed (O)\n\nSubscribed (E)\n\nNot Subscribed (E)\n\nLow Income\n\n20\n\n30\n\n25\n\n25\n\nMedium Income\n\n40\n\n25\n\n32.5\n\n32.5\n\nHigh Income\n\n10\n\n15\n\n12.5\n\n12.5\n\nNow using the formula specified in equation 1 we can get our chi-square statistic values in the following manner:\n\nχ² = (20-25)²/25 + (30-25)²/25 + (40-32.5)²/32.5 + (25-32.5)²/32.5 + (10-12.5)²/12.5 + (15-12.5)²/12.5= 6.462"
      },
      {
        "title": "11. Step 5: Degrees of Freedom",
        "content": "\\text{Degrees of Freedom (df)} = (3 - 1) \\times (2 - 1) = 2"
      },
      {
        "title": "12. Step 6: Interpretations",
        "content": "Now compare the calculated \\chi^2 alue (6.462) with the critical value for 2 degrees of freedom. The critical value can be obtained either from a standard Chi-square distribution table or by using Python’s stats.chi2.ppf() function. If the calculated \\chi^2 is greater than the critical value, then we reject the null hypothesis.\n\nBefore its implementation we should have some basic knowledge about numpy, matplotlib and scipy.\n\n`\n`\n**Output:**\n\nFor df = 2 and significance level \\alpha = 0.05, the critical value is 5.991.\n\n- Since 6.462 > 5.991, we reject the null hypothesis.\n- **Conclusion:** There is a significant association between income level and subscription status.",
        "code": {
          "language": "python",
          "caption": "Python Example — 12. Step 6: Interpretations",
          "snippet": "import numpy as np\nimport matplotlib.pyplot as plt\nimport scipy.stats as stats\n\ndf = 2\nalpha = 0.05\n\ncritical_value = stats.chi2.ppf(1 - alpha, df)\ncritical_value"
        }
      },
      {
        "title": "13. Visualizing Chi-Square Distribution",
        "content": "`\n`\n**Output:**\n\nChi-square DistributionIn this example The green dashed line represents the critical value the threshold beyond which you would reject the null hypothesis.\n\n- The red dashed line represents the critical value (5.991) for a significance level of 0.05 with 2 degrees of freedom.\n- The shaded area to the right of the critical value represents the rejection region. If the calculated Chi-Square statistic falls within this shaded area then you would reject the null hypothesis.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 13. Visualizing Chi-Square Distribution",
          "snippet": "import numpy as np\nimport matplotlib.pyplot as plt\nimport scipy.stats as stats\n\ndf = 2\nalpha = 0.05\nc_val = stats.chi2.ppf(1 - alpha, df)\ncal_chi_s = 3.747\n\nx = np.linspace(0, 10, 1000)\ny = stats.chi2.pdf(x, df)\n\nplt.plot(x, y, label='Chi-Square Distribution (df=2)')\nplt.fill_between(x, y, where=(x > c_val), color='red', alpha=0.5, label='Critical Region')\nplt.axvline(cal_chi_s, color='blue', linestyle='dashed', label='Calculated Chi-Square')\nplt.axvline(c_val, color='green', linestyle='dashed', label='Critical Value')\nplt.title('Chi-Square Distribution and Critical Region')\nplt.xlabel('Chi-Square Value')\nplt.ylabel('Probability Density Function')\nplt.legend()\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Chi-Square Test & One-Way ANOVA",
      "initialCode": "import numpy as np\nimport matplotlib.pyplot as plt\nimport scipy.stats as stats\n\ndf = 2\nalpha = 0.05\n\ncritical_value = stats.chi2.ppf(1 - alpha, df)\ncritical_value",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-chi-square-anova.py ...",
        "[INFO] Loaded module for: Chi-Square Test & One-Way ANOVA",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Chi-Square Test & One-Way ANOVA?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Chi-Square Test & One-Way ANOVA workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Chi-Square Test & One-Way ANOVA is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-viz-line-bar": {
    "id": "ds-viz-line-bar",
    "badge": "Module 5 • Data Science",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Line Charts & Bar Plots in Matplotlib",
    "subtitle": "In-depth guide to Line Charts & Bar Plots in Matplotlib — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- A line chart in Matplotlib is used to display data points connected by straight lines. It is commonly used to visualize trends, changes, or patterns in data over a sequence, such as days, months, or years. Line charts make it easy to compare values and observe how data changes over time.\n\n**Example:** In the example below, we create a basic line chart to display the relationship between the x-axis and y-axis values using the plot() function.\n\n`\n`\n**Output**\n\nA line chart displaying the points (1,2), (2,4), (3,3), (4,5), and (5,7) connected by straight lines.**Explanation:** plot() function creates a line chart by connecting the values in the x and y lists with straight lines. Finally, show() displays the chart on the screen.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 3, 5, 7]\nplt.plot(x, y)\nplt.show()"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Line Charts & Bar Plots in Matplotlib."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**matplotlib.pyplot.plot(x, y, color=None, linestyle='-', linewidth=1, marker=None, label=None)\n\nParameters:**\n\n- **x:** Values to be displayed on the x-axis.\n- **y:** Values to be displayed on the y-axis.\n- **color:** Specifies the color of the line (for example, 'red', 'blue', 'green').\n- **linestyle: **Defines the style of the line, such as solid ('-'), dashed ('--'), dotted (':'), or dash-dot ('-.').\n- **linewidth: **Sets the thickness of the line.\n- **marker:** Displays a marker at each data point (such as 'o', 's', '^', '*').\n- **label:** Specifies a label for the plotted line, which is displayed when using legend()."
      },
      {
        "title": "3. Adding Labels and Title",
        "content": "Axis labels and a title make the chart easier to understand by describing the data being displayed.\n\n`\n`\n**Output**\n\nSimple line plot with axis labels and title.**Explanation:** xlabel(), ylabel() and title() functions add descriptive text to the x-axis, y-axis, and chart title.",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Adding Labels and Title",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array([1, 2, 3, 4])\ny = x * 2\n\nplt.plot(x, y)\nplt.xlabel(\"X-axis\")\nplt.ylabel(\"Y-axis\")\nplt.title(\"Simple Line Plot with Labels\")\nplt.show()"
        }
      },
      {
        "title": "4. Using Markers",
        "content": "Markers highlight individual data points on a line chart, making them easier to identify.\n\n`\n`\n**Output**\n\nMarkers in Line Plots**Explanation:** marker parameter places a symbol at each data point while the line connects all points.",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Using Markers",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array([1, 2, 3, 4, 5])\ny = [3, 6, 9, 12, 15]\n\nplt.plot(x, y, marker='o', linestyle='-', label='Data Points')\nplt.xlabel(\"X-axis\")\nplt.ylabel(\"Y-axis\")\nplt.title(\"Line Plot with Markers\")\nplt.legend()\nplt.show()"
        }
      },
      {
        "title": "5. Adding a Grid",
        "content": "A grid improves readability by making it easier to compare data values with the axes.\n\n`\n`\n**Output**\n\nGrid**Explanation:** grid(True) function displays horizontal and vertical grid lines on the plot.",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Adding a Grid",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [1, 4, 9, 16]\n\nplt.plot(x, y)\nplt.grid(True)\nplt.xlabel(\"X-axis\")\nplt.ylabel(\"Y-axis\")\nplt.title(\"Line Plot with Grid\")\nplt.show()"
        }
      },
      {
        "title": "6. Line Chart with Annotations",
        "content": "For adding annotations to a line chart you can use the annotate() function. This function allows you to display additional information such as the exact x and y values directly on the data points, improving clarity and data interpretation.\n\n`\n`\n**Output**\n\nLine chart with annotated data points.**Explanation:** annotate() function displays the coordinate value above each data point.",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Line Chart with Annotations",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\n\nplt.figure(figsize=(8, 6))\nplt.plot(x, y, marker='o', linestyle='-')\n\nfor xi, yi in zip(x, y):\n    plt.annotate(f'({xi}, {yi})',\n                 (xi, yi),\n                 textcoords=\"offset points\",\n                 xytext=(0, 10),\n                 ha='center')\n\nplt.title('Line Chart with Annotations')\nplt.xlabel('X-axis')\nplt.ylabel('Y-axis')\nplt.grid(True)\nplt.show()"
        }
      },
      {
        "title": "7. Multiple Line Charts",
        "content": "To create multiple line charts in separate containers you can use the figure() function. Each call to figure() generates a new plotting area, making it easier to visualize and compare different datasets independently.\n\n`\n`\n**Output**\n\nMultiple Line Charts**Explanation:** figure() function creates a new figure so that each line chart is displayed separately.",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Multiple Line Charts",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array([1, 2, 3, 4])\ny = x * 2\n\nplt.plot(x, y)\nplt.title(\"First Line Chart\")\nplt.show()\n\nplt.figure()\nx1 = [2, 4, 6, 8]\ny1 = [3, 5, 7, 9]\nplt.plot(x1, y1, '-.')\nplt.title(\"Second Line Chart\")\nplt.show()"
        }
      },
      {
        "title": "8. Multiple Plots on Same Axis",
        "content": "To plot multiple lines on the same axis, you can call the plot() function multiple times before displaying the graph. This approach is useful for comparing different datasets within the same coordinate system.\n\n`\n`\n**Output**\n\nMultiple Plots on the Same Axis**Explanation:** Calling plot() multiple times before show() draws multiple lines on the same graph. The legend() function identifies each line.",
        "code": {
          "language": "python",
          "caption": "Python Example — 8. Multiple Plots on Same Axis",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array([1, 2, 3, 4])\ny = x * 2\n\nx1 = [2, 4, 6, 8]\ny1 = [3, 5, 7, 9]\n\nplt.plot(x, y, label='y = 2x')\nplt.plot(x1, y1, '-.', label='Second Line')\n\nplt.xlabel(\"X-axis data\")\nplt.ylabel(\"Y-axis data\")\nplt.title(\"Multiple Plots on Same Axis\")\nplt.legend()\nplt.show()"
        }
      },
      {
        "title": "9. Fill Area Between Two Lines",
        "content": "To fill the region between two line plots, you can use the fill_between() function. This function shades the area between two curves, helping visualize the difference or range between datasets.\n\n`\n`\n**Output**\n\nFilled Area Between Two Lines**Explanation:** fill_between() function shades the region enclosed by the two line plots.",
        "code": {
          "language": "python",
          "caption": "Python Example — 9. Fill Area Between Two Lines",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nx = np.array([1, 2, 3, 4])\ny = x * 2\ny1 = [3, 5, 7, 9]\n\nplt.plot(x, y, label='y = 2x')\nplt.plot(x, y1, '-.', label='y1')\nplt.fill_between(x, y, y1, color='green', alpha=0.4)\n\nplt.xlabel(\"X-axis data\")\nplt.ylabel(\"Y-axis data\")\nplt.title(\"Filled Area Between Two Lines\")\nplt.legend()\nplt.show()"
        }
      },
      {
        "title": "10. Saving a Line Chart",
        "content": "Instead of displaying a plot you can save it as an image using the savefig() function.\n\n`\n`\n**Output**\n\nSaved Line Chart**Explanation:** savefig() function saves the current figure to an image file before or after displaying it.",
        "code": {
          "language": "python",
          "caption": "Python Example — 10. Saving a Line Chart",
          "snippet": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4]\ny = [2, 4, 6, 8]\n\nplt.plot(x, y)\nplt.title(\"Saved Line Plot\")\nplt.savefig(\"line_plot.png\")\nplt.show()"
        }
      },
      {
        "title": "11. Plotting Trigonometric Functions",
        "content": "Trigonometric functions such as sine, cosine and tangent can be visualized using plt.plot() by generating input values over a continuous range. The numpy.linspace() function creates evenly spaced values, allowing smooth and accurate curves.\n\n`\n`\n**Output**\n\nSine and cosine functions**Explanation:** linspace() function generates evenly spaced x-values, while sin() and cos() compute the corresponding y-values. Both functions are displayed on the same line chart for comparison.\n\nYou can download full code from here.\n\nComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 11. Plotting Trigonometric Functions",
          "snippet": "import numpy as np\nimport matplotlib.pyplot as plt\n\nx = np.linspace(0, 2 * np.pi, 100)\ny_sin = np.sin(x)\ny_cos = np.cos(x)\n\nplt.plot(x, y_sin, label=\"sin(x)\")\nplt.plot(x, y_cos, label=\"cos(x)\")\nplt.xlabel(\"X values\")\nplt.ylabel(\"Function value\")\nplt.title(\"Trigonometric Functions\")\nplt.legend()\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Line Charts & Bar Plots in Matplotlib",
      "initialCode": "import matplotlib.pyplot as plt\n\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 3, 5, 7]\nplt.plot(x, y)\nplt.show()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-viz-line-bar.py ...",
        "[INFO] Loaded module for: Line Charts & Bar Plots in Matplotlib",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Line Charts & Bar Plots in Matplotlib?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Line Charts & Bar Plots in Matplotlib workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Line Charts & Bar Plots in Matplotlib is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-viz-histogram-kde": {
    "id": "ds-viz-histogram-kde",
    "badge": "Module 5 • Data Science",
    "readingTime": "6 min read",
    "level": "Advanced",
    "title": "Histograms & KDE Distribution Plots",
    "subtitle": "In-depth guide to Histograms & KDE Distribution Plots — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- matplotlib.pyplot.hist() function is used to create histograms, which are graphical representations of data distribution. It divides the data into bins (non-overlapping intervals) and counts the frequency of values in each bin, plotting them as bars.\n\nLets consider the data values and visualise histogram with help of an example:\n\n`\n`\n**Output**\n\nHistogram with hist() with default parameters",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import matplotlib.pyplot as plt\n\ndata = [32, 96, 45, 67, 76, 28, 79, 62, 43, 81, 70,61, 95, 44, 60, 69, 71, 23\n       ,69, 54, 76, 67,82, 97, 26, 34, 18, 16, 59, 88, 29, 30, 66,23, 65, 72, \n       20, 78, 49, 73, 62, 87, 37, 68,81, 80, 77, 92, 81, 52, 43, 68, 71, 86]\nplt.hist(data)\nplt.show()"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Histograms & KDE Distribution Plots."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**matplotlib.pyplot.hist(x, bins=None, range=None, density=False, histtype='bar', color=None, label=None)\n\nParameters:**\n\n- x: data to be represented in the histogram.\n- bins: Specifies the number of bins or the bin edges for the histogram.\n- range: The lower and upper range of the bins.\n- density: If True, the histogram is normalized to form a probability density.\n- histtype: Defines the type of histogram (e.g., 'bar' for a traditional bar histogram).\n- color: Sets the color of the bars.\n- label: Label for the histogram, used in legends."
      },
      {
        "title": "3. Create a Histogram in Matplotlib",
        "content": "**Example 1:** In this example, we will create a histogram and pass the necessary parameters such as bins, color, density, etc.\n\n`\n`\n**Output**\n\nCreating the histogram**Note:** In this example, density=True is used in plt.hist(). When this parameter is enabled, histogram is normalized and y-axis represents probability density instead of frequency counts. Because of this, values on the vertical axis may appear as decimal numbers instead of whole numbers.\n\n**Example 2: **In this example, we will create a histogram with different attributes using matplotlib.pyplot.hist() function. We define a specific set of colors for the bars of the histogram bars.\n\n`\n`\n**Output**\n\ndifferent color bars in matplot.pyplot.hist()Comment",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Create a Histogram in Matplotlib",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nmu, sigma = 121, 21\nx = np.random.normal(mu, sigma, 1000)\n\nnum_bins = 100\nn, bins, _ = plt.hist(x, num_bins, density=True, color='green', alpha=0.7)\n\nplt.xlabel('X-Axis')\nplt.ylabel('Y-Axis')\nplt.title('matplotlib.pyplot.hist() Example', fontweight='bold')\n\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Histograms & KDE Distribution Plots",
      "initialCode": "import matplotlib.pyplot as plt\n\ndata = [32, 96, 45, 67, 76, 28, 79, 62, 43, 81, 70,61, 95, 44, 60, 69, 71, 23\n       ,69, 54, 76, 67,82, 97, 26, 34, 18, 16, 59, 88, 29, 30, 66,23, 65, 72, \n       20, 78, 49, 73, 62, 87, 37, 68,81, 80, 77, 92, 81, 52, 43, 68, 71, 86]\nplt.hist(data)\nplt.show()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-viz-histogram-kde.py ...",
        "[INFO] Loaded module for: Histograms & KDE Distribution Plots",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Histograms & KDE Distribution Plots?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Histograms & KDE Distribution Plots workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Histograms & KDE Distribution Plots is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-viz-heatmap": {
    "id": "ds-viz-heatmap",
    "badge": "Module 5 • Data Science",
    "readingTime": "16 min read",
    "level": "Advanced",
    "title": "2D Heatmaps & Correlation Plots",
    "subtitle": "In-depth guide to 2D Heatmaps & Correlation Plots — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- A heatmap is a great tool for visualizing data across the surface. It highlights data that have a higher or lower concentration in the data distribution. A 2-D Heatmap is a data visualization tool that helps to represent the magnitude of the matrix in form of a colored table. In Python, we can plot 2-D Heatmaps using the Matplotlib and Seaborn packages. There are different methods to plot 2-D Heatmaps, some of which are discussed below.\n\n**Let’s see an example: **We will use the **tips** dataset which is an inbuilt dataset. This dataset contains information about restaurant tips, total bill amount, tip amount, customer details like sex and day of the week etc. Also, we will be using **Seaborn** and **Matplotlib** libraries for this.\n\n`\n`\n**Output**\n\nHeatmap",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset(\"tips\")\nheatmap_data = df.pivot_table(index=\"day\", columns=\"sex\", values=\"tip\", aggfunc=\"mean\")\nsns.heatmap(heatmap_data, annot=True, cmap=\"YlGnBu\")\nplt.show()"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of 2D Heatmaps & Correlation Plots."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**seaborn.heatmap(data, vmin=None, vmax=None, cmap=None, annot=None, fmt='.2g', linewidths=0, linecolor='white', cbar=True, square=False, **kwargs)\n\nParameters:**\n\n- `data`: Rectangular dataset (2D array, DataFrame, or similar) used to draw the heatmap.\n- `vmin`, `vmax`: Values to anchor the colormap, otherwise inferred from the data.\n- `cmap`: Colormap used to map data values to colors (e.g., \"coolwarm\", \"YlGnBu\").\n- `annot`: If `True`, write the data value in each cell; can also be a DataFrame of strings.\n- `fmt`: String formatting code to use when adding annotations.\n- `linewidths`: Width of the lines that will divide each cell.\n- `linecolor`: Color of the lines dividing the cells.\n- `cbar`: Boolean value to display the color bar.\n- `square`: If `True`, set the Axes aspect to “equal” so each cell will be square-shaped.**Returns:** It returns a **matplotlib Axes object** with the heatmap drawn onto it."
      },
      {
        "title": "3. Example 1- Different Colormaps in Heatmap Using Matplotlib",
        "content": "We can choose different colors for Heatmap using the cmap parameter. cmap can help us in making our heatmap more informative.\n\n`\n`\n**Output:**\n\nheatmap with camp parameter",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Example 1- Different Colormaps in Heatmap Using Matplotlib",
          "snippet": "# Program to plot 2-D Heat map\n# using matplotlib.pyplot.imshow() method\nimport numpy as np\nimport matplotlib.pyplot as plt\n\ndata = np.random.random((12, 12))\nplt.imshow(data, cmap='autumn')\n\nplt.title(\"Heatmap with different color\")\nplt.show()"
        }
      },
      {
        "title": "4. Example 2- Adding Colorbar to Heatmap Using Matplotlib",
        "content": "We can add a colorbar to the heatmap using plt.colorbar(). colorbar shows the weight of color relatively between a certain range.\n\n`\n`\n**Output:**\n\nHeatmap with colorbar scale",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Example 2- Adding Colorbar to Heatmap Using Matplotlib",
          "snippet": "data = np.random.random((12, 12))\nplt.imshow(data, cmap='autumn', interpolation='nearest')\n\n# Add colorbar\nplt.colorbar()\n\nplt.title(\"Heatmap with color bar\")\nplt.show()"
        }
      },
      {
        "title": "5. Example 3 - Customized Heatmap Using Matplotlib Library",
        "content": "We can customize this heatmap using different functions and parameters to make it more informative and beautiful. we will use plt.annotate() to annotate values in the heatmap. Also, we will use colors library to customize the color of the heatmap.\n\n`\n`\n**Output:**\n\nadvance customized heatmap using matplotlib library",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Example 3 - Customized Heatmap Using Matplotlib Library",
          "snippet": "import matplotlib.colors as colors\n\n# Generate random data\ndata = np.random.randint(0, 100, size=(8, 8))\n\n# Create a custom color map \n# with blue and green colors\ncolors_list = ['#0099ff', '#33cc33']\ncmap = colors.ListedColormap(colors_list)\n\n# Plot the heatmap with custom colors and annotations\nplt.imshow(data, cmap=cmap, vmin=0,\\\n           vmax=100, extent=[0, 8, 0, 8])\nfor i in range(8):\n    for j in range(8):\n        plt.annotate(str(data[i][j]), xy=(j+0.5, i+0.5),\n                     ha='center', va='center', color='white')\n\n# Add colorbar\ncbar = plt.colorbar(ticks=[0, 50, 100])\ncbar.ax.set_yticklabels(['Low', 'Medium', 'High'])\n\n# Set plot title and axis labels\nplt.title(\"Customized heatmap with annotations\")\nplt.xlabel(\"X-axis\")\nplt.ylabel(\"Y-axis\")\n\n# Display the plot\nplt.show()"
        }
      },
      {
        "title": "6. Example 4- Correlation Matrix of a Dataset Using Heatmap",
        "content": "Next, we will use a heatmap to plot the correlation between columns of the dataset. We will use correlation to find the relation between columns of the dataset.\n\n`\n`\n**Output:**\n\nCorrelation Matrix of the Dataset",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Example 4- Correlation Matrix of a Dataset Using Heatmap",
          "snippet": "import pandas as pd\nimport matplotlib.pyplot as plt\nfrom matplotlib import colors\n\ndf = pd.read_csv(\"gold_price_data.csv\")\n\n# Calculate correlation between columns\ncorr_matrix = df.corr()\n\n# Create a custom color \n# map with blue and green colors\ncolors_list = ['#FF5733', '#FFC300']\ncmap = colors.ListedColormap(colors_list)\n\n# Plot the heatmap with custom colors and annotations\nplt.imshow(corr_matrix, cmap=cmap, vmin=0\\\n           , vmax=1, extent=[0, 5, 0, 5])\nfor i in range(5):\n    for j in range(5):\n        plt.annotate(str(round(corr_matrix.values[i][j], 2)),\\\n                     xy=(j+0.25, i+0.7),\n                     ha='center', va='center', color='white')\n\n# Add colorbar\ncbar = plt.colorbar(ticks=[0, 0.5, 1])\ncbar.ax.set_yticklabels(['Low', 'Medium', 'High'])\n\n# Set plot title and axis labels\nplt.title(\"Correlation Matrix Of The Dataset\")\nplt.xlabel(\"Features\")\nplt.ylabel(\"Features\")\n\n# Set tick labels\nplt.xticks(range(len(corr_matrix.columns)),\\\n           corr_matrix.columns, rotation=90)\nplt.yticks(range(len(corr_matrix.columns)),\n           corr_matrix.columns)\n\n# Display the plot\nplt.show()"
        }
      },
      {
        "title": "7. Example 5- Heatmap Using Seaborn Library",
        "content": "We can also use the Seaborn library to plot heatmaps even plotting heatmaps using Seaborn is comparatively easier than the matplotlib library. To plot the heatmap using Seaborn we will use sns.heatmap() function from the Seaborn library.\n\n`\n`\n**Output:**\n\nHeatmap using seaborn",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Example 5- Heatmap Using Seaborn Library",
          "snippet": "# importing the modules\nimport numpy as np\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n  \n# generating 2-D 10x10 matrix of random numbers\n# from 1 to 100\ndata = np.random.randint(low=1,\n                         high=100,\n                         size=(10, 10))\n  \n# plotting the heatmap\nhm = sns.heatmap(data=data,\n                annot=True)\n  \n# displaying the plotted heatmap\nplt.show()"
        }
      },
      {
        "title": "8. Use Cases for Heatmaps",
        "content": "As we know the Heatmap is just a colored representation of a matrix. However, heatmap has a very large use case. We can use heatmaps for the following purpose.\n\n-  It is used to see the correlation between columns of a dataset where we can use a darker color for columns having a high correlation.\n-  We can also use heatmaps for plotting various time series and finance-related data where the Y-axis will be the month and X-axis will be the year and the element of the heatmap will be our data.Comment"
      }
    ],
    "playground": {
      "title": "Python Lab: 2D Heatmaps & Correlation Plots",
      "initialCode": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset(\"tips\")\nheatmap_data = df.pivot_table(index=\"day\", columns=\"sex\", values=\"tip\", aggfunc=\"mean\")\nsns.heatmap(heatmap_data, annot=True, cmap=\"YlGnBu\")\nplt.show()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-viz-heatmap.py ...",
        "[INFO] Loaded module for: 2D Heatmaps & Correlation Plots",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of 2D Heatmaps & Correlation Plots?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for 2D Heatmaps & Correlation Plots workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "2D Heatmaps & Correlation Plots is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-viz-boxplot-violin": {
    "id": "ds-viz-boxplot-violin",
    "badge": "Module 5 • Data Science",
    "readingTime": "6 min read",
    "level": "Advanced",
    "title": "Box Plots & Violin Plots for Quartile Analysis",
    "subtitle": "In-depth guide to Box Plots & Violin Plots for Quartile Analysis — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- A Box Plot (also called a Whisker Plot) is used to visualize the distribution of numerical data. It summarizes the data using the minimum value, first quartile (Q1), median, third quartile (Q3), and maximum value, making it easy to identify the spread of data and detect outliers.\n\nConsider a example where we create a basic box plot for a set of values.\n\n`\n`\n**Output**\n\n**Explanation:**\n\n- Creates a box plot for the given numerical values.\n- Displays the minimum, first quartile (Q1), median, third quartile (Q3), and maximum values.\n- Helps understand the spread and distribution of the dataset.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Overview & Core Concepts",
          "snippet": "import matplotlib.pyplot as plt\n\ndata = [12, 15, 18, 21, 24, 26, 28, 30, 35, 40]\nplt.boxplot(data)\nplt.title(\"Box Plot\")\nplt.show()"
        },
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Box Plots & Violin Plots for Quartile Analysis."
        }
      },
      {
        "title": "2. Syntax",
        "content": "**matplotlib.pyplot.boxplot(x, notch=False, vert=True, patch_artist=False, widths=None, labels=None, showmeans=False, showfliers=True)\n\nParameters:**\n\n- x: The dataset to be plotted. It can be a list, tuple, NumPy array, or a sequence of datasets.\n- **notch (optional):** Displays a notch around the median when set to True.\n- **vert (optional):** Plots the box vertically when True and horizontally when False.\n- **patch_artist (optional):** Fills the box with color when set to True.\n- **widths (optional): **Specifies the width of the box plot.\n- **labels (optional):** Adds labels to each box plot.\n- **showmeans (optional):** Displays the mean value of the dataset.\n- **showfliers (optional):** Controls whether outliers are displayed."
      },
      {
        "title": "3. Customizing Box Plots",
        "content": "Matplotlib allows you to customize different parts of a box plot to improve its appearance and readability. You can modify the orientation, add notches, fill boxes with colors, change whisker and median styles, and assign custom labels to the datasets.\n\nSome commonly used customization parameters include:\n\n- **notch=True:** Displays a notch around the median.\n- **patch_artist=True:** Fills the boxes with colors.\n- **vert=False:** Creates a horizontal box plot.\n- **labels:** Assigns custom labels to each box plot.**Example 1:** This example creates multiple box plots to compare the distribution of four different datasets.\n\n`\n`\n**Output**\n\n**Explanation:**\n\n- Generates four datasets with different distributions.\n- Displays a separate box plot for each dataset.\n- Makes it easy to compare the spread, median, and variability of the datasets.**Example 2:** This example customizes the box plot by adding notches, colors, horizontal orientation, and modifying the whiskers, median, caps, and outlier markers.\n\n`\n`\n**Output**\n\ncustomizes box plot**Explanation:**\n\n- Displays the box plots horizontally with notches around the median.\n- Fills each box with a different color for better distinction.\n- Customizes the whiskers, caps, median lines, and outlier markers.\n- Adds labels for each dataset and a title to improve readability.Comment",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Customizing Box Plots",
          "snippet": "import matplotlib.pyplot as plt\nimport numpy as np\n\nnp.random.seed(10)\n\nd_1 = np.random.normal(100, 10, 200)\nd_2 = np.random.normal(90, 20, 200)\nd_3 = np.random.normal(80, 30, 200)\nd_4 = np.random.normal(70, 40, 200)\nd = [d_1, d_2, d_3, d_4]\n\nfig = plt.figure(figsize =(10, 7))\nax = fig.add_axes([0, 0, 1, 1])\nbp = ax.boxplot(d)\n\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Box Plots & Violin Plots for Quartile Analysis",
      "initialCode": "import matplotlib.pyplot as plt\n\ndata = [12, 15, 18, 21, 24, 26, 28, 30, 35, 40]\nplt.boxplot(data)\nplt.title(\"Box Plot\")\nplt.show()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-viz-boxplot-violin.py ...",
        "[INFO] Loaded module for: Box Plots & Violin Plots for Quartile Analysis",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Box Plots & Violin Plots for Quartile Analysis?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Box Plots & Violin Plots for Quartile Analysis workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Box Plots & Violin Plots for Quartile Analysis is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  },
  "ds-viz-scatter-pairplot": {
    "id": "ds-viz-scatter-pairplot",
    "badge": "Module 5 • Data Science",
    "readingTime": "20 min read",
    "level": "Advanced",
    "title": "Scatter Plots & Multi-Variable Pair Plots",
    "subtitle": "In-depth guide to Scatter Plots & Multi-Variable Pair Plots — covering core concepts, mathematical intuition, and practical Python code examples.",
    "sections": [
      {
        "title": "1. Overview & Core Concepts",
        "content": "- Data Visualization is the presentation of data in pictorial format. It is extremely important for Data Analysis, primarily because of the fantastic ecosystem of data-centric Python packages. **Seaborn** is one of those packages that can make analyzing data much easier.\n\nData visualization with Seaborn Pairplot In this article, we will use **Pairplot** Seaborn to analyze data and**,** using the sns.pairplot() function.\n\nPairplot in Seaborn is a data visualization tool that creates a matrix of scatterplots, showing pairwise relationships between variables in a dataset, aiding in visualizing correlations and distributions.",
        "callout": {
          "type": "info",
          "title": "Key Concept",
          "message": "Master the theoretical foundations and practical Python implementation of Scatter Plots & Multi-Variable Pair Plots."
        }
      },
      {
        "title": "2. PairPlot Seaborn: Implementation",
        "content": "To plot multiple pairwise bivariate distributions in a dataset, you can use the pairplot() function. This shows the relationship for (n, 2) combination of variable in a DataFrame as a matrix of plots and the diagonal plots are the univariate plots.\n\n**Syntax:**\n\n**seaborn.pairplot( data, \\*\\*kwargs )\n\nParameter:**\n\n- **data:** Tidy (long-form) dataframe where each column is a variable and  each row is an observation.\n- **hue:** Variable in “data“ to map plot aspects to different colors.\n- **palette:** dict or seaborn color palette\n- **{x, y}_vars:** lists of variable names, optional\n- **dropna:** boolean, optionalFirst of all, We see Upload seaborn librarry 'tips' using pandas. Then, we will visualize data with seaborn.\n\n`\n`\n**Output:**\n\n**Let's plot pairplot using seaborn:**\n\nWe will simply plot a pairplot with tips data frame.\n\n`\n`\n**Output:**\n\nseaborn pairplotEach combination of variables is represented by a scatter plot, and the diagonal plots show the distribution of each individual variable.\n\n- The relationship between total_bill and tip is stronger for larger parties.\n- There is a positive correlation between tip and size.\n- The relationship between tip and size is stronger for larger total bill amounts.\n- There is a weak positive correlation between total_bill and size. This means that larger parties tend to have larger bills, but the relationship is not very strong.\n- There is no clear relationship between sex and tip or total_bill.\n- There is a weak positive correlation between day and total_bill. This means that bills tend to be slightly larger on Saturdays and Fridays than on other days of the week.\n- There is no clear relationship between time and tip or total_bill.\n- There is a weak positive correlation between smoker and tip. This means that smokers tend to tip slightly more than non-smokers.",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. PairPlot Seaborn: Implementation",
          "snippet": "# importing packages \nimport seaborn \nimport matplotlib.pyplot as plt \n# loading dataset using seaborn \ndf = seaborn.load_dataset('tips')\ndf.head()"
        }
      },
      {
        "title": "1. Pairplot Seaborn: Plotting Selected Variables",
        "content": "`\n`\n**Output:**\n\npaiplot seabornThe plots on the diagonal show the distribution of each individual variable. For example, the top left plot shows the distribution of total bills, and the bottom right plot shows the distribution of tips.\n\nThe off-diagonal plots show the relationship between two variables. For example, the top right plot shows the relationship between total bill and tip. There is a positive correlation between these two variables, which means that larger bills tend to have larger tips.",
        "code": {
          "language": "python",
          "caption": "Python Example — 1. Pairplot Seaborn: Plotting Selected Variables",
          "snippet": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset('tips')\nselected_vars = ['total_bill', 'tip']\nsns.pairplot(df, vars=selected_vars)\nplt.show()"
        }
      },
      {
        "title": "2. Pairplot Seaborn: Adding a Hue Color to a Seaborn Pairplot",
        "content": "`\n`\n**Output:**\n\npairplot seabonThe points in this scatter plot are colored by the value of size, so you can see how the relationship between total_bill and tip varies depending on the size of the party.\n\n- There is a positive correlation between total_bill and tip. This means that, in general, larger bills tend to have larger tips.\n- There is a positive correlation between tip and size. This means that, in general, larger parties tend to have larger tips.\n- The relationship between tip and size is stronger for larger total bill amounts.",
        "code": {
          "language": "python",
          "caption": "Python Example — 2. Pairplot Seaborn: Adding a Hue Color to a Seaborn Pairplot",
          "snippet": "import seaborn \nimport matplotlib.pyplot as plt \ndf = seaborn.load_dataset('tips')\nseaborn.pairplot(df,hue ='size') \nplt.show()"
        }
      },
      {
        "title": "3. Pairplot Seaborn: Modifying Color Palette",
        "content": "Implementation and key details for **3. Pairplot Seaborn: Modifying Color Palette**:",
        "code": {
          "language": "python",
          "caption": "Python Example — 3. Pairplot Seaborn: Modifying Color Palette",
          "snippet": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset('tips')\nsns.pairplot(df, hue=\"size\", palette=\"husl\")\nplt.show"
        }
      },
      {
        "title": "4. Pairplot Seaborn: Diagonal Kind of plots",
        "content": "In Seaborn's Pairplot, the 'diag_kind' parameter specifies the type of plot to display along the diagonal axis, representing the univariate distribution of each variable. Options include 'hist' for histograms, 'kde' for kernel density estimates, and 'scatter' for scatterplots. Choose based on the nature of the data and analysis goals. Here, let's plot with kernel density estimates.\n\n`\n`\n**Output:**",
        "code": {
          "language": "python",
          "caption": "Python Example — 4. Pairplot Seaborn: Diagonal Kind of plots",
          "snippet": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\ndf = sns.load_dataset('tips')\nsns.pairplot(df,diag_kind = 'kde')\nplt.show"
        }
      },
      {
        "title": "5. Pairplot Seaborn:Adjusting Plot Kind",
        "content": "The kind parameter allows to change the type of plot used for the off-diagonal plots. You can choose any like scatter, kde, or reg (regression).\n\n`\n`\n**Output:**\n\nAdjusting Plot Kind",
        "code": {
          "language": "python",
          "caption": "Python Example — 5. Pairplot Seaborn:Adjusting Plot Kind",
          "snippet": "sns.pairplot(df, kind='reg')\nplt.show()"
        }
      },
      {
        "title": "6. Pairplot Seaborn:Controlling the Markers",
        "content": "The `markers` parameter allows you to specify different markers for different categories.\n\n`\n`\n**Output:**\n\nControlling the Markers",
        "code": {
          "language": "python",
          "caption": "Python Example — 6. Pairplot Seaborn:Controlling the Markers",
          "snippet": "sns.pairplot(df, hue='sex', markers=[\"o\", \"s\"])\nplt.show()"
        }
      },
      {
        "title": "7. Pairplot Seaborn:Limiting the Variables",
        "content": "If you are interested in only a subset of the variables, you can specify them using the `vars` parameter.\n\n`\n`\n**Output:**\n\nPairplot Seaborn:Limiting the Variables",
        "code": {
          "language": "python",
          "caption": "Python Example — 7. Pairplot Seaborn:Limiting the Variables",
          "snippet": "sns.pairplot(df, hue='sex', vars=['total_bill', 'tip', 'size'])\nplt.show()"
        }
      },
      {
        "title": "10. Advanced Customization With Seaborn Pairplot",
        "content": "For advanced customization, you can access the underlying `FacetGrid` object and modify it further.\n\n`\n`\n**Output:**\n\nAdvanced Customization With Seaborn PairplotComment",
        "code": {
          "language": "python",
          "caption": "Python Example — 10. Advanced Customization With Seaborn Pairplot",
          "snippet": "g = sns.pairplot(df, hue='day')\ng.fig.suptitle(\"Pairplot of Tips Dataset\", y=1.02)  # Add a title\ng.set(xticks=[], yticks=[])  # Remove tick labels\nplt.show()"
        }
      }
    ],
    "playground": {
      "title": "Python Lab: Scatter Plots & Multi-Variable Pair Plots",
      "initialCode": "# importing packages \nimport seaborn \nimport matplotlib.pyplot as plt \n# loading dataset using seaborn \ndf = seaborn.load_dataset('tips')\ndf.head()",
      "expectedOutput": [
        "[PYTHON 3.11] Executing ds-viz-scatter-pairplot.py ...",
        "[INFO] Loaded module for: Scatter Plots & Multi-Variable Pair Plots",
        "[OUTPUT] Computation completed with 0 warnings.",
        "[SUCCESS] Interactive session finished."
      ],
      "language": "python",
      "engineBadge": "Python 3.11 • NumPy / Scikit-Learn"
    },
    "quiz": {
      "question": "Which of the following best describes a primary role or property of Scatter Plots & Multi-Variable Pair Plots?",
      "options": [
        "It only operates on uncompressed hardware synthesis netlists",
        "It provides mathematical, algorithmic, or programmatic structure for Scatter Plots & Multi-Variable Pair Plots workflows",
        "It disables gradient updates and prevents statistical inference",
        "It is used exclusively for static HTML page styling"
      ],
      "correctIndex": 1,
      "explanation": "Scatter Plots & Multi-Variable Pair Plots is a core methodology/tool in Data Science for analyzing data, building models, or executing intelligent algorithms."
    }
  }
};
