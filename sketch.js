//Global variables
var margin = 10;
var img;
var positionX;
var positionY;
var ellipseSize = 2;
var startX = 20;
var dateColumn = 5;
var tagColumn = 5;
var mapWidth, mapHeight, titleStartX, titleStartY, titleWidth, legendWidth;
var direction, directionV, characters, characters2;
var vOffset = 22;
var screenRatio = 1;
var imgPrecipitation, imgTemperature, imgOcean, imgAnimal, imgSociety, imgPlant;
var iconPosition = 0;

//Preload images and data
function preload(){
	//img = loadImage("data/World_Projected_Black.png");
	img = loadImage("data/World_Projected_WGS1984_Short-02.png");
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
	textFont("Proxima Nova");
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
	//mapWidth = windowWidth-margin*2;
	//mapHeight = mapWidth/img.width*img.height;
	//titleStartY = mapHeight-170;
	//titleStartX = margin+10;
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
	titleStartY = mapHeight-70;
	titleStartX = margin+10;
	titleWidth = 380;
	legendWidth = 500;

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
			if(events.getColumn(tagColumn)[i] > 0){
				positionX = map(events.getColumn(3)[i], -180, 180, mapWidth*.5, mapWidth*1.5);
				if(positionX>mapWidth){
					positionX = positionX - mapWidth;
				}
				//console.log(i+" "+margin+" "+img.width+" "+mapWidth+" "+positionX+" "+events.getColumn(3)[i]);
				positionY = map(events.getColumn(2)[i], 90, -65, 0, mapHeight);
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
				rect(margin+positionX*1+5*direction*screenRatio, margin+positionY*1-45*screenRatio-vOffset*directionV*screenRatio, characters*5.2*direction*screenRatio, 9*screenRatio);
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
				line(margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, margin+positionX*1+characters*direction*5.4*screenRatio, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);

				noStroke();
				fill(0);
				textStyle(BOLD);
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
				if(direction > 0){
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
					image(imgAnimal, margin+positionX*1+10*direction+10*iconPosition, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13, 13);
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
				}
				if(direction < 0){
					if(events.getColumn(10)[i] > 0){
					ellipse(margin+positionX*1+25*direction+10*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					image(imgTemperature, margin+positionX*1+23*direction+10*iconPosition*(-1), margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(11)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					image(imgPrecipitation, margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(12)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					image(imgPlant, margin+positionX*1+22*direction+25*iconPosition*(-1), margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(14)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					image(imgAnimal, margin+positionX*1+22*direction+25*iconPosition*(-1), margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13, 13);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(15)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					image(imgOcean, margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(13)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1), margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20, 20);
					image(imgSociety, margin+positionX*1+22*direction+25*iconPosition*(-1), margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15, 15);
					iconPosition = iconPosition + 1;
					}
				}
			}else{}
		}else{}
	}

	//Highlight rectangle
	stroke(0);
	strokeWeight(.25);
	fill(35, 100, 100, 50);
	if(tagColumn == 5 && dateColumn == 5){
		rect(titleStartX+titleWidth, titleStartY+7, legendWidth/5-2, 20);
		//console.log(tagColumn);
	}
	if(dateColumn>5){
		rect(titleStartX+((5-dateColumn)*(-1))*(legendWidth/5)+titleWidth, titleStartY+7, legendWidth/5-2, 20);
	}
	if(tagColumn>5){
		rect(titleStartX+((10-tagColumn)*(-1))*(legendWidth/6)+titleWidth, titleStartY+30, legendWidth/6-2, 20);
	}
	noStroke();

	//Title
	textStyle(BOLD);
	//fill(35, 100, 100);
	fill(0);
	textSize(22);
	noStroke();
	text("EL NIÑO - A GLOBAL PHENOMENON", titleStartX, titleStartY);
	stroke(0);
	strokeWeight(.5);
	//line(titleStartX, titleStartY+5, titleStartX+450, titleStartY+5);
	textStyle(NORMAL);
	noStroke();
	textSize(12);
	textLeading(14);
	text("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin feugiat massa id blandit accumsan. Fusce id nulla luctus, imperdiet orci at, luctus libero. Praesent id felis ac lectus condimentum auctor. Cras ac odio et nisl ultrices mollis eu quis mauris. Mauris tempus semper nunc, nec eleifend magna. Morbi ac justo.", titleStartX, titleStartY+2, titleWidth, 400);

	//Toggle Icons
	//stroke(80);
	strokeWeight(.25);
	for(var i=0; i<5; i++){
		fill(35, 100, 100, 60);
		rect(titleStartX+i*(legendWidth/5)+titleWidth, titleStartY+7, legendWidth/5-2, 20);
	}
	//noStroke();
	fill(0);
	textSize(8);
	textStyle(BOLD);
	textAlign(CENTER);
	text("All Events", titleStartX+legendWidth/10-1+titleWidth, titleStartY+20);
	text("Pre 1970", titleStartX+legendWidth/10*3-1+titleWidth, titleStartY+20);
	text("1970-1990", titleStartX+legendWidth/10*5-1+titleWidth, titleStartY+20);
	text("1990-2000", titleStartX+legendWidth/10*7-1+titleWidth, titleStartY+20);
	text("2000-Present", titleStartX+legendWidth/10*9-1+titleWidth, titleStartY+20);
	strokeWeight(.25);
	for (var i = 0; i < 6; i++) {
		fill(35, 100, 100, 60);
		rect(titleStartX+i*(legendWidth/6)+titleWidth, titleStartY+30, legendWidth/6-2, 20);
	};
	fill(0);
	textSize(8);
	textAlign(CENTER);
	text("Temperature", titleStartX+legendWidth/12-1+titleWidth, titleStartY+42);
	text("Precipitation", titleStartX+legendWidth/12*3-1+titleWidth, titleStartY+42);
	text("Plants", titleStartX+legendWidth/12*5-1+titleWidth, titleStartY+42);
	text("Ocean", titleStartX+legendWidth/12*7-1+titleWidth, titleStartY+42);
	text("Animals", titleStartX+legendWidth/12*9-1+titleWidth, titleStartY+42);
	text("Society", titleStartX+legendWidth/12*11-1+titleWidth, titleStartY+42);
	image(imgTemperature, titleStartX+legendWidth/6*0+titleWidth+3, titleStartY+32, 15, 15);
	image(imgPrecipitation, titleStartX+legendWidth/6*1+titleWidth+1, titleStartY+32, 15, 15);
	image(imgPlant, titleStartX+legendWidth/6*2+titleWidth+5, titleStartY+32, 15, 15);
	image(imgOcean, titleStartX+legendWidth/6*3+titleWidth+3, titleStartY+28, 25, 25);
	image(imgAnimal, titleStartX+legendWidth/6*4+titleWidth+5, titleStartY+32, 15, 15);
	image(imgSociety, titleStartX+legendWidth/6*5+titleWidth+5, titleStartY+32, 15, 15);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

}

function mousePressed(){
		//rect(titleStartX+i*(legendWidth/5)+titleWidth, titleStartY+7, legendWidth/5-2, 20);

	//Date actions
	if (mouseX > titleStartX+0*(legendWidth/5)+titleWidth && mouseX < titleStartX+0*(legendWidth/5)+titleWidth+legendWidth/5-2 && mouseY > titleStartY+7 && mouseY < titleStartY+7+20){
		dateColumn = 5;
		tagColumn = 5;
		//console.log(dateColumn);
	}
	if (mouseX > titleStartX+1*(legendWidth/5)+titleWidth && mouseX < titleStartX+1*(legendWidth/5)+titleWidth+legendWidth/5-2 && mouseY > titleStartY+7 && mouseY < titleStartY+7+20){
		dateColumn = 6;
		//console.log(dateColumn);
	}
	if (mouseX > titleStartX+2*(legendWidth/5)+titleWidth && mouseX < titleStartX+2*(legendWidth/5)+titleWidth+legendWidth/5-2 && mouseY > titleStartY+7 && mouseY < titleStartY+7+20){
		dateColumn = 7;
		//console.log(dateColumn);
	}
	if (mouseX > titleStartX+3*(legendWidth/5)+titleWidth && mouseX < titleStartX+3*(legendWidth/5)+titleWidth+legendWidth/5-2 && mouseY > titleStartY+7 && mouseY < titleStartY+7+20){
		dateColumn = 8;
		//console.log(dateColumn);
	}
	if (mouseX > titleStartX+4*(legendWidth/5)+titleWidth && mouseX < titleStartX+4*(legendWidth/5)+titleWidth+legendWidth/5-2 && mouseY > titleStartY+7 && mouseY < titleStartY+7+20){
		dateColumn = 9;
		//console.log(dateColumn);
	}

	//Tag actions
	if (mouseX > titleStartX+0*(legendWidth/6)+titleWidth && mouseX < titleStartX+0*(legendWidth/6)+titleWidth+legendWidth/6-2 && mouseY > titleStartY+30 && mouseY < titleStartY+30+20){
		tagColumn = 10;
		console.log(tagColumn);
	}
	if (mouseX > titleStartX+1*(legendWidth/6)+titleWidth && mouseX < titleStartX+1*(legendWidth/6)+titleWidth+legendWidth/6-2 && mouseY > titleStartY+30 && mouseY < titleStartY+30+20){
		tagColumn = 11;
		console.log(tagColumn);
	}
	if (mouseX > titleStartX+2*(legendWidth/6)+titleWidth && mouseX < titleStartX+2*(legendWidth/6)+titleWidth+legendWidth/6-2 && mouseY > titleStartY+30 && mouseY < titleStartY+30+20){
		tagColumn = 12;
		console.log(tagColumn);
	}
	if (mouseX > titleStartX+3*(legendWidth/6)+titleWidth && mouseX < titleStartX+3*(legendWidth/6)+titleWidth+legendWidth/6-2 && mouseY > titleStartY+30 && mouseY < titleStartY+30+20){
		tagColumn = 13;
		console.log(tagColumn);
	}
	if (mouseX > titleStartX+4*(legendWidth/6)+titleWidth && mouseX < titleStartX+4*(legendWidth/6)+titleWidth+legendWidth/6-2 && mouseY > titleStartY+30 && mouseY < titleStartY+30+20){
		tagColumn = 14;
		console.log(tagColumn);
	}
	if (mouseX > titleStartX+5*(legendWidth/6)+titleWidth && mouseX < titleStartX+5*(legendWidth/6)+titleWidth+legendWidth/6-2 && mouseY > titleStartY+30 && mouseY < titleStartY+30+20){
		tagColumn = 15;
		console.log(tagColumn);
	}
	//if (mouseX > 500){
		//console.log("Pressed");
		//window.location.href = 'www.juanfrans.com';
	//}
}