import Review from "./Review";

type Restaurant = {
    id: string;
    name: string;
    description: string;
    image: string;
    longitude: number;
    latitude: number;
    address: string;
    reviews: Review[];
}

export default Restaurant;
