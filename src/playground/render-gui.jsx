import React from 'react';
import ReactDOM from 'react-dom';
import {compose} from 'redux';

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

    // note that redux's 'compose' function is just being used as a general utility to make
    // the hierarchy of HOC constructor calls clearer here; it has nothing to do with redux's
    // ability to compose reducers.
    const WrappedGui = compose(
        AppStateHOC,
        HashParserHOC,
        TitledHOC
    )(GUI);

    // TODO a hack for testing the backpack, allow backpack host to be set by url param
    const backpackHostMatches = window.location.href.match(/[?&]backpack_host=([^&]*)&?/);
    const backpackHost = backpackHostMatches ? backpackHostMatches[1] : null;

    if (process.env.NODE_ENV === 'production' && typeof window === 'object') {
        // Warn before navigating away
        window.onbeforeunload = () => true;
    }

    // window.scratchProjectUrl = "gamelab24da0b58-eb925-4735-b65b-faebbf9a38af?rand=0.9064649329831003";

    if (!window.scratchProjectUrl) {
        ReactDOM.render(<WrappedGui
            backpackHost={backpackHost} isPlayerOnly={window.scratch_isPlayerOnly} isFullScreen={window.scratch_isFullScreen}/>, appTarget);
    } else {
        ReactDOM.render(<WrappedGui 
            backpackHost={backpackHost} projectHost="https://stemwebdata.oss-cn-beijing.aliyuncs.com/scratch" projectId={window.scratchProjectUrl} isPlayerOnly={window.scratch_isPlayerOnly} isFullScreen={window.scratch_isFullScreen} />, appTarget);
    }

};
