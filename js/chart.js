var myCanvas = document.getElementById("chart");
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(text, value, ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX + 50,upperLeftCornerY + 20,width - 100,height - 40);
  ctx.restore();
  ctx.save();
  ctx.textBaseline="bottom";
  ctx.textAlign="center";
  ctx.fillStyle = "#000000";
  ctx.font = "bold 14px Arial";
  ctx.fillText(text, upperLeftCornerX + width / 2,upperLeftCornerY + height);
  ctx.font = "bold 20px Arial";
  ctx.fillText(value, upperLeftCornerX + width / 2,upperLeftCornerY + 20);
  this.ctx.restore();
}

var Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;

  this.draw = function(){
      var maxValue = 0;
      for (var categ in this.options.data){
          maxValue = Math.max(maxValue,this.options.data[categ]);
      }
      var canvasActualHeight = this.canvas.height - this.options.padding * 2;
      var canvasActualWidth = this.canvas.width - this.options.padding * 2;

      //drawing the grid lines
      var gridValue = 0;
      while (gridValue <= maxValue){
          var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
          drawLine(
              this.ctx,
              0,
              gridY,
              this.canvas.width,
              gridY,
              this.options.gridColor
          );
           
          //writing grid markers
          this.ctx.save();
          this.ctx.fillStyle = this.options.gridColor;
          this.ctx.font = "bold 10px Arial";
          this.ctx.fillText(gridValue, 10,gridY - 2);
          this.ctx.restore();

          gridValue+=this.options.gridScale;
      }

      //drawing the bars
      var barIndex = 0;
      var numberOfBars = Object.keys(this.options.data).length;
      var barSize = (canvasActualWidth)/numberOfBars;

      for (categ in this.options.data){
          var val = this.options.data[categ];
          var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
          drawBar(
              categ,
              val,
              this.ctx,
              this.options.padding + barIndex * barSize,
              this.canvas.height - barHeight - this.options.padding,
              barSize,
              barHeight,
              this.colors[barIndex%this.colors.length]
          );

          barIndex++;
      }

  }
}

var myVinyls = {
  "Classical music": 17,
  "Alternative rock": 9,
  "Pop": 4,
};

var myBarchart = new Barchart(
  {
      canvas:myCanvas,
      padding:10,
      gridScale:5,
      gridColor:"#eeeeee",
      data:myVinyls,
      colors:["#6699ff","#6699ff", "#6699ff","#6699ff"]
  }
);
myBarchart.draw();