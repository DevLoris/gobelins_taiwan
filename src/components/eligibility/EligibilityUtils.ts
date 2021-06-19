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
        question: "Quel âge avez-vous  ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "< 18 ans",
                correct: EligibilityResponseType.TIP,
                tip: 'Il va falloir attendre encore un peu !'
            },
            {
                response: "18-30 ans",
                correct: EligibilityResponseType.OK,
                tip: 'Nickel'
            },
            {
                response: ">30 ans",
                correct: EligibilityResponseType.FORBIDDEN,
                tip: 'Malheureusement vous êtes trop vieux...'
            }
        ]
    },
    {
        id: "passeport",
        question: "Avez-vous un passeport ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "Oui",
                correct: EligibilityResponseType.OK,
                tip: 'Parfait !  Un critère de remplit !'
            },
            {
                response: "Non",
                correct: EligibilityResponseType.TIP,
                tip: 'Pas de panique, ça se demande facilement.'
            }
        ]
    },
    {
        id: "economy",
        helper: "Afin d'aborder cette expérience unique au mieux, il est important d'avoir un peu d'argent en sa possession.",
        question: "Avez-vous 2200€ d'économie ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "Oui",
                correct: EligibilityResponseType.OK,
                tip: 'Parfait, question suivante !'
            },
            {
                response: "Non",
                correct: EligibilityResponseType.TIP,
                tip: 'Il faut faire quelques économies.'
            }
        ]
    },
    {
        id: "pvt",
        question: "Avez-vous déjà fait un PVT à Taïwan ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "Oui",
                correct: EligibilityResponseType.FORBIDDEN,
                tip: 'Mais que faites-vous ici ?!'
            },
            {
                response: "Non",
                correct: EligibilityResponseType.OK,
                tip: 'Parfait !'
            }
        ]
    }
];
