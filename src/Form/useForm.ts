import { useState } from 'react';
import { IUserFormReturn, IuseFrom, IinputProps, onChange } from './types';

const useForm = ({ onSubmit, formState }: IuseFrom): IUserFormReturn => {
    const [state, setState] = useState(formState);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const getInputProps = <T>({ name, onChange }: IinputProps<T>) => {
        return {
            name: name,
            onChange: (event: onChange) => {
                const changeValue = onChange ? onChange() : event.target.value;
                setState({
                    ...state,
                    [name]: changeValue,
                });
            },
            value: state[name],
            
        };
    };

    return {
        handleSubmit,
        getInputProps,
        state,
    };
};

export default useForm;
