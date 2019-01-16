var farm_list = ["crab"]; // the monster type you want to farm.
var pot_amount = 100; // how many pots you want to keep in your stacks.
var loop_speed = 100 / character.frequency; // this is in milliseconds.
var low_pot_amount = 10; // when you have less than this number, go restock potions.
var give_whitelist = ["hpbelt","hpamulet","ringsj","seashell","gem0","cscroll0","scroll0"];



setInterval(function(){ // this is the start of your main loop.
 
  handle_death();
  handle_farming();
  handle_loot();
  handle_potions();
  handle_inventory();
 
}, loop_speed); // this closes the loop.
 
function handle_loot(){
 
  for(id in parent.chests){ // checks any chests in the area for their ID.
    parent.open_chest(id); // if the chest belongs to you, you will loot it.
  }
 
} // end function
 
function handle_death(){
 
  if(character.rip){ // if you are dead,
        parent.socket.emit('respawn'); // try to respawn,
        return; // then return because running anymore code is pointless.
  }
 
}  // end function
 
function handle_potions(){
 
  if(can_use('use_hp') || can_use('use_mp')){ // if your cooldown for using potions has ended,
    if(character.hp < 200){
      if (character.hp <= character.max_hp * .5) use('use_hp'); // if your health is less than half, use a potion.
    } else {
      if (character.hp <= character.max_hp - 200) use('use_hp');
    }
 
      if(character.mp < 300){
      if (character.mp <= character.max_mp - 300) use('use_mp'); // if your mana is less than what you need to attack, use a potion.
    } else {
      if (character.mp <= character.max_mp - 300) use('use_mp');
    }
  }
 
}  // end function
 
function handle_inventory(){
 
  var health_pots = character.items[0].q; // this shows the amount of health potions you have.
  var mana_pots = character.items[1].q; // this shows the amount of mana potions you have.
  var esize = character.esize; // this checks how many available inventory spaces you have left.
 
  var visit_town = false;
  if(health_pots < 10 || mana_pots < low_pot_amount || esize < 1) var visit_town = true;
 
  if(visit_town){ // if you're going to restock potions,
        var cx = character.real_x, cy = character.real_y, cm = character.map; // this maps your location before leaving to town.
    var farm_spot = {x: cx, y: cy, map: cm};
   
        if(!smart.moving){ // if you're not smart moving,
            smart_move({to:"potions"}, function(){ // smart move to the potion seller.
        for (let i = 0; i < character.items.length; i++) { // this loops all the items of your inventory.
          /*let c = character.items[i]; // i is the current item in the loop.
          if (c) { // if there is an item, check if we should sell it.
              if (c && sell_whitelist.includes(c.name)) { // if so, then sell it.
                  sell(i); // sell the items.
              }
          }*/
        } // ends the loop through the inventory.
        var buy_health = pot_amount - health_pots; // buy enough potions to refill to your pot_amount.
        var buy_mana = pot_amount - mana_pots;
                if(character.gold >= 20){ // if we have enough gold, buy a pot.
                    buy_with_gold("hpot0", buy_health);
          buy_with_gold("mpot0", buy_mana);
                }
                smart_move(farm_spot); // then smart move back to your owiginal spot before leaving for town.
            });
    }
   
  }
 
  if(visit_town) return; // since you're visiting town, no need to run the below farming code.
 
} // end function
function handle_farming(){
 
  var entities = Object.values(parent.entities); // this finds all living things around you.
  // var monsters filters by if the entities are alive,
  // if they're the types you want to farm,
  // and make sure nobody else has already attacked them.
  var monsters = entities.filter(m => !m.rip && m.mtype == farm_list && !m.target);
 
    if(monsters.length < 1){ // if there are no desired monsters near us,
        var monster = monsters[0]; // this ensures you don't attack something you shouldn't.
        if(!smart.moving) smart_move(farm_list[0]); // this smart moves to the monster types you want to farm.
    } else {
        var monster = get_nearest_monster({type:farm_list[0]}); // since there are desired monsters near, get the closest one to attack.
    }
   
    if(monster){ // if we have a desired monster available,
        if(in_attack_range(monster)){ // and we are close enough to attack it,
            if(can_use("supershot")) {
			   use_skill("supershot",monster)
			}
			else if(can_attack(monster)) {
				attack(monster); // if we can attack it, attack it.
			}
            return; // we return since we don't need to move to it.
        } else {
            if(!is_moving(character)) // if we are not moving already,
            move( // move half the distance to the monster.
                character.x+(monster.x-character.x)/4,
                character.y+(monster.y-character.y)/4
            );
        }
  }
 
} // end function

function on_party_request(name) {
	
		accept_party_request(name);
	
};

function on_party_invite(name) {
	
		accept_party_invite(name);
	
};

function on_cm(name,data) {
	if (name =="joyous18" && data == "send") {
		for (let i = 0; i < character.items.length; i++) { // this loops all the items of your inventory.
          let c = character.items[i]; // i is the current item in the loop.
          if (c) { // if there is an item, check if we should sell it.
              if (c && give_whitelist.includes(c.name)) { // if so, then sell it.
                  send_item("joyous18",i); // send the items.
              }
          }
        } // ends the loop through the inventory.
		
	}
}
