import React from 'react';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";

const QuestionQuiz = ({ data, num, initialState, setInitialState, history }) => {
    const classes = useStyles();
    
    const scoreColor = () => {
        const percent = (+data.score / +data.questions_answers.length) * 100;
        if (data.score) {
            if (percent < 50) return "#ff0000e3";
            else return "#16b315e3";
        }
        else return "";
    }
    
    return (
        <div>5456465</div>
    );
}

export default withRouter(QuestionQuiz);