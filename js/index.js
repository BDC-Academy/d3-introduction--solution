// Note: The D3 select and selectAll function return a Selection object.
// Almost all d3 function calls that you can perform on a Selection object, such as append or attr, 
// will return the Selection object again which also makes chaining possible.

/**
 * Creates a square using D3 and an svg polygon element.
 */
function createSVGSquare() {
  // TODO: 1.1 use the d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: 1.2 use the 'append' function on the svg selection to add a 'polygon' element to the svg.
  const polygonSelection = svgSelection.append('polygon');

  // TODO: 1.3 use the attr function on the polygon selection to set some attributes,
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
  // TODO: 2.1 use d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: 2.2 use the 'append' function on the svg selection to add a 'circle' element to the svg.
  const circleSelection = svgSelection.append('circle');

  // TODO: 2.3 use the attr function on the circle selection to set some attributes,
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
  // TODO: 3.1 use d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: 3.2 use the 'append' function on the svg selection to add a 'path' element to the svg.
  const triangleSelection = svgSelection.append('path');

  // TODO: 3.3 use the attr function on the triangle selection to set some attributes.
  // Try and figure out the d attribute for yourself if you still know how to use it or copy it from the svg-dom-manipulation repo :)
  // Use chaining syntax and add to following attributes (same values as previous assignments):
  // id: triangle, stroke: red, stroke-width: 10, fill: transparent, d: ???
  triangleSelection
    .attr('id', 'triangle')
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

  // TODO: 4.1 use d3.select function to get the bubbles svg element/selection
  const svgSelection = d3.select('#bubbles');

  // A for loop to create a number of bubbles (50) with random radius and position
  for (let i = 0; i < 50; i++) {
    // Calculate random radius and position
    const r = radius[Math.floor(Math.random() * radius.length)];
    const cx = coordinates[Math.floor(Math.random() * coordinates.length)];
    const cy = coordinates[Math.floor(Math.random() * coordinates.length)];

    // TODO: 4.2 append a bubble to the svg selection
    const bubble = svgSelection.append('circle');

   // TODO: 4.3 set the bubble x, y and r attributes along with the class, stroke, stroke-width and fill.
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
  // TODO: 5.1 use d3.select function to get the bubbles svg element/selection
  const svgSelection = d3.select('#bubbles');

  // TODO: 5.2 use the selectAll function on the svg selection
  // to select all circles that are direct children of the svg selection.
  const circles = svgSelection.selectAll('circle');

  // TODO: 5.3 set the stroke attr of each circle to red using the selection returned by the selectedAll we used above.
  // Note: you can write the code as if it is a single circle, 
  // it does not matter if a selection contains one or one hundred elements.
  // D3 will iterate through the selection and apply the attr to all of them.
  circles.attr('stroke', 'red');

  // D3 function calls on a selection like .attr can also receive a callback function instead of a fixed value.
  // The function is used to calculate the correct value for the current item in the selection and must return the calculated value. 
  // We call will call this a 'value function'.
  // The value function will receive a dataitem as a first parameter (ignore/skip this one for now) and the current index as a second parameter from D3.
  // TODO: 5.4 Instead of making all the circles red, only make every second circle red.
  // Note: use the index parameter in the value function.
  circles.attr('stroke', function (_dataitem, index) {
    return index % 2 ? 'red' : 'blue';
  });
}

/**
 * Sort all bubbles by size or color
 */
function handleSortBubbles() {
  // TODO: 6.1 use d3.select function to get the bubbles svg element/selection
  const svgSelection = d3.select('#bubbles');

  // TODO: 6.2 use the selectAll function on the svg selection
  // to select all circles that are direct children of the svg selection.
  const circles = svgSelection.selectAll('circle');

  // TODO: 6.3 use the attr function on the circles selection to set the cx and cy attributes of each circle.
  // Use a value function to:
  // - move all the blue bubbles to the top left corner of the svg, by setting cx and cy to 20
  // - move all the red bubbles to the top right corner of the svg, by setting cx 380 and cy to 20
  // - move all the green bubbles to the center of the svg
  // D3 has set the current html element to the 'this' inside the value function,
  // so you can get the stroke color of the current circle with the this.getAttribute function.
  // circles
  //   .attr('cx', function (_dataitem, _index) {
  //     // const circle = d3.select(this);
  //     // const color = circle.attr('stroke');
  //     const color = this.getAttribute('stroke');
  //     if (color === 'blue') {
  //       return 20;
  //     } else if (color === 'red') {
  //       return 380;
  //     } else {
  //       return 200;
  //     }
  //   })
  //   .attr('cy', function (_dataitem, _index) {
  //     // const circle = d3.select(this);
  //     // const color = circle.attr('stroke');
  //     const color = this.getAttribute('stroke');
  //     if (color === 'blue' || color === 'red') {
  //       return 20;
  //     } else {
  //       return 200;
  //     }
  //   });

  // TODO Extra: instead of moving the circles to fixed positions, put them in a single row next eachother.
  // The bubbles will probably run outside the svg bounds, you can decrease the number of bubbles in the for loop 
  // or try and create multiple rows but don't worry about that now ;) 
  // Note: getAttribute always returns a string
  // Note: The value function provides a third parameter 'nodes' that is a nodelist containing all the html elements in the selection. 
  //       These nodes could be used to position the bubbles exactly next to eachother
  circles
    .attr('cy', function (_dataitem, index) {
      return 20;
    })
    .attr('cx', function (_dataitem, index, nodes) {
      // const radius = this.getAttribute('r');

      // // index * diameter + radius
      // return index * (12 * 2) + parseInt(radius);

      //the bubbles 
      const radius = +this.getAttribute('r');
      const cx = Array.from(nodes)
        .slice(0, index)
        .reduce((tempCx, currentNode) => {
          return tempCx + (+currentNode.getAttribute('r') * 2);
        }, 0);

      return cx + radius;
    })
}

/**
 * Add mousover event listener to the triangle element.
 * Note: You can add eventListeners to a d3 selection with the '.on' function.
 *       The first argument is the event-name like click, mouseover, mouseenter etc.
 *       The second argument is the callback function to call when the event fires, which receives an event object.
 */
function addTriangleClickEventListener() {
  // TODO: 7.1 use d3.select function to get the basic-shapes svg element/selection
  const svgSelection = d3.select('#basic-shapes');

  // TODO: 7.2 use d3.select function to get the triangle svg element/selection
  const triangleSelection = svgSelection.select('#triangle');

  // TODO: 7.3 Use the 'on' function on the triangle selection to add a 'mouseenter' event listener to the triangle.
  // Use the .attr function on the triangleSelection to add the triangle-rotate class to activate the rotate keyframes
  triangleSelection.on('mouseenter', function (_event) {
    triangleSelection.attr('class', 'triangle-rotate');
  });

  // TODO: 7.4 Use the 'on' function on the triangle selection to add a 'mouseout' event listener to the triangle.
  // Use the .attr function on the triangleSelection to remove the triangle-rotate class to activate the rotate keyframes
  triangleSelection.on('mouseout', function (_event) {
    triangleSelection.attr('class', null);
  });
}

/**
 * Add click events to all circle elements.
 * Note: You can add eventListeners to a d3 selection with the '.on' function.
 *       The first argument is the event-name like click, mouseover, mouseenter etc.
 *       The second argument is the callback function to call when the event fires, which receives an event object.
 */
function addBubbleClickEventListeners() {
  // TODO: 8.1 use d3.select function to get the bubbles svg element/selection
  const svgSelection = d3.select('#bubbles');

  // TODO: 8.2 use the selectAll function on the svg selection
  // to select all circles that are direct children of the svg selection.
  const circles = svgSelection.selectAll('circle');

  // TODO: 8.3 Use the 'on' function on the circles selection to add a 'click' event listener to all the circles.
  // When a circle is clicked, use the attr function to set the stroke of the circle to green.
  // Note: you can use d3.select on event.target or on 'this' to select the clicked circle element.
  circles.on('click', function (event) {
    const circleSelection = d3.select(event.target);

    circleSelection.attr('stroke', 'green');
  });
}

//###### readonly ######

function createSVGSVGElement(width, height, id) {
  // select the element we want to add our svg graphic to, our root div 
  const rootSelection = d3.select('#root');
  // append an svg element to our root element with D3
  const svgSelection = rootSelection.append('svg');

  // set attributes on the svg element
  // svg.attr('id', id);
  // svg.attr('width', width);
  // svg.attr('height', height);
  // svg.attr('viewBox', [0, 0, width, height]);

  // using chaining syntax
  svgSelection.attr('id', id)
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height]);

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
addTriangleClickEventListener();
//###### end readonly ######





