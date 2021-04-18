export type SceneElementOption = {
    size? : number[];
    position? : number[];
    renderTop? : boolean; 
    outline? : SceneElementOptionOutline;
};

export type SceneElementOptionOutline = {
    enable?: boolean;
    color?: number;
    stroke?: number;
}