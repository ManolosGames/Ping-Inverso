var barraAltura,
    barraLargura,
    jogadorPosicaoX,
    velocidadeJogador,
    diametroBola,
    bolaPosX,
    bolaPosY,
    velocidadeBola,
    pontosJogador,
    colisao,
    refreshIntervalId;


    function Game() {
      colisao = false;
      pontosJogador = 0;
      barraAltura = 15;
      barraLargura = 90;

      velocidadeJogador = 20;

      jogadorPosicaoX = (canvas.width - barraLargura) / 2;

      diametroBola = 10;
      bolaPosX = canvas.width / 2;
      bolaPosY = -10;
      velocidadeBola = 4;

      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");

      document.addEventListener('keydown', keyDown);
      refreshIntervalId = setInterval(gameLoop, 30);
    }

    function keyDown(e) {
      if(e.keyCode == 37) {
        if(jogadorPosicaoX > 0) {
          jogadorPosicaoX -= velocidadeJogador;
        }
      }

      if(e.keyCode == 39) {
        if(jogadorPosicaoX < (canvas.width - barraLargura)) {
          jogadorPosicaoX += velocidadeJogador;
        }
      }
      if(e.keyCode == 13) {
        inicializar();
      }
    }

    function gameLoop() {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(bolaPosX, bolaPosY, diametroBola, 0 , Math.PI * 2, true);
      context.fill();
      context.fillRect(jogadorPosicaoX, canvas.height - barraAltura, barraLargura, barraAltura);
      if(bolaPosY <= canvas.height) {
        bolaPosY += velocidadeBola;
      } else {
        bolaPosX = Math.random() * 600;
          bolaPosY = -10;
        colisao = false;
      }
      if((bolaPosX > jogadorPosicaoX && bolaPosX < jogadorPosicaoX + barraLargura) && bolaPosY >= canvas.height - barraAltura && colisao === false) {
        pontosJogador++;
        if(((pontosJogador % 10) === 0) && pontosJogador > 0){
          velocidadeBola += 2;
        }
        colisao = true;
      }
      if(bolaPosY >= canvas.height && colisao === false) {
        pontosJogador--;
      }
      if(pontosJogador < 0) {
        context.clearRect(0 ,0 ,canvas.width, canvas.height);
        context.font = "38pt Tahoma";
        context.fillText("GAME OVER", (canvas.width - 300) / 2, canvas.height / 2);
        clearInterval(refreshIntervalId);
      } else {
        context.font = "32pt Tahoma";
        context.fillText(pontosJogador, canvas.width - 70, 50);
      }
    }
