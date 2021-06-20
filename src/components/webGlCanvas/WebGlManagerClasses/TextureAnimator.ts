import {RepeatWrapping} from "three";

/**
 * Source : https://stemkoski.github.io/Three.js/Texture-Animation.html
 */
export class TextureAnimator
{
    private readonly _tilesHorizontal;
    private readonly _tilesVertical;
    private readonly _numberOfTiles;
    private readonly _tileDisplayDuration;
    private _currentDisplayTime;
    private _currentTile;
    private _texture;

    constructor(texture, tilesHoriz, tilesVert, numTiles, tileDispDuration) {
        // note: texture passed by reference, will be updated by the update function.

        this._texture = texture

        this._tilesHorizontal = tilesHoriz;
        this._tilesVertical = tilesVert;
        // how many images does this spritesheet contain?
        //  usually equals tilesHoriz * tilesVert, but not necessarily,
        //  if there at blank tiles at the bottom of the spritesheet.
        this._numberOfTiles = numTiles;
        texture.wrapS = texture.wrapT = RepeatWrapping;
        texture.repeat.set( 1 / this._tilesHorizontal, 1 / this._tilesVertical );

        // how long should each image be displayed?
        this._tileDisplayDuration = tileDispDuration;

        // how long has the current image been displayed?
        this._currentDisplayTime = 0;

        // which image is currently being displayed?
        this._currentTile = 0;
    }

    public update( milliSec ) {
        this._currentDisplayTime += milliSec;
        while (this._currentDisplayTime > this._tileDisplayDuration)
        {
            this._currentDisplayTime -= this._tileDisplayDuration;
            this._currentTile++;
            if (this._currentTile == this._numberOfTiles)
                this._currentTile = 0;
            let currentColumn = this._currentTile % this._tilesHorizontal;
            this._texture.offset.x = currentColumn / this._tilesHorizontal;
            let currentRow = Math.floor( this._currentTile / this._tilesHorizontal );
            this._texture.offset.y = currentRow / this._tilesVertical;
        }
    };
}
