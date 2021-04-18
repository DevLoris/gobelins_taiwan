export abstract class SceneElement {
    protected id: string;
    protected size: [number, number, number];
    protected position: [number, number, number];

    constructor(id, size, position) {
        this.id = id; 
        this.size = size;
        this.position = position;
    }

    abstract prepareElements();
}