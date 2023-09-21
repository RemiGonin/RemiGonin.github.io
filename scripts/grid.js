function Grid(height, width) {
    this.width = width; // number of columns of the grid
    this.height = height; //number of rows of the grid
    this.cells = this.buildCells(this.height, this.width);
}

Grid.prototype.buildCells = function (height, width) {
    var i, j;

    const cells = [];
    // cells are built like this
    //   ------> x
    //  |   [. [.  [.   ect...
    //  |   .   .   .
    //  |   .   .   .
    //  |   .]  .]  .]
    //  y
    for (i = 0; i < width; ++i) {
        cells[i] = [];
        for (j = 0; j < height; ++j) {
            cells[i][j] = new Cell(i, j, false);
        }
    }

    return cells;
};

Grid.prototype.getCellAt = function (x, y) {
    return this.cells[x][y];
};

Grid.prototype.getObstructionAt = function (x, y) {
    return this.cells[x][y].obstructed;
};

Grid.prototype.isInsideGridAt = function (x, y) {
    if (x < this.width && x >= 0 && y < this.height && y >= 0) {
        return true;
    } else {
        return false;
    }
};

Grid.prototype.isWalkableAt = function (x, y) {
    if (this.isInsideGridAt(x, y) == true) {
        if (this.getObstructionAt(x, y) == false) {
            return true;
        }
    }
    return false;
};

Grid.prototype.getNeighbors = function (cell, diagonal) {
    nb = [];
    x = cell.x;
    y = cell.y;

    if (this.isWalkableAt(x + 1, y)) {
        nb.push(this.getCellAt(x + 1, y));
    }

    if (this.isWalkableAt(x, y + 1)) {
        nb.push(this.getCellAt(x, y + 1));
    }

    if (this.isWalkableAt(x - 1, y)) {
        nb.push(this.getCellAt(x - 1, y));
    }

    if (this.isWalkableAt(x, y - 1)) {
        nb.push(this.getCellAt(x, y - 1));
    }

    if (diagonal) {
        if (this.isWalkableAt(x + 1, y + 1)) {
            nb.push(this.getCellAt(x + 1, y + 1));
        }

        if (this.isWalkableAt(x - 1, y + 1)) {
            nb.push(this.getCellAt(x - 1, y + 1));
        }

        if (this.isWalkableAt(x - 1, y - 1)) {
            nb.push(this.getCellAt(x - 1, y - 1));
        }

        if (this.isWalkableAt(x + 1, y - 1)) {
            nb.push(this.getCellAt(x + 1, y - 1));
        }
    }
    return nb;
};
