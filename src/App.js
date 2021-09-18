import React from 'react';
import { withRouter } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Quiz from "./common/component/Quiz";
import './App.css';
import { Typography } from "@material-ui/core";

function App({ history, initialState, setInitialState }) {

  const renderQuizList = () => {
    return(
      <div className="app_main_div">
        <Typography align="center" variant="h4" >List Of Quiz</Typography>
        <div className="quiz_main_div">
          {initialState.loaded 
            ? 
              initialState.listQuizData.length > 0 
                ? initialState.listQuizData.map((dataQuiz, index) => {
                  return(
                    <Quiz key={index} num={index} data={dataQuiz} setInitialState={setInitialState} initialState={initialState} />
                  )
                })
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
