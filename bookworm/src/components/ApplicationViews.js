import React from "react"
import { Route } from "react-router-dom"

import { Goals } from "./modules/goals/Goals"
import { GoalForm } from "./modules/goals/GoalsForm"
import { GoalEditForm } from "./modules/goals/GoalEditForm"

import { RecList } from "./modules/recommend/RecommendForum"
import { RecForm } from "./modules/recommend/RecForm"
import { RecEditForm } from "./modules/recommend/RecEditForm"

import { BookList } from "./modules/books/BookList"
import { BookForm } from "./modules/books/BookForm"
import { BookEditForm } from "./modules/books/BookEditForm"


export const ApplicationViews = () => {
    return (
        <>
         {/* Render the component for goals pages */}
          <Route exact path="/">
            <Goals />
          </Route>
          <Route path="/goals/create">
            <GoalForm />
          </Route>
          <Route path="/goals/:goalId(\d+)/edit">
            <GoalEditForm />
          </Route>

          <Route exact path="/recommend">
            <RecList />
          </Route>
          <Route exact path="/recommend/add">
            <RecForm />
          </Route>
          <Route exact path="/recommend/:recId(\d+)/edit">
            <RecEditForm />
          </Route>

          <Route exact path= "/bookdata">
            <BookList />
          </Route>
          <Route exact path="/bookdata/add">
            <BookForm />
          </Route>
          <Route exact path="/bookdata/:bookId(\d+)/edit">
            <BookEditForm />
          </Route>

        </>
    )
}