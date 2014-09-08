var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

var main_state = {
    preload: function () {
        this.game.stage.backgroundColor = '#71c5cf';

        this.game.load.image('bird', 'images/bird.png');
        this.game.load.image('pipe', 'images/pipe.png');
    },
    create: function () {
        this.bird = this.game.add.sprite(100, 245, 'bird');
//        this.bird.body.gravity.y = 350;

        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.jump, this);

        var up_key = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        up_key.onDown.add(this.up, this);

        var down_key = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        down_key.onDown.add(this.down, this);

        this.pipes = game.add.group();

        this.pipes.createMultiple(20, 'pipe');

        this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);

        this.score = 0;
        var style = {font: "30px Arial", fill: "#ffffff"};
        this.label_score = this.game.add.text(20, 20, "0", style);
    },
    update: function () {
        if (this.bird.inWorld === false)
            this.restart_game();
        this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
    },
    jump: function () {
        this.bird.body.velocity.y = -100;
    },
    up: function () {
        this.bird.body.velocity.y =  -200;
    },
    down: function () {
        this.bird.body.velocity.y =  200;
    },
    restart_game: function () {
        this.game.state.start('main');
        this.game.time.events.remove(this.timer);
    },
    add_one_pipe: function (x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);

        pipe.body.velocity.x = -150;

        pipe.outOfBoundsKill = true;
    },
    add_row_of_pipes: function () {
        var hole = Math.floor(Math.random() * 5) + 1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole + 1)
                this.add_one_pipe(400, i * 60 + 10);

        this.score += 1;
        this.label_score.content = this.score;
    }
};

game.state.add('main', main_state);
game.state.start('main'); 