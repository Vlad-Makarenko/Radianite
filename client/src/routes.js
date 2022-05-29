
import React from 'react';
import {Routes, Route, Navigate } from 'react-router-dom';
// import { AuthPage } from './pages/AuthPage';
import {Battle} from './pages/Battle'
import {Home} from './pages/Home'
import { Profile } from './pages/Profile';
import { Rules } from './pages/Rules';
import {Auth} from './pages/Auth'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Routes path>
                <Route path='/' element={<Battle />} exact />                   
                <Route path='/battle' element={<Home />} exact />                    
                <Route path='/rules' element={<Rules />} exact />
                <Route path='/profile' element={<Profile />} exact />
                {/* <Route path='/battle/:id' element={<Battle />} exact /> */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        )
    }
    return(
        <Routes>
            <Route path='/' element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}