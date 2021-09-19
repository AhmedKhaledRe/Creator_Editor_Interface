import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import CreateQuiz from "./common/component/CreateQuiz";
import EditQuiz from "./common/component/EditQuiz";
import QuestionQuiz from "./common/component/QuestionQuiz";
import initialData from "./common/helper/initialData";

const IndexRoutes = () => {
    const [initialState, setInitialState] = useState({ loaded: false, listQuizData: [] })
    const [initStateQuestion, setInitStateQuestion] = useState({ loaded: false, selectedQuiz: null })

    useEffect(() => {
        setInitialState({ ...initialState , listQuizData: JSON.parse(localStorage.getItem("QuizList")) || [...initialState.listQuizData, ...initialData], loaded: true });
        return () => {}
        // eslint-disable-next-line
    }, [])
    
    return (
        <Switch>
            <Route exact path="/quiz/create">
                <CreateQuiz initialState={initialState} setInitialState={setInitialState} />
            </Route>
            <Route exact path="/quiz/edit/:id">
                <EditQuiz initialState={initialState} setInitialState={setInitialState} />
            </Route>
            <Route exact path="/quiz/:id">
                <QuestionQuiz initialState={initialState} setInitialState={setInitialState} initStateQuestion={initStateQuestion} setInitStateQuestion={setInitStateQuestion} />
            </Route>
            <Route path="/">
                <App initialState={initialState} setInitialState={setInitialState} />
            </Route>
        </Switch>
    );
};

export default (IndexRoutes);