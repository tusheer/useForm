import React, { FormHTMLAttributes } from 'react';
import useForm from './useForm';

interface IForm extends FormHTMLAttributes<HTMLFormElement> {
    children: React.ReactChild | React.ReactChild[];
}

const From: React.FC<IForm> = ({ children, ...props }) => {
    return <form {...props}>{children}</form>;
};

export { From, useForm };
