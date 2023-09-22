import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem/MealItem'

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://foodorderapp-5993d-default-rtdb.firebaseio.com/meals.json');
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error("Somthing went wrong!");
                setHttpError(true);
            }

            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                });
            }
            setMeals(loadedMeals);
            setIsLoading(false);
        };

        fetchMeals().catch((error) => {
            setIsLoading(false);
            setHttpError(error.message);
        });
    }, [])

    if (isLoading) {
        return (
            <>
                <section className={classes.MealsLoading}>
                    <p>Loading...</p>
                </section>
            </>
        )
    }

    if (httpError) {
        return (
            <>
                <section className={classes.MealsError}>
                    <p>{httpError}</p>
                </section>
            </>
        )
    }

    const mealsList = meals.map(meal =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    );

    return (
        <>
            <section className={classes.meals}>
                <Card>
                    <ul>
                        {mealsList}
                    </ul>
                </Card>
            </section>
        </>
    )
}

export default AvailableMeals;
