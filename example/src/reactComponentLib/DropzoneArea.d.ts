import React from 'react';
interface Props {
    onChange: (files: File[]) => void;
    filesLimit: number;
    acceptedFiles: string[];
    maxFileSize: number;
    dropzoneText: string;
    errorMessages: {
        acceptedFiles: string;
        filesLimit: string;
        maxFileSize: string;
    };
}
declare const DropzoneArea: React.SFC<Props>;
export default DropzoneArea;
