---
layout: default
---

## Exploration of the 1500m Dash World Record

As a Runner, it interests me that some records appear to stand the test of time. Specifically, the record for the 1500m Dash held by Hicham El Guerrouj of Morocco, hasn’t yet been broken since he set it in 1998. This study aimed to analyze the historical data of the 1500m Dash world record to explore trends and predict future record times.

> All Data was gather from Wikipedia
>
> <a href="https://en.wikipedia.org/wiki/1500_metres_world_record_progression" target="_blank">1500m World Record Progression Wiki Page</a>

>
> This project was completed in R

**1. Data Collection and Cleaning**

I collected data spanning years since 1896, with each year being captured as a new world record time was set. I employed a linear regression model initially, yielding a high R-squared value of 94.3%.

![Linear](https://drive.google.com/thumbnail?id=1xmJboM9wbZBepgeWAxMoIb2k1V7VhymZ&sz=w1000)



**2. Linear Regression Analysis**

The linear regression model (1500m WR = 243 -0.335*YEAR (since 1896)) provided insights into the historical trend of world record times. I made predictions for 2025 and 2030 using the model, estimating times of 197.205 seconds and 195.43 seconds, respectively. However, with the nature of this type of model, I do not believe it to be a very accurate predictor for future WR time values. 

**3. Logarithmic Transformation and Analysis**

I then decided to apply a logarithmic transformation to my data, where (Logarithmic Transformation: Time = 311.227  - 30.07log(DATE)) When evaluating predictions for 2021 and 2030, the results were roughly 211 seconds for both results. However, since the current world record is 207 seconds, these results were not useful for future prediction. Overall, it is clear to see that inputting the times every year as the current world record, rather than just the fastest time in that year, will be a more accurate model.

```R
// R Code with syntax highlighting.
years <- c(1896:2030)  # Assuming years range from 1896 to 2030
world_record_times <- c(243 - 0.335 * (years - 1896))  # Assuming linear regression model for world record times

log_transform <- function(x) {
  result <- 311.227 - 9.217 * log(x)
  return(result)
}

world_record_times_transformed <- log_transform(world_record_times)

plot(years, world_record_times_transformed, type = "l", col = "blue", xlab = "Year", ylab = "Log-Transformed World Record Time",
     main = "Logarithmic Transformation of 1500m World Record Times")
}
```



![Logarithmic](https://drive.google.com/thumbnail?id=1y5CDpQ3lej5y3N-HtnIqWAkM9MRJMQkv&sz=w1000)

**4. Quadratic Regression**

After debating various transformation methods to enhance the significance of data from 1998 onwards, I opted for a quadratic regression model. This choice was based off my belief that it would yield the highest R-Squared Value. The resulting equation for the 1500m world record impressively, demonstrated an R-Squared value of 99.1% and adjusted R-squared value of 99.08%. For the end of 2025 and end of 2030, my model predicts a 1500m World Record time of 204.946 and 204.847 seconds, a improvement of 2.054 and 2.153 seconds. 

![Quadratic](https://drive.google.com/thumbnail?id=1BatmUc9ZF1er6Lg6fQcxvQCglw_CZSxa&sz=w1000)

**5. Conclusion**

My analysis revealed the superiority of the quadratic regression model in predicting the 1500m world record, in the short term. While the quadratic model effectively accounted for past, present, and near-future times, its limitations became apparent beyond 2032. For example, my model predicts that the fastest 1500m time in 2050 would be 205.662 seconds, less of an improvement than my estimation for 2021 or 2030. Some other possible methods I debated adding was a asymptote near 173 seconds, since that is roughly 3 times the current world record for the 500m dash set by David Rudisha in 2016. However, in the end I decided that for estimating the near future, the most accurate method to accomplish this was through a quadratic regression. Please see below for a breakdown of final time predictions according to the three seperate regressions:

| Regression Type | 2025 Prediction (seconds) | 2030 Prediction (seconds) |
|-----------------|----------------------------|----------------------------|
| Linear          | 197.205                    | 195.43                     |
| Logarithmic     | 211.803                    | 211.771                    |
| Quadratic       | 204.946                    | 204.847                    |



[back](./)
