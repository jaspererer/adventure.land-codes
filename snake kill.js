​
var farm_list = ["osnake"]; // the monster type you want to farm.
var pot_amount = 400; // how many pots you want to keep in your stacks.
var loop_speed = 100 / character.frequency; // this is in milliseconds.
var low_pot_amount = 10; // when you have less than this number, go restock potions.
var give_whitelist = ["hpbelt","hpamulet","ringsj","seashell","gem0","cscroll0","scroll0","intamulet","stramulet"];
​
if(!get_player("joyous18")) {
    //start_character("joyous18",3);
    //send_party_invite(get_player("joyous18"))
}
​
setInterval(function(){ // this is the start of your main loop.
 
  handle_death();
  handle_farming();
  handle_loot();
  handle_potions();
  handle_inventory();
    handle_skills();
 
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
 
