

function doEngineInit() {
	// startup LittleJS with your game functions after the tile image is loaded
	engineInit(gameInit, gameUpdate, gameUpdatePost, gameRender, gameRenderPost, ["tiles.png"]);
}


function gameInit() {
	

	GLOBAL.mapMan = new MapManager();

	cameraPos = vec2(4, 4);
	cameraScale = 60;

}
function gameUpdate() {
	
	let itemSelected = false;
	let orderGiven = false;

	if (mouseIsDown(0)) {


		if (GLOBAL.townHall.isOver(mousePos.x, mousePos.y)) {
			console.log('click');
			itemSelected = true;
		}
		else {

			const wereSelected = [];
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				
				unit.selected && wereSelected.push(unit);

				unit.isOver(mousePos.x, mousePos.y);
				itemSelected = itemSelected || unit.selected;
					
			}
			for (let i = 0; i < GLOBAL.trees.length; i++) {
				const tree = GLOBAL.trees[i];
				
				if (tree.isOver(mousePos.x, mousePos.y)) {
				
					for (let u = 0; u < wereSelected.length; u++) {

						wereSelected[u].chopTree(tree);
						orderGiven = true;
						
					}
				}
					
			}

			if (!itemSelected || orderGiven) {
				// this was an order to selected units
				for (let i = 0; i < wereSelected.length; i++) {
					const unit = wereSelected[i];
					unit.selected = true;

					// move command
					unit.destination = vec2(mousePos);
					if (!orderGiven) {
						unit.intention = undefined;
					}
				}
			}
		}
	}
}
function gameUpdatePost() {
	
}
function gameRender() {
	
}
function gameRenderPost() {
	
}

tileSizeDefault = vec2(12);
doEngineInit();