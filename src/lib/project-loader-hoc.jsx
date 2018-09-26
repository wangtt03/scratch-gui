import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {injectIntl, intlShape} from 'react-intl';

import {setProjectId} from '../reducers/project-id';

import analytics from './analytics';
import log from './log';
import storage from './storage';

/* Higher Order Component to provide behavior for loading projects by id. If
 * there's no id, the default project is loaded.
 * @param {React.Component} WrappedComponent component to receive projectData prop
 * @returns {React.Component} component with project loading behavior
 */
const ProjectLoaderHOC = function (WrappedComponent) {
    class ProjectLoaderComponent extends React.Component {
        constructor (props) {
            super(props);
            this.updateProject = this.updateProject.bind(this);
            this.state = {
                projectData: null,
                fetchingProject: false
            };
            storage.setProjectHost(props.projectHost);
            storage.setAssetHost(props.assetHost);
            storage.setTranslatorFunction(props.intl.formatMessage);
            props.setProjectId(props.projectId);
            if (
                props.projectId !== '' &&
                props.projectId !== null &&
                typeof props.projectId !== 'undefined'
            ) {
                this.updateProject(props.projectId);
            }
            if (
                props.projectUrl !== '' &&
                props.projectUrl !== null &&
                typeof props.projectUrl !== 'undefined'
            ) {
                this.updateProjectUrl(props.projectUrl);
            }
        }
        componentWillUpdate (nextProps) {
            if (this.props.projectHost !== nextProps.projectHost) {
                storage.setProjectHost(nextProps.projectHost);
            }
            if (this.props.assetHost !== nextProps.assetHost) {
                storage.setAssetHost(nextProps.assetHost);
            }
            if (this.props.projectId !== nextProps.projectId) {
                this.props.setProjectId(nextProps.projectId);
                this.setState({fetchingProject: true}, () => {
                    this.updateProject(nextProps.projectId);
                });
            }
            if (this.props.projectUrl !== nextProps.projectUrl) {
                this.setState({fetchingProject: true}, () => {
                    this.updateProjectUrl(nextProps.projectUrl);
                });
            }
        }
        updateProjectUrl (projectUrl) {
            var that = this;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', projectUrl, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = function (e) {
                if (window.scratchProjectLoaded) {
                    window.scratchProjectLoaded();
                }
                if (this.status === 200) {
                    that.setState({
                        projectData: this.response,
                        fetchingProject: false
                    });
                }
            };
            xhr.send();
        }
        updateProject (projectId) {
            storage
                .load(storage.AssetType.Project, projectId, storage.DataFormat.JSON)
                .then(projectAsset => projectAsset && this.setState({
                    projectData: projectAsset.data,
                    fetchingProject: false
                }))
                .then(() => {
                    if (projectId !== 0) {
                        analytics.event({
                            category: 'project',
                            action: 'Load Project',
                            label: projectId,
                            nonInteraction: true
                        });
                    }
                })
                .catch(err => log.error(err));
        }
        render () {
            const {
                /* eslint-disable no-unused-vars */
                assetHost,
                projectHost,
                projectId,
                projectUrl,
                setProjectId: setProjectIdProp,
                /* eslint-enable no-unused-vars */
                ...componentProps
            } = this.props;
            if (!this.state.projectData) return null;
            return (
                <WrappedComponent
                    fetchingProject={this.state.fetchingProject}
                    projectData={this.state.projectData}
                    {...componentProps}
                />
            );
        }
    }
    ProjectLoaderComponent.propTypes = {
        assetHost: PropTypes.string,
        intl: intlShape.isRequired,
        projectHost: PropTypes.string,
        projectUrl: PropTypes.string,
        projectId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        setProjectId: PropTypes.func
    };
    ProjectLoaderComponent.defaultProps = {
        assetHost: 'https://assets.scratch.mit.edu',
        projectHost: 'https://projects.scratch.mit.edu',
        projectId: 0
    };

    const mapStateToProps = () => ({});

    const mapDispatchToProps = dispatch => ({
        setProjectId: id => dispatch(setProjectId(id))
    });

    return injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProjectLoaderComponent));
};

export {
    ProjectLoaderHOC as default
};
