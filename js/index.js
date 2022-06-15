// Note: The D3 select and selectAll function return a Selection object.
// Almost all d3 function calls that you can perform on a Selection object, such as append or attr, 
// will return the Selection object again which also makes chaining possible.

/**
 * Creates a square using D3 and an svg polygon element.
 */
function createSVGSquare() {

  // TODO: use d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: use the 'append' function on the svg selection to add a 'polygon' element to the svg.
  const polygonSelection = svgSelection.append('polygon');

  // TODO: use the attr function on the polygon selection to set some attributes,
  // including 'points'. Use chaining syntax and add to following attributes (same values as previous assignments):
  // id: square, stroke: #294899, stroke-width: 10, fill: transparent, points: 100 50,100 250,300 250,300 50
  polygonSelection
    .attr('id', 'square')
    .attr('stroke', '#294899')
    .attr('stroke-width', '10')
    .attr('fill', 'transparent')
    .attr('points', '100 50,100 250,300 250,300 50');

  return polygonSelection;
}

/**
 * Creates a circle using D3 and an svg circle element.
 */
function createSVGCircle() {
  // TODO: use d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: use the 'append' function on the svg selection to add a 'circle' element to the svg.
  const circleSelection = svgSelection.append('circle');

  // TODO: use the attr function on the circle selection to set some attributes,
  // Use chaining syntax and add to following attributes (same values as previous assignments):
  // id: circle, stroke: yellow, stroke-width: 10, fill: transparent, r: 100, cx: 200, cy: 150
  circleSelection
    .attr('id', 'circle')
    .attr('stroke', 'yellow')
    .attr('stroke-width', 10)
    .attr('fill', 'transparent')
    .attr('r', 100)
    .attr('cx', 200)
    .attr('cy', 150);

  return circleSelection;
}

/**
 * Creates a triangle using D3 and a svg path element.
 */
function createSVGTriangle() {
  // TODO: use d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: use the 'append' function on the svg selection to add a 'path' element to the svg.
  const triangleSelection = svgSelection.append('path');

  // TODO: use the attr function on the triangle selection to set some attributes.
  // Try and figure out the d attribute for yourself if you still know how to use it or copy it from the svg-dom-manipulation repo :)
  // Use chaining syntax and add to following attributes (same values as previous assignments):
  // id: triangle, stroke: red, stroke-width: 10, fill: transparent, d: ???
  triangleSelection
    .attr('id', 'circle')
    .attr('stroke', 'red')
    .attr('stroke-width', 10)
    .attr('fill', 'transparent')
    .attr('d', 'M 200 50 L 300 250 Q 200 200 100 250 Z');

  return triangleSelection;
}

/**
 * Create a bunch of bubbles with random size using D3 selectAll and circle elements.
 */
function createBubbles() {
  // Define fixed array of possible radius and x and y coordinates
  const radius = [4, 5, 6, 7, 8, 9, 10, 11, 12];
  const coordinates = [25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375];

  // TODO: use d3.select function to get the bubbles svg element/selection
  const svgSelection = d3.select('#bubbles');

  // TODO: use a for loop to create an number of bubbles (50)
  // and add a bubble for each iteration with a random bubble size from radius array
  for (let i = 0; i < 50; i++) {
    // Calculate random radius and position
    const r = radius[Math.floor(Math.random() * radius.length)];
    const cx = coordinates[Math.floor(Math.random() * coordinates.length)];
    const cy = coordinates[Math.floor(Math.random() * coordinates.length)];

    // TODO: append a bubble to the svg selection
    // and set the x, y and r attributes along with the class, stroke, stroke-width and fill.
    const bubble = svgSelection.append('circle');

    bubble
      .attr('class', 'bubble')
      .attr('stroke', 'blue')
      .attr('stroke-width', '1')
      .attr('fill', 'transparent')
      .attr('r', r)
      .attr('cx', cx)
      .attr('cy', cy);
  }
}

/**
 * Changes the color of the bubbles using D3 selectAll
 * @param {*} _event click event
 */
function handleChangeBubblesColor(_event) {
  // TODO: use d3.select function to get the bubbles svg element/selection
  const svgSelection = d3.select('#bubbles');

  // TODO: use the selectAll function on the svg selection
  // to select all circles that are direct children of the svg selection.
  const circles = svgSelection.selectAll('circle');

  // TODO: set the stroke attr of each circle to red using the selection returned by the selectedAll we used above.
  // Note: you can write the code as if it is a single circle, 
  // it does not matter if a selection contains one or one hundred elements.
  // D3 will iterate through the selection and apply the attr to all of them.
  circles.attr('stroke', 'red');

  // TODO: D3 function calls on a selection like .attr can also receive a callback function instead of a fixed value.
  // This function is then used to calculate the correct value for the current item in the selection and must return the calculated value.
  // The callback function will receive an item as a first parameter (ignore/skip this one for now) and the current index as a second parameter from D3.
  // instead of making all the circles red, only make every second circle red using the index parameter in the callback function.
  circles.attr("stroke", function(_item, index) {
    return index % 2 ? 'red' : 'blue';
  });
}


// TODO MARCEL: nog een opdracht bedenken waarbij je de callback function gebruikt
// TODO MARCEL: listeners  moet naar een eventlisteners repo
// TODO MARCEL: je kunt de bubbles gebruiken om een array van data te maken 0 t/m 50 en daar data, update, enter, exit gebruiken

/**
 * 
 */
function addBubbleClickEventListeners() {
   // TODO: use d3.select function to get the bubbles svg element/selection
   const svgSelection = d3.select('#bubbles');

   // TODO: use the selectAll function on the svg selection
   // to select all circles that are direct children of the svg selection.
   const circles = svgSelection.selectAll('circle');

   // TODO: Use the 'on' function on the circles selection to add a 'click' event listener to all the circles.
   // When a circle is clicked, use the attr functiob to set the stroke of the circle to yellow.
   // Note: you can use d3.select on event.target or on 'this' to select the clicked circle element.
   circles.on('click', function(event) {
    const circleSelection = d3.select(event.target);
    
    circleSelection.attr('stroke', 'yellow');
   });
}

//###### readonly ######

function createSVGSVGElement(width, height, id) {
  // select the element we want to add our svg graphic to, our root div 
  const rootSelection = d3.select('#root');
  // append an svg element to our root element with D3
  const svgSelection = rootSelection.append('svg');

  // set attributes on the svg element
  // svg.attr("id", id);
  // svg.attr("width", width);
  // svg.attr("height", height);
  // svg.attr("viewBox", [0, 0, width, height]);

  // using chaining syntax
  svgSelection.attr("id", id)
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [0, 0, width, height]);

  return svgSelection;
}

const width = 400, height = 400;

const svgBasicShapesSelection = createSVGSVGElement(width, height, 'basic-shapes');
const square = createSVGSquare();
const circle = createSVGCircle();
const triangle = createSVGTriangle();

const svgBubblesSelection = createSVGSVGElement(width, height, 'bubbles');
createBubbles();
addBubbleClickEventListeners();

//###### end readonly ######





