
var numSteps = 400;


const el = document.querySelector(".triangleInv");
const el2 = document.querySelector(".triangle");

function buildThresholdList() {
    var thresholds = [];
  
    for (var i=1.0; i<=numSteps; i++) {
      var ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
  }
  
const options = {
    rootMargin: "-150px",
    threshold:  buildThresholdList()
}


const observer = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
        entry.target.style.setProperty('--color', "rgba(255, 193, 7,"+ entry.intersectionRatio * 9 + ")" )
    });
}, options);


observer.observe(el)
observer.observe(el2)