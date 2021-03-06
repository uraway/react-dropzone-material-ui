/* eslint-disable */
import { Badge, Typography } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var useStyles = makeStyles(function (theme) { return ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing(2),
    },
    dropzone: {
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderColor: '#eeeeee',
        borderRadius: '2px',
        borderStyle: 'dashed',
        borderWidth: '2px',
        color: '#bdbdbd',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        marginBottom: theme.spacing(1),
        outline: 'none',
        padding: '20px',
        transition: 'border .24s ease-in-out',
    },
    img: {
        display: 'block',
        width: 'auto',
        height: '100%',
    },
    thumb: {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 100,
        height: 100,
        padding: 4,
        boxSizing: 'border-box',
    },
    thumbsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        '&:hover $removeBtn': { opacity: 1 },
    },
    thumbInner: {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden',
    },
    removeBtn: {
        opacity: 0,
        transition: '.5s ease',
    },
    nopreview: {
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex',
    },
}); });
var NO_PREVIEW = 'no_preview';
var DropzoneArea = function (_a) {
    var onChange = _a.onChange, maxFileSize = _a.maxFileSize, acceptedFiles = _a.acceptedFiles, filesLimit = _a.filesLimit, errorMessages = _a.errorMessages, dropzoneText = _a.dropzoneText, snackbarProps = _a.snackbarProps;
    var classes = useStyles();
    var _b = useState([]), files = _b[0], setFiles = _b[1];
    var _c = useState(false), isSnackbarOpen = _c[0], setSnackbarOpen = _c[1];
    var _d = useState(''), snackbarContent = _d[0], setSnackbarContent = _d[1];
    var onDrop = function (newFiles) {
        if (filesLimit && newFiles.length > filesLimit) {
            setSnackbarContent(errorMessages && errorMessages.filesLimit);
            setSnackbarOpen(true);
        }
        else {
            setFiles(newFiles.map(function (file) {
                return Object.assign(file, {
                    preview: file.type.includes('image') ? URL.createObjectURL(file) : NO_PREVIEW,
                });
            }));
            onChange(newFiles);
        }
    };
    var handleDelete = function (index) { return function () {
        var newFiles = files.filter(function (_f, i) { return i !== index; });
        onDrop(newFiles);
    }; };
    var handleDropRejected = function (rejectedFiles) {
        var message = '';
        rejectedFiles.forEach(function (rejectedFile) {
            if (acceptedFiles && !acceptedFiles.includes(rejectedFile.type)) {
                message += errorMessages && errorMessages.acceptedFiles;
            }
            if (maxFileSize && rejectedFile.size > maxFileSize) {
                message += errorMessages && errorMessages.maxFileSize;
            }
        });
        setSnackbarContent(message);
    };
    var revokeObjectURL = function (files) {
    };
    useEffect(function () { return revokeObjectURL(); }, [files]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Snackbar, __assign({}, snackbarProps, { open: isSnackbarOpen, onClose: function () { return setSnackbarOpen(false); }, message: React.createElement("span", null, snackbarContent) })),
        React.createElement(Dropzone, { onDrop: onDrop, onDropRejected: handleDropRejected, maxSize: maxFileSize, accept: acceptedFiles && acceptedFiles.join(',') }, function (_a) {
            var getRootProps = _a.getRootProps, getInputProps = _a.getInputProps;
            return (React.createElement("section", { className: classes.container },
                React.createElement("div", __assign({}, getRootProps({ className: classes.dropzone })),
                    React.createElement("input", __assign({}, getInputProps())),
                    React.createElement("p", null, dropzoneText && dropzoneText)),
                React.createElement("aside", { className: classes.thumbsContainer }, files.map(function (file, index) { return (React.createElement(Badge, { key: file.name, badgeContent: React.createElement(Fab, { size: "small", className: classes.removeBtn, onClick: handleDelete(index) },
                        React.createElement(DeleteIcon, null)) },
                    React.createElement("div", { className: classes.thumb },
                        React.createElement("div", { className: classes.thumbInner }, file.preview === NO_PREVIEW ? (React.createElement(Typography, { className: classes.nopreview, variant: "h6" }, "No Preview")) : (React.createElement("img", { src: file.preview, className: classes.img, alt: "no preview" })))))); }))));
        })));
};
DropzoneArea.defaultProps = {
    acceptedFiles: ['image/*', 'video/*', 'application/*'],
    filesLimit: 3,
    maxFileSize: 3000000,
    errorMessages: {
        acceptedFiles: 'File type is not supported.',
        filesLimit: 'Maximun number of files are exceeded.',
        maxFileSize: 'File size is too big.',
    },
    dropzoneText: "Drag 'n' drop some files here, or click to select files",
};

export default DropzoneArea;
