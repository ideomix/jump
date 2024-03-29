enchant();

function rand (i)
{
	return Math.floor(Math.random() * i);
}

function rand01 ()
{
	return Math.floor(Math.random() * 2);
}

function randBy (i1, i2)
{
	return i1 + Math.floor(Math.random() * i2);
}

window.onload=function(){
	game = new Game(320,320);
	game.preload('chara1.gif','bg.jpg','font.png','icon0.gif');
	game.onload=function(){
		game.rootScene.backgroundColor="#000000";
        game.fps = 30;

        // score
        var scoreLabel = new ScoreLabel(1, 1);
        scoreLabel.score = 0;
        game.rootScene.addChild(scoreLabel);

        // countdown
        var timeLabel = new TimeLabel(1, 20, 'countdown');
        timeLabel.time = 60;
        game.rootScene.addChild(timeLabel);
		// countdown
        // var countdown = new Sprite(16,16);
        // countdown.image = game.assets['font.png'];
        // countdown.x = (game.rootScene.width + countdown.width ) / 2 ;
        // countdown.y = (game.rootScene.height + countdown.height ) / 2 ;
        // game.rootScene.addChild(countdown);
        // console.dir(countdown);
        // countdown.cue({
        //     20: function(){countdown.frame = 19; countdown.tl.scaleTo(30,30,30,enchant.Easing.QUINT_EASEINOUT).and().fadeOut(30, enchant.Easing.QUINT_EASEINOUT);},
        //     40: function(){countdown.frame = 18; countdown.tl.scaleTo(30,30,30,enchant.Easing.QUINT_EASEINOUT).and().fadeOut(30, enchant.Easing.QUINT_EASEINOUT);},
        //     60: function(){countdown.frame = 17; countdown.tl.scaleTo(30,30,30,enchant.Easing.QUINT_EASEINOUT).and().fadeOut(30, enchant.Easing.QUINT_EASEINOUT);}
        // });

		// enemy初期設定
		enemies = [];
        for (i=0; i<8; i++)
        {
        	var enemy = new Sprite(8, 8);
            enemy.backgroundColor = "red";
            enemy.x = rand(game.rootScene.width - 8);
            enemy.y = 8 * i + rand(50);
            enemy.speed = (rand(enemy.width * 2) * (rand01() == 0 ? -1: 1)) * randBy(2,5);
        	enemy.turn = function(){
            if (enemy.x < 10)
                enemy.speed = Math.abs(enemy.speed);
            else if (enemy.x > 290)
                enemy.speed *= -1;
console.log(enemy.speed);
            }
            enemy.tl.moveBy(enemy.speed, 0, randBy(5,30), enchant.Easing.QUINT_EASEINOUT)
                    // .and()
                    // .scaleTo(1.5,1.5,15,enchant.Easing.QUINT_EASEINOUT)
                    // .scaleTo(1,1,15,enchant.Easing.QUINT_EASEINOUT)
                    .delay(randBy(3,9))
                    .then(function(){
                      this.turn()
                    });
            enemy.tl.looped = true;

            enemies.push(enemy);
            game.rootScene.addChild(enemy);
        }

 		// プレーヤー初期設定
        player = new Sprite(32, 32);
        player.x = (game.rootScene.width / 2) - (player.width / 2);
        player.y = (game.rootScene.height / 2) - (player.height / 2);
        player.image = game.assets['chara1.gif'];
        player.weight = 10;
        player.up_spd = 1.0;
        player.down_spd = 0.9;
        player.xe = 0.0;
        player.ye = 0.0;
        player.tl.delay(30).moveTo(player.x, 290, 60, enchant.Easing.BOUNCE_EASEOUT);
		game.rootScene.addChild(player);

		player.addEventListener('enterframe',function(){
//          this.y += 10;

		});
	    game.rootScene.addEventListener("touchstart", function(){
			if (player.y > 270 && player.y < 280 )
			{
              player.up_spd = player.down_spd * 1.5;
			}
			else if (player.y > 265 && player.y < 285) 
			{
              player.up_spd = player.down_spd * 1.2;
            }
			else if (player.y > 260 && player.y < 290)
			{
              player.up_spd = player.down_spd * 1.0;
            }
			else
			{
              player.up_spd = player.down_spd * 0.2;
            }
            player.down_spd = player.up_spd;
var debug_log = new Label("y: " + player.y + " up: " + player.up_spd + " down: " + player.down_spd);
debug_log.color = "#FFFFFF";
debug_log.x = 80;
debug_log.y = 280;
debug_log.tl.moveTo(debug_log.x, 0, 90, enchant.Easing.EASEOUT).and().fadeOut(50).then(function(){game.rootScene.removeChild(this);});
game.rootScene.addChild(debug_log);
            player.tl.clear();
            jumpTo = player.height * player.up_spd * 3;
            player.tl.moveBy(0, -(jumpTo), 30, enchant.Easing.QUINT_EASEOUT)
                     .moveTo(player.x, 290, 60, enchant.Easing.BOUNCE_EASEOUT);
            scoreLabel.score += jumpTo;
        });
	}

	game.debug();
}