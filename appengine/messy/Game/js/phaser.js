var config = {
    type: Phaser.AUTO,
    parent: 'display',
    width: 200,
    height: 200,
    scene: [chooseCharacter, menuBoy, menuGirl, karachiBoy, londonBoy, turkeyBoy]
};

var game = new Phaser.Game(config);

//  create() {
        
//         //Background
//          player = this.add.sprite(400, 300, 'pencil').setScale(0.3,0.24);
//          // this.physics.add.existing(player);
//          player.setInteractive();
//          player.on('pointerdown', function(event) {console.log('asdasd');});
//          cursors = this.input.keyboard.createCursorKeys();      

//         // player.inputEnabled = true;
//         // player.input.enableDrag();

//         console.log(player);


//     }

//     update() {
//         if (cursors.left.isDown)
//         {
//             player.setVelocityX(-160);

//             // player.anims.play('left', true);
//         }
//         else if (cursors.right.isDown)
//         {
//             player.setVelocityX(160);

//             // player.anims.play('right', true);
//         }
//         else
//         {
//             // player.setVelocityX(0);

//             // player.anims.play('turn');
//         }

//         if (cursors.up.isDown && player.body.touching.down)
//         {
//             player.setVelocityY(-330);
//         }
//     }

//     render() {

//         // Input debug info
//         this.debug.inputInfo(32, 32);
//         // this.debug.spriteInputInfo(sprite, 32, 130);
//         this.debug.pointer(this.input.activePointer);

//     }

// }









// this.input.setDefaultCursor('url(assets/input/cursors/blue.cur), pointer');

//     var sprite = this.add.sprite(400, 300, 'eye').setInteractive({ cursor: 'url(assets/input/cursors/pen.cur), pointer' });