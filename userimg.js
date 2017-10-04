// generate avatar
function avatar(size,name)
{
	const hashLength = 19;
	// 	because javascript doesn't have a seedable random generator...
	Math.radians = function(degrees)
	{
		return degrees * Math.PI / 180;
	}
	
	String.prototype.hashCode = function() 
	{
		var hash = 0, i, chr;
		if (this.length === 0) return hash;
		for (i = 0; i < this.length; i++) 
		{
			chr   = this.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	};
	var hash = "";
	while(hash.length < hashLength)
	{
		hash += name.hashCode().toFixed(0);
	}
	hash = hash.substring(0, hashLength);
	// six main colors, three ints per color, one rotational value
	var colors = [hashLength];
	
	for(var i = 0; i < hash.length; i++)
	{
		colors[i] = parseInt((Math.sin(hash.charCodeAt(i)) * 255).toFixed(0));
		if (colors[i] < 0)
			colors[i] *= -1;
	}
	// make the color blocks a bit smaller to make the result less uniform
	const smallSize = size * 0.75;
	
	var canvas = document.createElement("canvas");
	canvas.height = smallSize * 3;
	canvas.width = smallSize * 3;
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "rgb(255,255,255)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(Math.radians(colors[hashLength - 1]));
	ctx.translate(-canvas.width / 2, -canvas.height / 2);
	var colorBase = 0;
	for (var y = 0; y < 3; y++)
	{
		ctx.fillStyle = "rgba(" + colors[colorBase] + "," + colors[colorBase + 1] + "," + colors[colorBase + 2] + ",0.8)";
		ctx.fillRect(0, smallSize * y, canvas.width, smallSize);
		colorBase += 3;
	}
	for (var x = 0; x < 3; x++)
	{
		ctx.fillStyle = "rgba(" + colors[colorBase] + "," + colors[colorBase + 1] + "," + colors[colorBase + 2] + ",0.8)";
		ctx.fillRect(smallSize * x, 0, smallSize, canvas.height);
		colorBase += 3;
	}
	var canvas2 = document.createElement("canvas");
	canvas2.height = size;
	canvas2.width = size;
	var ctx2 = canvas2.getContext("2d");
	ctx2.drawImage(canvas,smallSize,smallSize,size,size,0,0,size,size);
	return canvas2.toDataURL();
}