import React from "react"
import { Route } from "react-router-dom"

import { Goals } from "./modules/goals/Goals"
import { GoalForm } from "./modules/goals/GoalsForm"
import { GoalEditForm } from "./modules/goals/GoalEditForm"
import { Library } from "./modules/library/Library"


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

          {/* Render the components for library page */}
          <Route exact path = "/library">
            <Library />
          </Route>
          {/* <Route exact path= "/library/add">
            <AddBookToLib />
          </Route> */}

        </>
    )
}