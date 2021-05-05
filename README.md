
# Connections between COVID-19 data and US socioeconomic trends.
## By: Michael Grad, Alex Fernandez, Xi Zhang, Justin Forkert and Connor Berek

## Project Description
This project explored the relationship between Covid-19 infection rates and mortality rates with income level, the
relationship between Covid-19 infection rates and mortality rates with latitude in the US, and the
relationship between Covid-19 infection rates and mortality rates with population.

## Tools 
1. HTML
2. Javascript
   -Leaflet
3. SQL
   -Postgres
5. Python
   -Flask
   
## Steps 
1. Aquired data
   -Obtained Covid-19 data from CDC datasets of Covid-19 infection and mortality rates broken down by state within the United States https://data.cdc.gov/Case-         Surveillance/United-States-COVID-19-Cases-and-Deaths-by-State-o/9mfq-cb36
   -Bureau of Economic Analysis (BEA)

 
3. Cleaned and Merged data
   Covid-19 data, median income, and median population data joined in pgAdmin
4. Analysis
   Plotted Infection Rate by Latitude for US or state, Mortality Rate by Latitude for US or state, Infection Rate by Median Income and,
   Mortality Rate by Median Income
![image](https://user-images.githubusercontent.com/60550835/117167699-7c2d2d80-ad95-11eb-889b-f9bcd499a084.png)

6. Display
Maps
Infection Rates across US or selected state with Popup (US only)
Mortality Rates across US  or selected state with Popup (US only)
![image](https://user-images.githubusercontent.com/60550835/117054520-2cdcf380-ace8-11eb-9e6f-7bb3a9625560.png)

# Analysis
![image](https://user-images.githubusercontent.com/60550835/117140803-cef9eb80-ad7b-11eb-9c73-6e897266569a.png)

# Conclusions
Covid-19 vs. Latitude
                      No relationship for infection rate and mortality

Covid-19 vs. Median Income
No relationship for infection rate and mortality

Covid-19 vs. Population
Positive relationship between both infection rate and mortality rate and the population size
