const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Initialize the dashboard
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data)=> {
        // Pull names from data and add those names as options in the dropdown
        let names = data.names;

        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });
        // Get the first sample in the list
        let singleSample = names[0];
        // Display the charts
        barChart(singleSample);
        bubbleChart(singleSample);
        demoPanel(singleSample);

    });
}   
// Funciton to create the barchart
function barChart(value) {
    d3.json(url).then((data) => {
    // Get the samples from data
    let samples = data.samples
    // Get the sample where the ID matches the selected value
    let filtered = samples.filter((sample) => sample.id === value);
    // Get the first index
    let valData = filtered[0];
    // Plot the barchart
    let trace = [{
        x: valData.sample_values.slice(0,10).reverse(),
        y: valData.otu_ids.slice(0,10).map((id) => `OTU ${id}`).reverse(),
        text: valData.otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
      }];

    Plotly.newPlot("bar", trace);
      });

}
// Function to create the bubble chart
function bubbleChart(value) {

    d3.json(url).then((data) => {
    // Get the samples from data
    let samples = data.samples
    // Get the sample where the ID matches the selected value
    let filtered = samples.filter((sample) => sample.id === value);
    // Get the first index
    let valData = filtered[0];
    // Plot the bubblechat
    let trace1 = [{

    x: valData.otu_ids,
    y: valData.sample_values,
    mode: 'markers',
    text: valData.otu_labels,
    marker: {
        color: valData.otu_ids,
        size: valData.sample_values,
        colorscale: "Portland"
    }


    }];
    // Add an x-axis title
    let layout = {
        xaxis: {title: "OTU ID"}
    }

    Plotly.newPlot("bubble",trace1,layout);
    })

}
// Function to create the demopanel
function demoPanel(value) {

    d3.json(url).then((data) => {
    // Get the metadata
    let metadata = data.metadata;
    // Get the metadata where the ID matches the selected value
    let filtered = metadata.filter((sample) => sample.id == value);
    // Get the first index
    let valData = filtered[0]
    // Clear out metadata
    d3.select("#sample-metadata").html("");
    // Add the key, value pair from the metadata to the panel
    Object.entries(valData).forEach(([key,value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
    });

    });
}
// Function to updated the dashboard when the sample is changed
function optionChanged(value) {
    barChart(value);
    bubbleChart(value);
    demoPanel(value);

}
// Calling the initialize funciton
init();