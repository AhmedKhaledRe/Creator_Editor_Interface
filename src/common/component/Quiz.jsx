import React from 'react';
import { withRouter } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { useStyles } from "./QuizStyle";
import EditIcon from '@material-ui/icons/Edit';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import { scoreColor } from "./../helper/functions";

const Quiz = ({ data, num, initialState, setInitialState, history }) => {
    const classes = useStyles();

    const deleteQuiz = (id) => {
        initialState.listQuizData.splice(initialState.listQuizData.findIndex(function(i){
            return i.id === id;
        }), 1);
        setInitialState({...initialState, listQuizData: initialState  })
        // setInitialState({...initialState, listQuizData: initialState.listQuizData.filter(da => +da.id === id)})
    }
    
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar className={classes.avatar}>
                        {num}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="YouTube Link" className={classes.YouTubeIcon} onClick={() =>  window.open(data.url, '_blank').focus()}>
                        <YouTubeIcon />
                    </IconButton>
                }
                title={data.title}
                subheader={data.created}
            />
            <CardContent className={classes.media} style={{ backgroundColor: `${scoreColor(data)}` }}>
                <Typography variant="h2" color="textSecondary">
                    {data.score ? data.score : "-"} / {data.questions_answers.length}
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant="body2" color="textPrimary">
                    {data.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Last Modified : {data.modified}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="Delete Quiz" className={classes.deleteIcon} onClick={() => deleteQuiz(data.id)} >
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Edit Quiz" className={classes.editIcon} onClick={() => history.push(`/quiz/edit/${data.id}`)} >
                    <EditIcon />
                </IconButton>
                <IconButton aria-label="Edit Quiz" className={classes.touchAppIcon} onClick={() => history.push(`/quiz/${data.id}`)} >
                    <TouchAppIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}

export default withRouter(Quiz);