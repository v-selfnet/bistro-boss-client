
const Cover = ({img, title, detail}) => {
    return (
        <div className="hero min-h-screen" style={{ backgroundImage: `url("${img}")` }}>
            <div className="hero-content text-center text-neutral-content">
                <div className="w-[700px] bg-black opacity-70 py-16">
                    <h1 className="mb-5 text-7xl font-bold uppercase">{title}</h1>
                    <p className="mb-5">{detail}</p>
                </div>
            </div>
        </div>
    );
};

export default Cover;