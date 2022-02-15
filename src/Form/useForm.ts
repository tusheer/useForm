import { useState } from 'react';
import { IUserFormReturn, IuseFrom, IinputProps } from './types';

const useForm = ({ onSubmit, formState }: IuseFrom): IUserFormReturn => {
    const [state, setState] = useState(formState);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const getInputProps = <T>({ name, onChange }: IinputProps<T>) => {
        return {
            name: name,
            onChange: (event: any) => {
                const value = event?.target?.value === undefined ? event : event.target.value;
                const changeValue = onChange ? onChange(value) : value;
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
