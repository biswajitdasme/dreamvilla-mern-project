import { useEffect, useState } from 'react';

const useProperties = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetch('https://damp-lake-82171.herokuapp.com/properties')
            .then((res) => res.json())
            .then((data) => setProperties(data))
            .catch(({ message }) => {
                console.log(message);
            });
    }, []);

    const addProperty = (property, setAcknowledged, setError, setIsLoading, e) => {
        fetch('https://damp-lake-82171.herokuapp.com/properties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(property)
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.acknowledged) {
                    setAcknowledged(data.acknowledged);

                    setProperties([...properties, { ...property, _id: data.insertedId }]);
                }
            })
            .catch(({ message }) => {
                setError(true);
                console.log(message);
            })
            .finally(() => {
                e.target.reset();
                setIsLoading(false);
            });
    };

    return { properties, addProperty, setProperties };
};

export default useProperties;
