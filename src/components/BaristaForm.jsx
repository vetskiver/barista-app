import { useState } from 'react';
import RecipeChoices from './RecipeChoices';
import drinksJson from './drinks.json';

const BaristaForm = () => {
    const [trueRecipe, setTrueRecipe] = useState({});
    const [currentDrink, setCurrentDrink] = useState('');

    const [correctTemp, setCheckedTemperature] = useState('');
    const [correctSyrup, setCheckedSyrup] = useState('');
    const [correctMilk, setCheckedMilk] = useState('');
    const [correctBlended, setCheckedBlended] = useState('');

    const [inputs, setInputs] = useState({
        'temperature': '',
        'milk': '',
        'syrup': '',
        'blended': ''
    });

    const ingredients = {
        'temperature': ['hot', 'lukewarm', 'cold'],
        'syrup': ['mocha', 'vanilla', 'toffee', 'maple', 'caramel', 'other', 'none'],
        'milk': ['cow', 'oat', 'goat', 'almond', 'none'],
        'blended': ['yes', 'turbo', 'no']
    };

    const getNextDrink = () => {
        let randomDrinkIndex = Math.floor(Math.random() * drinksJson.drinks.length);
        setCurrentDrink(drinksJson.drinks[randomDrinkIndex].name);
        setTrueRecipe(drinksJson.drinks[randomDrinkIndex].ingredients);
    };

    const onNewDrink = () => {
        setInputs({
            'temperature': '',
            'milk': '',
            'syrup': '',
            'blended': ''
        });
        getNextDrink();
        setCheckedTemperature('');
        setCheckedSyrup('');
        setCheckedMilk('');
        setCheckedBlended('');
    };

    const onCheckAnswer = () => {
        setCheckedTemperature(trueRecipe.temp === inputs['temperature'] ? 'correct' : 'wrong');
        setCheckedMilk(trueRecipe.milk === inputs['milk'] ? 'correct' : 'wrong');
        setCheckedSyrup(trueRecipe.syrup === inputs['syrup'] ? 'correct' : 'wrong');
        setCheckedBlended(trueRecipe.blended === inputs['blended'] ? 'correct' : 'wrong');
    };

    return (
        <div>
            <h2>Hi, I'd like to order a:</h2>
            <div className="drink-container">
                <h2 className="mini-header">{currentDrink}</h2>
                <button
                    type="button"
                    className="button newdrink"
                    onClick={onNewDrink}
                >
                    🔄
                </button>
            </div>
            <form className='container'>
                <div className='mini-container'>
                    <h3>Temperature</h3>
                    <div className={`answer-space ${correctTemp}`} id={correctTemp}>
                        {inputs["temperature"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="temperature"
                        choices={ingredients["temperature"]}
                        checked={inputs["temperature"]}
                    />
                </div>
                <div className='mini-container'>
                    <h3>Milk</h3>
                    <div className={`answer-space ${correctMilk}`} id={correctMilk}>
                        {inputs["milk"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="milk"
                        choices={ingredients["milk"]}
                        checked={inputs["milk"]}
                    />
                </div>

                <div className='mini-container'>
                    <h3>Syrup</h3>
                    <div className={`answer-space ${correctSyrup}`} id={correctSyrup}>
                        {inputs["syrup"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="syrup"
                        choices={ingredients["syrup"]}
                        checked={inputs["syrup"]}
                    />
                </div>

                <div className='mini-container'>
                    <h3>Blended</h3>
                    <div className={`answer-space ${correctBlended}`} id={correctBlended}>
                        {inputs["blended"]}
                    </div>
                    <RecipeChoices
                        handleChange={(e) => setInputs((prevState) => ({
                            ...prevState,
                            [e.target.name]: e.target.value,
                        }))}
                        label="blended"
                        choices={ingredients["blended"]}
                        checked={inputs["blended"]}
                    />
                </div>
            </form>
            <button type="button" className="button submit" onClick={onCheckAnswer}>
                Check Answer
            </button>
            <button type="button" className="button submit" onClick={onNewDrink}>
                New Drink
            </button>
        </div>
    );
};

export default BaristaForm;
