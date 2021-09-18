import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import App from "./App";
import CreateQuiz from "./common/component/CreateQuiz";
import EditQuiz from "./common/component/EditQuiz";
import QuestionQuiz from "./common/component/QuestionQuiz";
import initialData from "./common/helper/initialData";

const IndexRoutes = () => {
    const [initialState, setInitialState] = useState({ loaded: false, listQuizData: [] })

    useEffect(() => {
        setInitialState({ ...initialState , listQuizData: [...initialState.listQuizData, ...initialData], loaded: true });
        return () => {}
        // eslint-disable-next-line
    }, [])
    
    return (
        <Switch>
            <Route exact path="/quiz/create">
                <CreateQuiz />
            </Route>
            <Route exact path="/quiz/edit/:id">
                <EditQuiz />
            </Route>
            <Route exact path="/quiz/:id">
                <QuestionQuiz />
            </Route>
            <Route path="/">
                <App initialState={initialState} setInitialState={setInitialState} />
            </Route>
        </Switch>
    );
};

export default (IndexRoutes);