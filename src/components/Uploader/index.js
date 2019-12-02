import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const getColor = props => {
    if (props.isDragAccept) {
        return "#00e676";
    }
    if (props.isDragReject) {
        return "#ff1744";
    }
    if (props.isDragActive) {
        return "#2196f3";
    }
    return "#eeeeee";
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border-width: 2px;
    border-radius: 2px;
    border-color: ${props => getColor(props)};
    border-style: dashed;
    background-color: #fafafa;
    /* color: #bdbdbd; */
    color: rgba(0, 0, 0, 0.54);
    outline: none;
    transition: border 0.24s ease-in-out;
    cursor: pointer;
`;

const Uploader = props => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: acceptedFiles => {
            props.onDrop(acceptedFiles);
        }
    });

    return (
        <div className="container">
            <Container
                {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
            >
                <input {...getInputProps()} />
                <p>clique aqui para carregar uma foto</p>
            </Container>
        </div>
    );
};

export default Uploader;
