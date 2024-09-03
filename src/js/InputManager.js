
GLOBAL.inputMan = {

	update() {

		if (mouseWasPressed(2)) {
			// right click, cancel all
			GLOBAL.state = 0;
			for (let i = 0; i < GLOBAL.units.length; i++) {
				GLOBAL.units[i].selected = false;
			}
			clearInput();
		}

		if (mouseWasPressed(0)) {

			clearInput();

			if (!GLOBAL.musicPlaying) {
				GLOBAL.music.playMusic(0.6, true);
				GLOBAL.musicPlaying = GLOBAL.music;
			}

			// check UI

			if (GLOBAL.miniMap.isOver(mousePos.x, mousePos.y)) {
				return;
			}

			for (let i = 0; GLOBAL.state == DEFS.STATES.TRAIN_MENU && i < GLOBAL.trainMenu.length; i++) {
				if (GLOBAL.trainMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}
			for (let i = 0; GLOBAL.state == DEFS.STATES.BUILD_MENU && i < GLOBAL.buildMenu.length; i++) {
				if (GLOBAL.buildMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}
			for (let i = 0; GLOBAL.state == DEFS.STATES.TOWNHALL_MENU && i < GLOBAL.townHallMenu.length; i++) {
				if (GLOBAL.townHallMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}
			for (let i = 0; i < GLOBAL.spellMenu.length; i++) {
				if (GLOBAL.spellMenu[i].isOver(mousePos.x, mousePos.y)) {
					return;
				}
			}

			const wereSelected = [];
			for (let i = 0; i < GLOBAL.units.length; i++) {
				const unit = GLOBAL.units[i];
				
				unit.selected && wereSelected.push(unit);
				const wasSelected = unit.selected;
				unit.isOver(mousePos.x, mousePos.y);

				if (unit.selected && wasSelected) {
					// de-select unit
					unit.selected = false;
					GLOBAL.state = 0;
					return;
				}
				if (unit.selected) {
					// done here
					return;
				}
					
			}

			// get clicked tile
			let x = max(0, min(35, Math.round(mousePos.x)));
			let y = max(0, min(35, Math.round(mousePos.y)));
			const tile = GLOBAL.mapGrid[y][x];
			
			if (tile) {

				tile.handleClick && tile.handleClick(wereSelected);
				return;
			}

			if (!wereSelected.length) {
				// start dragging select
				GLOBAL.startSelect = mousePos;
			}


			// this was an order to selected units
			for (let i = 0; i < wereSelected.length; i++) {
				const unit = wereSelected[i];

				// move command
				unit.takeOrder('move', { pos: mousePos });
				unit.selected = true;
				unit.intention = undefined;
			}
		}

		// select box
		if (GLOBAL.startSelect) {

			if (mouseWasReleased(0)) {
	
				// do selection
				for (let i = 0; i < GLOBAL.units.length; i++) {
					const unit = GLOBAL.units[i];

					unit.selected =
						unit.pos.x > min(GLOBAL.startSelect.x, mousePos.x)
						&& unit.pos.y > min(GLOBAL.startSelect.y, mousePos.y)
						&& unit.pos.x < max(GLOBAL.startSelect.x, mousePos.x)
						&& unit.pos.y < max(GLOBAL.startSelect.y, mousePos.y);
				}

				// end select mode
				delete GLOBAL.startSelect;
			}
			else {
				// draw select box
				const size = mousePos.subtract(GLOBAL.startSelect);
				drawRect(
					mousePos.subtract(size.multiply(vec2(0.5))),
					size,
					new Color(1, 1, 1, 0.2)
				);
			}
		}

	}

};