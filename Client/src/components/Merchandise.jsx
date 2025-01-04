import "./Merchandise.css";
import tshirtImage from "../assets/t-shirt.jpg";

function Merchandise() {
    return (
        <div className="merch-container">
            <div className="image-merch">
                <div className="image-border">
                    <img src={tshirtImage} alt="Antaragni'24 T-shirt" />
                </div>
                <button className="order-button">Order Now</button>
            </div>
            <div className="details-container">
                <p>
                    <strong>Antaragni'24 T-shirt Orders</strong><br />
                    <strong>Price:</strong> ₹399 (All shirts are oversized)<br />
                    <strong>Available Sizes:</strong> S, M, L, XL, XXL<br />
                    <strong>Payment Process:</strong><br />
                    Payment will be done through <strong>SBI I-Collect</strong>.<br />
                    Click on <em>Order Now</em> to be redirected to SBI I-Collect.<br />
                    Agree to the terms and conditions and proceed.<br />
                    In the <em>"Select Payment Category"</em> dropdown menu, choose <strong>Antaragni, IIT Kanpur</strong>.<br />
                    Enter your personal details as required.<br />
                    Mention the price of the T-shirt in the <strong>Antaragni T-shirt</strong> field.<br />
                    Mention the T-shirt size in the <strong>Remarks</strong> field.<br />
                    Proceed to the next page and verify that all your details are filled in correctly.<br />
                    Complete the payment and take a <strong>screenshot</strong> of the receipt.<br />
                    <strong>T-shirt Collection:</strong><br />
                    You can collect your T-shirt from <em>C112 Hall-1, IIT Kanpur</em>.<br />
                    <strong>For any queries, contact:</strong><br />
                    <strong>Parth Vijay</strong><br />
                    <strong>Phone:</strong> <a href="tel:9358704604">9358704604</a>
                </p>
            </div>
        </div>
    );
}

export default Merchandise;
