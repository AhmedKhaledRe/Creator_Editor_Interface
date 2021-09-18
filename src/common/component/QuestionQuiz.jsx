import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";
import { scoreColor } from "../helper/functions";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const QuestionQuiz = ({ match, history, initialState, setInitialState }) => {
    const classes = useStyles();
    const quizId = match.params.id;
    const [initStateQuestion, setInitStateQuestion] = useState({ loaded: false, selectedQuiz: null })
    const handleRadioChange = (e) => {
        const {name, value} = e.target;
        console.log({name});
        console.log({value})
    };

    // const handleAnswer = (e) => {
    //     const newItems = [...questions];
    //     newItems[e.target.name].answer_id = e.target.value
    //     setQuestions(newItems);

    //     if (newItems[e.target.name].answers[e.target.value].is_true) {
    //         const NumRight = numRight
    //         setNumRight(NumRight + 1)
    //     }

    // };

    console.log(initStateQuestion.selectedQuiz)

    useEffect(() => {
            const selected = initialState.listQuizData.filter(da => +da.id === +quizId)
            if (selected.length > 0) {
                console.log({selected})
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
                        <Paper variant="outlined" className={classes.paper}  >
                            <Typography style={{margin: "20px auto"}} variant="h5">{`(${questionElementIndex + 1})`} {questionElement.text}</Typography>
                            <RadioGroup
                                value={questionElement.answer_id ? +questionElement.answer_id : null}
                                onChange={handleRadioChange}
                            >
                                {questionElement.answers.map((ans, answerIndex) =>
                                    <FormControlLabel 
                                        key={answerIndex}
                                        disabled={questionElement?.answer_id} 
                                        value={+ans?.id}
                                        name={questionElementIndex}
                                        control={<Radio />} 
                                        label={ans.text} />
                                )}
                            </RadioGroup>
                            {questionElement.answer_id && (
                                questionElement.answers[questionElement.answer_id]?.is_true 
                                    ?   <Typography style={{ color: "Green" }} variant="h5">{questionElement.feedback_true}</Typography> 
                                    :   <Typography style={{ color: "Red" }} variant="h5">{questionElement.feedback_false}</Typography>)
                            }
                        </Paper>
                    )})}
                    {initStateQuestion?.selectedQuiz.questions_answers.length === +initStateQuestion?.selectedQuiz.score &&
                        <diV style={{margin: "20px auto", textAlign: "center"}}>
                            <Button variant="outlined" color="primary" > Go Back </Button>
                        </diV>
                    }
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