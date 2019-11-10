import { useState } from "react";

const useForm = (callback, initialState) => {
    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState("");
    const handleSubmit = event => {
        if (event) {
            event.preventDefault();
        }
        callback(inputs);
    };

    const handleInputChange = event => {
        setErrors("");
        event.persist();
        setInputs(inputs => ({
            ...inputs,
            [event.target.name]: event.target.value
        }));
    };

    return {
        errors,
        setErrors,
        handleSubmit,
        handleInputChange,
        inputs
    };
};
export default useForm;
