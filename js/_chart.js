/**
 * 
 * @param {string} rootElementId Id of the charts parent element 
 * @param {*} data 
 * @param ChartOptions options Properties that manipulate the inner workings of the chart such as width, height, margins
 * @param {boolean} initialize 
 * @returns 
 */
function Chart(rootElementId, data, options, initialize = true) {
  let svg, xAxis, yAxis, content, container;

  const init = function () {
    const { width, height, margin } = options;

    // substract the margins before using the height and width
    const contentHeight = calculateContentHeight(height, margin);

    // define svg and append it to the DOM
    svg = d3.select(`#${rootElementId}`)
      .append("svg")
      .attr("class", "chart")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    // define a container g element that holds the chart parts
    // and transforms them all at once based on margin values
    container = svg.append("g")
      .attr("class", "container")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // define xAxis g container element,
    // append it to the svg,
    // and put at the bottom of the svg with transform
    xAxis = container.append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${contentHeight})`);

    // define yAxis g container element,
    // append it to the svg
    yAxis = container.append("g")
      .attr("class", "yAxis");

    // define a g element that holds the content / bars / lines,
    // append it to the svg
    content = container.append("g")
      .attr("class", "content");

    draw(data, options);
  }

  const update = function (data, options) {
    draw(data, options);
  }

  const draw = function (data, options) {
    const { width, height, margin } = options;

    // substract the margins before using the height and width
    const contentWidth = calculateContentWidth(width, margin);
    const contentHeight = calculateContentHeight(height, margin);

    // isolate the values that we use to calculate and draw the chart
    const dataValues = data.map((d) => d.value);

    // (re)define the x scale band,
    // set the domain (in this case we create a tick for each item in the array),
    // and set the range, from left to right
    const xScale = d3.scaleBand()
      .padding(0.2)
      .domain(data.map((d) => d.label))
      .range([0, contentWidth]);

    // (re)define the y scale linear,
    // set the domain (from 0 to data max),
    // and set the range, from bottom to top
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(dataValues)])
      .nice()
      .range([contentHeight, 0]);

    // select all (non-)existing rect elements
    // and bind our data to the selection
    const selection = content.selectAll("rect").data(data);

    // enter
    // define any missing rect elements (data.length) with enter and append them to the DOM,
    // set the x, y, height, width and fill
    // The first time this is done, no bars are present in the DOM so they will all be appended
    selection
      .enter()
      .append("rect")
      .attr("fill", "#294899")
      .attr("x", (d) => xScale(d.label))
      .attr("y", (d) => yScale(d.value))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => contentHeight - yScale(d.value));

    //update
    // set existing rect elements in our selection that are already present in the DOM
    // to their correct height and y position
    selection
      .attr("y", (d) => yScale(d.value))
      .attr("height", (d) => contentHeight - yScale(d.value))

    //exit
    // select any rects in the DOM that don't exits in the data (.length) anymore
    // and remove them from the DOM
    selection
      .exit()
      .remove();

    // create axis by calling d3 axis function
    xAxis.call(d3.axisBottom(xScale));
    yAxis.call(d3.axisLeft(yScale));
  }

  if (initialize) init(data, options)

  return { update, draw }
}



// create chart


const width = 500,
  height = 400,
  margin = { left: 40, top: 10, right: 10, bottom: 40 };
const data = [
  { label: "React", value: 95 },
  { label: "Angular", value: 82 },
  { label: "Vue", value: 86 }
];



const { update, draw } = Chart("root", data, { width, height, margin });