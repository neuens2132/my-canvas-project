import { Animations } from "../../Animations";
import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resources";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Rod extends GameObject {
    constructor(x, y) {
        super({
            position: new Vector2(x, y)
        });
        const sprite = new Sprite({
            resource: resources.images.rod,
            position: new Vector2(0, -5)//nudge upwards visually
        })

        // let value = -0.1
        // setInterval(() => {
        //     if(this.position.y > 96 || this.position.y < 88) {
        //         if(this.position.y > 96) {
        //             value = -0.2
        //         }

        //         if(this.position.y < 88) {
        //             value = 0.2
        //         }
        //     }

        //     this.position.y += value
        //     console.log(this.position.y)
        // }, 20)
       

        this.addChild(sprite);
    }

    ready() {
        events.on("HERO_POSITION", this, pos => {
            //detect overlap...
            const roundedHeroX = Math.round(pos.x);
            const roundedHeroY = Math.round(pos.y);

            if(roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
                this.onCollideWithHero()
            }
        })
    }

    onCollideWithHero() {
        this.destroy();

        events.emit("HERO_PICKS_UP_ITEM", {
            image: resources.images.rod,
            position: this.position
        })
    }

}