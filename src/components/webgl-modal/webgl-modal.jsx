import PropTypes from 'prop-types';
import React from 'react';
import ReactModal from 'react-modal';
import Box from '../box/box.jsx';
import {defineMessages, injectIntl, intlShape, FormattedMessage} from 'react-intl';

import styles from './webgl-modal.css';

const messages = defineMessages({
    label: {
        id: 'gui.webglModal.label',
        defaultMessage: 'Your Browser Does Not Support WebGL',
        description: 'WebGL missing title'
    }
});

const WebGlModal = ({intl, ...props}) => (
    <ReactModal
        isOpen
        className={styles.modalContent}
        contentLabel={intl.formatMessage({...messages.label})}
        overlayClassName={styles.modalOverlay}
        onRequestClose={props.onBack}
    >
        <div dir={props.isRtl ? 'rtl' : 'ltr'}>
            <Box className={styles.illustration} />

            <Box className={styles.body}>
                <h2>
                    <FormattedMessage {...messages.label} />
                </h2>
                <p>
                    { /* eslint-disable max-len */ }
                    <FormattedMessage
                        defaultMessage="Unfortunately it looks like your browser or computer {webGlLink}. This technology is needed for Scratch 3.0 to run."
                        description="WebGL missing message"
                        id="gui.webglModal.description"
                        values={{
                            webGlLink: (
                                <a
                                    className={styles.faqLink}
                                    href="https://en.wikipedia.org/wiki/WebGL#Support"
                                >
                                    <FormattedMessage
                                        defaultMessage="does not support WebGL"
                                        description="link part of your browser does not support WebGL message"
                                        id="gui.webglModal.webgllink"
                                    />
                                </a>
                            )
                        }}
                    />
                    { /* eslint-enable max-len */ }
                </p>

                <Box className={styles.buttonRow}>
                    <button
                        className={styles.backButton}
                        onClick={()=>{
                            var url = window.location.href;
                            if (url.indexOf("?") != -1) {
                                url += "&version=2"
                            } else {
                                url += "?version=2"
                            }
                            window.location.href = url;
                        }}
                    >
                        <FormattedMessage
                            defaultMessage="访问旧版本"
                            description="Label for button go back when browser is unsupported"
                            id="gui.webglModal.backToV2"
                        />
                    </button>

                </Box>
                <div className={styles.faqLinkText}>
                    <FormattedMessage
                        defaultMessage="To learn more, go to the {previewFaqLink}."
                        description="Scratch 3.0 FAQ description"
                        id="gui.webglModal.previewfaq"
                        values={{
                            previewFaqLink: (
                                <a
                                    className={styles.faqLink}
                                    href="//scratch.mit.edu/3faq"
                                >
                                    <FormattedMessage
                                        defaultMessage="FAQ"
                                        description="link to Scratch 3.0 FAQ page"
                                        id="gui.webglModal.previewfaqlinktext"
                                    />
                                </a>
                            )
                        }}
                    />
                </div>
            </Box>
        </div>
    </ReactModal>
);

WebGlModal.propTypes = {
    intl: intlShape.isRequired,
    isRtl: PropTypes.bool,
    onBack: PropTypes.func.isRequired
};

export default injectIntl(WebGlModal);
