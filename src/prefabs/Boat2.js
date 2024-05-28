class Boat2 extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveSpeed = game.settings.boatSpeed * 1.9
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
            if(this.x > game.config.width){
                this.x = 0;
            }
            this.flipX = true;
        }
    }

    reset(){
        if(this.ship_random == 0){
            this.x = game.config.width
        }
        else{
            this.x = 0
        }
    }

    speedUp(){
        this.moveSpeed = this.moveSpeed * 2
    }
}