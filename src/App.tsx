import { From, useForm } from './Form';

function App() {
    const { getInputProps, handleSubmit } = useForm({
        onSubmit: () => console.log('Tusher'),
        formState: {
            name: 'name',
            age: 'village',
            village: 'age',
        },
    });

    return (
        <div className='App'>
            <From onSubmit={handleSubmit}>
                <input {...getInputProps<string>({ name: 'name' })} />
                <input {...getInputProps<string>({ name: 'age' })} />
                <input {...getInputProps<string>({ name: 'village' })} />
            </From>
        </div>
    );
}

export default App;
