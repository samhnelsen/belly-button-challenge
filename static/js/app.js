const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Display the default plots
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    d3.json(url).then((data)=> {
        
        let names = data.names;

        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });
        let singleSample = names[0];

        barChart(singleSample);
        bubbleChart(singleSample);
        demoPanel(singleSample);

    });
}   

function barChart(value) {
    d3.json(url).then((data) => {
    
    let samples = data.samples

    let filtered = samples.filter((sample) => sample.id === value);

    let valData = filtered[0];
    
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

function bubbleChart(value) {

    d3.json(url).then((data) => {
    
    let samples = data.samples;

    let filtered = samples.filter((sample) => sample.id === value);

    let valData = filtered[0];
    
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

    let layout = {
        xaxis: {title: "OUT ID"}
    }

    Plotly.newPlot("bubble",trace1,layout);
    })

}

function demoPanel(value) {

    d3.json(url).then((data) => {
    
    let metadata = data.metadata;

    let filtered = metadata.filter((sample) => sample.id === value);

    let valData = filtered[0];

    d3.select("#sample-metadata").html("");

    Object.entries(valData).forEach(([key,value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
    });

    });
}

function optionChanged(value) {
    barChart(value);
    bubbleChart(value);
    demoPanel(value);

}
init();