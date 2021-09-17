var calcBoxes = document.querySelectorAll(".calculation");
for (box of calcBoxes){
box.addEventListener("change", () => {handleCalculation()}, false);
}

function getCalcMatrix(){
    var calcBoxes = document.querySelectorAll(".calculation");
    return [[calcBoxes[0].value, calcBoxes[1].value], [calcBoxes[2].value, calcBoxes[3].value]];
}

function handleCalculation(){
    var calcMatrix = getCalcMatrix();

    var inverse = [[Math.round((calcMatrix[1][1] * (1/determinant(calcMatrix))) * 100) / 100, Math.round(-calcMatrix[0][1] * (1/determinant(calcMatrix))* 100) / 100],
    [Math.round(-calcMatrix[1][0] * (1/determinant(calcMatrix))), Math.round(calcMatrix[0][0] * (1/determinant(calcMatrix)))]];
    

    var inverseBoxes = document.querySelectorAll(".inverse");
    inverseBoxes[0].innerText = inverse[0][0];
    inverseBoxes[1].innerText = inverse[0][1];
    inverseBoxes[2].innerText = inverse[1][0];
    inverseBoxes[3].innerText = inverse[1][1];

    var transposeBoxes = document.querySelectorAll(".transpose");
    transposeBoxes[0].innerText = calcMatrix[0][0];
    transposeBoxes[1].innerText = calcMatrix[1][0];
    transposeBoxes[2].innerText = calcMatrix[0][1];
    transposeBoxes[3].innerText = calcMatrix[1][1];

    document.getElementById("determinantPe").innerText = "Determinant = " + determinant(calcMatrix);
}