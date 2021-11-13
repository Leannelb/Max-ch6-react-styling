import { useState, useEffect } from 'react';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';


const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://max-complete-react-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
            console.log('response ', response);
            const responseData = await response.json();

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

        fetchMeals();
    }, []);

    if (isLoading) {
        return (
            <section className={classes.mealsLoading}>
                <p>Content is Loading....</p>
            </section>
        );
    }
    const mealsList = meals.map((meal) =>
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            price={meal.price}
            description={meal.description}>
        </MealItem>
    )

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;