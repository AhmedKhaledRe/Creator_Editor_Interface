import MuiTextField from "./MuiTextField";

export const quizFields = {
    nameFileds: [
        {
            name: "title",
            label: "Title",
            type: "text",
            component: MuiTextField,
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            component: MuiTextField,
        },
        {
            name: "url",
            label: "YouTube URL",
            type: "text",
            component: MuiTextField,
        }
    ],
}