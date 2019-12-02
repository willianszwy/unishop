import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 200px;
    /* background-color: #fafafa; */
    /* border: 2px solid #eeeeee; */
    margin-bottom: 10px;
    object-fit: cover;
    overflow: hidden;

    img {
        width: 100%;
        object-fit: cover;
    }
`;

const Preview = props => {
    return (
        <div>
            {props.show ? (
                <Container>
                    <img src={props.src} alt="loaded" />
                </Container>
            ) : (
                ""
            )}
        </div>
    );
};

export default Preview;
