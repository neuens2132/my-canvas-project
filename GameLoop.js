export class GameLoop {
    constructor(update, render) {

        this.lastFrameTime = 0;
        this.accumulatedTime = 0;
        this.timeStep = 1000/60; // 60 fps

        this.update = update;
        this.render = render;

        this.rafId = null;
        this.isRunning = false;
    }

    mainLoop = (timestamp) => {
        if(!this.isRunning) return;

        let deltaTime = timestamp - this.lastFrameTime;
        this.lastFrameTime = timestamp;

        //accumulate all the time since the last frame.
        this.accumulatedTime += deltaTime;

        //fixed time step updates
        //if there is enough accumulated time to run one or more fixed updates, run 
        while(this.accumulatedTime >= this.timeStep) {
            this.update(this.timeStep); //here, we pass the fixed time step size.
            this.accumulatedTime -= this.timeStep;
        }

        //render
        this.render();

        this.rafId = requestAnimationFrame(this.mainLoop);
    }

    start() {
        if(!this.isRunning) {
            this.isRunning = true;
            this.rafId = requestAnimationFrame(this.mainLoop);
        }
    }


    stop() {
        if(this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        this.isRunning = false;
    }
}