class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.isFiring = false
        this.moveSpeed = 2
        this.visible = false
    }

    update(){
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed
            }
            else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed
            }
        }
        if(Phaser.Input.Keyboard.JustDown(shoot) && !this.isFiring){
            this.isFiring = true
            this.visible = true
        }
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed
        }
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false
            this.visible = false
            this.y = game.config.height - borderUISize - borderPadding
        } 
    }

    reset(){
        this.isFiring = false
        this.visible = false
        this.y = game.config.height - borderUISize - borderPadding
    }
}
