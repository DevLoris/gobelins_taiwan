import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {PMREMGenerator, UnsignedByteType} from "three";
import {WebGlManager} from "../WebGlManager";

let environments = {
    "wow": {
        "filename": "venice_sunset_1k.hdr"
    }
};

export class HdrUtils {
    static loadEnvironment(name) {
        let pmremGenerator = new PMREMGenerator(WebGlManager.getInstance().getRenderer());

        if ( environments[ name ].texture !== undefined ) {

            WebGlManager.getInstance().getScene().environment = environments[ name ].texture;
            return;

        }

        const filename = environments[ name ].filename;
        new RGBELoader()
            .setDataType( UnsignedByteType )
            .setPath( 'public/' )
            .load( filename, function ( hdrEquirect ) {

                const hdrCubeRenderTarget = pmremGenerator.fromEquirectangular( hdrEquirect );
                hdrEquirect.dispose();

                WebGlManager.getInstance().getScene().environment = hdrCubeRenderTarget.texture;
                environments[ name ].texture = hdrCubeRenderTarget.texture;

            } );

    }
}