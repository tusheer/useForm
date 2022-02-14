import { useState } from "react";

interface Data {
    [k: string]:
        | {
              value: string | string[] | { [k: string]: string | boolean };
              errorMessage?: string;
              regex?: string;
              require?: boolean;
          }
        | string;
}

interface IuseFrom {
    onSubmit: () => void;
    data: Data;
}

interface IUserFormReturn {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    getInputProps: ({ name }: { name: string }) => {
        error: boolean;
        value: string;
        onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    };
}

const useForm = ({ onSubmit, data }: IuseFrom): IUserFormReturn => {

    const [state, setState] = useState()

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
