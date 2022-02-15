import { useRef, useState } from 'react';
import { Validation } from '../Validation';
import { IUserFormReturn, IuseFrom, IinputProps, Erros } from './types';

const useForm = <P>({ onSubmit, formState }: IuseFrom<P>): IUserFormReturn<P> => {
    const [state, setState] = useState<P>(formState);
    const [errors, setErrors] = useState<Erros<P>>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
    };

    const validation = useRef(new Validation([]))

    validation.current.isRequire().isLength({min:4})
    validation.current.isRequire().isLength({min:4})
    console.log(validation)

    const getInputProps = <T>({ name, onChange, validate }: IinputProps<T, P>) => {
        return {
            name: name,
            onChange: (event: any) => {
                const value = event?.target?.value === undefined ? event : event.target.value;
                const changeValue = onChange ? onChange(value) : value;
                setState({
                    ...state,
                    [name]: changeValue,
                },);
                const getErros = validate?.get(changeValue);
                if (getErros?.error) {
                    setErrors({
                        ...errors,
                        [name]: getErros,
                    });
                } else {
                    setErrors({
                        ...errors,
                        [name]: {
                            error: false,
                            message: [],
                        },
                    });
                }
            },

            value: state[name],
        };
    };

    return {
        errors,
        handleSubmit,
        getInputProps,
        state,
    };
};

export default useForm;
