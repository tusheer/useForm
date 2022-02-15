import { useState } from 'react';
import { IUserFormReturn, IuseFrom } from './types';

const useForm = ({ onSubmit, formState }: IuseFrom): IUserFormReturn => {
    const [state, setState] = useState();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const getInputProps = ({ name }: { name: string }) => {
        return {
            error: false,
            value: 'Tusher',
            onChange: (event: React.FormEvent<HTMLInputElement>) => {
                console.log(event);
            },
        };
    };

    return {
        handleSubmit,
        getInputProps,
    };
};

export default useForm;
