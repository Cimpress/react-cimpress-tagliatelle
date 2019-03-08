import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Icon, colors} from '@cimpress/react-components';
import Highlight from 'react-highlighter';
import {createTag, updateTag} from '../tags.api';

import './TagLabel.css';

class TagLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.cancelFunction = () => {
            this.setState({
                editMode: false,
            }, () => {
                if (this.props.onEditFinished) {
                    this.props.onEditFinished(null);
                }
            });
        };

        this.updateFunction = () => {
            let updatePromise = this.props.tagId
                ? updateTag(this.props.accessToken, this.props.tagId, this.props.tagResourceUrl, this.props.tagKey, this.state.editValue)
                : createTag(this.props.accessToken, this.props.tagResourceUrl, this.props.tagKey, this.state.editValue);

            this.setState({
                saving: true,
            }, () => updatePromise.then((tag) => {
                this.setState({
                    saving: false,
                    editMode: false,
                }, () => {
                    if (this.props.onEditFinished) {
                        this.props.onEditFinished(tag);
                    }
                });
            }));
        };

        this.defaultKeyPressHandler = (e) => {
            if (e.key === 'Enter') {
                this.updateFunction();
            }
            if (e.key === 'Esc') {
                this.cancelFunction();
            }
        };

        this.editValueChangeFunction = (e) => this.setState({editValue: e.target.value});
    }

    renderActionIcon(name, color, disabled, onClick) {
        return <Icon
            className={this.props.iconClassName}
            size={'2x'}
            name={name}
            color={disabled ? colors.shale : color}
            onClick={disabled ? null : onClick} />;
    }

    renderEditMode() {
        const disabled = this.state.saving;
        return <div className={'clearfix'}>
            <div className={'pull-left'}>
                <input
                    type={'text'}
                    className={this.props.inputClassName}
                    value={this.state.editValue}
                    onChange={this.editValueChangeFunction}
                    onKeyDown={this.defaultKeyPressHandler}
                    autoFocus
                    disabled={disabled}
                />
            </div>
            <div className={('pull-left ' + this.props.actionButtonContainerClassName)}>
        &nbsp;
                {this.renderActionIcon(this.props.iconCancelName, colors.danger.darker, disabled, this.cancelFunction)}
        &nbsp;
                {this.renderActionIcon(this.props.iconSaveName, colors.success.darker, disabled, this.updateFunction)}
            </div>
        </div>;
    }

    renderReadOnlyMode() {
        const v = this.props.tagValue ? this.props.tagValue : this.props.defaultValue;
        return <Fragment>
            {this.formatValue(v)}
            &nbsp;
            <span onClick={() => {
                this.setState({
                    editMode: true,
                    editValue: v,
                }, () => {
                    if (this.props.onEditClicked) {
                        this.props.onEditClicked();
                    }
                });
            }}>
                <Icon className={this.props.iconClassName} name={this.props.iconEditName} />
            </span>
        </Fragment>;
    }

    formatValue(v) {
        if (this.props.valueFormatter) {
            return this.props.valueFormatter(v);
        }
        return this.props.highlightKey
            ? <Highlight search={this.props.highlightKey}>{v}</Highlight>
            : v;
    }

    render() {
        return <div className={this.props.className}>
            {this.state.editMode
                ? this.renderEditMode()
                : this.renderReadOnlyMode()}
        </div>;
    }
}

TagLabel.propTypes = {
    language: PropTypes.string,
    accessToken: PropTypes.string,
    className: PropTypes.string,
    tagId: PropTypes.string,
    tagValue: PropTypes.string,
    tagKey: PropTypes.string,
    tagResourceUrl: PropTypes.string,

    onEditClicked: PropTypes.func,
    onEditFinished: PropTypes.func,

    defaultValue: PropTypes.string,
    highlightKey: PropTypes.string,
    valueFormatter: PropTypes.func,

    inputClassName: PropTypes.string,
    actionButtonContainerClassName: PropTypes.string,

    iconClassName: PropTypes.string,
    iconCancelName: PropTypes.string,
    iconSaveName: PropTypes.string,
    iconEditName: PropTypes.string,
};

TagLabel.defaultProps = {
    inputClassName: 'ctag--value-edit-input',
    actionButtonContainerClassName: 'ctag-edit-icon-container',
    iconClassName: 'ctag-action-icon',
    iconCancelName: 'remove-circle-1-l',
    iconSaveName: 'check-circle-2-f',
    iconEditName: 'pencil-2-l',
};

export default TagLabel;
