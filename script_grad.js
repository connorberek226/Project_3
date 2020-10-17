// Authored by Mike Grad
// NOTE:  Chart JS Library - include cdn link in html
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
// d3.csv("data/cleaned_csv/cleaned_stateData.csv").then(function(data) {
//     console.log(data[0]);
//     stateData = data;
//   }).then(function() {
//     d3.csv("data/cleaned_csv/cleaned_us-state-covid-data.csv").then(function(data) {
//       console.log(data[0]);
//       covidData = data;
//     });    
//   }).then(process);
Promise.all([
  d3.csv("data/cleaned_csv/cleaned_stateData.csv"),
  d3.csv("data/cleaned_csv/cleaned_us-state-covid-data.csv"),
  d3.csv("data/cleaned_csv/cleaned_state_list.csv"),
]).then(function(files) {
  stateData = files[0];
  covidData = files[1];
  stateList = files[2];
  
  process(stateData, covidData, stateList);
}).catch(function(err) {
  // handle error here
})
// console.log(stateData);
// console.log(stateList);

function process(stateData, covidData, stateList) { 

  // console.log(stateData);
  // console.log(covidData);
  // console.log(stateList);

  // Define x values for state income
  let stateIncomeData = [];
  // console.log(stateData);
  let stateDataFiltered = stateData.filter(d => d.LineCode === "3");
  // console.log(stateDataFiltered);
  for (row of stateDataFiltered) {
    stateIncomeData.push(+row["2019"]);
  };
  // console.log(stateIncomeData);

  // Define y values

  let covidStateInfection = [];
  let covidStateDeath = [];
  // console.log(covidData);
  for (row of covidData) {
    covidStateInfection = covidStateInfection + row.case;
    covidStateDeath = covidStateDeath + row.deaths;
  };
  // console.log(covidStateInfection);
  // console.log(covidStateDeath);

  function buildPlot(x_values, y_values, layout, tag) {

    let trace1 = {
      x: x_values,
      y: y_values,
      type: "scatter",
      mode: "markers"
    };

    let data = [trace1];

    Plotly.newPlot(tag, data, layout);  


  } 
  let latitude = [];
  stateList.forEach(row => {
  // for (row; row < stateList.length; row++) {
    latitude.push(Number(row.latitude)); // removed +row.latitude plus
    console.log(row);
  });
  // };
  // console.log(stateList);
  // console.log(latitude);

  // *****************************************************
  // STEP 2:  Create Chart:  Covid Infections vs. Latitude
  // *****************************************************
  let layout1 = {
    title: "2020 Covid Infections vs. Latitude",
    xaxis: { title: "Latitude"},
    yaxis: { title: "2020 Covid Infections"}
  };

  let tag1 = "plot1";
  buildPlot(covidStateInfection, latitude, layout1, tag1);
  // *****************************************************
  // STEP 3:  Create Chart:  Covid Deaths vs. Latitude
  // *****************************************************
  let layout2 = {
    title: "2020 Covid Deaths vs. Latitude",
    xaxis: { title: "Latitude"},
    yaxis: { title: "2020 Covid Deaths"}
  };

  let tag2 = "plot2";
  buildPlot(covidStateDeath, latitude, layout2, tag2);
  // *******************************************************************
  // STEP 4:  Create Chart:  Covid Infections vs. Per Captia Income 2019
  // *******************************************************************
  
  let layout3 = {
    title: "2020 Covid Infections vs. 2019 Per Capita Income",
    xaxis: { title: "2019 Per Capita Income"},
    yaxis: { title: "2020 Covid Infections"}
  };
  let tag3 = "plot3";
  buildPlot(covidStateInfection, stateIncomeData, layout3, tag3);


  // *******************************************************************
  // STEP 5:  Create Chart:  Covid Infections vs. Per Captia Income 2019
  // *******************************************************************
  let layout4 = {
    title: "2020 Covid Deaths vs. 2019 Per Capita Income",
    xaxis: { title: "2019 Per Capita Income"},
    yaxis: { title: "2020 Covid Deaths"}
  };
  let tag4 = "plot4";
  buildPlot(covidStateDeath, stateIncomeData, layout4, tag4);
};