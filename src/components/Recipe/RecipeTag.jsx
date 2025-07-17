
const RecipeTag = ({ tag, color }) => {
    return (
        <span
            className="flex items-center px-3 py-1 rounded-full text-xs font-semibold shadow-sm mr-1 mb-1"
            style={{
                background: color,
                letterSpacing: '0.03em',
                minWidth: 'fit-content', 
            }}
        >
            {tag}
        </span>
    );
};

export default RecipeTag;