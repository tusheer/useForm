export class Validation {
    private errros: Function[];

    constructor(errors: Function[]) {
        this.errros = errors;
    }

    isRequire = () => this.injectError(isRequire());
    isLength = ({ min, max }: { min?: number; max?: number }) => this.injectError(length({ min, max }));

    private injectError = (funtion: Function) => {
        const errors: Function[] = [...this.errros, funtion];
        this.errros = errors;
        // return new Validation(errors);
        return this
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

    get = (value: unknown, digginValue?: Function) => {
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

    find = <T>(callback: (value: T) => string) => {
        return {
            ...this,
            get: (value: T) => this.get(value, callback),
        };
    };
}

const isRequire = (): Function => {
    return function (value: string) {
        return !!value;
    };
};

const length = ({ max, min }: { max?: number; min?: number }): Function => {
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

const validation = new Validation([]);
export default validation;
