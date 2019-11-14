function rgb2hex(orig){
  var rgb = orig.replace(/\s/g,'').match(/^rgba?\((\d+),(\d+),(\d+)/i);
  return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : orig;
 }

(function() {
  console.log('page loaded');
  console.log("Height - " + Math.max(document.documentElement.clientHeight, window.innerHeight || 0));
  console.log(rgb2hex(getComputedStyle(document.body).backgroundColor));
}());
