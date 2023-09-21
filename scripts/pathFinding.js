const gridPathfinding = document.getElementById("gridPathfinding");

function makeGrid(height, width) {
    gridPathfinding.style.setProperty("--grid-heigth", height);
    gridPathfinding.style.setProperty("--grid-width", width);

    for (y = 0; y < height; y++) {
        for (x = 0; x < width; x++) {
            let CSScell = document.createElement("cell");
            CSScell.id = "x" + x.toString() + "y" + y.toString();
            CSScell.style.border = "1px solid rgb(75, 75, 75)";
            CSScell.style.backgroundColor = View.cellStyle.normalCell.color;

            gridPathfinding.appendChild(CSScell).className = "grid-item";
        }
    }
}

function toGridCoords(x, y) {
    return "x" + Math.round(x).toString() + "y" + Math.round(y).toString();
}

function toScreenCoords() {
    x = (View.width / window.innerWidth) * (event.pageX - window.innerWidth / (2 * View.width));
    y = (View.height / window.innerHeight) * (event.pageY - window.innerHeight / (2 * View.height));
    x = Math.round(x);
    y = Math.round(y);
    return x, y;
}

function setStartPos(x, y, grid) {
    CSScell = document.getElementById(toGridCoords(x, y));
    CSScell.style.backgroundColor = View.cellStyle.startCell.color;
    grid.getCellAt(x, y).start = true;
}

function setGoalPos(x, y) {
    CSScell = document.getElementById(toGridCoords(x, y));
    CSScell.style.backgroundColor = View.cellStyle.goalCell.color;
    grid.getCellAt(x, y).goal = true;
}

function clearGrid(grid, clearWalls) {
    grid.cells.forEach((cellRow) => {
        cellRow.forEach((cell) => {
            CSScell = document.getElementById(toGridCoords(cell.x, cell.y));

            if (clearWalls) {
                if (cell.obstructed) {
                    CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
                } else if (cell.start) {
                    CSScell.style.backgroundColor = View.cellStyle.startCell.color;
                } else if (cell.goal) {
                    CSScell.style.backgroundColor = View.cellStyle.goalCell.color;
                } else {
                    CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
                }
                cell.obstructed = false;
            } else {
                if (cell.obstructed) {
                    CSScell.style.backgroundColor = View.cellStyle.obstructedCell.color;
                } else if (cell.start) {
                    CSScell.style.backgroundColor = View.cellStyle.startCell.color;
                } else if (cell.goal) {
                    CSScell.style.backgroundColor = View.cellStyle.goalCell.color;
                } else {
                    CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
                }
            }
        });
    });
}

function listenForInteractivity(grid) {
    //prevent grid elements from being draggable, which can cause problems when placing walls
    placeWall = false;
    removeWall = false;
    grid.cells.forEach((cellRow) => {
        cellRow.forEach((cell) => {
            CSScell = document.getElementById(toGridCoords(cell.x, cell.y));

            CSScell.addEventListener("dragstart", (e) => {
                e.preventDefault();
            });

            CSScell.addEventListener("drop", (e) => {
                e.preventDefault();
            });

            CSScell.addEventListener("pointerdown", pointerdownFunc);
            function pointerdownFunc() {
                placeWall = false;
                removeWall = false;
                if (!cell.obstructed) {
                    placeWall = true;
                    placeWalls(cell.x, cell.y, grid);
                } else {
                    removeWall = true;
                    removeWalls(cell.x, cell.y, grid);
                }
            }

            CSScell.addEventListener("pointermove", pointerMoveFunc);
            function pointerMoveFunc() {
                if (placeWall == true) {
                    placeWalls(cell.x, cell.y, grid);
                }
                if (removeWall == true) {
                    removeWalls(cell.x, cell.y, grid);
                }
            }

            CSScell.addEventListener("pointerup", pointerUpFunc);
            function pointerUpFunc() {
                placeWall = false;
                removeWall = false;
            }
        });
    });

    function placeWalls(x, y, grid) {
        CSScell = document.getElementById(toGridCoords(x, y));
        if (!grid.getCellAt(x, y).obstructed && !grid.getCellAt(x, y).start && !grid.getCellAt(x, y).goal) {
            CSScell.style.backgroundColor = View.cellStyle.obstructedCell.color;
            grid.getCellAt(x, y).obstructed = true;
        }
    }

    function removeWalls(x, y, grid) {
        CSScell = document.getElementById(toGridCoords(x, y));

        if (grid.getCellAt(x, y).obstructed && !grid.getCellAt(x, y).start && !grid.getCellAt(x, y).goal) {
            CSScell.style.backgroundColor = View.cellStyle.normalCell.color;
            grid.getCellAt(x, y).obstructed = false;
        }
    }
}

function getWidth(height) {
    //since we define grid items as squares in our css, we need to get the number of columns by calculating from the number of rows
    return (Math.round((window.innerWidth / window.innerHeight) * 10) / 10) * height;
}

var View = {
    height: 40, //number of rows

    width: getWidth(40),

    cellStyle: {
        startCell: {
            color: "chartreuse",
        },

        goalCell: {
            color: "red",
        },

        normalCell: {
            color: "#262626",
        },

        obstructedCell: {
            color: "black",
        },

        border: {
            color: "rgb(75, 75, 75)",
        },

        inOpenSet: {
            color: "rgba(28, 112, 0, 0.548)",
        },

        inClosedSet: {
            color: "grey",
        },

        inPath: {
            color: "yellow",
        },
    },
};

function launchAlgorithm(alg, diagonal, itTime) {
    //clear previous path
    if (typeof hasBeenLaunched !== "undefined") {
        if (path != 1) {
            clearGrid(grid, false);
        }
    }

    if (alg == "AStar") {
        returnValues = AStarAlgorithmOneIteration(startX, startY, goalX, goalY, grid, "firstTime", diagonal);
        state = returnValues[0];
        data = returnValues[1];
        isFinished = 0;
        clockLaunched = false;

        if (itTime == 0) {
            while (!isFinished == 1) {
                isFinished = runOneIterationAStar();
            }
        } else {
            clockLaunched = true;
            clockAStar = setInterval(runOneIterationAStar, itTime - 9);
        }

        function runOneIterationAStar() {
            if (state == 1) {
                //fail
                if (clockLaunched) {
                    clearInterval(clockAStar);
                }
                return 1;
            } else if (state == 0) {
                //success
                hasBeenLaunched = true;
                path = data;
                //show path
                path.forEach((cell) => {
                    CSScell = document.getElementById(toGridCoords(cell.x, cell.y));
                    CSScell.style.backgroundColor = View.cellStyle.inPath.color;
                });

                if (clockLaunched) {
                    clearInterval(clockAStar);
                }

                return 1;
            } else if (state == 2) {
                //continue
                openSet = data;

                openSet.nodes.forEach((cell) => {
                    if (!(cell.goal || cell.start)) {
                        CSScell = document.getElementById(toGridCoords(cell.x, cell.y));
                        CSScell.style.backgroundColor = View.cellStyle.inOpenSet.color;
                    }
                });

                exploredCell = openSet.nodes[0];
                if (!(exploredCell.goal || exploredCell.start)) {
                    CSScell = document.getElementById(toGridCoords(exploredCell.x, exploredCell.y));
                    CSScell.style.backgroundColor = View.cellStyle.inClosedSet.color;
                }

                returnValues = AStarAlgorithmOneIteration(startX, startY, goalX, goalY, grid, openSet, diagonal);
                state = returnValues[0];
                data = returnValues[1];
            }
        }
    }
}

function dragElement(elmnt) {
    var pos1 = 0;
    var pos2 = 0;
    var pos3 = 0;
    var pos4 = 0;

    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the pointer cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onpointerup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onpointermove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        // set the element's new position:

        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onpointerup = null;
        document.onpointermove = null;
    }
}

//create visual grid (css)
makeGrid(View.height, View.width);

//create js grid (a matrix)
grid = new Grid(View.height, View.width);

startX = Math.round(View.width / 6);
startY = Math.round(View.height / 2);
goalX = Math.round(View.width / 1.2);
goalY = Math.round(View.height / 2);

setStartPos(startX, startY, grid);
setGoalPos(goalX, goalY, grid);

//listen for grid interactivity
listenForInteractivity(grid);

//slider:
slider = document.getElementById("iteration");
sliderOutput = document.getElementById("iterationOutput");
itTime = 20;
slider.oninput = function () {
    if (this.value == 0) {
        sliderOutput.innerHTML = "instant";
    } else {
        sliderOutput.innerHTML = this.value + " ms";
    }
    itTime = this.value;
};

//Controller
document.getElementById("startSearch").addEventListener("click", function () {
    diagonal = document.getElementById("diagonal").checked;
    launchAlgorithm("AStar", diagonal, itTime); //Launch AStar
});

document.getElementById("clearWalls").addEventListener("click", function () {
    clearGrid(grid, true); //Clear grid completely
});

//draggability of controller
dragElement(document.getElementById("controller"));
