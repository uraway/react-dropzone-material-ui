# react-dropzone-material-ui

Try example: https://uraway.github.io/react-dropzone-material-ui

This is a React component based on [react-dropzone](https://github.com/react-dropzone/react-dropzone) and [Material-UI](https://material-ui.com/).

![image](https://user-images.githubusercontent.com/15242484/60936510-e7278d80-a2ff-11e9-959b-8679f5350132.png)

## Peer Dependencies

Install React v16

```
$ yarn add react@16 react-dom@16
```

Install Matterial UI v4

```
$ yarn add @material-ui/core@4 @material-ui/icons@4 
```

```
$ yarn add react-dropzone@10
```

## Install

```
yarn add react-dropzone-material-ui
```

## Usage

```jsx
import React, { useState, useEffect } from "react";
import DropzoneArea from "react-dropzone-material-ui";

const App: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="App">
      <DropzoneArea onChange={setFiles} />
    </div>
  );
};

export default App;
```

## Props

Currently supports only few props:

| Name          | Type     | Default                                      | Description                                                                                                                                                                                    |
| ------------- | -------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| acceptedFiles | string[] | ["image/*", "video/*", "application/*"]      | A list of file mime types user can add into the dropzone. ref: [Unique file type specifiers](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers) |
| dropzoneText  | string   | "ファイルをドロップまたはファイルを選択する" | Text in the dropzone.                                                                                                                                                                          |
| errorMessages |          |                                              | see [errorMessages](#errorMessages) section below.                                                                                                                                             |
| filesLimit    | number   | 3                                            | Number of files user can add into the dropzone.                                                                                                                                                |
| maxFileSize   | number   | 3000000                                      | Maximum file size in bytes user can add into the dropzone.                                                                                                                                     |
| onChange      | func     |                                              | Callback function filred when a file is dropped, selected or deleted.  `function(files: File[]) => void`                                                                                       |

<!--
disable preview
disable window.alert
-->

## errorMessages

  You can change error messages with your own language by passing `errorMessges` property:

```jsx
errorMessages={{
  acceptedFiles: "File type is not supported.",
  filesLimit: "Maximun number of files is exceeded.",
  maxFileSize: "File size is too big."
}}
```

  When a file is rejected, window alert will be evoked with these texts:

![image](https://user-images.githubusercontent.com/15242484/60937681-ded15180-a303-11e9-9360-b0a3cfda8d73.png)

## Develpment

Install modules in root and example

```
$ yarn run install-all
```

Start rollup & dev server

```
$ yarn run dev
```

## License

This project is licensed under the terms of the MIT license.
