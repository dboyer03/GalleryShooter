
class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    //load objects beforehand 
    preload(){

        this.load.image('player', './assets/cannonBall.png')
        this.load.image('boat', './assets/boat.png')
        this.load.image('water', './assets/water.jpeg')
        this.load.image('boat2', './assets/boat2.png')


    }
    //makes an object
    create(){

        let menuConfig = {
            fontFamily: 'Courier', 
            fontSize: '28px',
            backgroundColor: '#0366a3',
            color: '#000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 
        }
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'High Seas Showdown', menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2, 'Arrow keys to move & F key to shoot', menuConfig).setOrigin(0.5)
        menuConfig.backgroundColor = "#0366A3"
        menuConfig.color = "#000"
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press right arrow to begin', menuConfig).setOrigin(0.5)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    
    }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            //easy mode
            game.settings = {
                boatSpeed: 3,
                gameTimer: 60000
            }

            this.scene.start('playScene')
        }
    }
}