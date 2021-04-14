import React, {useState} from 'react';
import Button from './forms/Button';
import Field from './forms/Field';

const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [idTodo, setIdTodo] = useState(1);
    const [edit, setEdit] = useState(null);
    const [input, setInput] = useState("");

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        if(input.length > 0){
            if(edit === null){
                setTodos([...todos, {id: idTodo, title: input, complete : false}]);
                setIdTodo(idTodo + 1);
            } else {
                const newTodo = todos.map(todo =>
                    todo.id === edit.id ? {id: edit.id, title: input, complete: todo.complete} : todo
                );
                setTodos(newTodo);
                setEdit(null);
            }
            setInput("");
        }
    }

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const value = currentTarget.value;
        setInput(value);
    }

    //Supprime le ToDo
    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    //Modifie le ToDo
    const handleEdit = ({id, title, complete}) => {
        setEdit({id: id, title: title, complete: complete});
        setInput(title);
    }

    //Change le statue du ToDo
    const handleComplete = ({id, complete}) => {
        const info = complete ? false : true;
        const newTodo = todos.map(todo =>
            todo.id === id ? {id: id, title: todo.title,  complete: info} : todo
        );
        setTodos(newTodo);
    }

    /**
     * Première lettre en majuscule
     * @param {string} a 
     * @returns 
     */
    function strUcFirst(a){
        return (a+'').charAt(0).toUpperCase()+a.substr(1);
    }


    return ( 
        <>
            <form onSubmit={handleSubmit} className="mx-auto mb-10">
                <Field value={input} onChange={handleChange} placeholder="Todo" edit={edit} />
            </form>
            <div className="w-full mx-auto shadow-xl min-h-full p-5 rounded flex flex-col items-center bg-white card">
                <h1 className="font-bold text-center text-2xl text-gray-900 pb-2 border-b-2 border-gray-200 w-full">My todo list</h1>
                {todos.map((todo) => 
                        <div className="flex items-center my-2 w-full border-b-2 border-gray-100 py-3" key={todo.id}>
                            <div className={todo.complete ? "font-medium font-bold text-green-500" : "font-medium font-bold"}>{strUcFirst(todo.title)}</div>
                            <Button className="ml-auto mr-5 text-xl" onClick={() => handleComplete(todo)} value={ todo.complete ?
                                    <i className="far fa-check-circle fs-2 text-green-500"></i>
                                    :
                                    <i className="far fa-times-circle fs-2 text-red-500"></i>
                                }/>
                            <Button className="btn info mr-3" onClick={() => handleEdit(todo)} value="Editer"/>
                            <Button className="btn danger" onClick={() => handleDelete(todo.id)} value="Supprimer"/>
                        </div>
                )}
            </div>
            
        </>
     );
}
 
export default Todo;