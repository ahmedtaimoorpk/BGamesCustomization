var cursors;
var sprites2;
var player;
var items;

var c_book,c_books,c_pencil_glass,c_rocket,c_pillow;

class turkeyBoy extends Phaser.Scene {

    constructor() {
        super({
            key: 'turkeyBoy',
            pixelArt: true,
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false
                }
            },
        });
    }

    preload() {
        // console.log('asdasdads');
        this.load.tilemapTiledJSON('turkeyBoyMap','assets/Boy-Rooms/Karachi/temp.json');
        this.load.image('Kbackground', 'assets/Boy-Rooms/Karachi/Karachi-Boy Blank-Room-01.jpg');
        this.load.image('pencil', 'assets/Boy-Rooms/Karachi/Messy-Room%20Objects/pencil.png');
        this.load.multiatlas('SS', 'assets/Boy-Rooms/Karachi/RobotBoyKarachi_SS.json', 'assets/Boy-Rooms/Karachi/');
    }

    create() {
        // this.physics.startSystem(Phaser.Physics.ARCADE);
       cursors = this.input.keyboard.createCursorKeys();
        //Background
        // var background = this.add.image(400, 300, 'Kbackground').setScale(0.3,0.24);

        var map = this.add.tilemap('turkeyBoyMap');
        // map.tileHeight = 32;
        // map.tileWidth = 32;
        // map.height = 10;
        // map.width = 10;
        // this.map.setScale(0.1);

       // map.addTilesetImage('temp');
       // var layer = map.createStaticLayer('background');

       var sprites = map.createFromObjects('background',1, { key: 'Kbackground' });

        

       // sprites[0].x = 400;
       // sprites[0].y = 300;
       // sprites[0].setScale(0.8);

       // sprites[0].displayWidth =800;
       // sprites[0].displayHeight =600;


       // sprites2 = map.createFromObjects('pencil',2, { key: 'pencil' });
       // sprites2 = sprites2[0];
       // map.setCollision(2);

       // physics.enable(sprites2);
       // sprites2.setInteractive();
       // sprites2.on('pointerdown', function(event) {console.log('asdasd');});

       items = this.physics.add.group();



       var books_2 = items.create(340,530,'SS','Messy-Room Objects/books-2.png').setScale(0.6);

       var books_3 = items.create(560,236,'SS','Messy-Room Objects/books-3.png').setScale(0.6);

       var chair = this.add.image(110,455,'SS','Messy-Room Objects/chair.png').setScale(0.6);

       var darpe_1 = this.add.image(35,417,'SS','Messy-Room Objects/darpe-1.png').setScale(0.6);

       var darpe_2 = items.create(710,575,'SS','Messy-Room Objects/darpe-2.png').setScale(0.6);

       var papers = this.add.image(610,525,'SS','Messy-Room Objects/papers.png').setScale(0.6);

       var pencil_glass = items.create(475,545,'SS','Messy-Room Objects/pencil-glass.png').setScale(0.6);

       var pencil = this.add.image(660,530,'SS','Messy-Room Objects/pencil.png').setScale(0.6);

       var pillow_2 = this.add.image(660,398,'SS','Messy-Room Objects/pillow-2.png').setScale(0.6);

       var pillow = items.create(350,480,'SS','Messy-Room Objects/pillow.png').setScale(0.6);

       var pin_2 = items.create(580,540,'SS','Messy-Room Objects/pin-2.png').setScale(0.6);

       var pin = items.create(260,560,'SS','Messy-Room Objects/pin.png').setScale(0.6);

       var rocket = items.create(240,520,'SS','Messy-Room Objects/rocket.png').setScale(0.6);

       var rubber = this.add.image(640,535,'SS','Messy-Room Objects/rubber.png').setScale(0.6);

       var scale = this.add.image(650,542,'SS','Messy-Room Objects/scale.png').setScale(0.6);

       var school_bag = items.create(450,480,'SS','Messy-Room Objects/school-bag.png').setScale(0.6);

       var sock = items.create(640,570,'SS','Messy-Room Objects/sock.png').setScale(0.6);

       var sticky_note = items.create(187,570,'SS','Messy-Room Objects/sticky-note.png').setScale(0.6);

       var c_book = this.physics.add.sprite(540,180,'SS','Cleaned-Room Objects/book.png').setScale(0.6);

       c_books = this.physics.add.sprite(580,240,'SS','Cleaned-Room Objects/books.png').setScale(0.6);
       c_books.disableBody(true,true);

       c_pencil_glass = this.physics.add.sprite(555,144,'SS','Cleaned-Room Objects/pencils-glass.png').setScale(0.6);
       c_pencil_glass.disableBody(true,true);

       c_rocket = this.physics.add.sprite(600,142,'SS','Cleaned-Room Objects/c-rocket.png').setScale(0.6);
       c_rocket.disableBody(true,true);

       c_pillow = this.physics.add.sprite(600,400,'SS','Messy-Room Objects/pillow.png').setScale(0.6);
       c_pillow.disableBody(true,true);


       player = this.physics.add.sprite(60, 530, 'SS', 'Boy-Robot/5.png').setScale(0.3);
       player.setCollideWorldBounds(true);




       this.physics.add.overlap(player, items, this.collect, null, this);
       // this.physics.add.overlap(player, sprites2, this.collisionHandler, null, this);

       // sprites2[0].x = 400;
       // sprites2[0].inputEnabled = true;
       // sprites2[0].input.enableDrag();
       

    
        // var sprites = map.createFromObjects('background');

        // var villain = this.add.sprite(50, 50, 'turkeyBoyMap', 'background');

        // var layer = map.createDynamicLayer(26);

        // console.log(player);
        // var layer = map.createStaticLayer(layerID, tileset);






        // layer = map.createLayer('books-2');
        // var layer = map.createStaticLayer('books-2','books-2');
        // var coins = map.createFromObjects('books-2', 3, { key: 'books-2' });
        // var tileset = map.addTilesetImage('temp', 'books_2');
        // var blocklayer = map.createDynamicLayer('background', tileset, 0, 0);

        // layer = map.createLayer('background');

        // this.map.resizeWorld();

        // var books_2 = map.addTilesetImage('books-2');

        // map.createStaticLayer('background');

        // var textConfig = {
        //     fontSize: '50px',
        //     color: '#000000',
        //     fontFamily: 'Love Ya Like A Sister, cursive'
        // };
        // this.add.text(220, 80, "Select a Place", textConfig);



        // The function generateFrameNames() creates a whole bunch of frame names by creating zero-padded numbers between start and end, 
        //surrounded by prefix and suffix). 1 is the start index, 8 the end index and the 1 is the number of digits to use:

        var upFrames = this.anims.generateFrameNames('SS', {
             start: 1, end: 4, zeroPad: 1,
             prefix: 'Boy-Robot/', suffix: '.png'
         });

        var downFrames = this.anims.generateFrameNames('SS', {
             start: 5, end: 8, zeroPad: 1,
             prefix: 'Boy-Robot/', suffix: '.png'
         });

        var leftFrames = this.anims.generateFrameNames('SS', {
             start: 9, end: 14, zeroPad: 1,
             prefix: 'Boy-Robot/', suffix: '.png'
         });

        var rightFrames = this.anims.generateFrameNames('SS', {
             start: 15, end: 20, zeroPad: 1,
             prefix: 'Boy-Robot/', suffix: '.png'
         });

        
        // Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'up',
            frames: upFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: downFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: leftFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: rightFrames,
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'stop',
            frames: [ { key: 'SS', frame: 'Boy-Robot/5.png' } ],
            frameRate: 20
        });





    }

    update() {
        if (cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown)
        {
            player.setVelocityX(-160);

            player.anims.play('left', true);
        }
        else if (cursors.right.isDown && !cursors.up.isDown && !cursors.down.isDown)
        {
            player.setVelocityX(160);

            player.anims.play('right', true);
        }else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown && player.y >= 460)
        // }else if (cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown)
        {
            player.setVelocityY(-160);

            player.anims.play('up', true);

        }else if (cursors.down.isDown && !cursors.left.isDown && !cursors.right.isDown)
        {
            player.setVelocityY(160);

            player.anims.play('down', true);
        }
        else
        {
            player.setVelocityX(0);
            player.setVelocityY(0);

            player.anims.play('stop');
        }

        // this.physics.arcade.collide(player, sprites2, collisionHandler, null, this);
    }


    collect (obj1, obj2) {

        obj2.disableBody(true, true);
        console.log(obj2.frame.name);
        if(obj2.frame.name == 'Messy-Room Objects/pillow.png'){
            c_books.visible = true;
        }
        if(obj2.frame.name == 'Messy-Room Objects/books-2.png'){
            c_pillow.visible = true;
        }
        if(obj2.frame.name == 'Messy-Room Objects/rocket.png'){
            c_rocket.visible = true;
        }
        if(obj2.frame.name == 'Messy-Room Objects/pencil-glass.png'){
            c_pencil_glass.visible = true;
        }

    }

    render() {

        // Input debug info
        this.debug.inputInfo(32, 32);
        // this.debug.spriteInputInfo(sprite, 32, 130);
        this.debug.pointer(this.input.activePointer);

    }

}