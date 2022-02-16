import { useRef, useState } from 'react';
import { Validation } from '../Validation';
import { IUserFormReturn, IuseFrom, IinputProps, Erros } from './types';

const useForm = <P>({ onSubmit, formState }: IuseFrom<P>): IUserFormReturn<P> => {
    const [state, setState] = useState<P>(formState);
    const [errors, setErrors] = useState<Erros<P>>({});
    const validationRef = useRef<{ [k in keyof P]?: Validation }>({});

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const errorResolve = Object.keys(validationRef.current).reduce((prev : Erros<P>, current : string)=>{
        //     const _prev = { ...prev};
        //     _prev[current] = {name  :"Tusher"}
        //     return prev
        // },{})

        onSubmit();
    };

    const getInputProps = <T>({ name, onChange, validate }: IinputProps<T, P>) => {
        const getValidateFuntions = () => {
            if (validationRef.current && validate) {
                if (!validationRef.current[name]) {
                    validationRef.current[name] = validate;
                }
            }
        };
        getValidateFuntions();

        return {
            name: name,
            onChange: (event: any) => {
                const value = event?.target?.value === undefined ? event : event.target.value;
                const changeValue = onChange ? onChange(value) : value;
                setState({
                    ...state,
                    [name]: changeValue,
                });
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
