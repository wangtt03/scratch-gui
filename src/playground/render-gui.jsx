import React from 'react';
import ReactDOM from 'react-dom';

import AppStateHOC from '../lib/app-state-hoc.jsx';
import GUI from '../containers/gui.jsx';
import HashParserHOC from '../lib/hash-parser-hoc.jsx';
import TitledHOC from '../lib/titled-hoc.jsx';

/*
 * Render the GUI playground. This is a separate function because importing anything
 * that instantiates the VM causes unsupported browsers to crash
 * {object} appTarget - the DOM element to render to
 */
export default appTarget => {
    GUI.setAppElement(appTarget);
    const WrappedGui = HashParserHOC(AppStateHOC(TitledHOC(GUI)));

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    const backpackOptions = {
        visible: true,
        host: backpackHost
    };
    if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    if (!window.scratchProjectUrl) {
        ReactDOM.render(<WrappedGui backpackOptions={backpackOptions} isPlayerOnly={window.scratch_isPlayerOnly} isFullScreen={window.scratch_isFullScreen}/>, appTarget);
    } else {
        ReactDOM.render(<WrappedGui projectUrl={window.scratchProjectUrl} isPlayerOnly={window.scratch_isPlayerOnly} isFullScreen={window.scratch_isFullScreen} backpackOptions={backpackOptions}/>, appTarget);
    }

};
