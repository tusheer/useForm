import { FC, InputHTMLAttributes } from 'react';

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: boolean;
    errorText?: string;
    placeholder?: string;
    label: string;
}

const TextInput: FC<ITextInputProps> = ({ error, errorText, placeholder, label, ...rest }) => {
    return (
        <>
            <label htmlFor={rest.name} className='mb-1 block'>
                {label}
            </label>
            <input
                {...rest}
                className={`appearance-none rounded-none relative block w-full px-3 py-2  placeholder-gray-500 text-gray-900 border rounded-t-md focus:outline-none  focus:z-10 sm:text-sm  ${
                    error
                        ? 'ocus:ring-red-500 focus:border-red-500 border-red-500'
                        : 'focus:ring-indigo-500 focus:border-indigo-500  border-gray-300'
                }`}
                autoComplete='off'
                placeholder={placeholder}
            />
            <div className='text-sm mt-1 text-red-500'>{errorText}</div>
        </>
    );
};

export default TextInput;
