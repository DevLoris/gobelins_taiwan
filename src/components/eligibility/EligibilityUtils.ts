/**
 * Comment marche le système de réponse
 * - Une réponse n'est pas forcément vrai ou faux, le test d'éligibité peut avoir des "tips" ou des réponses sans impact
 * - Les tips sont optionnels. Ils sont de l'ordre du "Attends d'avoir 18 ans" etc.
 * - Pareil pour le seuil monétaire
 */

export interface IEligibilityQuestion {
    question: string,
    id: string,
    helper?: string,
    type: EligibilityQuestionType,
    response: IEligibiltyResponse[]
}

export interface IEligibiltyResponse {
    correct: EligibilityResponseType;
    response: string;
    tip?:string;
}

export enum EligibilityQuestionType {
    RADIO = 'radio'
}

export enum EligibilityResponseType {
    FORBIDDEN = 'forbidden',
    TIP = 'tip',
    OK = 'ok'
}

export const QUESTIONS:IEligibilityQuestion[]  = [
    {
        id: "age",
        question: "Quel âge as-tu  ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "Moins de 18 ans",
                correct: EligibilityResponseType.TIP,
                tip: 'Attends tes 18 ans !'
            },
            {
                response: "Entre 18 et 30 ans",
                correct: EligibilityResponseType.OK
            },
            {
                response: "Plus de 30 ans",
                correct: EligibilityResponseType.FORBIDDEN,
                tip: 'Malheureusement tu es trop vieux... :('
            }
        ]
    },
    {
        id: "passeport",
        question: "As-tu ton passeport ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "non :(",
                correct: EligibilityResponseType.TIP,
                tip: 'Il faudra le faire avant de partir à Taïwan !'
            },
            {
                response: "OUIIII",
                correct: EligibilityResponseType.OK
            }
        ]
    }
];
