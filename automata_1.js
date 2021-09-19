/*
This code should take in a number from 0-256, and when it receives a bang, output succeeding rows of the chosen rule

1. convert inputted number to binary
2. series of if statements (if 1 or 0) decide whether each succeeeding "square" is 1 or 0
3. output all 'squares'
*/

//int_to_binary takes an integer and converts it to binary- IT MUST BE RUN FIRST FOR PROGRAM TO WORK
//everytime compute_new_row runs it outputs a new row of the automata
//if you send a list to the js object, it becomes the new row

autowatch = 1;
inlets = 1;
outlets = 1;

var index = [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0];
var new_index = [];
var binary_list = [];
var a1 = 0;
var a2 = 0;
var a3 = 0;
var a_full;
//initializing variables and such

function list(){
  for (var i=0; i < arguments.length; i++){
    if (arguments[i] > 1 || arguments[i] < 0){
      post("Input list must only contain 1's and 0's\n")
      return;
       }
    if (typeof(arguments[i]) != 'number'){
      post("Input list must only contain 1's and 0's\n")
      return;
    }
  }
  //check to see if arguments are ints and if they are other than 1 or 0
  index = [];
  for (var i=0; i < arguments.length; i++){
    index.push(arguments[i]);
  }
  post(index + "\n");
}
//empties index and refills with input list


function int_to_binary(inputted_int){
  binary_list = [];
  while (inputted_int > 0){
    binary_list.push(inputted_int % 2);
    //add remainder of inputted_int to first position of binary_list
    inputted_int = Math.floor(inputted_int / 2);
    //divide inputted_int into 2 for next test
  }
  binary_list = binary_list.reverse();
  //reverse and show original list

  var addendum = 7 - binary_list.length;
  for (var i = 0; i <=addendum; i++){
    binary_list.unshift(0);
  }
  post(binary_list + "\n");
  //add remaining 0's onto original binary_list
}

function compute_new_row(){
  if (binary_list.length < 8){
    post("No chosen rule \n");
    return;
  }
  //checks that int_to_binary has been run
  for (var i=0; i < index.length; i++){
    if(index[i-1] == undefined){
      a1 = 0;
    } else {
      a1 = index[i-1];
    }

    a2 = index[i];

    if(index[i+1] == undefined){
      a3 = 0;
    } else {
      a3 = index[i+1];
    }

    a_full = a1.toString() + a2.toString() + a3.toString();

    //creates groups of 3 (i-1, i, i+1) so that tests determining the future state can be run

    switch(a_full){
      case "111":
        new_index[i] = binary_list[0];
        break;
      case "110":
        new_index[i] = binary_list[1];
        break;
      case "101":
        new_index[i] = binary_list[2];
        break;
      case "100":
        new_index[i] = binary_list[3];
        break;
      case "011":
        new_index[i] = binary_list[4];
        break;
      case "010":
        new_index[i] = binary_list[5];
        break;
      case "001":
        new_index[i] = binary_list[6];
        break;
      case "000":
        new_index[i] = binary_list[7];
        break;
        //runs test determining future and places it in new array
    }
  }
  for (var i=0; i<index.length; i++){
    index[i] = new_index[i]
  }
  //replaces current index with contents of new index

  post(index + "\n");
  outlet(0, index);
  //posts and outputs the new row
}
