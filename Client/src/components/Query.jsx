import "./Query.css";
import Card from "./Card.jsx";
import imageref from "../assets/IMG_20240605_171446.jpg";

function Query() {
    const members = [
        {
            image: imageref,
            name: "John Doe",
            mobile: "+91 1919191919",
            mail: "johndoe@gmail.com",
            linkedin: "www.linkedin.com/john-doe",
            facebook: "www.facebook.com/john-doe",
        },
        {
            image: imageref,
            name: "Jane Smith",
            mobile: "+91 9292929292",
            mail: "janesmith@gmail.com",
            linkedin: "www.linkedin.com/jane-smith",
            facebook: "www.facebook.com/jane-smith",
        },
        {
            image: imageref,
            name: "John Doe",
            mobile: "+91 1919191919",
            mail: "johndoe@gmail.com",
            linkedin: "www.linkedin.com/john-doe",
            facebook: "www.facebook.com/john-doe",
        },
        {
            image: imageref,
            name: "Jane Smith",
            mobile: "+91 9292929292",
            mail: "janesmith@gmail.com",
            linkedin: "www.linkedin.com/jane-smith",
            facebook: "www.facebook.com/jane-smith",
        },
    ];

    return (
        <div className="query-box">
        <p className="query-title">For Queries, Please Contact</p>
        <div className="query-container">
            {members.map((member, index) => (
                <div className="query-card" key={index}>
                    <Card
                        image={member.image}
                        name={member.name}
                        mobile={member.mobile}
                        facebook={member.facebook}
                        linkedin={member.linkedin}
                    />
                </div>
            ))}
        </div>
        </div>
    );
}

export default Query;
