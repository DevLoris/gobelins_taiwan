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
    tip_final?:string;
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
                response: "< 18 ans",
                correct: EligibilityResponseType.TIP,
                tip: 'Il va falloir attendre encore un peu !',
                tip_final: 'Attends quelques temps, tu pourras partir en PVT !'
            },
            {
                response: "18-30 ans",
                correct: EligibilityResponseType.OK,
                tip: 'Nickel'
            },
            {
                response: ">30 ans",
                correct: EligibilityResponseType.FORBIDDEN,
                tip: 'Malheureusement tu es trop vieux...'
            }
        ]
    },
    {
        id: "passeport",
        question: "As-tu un passeport ?",
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
                tip: 'Pas de panique, ça se demande facilement.',
                tip_final: 'Fais ta demande de passeport.'
            }
        ]
    },
    {
        id: "economy",
        helper: "Afin d'aborder cette expérience unique au mieux, il est important d'avoir un peu d'argent en sa possession.",
        question: "As-tu 2200€ d'économie ?",
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
                tip: 'Il faut faire quelques économies.',
                tip_final: 'Prépare quelques économies pour être prêt à partir.'
            }
        ]
    },
    {
        id: "pvt",
        question: "As-tu déjà fait un PVT à Taïwan ?",
        type: EligibilityQuestionType.RADIO,
        response: [
            {
                response: "Oui",
                correct: EligibilityResponseType.FORBIDDEN,
                tip: 'Mais que fais-tu ici ?!'
            },
            {
                response: "Non",
                correct: EligibilityResponseType.OK,
                tip: 'Parfait !'
            }
        ]
    }
];
