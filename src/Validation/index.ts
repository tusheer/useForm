export class Validation {
    private errros: Function[];

    constructor(errors: Function[]) {
        this.errros = errors;
    }

    isRequire = () => this.injectError(isRequire());
    isLength = ({ min, max }: { min: number; max: number }) => this.injectError(length({ min, max }));

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
            return this;
        } else {
            throw console.error('No validation rules apply');
        }
    };
}

const isRequire = (): Function => {
    return function (value: string) {
        return !!value;
    };
};

const length = ({ max, min }: { max: number; min: number }): Function => {
    return function (value: string) {
        let error: boolean;
        max && value.length > max ? (error = false) : (error = true);
        min && value.length < min ? (error = false) : (error = true);
        return error;
    };
};

const validation = new Validation([]);
export default validation;
