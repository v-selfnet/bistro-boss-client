
const FoodCard = ({item}) => {
    const {image, name, price, recipe} = item
    return (
        <div className="card w-96 bg-base-100 shadow-xl relative">
            <figure><img className="rounded-lg" src={image} alt="Food" /></figure>
            <div className="card-body">
                <p className="absolute top-0 right-0 indicator-item badge badge-primary">${price}</p>
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn btn-accent btn-block">Ad to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;