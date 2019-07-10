/// <reference types="react" />
interface Props {
    onChange: (files: File[]) => any;
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
declare function DropzoneArea({ onChange, maxFileSize, acceptedFiles, filesLimit, errorMessages, dropzoneText }: Props): JSX.Element;
declare namespace DropzoneArea {
    var defaultProps: {
        acceptedFiles: string[];
        filesLimit: number;
        maxFileSize: number;
        errorMessages: {
            acceptedFiles: string;
            filesLimit: string;
            maxFileSize: string;
        };
        dropzoneText: string;
    };
}
export default DropzoneArea;
