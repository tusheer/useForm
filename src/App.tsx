import { From, useForm } from './Form';

function App() {
    const { getInputProps, handleSubmit } = useForm({
        onSubmit: () => console.log('Tusher'),
        data: {
            name: 'Tusher',
            age: {
                value: 'Tusher',
                require: true,
            },
            peaple: 'ji',
        },
    });

    return (
        <div className='App'>
            <From onSubmit={handleSubmit}>
                <input {...getInputProps({ name: 'name' })} />
                <input {...getInputProps({ name: 'age' })} />
                <input {...getInputProps({ name: 'peaple' })} />
            </From>
        </div>
    );
}

export default App;
