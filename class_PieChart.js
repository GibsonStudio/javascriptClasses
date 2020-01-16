// BarGraph
// Jon Williams
// v1.0 14th December 2017


function PieChart (args) {

  var args = args || {};

  // object / canvas size
  this.size = args.size || 300;
  this.items = args.items || [];
  this.fontSize = args.fontSize || 12;
  this.title = args.title || '';
  this.includeLegend = (typeof args.includeLegend !== 'undefined') ? args.includeLegend : true;
  this.titleCss = args.titleCss || 'font-weight:bold;padding:10px;';
  this.legendWidth = args.legendWidth || this.size;
  this.legendCss = args.legendCss || 'margin:auto;border:1px solid #e2e2e2;font-size:12px;';
  this.legendTileSize = args.legendTileSize || 20;
  this.containerCss = args.containerCss || 'width:' + this.size + 'px;margin:auto;';

  //colors
  this.lineColor = args.lineColor || '#666666';

  // canvas
  this.canvasId = args.canvasId || 'BarGraph-' + Math.random().toString().substring(2);
  this.css = args.css || '';
  this.canvas = new Canvas({ id:this.canvasId, width:this.size, height:this.size, autoDrawCanvas:false, css:this.css });





  this.addItem = function (args) {

    var colors = ['#9bcbeb', '#00c389', '#005eb8', '#e89cae', '#78be20', '#ffef0f', '#f0b323', '#772583', '#855b4f', '#ff5c39', '#5d6439', '#003270', '#cccccc', '#a30b12', '#f9423a'];

    var args = args || {};
    args.color = args.color || colors[this.items.length % colors.length];
    if (typeof args.position !== 'undefined') {
      this.items.splice(args.position, 0, new Item(args));
    } else {
      this.items.push(new Item(args));
    }
  }




  this.getPercent = function (value)
  {
    return (value / this.getTotal()) * 100;
  }


  this.getTotal = function ()
  {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
      total += this.items[i].value;
    }
    return total;
  }


  this.draw = function ()
  {

    this.canvas.clear();
    if (this.backgroundColor) { this.canvas.clear(this.backgroundColor); }

    var start_angle = 0;

    for (var i = 0; i < this.items.length; i++) {
      var end_angle = start_angle + (this.getPercent(this.items[i].value) * 3.6);
      this.canvas.wedge((this.size/2), (this.size/2), (this.size / 2), start_angle, end_angle, { strokeStyle:this.lineColor, fillStyle:this.items[i].color });
      start_angle = end_angle;
    }

  } // this.draw() end



  this.addLegend = function ()
  {
    var html = this.getLegend();
    document.write(html);
  }

  this.getLegend = function ()
  {

    var html = '<table style="width:' + this.legendWidth + 'px;' + this.legendCss + '">';
    html += '<tr><td colspan="2" style="font-size:' + this.fontSize + 'px;font-weight:bold;">Legend</td></td>';

    for (var i = 0; i < this.items.length; i++) {
      var percent = Math.round(this.getPercent(this.items[i].value) * 100) / 100;
      html += '<tr>';
      html += '<td style="width:' + this.legendTileSize +'px;height:' + this.legendTileSize + 'px;background-color:' + this.items[i].color + ';"></td>';
      html += '<td style="text-align:left;font-size:' + this.fontSize + 'px;padding-left:10px;">' + this.items[i].label + ' (' + percent + '%)</td>';
      html += '</tr>';
    }

    html += '</table>';
    return html;

  } // this.getLegend() end


  this.render = function ()
  {

    document.write('<div style="' + this.containerCss + '">');
    document.write('<div style="' + this.titleCss + '">' + this.title + '</div>');
    document.write(this.canvas.html());
    if (this.includeLegend) { document.write(this.getLegend()); }
    document.write('</div>');
    this.draw();

  }


}



function Item (args) {

  var colors = [];
  colors.push('#df0000');
  colors.push('#00df00');
  colors.push('#0000df');

  var args = args || {};
  this.value = args.value || 1;
  this.label = args.label || '';
  this.color = args.color || false;

}
