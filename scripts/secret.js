

var queue = [0,0,0,0,0,0,0,0,0,0,0];
var goal = JSON.stringify(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'])

document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;

    queue.shift()
    queue.push(name)


    if(JSON.stringify(queue)==goal){
        window.location.assign("http://remigonin.fr/secret.html")
    }
    
  }, false);