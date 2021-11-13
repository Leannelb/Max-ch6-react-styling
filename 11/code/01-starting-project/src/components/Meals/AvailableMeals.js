import { Fragment, useEffect } from 'react';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import Input from '../UI/Input';
import MealItemForm from './MealItem/MealItemForm';


const AvailableMeals = () => {
    useEffect(()=> {
        
    }) 
    const mealsList = DUMMY_MEALS.map(meal => 
                                        <MealItem 
                                            name={meal.name} 
                                            price={meal.price} 
                                            description={meal.description}>
                                        </MealItem>)

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
   
        </s