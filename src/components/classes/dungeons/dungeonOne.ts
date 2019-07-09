import Dungeon from  "./dungeons"

export default class firstDungeon extends Dungeon{
constructor(name:string,equipment:string[]){
  super('firstDungeon',["map","compas","bow","boomerang","heartContainer","shardOne"])
}
}