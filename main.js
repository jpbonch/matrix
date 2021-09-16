var currentMatrix = [[1,0],[0,1]];
function createPlot(){
  var layout = {
      autosize: true,
      margin: {'t': 20, 'l':20, 'r':20, 'b':20},
      dragmode: 'pan',
      xaxis: {
        autorange: false,
        range: [-2,2],
        scaleratio:1,
        tickmode:'linear',
        zerolinecolor: '#000000',
        zerolinewidth: 2,
        // ticks: "inside"
      },
      yaxis:{
        autorange: false,
        range: [-2,2],
        scaleratio:1,
        tickmode:'linear',
        zerolinecolor: '#000000',
        zerolinewidth: 2,
        ticklabelposition: "inside",
        tickson: "boundaries"
      },
      // height: 500,
      // width: 500,
  }
  Plotly.newPlot('graphDiv', [], layout, {displaylogo: false, modeBarButtonsToRemove: ['autoScale2d', 'toImage', 'zoom2d', 'pan2d']});
}



function multiplyPointByMatrix(matrix, point) {
    return [(matrix[0][0] * point[0]) + (matrix[0][1] * point[1]), 
            (matrix[1][0] * point[0]) + (matrix[1][1] * point[1])]
}

function determinant(a) {
    var order = a.length;
    if (order === 1) {
        return a[0][0];
    }
    if (order === 2) {
        return a[0][0] * a[1][1] - a[0][1] * a[1][0];
    }
    var det = 0;
    for (var j = 0; j < order; j++) {
        det += a[0][j] * cofactor(a, 0, j);
    }
    return det;
}

function cofactor(a, line, column) {
    var sub_matrix = [],
        order = a.length,
        m = 0;
    for (var i = 1; i < order; i++) {
        sub_matrix[m] = [];
        for (var j = 0; j < order; j++) {
            if (j !== column) {
                sub_matrix[m].push(a[i][j]);
            }
        }
        m++;
    }
    return (column % 2 ? -1 : 1) * determinant(sub_matrix);
}
function handleTransformation(){
  var matrixBoxes = document.querySelectorAll(".transformation");
  var newMatrix = [[matrixBoxes[0].value, matrixBoxes[1].value],[matrixBoxes[2].value,matrixBoxes[3].value]]
  currentMatrix = newMatrix;
  updatePlot();
  document.getElementById("determinantP").innerText = "Determinant: " + determinant(currentMatrix);
}

function updatePlot(){
  var xy0 = multiplyPointByMatrix(currentMatrix,[0,0])
  var xy1 = multiplyPointByMatrix(currentMatrix,[0,1]) // cahnge [1,1]
  var xy2 = multiplyPointByMatrix(currentMatrix,[1,0])
  var xy3 = multiplyPointByMatrix(currentMatrix,[1,1])
  console.log(xy1)
  Plotly.update('graphDiv', [], {
    shapes: [
        // {
        //     x0: xy0[0],
        //     y0: xy0[1],
        //     x1: xy1[0],
        //     y1: xy1[1],
        //     fillcolor: '#f4f4f4',
        //     opacity: 1,
        //     line: {
        //         width: 4
        //     }
        // }
        {
          type: 'path',
          path: `M${xy0[0]},${xy0[1]} L${xy1[0]},${xy1[1]} L${xy3[0]},${xy3[1]} L${xy2[0]},${xy2[1]} L${xy0[0]},${xy0[1]}`, 
          fillcolor: 'rgba(255, 140, 184, 0.5)',
          line: {
            color: 'rgb(255, 140, 184)'
          }
        }
      ]
  })
}

function handleRotation(event){
  var angle = event.currentTarget.value;
  var rotationMatrix = [[Math.cos(angle * Math.PI / 180), -Math.sin(angle * Math.PI / 180)],
                        [Math.sin(angle * Math.PI / 180), Math.cos(angle * Math.PI / 180)]];
  currentMatrix = rotationMatrix;
  updatePlot();
  var matrixBoxes = document.querySelectorAll(".transformation");
  matrixBoxes[0].value = currentMatrix[0][0];
  matrixBoxes[1].value = currentMatrix[0][1];
  matrixBoxes[2].value = currentMatrix[1][0];
  matrixBoxes[3].value = currentMatrix[1][1];
  document.getElementById("determinantP").innerText = "Determinant: " + determinant(rotationMatrix);
}



function main(){
  createPlot();
  updatePlot()
  var matrixBoxes = document.querySelectorAll(".transformation");
  for (box of matrixBoxes){
    box.addEventListener("change", () => {handleTransformation()}, false);
  }

  document.getElementById("angle").addEventListener("change", handleRotation, false)
}

main();
