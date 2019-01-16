var farm_list = ["snake"]; // the monster type you want to farm.
var pot_amount = 300; // how many pots you want to keep in your stacks.
var loop_speed = 100 / character.frequency; // this is in milliseconds.
var low_pot_amount = 10; // when you have less than this number, go restock potions.
var sell_whitelist = ["hpbelt","hpamulet"];
var give_blacklist = ["hpot0","mpot0"];
var s_target;
 
map_key("4","snippet","send_cm('joeboy','send')");
send_party_invite(get_player("joeboy"));
send_party_request(get_player("joeboy"));
​
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
 
