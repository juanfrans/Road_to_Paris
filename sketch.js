//Global variables
var margin = 10;
var canvasWidth = 1280;
var canvasHeight = 720;
var img;
var positionX;
var positionY;
var ellipseSize = 2;
var startX = 20;
var date = 50;
var mapWidth, mapHeight, titleStartX, titleStartY;
var direction, characters, characters2;

//Preload images and data
function preload(){
	//img = loadImage("data/World_Projected_Black.png");
	img = loadImage("data/World_Projected_Light.png")
	//img = loadImage("data/World_Projected_White.png")
	events = loadTable('data/ENSO_Data_01.csv');
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	colorMode(HSB, 360, 100, 100, 100);
	background(100);
	mapWidth = canvasWidth-margin*2;
	mapHeight = mapWidth/img.width*img.height;
	titleStartY = mapHeight-150;
	titleStartX = margin+10;
	//var projectedCoord = [];
	//var newProjectedCoord = [];
	//console.log("done converting stuff");
}

function draw(){
	background(100);

	//Temp Border
	noFill();
	stroke(0);
	strokeWeight(.25);
	rect(margin, margin, mapWidth, mapHeight);



	//Load map image
	image(img, margin, margin, mapWidth, mapHeight);

	//Loop through the data points and plot the events
	for (var i = events.getRowCount() - 1; i >= 1; i--) {
		if(date == events.getColumn(5)[i] || date == events.getColumn(6)[i] || date == events.getColumn(7)[i] || date == events.getColumn(8)[i]){
			positionX = map(events.getColumn(3)[i], 0, 1280, 0, mapWidth);
			//console.log(i+" "+margin+" "+img.width+" "+mapWidth+" "+positionX+" "+events.getColumn(3)[i]);
			positionY = map(events.getColumn(4)[i], 0, 657, 0, mapHeight);
			direction = events.getColumn(8)[i];
			characters = events.getColumn(0)[i].length;
			characters2 = events.getColumn(1)[i].length;
			//console.log(direction);
			noStroke();
			fill(100, 60);
			rect(margin+positionX*1+5*direction, margin+positionY*1-34, characters*5.3*direction, characters2/characters*10.5);
			rect(margin+positionX*1+5*direction, margin+positionY*1-45, characters*5.3*direction, 9);
			fill(35, 100, 100);
			ellipse(margin+positionX, margin+positionY, 8, 8);
			stroke(35,100,100);
			strokeWeight(.75);
			line(margin+positionX*1, margin+positionY*1-5, margin+positionX*1, margin+positionY*1-35);
			line(margin+positionX*1, margin+positionY*1-35, margin+positionX*1+characters*direction*5.35, margin+positionY*1-35);
			noStroke();
			fill(0);
			textSize(8);
			if(direction>0){
				textAlign(LEFT);
			}
			else{
				textAlign(RIGHT);
			}
			text(events.getColumn(0)[i], margin+positionX*1+7*direction, margin+positionY*1-38);
			textLeading(10);
			text(events.getColumn(1)[i], margin+positionX*1+7*direction, margin+positionY*1-35, characters*5.25, 100);
		}else{}
	}

	//Title
	textSize(18);
	fill(0);
	noStroke();
	text("EL NIÑO - A GLOBAL PHENOMENON", titleStartX, titleStartY);
	stroke(0);
	strokeWeight(.5);
	line(titleStartX, titleStartY+5, titleStartX+320, titleStartY+5);
	noStroke();
	textSize(12);
	textLeading(14);
	text("Here goes a more detailed explanation of what the map is showing. It will give a brief history of the phenomenon and will provide instructions as to how to use the map, credits, etc, etc...", titleStartX, titleStartY+5, 300, 400);

	//Toggle Icons
	stroke(80);
	strokeWeight(.25);
	for(var i=0; i<5; i++){
		fill(160, 21, 80, 35+i*10);
		rect(titleStartX+i*(320/5), titleStartY+75, 320/5, 20);
	}
	noStroke();
	fill(0);
	textSize(8);
	textAlign(CENTER);
	text("All Events", titleStartX+320/10, titleStartY+87);
	text("Pre 1970", titleStartX+320/10*3, titleStartY+87);
	text("1970-1990", titleStartX+320/10*5, titleStartY+87);
	text("1990-2000", titleStartX+320/10*7, titleStartY+87);
	text("2000-Present", titleStartX+320/10*9, titleStartY+87);
	stroke(80);
	strokeWeight(.25);
	for (var i = 0; i < 6; i++) {
		fill(160, 21, 80, 35+i*5);
		rect(titleStartX+i*(320/6), titleStartY+100, 320/6, 20);
	};
	noStroke();
	fill(0);
	textSize(8);
	textAlign(CENTER);
	text("Temperature", titleStartX+320/12, titleStartY+112);
	text("Precipitation", titleStartX+320/12*3, titleStartY+112);
	text("Plants", titleStartX+320/12*5, titleStartY+112);
	text("Ocean", titleStartX+320/12*7, titleStartY+112);
	text("Animals", titleStartX+320/12*9, titleStartY+112);
	text("Economy", titleStartX+320/12*11, titleStartY+112);

}

function mousePressed(){
	if (mouseX > titleStartX && mouseX < titleStartX+320/5 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 50;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5 && mouseX < titleStartX+320/5*2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 1900;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*2 && mouseX < titleStartX+320/5*3 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 70;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*3 && mouseX < titleStartX+320/5*4 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 90;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*4 && mouseX < titleStartX+320/5*5 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 20;
		console.log(date);
	}
	if (mouseX > titleStartX && mouseX < titleStartX+320/5 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 50;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5 && mouseX < titleStartX+320/5*2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 1900;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*2 && mouseX < titleStartX+320/5*3 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 70;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*3 && mouseX < titleStartX+320/5*4 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 90;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*4 && mouseX < titleStartX+320/5*5 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 20;
		console.log(date);
	}
}