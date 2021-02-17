import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './Components/Auth/Auth.js'
import Dash from './Components/Dash/Dash.js'
import Form from './Components/Form/Form.js'
import Post from './Components/Post/Post.js'

export default (
    <Switch>
        <Route exact path = "/" component={Auth}/>
        <Route path = "/dash" component={Dash}/>
        <Route path = "/form" component={Form}/>
        <Route path = "/post/:id" component={Post}/>
    </Switch>
)