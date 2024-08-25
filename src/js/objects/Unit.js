

class Unit extends EngineObject {

	constructor(pos, size, tileInfo) {

		super(pos, size, tileInfo);

		this.destination = pos;

		this.hitPoints = 3;
		this.speed = 1 / 48;
		this.walkFrame = 0;
		this.walkTile = tile(tileInfo.pos.add(vec2(12, 0), tileInfo.size));

		this.intention = undefined;
		this.intentionTarget = undefined;

		this.actionTimer = new Timer;
		this.actionFrame = 0;
		this.jumpHeight = 0;

		this.weapon = undefined;
	}

	takeOrder() {
		this.shelter = undefined;
	}

	takeDamage(amt) {

		this.hitPoints -= amt;

		if (this.hitPoints <= 0) {

			this.destroy();
		}
	}

	destroy() {

		const array = this instanceof PlayerUnit ? GLOBAL.units : GLOBAL.enemies;

		const index = array.indexOf(this);
		if (index != -1) {
			array.splice(index, 1);
		}

		super.destroy();
	}

	render() {

		// pre render

		if (this.shelter) {

			drawTile(
				this.pos.add(vec2(0,  8 / 12)),
				vec2(0.8),
				this.tileInfo
			);
			return;
		}

		const step = Math.floor(this.walkFrame / 10) % 2;
		// render
		drawTile(
			this.pos.add(vec2(0, step ? 1 / 12 : this.jumpHeight)),
			this.size,
			step ? this.walkTile : this.tileInfo,
			undefined,
			undefined,
			this.mirror
		);
	}
}