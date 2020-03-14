import React from 'react';
import { SnackbarProps } from '@material-ui/core/Snackbar';
interface Props {
    onChange: (files: File[]) => void;
    filesLimit?: number;
    acceptedFiles?: string[];
    maxFileSize?: number;
    dropzoneText?: string;
    errorMessages?: {
        acceptedFiles: string;
        filesLimit: string;
        maxFileSize: string;
    };
    snackbarProps?: SnackbarProps;
}
declare const DropzoneArea: React.SFC<Props>;
export default DropzoneArea;
