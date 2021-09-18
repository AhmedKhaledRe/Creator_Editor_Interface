export const scoreColor = (data) => {
    const percent = (+data.score / +data.questions_answers.length) * 100;
    if (data.score) {
        if (percent < 50) return "#ff0000e3";
        else return "#16b315e3";
    }
    else return "";
}