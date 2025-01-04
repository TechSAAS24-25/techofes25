import "./Card.css";
import "font-awesome/css/font-awesome.min.css";

function Card({ image, name, mobile, mail, linkedin, facebook }) {
    return (
        <div className="card-container">
            <div className="card-image">
                <img src={image} alt={`${name}`} />
            </div>
            <div className="card-details">
                <p>{name}</p>
                <p>{mobile}</p>
            </div>
            <div className="card-handles">
                <a href={`mailto:${mail}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-envelope"></i>
                </a>
                <a href={`https://wa.me/${mobile.replace(/[^\d]/g, "")}`} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-whatsapp"></i>
                </a>
                <a href={facebook} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-facebook"></i>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fa fa-linkedin"></i>
                </a>
            </div>
        </div>
    );
}

export default Card;
