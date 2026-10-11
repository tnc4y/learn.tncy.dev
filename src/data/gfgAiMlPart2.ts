import { LessonContent } from "./lessonsData";

export const GFG_AIML_PART2: Record<string, LessonContent> = {
  "decision-trees": {
    "id": "decision-trees",
    "badge": "Module 6 • Machine Learning",
    "readingTime": "34 min read",
    "level": "Intermediate",
    "title": "Decision Tree in Machine Learning",
    "subtitle": "Comprehensive guide on Decision Tree in Machine Learning from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Decision Tree in Machine Learning Last Updated : 12 Aug, 2026 • • • A decision tree is a supervised learning algorithm used for both classification and regression tasks. It has a hierarchical tree structure which consists of a root node, branches, internal nodes and leaf nodes. It works like a flowchart that helps in making step-by-step decisions, where: • Internal nodes represent attribute tests • Branches represent attribute values • Leaf nodes represent final decisions or predictions. Decision trees are widely used due to their interpretability, flexibility and low preprocessing needs.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Decision Tree in Machine Learning with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. How Does a Decision Tree Work",
        "content": "A decision tree splits the dataset based on feature values to create pure subsets ideally all items in a group belong to the same class. Each leaf node represents the final output, which can be a class label (in classification) or a continuous value (in regression). Let’s understand this with an example. Decision Tree Let’s consider a decision tree for predicting whether a customer will buy a product based on age, income and previous purchases: Here's how the decision tree works: 1. Root Node (Income) First Question : \"Is the person’s income greater than $50,000?\" • If Yes, proceed to the next question. • If No, predict \"No Purchase\" (leaf node). 2. Internal Node (Age) : If the person’s income is greater than $50,000 , ask: \"Is the person’s age above 30?\" • If Yes, proceed to the next question. • If No, predict \"No Purchase\" (leaf node). 3. Internal Node (Previous Purchases) : • If the person is above 30 and has made previous purchases, predict \"Purchase\" (leaf node). • If the person is above 30 and has not made previous purchases, predict \"No Purchase\" (leaf node). Decision making with 2 Decision Tree Example: A decision tree makes predictions using a single tree structure by following decision paths from root to leaf."
      },
      {
        "title": "3. Tree 1: Customer Demographics",
        "content": "First tree asks two questions: 1. \"Income > $50,000?\" • If Yes, Proceed to the next question. • If No, \"No Purchase\" 2. \"Age > 30?\" • Yes: \"Purchase\" • No: \"No Purchase\""
      },
      {
        "title": "4. Tree 2: Previous Purchases",
        "content": "\"Previous Purchases > 0?\" • Yes: \"Purchase\" • No: \"No Purchase\" Once we have predictions from both trees, we can combine the results to make a final prediction. If Tree 1 predicts \"Purchase\" and Tree 2 predicts \"No Purchase\", the final prediction might be \"Purchase\" or \"No Purchase\" depending on the weight or confidence assigned to each tree. This can be decided based on the problem context."
      },
      {
        "title": "5. Information Gain and Gini Index in Decision Tree",
        "content": "Till now we have discovered the basic intuition and approach of how decision tree works, so let's just move to the attribute selection measure of decision tree. We have two popular attribute selection measures used:"
      },
      {
        "title": "1. Information Gain",
        "content": "Information Gain tells us how useful a question (or feature) is for splitting data into groups. It measures how much the uncertainty decreases after the split. A good question will create clearer groups and the feature with the highest Information Gain is chosen to make the decision. For example if we split a dataset of people into \"Young\" and \"Old\" based on age and all young people bought the product while all old people did not, the Information Gain would be high because the split perfectly separates the two groups with no uncertainty left • Suppose S is a set of instances A is an attribute, Sv is the subset of S , v represents an individual value that the attribute A can take and Values ( A ) is the set of all possible values of A then • Entropy: It is the measure of uncertainty of a random variable, it characterizes the impurity of an arbitrary collection of examples. The higher the entropy more the information content. For example if a dataset has an equal number of \"Yes\" and \"No\" outcomes (like 3 people who bought a product and 3 who didn’t), the entropy is high because it’s uncertain which outcome to predict. But if all the outcomes are the same (all \"Yes\" or all \"No\") the entropy is 0 meaning there is no uncertainty left in predicting the outcome Suppose S is a set of instances, A is an attribute, Sv is the subset of S with A = v and Values ( A ) is the set of all possible values of A , then Gain(S, A) = Entropy(S) - \\sum_{v \\epsilon Values(A)}\\frac{\\left | S_{v} \\right |}{\\left | S \\right |}. Entropy(S_{v}) Example: For the set X = {a,a,a,b,b,b,b,b} Total instances: 8 Instances of b: 5 Instances of a: 3 \\begin{aligned}\\text{Entropy } H(X) &= -\\left[ \\left( \\frac{3}{8} \\right)\\log_{2}\\left( \\frac{3}{8} \\right) + \\left( \\frac{5}{8} \\right)\\log_{2}\\left( \\frac{5}{8} \\right) \\right] \\\\&= -[0.375(-1.415) + 0.625(-0.678)] \\\\&= -(-0.53 - 0.424) \\\\&= 0.954\\end{aligned}"
      },
      {
        "title": "7. Building Decision Tree using Information Gain the essentials",
        "content": "• Start with all training instances associated with the root node • Use info gain to choose which attribute to label each node with • Recursively construct each subtree on the subset of training instances that would be classified down that path in the tree. • If all positive or all negative training instances remain, the label that node “yes\" or “no\" accordingly • If no attributes remain label with a majority vote of training instances left at that node • If no instances remain label with a majority vote of the parent's training instances. Example: Now let us draw a Decision Tree for the following data using Information gain. Training set: 3 features and 2 classes X Y Z C 1 1 1 I 1 1 0 I 0 0 1 II 1 0 0 II Here, we have 3 features and 2 output classes. To build a decision tree using Information gain. We will take each of the features and calculate the information for each feature. Split on attribute X Split on attribute Y Split on attribute Z • From the above images we can see that the information gain is maximum when we make a split on feature Y. So, for the root node best-suited feature is feature Y. • Now we can see that while splitting the dataset by feature Y, the child contains a pure subset of the target variable. • So we don't need to further split the dataset. The final tree for the above dataset would look like this: information gain on attribute Y"
      },
      {
        "title": "2. Gini Index",
        "content": "Gini Index is a metric to measure how often a randomly chosen element would be incorrectly identified. It means an attribute with a lower Gini index should be preferred. Sklearn supports “Gini” criteria for Gini Index and by default it takes “gini” value. For example if we have a group of people where all bought the product (100% \"Yes\") the Gini Index is 0 indicate perfect purity. But if the group has an equal mix of \"Yes\" and \"No\" the Gini Index would be 0.5 show high impurity or uncertainty. Formula for Gini Index is given by : Gini = 1 - \\sum_{i=1}^{n} p_i^2"
      },
      {
        "title": "9. Some additional features of the Gini Index are:",
        "content": "• It is calculated by summing the squared probabilities of each outcome in a distribution and subtracting the result from 1. • A lower Gini Index indicates a more homogeneous or pure distribution while a higher Gini Index indicates a more heterogeneous or impure distribution. • Gini Index is used to evaluate the quality of a split by measuring the difference between the impurity of the parent node and the weighted impurity of the child nodes. • Compared to other impurity measures like entropy, the Gini Index is faster to compute and more sensitive to changes in class probabilities. • One disadvantage of the Gini Index is that it tends to favour splits that create equally sized child nodes, even if they are not optimal for classification accuracy. • In practice the choice between using the Gini Index or other impurity measures depends on the specific problem and dataset and requires experimentation and tuning."
      },
      {
        "title": "10. Understanding Decision Tree with Real life use case:",
        "content": "Till now we have understood about the attributes and components of decision tree. Now lets jump to a real life use case in which how decision tree works step by step."
      },
      {
        "title": "11. Step 1. Start with the Whole Dataset",
        "content": "We begin with all the data which is treated as the root node of the decision tree."
      },
      {
        "title": "12. Step 2. Choose the Best Question (Attribute)",
        "content": "Pick the best question to divide the dataset. For example ask: \"What is the outlook?\" Possible answers: Sunny, Cloudy or Rainy."
      },
      {
        "title": "13. Step 3. Split the Data into Subsets",
        "content": "Divide the dataset into groups based on the question: • If Sunny go to one subset. • If Cloudy go to another subset. • If Rainy go to the last subset."
      },
      {
        "title": "14. Step 4. Split Further if Needed (Recursive Splitting)",
        "content": "For each subset ask another question to refine the groups. For example If the Sunny subset is mixed ask: \"Is the humidity high or normal?\" • High humidity → \"Swimming\". • Normal humidity → \"Hiking\"."
      },
      {
        "title": "15. Step 5. Assign Final Decisions (Leaf Nodes)",
        "content": "When a subset contains only one activity, stop splitting and assign it a label: • Cloudy → \"Hiking\". • Rainy → \"Stay Inside\". • Sunny + High Humidity → \"Swimming\". • Sunny + Normal Humidity → \"Hiking\"."
      },
      {
        "title": "16. Step 6. Use the Tree for Predictions",
        "content": "To predict an activity follow the branches of the tree. Example: If the outlook is Sunny and the humidity is High follow the tree: • Start at Outlook . • Take the branch for Sunny. • Then go to Humidity and take the branch for High Humidity. • Result: \"Swimming\". Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "17. Explore",
        "content": "Machine Learning Basics • Introduction 3 min read • Types 7 min read • ML Pipeline 4 min read • Applications 2 min read Python for Machine Learning • ML with Python 3 min read • Numpy 3 min read • Pandas 4 min read • Data Preprocessing 4 min read • EDA 6 min read Feature Engineering • Feature Engineering 4 min read • Dimensionality Reduction 3 min read • Feature Selection 4 min read Supervised Learning • Supervised Learning 4 min read • Linear Regression 10 min read • Logistic Regression 9 min read • Decision Tree 8 min read • Random Forest 4 min read • KNN 7 min read • SVM 9 min read • Naive Bayes 6 min read Unsupervised Learning • Unsupervised Learning 5 min read • K means Clustering 7 min read • Hierarchical Clustering 6 min read • DBSCAN Clustering 6 min read • Apriori Algorithm 5 min read • FP Growth Algorithm 4 min read • ECLAT Algorithm 5 min read • PCA 6 min read Model Evaluation and Tuning • Evaluation Metrics 9 min read • Regularization 5 min read • Cross Validation 5 min read • Hyperparameter Tuning 5 min read • Underfitting and Overfitting 3 min read • Bias and Variance 6 min read Advanced Techniques • Reinforcement Learning 8 min read • Semi-Supervised Learning 5 min read • Self-Supervised Learning 5 min read • Ensemble Learning 6 min read Machine Learning Practice • Interview Questions 15+ min read • ML Projects 5 min read Courses • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Decision Tree in Machine Learning",
      "initialCode": "# Decision Tree in Machine Learning\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Decision Tree in Machine Learning\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Decision Tree in Machine Learning",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What criterion does a Decision Tree typically use to select the best feature split?",
      "options": [
        "Mean Squared Error only",
        "Information Gain (Entropy reduction) or Gini Impurity",
        "Random selection",
        "Feature correlation"
      ],
      "correctIndex": 1,
      "explanation": "Decision Trees use Information Gain (entropy-based) for ID3/C4.5 or Gini Impurity for CART to find the feature split that most reduces class impurity."
    }
  },
  "random-forest": {
    "id": "random-forest",
    "badge": "Module 6 • Machine Learning",
    "readingTime": "28 min read",
    "level": "Intermediate",
    "title": "Random Forest Classifier using Scikit-learn",
    "subtitle": "Comprehensive guide on Random Forest Classifier using Scikit-learn from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Random Forest Classifier using Scikit-learn Last Updated : 6 Mar, 2026 • • • Random Forest is an ensemble machine learning algorithm that builds multiple decision trees and combines their predictions to improve accuracy and reduce overfitting. In Scikit‑learn, the Random Forest Classifier is widely used for classification tasks because it handles large datasets and handles nonlinear relationships well. Random Forest Classifier",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "import pandas as pd \n import matplotlib.pyplot as plt \n import seaborn as sns \n import sklearn \n\n from sklearn.model_selection import train_test_split \n from sklearn.preprocessing import StandardScaler \n from sklearn.metrics import accuracy_score , confusion_matrix \n from sklearn.ensemble import RandomForestClassifier \n from sklearn.datasets import load_iris"
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Random Forest Classifier using Scikit-learn with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Working of Random Forest Classifier",
        "content": "• Bootstrap Sampling: Random rows are picked (with replacement) to train each tree. • Random Feature Selection: Each tree uses a random set of features (not all features). • Build Decision Trees: Trees split the data using the best feature from their random set. Splitting continues until a stopping rule is met (like max depth). • Make Predictions: Each tree gives its own prediction. • Majority Voting: The final prediction is the one most tree agree on.",
        "code": {
          "language": "python",
          "caption": "Code Example: Working of Random Forest Classifier",
          "snippet": "iris = load_iris () \n df = pd . DataFrame ( data = iris . data , columns = iris . feature_names ) \n df [ &#39;target&#39; ] = iris . target \n\n df"
        }
      },
      {
        "title": "3. Benefits of Random Forest Classification:",
        "content": "• Random Forest can handle large datasets and high-dimensional data. • By combining predictions from many decision trees, it reduces the risk of overfitting compared to a single decision tree. • It is robust to noisy data and works well with categorical data.",
        "code": {
          "language": "python",
          "caption": "Code Example: Benefits of Random Forest Classification:",
          "snippet": "X = df . iloc [:, : - 1 ] . values \n y = df . iloc [:, - 1 ] . values"
        }
      },
      {
        "title": "4. Implementing Random Forest Classification in Python",
        "content": "Before implementing random forest classifier in Python let's first understand it's parameters. • n_estimators: Number of trees in the forest. • max_depth: Maximum depth of each tree. • max_features: Number of features considered for splitting at each node. • criterion: Function used to measure split quality ('gini' or 'entropy'). • min_samples_split: Minimum samples required to split a node. • min_samples_leaf: Minimum samples required to be at a leaf node. • bootstrap: Whether to use bootstrap sampling when building trees (True or False). Now that we know it's parameters we can start building it in python.",
        "code": {
          "language": "python",
          "caption": "Code Example: Implementing Random Forest Classification in ",
          "snippet": "X_train , X_test , y_train , y_test = train_test_split ( X , y , test_size = 0.2 , random_state = 42 )"
        }
      },
      {
        "title": "1. Import Required Libraries",
        "content": "We will be importing Pandas , matplotlib , seaborn and sklearn to build the model. python ``` import pandas as pd import matplotlib.pyplot as plt import seaborn as sns import sklearn from sklearn.model_selection import train_test_split from sklearn.preprocessing import StandardScaler from sklearn.metrics import accuracy_score, confusion_matrix from sklearn.ensemble import RandomForestClassifier from sklearn.datasets import load_iris ```",
        "code": {
          "language": "python",
          "caption": "Code Example: 1. Import Required Libraries",
          "snippet": "scaler = StandardScaler () \n X_train = scaler . fit_transform ( X_train ) \n X_test = scaler . transform ( X_test )"
        }
      },
      {
        "title": "2. Import Dataset",
        "content": "For this we'll use the Iris Dataset which is available within scikit learn. This dataset contains information about three types of Iris flowers and their respective features (sepal length, sepal width, petal length and petal width). python ``` iris = load_iris() df = pd.DataFrame(data=iris.data, columns=iris.feature_names) df[&#39;target&#39;] = iris.target df ``` Output: Iris Dataset"
      },
      {
        "title": "3. Data Preparation",
        "content": "Here we will separate the features (X) and the target variable (y). python ``` X = df.iloc[:, :-1].values y = df.iloc[:, -1].values ```"
      },
      {
        "title": "4. Splitting the Dataset",
        "content": "We'll split the dataset into training and testing sets so we can train the model on one part and evaluate it on another. • X_train, y_train: 80% of the data used to train the model. • X_test, y_test: 20% of the data used to test the model. • test_size=0.2: means 20% of data goes to testing. • random_state=42: ensures you get the same split every time python ``` X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) ```"
      },
      {
        "title": "5. Feature Scaling",
        "content": "Feature scaling ensures that all the features are on a similar scale which is important for some machine learning models. However Random Forest is not highly sensitive to feature scaling. But it is a good practice to scale when combining models. python ``` scaler = StandardScaler() X_train = scaler.fit_transform(X_train) X_test = scaler.transform(X_test) ```"
      },
      {
        "title": "6. Building Random Forest Classifier",
        "content": "We will create the Random Forest Classifier model, train it on the training data and make predictions on the test data. • RandomForestClassifier(n_estimators=100, random_state=42) creates 100 trees (100 trees balance accuracy and training time). • classifier.fit(X_train, y_train) trains on training data. • classifier.predict(X_test) predicts on test data. • random_state=42 ensures reproducible results. python ``` classifier = RandomForestClassifier(n_estimators=100, random_state=42) classifier.fit(X_train, y_train) y_pred = classifier.predict(X_test) ```"
      },
      {
        "title": "7. Evaluation of the Model",
        "content": "We will evaluate the model using the accuracy score and confusion matrix. python ``` accuracy = accuracy_score(y_test, y_pred) print(f&#39;Accuracy: {accuracy * 100:.2f}%&#39;) conf_matrix = confusion_matrix(y_test, y_pred) plt.figure(figsize=(8, 6)) sns.heatmap(conf_matrix, annot=True, fmt=&#39;g&#39;, cmap=&#39;Blues&#39;, cbar=False, xticklabels=iris.target_names, yticklabels=iris.target_names) plt.title(&#39;Confusion Matrix Heatmap&#39;) plt.xlabel(&#39;Predicted Labels&#39;) plt.ylabel(&#39;True Labels&#39;) plt.show() ``` Output: Accuracy: 100.00% Confusion Matrix"
      },
      {
        "title": "8. Feature Importance",
        "content": "Random Forest Classifiers also provide insight into which features were the most important in making predictions. We can plot the feature importance. Python ``` feature_importances = classifier.feature_importances_ plt.barh(iris.feature_names, feature_importances) plt.xlabel(&#39;Feature Importance&#39;) plt.title(&#39;Feature Importance in Random Forest Classifier&#39;) plt.show() ``` Output: Feature Importance in Random Classifier From the graph we can see that petal width (cm) is the most important feature followed closely by petal length (cm). The sepal width (cm) and sepal length (cm) have lower importance in determining the model’s predictions. This indicates that the classifier relies more on the petal measurements to make predictions about the flower species."
      },
      {
        "title": "13. Related Articles:",
        "content": "Random Forest Regression in Python Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "14. Explore",
        "content": "DSA Tutorial 2 min read System Design Tutorial 2 min read Aptitude Questions and Answers 2 min read Web Development Technologies 2 min read AI, ML and Data Science Tutorial 2 min read DevOps Tutorial 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Random Forest Classifier using Scikit-learn",
      "initialCode": "# Random Forest Classifier using Scikit-learn\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport pandas as pd \n import matplotlib.pyplot as plt \n import seaborn as sns \n import sklearn \n\n from sklearn.model_selection import train_test_split \n from sklearn.preprocessing import StandardScaler \n from sklearn.metrics import accuracy_score , confusion_matrix \n from sklearn.ensemble import RandomForestClassifier \n from sklearn.datasets import load_iris",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Random Forest Classifier using Scikit-learn",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is the core technique that makes Random Forest an ensemble method?",
      "options": [
        "Boosting",
        "Bagging (Bootstrap Aggregating) with feature randomization",
        "Stacking",
        "Gradient descent"
      ],
      "correctIndex": 1,
      "explanation": "Random Forest uses bagging: training multiple decision trees on random bootstrap samples with random feature subsets, then aggregating predictions by majority vote or averaging."
    }
  },
  "svm-ml": {
    "id": "svm-ml",
    "badge": "Module 6 • Machine Learning",
    "readingTime": "36 min read",
    "level": "Intermediate",
    "title": "Support Vector Machine (SVM) Algorithm",
    "subtitle": "Comprehensive guide on Support Vector Machine (SVM) Algorithm from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Support Vector Machine (SVM) Algorithm Last Updated : 2 May, 2026 • • • Support Vector Machine (SVM) is a supervised machine learning algorithm used for classification and regression tasks. It tries to find the best boundary known as hyperplane that separates different classes in the data. It is useful when you want to do binary classification like spam vs. not spam or cat vs. dog. The main goal of SVM is to maximize the margin between the two classes. The larger the margin the better the model performs on new and unseen data.",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "from sklearn.datasets import load_breast_cancer \n import matplotlib.pyplot as plt \n from sklearn.inspection import DecisionBoundaryDisplay \n from sklearn.svm import SVC \n\n cancer = load_breast_cancer () \n X = cancer . data [:, : 2 ] \n y = cancer . target \n\n svm = SVC ( kernel = \"linear\" , C = 1 ) \n svm . fit ( X , y ) \n\n DecisionBoundaryDisplay . from_estimator ( \n svm , \n X , \n response_method = \"predict\" , \n alpha = 0.8 , \n cmap = \"Pastel1\" , \n xlabel = cancer . feature_names [ 0 ], \n ylabel = cancer . feature_names [ 1 ], \n ) \n\n plt . scatter ( X [:, 0 ], X [:, 1 ], \n c = y , \n s = 20 , edg"
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Support Vector Machine (SVM) Algorithm with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Key Concepts",
        "content": "• Hyperplane : A decision boundary separating different classes in feature space and is represented by the equation wx + b = 0 in linear classification. • Support Vectors : The closest data points to the hyperplane, crucial for determining the hyperplane and margin in SVM. • Margin : The distance between the hyperplane and the support vectors. SVM aims to maximize this margin for better classification performance. • Kernel : A function that maps data to a higher-dimensional space enabling SVM to handle non-linearly separable data. • Hard Margin : A maximum-margin hyperplane that perfectly separates the data without misclassifications. • Soft Margin : Allows some misclassifications by introducing slack variables, balancing margin maximization and misclassification penalties when data is not perfectly separable. • C : A regularization term balancing margin maximization and misclassification penalties. A higher C value forces stricter penalty for misclassifications. • Hinge Loss : A loss function penalizing misclassified points or margin violations and is combined with regularization in SVM. • Dual Problem : Involves solving for Lagrange multipliers associated with support vectors, facilitating the kernel trick and efficient computation."
      },
      {
        "title": "3. Working of Support Vector Machine Algorithm",
        "content": "The key idea behind the SVM algorithm is to find the hyperplane that best separates two classes by maximizing the margin between them. This margin is the distance from the hyperplane to the nearest data points (support vectors) on each side. Multiple hyperplanes separate the data from two classes The best hyperplane also known as the hard margin is the one that maximizes the distance between the hyperplane and the nearest data points from both classes. This ensures a clear separation between the classes. So from the above figure, we choose L2 as hard margin. Let's consider a scenario like shown below: Selecting hyperplane for data with outlier Here, we have one blue ball in the boundary of the red ball."
      },
      {
        "title": "4. How does SVM classify the data?",
        "content": "The blue ball in the boundary of red ones is an outlier of blue balls. The SVM algorithm has the characteristics to ignore the outlier and finds the best hyperplane that maximizes the margin. SVM can be sensitive to outliers, especially in the case of a hard margin, while soft margin SVM helps reduce their impact by allowing some misclassifications. Hyperplane which is the most optimized one A soft margin allows for some misclassifications or violations of the margin to improve generalization. The SVM optimizes the following equation to balance margin maximization and penalty minimization: \\text{Objective Function} = (\\frac{1}{\\text{margin}}) + \\lambda \\sum \\text{penalty } The penalty used for violations is often hinge loss which has the following behavior: • If a data point is correctly classified and lies outside the margin, there is no penalty (loss = 0). If it is correctly classified but lies within the margin or is misclassified, the hinge loss is greater than 0. • If a point is incorrectly classified or violates the margin the hinge loss increases proportionally to the distance of the violation. Till now we were talking about linearly separable data that separates group of blue balls and red balls by a straight line/linear line."
      },
      {
        "title": "5. What if data is not linearly separable?",
        "content": "When data is not linearly separable i.e it can't be divided by a straight line, SVM uses a technique called kernels to map the data into a higher-dimensional space where it becomes separable. This transformation helps SVM find a decision boundary even for non-linear data. Original 1D dataset for classification A kernel is a function that maps data points into a higher-dimensional space without explicitly computing the coordinates in that space. This allows SVM to work efficiently with non-linear data by implicitly performing the mapping. For example consider data points that are not linearly separable. By applying a kernel function SVM transforms the data points into a higher-dimensional space where they become linearly separable. • Linear Kernel : For linear separability. • Polynomial Kernel : Maps data into a polynomial space. • Radial Basis Function (RBF) Kernel : Transforms data into a space based on distances between data points. Mapping 1D data to 2D to become able to separate the two classes In this case the new variable y is created as a function of distance from the origin."
      },
      {
        "title": "6. Mathematical Computation of SVM",
        "content": "Consider a binary classification problem with two classes, labeled as +1 and -1. We have a training dataset consisting of input feature vectors X and their corresponding class labels Y. The equation for the linear hyperplane can be written as: w^Tx+ b = 0 Where: • w is the normal vector to the hyperplane (the direction perpendicular to it). • b is the offset or bias term representing the distance of the hyperplane from the origin along the normal vector w ."
      },
      {
        "title": "7. Distance from a Data Point to the Hyperplane",
        "content": "The distance between a data point x_i and the decision boundary can be calculated as: d_i = \\frac{w^T x_i + b}{||w||} where ||w|| represents the Euclidean norm of the weight vector w."
      },
      {
        "title": "8. Linear SVM Classifier",
        "content": "Distance from a Data Point to the Hyperplane: \\hat{y} = \\left\\{ \\begin{array}{cl} 1 & : \\ w^Tx+b \\geq 0 \\\\ -1 & : \\ w^Tx+b < 0 \\end{array} \\right. Where \\hat{y} is the predicted label of a data point."
      },
      {
        "title": "9. Optimization Problem for SVM",
        "content": "For a linearly separable dataset the goal is to find the hyperplane that maximizes the margin between the two classes while ensuring that all data points are correctly classified. This leads to the following optimization problem: \\underset{w,b}{\\text{minimize}}\\frac{1}{2}\\left\\| w \\right\\|^{2} Subject to the constraint: y_i(w^Tx_i + b) \\geq 1 \\;for\\; i = 1, 2,3, \\cdots,m Where: • y_i ​ is the class label (+1 or -1) for each training instance. • x_i ​ is the feature vector for the i -th training instance. • m is the total number of training instances. The condition y_i (w^T x_i + b) \\geq 1 ensures that each data point is correctly classified and lies outside the margin."
      },
      {
        "title": "10. Soft Margin in Linear SVM Classifier",
        "content": "In the presence of outliers or non-separable data the SVM allows some misclassification by introducing slack variables \\zeta_i ​. The optimization problem is modified as: \\underset{w, b}{\\text{minimize }} \\frac{1}{2} \\|w\\|^2 + C \\sum_{i=1}^{m} \\zeta_i Subject to the constraints: y_i (w^T x_i + b) \\geq 1 - \\zeta_i \\quad \\text{and} \\quad \\zeta_i \\geq 0 \\quad \\text{for } i = 1, 2, \\dots, m Where: • C is a regularization parameter that controls the trade-off between margin maximization and penalty for misclassifications. • \\zeta_i ​ are slack variables that represent the degree of violation of the margin by each data point."
      },
      {
        "title": "11. Dual Problem for SVM",
        "content": "The dual problem involves maximizing the Lagrange multipliers associated with the support vectors. This transformation allows solving the SVM optimization using kernel functions for non-linear classification. The dual objective function is given by: \\max_{\\alpha} \\; \\frac{1}{2} \\sum_{i=1}^{m} \\sum_{j=1}^{m} \\alpha_i \\alpha_j t_i t_j K(x_i, x_j)- \\sum_{i=1}^{m} \\alpha_i Where: • \\alpha_i ​ are the Lagrange multipliers associated with the i^{th} training sample. • t_i ​ is the class label for the i^{th} -th training sample. • K(x_i, x_j) is the kernel function that computes the similarity between data points x_i ​ and x_j ​. The kernel allows SVM to handle non-linear classification problems by mapping data into a higher-dimensional space. The dual formulation optimizes the Lagrange multipliers \\alpha_i ​ and the support vectors are those training samples where \\alpha_i > 0 ."
      },
      {
        "title": "12. SVM Decision Boundary",
        "content": "Once the dual problem is solved, the decision boundary is given by: w = \\sum_{i=1}^{m} \\alpha_i t_i K(x_i, x) + b Where w is the weight vector, x is the test data point and b is the bias term. Finally the bias term b is determined by the support vectors which satisfy: t_i (w^T x_i - b) = 1 \\quad \\Rightarrow \\quad b = w^T x_i - t_i Where x_i ​ is any support vector. This completes the mathematical framework of the Support Vector Machine algorithm which allows for both linear and non-linear classification using the dual problem and kernel trick."
      },
      {
        "title": "13. Types of Support Vector Machine",
        "content": "Based on the nature of the decision boundary, Support Vector Machines (SVM) can be divided into two main parts:"
      },
      {
        "title": "14. Linear SVM",
        "content": "• Linear SVMs use a linear decision boundary to separate the data points of different classes. • When the data can be precisely linearly separated, linear SVMs are very suitable. • This means that a single straight line (in 2D) or a hyperplane (in higher dimensions) can entirely divide the data points into their respective classes. • A hyperplane that maximizes the margin between the classes is the decision boundary."
      },
      {
        "title": "15. Non-Linear SVM",
        "content": "• Non-Linear SVM can be used to classify data when it cannot be separated into two classes by a straight line (in the case of 2D). • By using kernel functions, nonlinear SVMs can handle nonlinearly separable data. • The original input data is transformed by these kernel functions into a higher-dimensional feature space where the data points can be linearly separated. • A linear SVM is used to locate a nonlinear decision boundary in this modified space."
      },
      {
        "title": "16. Implementing",
        "content": "We will predict whether cancer is Benign or Malignant using historical data about patients diagnosed with cancer. This data includes independent attributes such as tumor size, texture, and others. To perform this classification, we will use an SVM (Support Vector Machine) classifier to differentiate between benign and malignant cases effectively. • load_breast_cancer(): Loads the breast cancer dataset (features and target labels). • SVC(kernel=\"linear\", C=1) : Creates a Support Vector Classifier with a linear kernel and regularization parameter C=1. • svm.fit(X, y): Trains the SVM model on the feature matrix X and target labels y. • DecisionBoundaryDisplay.from_estimator(): Visualizes the decision boundary of the trained model with a specified color map. • plt.scatter(): Creates a scatter plot of the data points, colored by their labels. • plt.show(): Displays the plot to the screen. Python ``` from sklearn.datasets import load_breast_cancer import matplotlib.pyplot as plt from sklearn.inspection import DecisionBoundaryDisplay from sklearn.svm import SVC cancer = load_breast_cancer() X = cancer.data[:, :2] y = cancer.target svm = SVC(kernel=\"linear\", C=1) svm.fit(X, y) DecisionBoundaryDisplay.from_estimator( svm, X, response_method=\"predict\", alpha=0.8, cmap=\"Pastel1\", xlabel=cancer.feature_names[0], ylabel=cancer.feature_names[1], ) plt.scatter(X[:, 0], X[:, 1], c=y, s=20, edgecolors=\"k\") plt.show() ``` Output : SVM"
      },
      {
        "title": "17. Advantages",
        "content": "• High-Dimensional Performance : SVM excels in high-dimensional spaces, making it suitable for image classification and gene expression analysis. • Nonlinear Capability : Utilizing kernel functions like RBF and polynomial SVM effectively handles nonlinear relationships. • Outlier Resilience : SVM can handle outliers by allowing some misclassifications using a soft margin. • Binary and Multiclass Support : SVM is effective for both binary classification and multiclass classification suitable for applications in text classification. • Memory Efficiency : It focuses on support vectors making it memory efficient compared to other algorithms."
      },
      {
        "title": "18. Limitations",
        "content": "• Slow Training : SVM can be slow for large datasets, affecting performance in SVM in data mining tasks. • Parameter Tuning Difficulty : Selecting the right kernel and adjusting parameters like C requires careful tuning, impacting SVM algorithms. • Noise Sensitivity : SVM struggles with noisy datasets and overlapping classes, limiting effectiveness in real-world scenarios. • Limited Interpretability : The complexity of the hyperplane in higher dimensions makes SVM less interpretable than other models. • Feature Scaling Sensitivity : Proper feature scaling is essential, otherwise SVM models may perform poorly. Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      }
    ],
    "playground": {
      "title": "Python & ML Console: Support Vector Machine (SVM) Algorithm",
      "initialCode": "# Support Vector Machine (SVM) Algorithm\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nfrom sklearn.datasets import load_breast_cancer \n import matplotlib.pyplot as plt \n from sklearn.inspection import DecisionBoundaryDisplay \n from sklearn.svm import SVC \n\n cancer = load_breast_cancer () \n X = cancer . data [:, : 2 ] \n y = cancer . target \n\n svm = SVC ( kernel = \"linear\" , C = 1 ) \n svm . fit ( X , y ) \n\n DecisionBoundaryDisplay . from_estimator ( \n svm , \n X , \n response_method = \"predict\" , \n alpha = 0.8 , \n cmap = \"Pastel1\" , \n xlabel = cancer . feature_names [ 0 ], \n ylabel = cancer . feature_names [ 1 ], \n ) \n\n plt . scatter ( X [:, 0 ], X [:, 1 ], \n c = y , \n s = 20 , edgecolors = \"k\" ) \n plt . show ()",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Support Vector Machine (SVM) Algorithm",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is the 'maximum margin hyperplane' in Support Vector Machines?",
      "options": [
        "The line with the most data points on it",
        "The decision boundary that maximizes the distance to the nearest data points (support vectors)",
        "The boundary passing through the mean of each class",
        "A non-linear curve"
      ],
      "correctIndex": 1,
      "explanation": "SVM finds the hyperplane that maximizes the margin — the distance between the hyperplane and the nearest training examples (support vectors) from each class."
    }
  },
  "k-means-clustering": {
    "id": "k-means-clustering",
    "badge": "Module 6 • Machine Learning",
    "readingTime": "36 min read",
    "level": "Intermediate",
    "title": "K means Clustering – Introduction",
    "subtitle": "Comprehensive guide on K means Clustering – Introduction from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "K means Clustering – Introduction Last Updated : 3 Aug, 2026 • • • K-Means Clustering groups similar data points into clusters without needing labeled data. It is used to uncover hidden patterns when the goal is to organize data based on similarity. • Helps identify natural groupings in unlabeled datasets • Works by grouping points based on distance to cluster centers • Commonly used in customer segmentation, image compression and pattern discovery • Useful when you need structure from raw, unorganized data",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "import numpy as np \n import matplotlib.pyplot as plt \n from sklearn.datasets import make_blobs"
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers K means Clustering – Introduction with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Working of K-Means Clustering",
        "content": "Suppose we are given a data set of items with certain features and values for these features like a vector. The task is to categorize those items into groups. To achieve this we will use the K-means algorithm. \" k \" represents the number of groups or clusters we want to classify our items into. The algorithm will categorize the items into \" k \" groups or clusters of similarity. To calculate that similarity we will use the Euclidean distance as a measurement. The algorithm works as follows: • Initialization: We begin by randomly selecting k cluster centroids. • Assignment Step: Each data point is assigned to the nearest centroid, forming clusters. • Update Step: After the assignment, we recalculate the centroid of each cluster by averaging the points within it. • Repeat: This process repeats until the centroids no longer change or the maximum number of iterations is reached. The goal is to partition the dataset into k clusters such that data points within each cluster are more similar to each other than to those in other clusters. Selecting the right number of clusters is important for meaningful segmentation to do this we use Elbow Method for optimal value of k in KMeans which is a graphical tool used to determine the optimal number of clusters (k) in K-means.",
        "code": {
          "language": "python",
          "caption": "Code Example: Working of K-Means Clustering",
          "snippet": "X , y = make_blobs ( n_samples = 500 , n_features = 2 , centers = 3 , random_state = 23 ) \n\n fig = plt . figure ( 0 ) \n plt . grid ( True ) \n plt . scatter ( X [:, 0 ], X [:, 1 ]) \n plt . show ()"
        }
      },
      {
        "title": "1. Euclidean Distance",
        "content": "The distance between a data point xxx and a centroid ccc is calculated as: d(x,c)=\\sqrt{\\sum_{i=1}^{n}(x_i-c_i)^2} where: • x_i​ is the i^{th} feature of the data point. • c_i is the i^{th} feature of the centroid. • n is the number of features.",
        "code": {
          "language": "python",
          "caption": "Code Example: 1. Euclidean Distance",
          "snippet": "from sklearn.preprocessing import StandardScaler \n\n scaler = StandardScaler () \n X = scaler . fit_transform ( X )"
        }
      },
      {
        "title": "2. Centroid Update",
        "content": "After assigning all data points to clusters, each centroid is updated as the mean of all points belonging to that cluster: c_j=\\frac{1}{|C_j|}\\sum_{x_i\\in C_j}x_i where: • C_j is the set of points assigned to the j^{th} cluster. • |C_j| is the number of points in that cluster.",
        "code": {
          "language": "python",
          "caption": "Code Example: 2. Centroid Update",
          "snippet": "k = 3 \n\n clusters = {} \n np . random . seed ( 23 ) \n\n for idx in range ( k ): \n center = 2 * ( 2 * np . random . random (( X . shape [ 1 ],)) - 1 ) \n points = [] \n cluster = { \n &#39;center&#39; : center , \n &#39;points&#39; : [] \n } \n \n clusters [ idx ] = cluster \n \n clusters"
        }
      },
      {
        "title": "5. Uses of K-Means Clustering",
        "content": "K-Means is popular in a wide variety of applications due to its simplicity, efficiency and effectiveness. Here’s why it is widely used: • Data Segmentation: One of the most common uses of K-Means is segmenting data into distinct groups. For example, businesses use K-Means to group customers based on behavior, such as purchasing patterns or website interaction. • Image Compression : K-Means can be used to reduce the complexity of images by grouping similar pixels into clusters, effectively compressing the image. This is useful for image storage and processing. • Anomaly Detection: K-Means can be applied to detect anomalies or outliers by identifying data points that do not belong to any of the clusters. • Document Clustering: In natural language processing (NLP), K-Means is used to group similar documents or articles together. It’s often used in applications like recommendation systems or news categorization. • Organizing Large Datasets: When dealing with large datasets, K-Means can help in organizing the data into smaller, more manageable chunks based on similarities, improving the efficiency of data analysis.",
        "code": {
          "language": "python",
          "caption": "Code Example: Uses of K-Means Clustering",
          "snippet": "plt . scatter ( X [:, 0 ], X [:, 1 ]) \n plt . grid ( True ) \n for i in clusters : \n center = clusters [ i ][ &#39;center&#39; ] \n plt . scatter ( center [ 0 ], center [ 1 ], marker = &#39;*&#39; , c = &#39;red&#39; ) \n plt . show ()"
        }
      },
      {
        "title": "6. Implementation of K-Means Clustering",
        "content": "We will be using blobs datasets and show how clusters are made using Python programming language."
      },
      {
        "title": "7. Step 1: Importing the necessary libraries",
        "content": "We will be importing the following libraries. • Numpy : for numerical operations (e.g., distance calculation). • Matplotlib : for plotting data and results. • Scikit learn : to create a synthetic dataset using make_blobs Python ``` import numpy as np import matplotlib.pyplot as plt from sklearn.datasets import make_blobs ```"
      },
      {
        "title": "8. Step 2 : Creating Custom Dataset",
        "content": "We will generate a synthetic dataset with make_blobs. • make_blobs(n_samples=500, n_features=2, centers=3): Generates 500 data points in a 2D space, grouped into 3 clusters. • plt.scatter(X[:, 0], X[:, 1]): Plots the dataset in 2D, showing all the points. • plt.show(): Displays the plot Python ``` X,y = make_blobs(n_samples = 500,n_features = 2,centers = 3,random_state = 23) fig = plt.figure(0) plt.grid(True) plt.scatter(X[:,0],X[:,1]) plt.show() ``` Output : Clustering dataset"
      },
      {
        "title": "9. Step 3 :Feature Scaling using StandardScaler",
        "content": "Python ``` from sklearn.preprocessing import StandardScaler scaler = StandardScaler() X = scaler.fit_transform(X) ```"
      },
      {
        "title": "10. Step 4: Initializing Random Centroids",
        "content": "We will randomly initialize the centroids for K-Means clustering • np.random.seed(23): Ensures reproducibility by fixing the random seed. • The for loop initializes k random centroids, with values between -2 and 2, for a 2D dataset. Python ``` k = 3 clusters = {} np.random.seed(23) for idx in range(k): center = 2*(2*np.random.random((X.shape[1],))-1) points = [] cluster = { &#39;center&#39; : center, &#39;points&#39; : [] } clusters[idx] = cluster clusters ``` Output: Random Centroids"
      },
      {
        "title": "11. Step 5: Plotting Random Initialized Center with Data Points",
        "content": "We will now plot the data points and the initial centroids. • plt.grid() : Plots a grid. • plt.scatter(center[0], center[1], marker='*', c='red'): Plots the cluster center as a red star (* marker). Python ``` plt.scatter(X[:,0],X[:,1]) plt.grid(True) for i in clusters: center = clusters[i][&#39;center&#39;] plt.scatter(center[0],center[1],marker = &#39;*&#39;,c = &#39;red&#39;) plt.show() ``` Output : Data points with random center"
      },
      {
        "title": "12. Step 6: Defining Euclidean Distance",
        "content": "To assign data points to the nearest centroid, we define a distance function: • np.sqrt(): Computes the square root of a number or array element-wise. • np.sum(): Sums all elements in an array or along a specified axis Python ``` def distance(p1,p2): return np.sqrt(np.sum((p1-p2)**2)) ```"
      },
      {
        "title": "13. Step 7: Creating Assign and Update Functions",
        "content": "Next, we define functions to assign points to the nearest centroid and update the centroids based on the average of the points assigned to each cluster. • dist.append(dis): Appends the calculated distance to the list dist. • curr_cluster = np.argmin(dist): Finds the index of the closest cluster by selecting the minimum distance. • new_center = points.mean(axis=0): Calculates the new centroid by taking the mean of the points in the cluster. Python ``` def assign_clusters(X, clusters): for idx in range(X.shape[0]): dist = [] curr_x = X[idx] for i in range(k): dis = distance(curr_x,clusters[i][&#39;center&#39;]) dist.append(dis) curr_cluster = np.argmin(dist) clusters[curr_cluster][&#39;points&#39;].append(curr_x) return clusters def update_clusters(X, clusters): for i in range(k): points = np.array(clusters[i][&#39;points&#39;]) if points.shape[0] > 0: new_center = points.mean(axis =0) clusters[i][&#39;center&#39;] = new_center clusters[i][&#39;points&#39;] = [] return clusters ```"
      },
      {
        "title": "14. Step 8: Predicting the Cluster for the Data Points",
        "content": "We create a function to predict the cluster for each data point based on the final centroids. • pred.append(np.argmin(dist)): Appends the index of the closest cluster (the one with the minimum distance) to pred. Python ``` def pred_cluster(X, clusters): pred = [] for i in range(X.shape[0]): dist = [] for j in range(k): dist.append(distance(X[i],clusters[j][&#39;center&#39;])) pred.append(np.argmin(dist)) return pred ```"
      },
      {
        "title": "15. Step 9: Assigning, Updating and Predicting the Cluster Centers",
        "content": "The assign and update steps are repeated multiple times until the cluster centers stabilize or a maximum number of iterations is reached. • old_centers : Stores the current centroids before updating them. • assign_clusters(X, clusters) : Assigns each data point to its nearest centroid. • update_clusters(X, clusters) : Recalculates each centroid as the mean of the points assigned to its cluster. • np.allclose(old_centers, new_centers) : Checks whether the centroids have stabilized. If they have, the algorithm stops early. • pred_cluster(X, clusters) : Predicts the final cluster label for each data point using the converged centroids. Python ``` # Repeat until convergence or maximum iterations max_iters = 100 for _ in range(max_iters): old_centers = [clusters[i][&#39;center&#39;].copy() for i in range(k)] clusters = assign_clusters(X, clusters) clusters = update_clusters(X, clusters) new_centers = [clusters[i][&#39;center&#39;] for i in range(k)] if np.allclose(old_centers, new_centers): break pred = pred_cluster(X, clusters) ```"
      },
      {
        "title": "16. Step 10: Plotting Data Points with Predicted Cluster Centers",
        "content": "Finally, we plot the data points, colored by their predicted clusters, along with the updated centroids. • center = clusters[i]['center']: Retrieves the center (centroid) of the current cluster. • plt.scatter(center[0], center[1], marker='^', c='red'): Plots the cluster center as a red triangle (^ marker). Python ``` plt.scatter(X[:,0],X[:,1],c = pred) for i in clusters: center = clusters[i][&#39;center&#39;] plt.scatter(center[0],center[1],marker = &#39;^&#39;,c = &#39;red&#39;) plt.show() ``` Output : K-means Clustering You can download the source code from here ."
      },
      {
        "title": "17. Challenges",
        "content": "• Choosing the Right Number of Clusters ( k ): One of the biggest challenges is deciding how many clusters to use. • Sensitive to Initial Centroids: The final clusters can vary depending on the initial random placement of centroids. • Non-Spherical Clusters: K-Means assumes that the clusters are spherical and equally sized. This can be a problem when the actual clusters in the data are of different shapes or densities. • Outliers : K-Means is sensitive to outliers, which can distort the centroid and, ultimately, the clusters. Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "18. Explore",
        "content": "Machine Learning Basics • Introduction 3 min read • Types 7 min read • ML Pipeline 4 min read • Applications 2 min read Python for Machine Learning • ML with Python 3 min read • Numpy 3 min read • Pandas 4 min read • Data Preprocessing 4 min read • EDA 6 min read Feature Engineering • Feature Engineering 4 min read • Dimensionality Reduction 3 min read • Feature Selection 4 min read Supervised Learning • Supervised Learning 4 min read • Linear Regression 10 min read • Logistic Regression 9 min read • Decision Tree 8 min read • Random Forest 4 min read • KNN 7 min read • SVM 9 min read • Naive Bayes 6 min read Unsupervised Learning • Unsupervised Learning 5 min read • K means Clustering 7 min read • Hierarchical Clustering 6 min read • DBSCAN Clustering 6 min read • Apriori Algorithm 5 min read • FP Growth Algorithm 4 min read • ECLAT Algorithm 5 min read • PCA 6 min read Model Evaluation and Tuning • Evaluation Metrics 9 min read • Regularization 5 min read • Cross Validation 5 min read • Hyperparameter Tuning 5 min read • Underfitting and Overfitting 3 min read • Bias and Variance 6 min read Advanced Techniques • Reinforcement Learning 8 min read • Semi-Supervised Learning 5 min read • Self-Supervised Learning 5 min read • Ensemble Learning 6 min read Machine Learning Practice • Interview Questions 15+ min read • ML Projects 5 min read Courses • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: K means Clustering – Introduction",
      "initialCode": "# K means Clustering – Introduction\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np \n import matplotlib.pyplot as plt \n from sklearn.datasets import make_blobs",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: K means Clustering – Introduction",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What does the K in K-Means Clustering represent?",
      "options": [
        "The kernel function",
        "The number of clusters to partition data into",
        "The learning rate",
        "The number of iterations"
      ],
      "correctIndex": 1,
      "explanation": "K represents the number of clusters. K-Means partitions n data points into exactly K clusters by iteratively updating cluster centroids to minimize within-cluster variance."
    }
  },
  "ml-algorithms": {
    "id": "ml-algorithms",
    "badge": "Module 6 • Machine Learning",
    "readingTime": "36 min read",
    "level": "Intermediate",
    "title": "Machine Learning Algorithms",
    "subtitle": "Comprehensive guide on Machine Learning Algorithms from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Machine Learning Algorithms Last Updated : 1 Sep, 2026 • • • Machine learning algorithms are sets of rules that allow computers to learn from data, identify patterns and make predictions without being explicitly programmed. Instead of following fixed instructions, these algorithms improve their performance as they are exposed to more data. Machine learning is commonly categorized into three types: • Supervised Learning : Algorithms learn from labeled data, where the input-output relationship is known. • Unsupervised Learning : Algorithms work with unlabeled data to identify patterns or groupings. • Reinforcement Learning: Algorithms learn by interacting with an environment and receiving feedback in the form of rewards or penalties. Machine Learning Algorithms",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Machine Learning Algorithms with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Supervised Learning Algorithms",
        "content": "Supervised learning Algorithms are trained on datasets where each example is paired with a target or response variable, known as the label. The goal is to learn a mapping function from input data to the corresponding output labels, enabling the model to make accurate predictions on unseen data. Supervised Learning Algorithms Supervised learning problems are mainly divided into: • Classification : predicting categories • Regression : predicting continuous values"
      },
      {
        "title": "1. Linear Regression",
        "content": "Linear regression predicts a continuous value by fitting a straight line between input and output variables. Example: Predicting house prices based on area or predicting weight from height."
      },
      {
        "title": "2. Logistic Regression",
        "content": "Logistic regression is used for classification problems, not regression. Example: Spam detection (spam/not spam), disease prediction (yes/no) Note: Despite the name, logistic regression is a classification algorithm ."
      },
      {
        "title": "3. Decision Trees",
        "content": "Decision trees split data into branches based on feature values. Popular Decision Tree Algorithms: ID3 , C5 , CART"
      },
      {
        "title": "4. Support Vector Machines (SVM)",
        "content": "SVMs find the best boundary (hyperplane) that separates data points into different classes. Uses support vectors to define decision boundaries."
      },
      {
        "title": "5. k-Nearest Neighbors (k-NN)",
        "content": "k-NN predicts outcomes based on the closest data points in the training set. Uses distance metrics like Euclidean or Manhattan. Works for both classification and regression"
      },
      {
        "title": "6. Naive Bayes",
        "content": "Naive Bayes is based on Bayes’ Theorem and assumes features are independent. Common use case : Text classification, spam filtering"
      },
      {
        "title": "7. Random Forest",
        "content": "Random forest is an ensemble technique that combines multiple decision trees. It uses random sampling and feature selection. Reduces overfitting compared to a single tree."
      },
      {
        "title": "8. Gradient Boosting",
        "content": "Gradient boosting builds models sequentially, where each model corrects errors made by the previous one. Combines weak learners into a strong model. It works for both classification and regression. Popular Variants: • XGBoost : faster, regularized boosting • LightGBM : histogram-based, fast for large datasets • CatBoost : handles categorical data efficiently"
      },
      {
        "title": "9. Neural Networks ( Including Multilayer Perceptron)",
        "content": "In supervised learning, Neural Networks learn patterns using layers of connected neurons. It require labeled data. It trained using backpropagation and Used for classification and regression • Multilayer Perceptron (MLP): Neural network with input, hidden and output layers • Applications: Image classification, spam detection, price prediction"
      },
      {
        "title": "12. Unsupervised Learning Algorithms",
        "content": "Unsupervised learning works with unlabeled data to discover hidden patterns or structures without predefined outputs. These are again divided into three main categories based on their purpose: Clustering, Association Rule Mining and Dimensionality Reduction. Unsupervised Learning Algorithms"
      },
      {
        "title": "1. Clustering",
        "content": "Clustering algorithms group similar data points into clusters to identify natural patterns or groupings. They are commonly divided into Centroid-based, Distribution-based, Connectivity-based and Density-based methods. Centroid-Based Methods • K-Means : divides data into k clusters • K-Means++ : Improves K-Means by choosing better initial cluster centroids. • K-Mode : Groups categorical data based on modes instead of means. • Fuzzy C-Means : Allows data points to belong to multiple clusters with different membership levels. Distribution-Based Methods • Gaussian mixture models (GMMs) : Represents data as a mixture of multiple Gaussian distributions. • Expectation-Maximization : Estimates model parameters when some data or variables are hidden. • Dirichlet Process Mixture Models (DPMMs) : Automatically determines the number of clusters using a Bayesian approach. Connectivity-Based Methods • Hierarchical clustering : Builds a hierarchy of clusters by repeatedly merging or splitting groups. • Agglomerative Clustering : Starts with individual points and progressively merges similar clusters. • Divisive clustering : Starts with one cluster and progressively splits it into smaller clusters. • Affinity propagation : Identifies representative data points called exemplars to form clusters. Density-Based Methods • DBSCAN : detects arbitrary-shaped clusters and noise • OPTICS : Identifies clusters with different densities and detects noise in the data."
      },
      {
        "title": "2. Dimensionality Reduction",
        "content": "Dimensionality reduction reduces the number of features while keeping important information. • PCA : maximizes variance • t-SNE : visualization of high-dimensional data • NMF : works with non-negative data • ICA : Separates data into statistically independent components. • Isomap : Reduces dimensions while preserving relationships between data points. • LLE : Preserves local relationships between neighboring data points while reducing dimensions. • LSA (for text data) • Autoencoders : learn compact representations of data by encoding and reconstructing the input."
      },
      {
        "title": "3. Association Rule Mining",
        "content": "Association rule mining identifies relationships and patterns between items in large datasets, commonly used in market basket analysis. It finds frequent item combinations based on their occurrence and co-occurrence in the data. • Apriori : Finds frequent itemsets and generates association rules from them. • FP-Growth : Finds frequent itemsets efficiently using an FP-tree structure. • ECLAT : Finds frequent itemsets using a vertical representation of transaction data."
      },
      {
        "title": "16. Reinforcement Learning Algorithms",
        "content": "Reinforcement learning trains an agent to make decisions by interacting with an environment. • Learns through rewards and penalties • Goal is to maximize long-term reward Reinforcement Learning Algorithms"
      },
      {
        "title": "1. Model-Based Methods",
        "content": "• Value Iteration : Iteratively updates state values to find the optimal policy. • Monte Carlo Tree Search : Uses simulations to explore possible actions and select the most promising one."
      },
      {
        "title": "2 . Model-Free Methods",
        "content": "Value-Based Methods • Q-Learning : Learns the best action to take in each state by estimating future rewards. • SARSA : Learns action values based on the current state, action, reward and next state-action pair. • Monte Carlo Methods : Learn value functions by averaging rewards collected from complete episodes. Policy-Based Methods • REINFORCE : Learns an optimal policy by updating action probabilities based on received rewards. • Actor-Critic : Combines a policy-based actor with a value-based critic to improve decision-making. • A3C : Uses multiple agents working in parallel to learn policies and value functions."
      }
    ],
    "playground": {
      "title": "Python & ML Console: Machine Learning Algorithms",
      "initialCode": "# Machine Learning Algorithms\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Machine Learning Algorithms\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Machine Learning Algorithms",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "Which ML algorithm type is best suited for discovering hidden groups in unlabeled data?",
      "options": [
        "Linear Regression",
        "Support Vector Machine",
        "K-Means Clustering",
        "Logistic Regression"
      ],
      "correctIndex": 2,
      "explanation": "K-Means and other clustering algorithms are unsupervised methods designed to discover natural groupings in unlabeled data without predefined categories."
    }
  },
  "deep-learning-intro": {
    "id": "deep-learning-intro",
    "badge": "Module 7 • Deep Learning",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Introduction to Deep Learning",
    "subtitle": "Comprehensive guide on Introduction to Deep Learning from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Introduction to Deep Learning Last Updated : 2 May, 2026 • • • Deep Learning is transforming the way machines understand, learn and interact with complex data. Deep learning mimics neural networks of the human brain, it enables computers to autonomously uncover patterns and make informed decisions from vast amounts of unstructured data.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Introduction to Deep Learning with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. W orking of Deep Learning",
        "content": "Neural network consists of layers of interconnected nodes or neurons that collaborate to process input data. In a fully connected deep neural network data flows through multiple layers where each neuron performs nonlinear transformations, allowing the model to learn intricate representations of the data. In a deep neural network the input layer receives data which passes through hidden layers that transform the data using nonlinear functions. The final output layer generates the model’s prediction. For more details on neural networks refer to: What is a Neural Network? Neural Network"
      },
      {
        "title": "3. Machine Learning vs Deep Learning",
        "content": "Machine learning and Deep Learning both are subsets of artificial intelligence but there are many similarities and differences between them. Machine Learning and Deep Learning Aspect Machine Learning Deep Learning Basic Idea Applies statistical algorithms to learn patterns from data Uses artificial neural networks to learn patterns from data Data Requirement Works well with small to medium datasets Requires a large amount of data Task Complexity Better for simple and low-label tasks Better for complex tasks like image and text processing Training Time Takes less time to train Takes more time to train Feature Extraction Features are manually selected and extracted Features are automatically extracted Learning Process Not end-to-end End-to-end learning Model Complexity Less complex Highly complex Interpretability Easy to understand and explain Hard to interpret (black box) Hardware Requirement Can run on CPU, needs less computing power Needs GPU and high-performance systems Use Cases Spam detection, recommendation systems Image recognition, NLP, speech recognition"
      },
      {
        "title": "4. Evolution of Neural Architectures",
        "content": "Perceptron (1950s) • First simple neural network with a single layer • Could only solve linearly separable problems • Failed on complex tasks like the XOR problem Multi-Layer Perceptrons (MLPs) • Introduced hidden layers and non-linear activation functions • Enabled modeling of non-linear relationships • Trained effectively using backpropagation • Marked a major leap in neural network capabilities"
      },
      {
        "title": "5. Types of neural networks",
        "content": "• Feedforward neural networks (FNNs) : They are the simplest type of ANN, where data flows in one direction from input to output. It is used for basic tasks like classification. • Convolutional Neural Networks (CNNs) : They are specialized for processing grid-like data, such as images. CNNs use convolutional layers to detect spatial hierarchies, making them ideal for computer vision tasks. • Recurrent Neural Networks (RNNs) : Theyare able to process sequential data, such as time series and natural language. RNNs have loops to retain information over time, enabling applications like language modeling and speech recognition. Variants like LSTMs and GRUs address vanishing gradient issues. • Generative Adversarial Networks (GANs) : This consist of two networks—a generator and a discriminator—that compete to create realistic data. GANs are widely used for image generation, style transfer and data augmentation. • Autoencoders : They are unsupervised networks that learn efficient data encodings. They compress input data into a latent representation and reconstruct it, useful for dimensionality reduction and anomaly detection. • Transformer Networks : It has revolutionized NLP with self-attention mechanisms. Transformers excel at tasks like translation, text generation and sentiment analysis, powering models like GPT and BERT."
      },
      {
        "title": "1. Computer vision",
        "content": "In computer vision, deep learning models enable machines to identify and understand visual data. Some of the main applications of deep learning in computer vision include: • Object detection and recognition: Deep learning models are used to identify and locate objects within images and videos, making it possible for machines to perform tasks such as self-driving cars, surveillance and robotics. • Image classification: Deep learning models can be used to classify images into categories such as animals, plants and buildings. This is used in applications such as medical imaging, quality control and image retrieval. • Image segmentation: Deep learning models can be used for image segmentation into different regions, making it possible to identify specific features within images."
      },
      {
        "title": "2. Natural language processing (NLP)",
        "content": "In NLP, deep learning model enable machines to understand and generate human language. Some of the main applications of deep learning in NLP include: • Automatic Text Generation: Deep learning model can learn the corpus of text and new text like summaries, essays can be automatically generated using these trained models. • Language translation: Deep learning models can translate text from one language to another, making it possible to communicate with people from different linguistic backgrounds. • Sentiment analysis: Deep learning models can analyze the sentiment of a piece of text, making it possible to determine whether the text is positive, negative or neutral. • Speech recognition: Deep learning models can recognize and transcribe spoken words, making it possible to perform tasks such as speech-to-text conversion, voice search and voice-controlled devices."
      },
      {
        "title": "3. Reinforcement learning",
        "content": "In reinforcement learning, deep learning works as training agents to take action in an environment to maximize a reward. Some of the main applications of deep learning in reinforcement learning include: • Game playing: Deep reinforcement learning models have been able to beat human experts at games such as Go, Chess and Atari. • Robotics: Deep reinforcement learning models can be used to train robots to perform complex tasks such as grasping objects, navigation and manipulation. • Control systems: Deep reinforcement learning models can be used to control complex systems such as power grids, traffic management and supply chain optimization."
      },
      {
        "title": "9. Advantages",
        "content": "• Deep learning algorithms can achieve very high accuracy in tasks like image recognition and natural language processing. • They can automatically learn important features from data without the need for manual feature engineering. • These models can scale well to handle large and complex datasets, learning from massive amounts of data. • They are flexible and can be applied to a wide range of tasks involving different types of data such as images, text and speech."
      },
      {
        "title": "10. Disadvantages",
        "content": "• Deep learning requires large amounts of data for effective training, which can be difficult to collect. • Training these models is computationally expensive and often requires specialized hardware like GPUs and TPUs. • The models are complex and behave like a black box, making their results difficult to interpret. • If trained excessively on the same data, they can become too specialized, leading to overfitting and poor performance on new data. Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "11. Explore",
        "content": "Basics • Introduction 5 min read • AI vs ML vs DL 2 min read • Applications 3 min read • Challenges 7 min read • Importance 5 min read Neural Networks • Introduction 9 min read • Types 5 min read • Layers in ANN 4 min read • Activation functions 6 min read • Feedforward Neural Network 5 min read • Backpropagation 7 min read Deep Learning Models • CNN 5 min read • RNN 10 min read • LSTM 4 min read • GRU 5 min read • Transformers 5 min read • Autoencoders 6 min read • GAN 10 min read Model Evaluation • Gradient Descent 13 min read • Momentum-based Gradient Optimizer 3 min read • Adagrad 6 min read • RMSProp 4 min read • Adam Optimizer 5 min read Deep Learning Frameworks • TensorFlow 2 min read • PyTorch 5 min read • Caffe 8 min read • Apache MXNet 4 min read • Theano 3 min read Projects • Lung Cancer Detection 4 min read • Cat & Dog Classification 5 min read • Sentiment Analysis 3 min read • Text Generation using LSTM 4 min read • Machine Translation 5 min read • Interview Questions 15+ min read Courses • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Introduction to Deep Learning",
      "initialCode": "# Introduction to Deep Learning\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\n\n# Simple Neural Network - Forward Pass\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\ndef relu(x):\n    return np.maximum(0, x)\n\n# Network Architecture: 2 inputs -> 3 hidden -> 1 output\nnp.random.seed(42)\nW1 = np.random.randn(2, 3) * 0.1  # Input -> Hidden\nW2 = np.random.randn(3, 1) * 0.1  # Hidden -> Output\n\n# Forward pass\nX = np.array([[0.5, 0.8]])\nh = relu(X @ W1)          # Hidden layer\noutput = sigmoid(h @ W2)  # Output layer\n\nprint(f\"Input: {X}\")\nprint(f\"Hidden activations: {h}\")\nprint(f\"Output prediction: {output[0][0]:.4f}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Introduction to Deep Learning",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What makes Deep Learning 'deep'?",
      "options": [
        "It requires deep thinking",
        "It uses networks with many hidden layers that learn hierarchical feature representations",
        "It processes large files",
        "It uses recursive algorithms"
      ],
      "correctIndex": 1,
      "explanation": "Deep Learning uses neural networks with multiple hidden layers. Each layer learns increasingly abstract features: edges → shapes → objects → concepts."
    }
  },
  "neural-networks": {
    "id": "neural-networks",
    "badge": "Module 7 • Deep Learning",
    "readingTime": "36 min read",
    "level": "Advanced",
    "title": "Introduction To Neural Networks",
    "subtitle": "Comprehensive guide on Introduction To Neural Networks from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Introduction To Neural Networks Last Updated : 31 Aug, 2026 • • • Neural Networks are machine learning models inspired by the way the human brain processes information. They consist of interconnected layers of neurons that learn patterns from data and make predictions. • Learn complex patterns from large datasets. • Consist of input, hidden, and output layers. • Used in image recognition, text processing, speech recognition, and prediction tasks. Neural Networks are built from several key components: • Neurons : The basic units that receive inputs, each neuron is governed by a threshold and an activation function. • Connections : Links between neurons that carry information, regulated by weights and biases. • Weights and Biases : These parameters determine the strength and influence of connections. • Propagation Functions : Mechanisms that help process and transfer data across layers of neurons. • Learning Rule : The method that adjusts weights and biases over time to improve accuracy. Learning in neural networks follows a structured, three-stage process: • Input Computation : Data is fed into the network. • Output Generation : Based on the current parameters, the network generates an output. • Iterative Refinement : The network refines its output by adjusting weights and biases, gradually improving its performance on diverse tasks. The image illustrates the analogy between a biological neuron and an artificial neuron, showing how inputs are received and processed to produce outputs in both systems.",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "import numpy as np \n import pandas as pd \n from tensorflow.keras.models import Sequential \n from tensorflow.keras.layers import Dense"
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Introduction To Neural Networks with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Importance of Neural Networks",
        "content": "• Identify Complex Patterns: Recognize intricate structures and relationships in data; adapt to dynamic and changing environments. • Learn from Data: Handle vast datasets efficiently; improve performance with experience and retraining. • Drive Key Technologies: Power natural language processing (NLP); enable self-driving vehicles; support automated decision-making systems. • Boost Efficiency: Streamline workflows and processes; enhance productivity across industries. • Backbone of AI: Serve as the core driver of artificial intelligence progress; continue shaping the future of technology and innovation.",
        "code": {
          "language": "python",
          "caption": "Code Example: Importance of Neural Networks",
          "snippet": "data = { \n &#39;feature1&#39; : [ 0.1 , 0.2 , 0.3 , 0.4 , 0.5 ], \n &#39;feature2&#39; : [ 0.5 , 0.4 , 0.3 , 0.2 , 0.1 ], \n &#39;label&#39; : [ 0 , 0 , 1 , 1 , 1 ] \n } \n\n df = pd . DataFrame ( data ) \n X = df [[ &#39;feature1&#39; , &#39;feature2&#39; ]] . values \n y = df [ &#39;label&#39; ] . values"
        }
      },
      {
        "title": "3. Layers in Neural Network Architecture",
        "content": "Layers in Neural Network Architecture • Input Layer: This is where the network receives its input data. Each input neuron in the layer corresponds to a feature in the input data. • Hidden Layers: These layers perform most of the computational heavy lifting. A neural network can have one or multiple hidden layers. Each layer consists of units (neurons) that transform the inputs into something that the output layer can use. • Output Layer: The final layer produces the output of the model. The format of these outputs varies depending on the specific task like classification, regression.",
        "code": {
          "language": "python",
          "caption": "Code Example: Layers in Neural Network Architecture",
          "snippet": "model = Sequential () \n model . add ( Dense ( 8 , input_dim = 2 , activation = &#39;relu&#39; )) \n model . add ( Dense ( 1 , activation = &#39;sigmoid&#39; ))"
        }
      },
      {
        "title": "1. Forward Propagation",
        "content": "When data is input into the network, it passes through the network in the forward direction, from the input layer through the hidden layers to the output layer. This process is known as forward propagation. Here’s what happens during this phase: 1. Linear Transformation: Each neuron in a layer receives inputs which are multiplied by the weights associated with the connections. These products are summed together and a bias is added to the sum. This can be represented mathematically as: z = w_1x_1 + w_2x_2 + \\ldots + w_nx_n + b where • w represents the weights • x represents the inputs • b is the bias 2. Activation: The result of the linear transformation (denoted as z ) is then passed through an activation function. The activation function is crucial because it introduces non-linearity into the system, enabling the network to learn more complex patterns. Popular activation functions include ReLU, sigmoid and tanh.",
        "code": {
          "language": "python",
          "caption": "Code Example: 1. Forward Propagation",
          "snippet": "model . compile ( loss = &#39;binary_crossentropy&#39; , \n optimizer = &#39;adam&#39; , metrics = [ &#39;accuracy&#39; ])"
        }
      },
      {
        "title": "2. Backpropagation",
        "content": "After forward propagation, the network evaluates its performance using a loss function which measures the difference between the actual output and the predicted output. The goal of training is to minimize this loss. This is where backpropagation comes into play: • Loss Calculation: The network calculates the loss which provides a measure of error in the predictions. The loss function could vary; common choices are mean squared error for regression tasks or cross-entropy loss for classification. • Gradient Calculation: The network computes the gradients of the loss function with respect to each weight and bias in the network. This involves applying the chain rule of calculus to find out how much each part of the output error can be attributed to each weight and bias. • Weight Update: Once the gradients are calculated, the weights and biases are updated using an optimization algorithm like stochastic gradient descent (SGD). The weights are adjusted in the opposite direction of the gradient to minimize the loss. The size of the step taken in each update is determined by the learning rate.",
        "code": {
          "language": "python",
          "caption": "Code Example: 2. Backpropagation",
          "snippet": "model . fit ( X , y , epochs = 100 , batch_size = 1 , verbose = 1 )"
        }
      },
      {
        "title": "3. Iteration",
        "content": "This process of forward propagation, loss calculation, backpropagation and weight update is repeated for many iterations over the dataset. Over time, this iterative process reduces the loss and the network's predictions become more accurate. Through these steps, neural networks can adapt their parameters to better approximate the relationships in the data, thereby improving their performance on tasks such as classification, regression or any other predictive modeling."
      },
      {
        "title": "7. Example of Email Classification",
        "content": "Let's consider a record of an email dataset: Email ID Email Content Sender Subject Line Label 1 \"Get free gift cards now!\" spam@example.com \"Exclusive Offer\" 1 To classify this email, we will create a feature vector based on the analysis of keywords such as \"free\" \"win\" and \"offer\" The resulting feature vector is: • free: Present (1) • win: Absent (0) • offer: Present (1) Feature Vector: [1, 0, 1] The feature vector is passed through the neural network, where each neuron computes a weighted sum of the inputs and applies an activation function to produce its output. Hidden Layer Calculation: Assume the hidden layer contains two neurons with the following weights • Neuron H1: [ 0.5, −0.2, 0.3] • Neuron H2: [ 0.4, 0.1, −0.5] For the input vector [1, 0, 1], the weighted sums are: • For H1: ( 1 × 0.5) +(0 ×− 0.2) + ( 1 × 0.3) = 0.5 + 0+ 0.3 = 0.8 • For H2: (1 × 0.4) +(0 × 0.1) + ( 1 × −0.5) = 0.4 + 0 −0.5 =−0.1 Applying the ReLU activation function: • H1 Output: ReLU(0.8) = 0.8 • H2 Output: ReLu(-0.1) = 0 Output Layer: The outputs from the hidden layer are then passed to the output neuron. • Output Weights: [0.7, 0.2] • Input from Hidden Layer: [0.8, 0] • Weighted Sum: (0.8×0.7)+(0×0.2)=0.56+0=0.56 • Activation (Sigmoid): \\sigma(0.56) = \\frac{1}{1 + e^{-0.56}} \\approx 0.636 Final Classification: • The output value of approximately 0.636 indicates the probability of the email being spam. • Since this value is greater than 0.5, the neural network classifies the email as spam (1). Neural Network"
      },
      {
        "title": "1. Learning with Supervised Learning",
        "content": "In supervised learning, a neural network learns from labeled input-output pairs provided by a teacher. The network generates outputs based on inputs and by comparing these outputs to the known desired outputs, an error signal is created. The network iteratively adjusts its parameters to minimize errors until it reaches an acceptable performance level."
      },
      {
        "title": "2. Learning with Unsupervised Learning",
        "content": "Unsupervised learning involves data without labeled output variables. The primary goal is to understand the underlying structure of the input data (X). Unlike supervised learning, there is no instructor to guide the process. Instead, the focus is on modeling data patterns and relationships, with techniques like clustering and association commonly used."
      },
      {
        "title": "3. Learning with Reinforcement Learning",
        "content": "Reinforcement learning enables a neural network to learn through interaction with its environment. The network receives feedback in the form of rewards or penalties, guiding it to find an optimal policy or strategy that maximizes cumulative rewards over time. This approach is widely used in applications like gaming and decision-making. Neural networks are available in different types, each designed for specific tasks and data types. For more details, refer to Types of Neural Networks ."
      },
      {
        "title": "11. Implementation of Neural Network using TensorFlow",
        "content": "Here, we implement simple feedforward neural network that trains on a sample dataset and makes predictions using following steps:"
      },
      {
        "title": "12. Step 1: Import Necessary Libraries",
        "content": "Import necessary libraries, primarily TensorFlow and Keras , along with other required packages such as NumPy and Pandas for data handling. Python ``` import numpy as np import pandas as pd from tensorflow.keras.models import Sequential from tensorflow.keras.layers import Dense ```"
      },
      {
        "title": "13. Step 2: Create and Load Dataset",
        "content": "• Create or load a dataset. Convert the data into a format suitable for training (usually NumPy arrays). • Define features (X) and labels (y). Python ``` data = { &#39;feature1&#39;: [0.1, 0.2, 0.3, 0.4, 0.5], &#39;feature2&#39;: [0.5, 0.4, 0.3, 0.2, 0.1], &#39;label&#39;: [0, 0, 1, 1, 1] } df = pd.DataFrame(data) X = df[[&#39;feature1&#39;, &#39;feature2&#39;]].values y = df[&#39;label&#39;].values ```"
      },
      {
        "title": "14. Step 3: Create a Neural Network",
        "content": "Instantiate a Sequential model and add layers. The input layer and hidden layers are typically created using Dense layers, specifying the number of neurons and activation functions. Python ``` model = Sequential() model.add(Dense(8, input_dim=2, activation=&#39;relu&#39;)) model.add(Dense(1, activation=&#39;sigmoid&#39;)) ```"
      },
      {
        "title": "15. Step 4: Compiling the Model",
        "content": "Compile the model by specifying the loss function, optimizer and metrics to evaluate during training. Here we will use binary crossentropy and adam optimizer . Python ``` model.compile(loss=&#39;binary_crossentropy&#39;, optimizer=&#39;adam&#39;, metrics=[&#39;accuracy&#39;]) ```"
      },
      {
        "title": "16. Step 5: Train the Model",
        "content": "Fit the model on the training data, specifying the number of epochs and batch size. This step trains the neural network to learn from the input data. Python ``` model.fit(X, y, epochs=100, batch_size=1, verbose=1) ```"
      },
      {
        "title": "17. Step 6: Make Predictions",
        "content": "Use the trained model to make predictions on new data. Process the output to interpret the predictions like converting probabilities to binary outcomes. Python ``` test_data = np.array([[0.2, 0.4]]) prediction = model.predict(test_data) predicted_label = (prediction > 0.5).astype(int) ``` Output: Predicted label: 1"
      },
      {
        "title": "18. Applications",
        "content": "• Image and Video Recognition : CNNs are extensively used in applications such as facial recognition, autonomous driving and medical image analysis. • Natural Language Processing (NLP) : RNNs and transformers power language translation, chatbots and sentiment analysis. • Finance : Predicting stock prices, fraud detection and risk management. • Healthcare : Neural networks assist in diagnosing diseases, analyzing medical images and personalizing treatment plans. • Gaming and Autonomous Systems : Neural networks enable real-time decision-making, enhancing user experience in video games and enabling autonomous systems like self-driving cars."
      }
    ],
    "playground": {
      "title": "Python & ML Console: Introduction To Neural Networks",
      "initialCode": "# Introduction To Neural Networks\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np \n import pandas as pd \n from tensorflow.keras.models import Sequential \n from tensorflow.keras.layers import Dense",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Introduction To Neural Networks",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What does an activation function do in a neural network?",
      "options": [
        "Initializes weights to zero",
        "Introduces non-linearity, enabling the network to learn complex patterns",
        "Computes the loss function",
        "Determines the learning rate"
      ],
      "correctIndex": 1,
      "explanation": "Activation functions (ReLU, Sigmoid, Tanh) introduce non-linearity. Without them, a deep network would collapse to a single linear transformation regardless of depth."
    }
  },
  "cnn-intro": {
    "id": "cnn-intro",
    "badge": "Module 7 • Deep Learning",
    "readingTime": "36 min read",
    "level": "Advanced",
    "title": "Introduction to Convolution Neural Network",
    "subtitle": "Comprehensive guide on Introduction to Convolution Neural Network from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Introduction to Convolution Neural Network Last Updated : 12 May, 2026 • • • Convolutional Neural Networks (CNNs), are neural network architectures inspired by the human visual system, designed to process image data by capturing spatial relationships between pixels. • Learn hierarchical features from simple edges to complex objects • Capture spatial patterns using convolution operations • Detect objects regardless of their position in the image • Reduce computation by focusing on local regions instead of the entire image Convolutional Neural Networks",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "import tensorflow as tf \n import matplotlib.pyplot as plt \n\n plt . rc ( &#39;image&#39; , cmap = &#39;gray&#39; ) \n plt . rc ( &#39;figure&#39; , autolayout = True )"
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Introduction to Convolution Neural Network with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Key Components of CNN",
        "content": "A complete Convolution Neural Networks architecture is also known as covnets. A covnets is a sequence of layers and every layer transforms one volume to another through a differentiable function. Let’s take an example by running a covnets on of image of dimension 32 x 32 x 3.",
        "code": {
          "language": "python",
          "caption": "Code Example: Key Components of CNN",
          "snippet": "image_path = \"Image Path\" \n\n image = tf . io . read_file ( image_path ) \n image = tf . io . decode_jpeg ( image , channels = 1 ) \n image = tf . image . resize ( image , [ 300 , 300 ]) \n image = tf . image . convert_image_dtype ( image , tf . float32 ) \n\n print ( \"Original Image Shape:\" , image . shape ) \n\n plt . figure ( figsize = ( 5 , 5 )) \n plt . imshow ( tf . squeeze ( image )) \n plt . title ( \"Original Image\" ) \n plt . axis ( &#39;off&#39; ) \n plt . show () \n\n # Add batch dimension \n image = tf . expand_dims ( image , axis = 0 )"
        }
      },
      {
        "title": "1. Input Layer",
        "content": "The input layer receives the raw image data and passes it to the network for processing. In CNNs, input is typically a 3D volume (width × height × depth). • Stores pixel values of the image (e.g., 32 × 32 × 3 for RGB images). • Preserves the spatial structure of the image for further feature extraction.",
        "code": {
          "language": "python",
          "caption": "Code Example: 1. Input Layer",
          "snippet": "kernel = tf . constant ([ \n [ - 1 , - 1 , - 1 ], \n [ - 1 , 8 , - 1 ], \n [ - 1 , - 1 , - 1 ] \n ], dtype = tf . float32 ) \n\n kernel = tf . reshape ( kernel , [ 3 , 3 , 1 , 1 ])"
        }
      },
      {
        "title": "2. Convolutional Layer",
        "content": "The Convolutional Layer is responsible for extracting important features from the input data. It applies a set of learnable filters (kernels) that slide over the image and compute the dot product between the filter weights and corresponding image patches, producing feature maps. • Uses small filters (e.g., 2×2, 3×3, 5×5) to scan the input image. • Generates feature maps that capture patterns such as edges, textures and shapes. Example: Using 12 filters results in an output volume of 32 × 32 × 12.",
        "code": {
          "language": "python",
          "caption": "Code Example: 2. Convolutional Layer",
          "snippet": "conv_output = tf . nn . conv2d ( \n input = image , \n filters = kernel , \n strides = [ 1 , 1 , 1 , 1 ], \n padding = &#39;SAME&#39; \n ) \n\n print ( \"After Convolution Shape:\" , conv_output . shape ) \n\n plt . figure ( figsize = ( 5 , 5 )) \n plt . imshow ( tf . squeeze ( conv_output )) \n plt . title ( \"After Convolution\" ) \n plt . axis ( &#39;off&#39; ) \n plt . show ()"
        }
      },
      {
        "title": "3. Activation Layer",
        "content": "The Activation Layer introduces non-linearity into the network by applying an element-wise activation function to the output of the convolution layer. This enables the model to learn complex patterns beyond linear relationships. • Common activation functions include ReLU, Tanh and Leaky ReLU. • Applied element-wise to the feature maps. • The output dimensions remain unchanged (e.g., 32 × 32 × 12).",
        "code": {
          "language": "python",
          "caption": "Code Example: 3. Activation Layer",
          "snippet": "relu_output = tf . nn . relu ( conv_output ) \n\n print ( \"After ReLU Shape:\" , relu_output . shape ) \n\n plt . figure ( figsize = ( 5 , 5 )) \n plt . imshow ( tf . squeeze ( relu_output )) \n plt . title ( \"After ReLU Activation\" ) \n plt . axis ( &#39;off&#39; ) \n plt . show ()"
        }
      },
      {
        "title": "4. Pooling Layer",
        "content": "The Pooling Layer is used to reduce the spatial dimensions of the feature maps, making computation faster, reducing memory usage and helping to prevent overfitting. It is typically inserted between convolutional layers in a CNN. • Common types include Max Pooling and Average Pooling. • Reduces width and height while keeping depth unchanged. Example: Using 2 × 2 max pooling with stride 2 reduces the volume from 32 × 32 × 12 to 16 × 16 × 12. Max Pooling"
      },
      {
        "title": "5. Flattening",
        "content": "Flattening converts the multi-dimensional feature maps into a one-dimensional vector after convolution and pooling. This vector is then passed to the fully connected layer for classification or regression. Example: Flattening 16 × 16 × 12 results in a vector of size 3072 (16 × 16 × 12)."
      },
      {
        "title": "6. Fully Connected Layer",
        "content": "The fully connected (dense) layer performs high-level reasoning using extracted features and produces the final classification scores. Example: The 3072-length vector is connected to neurons for classification"
      },
      {
        "title": "7. Output Layer",
        "content": "The output layer converts final scores into probabilities using activation functions like Sigmoid (binary classification) or Softmax (multi-class classification). Example: For 10 classes, Softmax produces 10 probability values each representing the likelihood of a class."
      },
      {
        "title": "10. How Convolutional Layers Work",
        "content": "Convolution Operation • A small matrix called a filter (kernel) slides over the input image to extract important features. • At each position, the filter performs element-wise multiplication with the image patch. • The multiplied values are summed together to produce a single output value. • This operation is repeated across the entire image using a defined stride. • The result is a new matrix called a feature map, which highlights detected patterns. • Multiple filters are applied to capture different features such as edges, textures and shapes. • The process preserves spatial relationships while reducing the number of learnable parameters compared to fully connected layers. • Padding can be used to control output size and prevent loss of border information."
      },
      {
        "title": "11. Step By Step Implementation",
        "content": "Here we implement a Convolutional Neural Network illustrating how each layer processes and transforms the input image."
      },
      {
        "title": "12. Step 1: Import Required Libraries",
        "content": "Here we import TensorFlow for CNN operations and Matplotlib for visualization. Python ``` import tensorflow as tf import matplotlib.pyplot as plt plt.rc(&#39;image&#39;, cmap=&#39;gray&#39;) plt.rc(&#39;figure&#39;, autolayout=True) ```"
      },
      {
        "title": "13. Step 2: Load and Preprocess the Image",
        "content": "Load the image convert it to grayscale, resize it to 300×300 and normalize pixel values. Python ``` image_path = \"Image Path\" image = tf.io.read_file(image_path) image = tf.io.decode_jpeg(image, channels=1) image = tf.image.resize(image, [300, 300]) image = tf.image.convert_image_dtype(image, tf.float32) print(\"Original Image Shape:\", image.shape) plt.figure(figsize=(5,5)) plt.imshow(tf.squeeze(image)) plt.title(\"Original Image\") plt.axis(&#39;off&#39;) plt.show() # Add batch dimension image = tf.expand_dims(image, axis=0) ``` Output: Original Image"
      },
      {
        "title": "14. Step 3: Define Convolution Kernel",
        "content": "We define an edge detection filter (Laplacian kernel) to extract important image features. Python ``` kernel = tf.constant([ [-1, -1, -1], [-1, 8, -1], [-1, -1, -1] ], dtype=tf.float32) kernel = tf.reshape(kernel, [3, 3, 1, 1]) ```"
      },
      {
        "title": "15. Step 4: Apply Convolution Layer",
        "content": "The convolution layer applies the filter to the image to detect edges and features. Python ``` conv_output = tf.nn.conv2d( input=image, filters=kernel, strides=[1, 1, 1, 1], padding=&#39;SAME&#39; ) print(\"After Convolution Shape:\", conv_output.shape) plt.figure(figsize=(5,5)) plt.imshow(tf.squeeze(conv_output)) plt.title(\"After Convolution\") plt.axis(&#39;off&#39;) plt.show() ``` Output: Convolution Operation"
      },
      {
        "title": "16. Step 5: Apply ReLU Activation Function",
        "content": "ReLU removes negative values and introduces non-linearity into the network. Python ``` relu_output = tf.nn.relu(conv_output) print(\"After ReLU Shape:\", relu_output.shape) plt.figure(figsize=(5,5)) plt.imshow(tf.squeeze(relu_output)) plt.title(\"After ReLU Activation\") plt.axis(&#39;off&#39;) plt.show() ``` Output: Output"
      },
      {
        "title": "17. Step 6: Apply Max Pooling Layer",
        "content": "Max pooling reduces spatial dimensions while keeping important features. Python ``` pool_output = tf.nn.max_pool2d( input=relu_output, ksize=[1, 2, 2, 1], strides=[1, 2, 2, 1], padding=&#39;SAME&#39; ) print(\"After Pooling Shape:\", pool_output.shape) plt.figure(figsize=(5,5)) plt.imshow(tf.squeeze(pool_output)) plt.title(\"After Max Pooling\") plt.axis(&#39;off&#39;) plt.show() ``` Output: Max Pooling"
      },
      {
        "title": "18. Step 7: Apply Flatten Layer",
        "content": "The flatten layer converts 2D feature maps into a 1D feature vector for fully connected layers. Python ``` flatten_layer = tf.keras.layers.Flatten() flatten_output = flatten_layer(pool_output) print(\"After Flatten Shape:\", flatten_output.shape) print(\"First 20 Flattened Values:\") print(flatten_output.numpy()[0][:20]) ``` Output: After Flatten Shape: (1, 22500) First 20 values of Flattened Vector: [135. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81. 81.]"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Introduction to Convolution Neural Network",
      "initialCode": "# Introduction to Convolution Neural Network\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport tensorflow as tf \n import matplotlib.pyplot as plt \n\n plt . rc ( &#39;image&#39; , cmap = &#39;gray&#39; ) \n plt . rc ( &#39;figure&#39; , autolayout = True )",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Introduction to Convolution Neural Network",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is the role of a convolutional layer in a CNN?",
      "options": [
        "To flatten the input",
        "To apply learned filters that detect local spatial patterns (edges, textures)",
        "To compute the final classification",
        "To normalize inputs"
      ],
      "correctIndex": 1,
      "explanation": "Convolutional layers apply learnable filters (kernels) across the input to detect local spatial features like edges, corners, and textures through shared weights."
    }
  },
  "rnn-intro": {
    "id": "rnn-intro",
    "badge": "Module 7 • Deep Learning",
    "readingTime": "36 min read",
    "level": "Advanced",
    "title": "Introduction to Recurrent Neural Networks",
    "subtitle": "Comprehensive guide on Introduction to Recurrent Neural Networks from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Introduction to Recurrent Neural Networks Last Updated : 6 May, 2026 • • • Recurrent Neural Networks (RNNs) are a class of neural networks designed to process sequential data by retaining information from previous steps. They are especially effective for tasks where context and order matter. • Designed for sequential and temporal data • Maintains memory of past inputs • Widely used in NLP, forecasting and speech tasks Imagine reading a sentence and you try to predict the next word, you don’t rely only on the current word but also remember the words that came before. RNNs work similarly by “remembering” past information i.e it considers all the earlier words to choose the most likely next word. This memory of previous steps helps the network understand context and make better predictions.",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "import numpy as np \n import tensorflow as tf \n from tensorflow.keras.models import Sequential \n from tensorflow.keras.layers import SimpleRNN , Dense"
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Introduction to Recurrent Neural Networks with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Key Components of RNNs",
        "content": "There are mainly two components of RNNs that we will discuss.",
        "code": {
          "language": "python",
          "caption": "Code Example: Key Components of RNNs",
          "snippet": "text = \"This is GeeksforGeeks a software training institute\" \n chars = sorted ( list ( set ( text ))) \n char_to_index = { char : i for i , char in enumerate ( chars )} \n index_to_char = { i : char for i , char in enumerate ( chars )}"
        }
      },
      {
        "title": "1. Recurrent Neurons",
        "content": "The fundamental processing unit in RNN is a Recurrent Unit . They hold a hidden state that maintains information about previous inputs in a sequence. Recurrent units can \"remember\" information from prior steps by feeding back their hidden state, allowing them to capture dependencies across time. Recurrent Neurons",
        "code": {
          "language": "python",
          "caption": "Code Example: 1. Recurrent Neurons",
          "snippet": "seq_length = 3 \n sequences = [] \n labels = [] \n\n for i in range ( len ( text ) - seq_length ): \n seq = text [ i : i + seq_length ] \n label = text [ i + seq_length ] \n sequences . append ([ char_to_index [ char ] for char in seq ]) \n labels . append ( char_to_index [ label ]) \n\n X = np . array ( sequences ) \n y = np . array ( labels )"
        }
      },
      {
        "title": "2. RNN Unfolding",
        "content": "RNN unfolding or unrolling is the process of expanding the recurrent structure over time steps. During unfolding each step of the sequence is represented as a separate layer in a series illustrating how information flows across each time step. This unrolling enables backpropagation through time (BPTT) a learning process where errors are propagated across time steps to adjust the network’s weights enhancing the RNN’s ability to learn dependencies within sequential data. RNN Unfolding",
        "code": {
          "language": "python",
          "caption": "Code Example: 2. RNN Unfolding",
          "snippet": "X_one_hot = tf . one_hot ( X , len ( chars )) \n y_one_hot = tf . one_hot ( y , len ( chars ))"
        }
      },
      {
        "title": "5. Recurrent Neural Network Architecture",
        "content": "RNNs share similarities in input and output structures with other deep learning architectures but differ significantly in how information flows from input to output. Unlike traditional deep neural networks where each dense layer has distinct weight matrices. RNNs use shared weights across time steps, allowing them to remember information over sequences. In RNNs the hidden state H_i ​ is calculated for every input X_i ​ to retain sequential dependencies. The computations follow these core formulas: 1. Hidden State Calculation : h_t = \\sigma(U \\cdot X_t + W \\cdot h_{t-1} + B) Here: • h represents the current hidden state. • \\sigma represents tanh activation function • U and W are weight matrices. • B is the bias. 2. Output Calculation : Y = O(V \\cdot h + C) The output Y is calculated by applying O an activation function to the weighted hidden state where V and C represent weights and bias. 3. Overall Function : Y = f(X, h, W, U, V, B, C) This function defines the entire RNN operation where the state matrix S holds each element s_i representing the network's state at each time step i .",
        "code": {
          "language": "python",
          "caption": "Code Example: Recurrent Neural Network Architecture",
          "snippet": "model = Sequential () \n model . add ( SimpleRNN ( 50 , input_shape = ( seq_length , len ( chars )), activation = &#39;relu&#39; )) \n model . add ( Dense ( len ( chars ), activation = &#39;softmax&#39; ))"
        }
      },
      {
        "title": "6. Working of RNN",
        "content": "At each time step RNNs process units with a fixed activation function. These units have an internal hidden state that acts as memory that retains information from previous time steps. This memory allows the network to store past knowledge and adapt based on new inputs."
      },
      {
        "title": "7. Updating the Hidden State in RNNs",
        "content": "The current hidden state h_t ​ depends on the previous state h_{t-1} ​ and the current input x_t ​ and is calculated using the following relations: 1. State Update : h_t = f(h_{t-1}, x_t) where: • h_t ​ is the current state • h_{t-1} ​ is the previous state • x_t is the input at the current time step 2. Activation Function Application : h_t = \\tanh(W_{hh} \\cdot h_{t-1} + W_{xh} \\cdot x_t) Here, W_{hh} ​ is the weight matrix for the recurrent neuron and W_{xh} ​ is the weight matrix for the input neuron. 3. Output Calculation : y_t = W_{hy} \\cdot h_t where y_t ​ is the output and W_{hy} ​ is the weight at the output layer. These parameters are updated using backpropagation. However, since RNN works on sequential data here we use an updated backpropagation which is known as backpropagation through time."
      },
      {
        "title": "8. Backpropagation Through Time (BPTT) in RNNs",
        "content": "Since RNNs process sequential data, Backpropagation Through Time (BPTT) is used to update the network's parameters. The loss function L(θ) depends on the final hidden state h_3 and each hidden state relies on preceding ones forming a sequential dependency chain: h_3 \\text{ depends on } h_2, \\, h_2 \\text{ depends on } h_1, \\, \\dots, \\, h_1 \\text{ depends on } h_0 ​. Backpropagation Through Time (BPTT) in RNNs In BPTT, gradients are backpropagated through each time step. This is essential for updating network parameters based on temporal dependencies. 1. Simplified Gradient Calculation: \\frac{\\partial L(\\theta)}{\\partial W} = \\frac{\\partial L (\\theta)}{\\partial h_3} \\cdot \\frac{\\partial h_3}{\\partial W} 2. Handling Dependencies in Layers: Each hidden state is updated based on its dependencies: h_3 = \\sigma(W \\cdot h_2 + b) The gradient is then calculated for each state, considering dependencies from previous hidden states. 3. Gradient Calculation with Explicit and Implicit Parts: The gradient is broken down into explicit and implicit parts summing up the indirect paths from each hidden state to the weights. \\frac{\\partial h_3}{\\partial W} = \\frac{\\partial h_3^{+}}{\\partial W} + \\frac{\\partial h_3}{\\partial h_2} \\cdot \\frac{\\partial h_2^{+}}{\\partial W} 4. Final Gradient Expression: The final derivative of the loss function with respect to the weight matrix W is computed: \\frac{\\partial L(\\theta)}{\\partial W} = \\frac{\\partial L(\\theta)}{\\partial h_3} \\cdot \\sum_{k=1}^{3} \\frac{\\partial h_3}{\\partial h_k} \\cdot \\frac{\\partial h_k}{\\partial W} This iterative process is the essence of backpropagation through time."
      },
      {
        "title": "9. Types Of Recurrent Neural Networks",
        "content": "There are four types of RNNs based on the number of inputs and outputs in the network:"
      },
      {
        "title": "1. One-to-One RNN",
        "content": "This is the simplest type of neural network architecture where there is a single input and a single output. It is used for straightforward classification tasks such as binary classification where no sequential data is involved. One-to-One RNN"
      },
      {
        "title": "2. One-to-Many RNN",
        "content": "In a One-to-Many RNN the network processes a single input to produce multiple outputs over time. This is useful in tasks where one input triggers a sequence of predictions (outputs). For example in image captioning a single image can be used as input to generate a sequence of words as a caption. One-to-Many RNN"
      },
      {
        "title": "3. Many-to-One RNN",
        "content": "The Many-to-One RNN receives a sequence of inputs and generates a single output. This type is useful when the overall context of the input sequence is needed to make one prediction. In sentiment analysis the model receives a sequence of words (like a sentence) and produces a single output like positive, negative or neutral. Many-to-One RNN"
      },
      {
        "title": "4. Many-to-Many RNN",
        "content": "The Many-to-Many RNN type processes a sequence of inputs and generates a sequence of outputs. In language translation task a sequence of words in one language is given as input and a corresponding sequence in another language is generated as output. Many-to-Many RNN"
      },
      {
        "title": "14. Variants of Recurrent Neural Networks (RNNs)",
        "content": "There are several variations of RNNs, each designed to address specific challenges or optimize for certain tasks:"
      },
      {
        "title": "1. Vanilla RNN",
        "content": "This simplest form of RNN consists of a single hidden layer where weights are shared across time steps. Vanilla RNNs are suitable for learning short-term dependencies but are limited by the vanishing gradient problem, which hampers long-sequence learning."
      },
      {
        "title": "2. Bidirectional RNNs",
        "content": "Bidirectional RNNs process inputs in both forward and backward directions, capturing both past and future context for each time step. This architecture is ideal for tasks where the entire sequence is available, such as named entity recognition and question answering."
      },
      {
        "title": "3. Long Short-Term Memory Networks (LSTMs)",
        "content": "Long Short-Term Memory Networks (LSTMs) introduce a memory mechanism to overcome the vanishing gradient problem. Each LSTM cell has three gates: • Input Gate : Controls how much new information should be added to the cell state. • Forget Gate : Decides what past information should be discarded. • Output Gate : Regulates what information should be output at the current step. This selective memory enables LSTMs to handle long-term dependencies, making them ideal for tasks where earlier context is critical."
      },
      {
        "title": "4. Gated Recurrent Units (GRUs)",
        "content": "Gated Recurrent Units (GRUs) simplify LSTMs by combining the input and forget gates into a single update gate and streamlining the output mechanism. This design is computationally efficient, often performing similarly to LSTMs and is useful in tasks where simplicity and faster training are beneficial."
      }
    ],
    "playground": {
      "title": "Python & ML Console: Introduction to Recurrent Neural Networks",
      "initialCode": "# Introduction to Recurrent Neural Networks\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np \n import tensorflow as tf \n from tensorflow.keras.models import Sequential \n from tensorflow.keras.layers import SimpleRNN , Dense",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Introduction to Recurrent Neural Networks",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What makes Recurrent Neural Networks (RNN) suitable for sequential data?",
      "options": [
        "They have more parameters",
        "They maintain a hidden state that captures information from previous time steps",
        "They use convolutional layers",
        "They process all inputs simultaneously"
      ],
      "correctIndex": 1,
      "explanation": "RNNs have a recurrent connection where the hidden state from the previous time step is fed into the current step, allowing the network to maintain memory of past inputs."
    }
  },
  "backpropagation": {
    "id": "backpropagation",
    "badge": "Module 7 • Deep Learning",
    "readingTime": "36 min read",
    "level": "Advanced",
    "title": "Backpropagation in Neural Network",
    "subtitle": "Comprehensive guide on Backpropagation in Neural Network from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Backpropagation in Neural Network Last Updated : 29 Sep, 2026 • • • Backpropagation is an algorithm that trains neural networks by reducing prediction error. It works by propagating errors backward, computing gradients using the chain rule and updating weights and biases to improve performance. • Computes gradients of the loss function with respect to each weight using the chain rule • Updates weights and biases efficiently to reduce error • Scales well to deep and complex neural networks • Enables automatic learning and continuous improvement across training iterations Fig(a) A simple illustration of how the backpropagation works by adjustments of weights",
        "code": {
          "language": "python",
          "caption": "Code Example: Overview",
          "snippet": "import numpy as np \n\n class NeuralNetwork : \n def __init__ ( self , input_size , hidden_size , output_size ): \n self . input_size = input_size \n self . hidden_size = hidden_size \n self . output_size = output_size \n\n self . weights_input_hidden = np . random . randn ( \n self . input_size , self . hidden_size ) \n self . weights_hidden_output = np . random . randn ( \n self . hidden_size , self . output_size ) \n\n self . bias_hidden = np . zeros (( 1 , self . hidden_size )) \n self . bias_output = np . zeros (( 1 , self . output_size )) \n\n def sigmoid ( self , x ): \n return 1 / ( 1 + np . exp ( - x "
        },
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Backpropagation in Neural Network with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Working of Back Propagation Algorithm",
        "content": "The Back Propagation algorithm involves two main steps:",
        "code": {
          "language": "python",
          "caption": "Code Example: Working of Back Propagation Algorithm",
          "snippet": "def feedforward ( self , X ): \n self . hidden_activation = np . dot ( \n X , self . weights_input_hidden ) + self . bias_hidden \n self . hidden_output = self . sigmoid ( self . hidden_activation ) \n\n self . output_activation = np . dot ( \n self . hidden_output , self . weights_hidden_output ) + self . bias_output \n self . predicted_output = self . sigmoid ( self . output_activation ) \n\n return self . predicted_output"
        }
      },
      {
        "title": "1. Forward Pass Work",
        "content": "In forward pass , input data moves through the network to generate an output. • Input data is passed to the input layer and forwarded to hidden layers • Each neuron computes a weighted sum and adds a bias • Activation functions (like ReLU ) are applied to produce outputs • Outputs from one layer become inputs to the next layer • Final layer uses functions like softmax to produce predictions (e.g., probabilities for classification) The forward pass using weights and biases",
        "code": {
          "language": "python",
          "caption": "Code Example: 1. Forward Pass Work",
          "snippet": "def backward ( self , X , y , learning_rate ): \n output_error = y - self . predicted_output \n output_delta = output_error * \\\n self . sigmoid_derivative ( self . predicted_output ) \n\n hidden_error = np . dot ( output_delta , self . weights_hidden_output . T ) \n hidden_delta = hidden_error * self . sigmoid_derivative ( self . hidden_output ) \n\n self . weights_hidden_output += np . dot ( self . hidden_output . T , \n output_delta ) * learning_rate \n self . bias_output += np . sum ( output_delta , axis = 0 , \n keepdims = True ) * learning_rate \n self . weights_input_hidden += np . dot ( X . T , hi"
        }
      },
      {
        "title": "2. Backward Pass",
        "content": "In this step, the error between predicted and actual output is propagated backward to update weights and biases. Error is calculated (e.g., using Mean Squared Error) \\text{MSE} = (\\text{Predicted Output} - \\text{Actual Output})^2 • Gradients are computed using the chain rule • Weights and biases are updated to reduce the error • Process continues layer by layer from output to input • Derivatives of activation functions are used to compute gradients effectively",
        "code": {
          "language": "python",
          "caption": "Code Example: 2. Backward Pass",
          "snippet": "def train ( self , X , y , epochs , learning_rate ): \n for epoch in range ( epochs ): \n output = self . feedforward ( X ) \n self . backward ( X , y , learning_rate ) \n if epoch % 4000 == 0 : \n loss = np . mean ( np . square ( y - output )) \n print ( f \"Epoch { epoch } , Loss: { loss } \" )"
        }
      },
      {
        "title": "5. Example",
        "content": "Let’s walk through an example of Back Propagation in machine learning. Assume the neurons use the sigmoid activation function for the forward and backward pass. The target output is 0.5 and the learning rate is 1. Example (1) of backpropagation sum",
        "code": {
          "language": "python",
          "caption": "Code Example: Example",
          "snippet": "X = np . array ([[ 0 , 0 ], [ 0 , 1 ], [ 1 , 0 ], [ 1 , 1 ]]) \n y = np . array ([[ 0 ], [ 1 ], [ 1 ], [ 0 ]]) \n\n nn = NeuralNetwork ( input_size = 2 , hidden_size = 4 , output_size = 1 ) \n nn . train ( X , y , epochs = 10000 , learning_rate = 0.1 ) \n\n output = nn . feedforward ( X ) \n print ( \"Predictions after training:\" ) \n print ( output )"
        }
      },
      {
        "title": "1. Initial Calculation",
        "content": "The weighted sum at each node is calculated using: a _j =∑(w_i ,j∗x _i ) Where, • a_j is the weighted sum of all the inputs and weights at each node • w_{i,j} represents the weights between the i^{th} input and the j^{th} neuron • x_i represents the value of the i^{th} input O (output): After applying the activation function to a , we get the output of the neuron: o_j = activation function( a_j )"
      },
      {
        "title": "2. Sigmoid Function",
        "content": "The sigmoid function returns a value between 0 and 1, introducing non-linearity into the model. y_j = \\frac{1}{1+e^{-a_j}} To find the outputs of y3, y4 and y5"
      },
      {
        "title": "3. Computing Outputs",
        "content": "At h1 node \\begin {aligned}a_1 &= (w_{1,1} x_1) + (w_{2,1} x_2) \\\\& = (0.2 * 0.35) + (0.2* 0.7)\\\\&= 0.21\\end {aligned} Once we calculated the a 1 value, we can now proceed to find the y 3 value: y_j= F(a_j) = \\frac 1 {1+e^{-a_1}} y_3 = F(0.21) = \\frac 1 {1+e^{-0.21}} y_3 = 0.5522 Similarly find the values of y 4 at h 2 and y 5 at O 3 a_2 = (w_{1,2} * x_1) + (w_{2,2} * x_2) = (0.3*0.35)+(0.3*0.7)=0.315 y_4 = F(0.315) = \\frac 1{1+e^{-0.315}} = 0.5781 a_3 = (w_{1,3}*y_3)+(w_{2,3}*y_4) =(0.3*0.5522)+(0.9*0.5781) =0.686 y_5 = F(0.686) = \\frac 1 {1+e^{-0.686} } = 0.665 Values of y3, y4 and y5"
      },
      {
        "title": "4. Error Calculation",
        "content": "Our actual output is 0.5 but we obtained 0.67 . To calculate the error we can use the below formula: Error_j= y_{target} - y_5 \\text{=>} \\space 0.5 - 0.665 = -0.165 Using this error value we will be backpropagating."
      },
      {
        "title": "1. Calculating Gradients",
        "content": "The change in each weight is calculated as: \\Delta w_{ij} = \\eta \\times \\delta_j \\times O_j Where: • \\delta_j ​ is the error term for each unit, • \\eta is the learning rate."
      },
      {
        "title": "2. Output Unit Error",
        "content": "For O 3 : \\delta_5 = y_5(1-y_5) (y_{target} - y_5) = 0.665(1-0.665)(-0.165) = -0.0367"
      },
      {
        "title": "3. Hidden Unit Error",
        "content": "For h 1 : \\delta_3 = y_3 (1-y_3)(w_{1,3} \\times \\delta_5) = 0.5522(1-0.5522)(0.3 \\times -0.0367) = -0.00273 For h 2 : \\delta_4 = y_4(1-y_4)(w_{2,3} \\times \\delta_5) =0.5781 (1-0.5781)(0.9 \\times -0.0367) = -0.0080"
      },
      {
        "title": "4. Weight Updates",
        "content": "The general formula is: {\\Delta w_{j,3}=\\eta\\delta_5 y_j} Therefore: • \\Delta w_{1,3}=\\eta\\delta_5y_3 • \\Delta w_{2,3}=\\eta\\delta_5y_4 For w_{1,3} : \\Delta w_{1,3} = 1\\times(-0.0367)\\times0.5522 \\approx-0.0203 : w_{1,3}(\\text{new}) = 0.3+(-0.0203) w_{1,3}\\approx0.2797 For w_{2,3} : \\Delta w_{2,3} = 1 \\times (-0.0367) \\times 0.5781 = -0.0212 w_{2,3}(\\text{new}) = -0.0212 + 0.9 = 0.8788 For the weights from the input layer to the hidden layer: \\Delta w_{1,1}=\\eta\\delta_3x_1 \\\\ \\Delta w_{2,1}=\\eta\\delta_3x_2 \\\\ \\Delta w_{1,2}=\\eta\\delta_4x_1 \\\\ \\Delta w_{2,2}=\\eta\\delta_4x_2 \\\\ Using: \\delta_3=-0.00273, \\delta_4=-0.0080 For w_{1,1} : \\Delta w_{1,1} = 1\\times(-0.00273)\\times0.35 \\approx-0.00096 w_{1,1}(\\text{new}) = 0.2+(-0.00096) \\approx0.19904 For w_{2,1} : \\Delta w_{2,1} = 1\\times(-0.00273)\\times0.7 \\approx-0.00191 w_{2,1}(\\text{new}) = 0.2+(-0.00191) \\approx0.19809 For w_{1,2} : \\Delta w_{1,2} = 1\\times(-0.0080)\\times0.35 \\approx-0.00280 w_{1,2}(\\text{new}) = 0.3+(-0.00280) \\approx0.29720 For w_{2,2} : \\Delta w_{2,2} = 1\\times(-0.0080)\\times0.7 \\approx-0.00560 w_{2,2}(\\text{new}) = 0.3+(-0.00560) \\approx0.29440 Updated weights: w_{1,1}=0.19904 \\\\ w_{2,1}=0.19809 \\\\ w_{1,2}=0.29720 \\\\ w_{2,2}=0.29440 \\\\ w_{1,3}=0.27970 \\\\ w_{2,3}=0.87880 \\\\ The update rule follows the standard backpropagation formula: each weight change equals the learning rate multiplied by the receiving neuron’s delta and the sending neuron’s output. The updated weights are illustrated below Through backward pass the weights are updated After updating the weights, the forward pass is repeated, hence giving: y_3 \\approx 0.5519 \\\\ y_4 \\approx 0.5767 \\\\ y_5 \\approx 0.6595 Since y_5=0.6595 is still not the target output, the process of calculating the error and backpropagating continues until the desired output is reached. This process demonstrates how backpropagation iteratively updates weights by minimizing the error. \\text{Error}=y_{\\text{target}}-y_5 =0.5-0.6595\\approx-0.1595 This process continues"
      },
      {
        "title": "14. Implementation",
        "content": "This code demonstrates how Back Propagation is used in a neural network to solve the XOR problem. The neural network consists of:"
      },
      {
        "title": "1. Defining Neural Network",
        "content": "The network consists of 2 input neurons, 4 hidden neurons and 1 output neuron, using the sigmoid activation function . • input_size and hidden_size define the layer sizes • weights_input_hidden initializes weights from input to hidden layer • weights_hidden_output initializes weights from hidden to output layer • bias_hidden and bias_output initialize bias terms for respective layers Python ``` import numpy as np class NeuralNetwork: def __init__(self, input_size, hidden_size, output_size): self.input_size = input_size self.hidden_size = hidden_size self.output_size = output_size self.weights_input_hidden = np.random.randn( self.input_size, self.hidden_size) self.weights_hidden_output = np.random.randn( self.hidden_size, self.output_size) self.bias_hidden = np.zeros((1, self.hidden_size)) self.bias_output = np.zeros((1, self.output_size)) def sigmoid(self, x): return 1 / (1 + np.exp(-x)) def sigmoid_derivative(self, x): return x * (1 - x) ```"
      },
      {
        "title": "2. Defining Feed Forward Network",
        "content": "In Forward pass inputs are passed through the network activating the hidden and output layers using the sigmoid function. • Computes hidden layer activation using weighted sum and bias • Applies sigmoid to get hidden layer output • Computes output layer activation from hidden outputs • Applies sigmoid to produce final predicted output Python ``` def feedforward(self, X): self.hidden_activation = np.dot( X, self.weights_input_hidden) + self.bias_hidden self.hidden_output = self.sigmoid(self.hidden_activation) self.output_activation = np.dot( self.hidden_output, self.weights_hidden_output) + self.bias_output self.predicted_output = self.sigmoid(self.output_activation) return self.predicted_output ```"
      },
      {
        "title": "3. Defining Backward Network",
        "content": "In the backward pass, the network calculates the error and updates weights using gradients from the sigmoid function. • Computes output error as difference between actual and predicted values • Calculates output delta using sigmoid derivative • Propagates error to hidden layer using dot product • Computes hidden delta using sigmoid derivative • Updates weights between hidden output and input hidden layers Python ``` def backward(self, X, y, learning_rate): output_error = y - self.predicted_output output_delta = output_error * \\ self.sigmoid_derivative(self.predicted_output) hidden_error = np.dot(output_delta, self.weights_hidden_output.T) hidden_delta = hidden_error * self.sigmoid_derivative(self.hidden_output) self.weights_hidden_output += np.dot(self.hidden_output.T, output_delta) * learning_rate self.bias_output += np.sum(output_delta, axis=0, keepdims=True) * learning_rate self.weights_input_hidden += np.dot(X.T, hidden_delta) * learning_rate self.bias_hidden += np.sum(hidden_delta, axis=0, keepdims=True) * learning_rate ```"
      },
      {
        "title": "4. Training Network",
        "content": "The network is trained over 10,000 epochs using the Back Propagation algorithm with a learning rate of 0.1 progressively reducing the error. • output = self.feedforward(X): computes the output for the current inputs • self.backward(X, y, learning_rate): updates weights and biases using Back Propagation • loss = np.mean(np.square(y - output)): calculates the mean squared error (MSE) loss Python ``` def train(self, X, y, epochs, learning_rate): for epoch in range(epochs): output = self.feedforward(X) self.backward(X, y, learning_rate) if epoch % 4000 == 0: loss = np.mean(np.square(y - output)) print(f\"Epoch {epoch}, Loss:{loss}\") ```"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Backpropagation in Neural Network",
      "initialCode": "# Backpropagation in Neural Network\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np \n\n class NeuralNetwork : \n def __init__ ( self , input_size , hidden_size , output_size ): \n self . input_size = input_size \n self . hidden_size = hidden_size \n self . output_size = output_size \n\n self . weights_input_hidden = np . random . randn ( \n self . input_size , self . hidden_size ) \n self . weights_hidden_output = np . random . randn ( \n self . hidden_size , self . output_size ) \n\n self . bias_hidden = np . zeros (( 1 , self . hidden_size )) \n self . bias_output = np . zeros (( 1 , self . output_size )) \n\n def sigmoid ( self , x ): \n return 1 / ( 1 + np . exp ( - x )) \n\n def sigmoid_derivative ( self , x ): \n return x * ( 1 - x )",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Backpropagation in Neural Network",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What algorithm does Backpropagation use to compute gradients efficiently?",
      "options": [
        "Monte Carlo estimation",
        "The chain rule of calculus applied layer by layer",
        "Brute-force search",
        "Bayesian inference"
      ],
      "correctIndex": 1,
      "explanation": "Backpropagation applies the chain rule of calculus to compute gradients of the loss with respect to each weight by propagating error signals backward through the network."
    }
  },
  "ai-intro": {
    "id": "ai-intro",
    "badge": "Module 8 • Artificial Intelligence",
    "readingTime": "36 min read",
    "level": "Advanced",
    "title": "Artificial Intelligence (AI) Tutorial",
    "subtitle": "Comprehensive guide on Artificial Intelligence (AI) Tutorial from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Artificial Intelligence (AI) Tutorial Last Updated : 3 Sep, 2026 • • • Artificial Intelligence (AI) refers to the simulation of human intelligence in machines which allows them to think and act like humans. It involves creating algorithms and systems that can perform tasks that require human abilities such as visual perception, speech recognition, decision-making and language translation.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Artificial Intelligence (AI) Tutorial with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Basics",
        "content": "This section introduces the fundamental concepts of Artificial Intelligence and its core classifications. • Introduction • Types of AI Based on Capabilities • Types of AI Based on Functionalities • AI vs. ML vs. DL"
      },
      {
        "title": "3. Python for AI",
        "content": "Python is widely used in AI for implementing algorithms, processing data, building models and working with AI and machine learning libraries. • Introduction • Variables • Data Types • Operators • Loops • Functions • Data Structures • NumPy • Pandas"
      },
      {
        "title": "4. Data Preprocessing",
        "content": "Data preprocessing prepares raw data for analysis and model training by cleaning, transforming and organizing it into a suitable format. • Introduction • Data Cleaning • Handling Missing Data • Feature Engineering • Splitting Data into Training and Testing Sets"
      },
      {
        "title": "5. Problem Solving",
        "content": "It is a fundamental aspect of AI which involves the design and application of algorithms to solve complex problems systematically."
      },
      {
        "title": "6. Search Algorithms",
        "content": "Search algorithms navigate through problem spaces to find solutions. • State Space Search • Breadth-First Search (BFS) • Depth-First Search (DFS) • Uniform Cost Search (UCS) • Bidirectional search • Greedy Best-First Search • A* Search Algorithm"
      },
      {
        "title": "7. Local Search Algorithms",
        "content": "It operates on a single current state and attempt to improve it incrementally by exploring neighboring states. • Introduction • Hill-Climbing Search • Simulated Annealing • Local Beam Search"
      },
      {
        "title": "8. Adversarial Search",
        "content": "It deal with competitive environments where multiple agents are in direct competition with one another. • Introduction • Minimax Algorithm • Alpha-Beta Pruning"
      },
      {
        "title": "9. Constraint Satisfaction Problems",
        "content": "It is a problem-solving framework where variables have possible values and constraints restrict valid combinations of those values. • Introduction • Backtracking Search • Constraint Propagation"
      },
      {
        "title": "10. Knowledge, Reasoning & Planning",
        "content": "It refers to the way information, knowledge and data are structured, stored and used by AI systems to reason, learn and make decisions. • Introduction • Frames • Ontologies • Propositional Logic • First Order Logic (FOL)"
      },
      {
        "title": "11. Reasoning & Planning",
        "content": "Reasoning is the process by which AI systems draw conclusions, make decisions or infer new knowledge from existing information. And Planning generates a sequence of actions an intelligent agent follows to achieve specific goals. • Reasoning • Deductive Reasoning • Inductive Reasoning • Abductive Reasoning • Planning • Forward State Space Search"
      },
      {
        "title": "12. Uncertain Knowledge & Reasoning",
        "content": "It deals with handling incomplete or ambiguous information using methods designed to manage uncertainty. • Introduction • Probabilistic Reasoning • Fuzzy Logic"
      },
      {
        "title": "13. Machine Learning",
        "content": "Machine Learning is a subset of AI that enables systems to learn patterns from data and make predictions or decisions without being explicitly programmed for every task."
      },
      {
        "title": "14. Supervised Learning",
        "content": "In this model are trained on labeled dataset to learn the mapping from inputs to outputs. • Introduction • Linear Regression • Logistic Regression • Decision Trees • Support Vector Machines (SVM) • Random Forests"
      },
      {
        "title": "15. Semi-supervised learning",
        "content": "Here model uses both labeled and unlabeled data to improve learning accuracy. • Semi-supervised learning"
      },
      {
        "title": "16. Unsupervised Learning",
        "content": "Here the model is trained on unlabeled dataset to discover patterns or structures. • Introduction • K-Means Clustering • Principal Component Analysis (PCA) • Hierarchical Clustering • DBSCAN"
      },
      {
        "title": "17. Reinforcement Learning",
        "content": "Here the agent learns through interactions with an environment using feedbacks. • Introduction • Markov decision processes (MDPs) • Bellman equation • Q-Learning • Deep Q-Networks (DQN)"
      },
      {
        "title": "18. Deep Learning",
        "content": "It focuses on using neural networks with many layers to model and understand complex patterns and representations in large datasets. • Introduction • Artificial Neural Networks • Multi-Layer Perceptron • Convolutional Neural Networks • Recurrent Neural Networks • Long Short-Term Memory networks • Gated Recurrent Units Networks"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Artificial Intelligence (AI) Tutorial",
      "initialCode": "# Artificial Intelligence (AI) Tutorial\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Artificial Intelligence (AI) Tutorial\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Artificial Intelligence (AI) Tutorial",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "Which branch of AI enables computers to understand and process human language?",
      "options": [
        "Computer Vision",
        "Robotics",
        "Natural Language Processing (NLP)",
        "Expert Systems"
      ],
      "correctIndex": 2,
      "explanation": "Natural Language Processing (NLP) is the AI branch focused on enabling computers to understand, interpret, and generate human language in useful ways."
    }
  },
  "search-algorithms-ai": {
    "id": "search-algorithms-ai",
    "badge": "Module 8 • Artificial Intelligence",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "Search Algorithms in AI",
    "subtitle": "Comprehensive guide on Search Algorithms in AI from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Search Algorithms in AI Last Updated : 9 Jun, 2026 • • • Search algorithms in AI are techniques used to find solutions by exploring possible paths or states in a problem space. They help intelligent systems make decisions, solve problems and reach goals efficiently in applications such as navigation, robotics, game playing and pathfinding. • Helps AI systems determine the best possible solution among multiple choices • Widely used in decision-making, optimization and route-planning problems",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Search Algorithms in AI with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Types of Search Algorithms",
        "content": "There are mainly 2 types of search algorithms i.e Uninformed Search Algorithms and Informed Search Algorithms. Search Algorithms in AI"
      },
      {
        "title": "3. Uninformed Search Algorithms",
        "content": "Uninformed search , also known as blind search algorithms, explore the search space without using any domain specific knowledge about the goal state. They rely only on the structure of the problem such as node depth or path cost to decide which node to explore next."
      },
      {
        "title": "1. Depth First Search (DFS)",
        "content": "Depth First Search explores nodes by moving as deep as possible along a branch before backtracking. It uses a stack or recursion to keep track of visited nodes. • Memory efficient because it stores fewer nodes compared to BFS • Does not always guarantee the shortest path • May get stuck in deep paths or cycles without proper checks Example: DFS traversal from node S to G. • As DFS traverses the tree deepest node first it would always pick the deeper branch until it reaches the solution or it runs out of nodes and goes to the next branch. • Path : S → A → B → C → G"
      },
      {
        "title": "2. Breadth First Search",
        "content": "Breadth First Search explores all possible paths level by level starting from the root node. It visits all neighboring nodes before moving to the next depth level. • Guarantees the shortest path when all edge costs are equal • Complete search algorithm for finite graphs • Requires high memory because it stores all nodes at each level Example: BFS traversal from node S to G • As BFS traverses the tree shallowest node first it would always pick the shallower branch until it reaches the solution or it runs out of nodes and goes to the next branch. • Path : S → D → G"
      },
      {
        "title": "3. Uniform Cost Search",
        "content": "Uniform Cost Search expands the node with the lowest cumulative path cost from the start node. It is useful when different paths have different traversal costs. • Finds the optimal path with minimum total cost • Uses a priority queue to select the lowest-cost node • Suitable for weighted graphs and navigation problems Example: UCS traversal from node S to G • The cost of each node is the cumulative cost of reaching that node from the root and based on the UCS strategy the path with the least cumulative cost is chosen. • Path: S → A → B → G"
      },
      {
        "title": "7. Informed Search Algorithms",
        "content": "Informed search uses domain knowledge in the form of heuristics to make smarter decisions during the search process. These heuristics estimate how close a state is to the goal guiding the search more efficiently."
      },
      {
        "title": "1. Greedy Search",
        "content": "Greedy Search selects the node that appears closest to the goal based on the heuristic value h(n) . It focuses only on the estimated distance to the goal and ignores the path cost already travelled. • Fast and memory efficient due to heuristic guidance • Does not always produce the optimal solution • Best suited when quick approximate solutions are acceptable Example: We find the path from S to G using greedy search, the heuristic values h of each node below the name of the node. • Starting from S we can traverse to A(h=9) or D(h=5). We choose D as it has the lower heuristic cost. • Now from D we can move to B(h=4) or E(h=3). We choose E with a lower heuristic cost. • Finally from E we go to G(h=0). This entire traversal is shown in the search tree below, in blue. • Path : S → D → E → G"
      },
      {
        "title": "2. A* Tree Search",
        "content": "A* Tree Search uses an evaluation function to evaluate and prioritize nodes during the search process: f(n) = g(n) + h(n) Where: • g(n) = actual cost from the start node • h(n) = estimated cost to the goal This approach explores paths with the lowest combined cost but treats the search space as a tree, meaning repeated states are not tracked. • Combines actual path cost and heuristic cost • May revisit the same state multiple times • Simpler to implement but less efficient for graphs with cycles Example: Find the path to reach from S to G using A* search. Starting from S the algorithm computes g(x) + h(x) for all nodes in the fringe at each step choosing the node with the lowest sum. The entire work is shown in the table below. Path h(x) g(x) f(x) S 7 0 7 S -> A 9 3 12 S -> D ✔ 5 2 7 S -> D -> B ✔ 4 2 + 1 = 3 7 S -> D -> E 3 2 + 4 = 6 9 S -> D -> B -> C ✔ 2 3 + 2 = 5 7 S -> D -> B -> E ✔ 3 3 + 1 = 4 7 S -> D -> B -> C -> G 0 5 + 4 = 9 9 S -> D -> B -> E -> G ✔ 0 4 + 3 = 7 7 Path : S → D → B → E → G and Cost: 7"
      },
      {
        "title": "3. A* Graph search",
        "content": "A* Graph Search improves upon A* Tree Search by keeping track of already visited nodes using a closed list. This avoids revisiting nodes and reduces redundant exploration. • Efficient for graphs containing cycles or repeated states • Guarantees the optimal path when the heuristic is admissible • Widely used in navigation systems, robotics and games Example: Use graph searches to find paths from S to G in the following graph. • We keep a track of nodes explored so that we don't re explore them. • Path : S → D → B → E → G and Cost: 7"
      },
      {
        "title": "11. Comparison of Different Search Algorithms",
        "content": "Algorithm Time Complexity Space Complexity Complete Optimal Breadth First Search O(b^d) O(b^d) Yes Yes (if step cost is same) Depth First Search O(b^d) O(d) No No Uniform Cost Search O(b^{1 + \\frac{C^*}{\\epsilon}}) O(b^{1 + \\frac{C^*}{\\epsilon}}) Yes Yes Greedy Search O(b^m) O(b^m) No No A* Tree Search O(b^d) O(b^d) Yes (if h is admissible) Yes (if h is admissible) A* Graph Search O(b^d) O(b^d) Yes (if h is admissible) Yes (if h is admissible)"
      },
      {
        "title": "12. Advantages",
        "content": "• Helps AI systems find optimal or near-optimal solutions • Useful in pathfinding, robotics, games and decision-making • Some algorithms guarantee shortest or lowest-cost paths • Heuristic-based methods improve efficiency and speed"
      },
      {
        "title": "13. Limitations",
        "content": "• Some algorithms require large memory and computation time • Blind search methods can explore many unnecessary nodes • Heuristic quality directly affects informed search performance • Certain algorithms may not guarantee optimal solutions"
      },
      {
        "title": "14. Related Articles:",
        "content": "• Artificial Intelligence (AI) Algorithms • Informed Search Algorithms in Artificial Intelligence • Difference between Informed and Uninformed Search in AI • Uninformed Search Algorithms in AI Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "15. Explore",
        "content": "Machine Learning Basics • Introduction 3 min read • Types 7 min read • ML Pipeline 4 min read • Applications 2 min read Python for Machine Learning • ML with Python 3 min read • Numpy 3 min read • Pandas 4 min read • Data Preprocessing 4 min read • EDA 6 min read Feature Engineering • Feature Engineering 4 min read • Dimensionality Reduction 3 min read • Feature Selection 4 min read Supervised Learning • Supervised Learning 4 min read • Linear Regression 10 min read • Logistic Regression 9 min read • Decision Tree 8 min read • Random Forest 4 min read • KNN 7 min read • SVM 9 min read • Naive Bayes 6 min read Unsupervised Learning • Unsupervised Learning 5 min read • K means Clustering 7 min read • Hierarchical Clustering 6 min read • DBSCAN Clustering 6 min read • Apriori Algorithm 5 min read • FP Growth Algorithm 4 min read • ECLAT Algorithm 5 min read • PCA 6 min read Model Evaluation and Tuning • Evaluation Metrics 9 min read • Regularization 5 min read • Cross Validation 5 min read • Hyperparameter Tuning 5 min read • Underfitting and Overfitting 3 min read • Bias and Variance 6 min read Advanced Techniques • Reinforcement Learning 8 min read • Semi-Supervised Learning 5 min read • Self-Supervised Learning 5 min read • Ensemble Learning 6 min read Machine Learning Practice • Interview Questions 15+ min read • ML Projects 5 min read Courses • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Search Algorithms in AI",
      "initialCode": "# Search Algorithms in AI\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Search Algorithms in AI\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Search Algorithms in AI",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is the key difference between BFS and DFS in AI search?",
      "options": [
        "BFS is always faster",
        "BFS explores breadth-first guaranteeing shortest path; DFS explores depth-first using less memory",
        "DFS finds optimal solutions",
        "They are identical"
      ],
      "correctIndex": 1,
      "explanation": "BFS (Breadth-First Search) explores level-by-level, guaranteed to find the shortest path but uses O(b^d) memory. DFS explores depth-first using O(bd) memory but may not find optimal paths."
    }
  },
  "natural-language-processing": {
    "id": "natural-language-processing",
    "badge": "Module 8 • Artificial Intelligence",
    "readingTime": "22 min read",
    "level": "Advanced",
    "title": "Introduction to Natural Language Processing (NLP)",
    "subtitle": "Comprehensive guide on Introduction to Natural Language Processing (NLP) from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Introduction to Natural Language Processing (NLP) Last Updated : 2 Jul, 2026 • • • Natural Language Processing (NLP) helps computers understand, interpret and produce human language. It studies language as data and develops a model that can analyse linguistic structure, meaning and context in both written and spoken communication. Simple Example of NLP: “Ravi is happy with the new phone.” An NLP system can: • Detect Ravi as a person • Identify phone as an object • Recognize sentiment as positive • Understand topic as product review",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Introduction to Natural Language Processing (NLP) with practical Python examples and real-world applications."
        }
      },
      {
        "title": "1. Text or Speech Input",
        "content": "• The system takes written language like sentences or documents which is called text acquisition. • When the input is audio, it is first converted into text using Speech Recognition."
      },
      {
        "title": "2. Pre-processing",
        "content": "The text is cleaned and prepared. It can include: • Cleaning unwanted characters or symbols from text is done using text normalization. • Breaking sentences into smaller units so they can be processed easily. • Changing all words into the same case for uniform processing is known as case folding. • Eliminating frequent or common words like is, the, and to focus on meaningful terms. • Converting words like running to run (base form) to reduce computational power."
      },
      {
        "title": "3. Language Analysis",
        "content": "The system studies structure and meaning: • Identifying nouns, verbs, and other parts of speech in a sentence is done. • Finding how words connect to each other in a sentence. • Determining the actual meaning of a word based on surrounding text. • Detecting entities like person names, locations, or dates. • Identifying whether text expresses positive, negative or neutral emotion."
      },
      {
        "title": "4. Text Representation and Embedding Techniques",
        "content": "Since machines process numbers, this stage converts text into numerical vectors. • Text representation: In this step, text is converted into numbers using statistical features or vector representations so machines can process it. • Traditional representations: Earlier methods represent text using word counts and importance scores. • Word embeddings: Modern methods represent words as dense vectors capturing similarity and meaning. • Contextual embeddings: Advanced models generate word meanings based on the surrounding sentence."
      },
      {
        "title": "5. Model Training",
        "content": "Once text is numeric, models are trained to learn patterns and perform NLP tasks. • After text is converted into vectors, algorithms learn patterns from data to perform tasks like classification or translation. • Earlier NLP systems relied on statistical algorithms that learn from manually prepared features. • Modern NLP uses neural networks that automatically learn language structure from large data. • Large language models trained on massive datasets can be reused and fine-tuned for tasks."
      },
      {
        "title": "6. Output Generation",
        "content": "The system produces results such as: • Text reply • Voice response • Translation • Summary • Prediction"
      },
      {
        "title": "8. Common NLP Tasks",
        "content": "• Text classification: Assigning predefined labels to text like spam or topic categories. • Sentiment analysis: Detecting whether text expresses positive, negative or neutral emotion. • Machine translation: Automatically converting text from one language to another. • Named Entity Recognition: Identifying names of people, places, dates, etc in text. • Text summarization: Generating a shorter version of a document while keeping key meanings. • Question answering systems: Systems that read text and return exact answers to queries."
      },
      {
        "title": "9. Real-Life Applications",
        "content": "• Voice assistants like Alexa, Google Assistant, etc • Chatbots in customer support • Email spam filtering • Auto-correct and predictive typing • Language translation tools • Social media sentiment tracking • Document search and recommendation systems"
      },
      {
        "title": "10. Relate Articles:",
        "content": "• Natural Language Processing (NLP) Tutorial • Natural Language Understanding (NLU) • Natural Language Generation (NLG) Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "11. Explore",
        "content": "Introduction to NLP • Introduction to Natural Language Processing (NLP) 3 min read • NLP vs NLU vs NLG 3 min read • Applications of NLP 6 min read • Why is NLP important? 6 min read • Phases of Natural Language Processing (NLP) 4 min read • The Future of Natural Language Processing: Trends and Innovations 7 min read Libraries for NLP • NLTK - NLP 5 min read • Tokenization Using Spacy 2 min read • Python | Tokenize text using TextBlob 3 min read • Introduction to Hugging Face Transformers 4 min read • NLP Gensim Tutorial 10 min read • NLP Libraries in Python 6 min read Text Normalization in NLP • Normalizing Textual Data with Python 4 min read • Regex Tutorial - How to write Regular Expressions 4 min read • Tokenization in NLP 7 min read • Lemmatization with NLTK 4 min read • Introduction to Stemming 5 min read • Removing stop words with NLTK in Python 4 min read • POS(Parts-Of-Speech) Tagging in NLP 5 min read Text Representation and Embedding Techniques • One-Hot Encoding in NLP 5 min read • Bag of words (BoW) model in NLP 5 min read • Understanding TF-IDF (Term Frequency-Inverse Document Frequency) 4 min read • N-Gram Language Modelling with NLTK 3 min read • Word Embedding using Word2Vec 4 min read • Glove Word Embedding in NLP 6 min read • Overview of Word Embedding using Embeddings from Language Models (ELMo) 6 min read NLP Deep Learning Techniques • NLP with Deep Learning 3 min read • Introduction to Recurrent Neural Networks 10 min read • Introduction to Long Short Term Memory 4 min read • Gated Recurrent Unit Networks 5 min read • Transformers in Machine Learning 5 min read • seq2seq Model 5 min read • PreTrained Models in Natural Language Processing (NLP) 3 min read NLP Projects and Practice • Sentiment Analysis with an Recurrent Neural Networks (RNN) 3 min read • Text Generation using Recurrent Long Short Term Memory Network 4 min read • Machine Translation with Transformer in Python 5 min read • Building a Rule-Based Chatbot with Natural Language Processi"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Introduction to Natural Language Processing (NLP)",
      "initialCode": "# Introduction to Natural Language Processing (NLP)\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Introduction to Natural Language Processing (NLP)\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Introduction to Natural Language Processing (NLP)",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is tokenization in NLP?",
      "options": [
        "Generating new text",
        "Breaking text into individual words, subwords, or characters for processing",
        "Translating between languages",
        "Sentiment classification"
      ],
      "correctIndex": 1,
      "explanation": "Tokenization splits raw text into tokens (words, subwords, or characters). It's the fundamental first step in most NLP pipelines."
    }
  },
  "generative-ai-tutorial": {
    "id": "generative-ai-tutorial",
    "badge": "Module 9 • Generative AI & LLMs",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "Generative AI Tutorial",
    "subtitle": "Comprehensive guide on Generative AI Tutorial from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Generative AI Tutorial Last Updated : 10 Mar, 2026 • • • Generative AI focuses on building models that can create new content such as text, images, audio and code by learning patterns from existing data to generate human‑like outputs across various domains. It is widely used in chatbots, content creation, design and automation.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Generative AI Tutorial with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Basics",
        "content": "Understanding the foundations of AI and deep learning is essential for working with GenAI models. • Introduction to Artificial Intelligence • Introduction Generative AI • Neural Networks • RNNs , LSTMs , GRUs • Transformers & Self-Attention • Autoencoders & Latent Space • GANs & Diffusion Models"
      },
      {
        "title": "3. Python for Agentic AI",
        "content": "Python is used in Agentic AI for building intelligent agents, automating decision-making workflows and integrating AI models with external tools and APIs. • Introduction • Download and Install Python 3 • Python Variables • Python Data Types • Python Operators • Conditional Statements in Python • Loops in Python • Python Functions • Python String • Python Lists • Python Dictionary"
      },
      {
        "title": "4. Tools",
        "content": "To get started with Generative AI, you need to build expertise in the following tools and libraries: • PyTorch • TensorFlow • Hugging Face Transformers • LangChain • LangGraph • Langflow • LlamaIndex • Integration of Langchain with Llama-Index"
      },
      {
        "title": "5. Natural Language Processing Basics",
        "content": "Most Generative AI models are built on NLP concepts. • Text Preprocessing in NLP • Bag of Words & TF-IDF • Word2Vec & GloVe • Introduction to BERT • Introduction to GPT Models • Hugging Face Models"
      },
      {
        "title": "6. Prompt Engineering",
        "content": "Prompt engineering is the practice of crafting inputs to get better outputs from LLMs. • What is Prompt Engineering? • Zero-Shot , One-Shot & Few-Shot Prompting • Chain of Thought Prompting • Role & Contextual Prompting • ReAct (Reasoning + Acting) Prompting • Retrieval-Augmented Prompting • Self-Consistency Prompting • Tree of Thought (ToT) prompting • Guardrails in AI"
      },
      {
        "title": "7. Large Language Models (LLMs)",
        "content": "LLMs are the backbone of modern Generative AI systems. • Large Language Model • LLM Parameters • Scaling Laws in LLMs • Fine-Tuning LLMs with LoRA , QLoRA & PEFT • RLHF: Reinforcement Learning from Human Feedback • LLM Distillation • Popular LLMs: Claude , LLaMA , Gemini • LLM APIs: OpenAI , Hugging Face , Gemini"
      },
      {
        "title": "8. Retrieval-Augmented Generation (RAG)",
        "content": "RAG combines LLMs with external knowledge sources for more accurate responses. • RAG in AI • RAG Architecture • Multimodal RAG • Embeddings • Vector Databases: FAISS , ChromaDB , Qdrant , Pinecone • RAG System with Langchain and Langraph"
      },
      {
        "title": "9. Agentic AI & Multi-Agent Systems",
        "content": "Agentic AI extends LLMs with autonomy, memory and collaboration. • Introduction to Agentic AI • Agent vs Traditional AI • Agent Architectures & Memory • Agent-to-Agent Communication • AI Agent Frameworks • Model Context Protocol (MCP)"
      },
      {
        "title": "10. CrewAI and Orchestration",
        "content": "CrewAI is a framework for coordinating multiple AI agents to work collaboratively. • Introduction to CrewAI • CrewAI Tools • Creating Custom Tools for CrewAI • Memory in CrewAI • CrewAI Embeddings • CrewAI Collaboration • CrewAI Knowledge • CrewAI Planning and Reasoning • CrewAI CLI • CrewAI Flow • Fraud Detection Using CrewAI Project"
      },
      {
        "title": "11. Automation with Agents and Deployement",
        "content": "Generative AI can be extended into workflows for business automation. • Agentic RAG • Agentic RAG with LlamaIndex • Introduction to n8n • Automated Email Classifier with n8n • AI Deployment with Gradio , Streamlit , FastAPI"
      },
      {
        "title": "12. Responsible & Ethical AI",
        "content": "Generative and Agentic AI raise ethical challenges that must be addressed. • Bias in AI Models • Deepfakes • Prompt Injection in LLM • Responsible AI Practices"
      },
      {
        "title": "13. Projects",
        "content": "This section presents practical, hands-on project ideas to help you apply Generative AI concepts and build a strong portfolio. • Building an AI application with LlamaIndex • PDF Summarizer LLM Application • RAG(Retrieval-Augmented Generation) using LLama3 • Simple Retrieval Augmented Generation using Java • Building AI Agents with Phidata • PDF Summarizer using RAG"
      },
      {
        "title": "14. Careers in Generative AI",
        "content": "Generative AI and Agentic AI are among the fastest-growing career domains in tech. Key job roles include: • AI Engineer • Machine Learning Engineer • Data Scientist • Prompt Engineer • Agentic AI Engineer Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "15. Explore",
        "content": "Introduction to AI • What is Artificial Intelligence (AI) 5 min read • Types of Artificial Intelligence (AI) 4 min read • Types of AI Based on Functionalities 3 min read • Agents in AI 7 min read • Artificial intelligence vs Machine Learning vs Deep Learning 2 min read • Problem Solving in Artificial Intelligence 4 min read • Applications of Artificial Intelligence (AI) 3 min read AI Concepts • Search Algorithms in AI 6 min read • Local Search Algorithm in Artificial Intelligence 6 min read • Adversarial Search Algorithms in Artificial Intelligence (AI) 10 min read • Constraint Satisfaction Problems (CSP) in AI 6 min read • Knowledge Representation in AI 4 min read • First-Order Logic in Artificial Intelligence 3 min read • Reasoning Mechanisms in AI 3 min read Machine Learning in AI • Machine Learning Tutorial 4 min read • Deep Learning Tutorial 2 min read • Natural Language Processing (NLP) Tutorial 2 min read • Computer Vision Tutorial 3 min read Robotics and AI • Artificial Intelligence in Robotics 5 min read • What is Robotics Process Automation 8 min read • Automated Planning in AI 8 min read • AI in Transportation 8 min read • AI in Manufacturing : Revolutionizing the Industry 6 min read Generative AI • What is Generative AI 6 min read • Generative Adversarial Network (GAN) 10 min read • Cycle Generative Adversarial Network (CycleGAN) 5 min read • StyleGAN - Style Generative Adversarial Networks 4 min read • Introduction to Generative Pre-trained Transformer (GPT) 3 min read • BERT Model - NLP 7 min read • Generative AI Applications 7 min read AI Practice • Artificial Intelligence(AI) Interview Questions and Answers 15+ min read • Generative AI and LLM Interview Question with Answer 15+ min read • 30+ Best Artificial Intelligence Project Ideas with Source Code [2026 Updated] 15+ min read Courses • AI Engg Course 2 min read • Data Science 360 Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Generative AI Tutorial",
      "initialCode": "# Generative AI Tutorial\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Generative AI Tutorial\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Generative AI Tutorial",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What type of model architecture powers most modern Generative AI systems like GPT and DALL-E?",
      "options": [
        "Convolutional Neural Networks (CNN)",
        "Recurrent Neural Networks (RNN)",
        "Transformer architecture",
        "Decision trees"
      ],
      "correctIndex": 2,
      "explanation": "The Transformer architecture (attention mechanism) powers modern Generative AI. It efficiently processes sequences in parallel and captures long-range dependencies."
    }
  },
  "large-language-models": {
    "id": "large-language-models",
    "badge": "Module 9 • Generative AI & LLMs",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "Large Language Model (LLM) Tutorial",
    "subtitle": "Comprehensive guide on Large Language Model (LLM) Tutorial from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Large Language Model (LLM) Tutorial Last Updated : 24 Sep, 2026 • • • Large Language Models (LLMs) are machine learning models trained on vast amount of textual data to generate and understand human-like language. These models can perform a wide range of natural language processing tasks from text generation to sentiment analysis and summarisation.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Large Language Model (LLM) Tutorial with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Foundation",
        "content": "Covers the fundamental concepts needed to understand Large Language Models, including language models, foundation models, prompts and key LLM parameters. • Introduction • Language Models • Foundation Models • Prompts • LLM Parameters"
      },
      {
        "title": "3. ML & Deep Learning Basics",
        "content": "Machine learning and deep learning provide the fundamental concepts behind how LLMs are trained, including neural networks, optimization, loss functions and model generalization. • Neural Networks • Activation Functions • Loss Functions • Gradient Descent • Optimization • Training, Validation & Test Splits • Underfitting & Overfitting"
      },
      {
        "title": "4. NLP Fundamentals",
        "content": "Natural Language Processing provides the techniques needed to represent, process and understand human language, including tokenization, embeddings and sequence modeling. • Tokenization • Byte Pair Encoding • Tokens and Context Windows • Word Embedding • Recurrent Neural Networks • Seq2Seq Models"
      },
      {
        "title": "5. Transformers",
        "content": "Transformers are the foundational architecture behind most modern LLMs that rely on attention mechanisms to process the entire sequence of the data simultaneously. • Introduction • Embedding Layers • Positional Encoding • Attention Mechanism • Self-Attention • Masked Attention • Multi-Head Attention • Cross-Attention • Feed-Forward Neural Network • Layer Normalization • Encoder-Decoder Model • LLMs vs. Transformers • Transformers from Scratch using TensorFlow • Transformers from Scratch using PyTorch"
      },
      {
        "title": "6. LLM Pretraining",
        "content": "LLM pretraining learns language patterns from large amounts of text using self-supervised learning and language modeling techniques. • Introduction • Self-Supervised Learning • Masked Language Models • Autoregressive Models"
      },
      {
        "title": "7. Prompting Techniques",
        "content": "Prompting techniques guide LLMs to generate desired outputs by carefully designing instructions, examples and reasoning strategies for different tasks. • Introduction • Zero-Shot Prompting • Few-Shot Prompting • Chain-of-Thought (CoT) Prompting • Self-Consistency Prompting • Zero-Shot Chain-of-Thought Prompting • ReAct (Reasoning + Acting) Prompting • Prompt Chaining • Role-Based prompting • Tree of Thought (ToT) prompting"
      },
      {
        "title": "8. Fine-Tuning",
        "content": "Fine-tuning adapts a pretrained LLM to specific tasks or domains by further training it on task-specific data using techniques such as SFT, instruction tuning, LoRA and RLHF. • Introduction • Supervised Fine-Tuning (SFT) • Instruction Tuning • Parameter-Efficient Fine-Tuning (PEFT) • LoRA (Low-Rank Adaptation) • QLoRA (Quantized Low-Rank Adaptation) • Prompt Tuning • Reinforcement Learning from Human Feedback (RLHF) • Fine-Tune an LLM from Hugging Face • LLM Distillation"
      },
      {
        "title": "9. Retrieval-Augmented Generation (RAG)",
        "content": "This section explains how RAG combines information retrieval with language models to generate responses using external knowledge sources. • Introduction • Fine tuning vs RAG • Embedding models • Chunking • Vector Database • Dense Passage Retrieval (DPR) • RAG Pipeline • Retrieval-Augmented Prompting • Agentic RAG • Mutlimodal RAG"
      },
      {
        "title": "10. Agents & Tool Use",
        "content": "LLM agents extend language models beyond text generation by enabling them to use tools, access external information, maintain memory and perform multi-step tasks. • LLM Agents • Function Calling • Agent Memory • Agentic Workflows • Hugging Face • LangChain • MCP • LangGraph • CrewAI"
      },
      {
        "title": "11. Evaluation & Safety",
        "content": "LLM evaluation and safety techniques help measure model performance and address challenges such as hallucinations, prompt injection, harmful outputs and responsible AI concerns. • LLM Evaluation • LLM Hallucinations • Perplexity • BLEU and ROUGE • Benchmarks • LLM-as-a-judge • Prompt Injection • Guardrails • Ethical Implications • Responsible AI"
      },
      {
        "title": "12. Popular Models",
        "content": "Popular LLMs use different architectures, training approaches and capabilities to support tasks such as text generation, reasoning, coding and multimodal understanding. • BERT • T5 • GPT • LLaMA • Claude • Gemini • Multimodal LLMs"
      },
      {
        "title": "13. Projects",
        "content": "Practical projects demonstrate how LLMs can be applied to build real-world applications such as chatbots, RAG systems, summarizers, sentiment analysis systems and translation tools. • Building Chatbot using Gemini • Building Chatbot using OpenAI • RAG using Llama 3 • PDF Summarizer using RAG • Sentiment analysis using BERT • Text2text generation using Hugging Face Model • Machine Translation using Transformer • Customer Help Bot with RAG For interview preparation, you can refer to this article - Generative AI and LLM Interview Question with Answer Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "14. Explore",
        "content": "Basics • Introduction 5 min read • AI vs ML vs DL 2 min read • Applications 3 min read • Challenges 7 min read • Importance 5 min read Neural Networks • Introduction 9 min read • Types 5 min read • Layers in ANN 4 min read • Activation functions 6 min read • Feedforward Neural Network 5 min read • Backpropagation 7 min read Deep Learning Models • CNN 5 min read • RNN 10 min read • LSTM 4 min read • GRU 5 min read • Transformers 5 min read • Autoencoders 6 min read • GAN 10 min read Model Evaluation • Gradient Descent 13 min read • Momentum-based Gradient Optimizer 3 min read • Adagrad 6 min read • RMSProp 4 min read • Adam Optimizer 5 min read Deep Learning Frameworks • TensorFlow 2 min read • PyTorch 5 min read • Caffe 8 min read • Apache MXNet 4 min read • Theano 3 min read Projects • Lung Cancer Detection 4 min read • Cat & Dog Classification 5 min read • Sentiment Analysis 3 min read • Text Generation using LSTM 4 min read • Machine Translation 5 min read • Interview Questions 15+ min read Courses • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Large Language Model (LLM) Tutorial",
      "initialCode": "# Large Language Model (LLM) Tutorial\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Large Language Model (LLM) Tutorial\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Large Language Model (LLM) Tutorial",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is 'fine-tuning' in the context of Large Language Models?",
      "options": [
        "Training a model from scratch on domain data",
        "Adjusting a pre-trained LLM on a smaller, task-specific dataset to improve performance on that task",
        "Increasing model parameter count",
        "Changing the tokenizer"
      ],
      "correctIndex": 1,
      "explanation": "Fine-tuning adapts a pre-trained LLM to a specific task or domain by continuing training on a smaller labeled dataset, preserving general knowledge while specializing."
    }
  },
  "prompt-engineering": {
    "id": "prompt-engineering",
    "badge": "Module 9 • Generative AI & LLMs",
    "readingTime": "5 min read",
    "level": "Advanced",
    "title": "Prompt Engineering",
    "subtitle": "Comprehensive guide on Prompt Engineering from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Introduction to Prompt Engineering",
        "content": "Prompt Engineering is a fundamental concept in AI, Machine Learning, and Data Science. This lesson covers the core theory, practical Python implementations, and real-world use cases.",
        "callout": {
          "type": "info",
          "title": "Coming Soon",
          "message": "Extended content for Prompt Engineering will be available in the next update."
        }
      }
    ],
    "playground": {
      "title": "Python & ML Console: Prompt Engineering",
      "initialCode": "# Prompt Engineering\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Prompt Engineering\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Prompt Engineering",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is the purpose of Chain-of-Thought (CoT) prompting?",
      "options": [
        "To make prompts shorter",
        "To guide the LLM to reason step-by-step before giving a final answer, improving accuracy on complex tasks",
        "To inject security rules",
        "To reduce token usage"
      ],
      "correctIndex": 1,
      "explanation": "Chain-of-Thought prompting encourages LLMs to generate intermediate reasoning steps, dramatically improving accuracy on mathematical, logical, and multi-step reasoning tasks."
    }
  },
  "mlops-tutorial": {
    "id": "mlops-tutorial",
    "badge": "Module 10 • MLOps & Model Deployment",
    "readingTime": "36 min read",
    "level": "Advanced",
    "title": "MLOps Tutorial",
    "subtitle": "Comprehensive guide on MLOps Tutorial from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "MLOps Tutorial Last Updated : 17 Feb, 2026 • • • MLOps (Machine Learning Operations) is a set of practices that helps teams build, deploy, monitor and maintain machine learning models in production systems. In simple words, MLOps connects model development, infrastructure and real-world usage into a continuous workflow so that ML systems remain reliable and scalable. MLOps combines concepts from machine learning, software engineering, DevOps and data engineering to create scalable AI systems.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers MLOps Tutorial with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Introduction to Machine Learning and MLOps",
        "content": "This section explains the ML lifecycle and why MLOps is needed. • Introduction to MLOps • Machine Learning Lifecycle • What MLOps solves • Difference between notebook ML and production ML"
      },
      {
        "title": "3. Classic Machine Learning Overview",
        "content": "This module introduces core ML algorithms and evaluation methods."
      },
      {
        "title": "4. Data Preparation Basics",
        "content": "• Handling missing values and duplicates • Feature selection and PCA • Dataset splitting strategies"
      },
      {
        "title": "5. Core ML Algorithms Overview",
        "content": "• Regression models • Classification models • Tree-based models • Clustering methods"
      },
      {
        "title": "6. Evaluation Concepts",
        "content": "• Train–test split and cross-validation • Accuracy, F1, ROC basics • Confusion matrix • Overfitting vs generalization"
      },
      {
        "title": "7. Environments and System Basics",
        "content": "It covers setting up development environments, managing dependencies and understanding basic system tools so software and ML workflows run smoothly and consistently."
      },
      {
        "title": "8. Environment Setup",
        "content": "• Python virtual environments • Dependency management • Reproducibility practices"
      },
      {
        "title": "9. Linux and Shell Basics",
        "content": "• CLI navigation • File handling • Permissions and processes • Bash scripting to automate ML tasks"
      },
      {
        "title": "10. Version Control for ML",
        "content": "• Git branching and commits • Pull requests workflow • Dataset versioning"
      },
      {
        "title": "11. Data Engineering for MLOps",
        "content": "This section explains how production ML handles large-scale data."
      },
      {
        "title": "12. Data Lakes and Storage",
        "content": "• Data lake vs data warehouse • S3-style storage systems • Delta Lake basics"
      },
      {
        "title": "13. Batch Processing",
        "content": "• Introduction to Apache Spark • PySpark batch workflows"
      },
      {
        "title": "14. Streaming Data Pipelines",
        "content": "• Apache Kafka architecture • Spark structured streaming • Real-time feature ingestion"
      },
      {
        "title": "15. Experiment Tracking and Model Lifecycle",
        "content": "It focuses on recording model experiments, parameters and results while managing stages like training, validation, deployment and updates so models can be improved and maintained systematically."
      },
      {
        "title": "16. Experiment Tracking",
        "content": "• Introduction to MLflow • Logging metrics • Comparing model runs • Tracking experiments"
      },
      {
        "title": "17. Model Registry",
        "content": "• Versioning models • Staging vs production transitions • Managing lifecycle with MLflow"
      },
      {
        "title": "18. Explainability, Documentation and Model Serving",
        "content": "It covers making model decisions understandable, properly recording model details and usage and deploying models so they can handle requests reliably in real applications"
      }
    ],
    "playground": {
      "title": "Python & ML Console: MLOps Tutorial",
      "initialCode": "# MLOps Tutorial\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# MLOps Tutorial\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: MLOps Tutorial",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is the main goal of MLOps?",
      "options": [
        "To replace data scientists with automation",
        "To streamline and automate the lifecycle of ML models from development to production monitoring",
        "To build neural networks faster",
        "To reduce dataset sizes"
      ],
      "correctIndex": 1,
      "explanation": "MLOps (ML + DevOps) applies DevOps principles to ML: automating model training, testing, deployment, versioning, and monitoring to enable reliable, reproducible production ML systems."
    }
  },
  "fastapi-tutorial": {
    "id": "fastapi-tutorial",
    "badge": "Module 10 • MLOps & Model Deployment",
    "readingTime": "28 min read",
    "level": "Advanced",
    "title": "FastAPI Tutorial",
    "subtitle": "Comprehensive guide on FastAPI Tutorial from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "FastAPI Tutorial Last Updated : 20 Jun, 2026 • • • FastAPI is a modern, high performance Python web framework for building APIs quickly and efficiently. It offers automatic data validation, type checking, async support and built-in interactive API docs using Swagger UI and ReDoc.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers FastAPI Tutorial with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Facts about FastAPI",
        "content": "• High Performance: One of the fastest Python web frameworks, leveraging async programming to handle multiple requests efficiently. • Starlette & Pydantic Based: Uses Starlette for web features (routing, middleware, WebSockets) and Pydantic for type-based validation and parsing. • Auto API Docs: Generates interactive documentation (Swagger UI, ReDoc) automatically for easy testing. • Async-First Design: Built around async/await for high concurrency, suitable for real-time and scalable applications."
      },
      {
        "title": "3. Introduction",
        "content": "This section covers the essentials of getting started with FastAPI, including setup, running the first app, and understanding key differences from other frameworks. • Introduction • Installation • FastAPI vs Django vs Flask"
      },
      {
        "title": "4. REST APIs",
        "content": "FastAPI is designed for building efficient REST APIs, allowing easy creation of endpoints and handling of requests and responses. • REST API with FastAPI • Creating REST APIs"
      },
      {
        "title": "5. Templates and Static Files",
        "content": "FastAPI is mainly used for building APIs, but it also supports HTML templates and static files. This allows it to be used for full web applications, not just APIs. • Template and Static Files"
      },
      {
        "title": "6. Working with Data and Files",
        "content": "With built in support for uploading files and the powerful validation features of Pydantic, one can easily manage user data and ensure it’s clean, reliable and secure. • Handling File Uploads • Pydantic"
      },
      {
        "title": "7. Handling Request & Response Data",
        "content": "FastAPI uses Pydantic to define request and response models, providing automatic validation, type checking, and clear API documentation. • Request Body • Response Model"
      },
      {
        "title": "8. Middlewares",
        "content": "Middlewares in FastAPI process requests and responses globally before they reach endpoints, useful for tasks like authentication, logging, and error handling. • Middlewares • Custom Middlewares"
      },
      {
        "title": "9. Database",
        "content": "FastAPI can connect to databases like SQLite using SQLAlchemy or to MongoDB using drivers, allowing easy setup and management of database connections. • Integrating SQL Databases • Integrating MongoDB"
      },
      {
        "title": "10. Authentication",
        "content": "FastAPI supports authentication and authorization using methods like OAuth2 and JWT, allowing secure user login and protected routes. It also ensures only authorized users can access specific endpoints. • Authentication and Authorization"
      },
      {
        "title": "11. Advanced Topics",
        "content": "This section explores dependency injection, error handling and WebSockets, helping you build more powerful and scalable solutions. • Dependency Injection in FastAPI • Error Handling in FastAPI • WebSockets in FastAPI"
      },
      {
        "title": "12. Deployment & Testing",
        "content": "Deploying and testing are essential to run a FastAPI app in production and ensure it works reliably. FastAPI apps can be deployed on platforms like Render, and proper testing helps verify that all endpoints function correctly. • Deploy FastAPI using Render • Testing FastAPI Application"
      },
      {
        "title": "13. Projects",
        "content": "This section explores practical projects to help you apply FastAPI concepts in real world scenarios, these projects will strengthen your hands-on experience. • To-Do List App • Login & Registration System with JWT • Chat App with WebSockets Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "14. Explore",
        "content": "Python Fundamentals • Introduction 1 min read • Input & Output 2 min read • Variables 4 min read • Operators 4 min read • Keywords 2 min read • Data Types 4 min read • Conditional Statements 3 min read • Loops 3 min read • Functions 4 min read Python Data Structures • String 4 min read • List 3 min read • Tuples 3 min read • Dictionary 3 min read • Set 2 min read • Arrays 5 min read Advanced Python • OOP Concepts 3 min read • Exception Handling 5 min read • File Handling 4 min read • Python Database 2 min read • MongoDB 3 min read • MySQL 7 min read • Packages 4 min read • Modules 3 min read • DSA Libraries 5 min read • Python GUI 2 min read Data Science with Python • Numpy 3 min read • Pandas 4 min read • Matplotlib 3 min read • Seaborn 3 min read • StatsModel 2 min read • Model Building 6 min read • TensorFlow 2 min read • PyTorch 5 min read Web Development with Python • Flask 3 min read • Django 5 min read • Django ORM 4 min read • Jinja2 Templating 5 min read • Django Templates 5 min read • REST API 3 min read • Build API with DRF 4 min read Python Practice • Quiz 1 min read • Practice Problems 2 min read • Interview Q & A 15+ min read Courses • Placement 360 Course 2 min read • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: FastAPI Tutorial",
      "initialCode": "# FastAPI Tutorial\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# FastAPI Tutorial\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: FastAPI Tutorial",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What makes FastAPI a popular choice for deploying ML models as APIs?",
      "options": [
        "It is the oldest framework",
        "It provides automatic validation, async support, and auto-generated OpenAPI docs with high performance",
        "It only works with TensorFlow",
        "It requires no Python knowledge"
      ],
      "correctIndex": 1,
      "explanation": "FastAPI offers automatic request validation via Pydantic, async/await support, and automatic interactive API documentation (Swagger UI), making ML model deployment fast and robust."
    }
  },
  "flask-ml": {
    "id": "flask-ml",
    "badge": "Module 10 • MLOps & Model Deployment",
    "readingTime": "30 min read",
    "level": "Advanced",
    "title": "Flask Tutorial",
    "subtitle": "Comprehensive guide on Flask Tutorial from GeeksForGeeks — covering core theory, practical examples, and Python implementation.",
    "sections": [
      {
        "title": "1. Overview",
        "content": "Flask Tutorial Last Updated : 30 Jun, 2026 • • • Flask is a lightweight web framework used to build web applications and APIs. It follows a minimal design and provides core features like routing, request handling and template rendering while allowing developers to add extensions as needed. It is widely used for building small to medium web applications due to its simplicity and flexibility. • Microframework : Lightweight framework with minimal dependencies, giving developers full control over application structure. • Werkzeug & Jinja2 : Uses Werkzeug for request/response handling and Jinja2 for dynamic HTML templating. • Routing : Maps URLs to Python functions using simple decorators. • Flexible Database Choice: No built-in ORM, allowing use of tools like SQLAlchemy or raw SQL. • API Development: Well-suited for building RESTful APIs and backend services. • Development Server : Includes a built-in server for local testing during development.",
        "callout": {
          "type": "info",
          "title": "Learning Objectives",
          "message": "This lesson covers Flask Tutorial with practical Python examples and real-world applications."
        }
      },
      {
        "title": "2. Introduction",
        "content": "This section introduces Flask, compares it with Django and shows how to install it on Windows to start building web applications. • Basics & Installation • Django vs Flask"
      },
      {
        "title": "3. Quick Start",
        "content": "Covers creating and running a basic Flask app, understanding routes, HTTP methods, variables, redirects and basic configurations. • First App • Running an App • Routes • Models • Python Flask - Request Object • HTTP Method • Variable Rules • Redirect and Errors • Change Port • Changing Host IP Address • Process Incoming Request Data"
      },
      {
        "title": "4. Templates and Static Files",
        "content": "Explains creating dynamic web pages using templates and managing static files like CSS, JavaScript and images. • Templates • Template Inheritance • Static Files"
      },
      {
        "title": "5. Form Handling",
        "content": "This section covers capturing user input, form validation, file uploads and security features like CSRF protection. • Flask-WTF • Handling File Uploads • CSFR Protection • Retrieving HTML Form data • Use Web Forms"
      },
      {
        "title": "6. Configuration",
        "content": "It explains how to manage application settings such as debug mode, secret keys and environment-based configurations. • App Configuration • Environment-Specific Configuration"
      },
      {
        "title": "7. Database",
        "content": "Flask supports multiple databases for storing and managing data, including SQLite, PostgreSQL, MySQL, MongoDB and also allows using SQLAlchemy or executing raw SQL queries. • SQLAlchemy • SQLite • MongoDB Database • PostgreSQL Database • Login & Registration Project MySQL • Filtering, Sorting, and Pagination in Flask • Execute Raw SQL in SQLAlchemy"
      },
      {
        "title": "8. Middlewares",
        "content": "This section covers how middleware processes requests and responses for tasks like logging, authentication and modifications. • Middlewares • WSGI Middleware"
      },
      {
        "title": "9. Authentication",
        "content": "Authentication is used to verify user identity and manage secure access to applications. It includes login systems, password hashing, session management and permission control. • Adding Authentication • Display Current Username • Password Hashing with Bcrypt • Store username and password • Role-Based Access Control • Sessions to server Logout • JWT • Cookies • JSON Response"
      },
      {
        "title": "10. Rest APIs",
        "content": "Flask makes building REST APIs easy by handling requests like GET, POST, PUT and DELETE. With Flask-RESTful, one can send and receive JSON data, manage authentication and secure the API. • Creating Rest APIs • Flask-CORS • RESTful Extension • Serialization and Deserialization"
      },
      {
        "title": "11. Advanced Topics",
        "content": "Introduces advanced concepts like asynchronous programming, WebSockets and modular app structure using blueprints. • Asynchronous Programming • Web Sockets • Blueprints"
      },
      {
        "title": "12. Deployment & Error Handling",
        "content": "After development, Flask apps must be deployed and properly handle errors. This section covers deployment methods and techniques for managing application errors. • Subdomain • Handling 404 Error • Dockerization • Deploying App on Heroku • Deploying ML Model"
      },
      {
        "title": "13. Projects",
        "content": "This section includes practical Flask projects that demonstrate real-world applications such as portfolio websites, APIs, data visualization and sentiment analysis tools. • Todo List App • Single Page Portfolio • Profile Application • Wikipedia Search App • Twitter Sentiment Analysis • Cricket Score API using Web Scraping • Adding Graphs to Flask Apps • Projects Archives"
      },
      {
        "title": "14. Additional Resources",
        "content": "This section provides helpful articles and references to deepen understanding of Flask and related topics. • Career Opportunities • Interview Questions and Answers Comment",
        "callout": {
          "type": "tip",
          "title": "Practice Tip",
          "message": "Use the interactive console below to experiment with the concepts covered in this lesson."
        }
      },
      {
        "title": "15. Explore",
        "content": "Python Fundamentals • Introduction 1 min read • Input & Output 2 min read • Variables 4 min read • Operators 4 min read • Keywords 2 min read • Data Types 4 min read • Conditional Statements 3 min read • Loops 3 min read • Functions 4 min read Python Data Structures • String 4 min read • List 3 min read • Tuples 3 min read • Dictionary 3 min read • Set 2 min read • Arrays 5 min read Advanced Python • OOP Concepts 3 min read • Exception Handling 5 min read • File Handling 4 min read • Python Database 2 min read • MongoDB 3 min read • MySQL 7 min read • Packages 4 min read • Modules 3 min read • DSA Libraries 5 min read • Python GUI 2 min read Data Science with Python • Numpy 3 min read • Pandas 4 min read • Matplotlib 3 min read • Seaborn 3 min read • StatsModel 2 min read • Model Building 6 min read • TensorFlow 2 min read • PyTorch 5 min read Web Development with Python • Flask 3 min read • Django 5 min read • Django ORM 4 min read • Jinja2 Templating 5 min read • Django Templates 5 min read • REST API 3 min read • Build API with DRF 4 min read Python Practice • Quiz 1 min read • Practice Problems 2 min read • Interview Q & A 15+ min read Courses • Placement 360 Course 2 min read • Data Science 360 Course 2 min read • AI Engg Course 2 min read"
      }
    ],
    "playground": {
      "title": "Python & ML Console: Flask Tutorial",
      "initialCode": "# Flask Tutorial\n# Source: GeeksForGeeks\n# Interactive Python & ML Console\n\nimport numpy as np\nimport json\n\n# Flask Tutorial\n# Interactive ML / Data Science console\n\n# Example: Basic NumPy operations\ndata = np.array([23, 45, 12, 67, 34, 89, 56, 78, 90, 11])\n\nprint(\"Dataset Statistics:\")\nprint(f\"  Mean:    {np.mean(data):.2f}\")\nprint(f\"  Median:  {np.median(data):.2f}\")\nprint(f\"  Std Dev: {np.std(data):.2f}\")\nprint(f\"  Min/Max: {data.min()} / {data.max()}\")\n\n# Normalize data\nnormalized = (data - data.min()) / (data.max() - data.min())\nprint(f\"\\nNormalized: {normalized.round(2)}\")",
      "expectedOutput": [
        "[CONSOLE] Python 3.11 | Topic: Flask Tutorial",
        "[IMPORT] numpy, pandas, scikit-learn ready",
        "[STATUS] Interactive ML simulation active",
        "[RUN] Executing code...",
        "[SUCCESS] No errors detected"
      ],
      "language": "python",
      "engineBadge": "Python 3.11 + NumPy"
    },
    "quiz": {
      "question": "What is Flask's primary role in machine learning deployment?",
      "options": [
        "Training ML models",
        "Providing a lightweight WSGI web framework to serve ML model predictions as HTTP endpoints",
        "Data preprocessing",
        "Feature engineering"
      ],
      "correctIndex": 1,
      "explanation": "Flask is a minimal Python web framework used to wrap trained ML models in REST API endpoints, allowing them to receive input data and return predictions over HTTP."
    }
  }
};
