import React, { useState } from "react";
import styled from "styled-components";
import { FaEdit, FaTrash } from "react-icons/fa";
import db from "../Firebase";
import EditTodo from "./EditTodo";

const Todo = (props) => {
    const [isEditing, setIsEditing] = useState(false);

    const editTodoHandler = () => {
        setIsEditing(true);
    };

    const deleteTodo = () => {
        db.collection("todos")
            .doc(props.data.id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };

    return (
        <>
            {isEditing && (
                <EditTodo
                    id={props.data.id}
                    todo={props.data.data.todo}
                    close={setIsEditing}
                />
            )}
            <Item>
                <span>{props.data.data.todo}</span>
                <div className="actions">
                    <button className="edit" onClick={editTodoHandler}>
                        <FaEdit />
                    </button>
                    <button className="delete" onClick={deleteTodo}>
                        <FaTrash />
                    </button>
                </div>
            </Item>
        </>
    );
};

export default Todo;

const Item = styled.div`
    list-style: none;
    width: 100%;
    padding: 1rem 0 1rem 1rem;
    margin-bottom: 14px;
    display: flex;
    justify-content: space-between;
    border-radius: 8px;
    font-weight: 500;
    letter-spacing: 1px;
    text-transform: capitalize;

    .actions button {
        margin-right: 1rem;
        background: none;
        border: none;
        cursor: pointer;

        &.edit {
            color: #0bda51;
        }

        &.delete {
            color: orangered;
        }
    }
`;
