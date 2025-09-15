import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const RecipeCard = ({ title, image, id, favorited = false }) => {
    const { setFavorite, removeFavorite } = useContext(UserContext);
    const [isFavorited, setIsFavorited] = useState(favorited);
    
    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        setFavorite({
            recipe_id: id,
            recipe_title: title,
            recipe_image: image
        });
        setIsFavorited(true);
    };

    const handleRemoveFavorite = (e) => {
        e.stopPropagation();
        removeFavorite({
            recipe_id: id
        });
        setIsFavorited(false);
    };

    return (
        <div className="w-44 aspect-square rounded-xl overflow-hidden shadow-lg border border-orange-200 relative flex-shrink-0 transition-transform duration-200 bg-white group">
            <Link
                to={`/recipes/${id}`}
                className="block w-full h-full"
                style={{ textDecoration: 'none' }}
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90"
                    loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent text-white text-base font-semibold px-3 py-2 text-center rounded-b-xl flex items-center justify-center gap-2">
                    <span className="truncate w-full" title={title}>{title}</span>
                </div>
            </Link>
            <button
                type="button"
                onClick={(e) => {
                    if (favorited) {
                        handleRemoveFavorite(e);
                    } else {
                        handleFavoriteClick(e);
                    }
                }}
                className={`absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow group-hover:bg-orange-100 transition-colors z-10 ${favorited ? 'text-orange-500' : ''}`}
                aria-label="Favorite"
            >
                {isFavorited ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24" stroke="orange" strokeWidth={2} className="w-5 h-5">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="orange" strokeWidth={2} className="w-5 h-5">
                        <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.6 2.09C13.09 3.81 14.76 3 16.5 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default RecipeCard;