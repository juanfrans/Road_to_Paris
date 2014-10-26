//Global variables
var margin = 10;
var img;
var positionX;
var positionY;
var ellipseSize = 2;
var startX = 20;
var dateColumn = 5;
var tagColumn = 5;
var mapWidth, mapHeight, titleStartX, titleStartY, titleWidth, legendWidth, legendStartX, legendStartY;
var direction, directionV, characters, characters2;
var vOffset = 22;
var screenRatio = 1;
var imgPrecipitation, imgTemperature, imgOcean, imgAnimal, imgSociety, imgPlant;
var iconPosition = 0;

//Preload images and data
function preload(){
	img = loadImage("data/World_Projected_WGS1984_Short-02.png");
	imgPrecipitation = loadImage("data/icon_precipitation/icon_precipitation.svg");
	imgTemperature = loadImage("data/icon_temperature/icon_temperature.svg");
	imgPlant = loadImage("data/icon_plant/icon_plant.svg");
	imgSociety = loadImage("data/icon_society/icon_society.svg");
	imgAnimal = loadImage("data/icon_bear/icon_bear.svg");
	imgOcean = loadImage("data/icon_shark/icon_shark.svg");
	events = loadTable('data/ENSO_Infographic_Data_Clean.csv');
}

function setup() {
	var canvasWidth = 1280;
	var canvasHeight = 720;
	textFont("Proxima Nova");
	createCanvas(windowWidth, windowHeight);
	colorMode(HSB, 360, 100, 100, 100);
}

function draw(){
	screenRatio = windowWidth/1440;
	background(20);
	margin = 10*screenRatio;
	mapWidth = windowWidth-margin*6;
	mapHeight = mapWidth/img.width*img.height;
	titleStartY = mapHeight-75*screenRatio;
	titleStartX = margin+10;
	titleWidth = 400*screenRatio;
	legendWidth = 500*screenRatio;
	legendStartX = titleStartX+titleWidth+25*screenRatio;
	legendStartY = mapHeight-45*screenRatio;
	text("test, test", 2000, 2000);

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
				characters = textWidth(events.getColumn(0)[i]);
				characters2 = textWidth(events.getColumn(1)[i]);

				//Explanation box
				if(mouseX > margin+positionX-5 && mouseX < margin+positionX+5 && mouseY > margin+positionY-5 && mouseY < margin+positionY+5){
					noStroke();
					fill(100, 75);
					if (windowWidth >= 1024){
						fill(100);
						textSize(9*screenRatio);
						textStyle(BOLD);
						textLeading(10*screenRatio);
						if(direction>0){
							textAlign(LEFT);
							text(events.getColumn(1)[i], margin+positionX*1+7*direction*screenRatio, margin+positionY*1-10*screenRatio-vOffset*directionV*screenRatio, characters*1.65*screenRatio, 100);
						}
						if(direction<0){
							textAlign(RIGHT);
							text(events.getColumn(1)[i], margin+positionX*1+7*direction*screenRatio, margin+positionY*1-10*screenRatio-vOffset*directionV*screenRatio, characters*1.38*screenRatio, 100);
						}
					}
				}

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
				line(margin+positionX*1, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio, margin+positionX+(characters+10*screenRatio)*direction, margin+positionY*1-35*screenRatio-vOffset*directionV*screenRatio);

				//Event title
				noStroke();
				fill(100);
				textStyle(BOLD);
				textSize(8*screenRatio);
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
					ellipse(margin+positionX*1+7*direction+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgTemperature, margin+positionX*1+9*direction+10*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(11)[i] > 0){
					ellipse(margin+positionX*1+7*direction+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgPrecipitation, margin+positionX*1+7*direction+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(12)[i] > 0){
					ellipse(margin+positionX*1+7*direction+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgPlant, margin+positionX*1+9*direction+10*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(14)[i] > 0){
					ellipse(margin+positionX*1+7*direction+10*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgAnimal, margin+positionX*1+10*direction+10*iconPosition*screenRatio, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13*screenRatio, 13*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(13)[i] > 0){
					ellipse(margin+positionX*1+7*direction+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgOcean, margin+positionX*1+7*direction+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(15)[i] > 0){
					ellipse(margin+positionX*1+7*direction+25*iconPosition*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgSociety, margin+positionX*1+9*direction+25*iconPosition*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
					}
				}
				if(direction < 0){
					if(events.getColumn(10)[i] > 0){
					ellipse(margin+positionX*1+25*direction+10*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgTemperature, margin+positionX*1+23*direction+10*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(11)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgPrecipitation, margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(12)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgPlant, margin+positionX*1+22*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(14)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgAnimal, margin+positionX*1+22*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-29*screenRatio-vOffset*directionV*screenRatio, 13*screenRatio, 13*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(15)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgOcean, margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					iconPosition = iconPosition + 1;
					}
					if(events.getColumn(13)[i] > 0){
					ellipse(margin+positionX*1+25*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-32*screenRatio-vOffset*directionV*screenRatio, 20*screenRatio, 20*screenRatio);
					image(imgSociety, margin+positionX*1+22*direction+25*iconPosition*(-1)*screenRatio, margin+positionY*1-30*screenRatio-vOffset*directionV*screenRatio, 15*screenRatio, 15*screenRatio);
					iconPosition = iconPosition + 1;
					}
				}
			}else{}
		}else{}
	}

	//Title
	textStyle(BOLD);
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
	textSize(10*screenRatio);
	textLeading(12*screenRatio);
	text("For years, the El Niño Southern Oscillation (ENSO) was understood as a regional phenomenon that mainly affected ocean temperatures and precipitation. But in recent decades, scientists have discovered diverse and far-reaching effects of ENSO on everything from mudslides in Africa to the military history of Europe. El Niño causes many of Earth's most drastic variations in weather, temperature, and rainfall--and its worldwide consequences illustrate how deeply interconnected our planet's climate really is.", titleStartX, titleStartY+2*screenRatio, titleWidth, 400);

	//Highlight rectangle
	stroke(0);
	strokeWeight(.25);
	fill(100, 35);
	if(tagColumn == 5 && dateColumn == 5){
		rect(legendStartX, legendStartY, legendWidth/5-2, 20*screenRatio);
	}
	if(dateColumn>5){
		rect(legendStartX+((5-dateColumn)*(-1))*(legendWidth/5), legendStartY, legendWidth/5-2, 20*screenRatio);
	}
	if(tagColumn>5){
		rect(legendStartX+((10-tagColumn)*(-1))*(legendWidth/6), legendStartY+27*screenRatio, legendWidth/6-2, 20*screenRatio);
	}
	noStroke();

	//Toggle Icons
	stroke(0);
	strokeWeight(.25);
	noFill();
	for(var i=0; i<5; i++){
		rect(legendStartX+i*(legendWidth/5), legendStartY, legendWidth/5-2, 20*screenRatio);
	}
	noStroke();
	fill(0);
	textSize(8*screenRatio);
	textStyle(BOLD);
	textAlign(CENTER);
	text("All Events", legendStartX+legendWidth/10-1, legendStartY+13*screenRatio);
	text("Pre 1970", legendStartX+legendWidth/10*3-1, legendStartY+13*screenRatio);
	text("1970-1990", legendStartX+legendWidth/10*5-1, legendStartY+13*screenRatio);
	text("1990-2000", legendStartX+legendWidth/10*7-1, legendStartY+13*screenRatio);
	text("2000-Present", legendStartX+legendWidth/10*9-1, legendStartY+13*screenRatio);
	noFill();
	stroke(0);
	for (var i = 0; i < 6; i++) {
		rect(legendStartX+i*(legendWidth/6), legendStartY+27*screenRatio, legendWidth/6-2, 20*screenRatio);
	};
	noStroke();
	fill(0);
	textSize(8*screenRatio);
	textAlign(CENTER);
	text("Temperature", legendStartX+legendWidth/12-1, legendStartY+40*screenRatio);
	text("Precipitation", legendStartX+legendWidth/12*3-1, legendStartY+40*screenRatio);
	text("Plants", legendStartX+legendWidth/12*5-1, legendStartY+40*screenRatio);
	text("Ocean", legendStartX+legendWidth/12*7-1, legendStartY+40*screenRatio);
	text("Animals", legendStartX+legendWidth/12*9-1, legendStartY+40*screenRatio);
	text("Society", legendStartX+legendWidth/12*11-1, legendStartY+40*screenRatio);
	image(imgTemperature, legendStartX+legendWidth/6*0+3, legendStartY+30*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgPrecipitation, legendStartX+legendWidth/6*1+1, legendStartY+30*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgPlant, legendStartX+legendWidth/6*2+5, legendStartY+30*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgOcean, legendStartX+legendWidth/6*3+3, legendStartY+27*screenRatio, 25*screenRatio, 25*screenRatio);
	image(imgAnimal, legendStartX+legendWidth/6*4+5, legendStartY+30*screenRatio, 15*screenRatio, 15*screenRatio);
	image(imgSociety, legendStartX+legendWidth/6*5+5, legendStartY+30*screenRatio, 15*screenRatio, 15*screenRatio);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed(){
	//Date actions
	if (mouseX > legendStartX+0*(legendWidth/5) && mouseX < legendStartX+0*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+20*screenRatio){
		dateColumn = 5;
		tagColumn = 5;
	}
	if (mouseX > legendStartX+1*(legendWidth/5) && mouseX < legendStartX+1*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+20*screenRatio){
		dateColumn = 6;
	}
	if (mouseX > legendStartX+2*(legendWidth/5) && mouseX < legendStartX+2*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+20*screenRatio){
		dateColumn = 7;
	}
	if (mouseX > legendStartX+3*(legendWidth/5) && mouseX < legendStartX+3*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+20*screenRatio){
		dateColumn = 8;
	}
	if (mouseX > legendStartX+4*(legendWidth/5) && mouseX < legendStartX+4*(legendWidth/5)+legendWidth/5-2 && mouseY > legendStartY && mouseY < legendStartY+20*screenRatio){
		dateColumn = 9;
	}

	//Tag actions
	if (mouseX > legendStartX+0*(legendWidth/6) && mouseX < legendStartX+0*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+27*screenRatio && mouseY < legendStartY+27*screenRatio+20*screenRatio){
		tagColumn = 10;
	}
	if (mouseX > legendStartX+1*(legendWidth/6) && mouseX < legendStartX+1*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+27*screenRatio && mouseY < legendStartY+27*screenRatio+20*screenRatio){
		tagColumn = 11;
	}
	if (mouseX > legendStartX+2*(legendWidth/6) && mouseX < legendStartX+2*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+27*screenRatio && mouseY < legendStartY+27*screenRatio+20*screenRatio){
		tagColumn = 12;
	}
	if (mouseX > legendStartX+3*(legendWidth/6) && mouseX < legendStartX+3*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+27*screenRatio && mouseY < legendStartY+27*screenRatio+20*screenRatio){
		tagColumn = 13;
	}
	if (mouseX > legendStartX+4*(legendWidth/6) && mouseX < legendStartX+4*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+27*screenRatio && mouseY < legendStartY+27*screenRatio+20*screenRatio){
		tagColumn = 14;
	}
	if (mouseX > legendStartX+5*(legendWidth/6) && mouseX < legendStartX+5*(legendWidth/6)+legendWidth/6-2 && mouseY > legendStartY+27*screenRatio && mouseY < legendStartY+27*screenRatio+20*screenRatio){
		tagColumn = 15;
	}
}