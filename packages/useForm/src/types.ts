import React from 'react';
import { Validate } from './validate';

export interface IEvent<T> {
    target: {
        value: T;
    };
}

export type Iirrors = {
    error: boolean;   
    message: string[];
};

export type Erros<P> = {
        [k in keyof P]?: Iirrors;
};

export type onChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface IUserFormReturn<P> {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    getInputProps:(props: IinputProps<P>) => {
        name: keyof P;
        onChange: (event: any) => void;
    };
    state: P;
    errors: Erros<P>;
}

export interface IuseFrom<P> {
    onSubmit: () => void;
    formState: P;
}

export interface IinputProps<P> {
    name: keyof P;
    onChange?: (event: any) => any;
    validate?: Validate;
}