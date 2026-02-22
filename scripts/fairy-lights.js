(function () {
  if (!document.body.classList.contains('mariage-body')) return;

  // [r, g, b] for each color
  const COLORS = [
    [255, 236, 195],  // golden
    [252, 225, 165],  // warm cream
    [255, 175, 181],  // pink
    [198, 155, 194],  // lavender
    [210, 222, 239],  // light blue
    [186, 212, 181],  // sage green
    [202, 228, 197],  // light green
  ];

  const COUNT = 22;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randPx(range) {
    return Math.round(rand(-range, range)) + 'px';
  }

  for (var i = 0; i < COUNT; i++) {
    var el = document.createElement('div');
    el.className = 'fairy-light';

    var size = rand(2.5, 5.5);
    var rgb = COLORS[Math.floor(rand(0, COLORS.length))];
    var color = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + rand(0.5, 0.8).toFixed(2) + ')';
    var halo = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ', 0.3)';
    var travel = rand(30, 80);

    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.backgroundColor = color;
    el.style.setProperty('--halo-color', halo);
    el.style.left = rand(2, 98) + '%';
    el.style.top = rand(2, 98) + '%';
    el.style.setProperty('--wander-dur', rand(12, 28).toFixed(1) + 's');
    el.style.setProperty('--pulse-dur', rand(3, 8).toFixed(1) + 's');
    el.style.setProperty('--pulse-delay', rand(0, 5).toFixed(1) + 's');
    el.style.setProperty('--min-opacity', rand(0.2, 0.5).toFixed(2));
    el.style.setProperty('--max-opacity', rand(0.7, 1).toFixed(2));
    el.style.setProperty('--dx1', randPx(travel));
    el.style.setProperty('--dy1', randPx(travel));
    el.style.setProperty('--dx2', randPx(travel));
    el.style.setProperty('--dy2', randPx(travel));
    el.style.setProperty('--dx3', randPx(travel));
    el.style.setProperty('--dy3', randPx(travel));

    document.body.appendChild(el);
  }
})();
