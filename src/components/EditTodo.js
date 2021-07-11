import React, { useRef } from "react";
import styled from "styled-components";
import db from "../Firebase";

const EditTodo = (props) => {
    const inputRef = useRef();
    const editHandler = () => {
        if (inputRef.current.value.trim() !== "") {
            db.collection("todos")
                .doc(props.id)
                .set({
                    todo: inputRef.current.value,
                })
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }

        props.close(false);
    };

    return (
        <Backdrop>
            <Modal onSubmit={editHandler}>
                <input type="text" ref={inputRef} placeholder={props.todo} />
                <Edit>Update</Edit>
            </Modal>
        </Backdrop>
    );
};

export default EditTodo;

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.form`
    max-width: 600px;
    width: 90%;
    padding: 2rem;
    border-radius: 1rem;
    background: white;
    animation-name: animateModal;
    animation-duration: 300ms;

    @keyframes animateModal {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Edit = styled.button``;
