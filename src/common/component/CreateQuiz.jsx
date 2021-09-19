import React from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";
import CreateEditForm from "./CreateEditForm";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const CreateQuiz = ({ initialState, setInitialState, history }) => {
    const classes = useStyles();

    return (
        <div style={{margin: "20px auto", position: "relative"}}>
            <IconButton aria-label="YouTube Link" className={classes.BackIcon} onClick={() =>  history.push("/")}>
                <ArrowBackIcon />
            </IconButton>
            <Typography align="center" variant="h5" >Create New Quiz</Typography>
            <CreateEditForm setInitialState={setInitialState} initialState={initialState} />
        </div>
    );
}

export default withRouter(CreateQuiz);