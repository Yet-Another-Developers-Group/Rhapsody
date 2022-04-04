const si = require('systeminformation');

async function getServerInfo() {
	var information = {
		'cpu': {},
		'system': {},
		'os': {},
		'mem': {},
	};

	await si.cpu().then((data) => {
		information.cpu.manufacturer = (data.manufacturer);
		information.cpu.brand = (data.brand);
		information.cpu.speed = (data.speed);
		information.cpu.cores = (data.cores);
		information.cpu.physicalCores = (data.physicalCores);
	});
	await si.system().then((data) => {
		information.system.manufacturer = (data.manufacturer);
		information.system.model = (data.model);
	});
	await si.osInfo().then((data) => {
		information.os.platform = (data.platform);
		information.os.release = (data.release);
		information.os.arch = (data.arch);
	});
	await si.mem().then((data) => {
		information.mem.total = (data.total);
	});
     
	return information;
}

module.exports = getServerInfo;