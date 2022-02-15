export interface IformState {
    [k: string]: any;
}

type mode = 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched';

export interface IUserFormReturn {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    getInputProps: ({ name }: { name: string }) => {
        error: boolean;
        value: string;
        onChange: (event: React.FormEvent<HTMLInputElement>) => void;
    };
}

export interface IuseFrom {
    onSubmit: () => void;
    formState: IformState;
    type?: mode;
}
