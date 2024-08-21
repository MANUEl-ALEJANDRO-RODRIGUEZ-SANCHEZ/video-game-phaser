const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#1a1a1a',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

let player;
let obstacles;
let score = 0;
let scoreText;
let gameOver = false;

function preload() {
    this.load.image('player', 'assets/images/player.png');
    this.load.image('obstacle', 'assets/images/meteorite.png');
}

function create() {
    player = this.physics.add.image(100, 100, 'player').setScale(0.5);
    player.setCollideWorldBounds(true);

    obstacles = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });

    this.input.on('pointermove', function (pointer) {
        player.x = pointer.x;
        player.y = pointer.y;
    });

    this.time.addEvent({
        delay: 1000,
        callback: addObstacle,
        callbackScope: this,
        loop: true
    });

    this.physics.add.overlap(player, obstacles, hitObstacle, null, this);
}

function update() {
    if (gameOver) {
        this.physics.pause();
        scoreText.setText('Game Over! Final Score: ' + score);
    } else {
        score += 1;
        scoreText.setText('Score: ' + score);
    }
}

function addObstacle() {
    if(!gameOver){
        const x = Phaser.Math.Between(0, 800);
        const y = Phaser.Math.Between(0, 600);
        const obstacle = obstacles.create(x, y, 'obstacle').setScale(0.5);
    
        // Determine direction to move towards the player
        const angle = Phaser.Math.Angle.Between(obstacle.x, obstacle.y, player.x, player.y);
        this.physics.velocityFromRotation(angle, 200 + score * 0.1, obstacle.body.velocity);
    
        obstacle.setCollideWorldBounds(false);
    }
}

function hitObstacle(player, obstacle) {
    gameOver = true;
    gameOverScreen();
    player.setTint(0xff0000);
    obstacle.setTint(0xff0000);
}

const $screenGameOver = document.createElement("div"),
    $btnGameOver = document.createElement("button");

$btnGameOver.id = "btnGameOver";
$screenGameOver.id = "scrGameOver";
$screenGameOver.innerHTML = `
    Game Over! <br/>
`;
$btnGameOver.innerText = "Click to Restart";
$screenGameOver.appendChild($btnGameOver);

function gameOverScreen(){
    document.body.appendChild($screenGameOver);
}

function reload(){
    location.reload()
}

$btnGameOver.addEventListener("click", reload);