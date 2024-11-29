import { Link } from "react-router-dom";
import '../SuccessPage.css';

export default function SuccessPage() {
    return (
        <div className='success-page' data-cy="success-page">
            <Link to="/" className='link' data-cy="back-to-home-link">Anasayfaya Dön</Link>
            <div className='explanation' data-cy="explanation-section">
                <hr />
                <h3 data-cy="success-message">Form Başarıyla Gönderildi!</h3>
                <br/>
                <h3 data-cy="info-saved">Bilgileriniz kaydedildi.</h3>
                <br/>
                <h3 data-cy="thank-you-message">Teşekkür ederiz!</h3>
                <br/>
                <hr />
            </div>
        </div>
    );
}
