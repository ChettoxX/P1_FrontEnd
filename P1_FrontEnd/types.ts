export type NavChindreProps ={
    selected: "Home";
};


export type NavProps ={
    selected: "Airport"|"Jokes"|"Recipe";
};

export type Joke = {
    joke: string;
};

export type Airport={
    icao:string;
    iata:string;
    name:string;
    city:string;
    region:string;
    country:string;
    elevation_ft:string;
    latitude:string;
    longitude:string;
    timezone:string;
};

export type RecipeBefore={
    title:string;
    ingredients:string;
    servings:string;
    instructions:string;
};

export type RecipeAfter={
    title:string;
    ingredients:string[];
    servings:string;
    instructions:string[];
};