//menu class inherits from phaser scenes 
class Play extends Phaser.Scene{

    constructor(){
        super("playScene")
    }

    create(){

        this.water = this.add.tileSprite(0, 0, 640, 480, 'water').setOrigin(0,0)
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x039DFC).setOrigin(0,0)

        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, 0 , borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)

        this.player1 = new Player(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'player').setOrigin(0.5,0.5)

        //keys
        shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    

        this.boat01 = new Boat(this, game.config.width + borderUISize * 6, borderUISize * 4, 'boat', 0, 30).setOrigin(0,0)
        this.boat02 = new Boat(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'boat', 0, 20).setOrigin(0,0)
        this.boat03 = new Boat(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'boat', 0, 10).setOrigin(0,0)
        //changing positions if their directions change
        if(this.boat01.getRandom() == 1){
            this.boat01.setX(-100)
        }
        if(this.boat02.getRandom() == 1){
            this.boat02.setX(-250)
        }
        if(this.boat03.getRandom() == 1){
            this.boat03.setX(-370)
        }
        //the fastest boat 
        this.speedyBoat = new Boat2(this, game.config.width, borderUISize * 8 + borderPadding * 5, 'boat2',0,50).setOrigin(0,0)
        //score
        this.p1Score = 0
        //display the score 
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#0366a3',
            color: '#000',
            align: 'right',
            padding:{
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig)
        this.speed_up = false
        this.timer = this.time.addEvent({delay: 30000, callback: () => {this.speed_up = true}, loop: false})
        this.text = this.add.text(borderUISize + 450, borderUISize + borderPadding * 2, '', scoreConfig);


        //game over flag
        this.gameOver = false 

        //60 seconds play clock 
        scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5)
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5)
            this.gameOver = true 
        }, null, this)
    }

    update(){
        //check key input for restarting 
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(restart)) {
            this.scene.restart() 
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start('menuScene')
        }
        this.water.tilePositionX -= 4
        if(this.checkCollison(this.player1, this.boat03)){
            this.player1.reset()
            this.boatExplode(this.boat03)
        }
        if(this.checkCollison(this.player1, this.boat02)){
            this.player1.reset()
            this.boatExplode(this.boat02)
        }
        if(this.checkCollison(this.player1, this.boat01)){
            this.player1.reset()
            this.boatExplode(this.boat01)
        }
        if(this.checkCollison(this.player1, this.speedyBoat)){
            this.player1.reset()
            this.boatExplode(this.speedyBoat)
        }

        if(!this.gameOver){
            this.player1.update()
            this.boat01.update()
            this.boat02.update()
            this.boat03.update()
            this.speedyBoat.update()

            if(this.speed_up == true){
                this.boat01.speedUp()
                this.boat02.speedUp()
                this.boat03.speedUp()
                this.speedyBoat.speedUp()
                this.speed_up = false;
            }
        }

        this.timerProgress = this.clock.getRemainingSeconds()
        this.text.setText(`${Math.round(this.timerProgress)}`);
    }

    //collison checking
    checkCollison(ball, boat){

        if(ball.x < boat.x + boat.width && ball.x + ball.width > boat.x && ball.y < boat.y + boat.height && ball.height + ball.y > boat.y){
            return true 
        }
        else{
            return false 
        }
    }

    boatExplode(boat){
        //hide the boat temp 
        boat.alpha = 0

        //score add and update the text
        this.p1Score += boat.points
        this.scoreLeft.text = this.p1Score
    }


    speedUpdate(boat){
        boat.moveSpeed = boat.moveSpeed * 2
    }
}