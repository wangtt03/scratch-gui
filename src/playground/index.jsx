// Polyfills
import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
import 'intl'; // For Safari 9
import React from 'react';
import ReactDOM from 'react-dom';

import analytics from '../lib/analytics';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import AppStateHOC from '../lib/app-state-hoc.jsx';

import styles from './index.css';

if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
    // Warn before navigating away
    window.onbeforeunload = () => true;
}

// Register "base" page view
analytics.pageview('/');

const appTarget = document.getElementById('scratch-gui');
appTarget.className = appTarget.className + " " + styles.app;

GUI.setAppElement(appTarget);
const WrappedGui = HashParserHOC(AppStateHOC(GUI));

// TODO a hack for testing the backpack, allow backpack host to be set by url param
const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

const backpackOptions = {
    visible: true,
    host: backpackHost
};

if (!global.projectDataInfo) {
    ReactDOM.render(<WrappedGui backpackOptions={backpackOptions} isPlayerOnly={global.scratch_isPlayerOnly} isFullScreen={global.scratch_isFullScreen}/>, appTarget);
} else {
    ReactDOM.render(<WrappedGui projectData={projectDataInfo} isPlayerOnly={global.scratch_isPlayerOnly} isFullScreen={global.scratch_isFullScreen} backpackOptions={backpackOptions}/>, appTarget);
}
