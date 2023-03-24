// Variables globales
const canvas = document.getElementById("game-canvas");
const context = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 9 * boxSize, y: 10 * boxSize }];
let direction = "";
let food = {
  x: Math.floor(Math.random() * 19 + 1) * boxSize,
  y: Math.floor(Math.random() * 19 + 1) * boxSize,
};

// Evento de teclado
document.addEventListener("keydown", (event) => {
  if (event.code === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.code === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (event.code === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.code === "ArrowRight" && direction !== "left") {
    direction = "right";
  }
});

// Dibuja la serpiente
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "white";
    context.fillRect(snake[i].x, snake[i].y, boxSize, boxSize);
  }
}

// Dibuja la comida
function drawFood() {
  context.fillStyle = "red";
  context.fillRect(food.x, food.y, boxSize, boxSize);
}

// Mueve la serpiente
function moveSnake() {
  let head = { x: snake[0].x, y: snake[0].y };

  if (direction === "up") {
    head.y -= boxSize;
  } else if (direction === "down") {
    head.y += boxSize;
  } else if (direction === "left") {
    head.x -= boxSize;
  } else if (direction === "right") {
    head.x += boxSize;
  }

  // Agrega la nueva cabeza
  snake.unshift(head);

  // Verifica si la serpiente come la comida
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 19 + 1) * boxSize,
      y: Math.floor(Math.random() * 19 + 1) * boxSize,
    };
  } else {
    // Elimina la cola
    snake.pop();
  }
}

// Verifica si la serpiente choca
function checkCollision() {
  let head = snake[0];

  // Choca con las paredes
  if (head.x < 0 || head.x > 19 * boxSize || head.y < 0 || head.y > 19 * boxSize) {
    clearInterval(game);
  }

  // Choca con su cuerpo
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      clearInterval(game);
    }
  }
}

// Bucle principal del juego
function gameLoop() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

// Inicia el juego
let game = setInterval(gameLoop, 100);
