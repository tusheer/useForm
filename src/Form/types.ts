import React from 'react';
import { Validation } from '../Validation';

export interface IEvent<T> {
    target: {
        value: T;
    };
}

export type Iirrors = {
    error: boolean;
    message: string[];
};

export type Erros<P> =
    | {
          [k in keyof P]: Iirrors;
      }
    | {};

type mode = 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched';

export type onChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface IUserFormReturn<P> {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    getInputProps: <T>(props: IinputProps<T, P>) => {
        name: keyof P;
        // value: T ;
        onChange: (event: any) => void;
    };
    state: P;
    errors: Erros<P>;
}

export interface IuseFrom<P> {
    onSubmit: () => void;
    formState: P;
    type?: mode;
}

export interface IinputProps<T, P> {
    name: keyof P;
    onChange?: (event: T) => T;
    validate?: Validation;
}
