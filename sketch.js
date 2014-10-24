//Global variables
var margin = 10;
var img;
var positionX;
var positionY;
var ellipseSize = 2;
var startX = 20;
var dateColumn = 5;
var mapWidth, mapHeight, titleStartX, titleStartY;
var direction, directionV, characters, characters2;
var vOffset = 22;
var screenRatio = 1;
var imgPrecipitation, imgTemperature, imgOcean, imgAnimal, imgSociety, imgPlant;
var iconPosition = 0;

//Preload images and data
function preload(){
	//img = loadImage("data/World_Projected_Black.png");
	img = loadImage("data/World_Projected_WGS1984-02.png");
	imgPrecipitation = loadImage("data/icon_precipitation/icon_precipitation.svg");
	imgTemperature = loadImage("data/icon_temperature/icon_temperature.svg");
	imgPlant = loadImage("data/icon_plant/icon_plant.svg");
	imgSociety = loadImage("data/icon_society/icon_society.svg");
	imgAnimal = loadImage("data/icon_bear/icon_bear.svg");
	imgOcean = loadImage("data/icon_shark/icon_shark.svg");
	//img = loadImage("data/World_Projected_White.png")
	events = loadTable('data/ENSO_Infographic_Data_Clean.csv');
}

function setup() {
	var canvasWidth = 1280;
	var canvasHeight = 720;
	//createCanvas(canvasWidth, canvasHeight);
	if (windowWidth < 1280 && windowWidth > 1024){
		//canvasWidth = 1024;
		screenRatio = 0.8;
	}
	else if(windowWidth < 1024 && windowWidth > 800){
		//canvasWidth = 800;
		screenRatio = .7;
	}
	else if(windowWidth < 800){
		//canvasWidth = 640;
		screenRatio = .5;
	}
	else{
		//canvasWidth = 1280;
		screenRatio = 1;
	}
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
	background(100);
	mapWidth = windowWidth-margin*2;
	mapHeight = mapWidth/img.width*img.height;
	titleStartY = mapHeight-150;
	titleStartX = margin+10;
}

function draw(){
	if (windowWidth < 1280 && windowWidth > 1024){
		//canvasWidth = 1024;
		screenRatio = 0.8;
	}
	else if(windowWidth < 1024 && windowWidth > 800){
		//canvasWidth = 800;
		screenRatio = .7;
	}
	else if(windowWidth < 800){
		//canvasWidth = 640;
		screenRatio = .5;
	}
	else{
		//canvasWidth = 1280;
		screenRatio = 1;
	}
	background(100);
	mapWidth = windowWidth-margin*2;
	mapHeight = mapWidth/img.width*img.height;
	titleStartY = mapHeight-150;
	titleStartX = margin+10;
	//screenRatio = 

	//Temp Border
	noFill();
	stroke(0);
	strokeWeight(.25);
	rect(margin, margin, mapWidth, mapHeight);

	//Load map image
	image(img, margin, margin, mapWidth, mapHeight);

	//Loop through the data points and plot the events
	for (var i = events.getRowCount() - 1; i >= 1; i--) {
		iconPosition = 0;
		if(events.getColumn(dateColumn)[i] > 0){
			positionX = map(events.getColumn(3)[i], -180, 180, mapWidth*.5, mapWidth*1.5);
			if(positionX>mapWidth){
				positionX = positionX - mapWidth;
			}
			//console.log(i+" "+margin+" "+img.width+" "+mapWidth+" "+positionX+" "+events.getColumn(3)[i]);
			positionY = map(events.getColumn(2)[i], 90, -90, 0, mapHeight);
			direction = events.getColumn(16)[i];
			directionV = events.getColumn(17)[i];
			characters = events.getColumn(0)[i].length;
			characters2 = events.getColumn(1)[i].length;


			//console.log(direction);
			noStroke();
			fill(100, 60);
			//Explanation box
			if (screenRatio > 0.8){
				//rect(margin+positionX*1+5*direction, margin+positionY*1-34*screenRatio-vOffset*directionV*screenRatio, characters*5.5*direction*screenRatio, characters2/characters*10.5*screenRatio);
			}
			//Title box
			rect(margin+positionX*1+5*direction*screenRatio, margin+positionY*1-45*screenRatio-vOffset*directionV*screenRatio, characters*5.5*direction*screenRatio, 9*screenRatio);
			//Marker
			fill(35, 100, 100);
			ellipseMode(CENTER);
			ellipse(margin+positionX, margin+positionY, 8*screenRatio, 8*screenRatio);
			//Marker lines
			stroke(35,100,100);
			strokeWeight(.75);
			//Vertical Line
			line(margin+positionX*1, margin+positionY*1-5*screenRatio, margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);
			//Horizontal Line
			line(margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, margin+positionX*1+characters*direction*5.7*screenRatio, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);

			noStroke();
			fill(0);
			textSize(8*screenRatio);
			if(direction>0){
				textAlign(LEFT);
			}
			else{
				textAlign(RIGHT);
			}
			text(events.getColumn(0)[i], margin+positionX*1+7*direction, margin+positionY*1-38*screenRatio-vOffset*directionV*screenRatio);
			//Explanation text
			if (screenRatio > 0.8){
			textLeading(10);
			//text(events.getColumn(1)[i], margin+positionX*1+7*direction*screenRatio, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, characters*5.25, 100);
			}
			
			//Add Icon
			ellipseMode(CORNER);
			noStroke();
			fill(35, 100, 100, 65);
			if(events.getColumn(10)[i] > 0){
			ellipse(margin+positionX*1+7*direction+10*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			image(imgTemperature, margin+positionX*1+9*direction+10*iconPosition, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
			iconPosition = iconPosition + 1;
			}
			if(events.getColumn(11)[i] > 0){
			ellipse(margin+positionX*1+7*direction+25*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			image(imgPrecipitation, margin+positionX*1+7*direction+25*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			iconPosition = iconPosition + 1;
			}
			if(events.getColumn(12)[i] > 0){
			ellipse(margin+positionX*1+7*direction+10*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			image(imgPlant, margin+positionX*1+9*direction+10*iconPosition, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
			iconPosition = iconPosition + 1;
			}
			if(events.getColumn(14)[i] > 0){
			ellipse(margin+positionX*1+7*direction+10*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			image(imgAnimal, margin+positionX*1+9*direction+10*iconPosition, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
			iconPosition = iconPosition + 1;
			}
			if(events.getColumn(13)[i] > 0){
			ellipse(margin+positionX*1+7*direction+25*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			image(imgOcean, margin+positionX*1+7*direction+25*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			iconPosition = iconPosition + 1;
			}
			if(events.getColumn(15)[i] > 0){
			ellipse(margin+positionX*1+7*direction+25*iconPosition, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
			image(imgSociety, margin+positionX*1+9*direction+25*iconPosition, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
			iconPosition = iconPosition + 1;
			}

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
	//stroke(80);
	strokeWeight(.25);
	for(var i=0; i<5; i++){
		fill(160, 21, 80, 75);
		rect(titleStartX+i*(320/5), titleStartY+75, 320/5-2, 20, 50);
	}
	//noStroke();
	fill(0);
	textSize(8);
	textAlign(CENTER);
	text("All Events", titleStartX+320/10-1, titleStartY+87);
	text("Pre 1970", titleStartX+320/10*3-1, titleStartY+87);
	text("1970-1990", titleStartX+320/10*5-1, titleStartY+87);
	text("1990-2000", titleStartX+320/10*7-1, titleStartY+87);
	text("2000-Present", titleStartX+320/10*9-1, titleStartY+87);
	//stroke(80);
	strokeWeight(.25);
	for (var i = 0; i < 6; i++) {
		fill(160, 21, 80, 75);
		rect(titleStartX+i*(320/6), titleStartY+100, 320/6-2, 20);
	};
	//noStroke();
	fill(0);
	textSize(8);
	textAlign(CENTER);
	text("Temperature", titleStartX+320/12-1, titleStartY+112);
	text("Precipitation", titleStartX+320/12*3-1, titleStartY+112);
	text("Plants", titleStartX+320/12*5-1, titleStartY+112);
	text("Ocean", titleStartX+320/12*7-1, titleStartY+112);
	text("Animals", titleStartX+320/12*9-1, titleStartY+112);
	text("Economy", titleStartX+320/12*11-1, titleStartY+112);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function mousePressed(){
	if (mouseX > titleStartX && mouseX < titleStartX+320/5-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		dateColumn = 5;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5 && mouseX < titleStartX+320/5*2-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		dateColumn = 6;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*2 && mouseX < titleStartX+320/5*3-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		dateColumn = 7;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*3 && mouseX < titleStartX+320/5*4-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		dateColumn = 8;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*4 && mouseX < titleStartX+320/5*5-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		dateColumn = 9;
		console.log(date);
	}
	if (mouseX > titleStartX && mouseX < titleStartX+320/5-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 50;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5 && mouseX < titleStartX+320/5*2-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 1900;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*2 && mouseX < titleStartX+320/5*3-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 70;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*3 && mouseX < titleStartX+320/5*4-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 90;
		console.log(date);
	}
	if (mouseX > titleStartX+320/5*4 && mouseX < titleStartX+320/5*5-2 && mouseY > titleStartY+75 && mouseY < titleStartY+95){
		date = 20;
		console.log(date);
	}
	if (mouseX > 500){
		console.log("Pressed");
		window.location.href = 'www.juanfrans.com';
	}
}