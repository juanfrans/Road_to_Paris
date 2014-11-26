/* Sketch written by Juan Francisco Saldarriaga (juanfrans@gmail.com)
for the International Council of Science, October 2014. */

var margin = 10;
var positionX;
var positionY;
var ellipseSize = 2;
var dateColumn = 5;
var tagColumn = 5;
var mapWidth, mapHeight, titleStartX, titleStartY, titleWidth, legendWidth, legendStartX, legendStartY;
var direction, directionV, characters, characters2;
var vOffset = 22;
var screenRatio = 1;
var img, imgPrecipitation, imgTemperature, imgOcean, imgAnimal, imgSociety, imgPlant;
var iconPosition = 0;
var dateText = "";
var canvasWidth, canvasHeight;
var canvas;
var zoomValue = false;
var explanationText = false;
var hoverItem;

function preload(){
	img = loadImage("data/World_Projected_WGS1984_Short-03-01.png");
	imgPrecipitation = loadImage("data/icon_precipitation/icon_precipitation.svg");
	imgTemperature = loadImage("data/icon_temperature/icon_temperature.svg");
	imgPlant = loadImage("data/icon_plant/icon_plant.svg");
	imgSociety = loadImage("data/icon_society/icon_society.svg");
	imgAnimal = loadImage("data/icon_bear/icon_bear.svg");
	imgOcean = loadImage("data/icon_shark/icon_shark.svg");
	events = loadTable('data/ENSO_Infographic_Data_Clean.csv');
}

function setup() {
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	textFont("proxima-nova");
	//createCanvas(canvasWidth*1.5, canvasHeight*1.5);
	canvas = createCanvas(canvasWidth*1.5, canvasHeight*1.5);
	canvas.parent('map');
	canvas.position(0, 0);
	colorMode(HSB, 360, 100, 100, 100);
}

function windowResized(){
	canvasWidth = windowWidth;
	canvasHeight = windowHeight;
	resizeCanvas(windowWidth*1.5, windowHeight*1.5);
	console.log("windowWidth");
}

function draw(){
	screenRatio = canvasWidth/1440;
	background(20);
	margin = 10*screenRatio;
	mapWidth = canvasWidth-margin*6;
	mapHeight = mapWidth/img.width*img.height;
	titleStartY = mapHeight-80*screenRatio;
	titleStartX = margin+10;
	titleWidth = 450*screenRatio;
	legendWidth = 615*screenRatio;
	legendStartX = titleStartX+titleWidth+25*screenRatio;
	legendStartY = mapHeight-55*screenRatio;
	text("test, test", 2000, 2000);
	strokeCap(SQUARE);
	textSize(12*screenRatio);
	explanationText = false;

	image(img, margin, margin, mapWidth, mapHeight);
	isExplanationText();

	textStyle(BOLD);
	textAlign(LEFT);
	fill(0);
	noStroke();
	var titleText = "EL NIÑO - A GLOBAL PHENOMENON";
	var textDistance = 0;
	for (var k = 0; k < titleText.length; k++) {
		textSize(22*screenRatio);
		text(titleText.charAt(k), titleStartX+textDistance, titleStartY);
		textDistance = textDistance + map(textWidth(titleText.charAt(k)), 0, textWidth(titleText), 0, titleWidth);
	};
	stroke(0);
	strokeWeight(.5);
	textStyle(NORMAL);
	noStroke();
	textSize(11*screenRatio);
	textLeading(13*screenRatio);
	text("For years, the El Niño Southern Oscillation (ENSO) was understood as a regional phenomenon that mainly affected ocean temperatures and precipitation. But in recent decades, scientists have discovered diverse and far-reaching effects of ENSO on everything from mudslides in Africa to the military history of Europe. El Niño causes many of Earth's most drastic variations in weather, temperature, and rainfall--and its worldwide consequences illustrate how deeply interconnected our planet's climate really is.", titleStartX, titleStartY+2*screenRatio, titleWidth, 400);

	stroke(0);
	strokeWeight(.25);
	fill(100, 35);
	if(tagColumn == 5 && dateColumn == 5){
		rect(legendStartX, legendStartY, legendWidth/5-2, 25*screenRatio);
	}
	if(dateColumn>5){
		rect(legendStartX+((5-dateColumn)*(-1))*(legendWidth/5), legendStartY, legendWidth/5-2, 25*screenRatio);
	}
	if(tagColumn>5){
		rect(legendStartX+((10-tagColumn)*(-1))*(legendWidth/6), legendStartY+30*screenRatio, legendWidth/6-2, 25*screenRatio);
	}
	noStroke();

	stroke(0);
	strokeWeight(.25);
	noFill();
	for(var i=0; i<5; i++){
		rect(legendStartX+i*(legendWidth/5), legendStartY, legendWidth/5-2, 25*screenRatio);
	}
	noStroke();
	fill(0);
	textSize(10*screenRatio);
	textStyle(BOLD);
	textAlign(CENTER);
	text("All Events", legendStartX+legendWidth/10-1, legendStartY+15*screenRatio);
	text("Pre 1970", legendStartX+legendWidth/10*3-1, legendStartY+15*screenRatio);
	text("1970-1990", legendStartX+legendWidth/10*5-1, legendStartY+15*screenRatio);
	text("1990-2000", legendStartX+legendWidth/10*7-1, legendStartY+15*screenRatio);
	text("2000-Present", legendStartX+legendWidth/10*9-1, legendStartY+15*screenRatio);
	noFill();
	stroke(0);
	for (var i = 0; i < 6; i++) {
		rect(legendStartX+i*(legendWidth/6), legendStartY+30*screenRatio, legendWidth/6-2, 25*screenRatio);
	};
	noStroke();
	fill(0);
	textSize(10*screenRatio);
	textAlign(CENTER);
	text("Temperature", legendStartX+legendWidth/12-1, legendStartY+45*screenRatio);
	text("Precipitation", legendStartX+legendWidth/12*3-1, legendStartY+45*screenRatio);
	text("Plants", legendStartX+legendWidth/12*5-1, legendStartY+45*screenRatio);
	text("Ocean", legendStartX+legendWidth/12*7-1, legendStartY+45*screenRatio);
	text("Animals", legendStartX+legendWidth/12*9-1, legendStartY+45*screenRatio);
	text("Society", legendStartX+legendWidth/12*11-1, legendStartY+45*screenRatio);
	image(imgTemperature, legendStartX+legendWidth/6*0+3, legendStartY+35*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgPrecipitation, legendStartX+legendWidth/6*1+1, legendStartY+35*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgPlant, legendStartX+legendWidth/6*2+5, legendStartY+35*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgOcean, legendStartX+legendWidth/6*3+3, legendStartY+32*screenRatio, 25*screenRatio, 25*screenRatio);
	image(imgAnimal, legendStartX+legendWidth/6*4+5, legendStartY+35*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgSociety, legendStartX+legendWidth/6*5+5, legendStartY+35*screenRatio, 15*screenRatio, 15*screenRatio);

	stroke(0);
	strokeWeight(.25);
	noFill();
	fill(193, 31, 67);
	for(var i=0; i<2; i++){
		rect(20*screenRatio, 20*screenRatio+i*30*screenRatio, 60*screenRatio, 25*screenRatio);
	}
	noStroke();
	fill(100, 35);
	if(zoomValue == true){
		rect(20*screenRatio, 20*screenRatio, 60*screenRatio, 25*screenRatio);
	}else{}
	noStroke();
	fill(0);
	textSize(10*screenRatio);
	textAlign(CENTER);
	text("Zoom In", 50*screenRatio, 35*screenRatio);
	text("Zoom Out", 50*screenRatio, 65*screenRatio);
	textSize(9.5*screenRatio);
}

function isExplanationText(){
	explanationText = false;
	text("test, test", 2000, 2000);
	hoverItem = 0;
	cursor(ARROW);
	for (var i = events.getRowCount() - 1; i >= 1; i--) {
		iconPosition = 0;
		if(events.getColumn(dateColumn)[i] > 0){
			if(events.getColumn(tagColumn)[i] > 0){
				positionX = map(events.getColumn(3)[i], -180, 180, mapWidth*.5, mapWidth*1.5);
				if(positionX>mapWidth){
					positionX = positionX - mapWidth;
				}
				positionY = map(events.getColumn(2)[i], 90, -65, 0, mapHeight);
				direction = events.getColumn(16)[i];
				directionV = events.getColumn(17)[i];
				dateText = " ("+events.getColumn(4)[i]+")";
				textSize(12*screenRatio);
				characters = textWidth(events.getColumn(0)[i]);

				if (direction < 0 && mouseX < margin+positionX && mouseX > margin+positionX+characters*direction+10*direction*screenRatio && mouseY > margin+positionY-47*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-32*screenRatio-vOffset*directionV*screenRatio){
					explanationText = true;
					hoverItem = i;
					cursor(HAND);
				}
				else if (direction > 0 && mouseX > margin+positionX && mouseX < margin+positionX+characters+10*screenRatio && mouseY > margin+positionY-47*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-32*screenRatio-vOffset*directionV*screenRatio){
					explanationText = true;
					hoverItem = i;
					cursor(HAND);
				}
				else{}
			}
		}
	}	
	if (explanationText == false){
		plotAllTitles();
	}
	else {
		plotDescription();
	}
}

function plotDescription(){
	text("test, test", 2000, 2000);
	iconPosition = 0;
	if(events.getColumn(dateColumn)[hoverItem] > 0){
		if(events.getColumn(tagColumn)[hoverItem] > 0){
			positionX = map(events.getColumn(3)[hoverItem], -180, 180, mapWidth*.5, mapWidth*1.5);
			if(positionX>mapWidth){
				positionX = positionX - mapWidth;
			}
			positionY = map(events.getColumn(2)[hoverItem], 90, -65, 0, mapHeight);
			direction = events.getColumn(16)[hoverItem];
			directionV = events.getColumn(17)[hoverItem];
			dateText = " ("+events.getColumn(4)[hoverItem]+")";
			textSize(12*screenRatio);
			characters = textWidth(events.getColumn(0)[hoverItem]);

			noStroke();
			fill(100, 75);
			fill(35, 100, 100);
			ellipseMode(CENTER);
			ellipse(margin+positionX, margin+positionY, 8*screenRatio, 8*screenRatio);

			stroke(35,100,100);
			strokeWeight(.75);
			line(margin+positionX*1, margin+positionY*1-5*screenRatio, margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);
			line(margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, margin+positionX*1+(characters+10*screenRatio)*direction, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);

			noStroke();
			fill(100);
			textStyle(BOLD);
			textSize(12*screenRatio);
			if(direction>0){
				textAlign(LEFT);
			}
			else{
				textAlign(RIGHT);
			}
			text(events.getColumn(0)[hoverItem], margin+positionX*1+7*direction*screenRatio, margin+positionY*1-38*screenRatio-vOffset*directionV*screenRatio);

			ellipseMode(CORNER);
			noStroke();
			fill(35, 100, 100, 90);
			if(direction > 0){
				if(events.getColumn(10)[hoverItem] > 0){
					ellipse(margin+positionX*1+7*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgTemperature, margin+positionX*1+9*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
				}
				if(events.getColumn(11)[hoverItem] > 0){
					ellipse(margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgPrecipitation, margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					iconPosition = iconPosition + 1;
				}
				if(events.getColumn(12)[hoverItem] > 0){
					ellipse(margin+positionX*1+7*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgPlant, margin+positionX*1+9*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
				}
				if(events.getColumn(14)[hoverItem] > 0){
					ellipse(margin+positionX*1+7*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgAnimal, margin+positionX*1+10*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13*screenRatio, 13*screenRatio);
					iconPosition = iconPosition + 1;
				}
				if(events.getColumn(13)[hoverItem] > 0){
					ellipse(margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgOcean, margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					iconPosition = iconPosition + 1;
				}
				if(events.getColumn(15)[hoverItem] > 0){
					ellipse(margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgSociety, margin+positionX*1+9*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
				}
				else{}
			}
		else if(direction < 0){
			if(events.getColumn(10)[hoverItem] > 0){
				ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				image(imgTemperature, margin+positionX*1+23*direction*screenRatio+10*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
				iconPosition = iconPosition + 1;
			}
			if(events.getColumn(11)[hoverItem] > 0){
				ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				image(imgPrecipitation, margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				iconPosition = iconPosition + 1;
			}
			if(events.getColumn(12)[hoverItem] > 0){
				ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				image(imgPlant, margin+positionX*1+22*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
				iconPosition = iconPosition + 1;
			}
			if(events.getColumn(14)[hoverItem] > 0){
				ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				image(imgAnimal, margin+positionX*1+22*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13*screenRatio, 13*screenRatio);
				iconPosition = iconPosition + 1;
			}
			if(events.getColumn(13)[hoverItem] > 0){
				ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				image(imgOcean, margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				iconPosition = iconPosition + 1;
			}
			if(events.getColumn(15)[hoverItem] > 0){
				ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
				image(imgSociety, margin+positionX*1+22*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
				iconPosition = iconPosition + 1;
			}else{}
		}

		textLeading(13*screenRatio);
		if(direction>0){
			noStroke();
			fill(100, 75);
			fill(100);
			textSize(12*screenRatio);
			textStyle(BOLD);
			textLeading(13*screenRatio);
			textAlign(LEFT);
			text(events.getColumn(1)[hoverItem]+dateText, margin+positionX*1+7*direction*screenRatio, margin+positionY*1-14*screenRatio-vOffset*directionV*screenRatio, characters, 100);
		}
		else if (direction<0){
			noStroke();
			fill(100, 75);
			fill(100);
			textSize(12*screenRatio);
			textStyle(BOLD);
			textLeading(13*screenRatio);
			textAlign(RIGHT);
			text(events.getColumn(1)[hoverItem]+dateText, margin+positionX*1+7*direction*screenRatio, margin+positionY*1-14*screenRatio-vOffset*directionV*screenRatio, characters, 100);
		}else{}
	}else{}
}else{}
}

function plotAllTitles(){
	text("test, test", 2000, 2000);
	for (var i = events.getRowCount() - 1; i >= 1; i--) {
		iconPosition = 0;
		if(events.getColumn(dateColumn)[i] > 0){
			if(events.getColumn(tagColumn)[i] > 0){
				positionX = map(events.getColumn(3)[i], -180, 180, mapWidth*.5, mapWidth*1.5);
				if(positionX>mapWidth){
					positionX = positionX - mapWidth;
				}
				positionY = map(events.getColumn(2)[i], 90, -65, 0, mapHeight);
				direction = events.getColumn(16)[i];
				directionV = events.getColumn(17)[i];
				dateText = " ("+events.getColumn(4)[i]+")";
				textSize(12*screenRatio);
				characters = textWidth(events.getColumn(0)[i]);

				noStroke();
				fill(100, 75);
				fill(35, 100, 100);
				ellipseMode(CENTER);
				ellipse(margin+positionX, margin+positionY, 8*screenRatio, 8*screenRatio);

				stroke(35,100,100);
				strokeWeight(.75);
				line(margin+positionX*1, margin+positionY*1-5*screenRatio, margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);
				line(margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, margin+positionX*1+(characters+10*screenRatio)*direction, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);

				noStroke();
				fill(100);
				textStyle(BOLD);
				textSize(12*screenRatio);
				if(direction>0){
					textAlign(LEFT);
				}
				else{
					textAlign(RIGHT);
				}
				text(events.getColumn(0)[i], margin+positionX*1+7*direction*screenRatio, margin+positionY*1-38*screenRatio-vOffset*directionV*screenRatio);

				ellipseMode(CORNER);
				noStroke();
				fill(35, 100, 100, 90);
				if(direction > 0){
					if(events.getColumn(10)[i] > 0){
						ellipse(margin+positionX*1+7*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgTemperature, margin+positionX*1+9*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(11)[i] > 0){
						ellipse(margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgPrecipitation, margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(12)[i] > 0){
						ellipse(margin+positionX*1+7*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgPlant, margin+positionX*1+9*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(14)[i] > 0){
						ellipse(margin+positionX*1+7*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgAnimal, margin+positionX*1+10*direction*screenRatio+10*iconPosition*screenRatio, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13*screenRatio, 13*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(13)[i] > 0){
						ellipse(margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgOcean, margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(15)[i] > 0){
						ellipse(margin+positionX*1+7*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgSociety, margin+positionX*1+9*direction*screenRatio+25*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
						iconPosition = iconPosition + 1;
					}
					else{}
				}
				else if(direction < 0){
					if(events.getColumn(10)[i] > 0){
						ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgTemperature, margin+positionX*1+23*direction*screenRatio+10*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(11)[i] > 0){
						ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgPrecipitation, margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(12)[i] > 0){
						ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgPlant, margin+positionX*1+22*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(14)[i] > 0){
						ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgAnimal, margin+positionX*1+22*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13*screenRatio, 13*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(13)[i] > 0){
						ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgOcean, margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						iconPosition = iconPosition + 1;
					}
					if(events.getColumn(15)[i] > 0){
						ellipse(margin+positionX*1+25*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
						image(imgSociety, margin+positionX*1+22*direction*screenRatio+25*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
						iconPosition = iconPosition + 1;
					}else{}
				}else{}
			}
		}
	}
}

function mousePressed(){
	if (mouseX > 20*screenRatio && mouseX < 80*screenRatio && mouseY > 20*screenRatio && mouseY < 45*screenRatio){
		canvasWidth = windowWidth*1.5;
		canvasHeight = windowHeight*1.5;
		zoomValue = true;
	}
	if (mouseX > 20*screenRatio && mouseX < 80*screenRatio && mouseY > 50*screenRatio && mouseY < 75*screenRatio){
		canvasWidth = windowWidth;
		canvasHeight = windowHeight;
		zoomValue = false;
	}

	if (mouseX > legendStartX+0*(legendWidth/5) && mouseX < legendStartX+0*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+25*screenRatio){
		dateColumn = 5;
		tagColumn = 5;
	}
	if (mouseX > legendStartX+1*(legendWidth/5) && mouseX < legendStartX+1*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+25*screenRatio){
		dateColumn = 6;
	}
	if (mouseX > legendStartX+2*(legendWidth/5) && mouseX < legendStartX+2*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+25*screenRatio){
		dateColumn = 7;
	}
	if (mouseX > legendStartX+3*(legendWidth/5) && mouseX < legendStartX+3*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+25*screenRatio){
		dateColumn = 8;
	}
	if (mouseX > legendStartX+4*(legendWidth/5) && mouseX < legendStartX+4*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+25*screenRatio){
		dateColumn = 9;
	}

	if (mouseX > legendStartX+0*(legendWidth/6) && mouseX < legendStartX+0*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+30*screenRatio && mouseY < legendStartY+30*screenRatio+25*screenRatio){
		tagColumn = 10;
	}
	if (mouseX > legendStartX+1*(legendWidth/6) && mouseX < legendStartX+1*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+30*screenRatio && mouseY < legendStartY+30*screenRatio+25*screenRatio){
		tagColumn = 11;
	}
	if (mouseX > legendStartX+2*(legendWidth/6) && mouseX < legendStartX+2*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+30*screenRatio && mouseY < legendStartY+30*screenRatio+25*screenRatio){
		tagColumn = 12;
	}
	if (mouseX > legendStartX+3*(legendWidth/6) && mouseX < legendStartX+3*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+30*screenRatio && mouseY < legendStartY+30*screenRatio+25*screenRatio){
		tagColumn = 13;
	}
	if (mouseX > legendStartX+4*(legendWidth/6) && mouseX < legendStartX+4*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+30*screenRatio && mouseY < legendStartY+30*screenRatio+25*screenRatio){
		tagColumn = 14;
	}
	if (mouseX > legendStartX+5*(legendWidth/6) && mouseX < legendStartX+5*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+30*screenRatio && mouseY < legendStartY+30*screenRatio+25*screenRatio){
		tagColumn = 15;
	}

	for (var i = events.getRowCount() - 1; i >= 1; i--) {
		if(events.getColumn(dateColumn)[i] > 0){
			if(events.getColumn(tagColumn)[i] > 0){
				positionX = map(events.getColumn(3)[i], -180, 180, mapWidth*.5, mapWidth*1.5);
				if(positionX>mapWidth){
					positionX = positionX - mapWidth;
				}
				positionY = map(events.getColumn(2)[i], 90, -65, 0, mapHeight);
				direction = events.getColumn(16)[i];
				directionV = events.getColumn(17)[i];
				characters = textWidth(events.getColumn(0)[i]);

				if(direction>0){
					if(mouseX > margin+positionX && mouseX < margin+positionX+characters*screenRatio+10*screenRatio && mouseY > margin+positionY-45*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-5*screenRatio-vOffset*directionV*screenRatio){
						window.open(events.getColumn(18)[i]);
					}
					else{}
				}
				else if (direction<0){
					if(mouseX < margin+positionX && mouseX > margin+positionX+characters*direction*screenRatio+10*direction*screenRatio && mouseY > margin+positionY-45*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-5*screenRatio-vOffset*directionV*screenRatio){
						window.open(events.getColumn(18)[i]);
					}
					else{}
				}
				else{}
			}
		}
	}
}

