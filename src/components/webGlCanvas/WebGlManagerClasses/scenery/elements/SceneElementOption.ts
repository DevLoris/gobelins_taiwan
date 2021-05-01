export type SceneElementOption = {
    position? : number[];
    scale? : number[];
    rotation? : {x: number, y: number, z:  number};
    renderTop? : boolean;
    outline? : SceneElementOptionOutline;
};

export type SceneElementOptionOutline = {
    enable?: boolean;
    color?: number;
    stroke?: number;
}