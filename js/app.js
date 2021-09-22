var app = {
  init: function () {
    app.drawBoard();
    app.listenKeyboardEvents();
    app.listenNextLevel();
  },
  player: {
    x: 0,
    y: 0,
    direction: 'right',
  },
  targetCell: {
    x: 5,
    y: 3,
    maxX: 5,
    maxY: 3,
  },
  gameOver: false,
  nbMoves: 0,
  nextLvl: '',
  drawBoard: function () {
    for (line = 0; line < 4; line++) {
      var row = document.createElement('div');
      row.className = 'row' + line;
      row.style.display = 'flex';
      document.querySelector('.board').appendChild(row);

      for (var column = 0; column < 6; column++) {
        var cell = document.createElement('div');
        cell.className = 'cell';
        cell.style.width = '70px';
        cell.style.height = '70px';
        cell.style.border = 'dashed 1px #ddd';
        if (line === app.targetCell.y && column === app.targetCell.x) {
          let target = document.createElement('div');
          target.className = 'cell'
          target.classList.add("targetCell");
          cell.appendChild(target);
        } else if (line === app.player.y && column === app.player.x) {
          var divPlayer = document.createElement('div');
          divPlayer.classList.add("player");
          divPlayer.classList.add(app.player.direction);
          cell.appendChild(divPlayer);
        }
        row.appendChild(cell);
      }
    }
    app.isGameOver();
  },
  clearBoard: function () {
    document.querySelector('.board').innerHTML = '';
  },
  redrawBoard: function () {
    app.clearBoard();
    app.drawBoard();
  },
  turnLeft: function () {
    if (app.gameOver === false) {
      if (app.player.direction === 'left') {
        app.player.direction = 'down';
      } else if (app.player.direction === 'down') {
        app.player.direction = 'right';
      } else if (app.player.direction === 'right') {
        app.player.direction = 'up';
      } else if (app.player.direction === 'up') {
        app.player.direction = 'left';
      };
      app.redrawBoard();
    }
  },
  turnRight: function () {
    if (app.gameOver === false) {
      if (app.player.direction === 'left') {
        app.player.direction = 'up';
      } else if (app.player.direction === 'up') {
        app.player.direction = 'right';
      } else if (app.player.direction === 'right') {
        app.player.direction = 'down';
      } else if (app.player.direction === 'down') {
        app.player.direction = 'left';
      };
      app.redrawBoard();
    }
  },
  moveForward: function () {
    if (app.gameOver === false) {
      if (app.player.direction === 'left' && app.player.x > 0) {
        app.player.x = app.player.x - 1
      } else if (app.player.direction === 'up' && app.player.y > 0) {
        app.player.y = app.player.y - 1
      } else if (app.player.direction === 'right' && app.player.x < 5) {
        app.player.x = app.player.x + 1
      } else if (app.player.direction === 'down' && app.player.y < 3) {
        app.player.y = app.player.y + 1
      };
      app.redrawBoard();
    }
  },
  listenKeyboardEvents: function () {
    document.addEventListener('keyup', function (e) {
      let keyPressed = e.key;
      switch (keyPressed) {
        case 'ArrowDown':
          if (app.player.direction === 'left') {
            app.turnLeft();
          } else if (app.player.direction === 'right') {
            app.turnRight();
          } else if (app.player.direction === 'up') {
            app.turnRight();
            app.turnRight();
          } else if (app.player.direction === 'down') {
            app.moveForward();
          };
          app.nbMoves = app.nbMoves + 1;
          break;
        case 'ArrowRight':
          if (app.player.direction === 'left') {
            app.turnLeft();
            app.turnLeft();
          } else if (app.player.direction === 'right') {
            app.moveForward();
          } else if (app.player.direction === 'up') {
            app.turnRight();
          } else if (app.player.direction === 'down') {
            app.turnLeft();
          };
          app.nbMoves = app.nbMoves + 1;
          break;
        case 'ArrowUp':
          if (app.player.direction === 'left') {
            app.turnRight();
          } else if (app.player.direction === 'right') {
            app.turnLeft();
          } else if (app.player.direction === 'up') {
            app.moveForward();
          } else if (app.player.direction === 'down') {
            app.turnLeft();
            app.turnLeft();
          };
          app.nbMoves = app.nbMoves + 1;
          break;
        case 'ArrowLeft':
          if (app.player.direction === 'left') {
            app.moveForward();
          } else if (app.player.direction === 'right') {
            app.turnRight();
            app.turnRight();
          } else if (app.player.direction === 'up') {
            app.turnLeft();
          } else if (app.player.direction === 'down') {
            app.turnRight();
          };
          app.nbMoves = app.nbMoves + 1;
          break;
        default:
          console.log('Il faut une touche haut/bas/gauche/droite');

      };
      if (app.player.x !== app.targetCell.x || app.player.y !== app.targetCell.y) {
        document.querySelector('.moves').innerHTML = app.nbMoves;
      }
    });
  },
  isGameOver: function () {
    if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
      app.gameOver = true;
      app.nbMoves = app.nbMoves + 1;
      document.querySelector('.nbMoves').innerHTML = 'Fini en : ' + app.nbMoves + ' déplacements !';
      document.querySelector('.targetCell').style.backgroundImage = "url('img/cup.png')";
      document.querySelector('.nextLvl').innerHTML = 'Niveau suivant';
    };
  },
  nextLevel: function () {
    let randomX = app.getRandomX();
    let randomY = app.getRandomY();
    console.log(randomX);
    console.log(randomY);
    while (randomX === 0 || randomY === 0) {
      randomX = app.getRandomX();
      randomY = app.getRandomY();
    };
    app.targetCell.x = randomX
    app.targetCell.y = randomY;
    app.player.x = 0;
    app.player.y = 0;
    app.player.direction = 'right';
    app.gameOver = false;
    app.nbMoves = 0;
    app.nextLvl = '';
    document.querySelector('.nbMoves').innerHTML = 'Nombre de déplacements : <span class="moves">0</span>';
    document.querySelector('.nextLvl').innerHTML = '';
    app.redrawBoard();
  },
  getRandomX: function () {
    return Math.round(Math.random() * app.targetCell.maxX);
  },
  getRandomY: function () {
    return Math.round(Math.random() * app.targetCell.maxY);
  },
  listenNextLevel: function () {
    document.querySelector('.nextLvl').addEventListener('click', function () {
      app.nextLevel();
    });
  },
};
document.addEventListener('DOMContentLoaded', app.init);