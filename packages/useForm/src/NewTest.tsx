import React, { useEffect, useState } from 'react';

const NewTest = () => {
    const [state, setState] = useState(0);

    useEffect(() => {
        console.log('hello');
    }, []);

    return <div>NewTest</div>;
};

export default NewTest;
