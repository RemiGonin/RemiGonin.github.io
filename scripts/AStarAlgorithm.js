//A* implementation
//we use a priority queue to have O(1) time complexity for each loop (else we would have to sort at nlogn time complexity for each loop) from heap.js script
function AStarAlgorithm(startX, startY, goalX, goalY, grid, diagonal) {
    for (y = 0; y < grid.height; y++) {
        for (x = 0; x < grid.width; x++) {
            grid.getCellAt(x, y).g = Infinity;
        }
    }

    startNode = grid.getCellAt(startX, startY);

    startNode.g = 0;
    goalNode = grid.getCellAt(goalX, goalY);

    startNode.f = euclidianDistance(startNode, goalNode) + 0; //g for the first node is set at 0

    cameFrom = [];

    //priority is f, lowest f at the top of the queue :
    const customPriorityComparator = (node1, node2) => {
        if (node1.f > node2.f) {
            return 1;
        } else if (node1.f <= node2.f) {
            return -1;
        }
    };

    var openSet = new Heap(customPriorityComparator);
    openSet.push(startNode);

    // var bestGScore =
    while (!openSet.empty()) {
        currentNode = openSet.pop();

        if (currentNode == goalNode) {
            return [0, reconstructPath(goalNode, startNode)];
        }

        nb = grid.getNeighbors(currentNode, diagonal);
        for (i = 0, l = nb.length; i < l; ++i) {
            neighbor = nb[i];

            if (currentNode.g + 1 < neighbor.g) {
                neighbor.g = currentNode.g + 1;
                neighbor.f = currentNode.g + 1 + euclidianDistance(neighbor, goalNode);
                neighbor.cameFrom = currentNode;

                if (!openSet.contains(neighbor, 0)) {
                    openSet.push(neighbor);
                }
            }
        }
    }

    if (openSet.empty()) {
        return [1, 1];
    } else {
        return [2, openSet];
    }
}

function AStarAlgorithmOneIteration(startX, startY, goalX, goalY, grid, openSet, diagonal) {
    //if first call to function
    if (openSet == "firstTime") {
        for (y = 0; y < grid.height; y++) {
            for (x = 0; x < grid.width; x++) {
                grid.getCellAt(x, y).g = Infinity;
            }
        }

        startNode = grid.getCellAt(startX, startY);

        startNode.g = 0;
        goalNode = grid.getCellAt(goalX, goalY);

        startNode.f = euclidianDistance(startNode, goalNode) + 0; //g for the first node is set at 0

        cameFrom = [];

        //priority is f, lowest f at the top of the queue :
        const customPriorityComparator = (node1, node2) => {
            if (node1.f > node2.f) {
                return 1;
            } else if (node1.f <= node2.f) {
                return -1;
            }
        };

        var openSet = new Heap(customPriorityComparator);
        openSet.push(startNode);
    }

    currentNode = openSet.pop();

    if (currentNode == goalNode) {
        return [0, reconstructPath(goalNode, startNode)];
    }

    nb = grid.getNeighbors(currentNode, diagonal);
    for (i = 0, l = nb.length; i < l; ++i) {
        neighbor = nb[i];

        if (currentNode.g + 1 < neighbor.g) {
            neighbor.g = currentNode.g + 1;
            neighbor.f = currentNode.g + 1 + euclidianDistance(neighbor, goalNode);
            neighbor.cameFrom = currentNode;

            if (!openSet.contains(neighbor, 0)) {
                openSet.push(neighbor);
            }
        }
    }

    if (openSet.empty()) {
        return [1, 1];
    } else {
        return [2, openSet];
    }
}

function reconstructPath(goalNode, startNode) {
    path = [];
    currentNode = goalNode.cameFrom;

    while (!(currentNode === startNode)) {
        //we follow the path from goal-1 to start+1 by following previous nodes each time
        path.push(currentNode);
        currentNode = currentNode.cameFrom;
    }

    return path;
}

//function to calculate euclidian distance between two nodes, corresponds to h in A*
function euclidianDistance(cellA, cellB) {
    // return Math.abs(cellA.x - cellB.x) + Math.abs(cellA.y - cellB.y);
    return Math.sqrt(Math.pow(cellA.x - cellB.x, 2) + Math.pow(cellA.y - cellB.y, 2));
}
