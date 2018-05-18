import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

/**
 * Project saver component passes a saveProject function to its child.
 * It expects this child to be a function with the signature
 *     function (saveProject, props) {}
 * The component can then be used to attach project saving functionality
 * to any other component:
 *
 * <ProjectSaver>{(saveProject, props) => (
 *     <MyCoolComponent
 *         onClick={saveProject}
 *         {...props}
 *     />
 * )}</ProjectSaver>
 */
class ProjectSaver extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'saveProject'
        ]);
    }
    saveProject () {
        const saveLink = document.createElement('a');
        document.body.appendChild(saveLink);

        this.props.vm.saveProjectSb3().then(content => {
            var formData = new FormData();
            if (scratch_type === 'level') {
                formData.append('name', 'userlevel' + scratch_id + stem_user_id);
            } else {
                formData.append('name', scratch_type + scratch_id);
            }
            formData.append('file', content);
            var request = new XMLHttpRequest();
            request.open('POST', '/stemgarden/stemgarden/1.0/level/scratch/saveFile');
            request.send(formData);
            if (scratch_type === 'level') {
                var levelDetailStr = scratch_level_detail;
                if (!!levelDetailStr) {
                    let levelDetail = JSON.parse(levelDetailStr);
                    let blocklyWorkspaceString = "";
                    var applabData = {};
                    var applabProjectTemplate = "";
                    var urlstr = "/stemgarden/stemgarden/1.0/userLesson/" + levelDetail.userID + "/" + levelDetail.lessonID;
                    if (!!levelDetail.studentID) {
                        urlstr = "/stemgarden/stemgarden/1.0/userLesson/" + levelDetail.studentID + "/" + levelDetail.lessonID;
                    }
                    $.ajax({
                        url: urlstr,
                        type: 'POST',
                        data: {
                            stageID: levelDetail.stageID,
                            substageID: levelDetail.substageID,
                            levelID: levelDetail.levelID,
                            levelStatus: 3, // FINISHED = 2
                            history: scratch_id + stem_user_id,
                            applabProjectTemplate: applabProjectTemplate,
                            applabHistory: JSON.stringify(applabData)
                        }
                    });
                }
            }
        });
    }
    render () {
        const {
            /* eslint-disable no-unused-vars */
            children,
            vm,
            /* eslint-enable no-unused-vars */
            ...props
        } = this.props;
        return this.props.children(this.saveProject, props);
    }
}

ProjectSaver.propTypes = {
    children: PropTypes.func,
    vm: PropTypes.shape({
        saveProjectSb3: PropTypes.func
    })
};

const mapStateToProps = state => ({
    vm: state.vm
});

export default connect(
    mapStateToProps,
    () => ({}) // omit dispatch prop
)(ProjectSaver);
