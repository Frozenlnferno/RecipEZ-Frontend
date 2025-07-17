import { Link } from 'react-router-dom';

const RecipeCard = ({ title, image, id }) => {
    return (
        <Link to={`/recipes/${id}`}>
            <div className="w-40 aspect-square rounded-lg overflow-hidden shadow-md relative flex-shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-2 py-1 text-center ">
                    {title}
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;