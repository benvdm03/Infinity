---
layout: default
---

## Project 1: Mexican Tortilla Price Inflation (2007 - 2020)
My exploration aimed to uncover potential relationships between the inflation of tortilla prices in Mexico (measured in pesos) and the total oil imports/exports as well as arms imports in Mexico from 2007 to 2020. Given the disparate nature of the datasets, with values ranging from millions to billions and spanning various units, I decided to standardize the analysis by calculating the percentage change on a year-over-year basis. This methodology allowed for a more meaningful comparison across the datasets. Throughout my analysis, I followed a systematic approach, beginning with data transformation and ending with forecasting future tortilla prices using SARIMA modeling. Key steps included data inspection to identify and remove outliers, aggregation of the transformed data for visualization, correlation analysis to quantify relationships, and univariate analysis for forecasting.

> All Data was gather from Kaggle OPEN NOTE TO ADD LINKS


**1. Data Preparation and Transformation:**
I started by transforming the datasets to calculate the percentage change on a year-over-year basis, ensuring comparability despite differing scales and units. This step was crucial in standardizing the analysis.
![image](https://github.com/benvdm03/Infinity/assets/161901352/279a07ac-347a-4397-b46d-9228c4e9ec08)
![image](https://github.com/benvdm03/Infinity/assets/161901352/6f13135d-0b36-4753-bca5-7c638bba2057)
![image](https://github.com/benvdm03/Infinity/assets/161901352/1903b00b-891c-4ea2-a17b-a8fa8e978c3b)
![image](https://github.com/benvdm03/Infinity/assets/161901352/637b17e2-7ca1-45be-a270-08f448e9ea0b)
![image](https://github.com/benvdm03/Infinity/assets/161901352/61e5f044-3bd3-41d8-b4fa-da5420ca297b)

**2. Data Inspection and Outlier Removal:**
Upon inspecting the data, I identified outliers, particularly in oil and arms imports for the year 2020, which could potentially skew the analysis. To maintain accuracy, I removed these outliers from further analysis.
![image](https://github.com/benvdm03/Infinity/assets/161901352/b3d37c7c-e19a-45b6-9f17-fe23d626112a)


**3. Aggregation and Visualization:**
With the transformed and cleaned data, I aggregated the results and visualized the percentage changes over time using graphs. These visualizations provided insights into trends and patterns in the data.
![image](https://github.com/benvdm03/Infinity/assets/161901352/7fc91050-d7e3-4809-b3ac-b74da97d23c6)

**4. Correlation Analysis:**
Subsequently, I conducted a correlation analysis to quantitatively assess the relationships between oil exports, arms imports, and tortilla prices. While correlations were observed, they were relatively weak, suggesting complex dynamics at play. However, while there was a weak relationship, it was logical to believe that a increase in oil exports and a decrease in arms exports would lead to a rise in Tortilla prices.

```Python
// Python code with snippet
corr_mom_pop_oil = aggregated_results['Oil Exported by Year (Mexico) Percentage Change'].corr(aggregated_results['Avg Tortilla Price Change (Mom and Pop)'])
corr_big_retail_oil = aggregated_results['Oil Exported by Year (Mexico) Percentage Change'].corr(aggregated_results['Avg Tortilla Price Change (Big Retail)'])
corr_mom_pop_arms = aggregated_results['Arms Imports Mexico Percentage Change'].corr(aggregated_results['Avg Tortilla Price Change (Mom and Pop)'])
corr_big_retail_arms = aggregated_results['Arms Imports Mexico Percentage Change'].corr(aggregated_results['Avg Tortilla Price Change (Big Retail)'])
;
}
```

Correlation between oil exports and average tortilla price change (Mom and Pop): 0.4941951938027625
Correlation between oil exports and average tortilla price change (Big Retail): 0.20242394452425463
Correlation between arms imports and average tortilla price change (Mom and Pop): -0.053577438761162964
Correlation between arms imports and average tortilla price change (Big Retail): -0.07380266842185612

**5. Univariate Analysis and Forecasting:**
Finally, I performed a univariate analysis and utilized SARIMA modeling to forecast future tortilla prices based on historical data. This forecasting step enabled me to project potential price trends, aiding in informed decision-making.
![image](https://github.com/benvdm03/Infinity/assets/161901352/8be50016-3df6-497a-8407-b69a9f4a9209)


**Conclusion:**

In conclusion, my exploration into the relationship between tortilla prices, oil exports, and arms imports in Mexico yielded valuable insights into the economic dynamics of the region. Despite initial expectations of a clear correlation between these variables, the analysis revealed a more nuanced picture.

While correlations were observed between oil exports, arms imports, and tortilla prices, they were relatively weak. This suggests that other factors beyond these variables may influence tortilla price inflation in Mexico. Possible factors could include domestic economic policies, global market trends, agricultural production, and consumer behavior.

However, despite the weak correlations, the univariate analysis and SARIMA modeling provided compelling forecasts for future tortilla prices. The forecasts indicated potential trends in tortilla price inflation, highlighting the importance of considering historical data and advanced modeling techniques for informed decision-making.

Moving forward, further research could explore additional variables and factors that may influence tortilla prices in Mexico. Additionally, expanding the analysis to include a broader range of economic indicators and conducting more sophisticated modeling techniques could enhance the accuracy and robustness of the forecasts.

Overall, this exploration underscores the complexity of economic relationships and the importance of rigorous analysis in understanding and predicting market trends. By leveraging data-driven insights and advanced modeling approaches, stakeholders can make more informed decisions to navigate the dynamic economic landscape of Mexico.

[back](./)
