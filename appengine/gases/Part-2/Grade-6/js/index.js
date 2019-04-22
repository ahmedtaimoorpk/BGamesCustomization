function gameInit(){

var game = new Phaser.Game(400, 300, Phaser.CANVAS, 'game_gases', {


  preload: function(){
    this.game.load.crossOrigin = true;
    this.stage.backgroundColor = "#ececec";
    // this.scale.pageAlignHorizontally = true;
    // this.scale.pageAlignVertically = true;
    // this.load.crossOrigin = 'anonymous';

    this.game.load.image('background', 'gases/Part-2/Grade-6/assets/background.png');
    this.game.load.image('footer', 'gases/Part-2/Grade-6/assets/footer.png');
    this.game.load.image('img1', 'gases/Part-2/Grade-6/assets/wheel-1.png');
    this.game.load.image('img2', 'gases/Part-2/Grade-6/assets/img2.png');
    this.game.load.image('img3', 'gases/Part-2/Grade-6/assets/img3.png');
    this.game.load.image('img4', 'gases/Part-2/Grade-6/assets/img4.png');
    this.game.load.image('img5', 'gases/Part-2/Grade-6/assets/img5.png');
    this.game.load.image('img6', 'gases/Part-2/Grade-6/assets/img6.png');
    this.game.load.image('img7', 'gases/Part-2/Grade-6/assets/img7.png');

    // this.game.load.image('flecha', flechaURI);
  },



  create: function(){
    // this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // this.game.scale.pageAlignHorizontally = true;
    // this.game.scale.pageAlignVertically = true;
    //
    //
    // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    this.background = this.add.sprite(40, 0, 'background');
    this.background.scale.setTo(0.5,0.5);

    this.footer = this.add.sprite(0, 155, 'footer');


    img1 = this.game.add.sprite(95+this.background.x, 104.5, 'img1');
    img1.scale.setTo(0.5,0.5);
    // img1.anchor.setTo(1.4, 3.52);
    img1.visible = false;
    this.game.physics.arcade.enable(img1);
    img1.tint= 0xff00ff;

    item1 = this.game.add.sprite(50, 240, img1.key, img1.frame);
    item1.scale.setTo(0.5,0.5);
    item1.anchor.x = 0.5;
    this.game.physics.arcade.enable(item1);
    item1.inputEnabled = true;
    item1.input.enableDrag();
    item1.input.draggable = false;
    item1.originalPosition = item1.position.clone();
    item1.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, img1);
    }, this);
    item1.alpha= 0.5;

     // var tween = game.add.tween(item1).to( { alpha: 1 }, 2000, "Linear", true, 0, -1);
     // tween.yoyo(true, 3000);

    //img2

    this.img2 = this.game.add.sprite(82.5+this.background.x, 48, 'img2');
    this.img2.scale.setTo(0.5,0.5);
    // this.img2.anchor.setTo(4.7, 10.1);
    this.img2.visible = false;
    this.game.physics.arcade.enable(this.img2);
    this.img2.tint= 0xff00ff;

    item2 = this.game.add.sprite(100, 240, this.img2.key, this.img2.frame);
    item2.scale.setTo(0.5,0.5);
    item2.anchor.x = 0.5;
    this.game.physics.arcade.enable(item2);
    item2.inputEnabled = true;
    item2.input.enableDrag();
    item2.input.draggable = false;
    item2.originalPosition = item2.position.clone();
    item2.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.img2);
    }, this);
    item2.alpha= 0.5;


    //img3

    this.img3 = this.game.add.sprite(18+this.background.x, 77, 'img3');
    this.img3.scale.setTo(0.5,0.5);
    // this.img3.anchor.setTo(5.48, 6.46);
    this.img3.visible = false;
    this.game.physics.arcade.enable(this.img3);
    this.img3.tint= 0xff00ff;

    item3 = this.game.add.sprite(150, 240, this.img3.key, this.img3.frame);
    item3.scale.setTo(0.5,0.5);
    item3.anchor.x = 0.5;
    this.game.physics.arcade.enable(item3);
    item3.inputEnabled = true;
    item3.input.enableDrag();
    item3.input.draggable = false;
    item3.originalPosition = item3.position.clone();
    item3.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.img3);
    }, this);
    item3.alpha= 0.5;


    //img4

    this.img4 = this.game.add.sprite(117+this.background.x, 161, 'img4');
    this.img4.scale.setTo(0.5,0.5);
    // this.img4.anchor.setTo(2, 6.30);
    this.img4.visible = false;
    this.game.physics.arcade.enable(this.img4);
    this.img4.tint= 0xff00ff;

    item4 = this.game.add.sprite(200, 240, this.img4.key, this.img4.frame);
    item4.scale.setTo(0.5,0.5);
    item4.anchor.x = 0.5;
    this.game.physics.arcade.enable(item4);
    item4.inputEnabled = true;
    item4.input.enableDrag();
    item4.input.draggable = false;
    item4.originalPosition = item4.position.clone();
    item4.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.img4);
    }, this);
    item4.alpha= 0.5;


    //img5

    this.img5 = this.game.add.sprite(228+this.background.x, 49, 'img5');
    this.img5.scale.setTo(0.5,0.5);
    // this.img5.anchor.setTo(-0.61, 4.65);
    this.img5.visible = false;
    this.game.physics.arcade.enable(this.img5);
    this.img5.tint= 0xff00ff;

    item5 = this.game.add.sprite(250, 240, this.img5.key, this.img5.frame);
    item5.scale.setTo(0.5,0.5);
    item5.anchor.x = 0.5;
    this.game.physics.arcade.enable(item5);
    item5.inputEnabled = true;
    item5.input.enableDrag();
    item5.input.draggable = false;
    item5.originalPosition = item5.position.clone();
    item5.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.img5);
    }, this);
    item5.alpha= 0.5;


    //img6

    this.img6 = this.game.add.sprite(133+this.background.x, 26, 'img6');
    this.img6.scale.setTo(0.5,0.5);
    // this.img6.anchor.setTo(1.32, 8.44);
    this.img6.visible = false;
    this.game.physics.arcade.enable(this.img6);
    this.img6.tint= 0xff00ff;

    item6 = this.game.add.sprite(300, 240, this.img6.key, this.img6.frame);
    item6.scale.setTo(0.5,0.5);
    item6.anchor.x = 0.5;
    this.game.physics.arcade.enable(item6);
    item6.inputEnabled = true;
    item6.input.enableDrag();
    item6.input.draggable = false;
    item6.originalPosition = item6.position.clone();
    item6.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.img6);
    }, this);
    item6.alpha= 0.5;


    //img7

    this.img7 = this.game.add.sprite(58+this.background.x, 22, 'img7');
    this.img7.scale.setTo(0.5,0.5);
    // this.img7.anchor.setTo(1, 1);
    this.img7.visible = false;
    this.game.physics.arcade.enable(this.img7);
    this.img7.tint= 0xff00ff;

    item7 = this.game.add.sprite(350, 240, this.img7.key, this.img7.frame);
    item7.scale.setTo(0.5,0.5);
    item7.anchor.x = 0.5;
    this.game.physics.arcade.enable(item7);
    item7.inputEnabled = true;
    item7.input.enableDrag();
    item7.input.draggable = false;
    item7.originalPosition = item7.position.clone();
    item7.events.onDragStop.add(function(currentSprite){
      this.stopDrag(currentSprite, this.img7);
    }, this);
    item7.alpha= 0.5;



  },



  stopDrag: function(currentSprite, endSprite){
    if (!this.game.physics.arcade.overlap(currentSprite, endSprite, function() {
    currentSprite.input.draggable = false;
    currentSprite.position.copyFrom(endSprite.position);
    currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
  })) { currentSprite.position.copyFrom(currentSprite.originalPosition); }
  }




});


}