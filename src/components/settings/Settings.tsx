import css from './Settings.module.less';
import React from 'react';
import {merge} from "../../lib/utils/arrayUtils";
import SettingsClose from "./settingsClose/SettingsClose";
import SettingsForm from "./settingsForm/SettingsForm";
import NotebookTitle from "../notebook/notebookTitle/NotebookTitle";

interface IProps {
    className?: string,
    show?: boolean,
    onClose: () => void,
}

Settings.defaultProps = {
    show: false,
    onClose: () => {}
}

const componentName = "Settings";
const debug = require("debug")(`front:${componentName}`);

/**
 * Options de qualité du jeu
 * @name Settings
 */
function Settings(props: IProps) {

    return <div className={merge([css.root, props.className, props.show ? css.open : null])}>
        <div className={css.menu}>
            <SettingsClose onClick={props.onClose}/>
        </div>
        <div className={css.content}>
            <NotebookTitle title={"Qualité"} phonetic={"Zhìliàng"} chinese_title={"質量"}/>
            <SettingsForm onClose={props.onClose}/>

            <hr/>
            <NotebookTitle title={"À propos"} phonetic={"Guānyú"} chinese_title={"關於"}/>

            <div className={css.contentBlock}>
                <p className={"bigger"}>« Départ pour Taïwan » est une expérience interactive et ludique présentant le visa vacances travail appliqué à Taïwan. Un pays méconnu à la croisée de la culture chinoise, japonaise et américaine d’une richesse insoupçonnée pour sa taille.</p>
            </div>
            <hr/>
            <div className={css.contentBlock}>
                <h2>Crédits</h2>
                <div>
                    <div className={css.creditLine}>
                        <strong>Designers :</strong>
                        <p className={"bigger"}>Antoine Rault, Sandra Pereira Da Costa, Sulyvan Batt</p>
                    </div>
                    <div className={css.creditLine}>
                        <strong>Développeurs :</strong>
                        <p className={"bigger"}>Loris Pinna, Mickaël Debalme, Sonia Rouabhi</p>
                    </div>
                    <div className={css.creditLine}>
                        <strong>Vloggers :</strong>
                        <p className={"bigger"}>Rodolphe Miez, Jimmy Beunardeau</p>
                    </div>
                    <div className={css.creditLine}>
                        <strong>Voix Off :</strong>
                        <p className={"bigger"}>Pia Véran</p>
                    </div>
                    <div className={css.creditLine}>
                        <strong>Sound Design :</strong>
                        <p className={"bigger"}>Félix Vigne</p>
                    </div>
                    <div className={css.creditLine}>
                        <strong>Musique :</strong>
                        <p className={"bigger"}>Four Pens</p>
                    </div>
                </div>
            </div>
            <hr/>
            <div className={css.contentBlock}>
                <h2>Remerciements</h2>
                <div className={css.imageList}>
                    <img src={"/public/logo_gobelins.png"} alt={"Gobelins"}/>
                    <img src={"/public/logo_ambassade.png"} alt={"Ambassade"}/>
                </div>
            </div>
        </div>
    </div>
}

export default Settings
