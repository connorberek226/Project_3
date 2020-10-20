// Authored by Mike Grad

// ******************
// STEP 1:  READ DATA
// ******************
// Sourced From http://learnjsdata.com/read_data.html
// if reading a csv locally use python -m http.server or use flask
// use d3 version 5
let stateData2 = [];
let covidData2 = [];

// Input field not working test run with hardcoding Illinois.  See line 37 in html file
let stateInput = "Illinois"

Promise.all([
  d3.csv("data/cleaned_csv/cleaned_stateData.csv"),
  d3.csv("data/cleaned_csv/cleaned_us-state-covid-data.csv")
]).then(function(files) {
  stateData2 = files[0];
  covidData2 = files[1];
  // console.log(covidData2); // verified
  
  // process(covidData2);  verified covidData2 is read
}).catch(function(err) {
  // handle error here
})
// DEBUG!! -- why is covidData2 an empty list at this point??
// console.log(covidData2);

function process(covidData2) { 
  // DEBUG!! -- covidData2 not read, it is stateData2 instead in reverse order
//   console.log(covidData2); // verified
  // Define x values and y values
  let covidDates = [];
  let covidNewCases = [];
  let covidDeaths = [];
  
  let covidDataFiltered = covidData2.filter(d => d.state === stateInput);

  for (row of covidDataFiltered) {
    covidDates.push(+row["date"]);

    // DEBUG!! - why NaN and why only 3 rows for Illinois
    console.log(covidDates); // NaN for 3 rows for Illinois
    covidNewCases.push(+row["cases"]);
    // total deaths needs to be sum
    
    let totalDeaths = totalDeaths + +row["deaths"] 
    covidDeaths.push(totalDeaths);
  };
//   console.log(covidDates); // NaN
//   console.log(covidNewCases); // NaN
//   console.log(covidDeaths); // NaN

  function buildPlot(x_values, y_values, layout, tag) {
    // model 2 axis after Activity 15.1.7
    // Activity 15.2.9 = change plot by selecting drop down - event handler
    let trace1 = {
      x: x_values,
      y: y_values,
      type: "scatter",
      mode: "markers"
    };

    let data = [trace1];

    Plotly.newPlot(tag, data, layout);  


  } 

  // *****************************************************
  // STEP 2:  Create Chart:  Covid New Case Count vs. Date
  // *****************************************************
  let layout1 = {
    title: "2020 Covid Infections vs. Latitude ${stateInput}",
    xaxis: { title: "Date"},
    yaxis: { title: "2020 Covid New Cases"}
  };

  let tag1 = "lineplot1";
  buildPlot(covidStateInfection, latitude, layout1, tag1);
  // *****************************************************
  // STEP 3:  Create Chart:  Covid Total Deaths vs. Date
  // *****************************************************
  let layout2 = {
    title: "2020 Covid Deaths vs. Latitude ${stateInput}",
    xaxis: { title: "Date"},
    yaxis: { title: "2020 Daily Covid Deaths"}
  };

  let tag2 = "lineplot2";
  buildPlot(covidStateDeath, latitude, layout2, tag2);
  
};