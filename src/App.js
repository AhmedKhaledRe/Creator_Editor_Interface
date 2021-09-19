import React from 'react';
import { withRouter } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Quiz from "./common/component/Quiz";
import './App.css';
import { Typography, Grid, Button } from "@material-ui/core";
import initialData from "./common/helper/initialData";

function App({ history, initialState, setInitialState }) {

  const resetApp = () => {
    localStorage.removeItem("QuizList");
    setInitialState({ ...initialState , listQuizData: initialData});
  }
  const renderQuizList = () => {
    return(
      <div className="app_main_div">
        <Typography align="center" variant="h4" >List Of Quiz</Typography>
        <Button 
          style={{position: "absolute", top: 80, right: 20, color: "red"}} 
          variant="outlined" 
          onClick={() => resetApp()} 
        >
          Reset App
        </Button>
        <div className="quiz_main_div">
          {initialState.loaded 
            ? 
              initialState.listQuizData.length > 0 
                ? <Grid container justifyContent="center" spacing={3}>
                    {initialState.listQuizData.map((dataQuiz, index) => {
                      return(
                          <Grid key={index} item xs={10} md={4}>
                            <Quiz num={index} data={dataQuiz} setInitialState={setInitialState} initialState={initialState} />
                          </Grid>
                      )
                    })}
                  </Grid>
                : <div>No Quiz Exists</div>
            : <div>Loading...</div> 
          }
        </div>
      </div>
    );
  }

  return (
    <div className="App">

      {/* Quiz List Sections */}
      {renderQuizList()}

      {/* Create Quiz Float Icon */}
      <Fab className="AddIcon" aria-label="add" onClick={() => history.push("/quiz/create")} >
        <AddIcon />
      </Fab>

    </div>
  )
}

export default withRouter(App);
