import React from 'react';

export interface IformState {
    [k: string]: any;
}

type mode = 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched';

export type onChange = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface IUserFormReturn {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    getInputProps: <T>(props: IinputProps<T>) => {
        name: string;
        value: T;
        onChange: (event: onChange) => void;
    };
    state: IformState;
}

export interface IuseFrom {
    onSubmit: () => void;
    formState: IformState;
    type?: mode;
}

export interface IinputProps<T> {
    name: string;
    onChange?: () => T;
}
