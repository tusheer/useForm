class validation {
    private errros: Function[];
    private errorlength: number;
    constructor() {
        this.errros = [];
        this.errorlength = 0;
    }

    isRequire = () => this.injectError(isRequire());
    length = ({ min, max }: { min: number; max: number }) => this.injectError(length({ min, max }));

    private injectError = (funtion: Function) => {
        this.errros.push(funtion);
        this.errorlength++;
        return this;
    };

    withMessage = (message: string) => {
        if (this.errorlength) {
            const lastError = this.errros[this.errorlength];
            lastError.prototype.message = message;
            this.errros[this.errorlength] = lastError;
            return this;
        } else {
            throw console.error('No validation rules apply');
        }
    };
}

const isRequire = (): Function => (value: string) => !!value;

const length = ({ max, min }: { max: number; min: number }): Function => {
    return (value: string) => {
        let error: boolean;
        max && value.length > max ? (error = false) : (error = true);
        min && value.length < min ? (error = false) : (error = true);
        return error;
    };
};

export default new validation();
