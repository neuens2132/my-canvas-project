import { resources } from './Resources';
import { Sprite } from './Sprite.js';
import { Vector2 } from './Vector2.js';
import { GameLoop } from './GameLoop.js';
import './style.css'
import { DOWN, Input, LEFT, RIGHT, UP } from './Input.js';
import { gridCells, isSpaceFree } from './helpers/grid.js';
import { moveTowards } from './helpers/moveTowards.js';
import { walls } from './levels/level1.js';
import { Animations } from './Animations.js';
import { FrameIndexPattern } from './FrameIndexPattern.js';
import { STAND_DOWN, STAND_LEFT, STAND_RIGHT, STAND_UP, WALK_DOWN, WALK_LEFT, WALK_RIGHT, WALK_UP } from './objects/hero/heroAnimations.js';
import { GameObject } from './GameObject.js';
import { Hero } from './objects/hero/Hero.js';
import { events } from './Events.js';
import { Camera } from './Camera.js';
import { Rod } from './objects/Rod/Rod.js';
import { Inventory } from './objects/inventory/Inventory.js';

//grabbing the canvas
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

//creating a scene
const mainScene = new GameObject({
    position: new Vector2(0, 0)
})

const skySprite = new Sprite ({
    resource: resources.images.sky,
    frameSize: new Vector2(320, 180)
})

const groundSprite = new Sprite ({
    resource: resources.images.ground,
    frameSize: new Vector2(320, 180)
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5));
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera)

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod)

const inventory = new Inventory();

//add an Input class to the main scene
mainScene.input = new Input();

const update = (delta) => {
    mainScene.stepEntry(delta, mainScene);
    
}

const draw = () => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //draw the sky
    skySprite.drawImage(ctx, 0, 0)

    //save the current state
    ctx.save();

    //offset by camera position
    ctx.translate(camera.position.x, camera.position.y);

    mainScene.draw(ctx, 0, 0)

    //restore to original state
    ctx.restore();

    //draw anything above the game (z-index)
    inventory.draw(ctx, 0, 0)
}


//start the game
const gameLoop = new GameLoop(update, draw);
gameLoop.start();