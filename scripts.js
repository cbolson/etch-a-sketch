const gridContainer = document.getElementById("gridContainer");
//const cols = gridContainer.getAttribute("grid-cols");
//const rows = gridContainer.getAttribute("grid-rows");
const btnErase = document.querySelector("#erase");
const btnColor = document.querySelector("#set-color");
const btnReset = document.querySelector("#reset");
//const btnsGridSize = document.querySelectorAll("[num-cols]");
const sizeDisplay = document.querySelector("#display-size");
const sizeRange = document.querySelector("#grid-size");

// defaults
let drawMode = "fill";
let colorFill = "red";
const colorBackground = "white"; // should probably make this a data attrubute value too

// define start size
const cols = sizeRange.value;
sizeDisplay.textContent = cols;

// btn - size range

sizeRange.addEventListener("input", (event) => {
  sizeDisplay.textContent = event.target.value;
  //cols = event.target.value;
  drawGrid(event.target.value);
});

// btn - color picker
btnColor.addEventListener("input", (e) => {
  colorFill = e.target.value;
  e.target.style.backgroundColor = colorFill;
});

// btn - erase mode
btnErase.addEventListener("click", (e) => {
  if (drawMode === "fill") {
    drawMode = "erase";
    btnErase.classList.add("active");
  } else {
    drawMode = "fill";
    btnErase.classList.remove("active");
  }
  //console.log(drawMode);
});

// btn - reset
btnReset.addEventListener("click", (e) => {
  resetAll();
});
function resetAll() {
  drawGrid(cols);
  drawMode = "fill";
  sizeRange.value = 25;
  sizeDisplay.textContent = 25;
  btnErase.classList.remove("active");
}

// btns - grid size buttons (changed to slider )
/*
btnsGridSize.forEach(btn => {
  const setCols = btn.getAttribute("num-cols");
  const setRows = btn.getAttribute("num-rows");
  btn.addEventListener("click",  () => {
    btnsGridSize.forEach(b => {
      b.classList.remove("active");
    })
    drawGrid(setCols,setRows);
      btn.classList.add("active");
  })
})
*/

// create the grid
function drawGrid(cols) {
  const totalCells = cols * cols;
  let currentCell = 1;
  let currentRow = 1;
  gridContainer.innerHTML = "";
  gridContainer.style.gridTemplateColumns = `repeat(${cols},var(--cell-width)`;
  for (let i = 1; i <= totalCells; i++) {
    //console.log(curCell);
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    // note - when settting the grid area specifically, on some settings it breaks on the last cell (eg 10) - this is annoying as I want to be able to get the cell grid area....
    // gridItem.style.gridColumn = currentCell;
    //gridItem.style.gridRow = currentRow;
    //gridItem.innerText = i;
    //console.log(i, itemCol);
    gridContainer.appendChild(gridItem);

    gridItem.addEventListener("mouseover", () => {
      if (drawMode === "erase")
        gridItem.style.backgroundColor = colorBackground;
      else gridItem.style.backgroundColor = colorFill;
      //if(drawMode==="erase")  gridItem.classList.remove("active");
      //else gridItem.classList.toggle("active");
      // test to see if we can get the cell grid location (not related to etch-a-sketch demo)
      //const c = window.getComputedStyle(gridItem).getPropertyValue('grid-column');
      //const r = window.getComputedStyle(gridItem).getPropertyValue('grid-row');
      //console.log(c,r);
    });

    if (currentCell == cols) {
      currentRow++;
      currentCell = 1;
    } else {
      currentCell++;
    }
  }
}

// draw the gid on load
drawGrid(cols);
