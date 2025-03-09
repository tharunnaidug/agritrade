import React from 'react'
import AppContext from './AppContext'

const AppState = (props) => {
    const url = "http://localhost:3000";

    return (
        <AppContext.Provider value={{}}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState