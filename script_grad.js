// Authored by Mike Grad

// **********
// GOALS
// **********
// Plot covid infections vs. latitude
// Plot covid deaths vs. latitude

// Plot covid infections vs. per capita income (US)
// Plot covid deaths vs. per capita income (US)

// **********
// STRATEGY
// **********
// 1. Create HTML file with <script> tags for d3, plotly, js
// 2. Verify data read in
// 3. Verify which data file to use
// 4. Create plots

// ******************
// STEP 1:  READ DATA
// ******************
// Sourced From http://learnjsdata.com/read_data.html
// if reading a csv locally use python -m http.server or use flask
// use d3 version 5
let stateData = [];
let covidData = [];
d3.csv("data/cleaned_csv/cleaned_stateData.csv").then(function(data) {
    console.log(data[0]);
    stateData = data;
  }).then(function() {
    d3.csv("data/cleaned_csv/cleaned_us-state-covid-data.csv").then(function(data) {
      console.log(data[0]);
      covidData = data;
    });    
  }).then(process);

function process() {
  // *****************************************************
  // STEP 2:  Create Chart:  Covid Infections vs. Latitude
  // *****************************************************

  // *****************************************************
  // STEP 3:  Create Chart:  Covid Deaths vs. Latitude
  // *****************************************************

  // *******************************************************************
  // STEP 4:  Create Chart:  Covid Infections vs. Per Captia Income 2019
  // *******************************************************************
  // ACTION: REVIEW d3.csv activity
  // ACTION: REVIEW map and unpack functions
  // loop thru state income data to get the correct row #3
  let stateIncomeData = [];
  console.log(stateData);
  let stateDataFiltered = stateData.filter(d => d.LineCode === "3");
  console.log(stateDataFiltered);
  for (row of stateDataFiltered) {
    // stateIncomeData = stateIncomeData.push(stateDataFiltered.2019);
  };
  console.log(stateIncomeData);

  // loop thru covid data to get covid totals by state

  // let covidStateInfection = [];

  // let covidStateDeathAL = [];
  // for (row of covidData) {
  //   for (state of stateAbbr) {
  //     if (state === row.state) {
  //         covidStateInfection = covidStateInfection + row.case;
  //         covidStateDeath = covidStateDeath + row.deaths;
  //     };
  //   };
  // };
  // console.log(covidStateInfection);

  // let trace1 = {
  //   x: stateIncomeData,
  //   y: covidStateInfections,
  //   type: "scatter",
  //   mode: "markers"
  // };

  // let data = [trace1];

  // let layout = {
  //   title: "2020 Covid Infections vs. 2019 Per Capita Income",
  //   xaxis: { title: "2019 Per Capita Income"},
  //   yaxis: { title: "2020 Covid Infections"}
  // };

  // Plotly.newPlot("plot", data, layout);



}

// ACTION:  Create state-lat-lng.csv file
// const stateGeoData = d3.csv("/data/cleaned_data/state-lat-lng.csv").then(function(data) {
//     console.log(data[0]);
// });
    
// // ACTION:  Create state-lat-lng.csv file
// const stateAbbr = d3.csv("/data/cleaned_data/state-abbr.csv").then(function(data) {
//   console.log(data[0]);
// });

