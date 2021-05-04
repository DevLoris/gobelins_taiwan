import {IStateDataSceneLight} from "../../../../store/state_interface_data";
import {IStateDataSceneLightType} from "../../../../store/state_enums";
import {
    AmbientLight,
    DirectionalLight,
    DirectionalLightHelper,
    HemisphereLight,
    HemisphereLightHelper,
    Scene
} from "three";

const debug = require("debug")(`front:Lights`);

class LightUtils {
    static buildLights(scene: Scene, light_data: IStateDataSceneLight[]) {
        return light_data.map(value => {
            switch (value.type) {
                case IStateDataSceneLightType.DIRECTIONAL:
                    const dirLight = new DirectionalLight( value.color, value.intensity );
                    dirLight.position.set( value.coords.x, value.coords.y, value.coords.z );
                    scene.add(dirLight);
                    if(debug.enabled) scene.add(new DirectionalLightHelper(dirLight, 5));
                    return;
                case IStateDataSceneLightType.HEMISPHERE:
                    const light = new HemisphereLight(value.color, value.groundColor, value.intensity);
                    light.position.set(value.coords.x, value.coords.y, value.coords.z);
                    scene.add(light);
                    if(debug.enabled) scene.add(new HemisphereLightHelper(light, 5));
                    return;
                case IStateDataSceneLightType.AMBIENT:
                    const ambientLight  = new AmbientLight(value.color, value.intensity);
                    scene.add(ambientLight);

            }
        })
    }
}

export default LightUtils;