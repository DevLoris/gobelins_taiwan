import {AnimationClip} from "three";

export interface IGltfAnimations {
    name:string,
    animations:AnimationClip[]
}

class AnimationService {
    private static instance: AnimationService;

    private _animationsFromGltf:IGltfAnimations[] = new Array();

    private constructor() { }

    public static getInstance(): AnimationService {
        if (!AnimationService.instance) {
            AnimationService.instance = new AnimationService();
        }

        return AnimationService.instance;
    }

    public saveAnimationsFromGltfNamed(name:string, animations:AnimationClip[]) {
        this._animationsFromGltf.push({
            name:name,
            animations:animations,
        });
    }

    public getAnimationFromGltfNamed(nameHint:string):IGltfAnimations {
        let foundObj: IGltfAnimations;
        this._animationsFromGltf.forEach((gltfAnimations) => {
            if(gltfAnimations.name.toLowerCase().includes(nameHint)) {
                foundObj = gltfAnimations;
            }
        });
        return foundObj;
    }
}

export default AnimationService;
