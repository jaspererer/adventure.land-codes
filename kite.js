
var farm_list = ["bee"]; // the monster type you want to farm.
var pot_amount = 200; // how many pots you want to keep in your stacks.
var loop_speed = 100; // this is in milliseconds.

var a = 1;
var d = 1;
setInterval(function(){ // this is the start of your main loop.
	c = get_player("joyous18");
	var run_points = [];
	function Point(x,y) {
		this.x = x;
		this.y = y;
	}
	var runX = get_x(c) + 101*Math.cos(a * Math.PI / 180);
	var runY = get_y(c) + 101*Math.sin(a * Math.PI / 180);
	
	if(!is_moving(character)) {
		if(!can_move(runX,runY)) {
			d = d * -1
			game_log("cant")
			stop();
			
		} 
		if(can_move(runX,runY)){
			move(runX,runY);
			a += 12 * d;
			if (a > 360) {
				a = 0;
				clear_drawings();get_nearest_monster
			}
			draw_line(character.x,character.y,runX,runY);
		}
	} /*else {
		d = d * -1
			game_log("cant")
	}*/
}, loop_speed); // this closes the loop.
 
