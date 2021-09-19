import React, { useState, useEffect } from 'react';
import { Typography, Paper, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";
import { scoreColor } from "../helper/functions";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const QuestionQuiz = ({ match, history, initialState, setInitialState, initStateQuestion, setInitStateQuestion }) => {
    const classes = useStyles();
    const quizId = match.params.id;
    const moment = require('moment');

    const handleRadioChange = (e) => {
        const {name, value} = e.target;
        let modifiedAnswers = initStateQuestion.selectedQuiz.questions_answers;
        modifiedAnswers[name].answer_id = +value;
        let finalQuiz = {...initStateQuestion.selectedQuiz, 
            score: modifiedAnswers[name].answers.filter(q => +q.id === +value)[0]?.is_true ? +initStateQuestion.selectedQuiz.score + 1 : initStateQuestion.selectedQuiz.score , 
            questions_answers: modifiedAnswers};
        setInitStateQuestion({
            ...initStateQuestion, 
            selectedQuiz: finalQuiz
        })
        if ( initStateQuestion.selectedQuiz.questions_answers.length ===  (+name + 1) ) {
            initialState.listQuizData = initialState.listQuizData.map(u => u.id !== finalQuiz.id ? u : finalQuiz);
            initialState.listQuizData[0].modified = moment().format("YYYY-MM-DD hh:mm:ss");
            setInitialState({...initialState, listQuizData: initialState.listQuizData})
            localStorage.setItem("QuizList", JSON.stringify(initialState.listQuizData));
        }
    };

    useEffect(() => {
        const selected = initialState.listQuizData.filter(da => +da.id === +quizId);
        if (selected.length > 0) {
            setInitStateQuestion({
                ...initStateQuestion, 
                selectedQuiz: selected[0], 
                loaded: true
            });
        }
        else history.push("/")
        return () => {}
        // eslint-disable-next-line
    }, []);

    const renderQuestionList = () => {
        return(
        initStateQuestion?.selectedQuiz?.questions_answers?.length > 0
            ?
            <div style={{position: 'relative'}}>
                <IconButton aria-label="YouTube Link" className={classes.BackIcon} onClick={() =>  history.push("/")}>
                    <ArrowBackIcon />
                </IconButton>
                <div style={{textAlign: 'center', margin: "40px auto"}} >
                    <Typography align="center" variant="h5" component="span" style={{margin:"0px 20px"}} >
                        Title : {initStateQuestion?.selectedQuiz?.title}
                    </Typography>
                    <Typography align="center" variant="h5" component="span" style={{color: `${scoreColor(initStateQuestion?.selectedQuiz)}` }} >
                        Score: {initStateQuestion?.selectedQuiz.score ? initStateQuestion?.selectedQuiz.score : "-"} / {initStateQuestion?.selectedQuiz.questions_answers.length}
                    </Typography>
                </div>
                {initStateQuestion?.selectedQuiz?.questions_answers?.map((questionElement, questionElementIndex) => {
                    return (
                        <Paper key={questionElementIndex} variant="outlined" className={classes.paper}  >
                            <Typography style={{margin: "20px auto"}} variant="h5">{`(${questionElementIndex + 1})`} {questionElement.text}</Typography>
                            <RadioGroup
                                value={questionElement.answer_id ? +questionElement.answer_id : null}
                                onChange={handleRadioChange}
                            >
                                {questionElement.answers.map((ans, answerIndex) => {
                                    console.log({ans})
                                    return(
                                        <FormControlLabel 
                                            key={answerIndex}
                                            disabled={questionElement?.answer_id !== null} 
                                            value={ans?.id}
                                            checked={Boolean(ans?.id === +questionElement?.answer_id)}
                                            name={""+questionElementIndex}
                                            control={<Radio />} 
                                            label={ans.text} />
                                    )})
                                }
                            </RadioGroup>
                            {questionElement.answer_id !== null
                                ? (questionElement.answers.filter(q => +q.id === +questionElement.answer_id)[0]?.is_true 
                                        ?   <Typography style={{ color: "Green" }} variant="h5">{questionElement.feedback_true}</Typography> 
                                        :   <Typography style={{ color: "Red" }} variant="h5">{questionElement.feedback_false}</Typography>)
                                : null
                            }
                        </Paper>
                    )})}
                </div>
            :
                <Typography color="red" variant="h4">
                    No Question Exists
                </Typography>
        )
    }

    return (
        initStateQuestion.loaded 
            ? renderQuestionList()
            : <div className={classes.loading}>
                <div>Loading...</div>
            </div>
    );
}

export default withRouter(QuestionQuiz);