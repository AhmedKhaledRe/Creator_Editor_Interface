import React, { useState } from 'react';
import { compose } from "recompose";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Checkbox, Paper, Grid, FormControlLabel, Button } from '@material-ui/core';
import { withRouter } from "react-router-dom";
import { useStyles } from "./QuizStyle";
import { validate } from "../helper/validate";
import { quizFields } from '../helper/quizFormFields';
import MuiTextField from "../helper/MuiTextField";
import DeleteIcon from '@material-ui/icons/Delete';

const CreateEditForm = ({ initialState, setInitialState, history, formData, initialValues, handleSubmit }) => {
    const classes = useStyles();
    const moment = require('moment');
    const [ questions, setQuestions ] = 
        useState([{id: 0, answer_id: null, feedback_false: "", feedback_true: "", text: "", answers: [ {id: 0, is_true: false, text: ""}]}]);

    const DeleteQuestion = (id) => {
        let newQuestions = questions;
        newQuestions.splice(newQuestions.findIndex(function(i){
            return +i.id === +id;
        }), 1);
        setQuestions([...newQuestions]);
    };

    const AddAnswer = (questionIndex) => {
        let newAnsrwes = questions[+questionIndex].answers.concat( {id: questions[+questionIndex].answers.length, is_true: false, text: ""} );
        questions[+questionIndex].answers = newAnsrwes;
        setQuestions([...questions])
    }

    const AddQuestion = () => {
        let newQuestions = questions.concat( {id: questions.length, answer_id: null, feedback_false: "", feedback_true: "", text: "", answers: [ { id : 0 }] });
        setQuestions([...newQuestions])

        // setQuestions([...questions, { id: questions.length, answer_id: null, feedback_false: "", feedback_true: "", text: "", answers: [ { id : 0 } ] }])
    };

    const DeleteAnswer = (questionNewIndex, newAnswerIndex) => {
        let newQuestions = questions;
        newQuestions[questionNewIndex].answers.splice(newQuestions[questionNewIndex].answers.findIndex(function(i){
            return +i.id === +newAnswerIndex;
        }), 1);
        setQuestions([...newQuestions]);
    };

    const AnswerValue = (e, questionNewIndex, newAnswerIndex)=> {  
        const {value} = e.target;
        if (e.target.type === "checkbox") {
            questions[questionNewIndex].answers.find(item => item.id === newAnswerIndex).is_true = value === 'false' ? true : false;
            setQuestions([...questions]);
        }
        else {
            questions[questionNewIndex].answers.find(item => item.id === newAnswerIndex).text = value;
            setQuestions([...questions]);        
        }
    };

    const handleEnterText = (e, questionNewIndex) => {
        const {name, value} = e.target;
        if (name.includes("feedback")) questions[questionNewIndex][name.split("*")[0]] = value;
        else questions[questionNewIndex][name.split("_")[0]] = value;
        setQuestions([...questions]);
    }

    const submit = (values) => {
        const data = [
            ...initialState.listQuizData,
            {
                "created": moment().format("YYYY-MM-DD hh:mm:ss"),
                "description": formData.quizForm.values.description,
                "id": Math.floor(Math.random() * 100),
                "modified": moment().format("YYYY-MM-DD hh:mm:ss"),
                "questions_answers": [...questions],
                "score": null,
                "title": formData.quizForm.values.title,
                "url": formData.quizForm.values.youtube_url
            }
        ];
        setInitialState({ 
            ...initialState , 
            listQuizData: data
        });
        localStorage.setItem("QuizList", JSON.stringify(data));
        history.push("/");
    }
    
    return (
        <form onSubmit={handleSubmit((values) => submit(values))}>
            <Paper variant="outlined" className={classes.paper}>
                <Grid container justifyContent="center" spacing={2} wrap="wrap">
                    {/* names FIELDS */}
                    {quizFields.nameFileds.map((fieldData, index) => {
                        return (
                            <Grid item xs={10} sm={5} md={4} key={index}>
                                <Field
                                    name={fieldData.name}
                                    type={fieldData.type}
                                    label={fieldData.label}
                                    required
                                    component={fieldData.component}
                                />
                            </Grid>
                        );
                    })}

                    {initialValues?.questions_answers?.length > 0 || questions?.length > 0 
                        ? (initialValues?.questions_answers || questions).map((questionNew, questionNewIndex) => {
                            return (
                                <Grid key={questionNewIndex} item xs={12}>
                                    <Paper variant="outlined" className={classes.paper}  >
                                        <Grid container justifyContent="center" spacing={2} style={{position: "relative"}} >
                                            <Grid item xs={12}>
                                                <Grid container justifyContent="center" spacing={2}>
                                                    <Grid item xs={10}>
                                                        <Field name={`text_${questionNew.id}`} type="text" label={`Question ${questionNew.id}`} onChange={(e) => handleEnterText(e, questionNewIndex)} required component={MuiTextField}/>
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Field name={`feedback_true*${questionNew.id}`} type="text" label={`Question Positive Feedback ${questionNew.id}`} onChange={(e) => handleEnterText(e, questionNewIndex)} required component={MuiTextField}/>
                                                    </Grid>
                                                    <Grid item xs={10}>
                                                        <Field name={`feedback_false*${questionNew.id}`}  type="text" label={`Question Negative Feedback ${questionNew.id}`} onChange={(e) => handleEnterText(e, questionNewIndex)} required component={MuiTextField}/>
                                                    </Grid>
                                                </Grid >
                                            </Grid >
                                            {(initialValues?.questions_answers || questions).length > 1 &&
                                                <div style={{position: 'absolute' , top: 5, right: 5 }} >
                                                    <Button variant="outlined" color="secondary" onClick={() => DeleteQuestion(+questionNew.id)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </div>
                                            }
                                        </Grid >

                                        {questionNew?.answers?.map((newAnswer, newAnswerIndex) => {
                                            return(
                                                <Grid key={newAnswerIndex} container justifyContent="center" alignItems="center" spacing={2} style={{position: "relative"}}>
                                                    <Grid item xs={7}>
                                                        <Field name={`Answer_${questionNewIndex}_${newAnswerIndex}`} type="text" label={`Answer ${newAnswer.id}`} onChange={(e) => AnswerValue(e, questionNewIndex, newAnswerIndex)} required component={MuiTextField}/>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    checked={newAnswer?.is_true}
                                                                    onChange={(e) => AnswerValue(e, questionNewIndex, newAnswerIndex)}
                                                                    name={`is_true_${questionNewIndex}_${newAnswerIndex}`}
                                                                    color="primary"
                                                                    value={newAnswer?.is_true}
                                                                    disabled={Boolean(questionNew?.answers?.find(an => an?.is_true === true)) 
                                                                        && +questionNew?.answers?.find(an => an?.is_true === true).id !== +newAnswerIndex
                                                                    }
                                                                />
                                                            }
                                                            label="Right Answer"
                                                        />
                                                    </Grid>
                                                    {questionNew.answers.length > 1 &&
                                                        <div style={{position: 'absolute' , top: 20, right: 5 }} >
                                                            <Button variant="outlined" style={{color: 'red'}} onClick={() => DeleteAnswer(questionNewIndex, newAnswerIndex)}>
                                                                <DeleteIcon />
                                                            </Button>
                                                        </div >
                                                    }
                                                </Grid>
                                            )
                                        }
                                            
                                        )}
                                        <div style={{textAlign: 'center'}}>
                                            <Button variant="outlined" color="primary" fullWidth onClick={() => AddAnswer(questionNewIndex)} >Add Answer</Button>
                                        </div>
                                    </Paper>
                            </Grid>
                        )})
                    : null
                }

                    <Grid container justifyContent="center" spacing={2} wrap="wrap">
                        <Grid item xs={4}>
                            <Button variant="outlined" color="primary" fullWidth
                                onClick={AddQuestion}
                            >
                                Add Question
                            </Button>
                        </Grid>
                        <Grid item xs={4}>
                            <Button type="submit" variant="outlined" fullWidth style={{ color :"green"}} >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
}

const mapStateToProps = ({ form }) => ({ formData: form })

export default compose(
    reduxForm({ form: "quizForm", validate, destroyOnUnmount: true}),
    connect(mapStateToProps, {})
)(withRouter(CreateEditForm));  