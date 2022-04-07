var colors=['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee']

function pieChart(canvas, data, labels){
    var ctx = canvas.getContext("2d");
    var total = 0;
    var lastend = 0;
    for(var e = 0; e < data.length; e++)
        total += data[e];
    var off = 10
    var w = (canvas.width - off) / 2
    var h = (canvas.height - off) / 2

    for (var i = 0; i < data.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.strokeStyle ='black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(w,h);
        var len =  (data[i]/total) * 2 * Math.PI
        var r = h - off / 2
        ctx.arc(w , h, r, lastend,lastend + len,false);
        ctx.lineTo(w,h);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle ='black';
        ctx.font = "11px Consolas";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var mid = lastend + len / 2
        ctx.fillText(labels[i] + ' (' + String(data[i]) + ')',w + Math.cos(mid) * (r/2) , h + Math.sin(mid) * (r/2));
        lastend += Math.PI*2*(data[i]/total);
      }
}

function barChart(canvas, data, labels){
    var ctx = canvas.getContext("2d");
    var max = 0;
    for(var e = 0; e < data.length; e++)
        if (data[e] > max)
            max = data[e]
    
    var barWidth = canvas.width/data.length;
    var barMaxHeight = canvas.height;
    for(var i = 0; i< data.length; i++){
        ctx.fillStyle = colors[i];
        ctx.strokeStyle ='black';
        ctx.lineWidth = 1;
        let barHeight = data[i]/max * barMaxHeight;
        ctx.fillRect(i*barWidth,canvas.height - barHeight, barWidth, barHeight);
        ctx.stroke();
        ctx.fillStyle ='black';
        ctx.font = "11px Consolas";
        // ctx.textAlign = "center";
        // ctx.textBaseline = "middle";
        var mid = i*barWidth + barWidth/4;
        ctx.fillText(labels[i] + ' (' + String(data[i]) + ')', mid, canvas.height - barHeight+20);

    }
}

export {pieChart, barChart}