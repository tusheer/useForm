export class Validation {
    private errros: Function[];

    constructor(errors: Function[]) {
        this.errros = errors;
    }

    isRequire = () => this.injectError(isRequire());

    isLength = ({ min, max }: { min?: number; max?: number }) => this.injectError(isLength({ min, max }));

    isValidEmail = () => this.injectError(isValidEmail());

    custom = (customFunction: (value: any) => boolean) =>
        this.injectError(function (value: any) {
            return customFunction(value);
        });

    private injectError = (funtion: Function) => {
        const errors: Function[] = [...this.errros, funtion];
        return new Validation(errors);
    };

    withMessage = (message: string) => {
        const errorlength = this.errros.length;
        if (errorlength) {
            const lastError = this.errros[errorlength - 1];
            lastError.prototype.message = message;
            this.errros[errorlength - 1] = lastError;
            return new Validation(this.errros);
        } else {
            throw console.error('No validation rules apply');
        }
    };

    generateErrors = (value: unknown, digginValue?: Function) => {
        const parseValue = digginValue ? digginValue(value) : value;
        const resolve = this.errros.reduce(
            (prevValue: { error: boolean; message: string[] }, current) => {
                const _prevValue = { ...prevValue };
                const message = current.prototype.message || '';
                const func = current(parseValue);
                if (func === false) {
                    _prevValue.error = true;
                    message && _prevValue.message.push(message);
                }
                return _prevValue;
            },
            {
                error: false,
                message: [],
            }
        );
        return resolve;
    };

    findKey = <T>(callback: (value: T) => string) => {
        return {
            ...this,
            get: (value: T) => this.generateErrors(value, callback),
        };
    };
}

//in return function we need to use regular function instead of arrow function
//because in arrow function we can not inject prototype value in fucntion

const isRequire = (): Function => {
    return function (value: string) {
        return !!value;
    };
};

const isLength = ({ max, min }: { max?: number; min?: number }): Function => {
    return function (value: string) {
        let check: boolean;
        if (max && min) {
            max >= value.length && min <= value.length ? (check = true) : (check = false);
        } else if (max) {
            max >= value.length ? (check = true) : (check = false);
        } else if (min) {
            min <= value.length ? (check = true) : (check = false);
        } else {
            check = true;
        }

        return check;
    };
};

const isValidEmail = (): Function => {
    return function (value: string) {
        const re = /\S+@\S+\.\S+/;
        return re.test(value);
    };
};

const validation = () => {
    return new Validation([]);
};

export default validation;
