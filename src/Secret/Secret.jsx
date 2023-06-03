
const Secret = () => {
    return (
        <div>
            <h3 className="mb-20">This is Secter Page</h3>
            <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2px" }}>70%</div>
            <div className="radial-progress" style={{ "--value": "70", "--size": "12rem", "--thickness": "2rem" }}>70%</div>
        </div>
    );
};

export default Secret;