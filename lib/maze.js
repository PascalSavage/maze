"use strict";
/**
 * Maze Generation Algorithms Overview - http://weblog.jamisbuck.org/2011/2/7/maze-generation-algorithm-recap
 */

/** 
 * Maze client constructor 
 *
 * @params {Object} options
 */
function Maze( options ) {
    if (!(this instanceof Maze)) 
        return new Maze(options);

    // Default Maze Options
    this.defaults = {
        wall: true,
        path: false,
        algorithm: '', // recursive backtracker, eller's algo, kruskal's algo, prim's algo, recursive division, aldous-broder, wilson's algo, hunt-and-kill, growing tree algo, binary tree algo, sidewinder algo
    };

    //this.options = utils.merge(this.defaults, options);
}

/**
 * Generate Maze with x, y dimensions
 *
 * @param  x  int
 * @param  y  int
 */
Maze.prototype.generate = function( x, y ) {

    var n = x * y - 1;

    if (n < 0) { 
    	console.error("Incorrect maze dimensions."); 
    	return;
    }

    var horiz=[]; for (var j= 0; j<x+1; j++) horiz[j] = [];
    var verti=[]; for (var j= 0; j<y+1; j++) verti[j] = [];

    var here= [Math.floor(Math.random()*x), Math.floor(Math.random()*y)];
    var path= [here];
    var unvisited= [];

    for (var j = 0; j< x + 2; j++) {
        unvisited[j] = [];
        for (var k= 0; k<y+1; k++)
            unvisited[j].push(j>0 && j<x+1 && k>0 && (j != here[0]+1 || k != here[1]+1));
    }

    while (0 < n) {
        var potential= [[here[0]+1, here[1]], [here[0],here[1]+1],
            [here[0]-1, here[1]], [here[0],here[1]-1]];
        var neighbors= [];
        for (var j= 0; j < 4; j++)
            if (unvisited[potential[j][0]+1][potential[j][1]+1])
                neighbors.push(potential[j]);
        if (neighbors.length) {
            n= n-1;
            var next = neighbors[Math.floor(Math.random()*neighbors.length)];
            unvisited[next[0]+1][next[1]+1]= false;
            if (next[0] == here[0])
                horiz[next[0]][(next[1]+here[1]-1)/2]= true;
            else 
                verti[(next[0]+here[0]-1)/2][next[1]]= true;
            path.push(here= next);
        } else 
            here= path.pop();
    }
    return ({x: x, y: y, horiz: horiz, verti: verti});
};

Maze.prototype.prim = function( x, y ) {

};
module.exports = Maze;