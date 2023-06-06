
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center my-10">
            <p>{subHeading}</p>
            <h3 className="py-4 mx-auto border-y-4 w-6/12 uppercase text-2xl text-center">{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;