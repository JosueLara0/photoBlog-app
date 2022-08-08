//* libraries
import { useState, useEffect, useMemo } from "react";

export const useForm = (initialForm = {}, initialFormValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidations, setFormValidations] = useState({});

    useEffect(() => {
        setFormState(initialForm);
    }, [initialForm]);

    useEffect(() => {
        createValidators();
    }, [formState]);

    //* Check if all the inputs values pass the validations (if any validation message remains)
    const isFormValid = useMemo(() => {
        for (const formValue of Object.keys(formValidations)) {
            if (formValidations[formValue] !== null) return false;
        }
        return true;
    }, [formValidations]);

    //* Create an object with each input value with an errorMessage if is invalid or null if is valid
    const createValidators = () => {
        const formCheckValues = {};

        for (const formField of Object.keys(initialFormValidations)) {
            const [fn, errorMessage] = initialFormValidations[formField];

            formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? null : errorMessage;
        }

        setFormValidations(formCheckValues);
    };

    //* Set values placed on the inputs
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({ ...formState, [name]: value });
    };

    //* Clean inputs, reset them to their initial form
    const onResetForm = () => setFormState(initialForm);

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidations,
        formValidations,
        isFormValid
    };
};