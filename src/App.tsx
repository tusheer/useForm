import { From, useForm } from './Form';

function App() {
    const { getInputProps, handleSubmit } = useForm({
        onSubmit: () => console.log('Tusher'),
        formState: {
            name: 'name',
            age: 'village',
            village: 'age',
            new: {
                name: 'Something',
            },
        },
    });

    return (
        <div className='App'>
            <From onSubmit={handleSubmit}>
                <input {...getInputProps<string>({ name: 'name', onChange: (event) => event.toUpperCase() })} />
                <input {...getInputProps<string>({ name: 'village'})} />
                <Input {...getInputProps<{ name: string }>({ name: 'new', onChange: (event) => event })} />
            </From>
        </div>
    );
}

const Input = ({ name, onChange, value }: any) => {
    return <input name={name} onChange={(event: any) => onChange({ name: event?.target.value })} value={value.name} />;
};

export default App;
