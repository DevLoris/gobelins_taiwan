import css from './NotebookAudio.module.less';
import React from 'react';
import { merge } from "../../../lib/utils/arrayUtils";
import {AudioHandler} from "../../../lib/audio/AudioHandler";

interface IProps {
  className?: string,
  audio: string
}

const componentName = "NotebookAudio";
const debug = require("debug")(`front:${componentName}`);

/**
 * @name NotebookAudio
 */
function NotebookAudio (props: IProps) {

  debug(props);

  const play = () => {
    let audio = AudioHandler.get(props.audio);

    let elements =  document.querySelectorAll("#Groupe_295 line");
    elements.forEach(value => {
      // @ts-ignore
      return value.style.opacity = 0.5;
    });

    audio.play();

    setInterval(() => {
      if (audio.playing()) {
        let toShow = Math.ceil((audio.seek()/audio.duration())*elements.length);
        // @ts-ignore
        Array.from(elements).slice(0, toShow).forEach(value  => {
            // @ts-ignore
            return value.style.opacity = 1;
        })
      }
    }, 200);
  }

  return <div className={merge([css.root, props.className])}>
    <svg xmlns="http://www.w3.org/2000/svg" width="309.678" height="58.052" viewBox="0 0 309.678 58.052">
      <g id="Groupe_296" data-name="Groupe 296" transform="translate(-39.499 -1212.035)">
        <path id="Tracé_454" data-name="Tracé 454" d="M2948.607-3030.412l7.142-.388,7.141.625,7.141-.008,7.142-.731,7.141.1,7.143-.126,7.138.773,7.136-.489,7.139-.015,7.141.04,7.138.038,7.139.147,7.142.294,7.139-.676,7.143.308,7.141.4,7.142-.848,7.141.89,7.144-.795,7.142.481,7.144-.394,7.145.375,7.144.246,7.144-.2,7.145.185,7.146.007,7.141-.793,7.144.4,7.144.345,7.144-.053,7.146.178,7.142-.891,7.148.923,7.153-.521,7.154.45,7.365.15,6.5,3.47,5.961,4.191,4.172,5.971,2.833,6.664,1.58,7.19h-.228l-1,7.284-2.825,6.778-4.818,5.476-5.627,4.556-6.667,2.937-7.243.9-7.142.463-7.141-.086-7.141-.345-7.142-.112-7.141-.075-7.143.576-7.137-.5-7.136.182-7.139.064-7.141-.38-7.138.089-7.139.507-7.142-.232-7.139-.336-7.142-.036-7.141-.2-7.142.635-7.141,0-7.144-.077-7.142-.145-7.144-.176-7.145.586-7.144.107-7.144-.146-7.145-.352-7.146,0-7.141.053-7.144.26-7.144-.219-7.144-.4-7.146.536-7.142-.6-7.148-.035-7.154.372-7.153.1-7.3-.79-6.837-2.75-5.694-4.652-4.565-5.744-2.909-6.767-.4-7.316h-.037l.59-7.276,3.311-6.488,4.183-5.895,5.685-4.545,6.807-2.54Z" transform="translate(-2878.463 4243.643)" fill="none" stroke="#111d30" strokeWidth="1"/>
        <g id="Groupe_294" data-name="Groupe 294" transform="translate(-1238.083 1533.475)">
          <g id="Groupe_58" data-name="Groupe 58" transform="translate(1278.816 -318.859)">
            <path id="Tracé_236" data-name="Tracé 236" d="M1334.406-290.645l-.839,4.751-.978,4.7-1.869,4.461-3.094,3.71-3.364,3.4-3.8,2.948-4.47,1.766-4.538,1.645-4.827.5-4.852-.355-4.506-1.807-4.275-2.1-4.222-2.336-3.048-3.741-2.949-3.769-2.144-4.309-1.365-4.637-.129-4.825.341-4.788,1.481-4.555,1.961-4.345,2.646-3.985,3.333-3.457,3.9-2.817,4.454-1.8,4.573-1.454,4.8-.1,4.771.239,4.58,1.363,4.53,1.648,4.022,2.708,3.061,3.746,3.052,3.725,1.992,4.4,1.042,4.7Z" transform="translate(-1279.14 317.94)" fill="#111d30"/>
          </g>
          <g id="Groupe_59" onClick={play}  data-name="Groupe 59" transform="translate(1278.083 -320.94)">
            <path id="Tracé_237" data-name="Tracé 237" d="M1333.35-293.645l-.839,4.751-.978,4.7-1.869,4.461-3.094,3.71-3.364,3.4-3.8,2.948-4.47,1.766-4.538,1.645-4.827.5-4.852-.355-4.506-1.807-4.276-2.1-4.222-2.336-3.047-3.741-2.95-3.769-2.144-4.309-1.365-4.638-.128-4.825.341-4.788,1.481-4.555,1.961-4.345,2.646-3.985,3.332-3.457,3.9-2.817,4.454-1.8,4.573-1.454,4.8-.1,4.771.239,4.58,1.363,4.53,1.648,4.021,2.708,3.062,3.746,3.052,3.725,1.992,4.4,1.042,4.7Z" transform="translate(-1278.083 320.94)" fill="#fff"/>
            <path id="Tracé_238" data-name="Tracé 238" d="M1333.35-293.645l-.839,4.751-.978,4.7-1.869,4.461-3.094,3.71-3.364,3.4-3.8,2.948-4.47,1.766-4.538,1.645-4.827.5-4.852-.355-4.506-1.807-4.276-2.1-4.222-2.336-3.047-3.741-2.95-3.769-2.144-4.309-1.365-4.638-.128-4.825.341-4.788,1.481-4.555,1.961-4.345,2.646-3.985,3.332-3.457,3.9-2.817,4.454-1.8,4.573-1.454,4.8-.1,4.771.239,4.58,1.363,4.53,1.648,4.021,2.708,3.062,3.746,3.052,3.725,1.992,4.4,1.042,4.7Z" transform="translate(-1278.083 320.94)" fill="none" stroke="#111d30" strokeMiterlimit="10" strokeWidth="1"/>
          </g>
          <g id="Groupe_62" onClick={play} data-name="Groupe 62" transform="translate(1245.751 -388.087)">
            <path id="Tracé_239" data-name="Tracé 239" d="M60.183,103.579a.332.332,0,0,1-.283.04h-.04c-.04-.04-.121,0-.2,0a1.751,1.751,0,0,1-.2-.04c-.081,0-.04,0-.162-.04a.243.243,0,0,1-.162-.04c-.081-.04-.2-.081-.283-.121a2.574,2.574,0,0,0-.283-.081h-.04a2.4,2.4,0,0,0-.324-.162.683.683,0,0,0-.2-.081c-.04,0-.081-.04-.162-.04a.149.149,0,0,1-.121-.04.04.04,0,0,1-.04-.04h-.04c-.04-.04-.121-.04-.162-.081l-.04-.04h-.081a.04.04,0,0,1-.04-.04c-.04,0-.04,0-.081-.04s-.081-.04-.162-.04a2.787,2.787,0,0,1-.324-.121.04.04,0,0,0-.04-.04.149.149,0,0,1-.121-.04l-.04-.04h-.081l-.04-.04h-.04a2.32,2.32,0,0,1-.283-.162h-.04a.04.04,0,0,1-.04-.04h-.04v-.04c-.2-.081-.4-.162-.647-.243-.364-.121-.364-.162-.445-.162a.243.243,0,0,1-.162-.04.04.04,0,0,0-.04-.04c-.04,0-.162-.081-.243-.081-.04,0-.081-.04-.162-.04-.04,0-.121-.04-.162-.04,0,0-.081,0-.081-.04v-.04c-.081-.04-.2-.081-.283-.121a1.757,1.757,0,0,1-.283-.162c-.04,0-.04,0-.081-.04l-.04-.04h-.04l-.081-.04v-.04a.243.243,0,0,0-.162-.04l-.04-.04h-.04a.04.04,0,0,0-.04-.04l-.081-.04c-.04-.04-.04-.04-.081-.04h-.04v-.04a.243.243,0,0,0-.162-.04l-.04-.04H52.5a.04.04,0,0,0-.04-.04c-.04,0-.121-.081-.2-.081h-.04a.966.966,0,0,0-.283-.121h-.04c-.04-.04-.081-.04-.162-.04l-.04-.04c-.081-.04-.081,0-.162-.04a.04.04,0,0,0-.04-.04.243.243,0,0,1-.162-.04.04.04,0,0,0-.04-.04,1.9,1.9,0,0,1-.364-.121,4.192,4.192,0,0,1-.4-.162h-.04c-.04-.04-.081,0-.121-.04-.081,0-.324-.04-.485-.04-.121,0-.243.04-.364.04-.081,0-.121-.04-.162-.04s-.121.04-.162.04h-.4c-.121,0-.2.04-.283.04h-.081c-.04,0-.04,0-.162.04h-.04v.04a3.478,3.478,0,0,1-.647.04H46.19c-.121-.081-.283-.162-.324-.364-.04-.04-.121-.081-.162-.162v-.04a.311.311,0,0,1-.081-.121l-.04-.04a.513.513,0,0,1-.04-.243v-.04c-.081-.081-.04-.243-.081-.445a1.381,1.381,0,0,1-.081-.607.04.04,0,0,0,.04-.04c0-.081.081-.243.081-.364,0-.081-.04-.2-.04-.283-.04-.445,0-.89-.04-1.375v-.081a3.011,3.011,0,0,1,0-.607,4.895,4.895,0,0,0-.04-.768v-.081c0-.04-.04-.081-.04-.162,0-.04.04-.081.04-.121,0-.121-.04-.2-.04-.283v-.283c0-.2-.04-.364-.04-.526,0-.121.04-.283.04-.4v-.4c0-.121.04-.243.04-.364s.04-.162.04-.283v-.04a.558.558,0,0,0,.121-.162l.04-.04h.04c0-.04.081-.081.162-.121l.04-.04h.081l.04-.04h.04a1.752,1.752,0,0,1,.2-.04,1.12,1.12,0,0,1,.364-.04,1.181,1.181,0,0,1,.364-.081,1.247,1.247,0,0,1,.4-.04c.283-.04.566,0,.849-.04a2.751,2.751,0,0,1,.809-.081c.121,0,.283.04.4.04.162,0,.445.081.566,0l.081-.081c.04-.04.121-.081.2-.162.04-.04.081-.04.121-.081.2-.121.4-.243.566-.364.081-.081.2-.162.283-.243l.2-.2a4122.929,4122.929,0,0,1,.324-.243.04.04,0,0,0,.04-.04h.04a.04.04,0,0,1,.04-.04c.04,0,.081,0,.081-.04l.121-.121c.04-.04.04-.04.081-.04a.558.558,0,0,1,.162-.121.04.04,0,0,0,.04-.04h.04c.04-.04.04-.081.081-.121h.04a.04.04,0,0,1,.04-.04c.04,0,.081,0,.081-.04.04,0,.04-.081.04-.081.04,0,.081,0,.081-.04a.04.04,0,0,1,.04-.04c.04,0,.081-.04.121-.081s.04-.04.081-.04c.04-.04.081-.04.162-.081a.04.04,0,0,0,.04-.04,2.256,2.256,0,0,0,.324-.2.04.04,0,0,1,.04-.04c.04,0,.081-.04.121-.081s.04-.04.081-.04a4122.929,4122.929,0,0,0,.324-.243.883.883,0,0,1,.2-.162c.081-.04.121-.121.2-.162a.558.558,0,0,1,.162-.121l.04-.04c.04-.04.081,0,.121-.04l.04-.04.121-.121h.04l.162-.162c.081-.04.162-.162.283-.243a.04.04,0,0,0,.04-.04h.04v-.04h.04v-.04h.04l.04-.04h.04v-.04h.04l.04-.04a.966.966,0,0,1,.283-.121c.081-.04.121-.081.2-.121a.04.04,0,0,1,.04-.04c.04,0,.081-.04.121-.04h.04a.839.839,0,0,0,.243-.081c.121-.081.364-.081.526-.162a1.263,1.263,0,0,1,1.092.283,1.187,1.187,0,0,1,.121.4.04.04,0,0,1,.04.04.407.407,0,0,1,.04.121l.04.04V87c0,.162.04.283.04.445,0,.081.04.2.04.283v.04a2.281,2.281,0,0,1,.04.283.3.3,0,0,0,.04.2.04.04,0,0,1,.04.04v.04a.952.952,0,0,1,.081.324.513.513,0,0,0,.04.243.04.04,0,0,1,.04.04.762.762,0,0,1,.081.324.89.89,0,0,1,.04.324v.04l.04.04c.04.162,0,.324.04.485a.365.365,0,0,0,.04.2.04.04,0,0,1,.04.04c0,.121.04.243.04.4a1.659,1.659,0,0,0,.04.445.243.243,0,0,0,.04.162l.04.04c.04.2,0,.364.04.607,0,.081.04.2.04.364,0,.081.04.121.04.2a6.613,6.613,0,0,1,.081.89c.04.445.081.93.081,1.416,0,.324.04.647.04.971,0,.162.04.283.04.445a5.421,5.421,0,0,1,.04.809v.04a12.587,12.587,0,0,1,.04,1.294c0,.121.04.283.04.485v.121a.44.44,0,0,0,.04.2,2.814,2.814,0,0,1,.081.647v.04a2.28,2.28,0,0,1,.04.283,1.751,1.751,0,0,1-.04.2c0,.04.04.04.04.081,0,.081.04.121.04.2.04.162,0,.324.04.526,0,.121.04.324.04.485s-.04.364-.04.526a1.659,1.659,0,0,0,.04.445c0,.243.04.445.04.647C60.224,103.094,60.3,103.337,60.183,103.579Zm-2.063-2.669c0-.121-.04-.283-.04-.4A4.956,4.956,0,0,1,58,99.737c0-.121.04-.364-.04-.4-.04,0,0-.162,0-.162a8.617,8.617,0,0,1-.121-1.011c0-.445.04-.89,0-1.294a.04.04,0,0,0-.04-.04V96.7a1.247,1.247,0,0,0-.04-.4c0-.2-.04-.4-.04-.607a5.481,5.481,0,0,1-.081-.809c-.04-.688,0-1.375-.04-2.022,0-.162-.04-.283-.04-.445a2.488,2.488,0,0,0-.04-.526,4.644,4.644,0,0,1-.04-.728V90.88c0-.162-.04-.283-.04-.445a2.487,2.487,0,0,0-.04-.526,2.28,2.28,0,0,0-.04-.283c0-.121-.04-.162-.04-.243v-.162a3.364,3.364,0,0,1-.081-.526v-.162a1.751,1.751,0,0,0-.04-.2c-.04-.243-.081-.445-.121-.647-.04-.121-.04-.243-.081-.283-.081-.081-.2,0-.243.04a6.038,6.038,0,0,0-.566.485l-.121.121a.149.149,0,0,1-.121.04l-.04.04a.149.149,0,0,1-.121.04l-.04.04a.558.558,0,0,1-.162.121.04.04,0,0,0-.04.04c-.04,0-.081,0-.081.04-.04.04-.081.081-.081.121h-.04a.04.04,0,0,0-.04.04.559.559,0,0,0-.162.121c-.121.121-.283.162-.4.283a.149.149,0,0,1-.121.04.04.04,0,0,1-.04.04c-.04,0-.081,0-.081.04a.04.04,0,0,1-.04.04c-.04,0-.04,0-.04.04l-.121.121c-.04,0-.081,0-.081.04l-.04.04h-.04c-.04.04-.081.081-.081.121H54l-.04.04c-.04.04-.121.081-.162.121s-.04.04-.081.04a.149.149,0,0,1-.121.04.04.04,0,0,1-.04.04.311.311,0,0,0-.121.081h-.04l-.04.04c-.04.04-.04.04-.081.04a7.038,7.038,0,0,0-.566.485,1.869,1.869,0,0,1-.283.283.558.558,0,0,1-.162.121.149.149,0,0,1-.121.04.04.04,0,0,1-.04.04h-.04c-.04,0-.081.04-.121.04a.684.684,0,0,1-.2.081h-.04l-.04.04c-.04.04-.162.04-.162.121-.04,0-.04.121-.04.162-.04.607.04,1.294,0,1.82,0,.121-.04.162,0,.162.04.04,0,.324,0,.324,0,.121.04.243.04.324,0,.04-.04.081-.04.121v.162c0,.364.04.688.04.971,0,.081.04.162.04.243,0,.04-.04.081-.04.162v.162a9.5,9.5,0,0,0-.04,1.092,8.268,8.268,0,0,0,0,1.416c.121.121.324.121.445.162a5.061,5.061,0,0,1,.93.283,1.449,1.449,0,0,1,.445.162.04.04,0,0,0,.04.04.683.683,0,0,0,.2.081,1.906,1.906,0,0,0,.2.081c.081.04.2.081.283.121a33482.145,33482.145,0,0,1,.4.162.306.306,0,0,0,.162.04.149.149,0,0,0,.121.04c.04,0,0,.04.04.04.04.04.081,0,.121.04a.04.04,0,0,0,.04.04h.04c.04,0,0,.04.04.04a3.207,3.207,0,0,1,.364.162l.04.04a.306.306,0,0,0,.162.04.427.427,0,0,0,.2.081l.04.04a.306.306,0,0,0,.162.04.427.427,0,0,0,.2.081,3.8,3.8,0,0,0,.607.243l.04.04a.593.593,0,0,1,.162.081l.04.04c.162.081.4.162.566.243.04,0,.081.04.121.04s.081.04.121.04c.081,0,.162.081.2.081a.355.355,0,0,0,.283.04C58.2,101.153,58.161,101.031,58.121,100.91Zm-9.585-8.857h-.081a3.07,3.07,0,0,1-.647.04c-.2,0-.364-.04-.526-.04-.121,0-.2.081-.324.121a.243.243,0,0,1-.162.04l-.162.081a2.286,2.286,0,0,0,0,.526,4.644,4.644,0,0,0,.04.768c.04.162,0,.243.04.4a7.793,7.793,0,0,1,.04.971c0,.283.04.526.04.809s-.04.566-.04.809c0,.2.04.364.04.566s.04.728-.04.809V98a.393.393,0,0,0,.04.364c.162.162.485.081.607.04h.081c.04,0,.081-.04.121-.04a.688.688,0,0,1,.283-.04,6.173,6.173,0,0,0,1.254-.04,1.452,1.452,0,0,0,.081-.728V95.127c0-.526-.04-1.052-.04-1.577a4.128,4.128,0,0,0-.162-1.456A.658.658,0,0,0,48.535,92.053Z" transform="translate(0 0)" fill="#111d30" fillRule="evenodd"/>
            <path id="Tracé_240" data-name="Tracé 240" d="M221.586,97.725a.513.513,0,0,1,.243-.04.661.661,0,0,1,.283,0c.04,0,.081.04.121.04h.283a.04.04,0,0,0,.04.04.6.6,0,0,1,.283.121.141.141,0,0,1,.04.081,1.823,1.823,0,0,0,.445.121.125.125,0,0,0,.04.081c.04.04.081.04.121.081a.125.125,0,0,0,.04.081c.04,0,.081.04.121.081a.125.125,0,0,0,.04.081c.04,0,.081.04.121.081l.121.121c.081.081.162.2.243.283a2.025,2.025,0,0,1,.283.324.04.04,0,0,1,.04.04c0,.04.081.081.081.121a.141.141,0,0,0,.04.081.125.125,0,0,0,.04.081c0,.04.04.04.04.081a.125.125,0,0,0,.04.081c0,.04.04.04.04.081.04.04.04.081.081.121.04.081.121.121.162.2a.04.04,0,0,1,.04.04c0,.04.081.081.081.121a.141.141,0,0,0,.04.081c0,.04,0,.04.04.081,0,.04.04.04.04.081v.04s.081.081.081.121a.141.141,0,0,0,.04.081c.04.04.04.081.081.121,0,.04.121.121.121.162s.04.04.04.081v.04a2.784,2.784,0,0,1,.121.324.04.04,0,0,1,.04.04.149.149,0,0,0,.04.121c0,.04.04.04.04.081v.04c.04.04,0,.04.04.081l.04.081c.04.04.04.04.04.081v.04c.04.04.04.162.081.283a.04.04,0,0,1,.04.04,3.4,3.4,0,0,0,.162.485c.04.081,0,.162.04.283a.04.04,0,0,1,.04.04s0,.162.04.162c.04.04.04.081.04.2,0,.04.04.081.04.162a3.268,3.268,0,0,1,.04.647c0,.324.04.566.04.89v.162c0,.04-.04.04-.04.081-.04.485-.04,1.011-.121,1.456a.575.575,0,0,1-.081.243c0,.081-.04.162-.04.243a.04.04,0,0,0-.04.04.243.243,0,0,1-.04.162.04.04,0,0,0-.04.04c0,.081,0,.121-.04.162-.04.162-.081.283-.121.4-.081.162-.121.324-.2.485-.04.081-.081.2-.121.283a.04.04,0,0,1-.04.04c0,.04-.04.04-.04.081s-.04,0-.04.04c-.04.04,0,.081-.04.121,0,.04-.04.04-.081.04-.04.04,0,.081-.04.121a.04.04,0,0,0-.04.04.307.307,0,0,1-.081.162c0,.04-.04.04-.081.04v.04a.311.311,0,0,0-.081.121.04.04,0,0,0-.04.04c0,.04-.04.081-.081.121a2.18,2.18,0,0,1-.121.4c0,.04,0,.04-.04.081a.141.141,0,0,1-.081.04c0,.04,0,.04-.04.081a.89.89,0,0,1-.2.243l-.162.162h-.04c-.04.04-.04.081-.081.081s-.081.081-.121.121h-.04a.432.432,0,0,1-.2.121l-.243.121c-.04,0-.081.04-.121.04a1.589,1.589,0,0,1-.607-.04c-.081-.04-.121-.081-.162-.081s-.04-.04-.04-.081h-.04a.461.461,0,0,1-.121-.243v-.04c-.081-.081.04-.324.121-.526a.04.04,0,0,0,.04-.04v-.04a3.741,3.741,0,0,1,.2-.4.593.593,0,0,0,.081-.162c0-.04.081-.162.081-.2s.04-.081.081-.121c0-.04.081-.121.081-.2,0-.04.04-.081.081-.162a.04.04,0,0,1,.04-.04l.081-.081.04-.04c.04-.04,0-.081.04-.121a.04.04,0,0,0,.04-.04c0-.04.04-.081.081-.121a.593.593,0,0,0,.081-.162l.04-.04c.081-.121.121-.283.2-.4.04-.04.04-.121.081-.162,0-.04.04-.081.081-.162a.04.04,0,0,1,.04-.04,1.434,1.434,0,0,0,.121-.445c.04-.081.04-.121.081-.2a1.751,1.751,0,0,1,.04-.2.04.04,0,0,0,.04-.04.243.243,0,0,1,.04-.162c0-.081.04-.121.04-.2a.04.04,0,0,0,.04-.04,1.78,1.78,0,0,1,.081-.4,3.478,3.478,0,0,0,.04-.647,7.482,7.482,0,0,0,.04-1.9.75.75,0,0,0-.081-.283,1.752,1.752,0,0,0-.04-.2.04.04,0,0,1-.04-.04.44.44,0,0,1-.04-.2,1.751,1.751,0,0,1-.04-.2.04.04,0,0,1-.04-.04v-.04a.838.838,0,0,0-.081-.243,1.753,1.753,0,0,1-.04-.2.04.04,0,0,1-.04-.04c0-.04,0-.04-.04-.081a.885.885,0,0,0-.121-.2.04.04,0,0,1-.04-.04c0-.04-.04-.081-.04-.121a.141.141,0,0,1-.04-.081,4.414,4.414,0,0,1-.243-.445c0-.04-.04-.04-.04-.081s-.04-.04-.04-.081v-.04c0-.04-.081-.081-.081-.081v-.04l-.04-.04v-.04h-.04v-.04h-.04a.149.149,0,0,1-.04-.121l-.081-.081c0-.04,0-.04-.04-.081,0-.04-.081-.081-.081-.121s-.04-.04-.04-.081v-.04c-.04-.04-.121-.081-.162-.162a2.616,2.616,0,0,0-.324-.364c-.162-.162-.324-.283-.526-.485-.04-.04-.121-.081-.121-.121,0-.081-.162-.162-.2-.2a.149.149,0,0,1-.04-.121.04.04,0,0,1-.04-.04v-.04c-.04-.081,0-.2.04-.4C221.505,97.968,221.465,97.846,221.586,97.725Z" transform="translate(-152.465 -10.242)" fill="#111d30" fillRule="evenodd"/>
            <path id="Tracé_241" data-name="Tracé 241" d="M191.568,108.485h0a.863.863,0,0,1,.324,0,.307.307,0,0,1,.162.081l.04.04c.162.04.324.081.445.121a.04.04,0,0,0,.04.04c.081,0,.121.121.2.162a.04.04,0,0,0,.04.04c.04,0,.04.04.04.081h.04c.04.04.04.081.081.081h.04a1.544,1.544,0,0,0,.364.364l.081.081a.125.125,0,0,0,.04.081h.04c.04.04.04.081.081.081a.04.04,0,0,1,.04.04.04.04,0,0,0,.04.04c.04.04.121.081.162.121,0,.04.081.081.081.081v.04l.04.04a.883.883,0,0,1,.121.2l.04.04v.04c0,.04.081.04.081.081v.04l.04.04v.04a2.244,2.244,0,0,1,.243.324.04.04,0,0,1,.04.04c0,.04.04.04.04.081s.04.04.04.081.04.081.081.162c0,.04,0,.04.04.081s.04.162.081.2a2.319,2.319,0,0,1,.162.566c0,.04,0,.04.04.081,0,.081.04.162.04.243a.04.04,0,0,1,.04.04v.04a.306.306,0,0,0,.04.162c.04.121.04.2.081.324v.04a2.136,2.136,0,0,1,.04.526v.162h.04a7.135,7.135,0,0,1,.04,1.335c-.04.364-.081.647-.121.971a1.286,1.286,0,0,1-.121.364v.04h-.04c-.04.04,0,.121-.04.162a.04.04,0,0,0-.04.04c0,.04-.04.081-.081.162a1.974,1.974,0,0,0-.121.283.04.04,0,0,0-.04.04c0,.04-.04.081-.081.121l-.04.04a1.818,1.818,0,0,1-.243.485c0,.04-.04.04-.081.04l-.162.162a1.759,1.759,0,0,1-.283.243,3.207,3.207,0,0,1-.364.162h-.04c-.04.04-.081,0-.2.04a1.919,1.919,0,0,1-.485,0c-.04,0-.081-.04-.162-.04h-.04a.04.04,0,0,0-.04-.04l-.081-.04-.121-.121a.04.04,0,0,1-.04-.04c0-.04-.04-.04-.04-.081-.04-.04,0-.162,0-.243a.04.04,0,0,1-.04-.04.04.04,0,0,0,.04-.04.365.365,0,0,1,.04-.2.141.141,0,0,1,.081-.04c.04-.081,0-.162.04-.2.081-.2.243-.445.324-.647.04-.121.121-.2.162-.324.04-.04.04-.121.081-.162a.141.141,0,0,1,.081-.04c0-.04.04-.04.04-.081a2.79,2.79,0,0,0,.121-.324,1.664,1.664,0,0,1,.121-.324v-.04l.04-.04v-.283a4.075,4.075,0,0,0,.081-.768v-.243a4.158,4.158,0,0,0-.04-.688c0-.121-.04-.2-.04-.324v-.04a.149.149,0,0,0-.04-.121c0-.04,0-.04-.04-.081,0-.04-.04-.162-.04-.243a.04.04,0,0,1-.04-.04c0-.081-.04-.121-.04-.2a3.787,3.787,0,0,0-.162-.647,2.416,2.416,0,0,0-.243-.445c0-.04-.04-.04-.04-.081v-.04l-.04-.04c-.04-.04-.04-.121-.121-.2l-.243-.243c-.081-.04-.121-.121-.2-.162-.04-.04-.04-.081-.081-.081a5.287,5.287,0,0,0-.445-.485.04.04,0,0,0-.04-.04.583.583,0,0,1-.243-.283.89.89,0,0,1-.04-.324.863.863,0,0,1,0-.324.04.04,0,0,0,.04-.04c0-.04,0-.081.04-.081a.125.125,0,0,0,.081-.04v-.04h.04c.04-.04.04-.081.081-.081C191.446,108.525,191.527,108.485,191.568,108.485Z" transform="translate(-126.289 -19.586)" fill="#111d30" fillRule="evenodd"/>
            <path id="Tracé_242" data-name="Tracé 242" d="M166.264,121.24c.04,0,.04-.04,0,0,.04-.04.081,0,.121,0a.6.6,0,0,1,.243.04.04.04,0,0,0,.04.04h.283a.04.04,0,0,0,.04.04c.081,0,.081.04.162.081h.04a.966.966,0,0,0,.283.121.04.04,0,0,0,.04.04c.04,0,.081.04.121.081a.141.141,0,0,1,.04.081c.04.04.081.04.162.081l.121.121a.307.307,0,0,0,.162.081c0,.04,0,.081.04.081a.04.04,0,0,1,.04.04c0,.04,0,.081.04.081a.04.04,0,0,1,.04.04.141.141,0,0,0,.04.081,1.229,1.229,0,0,0,.2.283c.04.081.121.121.162.2a.04.04,0,0,1,.04.04v.04a.282.282,0,0,1,.081.162v.04c0,.04.04.04.04.081.04.04.04.162.04.243a1.468,1.468,0,0,0,.121.283,3.507,3.507,0,0,1,.081.4c0,.04,0,.04.04.081,0,.04.081.121.081.2v.243a3.425,3.425,0,0,1-.04.89,3.7,3.7,0,0,0-.04.647.04.04,0,0,0-.04.04.437.437,0,0,1-.121.283.04.04,0,0,0-.04.04v.04c0,.04-.04.04-.081.04-.04.04-.04.081-.081.162a.04.04,0,0,0-.04.04v.04l-.121.121c0,.04,0,.081-.04.081a.125.125,0,0,0-.081.04c0,.04,0,.04-.04.081,0,.04-.04.04-.081.04-.04.04,0,.081-.04.081a.125.125,0,0,0-.081.04c-.081.081-.121.162-.2.243a1.347,1.347,0,0,1-.243.121c-.04.04-.04.081-.081.081a3.813,3.813,0,0,1-.364.121.6.6,0,0,1-.526-.081.04.04,0,0,0-.04-.04c-.04,0-.04-.04-.04-.081h-.04a.125.125,0,0,0-.04-.081h-.04a.558.558,0,0,1-.121-.162.04.04,0,0,1-.04-.04v-.04a.306.306,0,0,1-.04-.283c0-.04.04-.04.04-.081s.04-.04.04-.081a.04.04,0,0,1,.04-.04,3.817,3.817,0,0,1,.121-.364.04.04,0,0,0,.04-.04c0-.04.04-.081.081-.121l.081-.081.04-.04c.04-.04,0-.081.04-.121a.04.04,0,0,0,.04-.04c0-.04.04-.04.081-.081,0-.04.04-.04.081-.081,0-.04.04-.081.081-.121a1.973,1.973,0,0,0,.121-.566c0-.243.081-.607.081-.93a1.054,1.054,0,0,0-.121-.445.149.149,0,0,0-.04-.121.141.141,0,0,1-.04-.081c-.04-.081,0-.121-.04-.2-.04-.04-.04-.081-.081-.162-.04-.04-.04-.121-.081-.162a.141.141,0,0,1-.04-.081c-.04-.04-.04-.081-.081-.162a.125.125,0,0,0-.04-.081,1.073,1.073,0,0,0-.243-.2l-.121-.121c-.04-.04-.081,0-.081-.04-.04,0-.04-.04-.04-.081-.04-.04-.121-.04-.162-.081l-.121-.121c-.04-.04-.081,0-.081-.04-.04-.04,0-.081-.04-.081-.04-.04-.081-.04-.081-.121v-.283a1.751,1.751,0,0,1,.04-.2.04.04,0,0,0,.04-.04c0-.04.04-.04.081-.04a.638.638,0,0,1,.324-.2C166.224,121.24,166.264,121.24,166.264,121.24Z" transform="translate(-104.342 -30.603)" fill="#111d30" fillRule="evenodd"/>
          </g>
        </g>
        <g id="Groupe_295" data-name="Groupe 295" transform="translate(-8792 -617)">
          <line id="Ligne_71" data-name="Ligne 71" y2="8" transform="translate(8904.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_72" data-name="Ligne 72" y2="14" transform="translate(8909.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_73" data-name="Ligne 73" y2="20" transform="translate(8914.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_74" data-name="Ligne 74" y2="8" transform="translate(8919.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_75" data-name="Ligne 75" y2="4" transform="translate(8924.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_76" data-name="Ligne 76" y2="14" transform="translate(8929.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_77" data-name="Ligne 77" y2="8" transform="translate(8934.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_78" data-name="Ligne 78" y2="14" transform="translate(8939.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_79" data-name="Ligne 79" y2="8" transform="translate(8944.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_80" data-name="Ligne 80" y2="20" transform="translate(8949.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_81" data-name="Ligne 81" y2="20" transform="translate(8954.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_82" data-name="Ligne 82" y2="8" transform="translate(8959.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_83" data-name="Ligne 83" y2="4" transform="translate(8964.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_84" data-name="Ligne 84" y2="14" transform="translate(8969.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_85" data-name="Ligne 85" y2="4" transform="translate(8974.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_86" data-name="Ligne 86" y2="8" transform="translate(8979.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_87" data-name="Ligne 87" y2="14" transform="translate(8984.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_88" data-name="Ligne 88" y2="4" transform="translate(8989.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_89" data-name="Ligne 89" y2="20" transform="translate(8999.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_90" data-name="Ligne 90" y2="20" transform="translate(8994.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_91" data-name="Ligne 91" y2="8" transform="translate(9004.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_92" data-name="Ligne 92" y2="4" transform="translate(9009.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_93" data-name="Ligne 93" y2="14" transform="translate(9014.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_94" data-name="Ligne 94" y2="8" transform="translate(9019.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_95" data-name="Ligne 95" y2="14" transform="translate(9024.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_96" data-name="Ligne 96" y2="8" transform="translate(9029.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_97" data-name="Ligne 97" y2="20" transform="translate(9034.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_98" data-name="Ligne 98" y2="20" transform="translate(9039.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_99" data-name="Ligne 99" y2="8" transform="translate(9044.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_100" data-name="Ligne 100" y2="4" transform="translate(9049.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_101" data-name="Ligne 101" y2="14" transform="translate(9054.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_102" data-name="Ligne 102" y2="8" transform="translate(9059.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_103" data-name="Ligne 103" y2="14" transform="translate(9064.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_104" data-name="Ligne 104" y2="8" transform="translate(9069.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_105" data-name="Ligne 105" y2="20" transform="translate(9074.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_106" data-name="Ligne 106" y2="20" transform="translate(9079.5 1847.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_107" data-name="Ligne 107" y2="8" transform="translate(9084.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_108" data-name="Ligne 108" y2="4" transform="translate(9089.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_109" data-name="Ligne 109" y2="14" transform="translate(9094.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_110" data-name="Ligne 110" y2="4" transform="translate(9094.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_111" data-name="Ligne 111" y2="8" transform="translate(9099.5 1853.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_112" data-name="Ligne 112" y2="14" transform="translate(9104.5 1850.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_113" data-name="Ligne 113" y2="4" transform="translate(9109.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
          <line id="Ligne_114" data-name="Ligne 114" y2="4" transform="translate(9114.5 1855.5)" fill="none" stroke="#111d30" strokeLinecap="round" strokeWidth="2"/>
            </g>
      </g>
    </svg>

  </div>
}

export default NotebookAudio
