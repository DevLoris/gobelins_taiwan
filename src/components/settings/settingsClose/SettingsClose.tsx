import css from './SettingsClose.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {ButtonStyle} from "../../button/Button";

interface IProps {
  className?: string
  onClick: () => void,
}

const componentName = "SettingsClose";
const debug = require("debug")(`front:${componentName}`);

/**
 * Fermeture de la popup des options
 * @name SettingsClose
 */
function SettingsClose (props: IProps) {
  return <div className={merge([css.root, props.className])} onClick={props.onClick}>
    <svg width="100%" height="100%" viewBox="0 0 63 65" version="1.1"  style={{"fillRule":"evenodd", clipRule:"evenodd", strokeMiterlimit:10}}>
      <defs>
        <pattern id={"img"} patternUnits="userSpaceOnUse" width="220.007" height="50.744" >
            <image href="/public/da/pattern_white_beige.png" x="0" y="0"  width="837" height="837"  />
        </pattern>
      </defs>
      <g id="Groupe_370" transform="matrix(1,0,0,1,-1277.58,321.44)">
        <g transform="matrix(1,0,0,1,-0.237,-0.671)">
          <g id="Groupe_58">
            <path id="Tracé_236" d="M1340.77,-287.505L1339.84,-282.205L1338.74,-276.966L1336.66,-271.992L1333.21,-267.855L1329.46,-264.067L1325.22,-260.78L1320.24,-258.811L1315.18,-256.977L1309.79,-256.42L1304.38,-256.82L1299.36,-258.835L1294.59,-261.172L1289.88,-263.772L1286.48,-267.943L1283.19,-272.143L1280.8,-276.943L1279.28,-282.114L1279.14,-287.494L1279.52,-292.833L1281.17,-297.912L1283.36,-302.756L1286.31,-307.2L1290.02,-311.054L1294.38,-314.195L1299.34,-316.195L1304.44,-317.817L1309.79,-317.925L1315.11,-317.659L1320.22,-316.139L1325.27,-314.301L1329.76,-311.282L1333.17,-307.106L1336.57,-302.952L1338.79,-298.047L1339.95,-292.81L1340.77,-287.505Z" style={{"fill":"rgb(17,29,48)", "fillRule": "nonzero"}}/>
          </g>
        </g>
        <g id="Groupe_59" transform="matrix(1,0,0,1,1278.08,-320.94)">
          <g id="Tracé_237" transform="matrix(1,0,0,1,-1278.08,320.94)">
            <path d="M1339.71,-290.505L1338.78,-285.205L1337.69,-279.966L1335.6,-274.992L1332.15,-270.855L1328.4,-267.067L1324.17,-263.78L1319.18,-261.811L1314.12,-259.977L1308.74,-259.42L1303.33,-259.82L1298.3,-261.835L1293.54,-264.172L1288.83,-266.772L1285.43,-270.943L1282.14,-275.143L1279.75,-279.943L1278.23,-285.114L1278.08,-290.494L1278.46,-295.833L1280.11,-300.912L1282.3,-305.756L1285.25,-310.2L1288.97,-314.054L1293.32,-317.195L1298.29,-319.195L1303.39,-320.817L1308.74,-320.925L1314.06,-320.659L1319.16,-319.139L1324.21,-317.301L1328.7,-314.282L1332.11,-310.106L1335.51,-305.952L1337.74,-301.047L1338.9,-295.81L1339.71,-290.505Z"  style={{"fill":"url(#img)", "fillRule": "nonzero"}}/>
          </g>
          <g id="Tracé_238" transform="matrix(1,0,0,1,-1278.08,320.94)">
            <path d="M1339.71,-290.505L1338.78,-285.205L1337.69,-279.966L1335.6,-274.992L1332.15,-270.855L1328.4,-267.067L1324.17,-263.78L1319.18,-261.811L1314.12,-259.977L1308.74,-259.42L1303.33,-259.82L1298.3,-261.835L1293.54,-264.172L1288.83,-266.772L1285.43,-270.943L1282.14,-275.143L1279.75,-279.943L1278.23,-285.114L1278.08,-290.494L1278.46,-295.833L1280.11,-300.912L1282.3,-305.756L1285.25,-310.2L1288.97,-314.054L1293.32,-317.195L1298.29,-319.195L1303.39,-320.817L1308.74,-320.925L1314.06,-320.659L1319.16,-319.139L1324.21,-317.301L1328.7,-314.282L1332.11,-310.106L1335.51,-305.952L1337.74,-301.047L1338.9,-295.81L1339.71,-290.505Z" style={{"fill":"none", "fillRule": "nonzero", "stroke": "rgb(17,29,48)", strokeWidth: "1px"}}/>
          </g>
        </g>
        <g transform="matrix(22.6274,22.6274,-22.6274,22.6274,1292.34,-289.017)">
          <g id="_">
            <path d="M0.725,-0.384C0.725,-0.373 0.721,-0.364 0.714,-0.357C0.707,-0.349 0.697,-0.346 0.686,-0.346L0.409,-0.346L0.409,-0.069C0.409,-0.058 0.406,-0.048 0.399,-0.04C0.392,-0.032 0.383,-0.028 0.372,-0.028C0.361,-0.028 0.351,-0.032 0.344,-0.04C0.337,-0.048 0.333,-0.058 0.333,-0.069L0.333,-0.346L0.061,-0.346C0.05,-0.346 0.04,-0.349 0.033,-0.357C0.025,-0.364 0.021,-0.373 0.021,-0.384C0.021,-0.395 0.025,-0.405 0.033,-0.412C0.04,-0.419 0.05,-0.422 0.061,-0.422L0.333,-0.422L0.333,-0.689C0.333,-0.7 0.337,-0.71 0.344,-0.718C0.351,-0.725 0.361,-0.729 0.372,-0.729C0.383,-0.729 0.392,-0.725 0.399,-0.718C0.406,-0.71 0.409,-0.7 0.409,-0.689L0.409,-0.422L0.686,-0.422C0.697,-0.422 0.707,-0.419 0.714,-0.412C0.721,-0.405 0.725,-0.395 0.725,-0.384Z" style={{"fill":"rgb(17,29,48)", "fillRule": "nonzero"}}/>
          </g>
        </g>
      </g>
    </svg>
  </div>
}

export default SettingsClose
