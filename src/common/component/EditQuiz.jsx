import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";
import CreateEditForm from "./CreateEditForm";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const EditQuiz = ({ match, history, initialState, setInitialState, initStateQuestion, setInitStateQuestion }) => {
    const classes = useStyles();
    const quizId = match.params.id;

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

    return (
        initStateQuestion?.selectedQuiz?.questions_answers 
        ?
            <div style={{margin: "20px auto", position: "relative"}}>
                <IconButton aria-label="YouTube Link" className={classes.BackIcon} onClick={() =>  history.push("/")}>
                    <ArrowBackIcon />
                </IconButton>            
                <Typography align="center" variant="h5" >Edit Quiz</Typography>
                <CreateEditForm initialState={initialState} setInitialState={setInitialState} initialValues={initStateQuestion?.selectedQuiz}/>
            </div>
        : <div>Loading....</div>
    );
}

export default withRouter(EditQuiz);