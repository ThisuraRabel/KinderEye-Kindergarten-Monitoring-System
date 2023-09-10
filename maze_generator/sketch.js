var cols, rows;
var w = 50;
var grid = []; 
var counterX = 0;
var traceBackCounter = 0;
var current;
var traceLogic = false;
var stack = [];
var pathBlockCount = 0; 
var fblockx;
var fblocky;

function setup() {   // ----> one time
  createCanvas(400, 400);
  cols = floor(width / w);
  rows = floor(height / w);
   frameRate(10);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  console.log("setup")
  current = grid[0];

}



//#########################################################################################
function draw() {  // ----> looping always
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
    
    
  }
  current.visited = true;
  var inx = current.highlight();
  //Step 01
  var next = current.checkNeighbors();

  if (next) {
    next.visited = true;
    //Step 02
    stack.push(current);

    if (traceLogic == true){
      console.log(next);;
    }
//########################################---------------
      let expression = "";
      for (let i = 0; i < grid.length; i++) {
        expression += "grid[" + i + "].visited";
        if (i < grid.length - 1) {
          expression += " && ";
        }
      }
      if (expression){
        console.log("OK");
        traceBackCounter++

        if (traceBackCounter == 63){
          traceLogic = true;
        }

      }
//###########################################-------------
    //Step 03
    removeWalls(current, next, inx)

    //Step 04
    current = next;
  } else if (stack.length > 0) {
       current = stack.pop();
  } else {

    if (counterX < 1){    
      for (var z = 1; z < grid.length; z++) {

        setTimeout(() => {       
        }, 200);
          db.collection("current_maze1").doc(z.toString()).set({
            Top: grid[z].walls[2],
            Left: grid[z].walls[3],
            Bottom: grid[z].walls[0],
            Right: grid[z].walls[1]
          })
          .then(() => {
            console.log("Document written successfully");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
          
        
        

      }
 
    }
    counterX++; 
  }

}

//#########################################################################################





function index(i, j){
  if (i < 0 || j < 0 || i > cols-1 || j > rows-1){
    return -1;
  }
    return i + j * cols;
}

function Cell(i,j) {

    this.i = i;
    this.j = j;
                  //0B   1R    2T     3L
    this.walls = [true, true, true, true]; // For define logical cell walls
    this.visited = false; // For define all cells as not visited
   
    this.highlight = function (){
      var x = this.i*w;
      var y = this.j*w;
      stroke(255);
      if (traceLogic == true){ //--------------------- CORRECT PATH  -----------------------
        fill(0,0,255,255);
        
        if (i != 0 && j != 0){
          console.log("i:", i, "j:", j);
          pathBlockCount++;

          db.collection("correct_maze_path").doc(pathBlockCount.toString()).set({
            Row: i,
            Column: j
          })
          .then(() => {
            console.log("Document written successfully");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });



        }
        
        if (pathBlockCount == 1){
          fblockx=i;
          fblocky=j;
        }
      }

      if (traceLogic == true){
        rect((fblockx*50)+10,(fblocky*50)+10,w-20,w-20);
        rect(x+10,y+10,w-20,w-20);
      } else {
        rect(x+10,y+10,w-20,w-20);
      }
      
      return i + j * cols;

    }

 // Board logical Cells Marking 
    this.show = function(){
      var x = this.i*w;
      var y = this.j*w;
      
        stroke(255);
      
        if (this.walls[0]){  // bottom
          line(x,y,x+w,y);
        }
        if (this.walls[1]){  //left
          line(x+w,y,x+w,y+w);
        }
        if (this.walls[2]){   //top
          line(x+w,y+w,x,y+w);
        }
        if (this.walls[3]){  //right
          line(x,y+w,x,y);
        } 
        
        if (this.visited){
          noStroke();
          fill(0,25,255,25);
          rect(x,y,w,w);
        }
    }

    // Visiting neighbors
    this.checkNeighbors = function() {
        var neighbors = [];
        var top = grid[index(i, j - 1)];
        var right = grid[index(i + 1, j)];
        var bottom = grid[index(i, j + 1)];
        var left = grid[index(i - 1, j)];

        if (top && !top.visited){
          neighbors.push(top);
        }
        if (right && !right.visited){
          neighbors.push(right);
        }
        if (bottom && !bottom.visited){
          neighbors.push(bottom);
        }
        if (left && !left.visited){
          neighbors.push(left);
        }

        if (neighbors.length > 0){
          var r = floor(random(0, neighbors.length));
          return neighbors[r];
        } else{
          return undefined;
        }
    }

}

function removeWalls(a, b, x) {
  var x = a.i - b.i;
  if (x == 1){
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x == -1){
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if (y == 1){
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y == -1){
    a.walls[2] = false;
    b.walls[0] = false;
  }

}


  // console.log("New Block, Value:", x);
      // console.log("Bottom:", a.walls[0]);
      // console.log("Left:", a.walls[1]);
      // console.log("Top:", a.walls[2]);
      // console.log("Right:", a.walls[3]);
      // console.log("==========");
      

        // console.log("i:", grid[z].i);
        // console.log("j:", grid[z].j);

        // for (var k = 0; k < 4; k++) {
        //   console.log("walls:", k, grid[z].walls[k]);
        // }
      
// 0 - bottom
// 1 - left
// 2 - top
// 3 - right