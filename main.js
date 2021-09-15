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

      shapes: [
          {
              type: 'square',
              x0: 0,
              y0: 0,
              x1: 1,
              y1: 1,
              fillcolor: '#f4f4f4',
              opacity: 1,
              line: {
                  width: 4
              }
          }
        ]
  }
  Plotly.newPlot('graphDiv', [], layout, {displaylogo: false, modeBarButtonsToRemove: ['autoScale2d', 'toImage', 'zoom2d', 'pan2d']});
}



function multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

function determinante(a) {
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
    return (column % 2 ? -1 : 1) * determinante(sub_matrix);
}
function handleTransformation(currentMatrix){
  if (currentMatrix[0].includes("") || currentMatrix[1].includes("")){

  }
  var newMatrix = multiplyMatrices([[1,0],[0,1]], currentMatrix);
  Plotly.update('graphDiv', [], {
    shapes: [
        {
            type: 'square',
            x0: newMatrix[0][0],
            y0: newMatrix[1][0],
            x1: newMatrix[0][1],
            y1: newMatrix[1][1],
            fillcolor: '#f4f4f4',
            opacity: 1,
            line: {
                width: 4
            }
        }
      ]
  })
  document.getElementById("determinantP").innerText = "Determinant: " + determinante(newMatrix);
}

function getCurrentMatrix(){
  var matrixBoxes = document.querySelectorAll(".transformation");
  return [[matrixBoxes[0].value, matrixBoxes[1].value], [matrixBoxes[2].value, matrixBoxes[3].value]];
}

function handleRotation(event){
  var angle = event.currentTarget.value;
  var rotationMatrix = [[Math.cos(angle), -Math.sin(angle)], [Math.sin(angle), Math.cos(angle)]];
  console.log(rotationMatrix)
  var newMatrix = multiplyMatrices([[1,0],[0,1]], rotationMatrix);
  Plotly.update('graphDiv', [], {
    shapes: [
        {
            type: 'square',
            x0: newMatrix[0][0],
            y0: newMatrix[1][0],
            x1: newMatrix[0][1],
            y1: newMatrix[1][1],
            fillcolor: '#f4f4f4',
            opacity: 1,
            line: {
                width: 4
            }
        }
      ]
  })
  var matrixBoxes = document.querySelectorAll(".transformation");
  matrixBoxes[0].value = newMatrix[0][0];
  matrixBoxes[1].value = newMatrix[1][0]
  matrixBoxes[2].value = newMatrix[0][1];
  matrixBoxes[3].value = newMatrix[1][1]

  document.getElementById("determinantP").innerText = "Determinant: " + determinante(newMatrix);
}



function main(){
  createPlot();
  var currentMatrix = [[1,0],[0,1]];
  var matrixBoxes = document.querySelectorAll(".transformation");
  for (box of matrixBoxes){
    box.addEventListener("change", () => {
      handleTransformation(currentMatrix);
    }, false);
  }

  document.getElementById("angle").addEventListener("change", handleRotation, false)
}

main();
