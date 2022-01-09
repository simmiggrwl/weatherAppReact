import React from 'react';
import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage';
import InfoPage from '../pages/InfoPage';

const RouteViews = () => (<main>
    <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/info/:city/:country" element={<InfoPage/>}/>
    </Routes>
</main>
);

export default RouteViews;