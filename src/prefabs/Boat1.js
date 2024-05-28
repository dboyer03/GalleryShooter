class Boat extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.boatSpeed 
        this.ship_random = Math.floor(Math.random() * 2)
    }

    update() {
        if(this.ship_random == 0){
            this.x -= this.moveSpeed
            if(this.x <= 0 - this.width) {
                this.x = game.config.width 
            }
        }   
        else{
            this.x += this.moveSpeed
            if(this.x > game.config.width + this.width){
                this.x = -30;
            }
            this.flipX = true;
        }
    }

    reset(){
        if(this.ship_random == 0){
            this.x = game.config.width
        }
        else{
            this.x = -30
        }
    }

    getRandom(){
        return this.ship_random 
    }

    speedUp(){
        this.moveSpeed = this.moveSpeed * 2
    }
}