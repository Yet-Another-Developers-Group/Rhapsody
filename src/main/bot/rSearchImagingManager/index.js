const { createCanvas, registerFont, loadImage } = require('canvas');
const { millisecondsToHMSString } = require('../rUtilities/rUtilities');

registerFont('rSearchImagingManager/fonts/reg.otf', {
	family: 'InterDisplayRegular'
});
registerFont('rSearchImagingManager/fonts/sb.otf', {
	family: 'InterDisplaySemibold'
});

class rSearchImagingManager {
	static async drawSearchResults(array) {

		const canvas = createCanvas(750, 635);
		const ctx = canvas.getContext('2d');

		var titleFadeOutGradient=ctx.createLinearGradient(0,0,612,0);
		titleFadeOutGradient.addColorStop(0,'#dcddde');
		titleFadeOutGradient.addColorStop(0.9,'#dcddde');
		titleFadeOutGradient.addColorStop(1.0,'rgba(220, 221, 222, 0)');
	
		var informationFadeOutGradient=ctx.createLinearGradient(0,0,612,0);
		informationFadeOutGradient.addColorStop(0,'#95999d');
		informationFadeOutGradient.addColorStop(0.9,'#95999d');
		informationFadeOutGradient.addColorStop(1.0,'rgba(149, 153, 157, 0)');
		
		for (let i = 0; i < array.length; i++) {
			const track = array[i];

			const padding = i == 0 ? 0 : 20*i;
			ctx.font = '30px "InterDisplayRegular"';
			ctx.fillStyle = titleFadeOutGradient;
			ctx.fillText((i+1+'. ') + track.info.title, 5, (padding+30+(i*100)));
		
			ctx.font = '20px "InterDisplaySemibold"';
			ctx.fillStyle = informationFadeOutGradient;
			ctx.fillText(track.info.author, 5, (padding+((i+1)*100)-25));
			ctx.fillText(track.info.isStream ? 'LIVE STREAM' : millisecondsToHMSString(track.info.length), 5, (padding+((i+1)*100)));
			await loadImage(`https://img.youtube.com/vi/${track.info.identifier}/hqdefault.jpg`).then((image) => {
				ctx.drawImage(image, 612, padding+(i*100), 133, 100);
			});
		}

		ctx.font = '20px "InterDisplaySemibold"';
		ctx.fillStyle = '#dcddde';
		ctx.fillText('Reply to this message with 1/2/3/4/5 to chose a song to play. Reply with \'cancel\' to', 5, 610);
		ctx.fillText('cancel this search.', 5, 635);

		return new Promise((resolve) => {
			const buffer = canvas.toBuffer('image/png');
			resolve(buffer);
		});
	}
}



module.exports = rSearchImagingManager;
