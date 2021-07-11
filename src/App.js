import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Todo from "./components/Todo";
import db from "./Firebase";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        db.collection("todos").onSnapshot((snapshot) => {
            setTodos(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        data: doc.data(),
                    };
                })
            );
        });
    }, []);

    const inputChangeHandler = (event) => {
        setInput(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        db.collection("todos").add({
            todo: input,
        });

        setInput("");
    };

    return (
        <>
            <Container>
                <div className="heading">
                    <h1>Todo List</h1>
                </div>
                <div className="TodoSection">
                    <Form onSubmit={submitHandler}>
                        <input
                            type="text"
                            value={input}
                            onChange={inputChangeHandler}
                        />
                        <button disabled={input.trim() === ""}>ADD TODO</button>
                    </Form>
                </div>

                <TodoList>
                    {todos.map((todo) => {
                        return <Todo key={todo.id} data={todo} />;
                    })}
                </TodoList>
            </Container>
        </>
    );
};

export default App;

const Container = styled.div`
    max-width: 600px;
    width: 90%;
    margin: auto;

    .heading {
        text-align: center;
        margin: 3rem 0;
    }
    .TodoSection {
        display: flex;
        justify-content: center;
    }
`;

const TodoList = styled.div`
    display: flex;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 600px;
    border-radius: 8px;
    margin-bottom: 3rem;

    @media screen and (max-width: 767px) {
        max-width: 400px;
        flex-wrap: wrap;
        gap: 10px;
    }

    input {
        width: 100%;
        padding: 12px 1rem;
        outline: none;
        border: 1px solid deepskyblue;
        border-right: none;
        border-radius: 8px 0 0 8px;
        color: black;
        letter-spacing: 1.5px;

        @media screen and (max-width: 767px) {
            border-right: 1px solid deepskyblue;
            border-radius: 8px;
        }
    }

    button {
        width: 150px;
        padding: 12px 0;
        border: none;
        background-color: deepskyblue;
        cursor: pointer;
        border-radius: 0 8px 8px 0;
        color: white;
        font-weight: 600;
        letter-spacing: 1.5px;

        @media screen and (max-width: 767px) {
            width: 100%;
            border-radius: 8px;
        }
    }
`;
