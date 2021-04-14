const fs = require('fs').promises;
const path = require('path');
const nbt = require('prismarine-nbt');

let levelPath = path.resolve(`${process.env.APPDATA}/.minecraft/saves/Demo_World/level.dat`);

fs.readFile(levelPath).then(buffer => {
	nbt.parse(buffer, async (error, data) => {
		if (error)
			console.error(error);
		let oldValue = data.value.Data.value.Time.value;
		let newValue = [0, 1000];
		data.value.Data.value.Time.value = newValue;
		let outBuffer = nbt.writeUncompressed(data);
		await fs.writeFile(levelPath, outBuffer);
		console.log(`done: ${oldValue} => ${newValue}`);
	});
});

