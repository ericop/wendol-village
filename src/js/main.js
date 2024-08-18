

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
}


function gameInit() {
	

	fontDefault = 'monospace';
	GLOBAL.uiFont = new FontImage();

	GLOBAL.mapMan = new MapManager();

	// UI
	GLOBAL.buttons.push(
		new Button(128, 96, 50)
	);

	cameraPos = vec2(4, 4);
	cameraScale = 60;

}
function gameUpdate() {

	GLOBAL.inputMan.update();

}
function gameUpdatePost() {
	
}
function gameRender() {
	
}
function gameRenderPost() {
	

	// wood
	let uiPos = screenToWorld(vec2(128, 64));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tile(36)
	);

	/*drawText(
		'' + GLOBAL.wood,
		uiPos.add(vec2(1.4, -0.1)),
		1,
		new Color(0, 0, 0),
		undefined,
		undefined,
		'right'
	);*/
	GLOBAL.uiFont.drawText(
		'' + GLOBAL.wood,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);

	// stone
	uiPos = uiPos.add(vec2(4, 0));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(0.8, 0)),
		vec2(1),
		tile(44)
	);

	GLOBAL.uiFont.drawText(
		'' + GLOBAL.stone,
		uiPos.add(vec2(0.8, 0.2)),
		0.08,
		true
	);

	// population
	uiPos = uiPos.add(vec2(4, 0));

	drawTile(
		uiPos,
		vec2(4, 2),
		tile(vec2(0, 48), vec2(48, 24))
	);
	drawTile(
		uiPos.subtract(vec2(1, 0)),
		vec2(1),
		tile(4)
	);

	GLOBAL.uiFont.drawText(
		'' + 2 + '/3',
		uiPos.add(vec2(0.6, 0.2)),
		0.08,
		true
	);

	// build menu
	/*uiPos = screenToWorld(vec2(128, innerHeight - 96));

	drawTile(
		uiPos,
		vec2(2),
		tile(vec2(0, 72), vec2(24, 24))
	);
	drawTile(
		uiPos,
		vec2(1),
		tile(50)
	);*/
	for (let i = 0; i < GLOBAL.buttons.length; i++) {
		GLOBAL.buttons[i].draw();
	}



}

tileSizeDefault = vec2(12);
doEngineInit();
