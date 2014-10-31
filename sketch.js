//Global variables
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

//Preload images and data
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
	textFont("Montserrat");
	canvas = createCanvas(canvasWidth*1.5, canvasHeight*1.5);
	canvas.parent('map');
	canvas.position(0, 0);
	colorMode(HSB, 360, 100, 100, 100);
}

function draw(){
	screenRatio = canvasWidth/1440;
	background(20);
	margin = 10*screenRatio;
	mapWidth = canvasWidth-margin*6;
	mapHeight = mapWidth/img.width*img.height;
	titleStartY = mapHeight-75*screenRatio;
	titleStartX = margin+10;
	titleWidth = 425*screenRatio;
	legendWidth = 615*screenRatio;
	legendStartX = titleStartX+titleWidth+25*screenRatio;
	legendStartY = mapHeight-55*screenRatio;
	text("test, test", 2000, 2000);
	strokeCap(SQUARE);
	textSize(9*screenRatio);

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
				positionY = map(events.getColumn(2)[i], 90, -65, 0, mapHeight);
				direction = events.getColumn(16)[i];
				directionV = events.getColumn(17)[i];
				dateText = " ("+events.getColumn(4)[i]+")";
				characters = textWidth(events.getColumn(0)[i]);

				//Explanation box
				textLeading(6*screenRatio);
				if(direction>0){
					if(mouseX > margin+positionX && mouseX < margin+positionX+characters+10*screenRatio && mouseY > margin+positionY-45*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-5*screenRatio-vOffset*directionV*screenRatio){
						noStroke();
						fill(100, 75);
						if (mapWidth >= 1024){
							fill(100);
							textSize(9*screenRatio);
							textStyle(BOLD);
							textLeading(10*screenRatio);
							textAlign(LEFT);
							text(events.getColumn(1)[i]+dateText, margin+positionX*1+7*direction*screenRatio, margin+positionY*1-14*screenRatio-vOffset*directionV*screenRatio, characters*1.2, 100);
						}else{}
					}else{}
				}
				else if (direction<0){
					if(mouseX < margin+positionX && mouseX > margin+positionX+characters*direction+10*direction*screenRatio && mouseY > margin+positionY-45*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-5*screenRatio-vOffset*directionV*screenRatio){
						noStroke();
						fill(100, 75);
						if (mapWidth >= 1024){
							fill(100);
							textSize(9*screenRatio);
							textStyle(BOLD);
							textLeading(10*screenRatio);
							textAlign(RIGHT);
							text(events.getColumn(1)[i]+dateText, margin+positionX*1+7*direction*screenRatio, margin+positionY*1-14*screenRatio-vOffset*directionV*screenRatio, characters*1.05, 100);
						}else{}
					}else{}
				}else{}

				//Title box
				noStroke();
				fill(100, 75);
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
				line(margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, margin+positionX*1+(characters+10*screenRatio)*direction, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);

				//Event title
				noStroke();
				fill(100);
				textStyle(BOLD);
				textSize(9.5*screenRatio);
				if(direction>0){
					textAlign(LEFT);
				}
				else{
					textAlign(RIGHT);
				}
				text(events.getColumn(0)[i], margin+positionX*1+7*direction*screenRatio, margin+positionY*1-38*screenRatio-vOffset*directionV*screenRatio);
				
				//Add Icon
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
			}else{}
		}else{}
	}

	//Title
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
	textSize(9*screenRatio);
	textLeading(12*screenRatio);
	text("For years, the El Niño Southern Oscillation (ENSO) was understood as a regional phenomenon that mainly affected ocean temperatures and precipitation. But in recent decades, scientists have discovered diverse and far-reaching effects of ENSO on everything from mudslides in Africa to the military history of Europe. El Niño causes many of Earth's most drastic variations in weather, temperature, and rainfall--and its worldwide consequences illustrate how deeply interconnected our planet's climate really is.", titleStartX, titleStartY+2*screenRatio, titleWidth, 400);

	//Highlight rectangle
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

	//Toggle Icons
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

	//Zoom In & Zoom Out
	stroke(0);
	strokeWeight(.25);
	noFill();
	fill(193, 31, 67);
	for(var i=0; i<2; i++){
		rect(20, 20+i*30, 60, 25);
	}
	noStroke();
	fill(100, 35);
	if(zoomValue == true){
		rect(20, 20, 60, 25);
	}else{}
	noStroke();
	fill(0);
	textSize(10);
	textAlign(CENTER);
	text("Zoom In", 50, 35);
	text("Zoom Out", 50, 65);
}

function mousePressed(){
	//Zoom In & Out actions
	if (mouseX > 20 && mouseX < 80 && mouseY > 20 && mouseY < 45){
		canvasWidth = windowWidth*1.5;
		canvasHeight = windowHeight*1.5;
		zoomValue = true;
	}
	if (mouseX > 20 && mouseX < 80 && mouseY > 50 && mouseY < 75){
		canvasWidth = windowWidth;
		canvasHeight = windowHeight;
		zoomValue = false;
	}

	//Date actions
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

	//Tag actions
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

	//Links
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

				//Explanation box
				if(direction>0){
					if(mouseX > margin+positionX && mouseX < margin+positionX+characters+10*screenRatio && mouseY > margin+positionY-45*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-5*screenRatio-vOffset*directionV*screenRatio){
						window.open(events.getColumn(18)[i]);
					}
					else{}
				}
				else if (direction<0){
					if(mouseX < margin+positionX && mouseX > margin+positionX+characters*direction+10*direction*screenRatio && mouseY > margin+positionY-45*screenRatio-vOffset*directionV*screenRatio && mouseY < margin+positionY-5*screenRatio-vOffset*directionV*screenRatio){
						window.open(events.getColumn(18)[i]);
					}
					else{}
				}
				else{}
			}
		}
	}
}