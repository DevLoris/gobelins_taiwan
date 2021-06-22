import {AnimationClip} from "three";

class AnimationService {
    private static instance: AnimationService;

    private _animationsFromGltf:AnimationClip[] = new Array();

    private constructor() { }

    public static getInstance(): AnimationService {
        if (!AnimationService.instance) {
            AnimationService.instance = new AnimationService();
        }

        return AnimationService.instance;
    }

    public setAnimationFromGltf(animations:AnimationClip[]) {
        this._animationsFromGltf = animations;
    }

    public getAnimationFromGltf() {
        return this._animationsFromGltf;
    }
}

export default AnimationService;
