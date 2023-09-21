// Cell in the grid. Contains coordinates, and walkbality

function Cell(x, y, obstructed) {
    this.x = x; //int
    this.y = y; //int
    this.obstructed = obstructed; //bool : false if cell is accessible
    this.start = false;
    this.goal = false;
}
