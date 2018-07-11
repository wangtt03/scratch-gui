import 'es6-object-assign/auto';
import 'core-js/fn/array/includes';
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
appTarget.className = styles.app;

GUI.setAppElement(appTarget);
const WrappedGui = HashParserHOC(AppStateHOC(GUI));

// TODO a hack for testing the backpack, allow backpack host to be set by url param
const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

const backpackOptions = {
    visible: true,
    host: backpackHost
};

if (!projectDataInfo) {
    ReactDOM.render(<WrappedGui backpackOptions={backpackOptions} />, appTarget);
} else {
    ReactDOM.render(<WrappedGui projectData={projectDataInfo} backpackOptions={backpackOptions}/>, appTarget);
}
