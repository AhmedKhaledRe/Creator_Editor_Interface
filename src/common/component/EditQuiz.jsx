import React from 'react';
import { Typography } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";
import CreateEditForm from "./CreateEditForm";

const EditQuiz = ({ initialState, setInitialState, history }) => {
    const classes = useStyles();

    return (
        <div style={{margin: "20px auto"}}>
            <Typography align="center" variant="h5" >Edit Quiz</Typography>
            <CreateEditForm/>
        </div>
    );
}

export default withRouter(EditQuiz);