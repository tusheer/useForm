import TextInput from './components/TextInput';
import useForm, { validate } from './utils/useForm';

function App() {
    const { getInputProps, handleSubmit, errors } = useForm<{
        name: string;
        email: string;
        password: string;
    }>({
        onSubmit: () => console.log('errors', errors),
        formState: {
            name: '',
            email: '',
            password: '',
        },
    });

    return (
        <div className='App'>
            <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <div className='max-w-md w-full space-y-8'>
                    <div>
                        <img
                            className='mx-auto h-12 w-auto'
                            src='https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg'
                            alt='Workflow'
                        />
                        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
                    </div>
                    <form onSubmit={handleSubmit} className='mt-8 space-y-6' action='#' method='POST'>
                        <input type='hidden' name='remember' value='true' />
                        <div className='rounded-md shadow-sm space-y-3'>
                            <TextInput
                                label='Name'
                                {...getInputProps({
                                    name: 'name',
                                    validate: validate.isRequire().withMessage('Name is required'),
                                })}
                                placeholder='name'
                                error={errors.name?.error}
                                errorText={errors.name?.message[0]}
                            />
                            <TextInput
                                placeholder='Email'
                                label='Email address'
                                {...getInputProps({
                                    name: 'email',
                                    validate: validate
                                        .isRequire()
                                        .withMessage('Email is required')
                                        .isValidEmail()
                                        .withMessage('Email is not valid'),
                                })}
                                type='email'
                                error={errors.email?.error}
                                errorText={errors.email?.message[0]}
                            />
                            <TextInput
                                placeholder='Password'
                                label='Password'
                                {...getInputProps({
                                    name: 'password',
                                    validate: validate
                                        .isRequire()
                                        .withMessage('Password is required')
                                        .isLength({ min: 6 })
                                        .withMessage('Password min 6 Characters')
                                        .isLength({ max: 12 })
                                        .withMessage('Password max 12 Characters'),
                                })}
                                type='password'
                                error={errors.password?.error}
                                errorText={errors.password?.message[0]}
                            />
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                                    <svg
                                        className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 20 20'
                                        fill='currentColor'
                                        aria-hidden='true'
                                    >
                                        <path
                                            fillRule='evenodd'
                                            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                                            clipRule='evenodd'
                                        />
                                    </svg>
                                </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default App;
