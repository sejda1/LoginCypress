import { Link } from "react-router-dom";
import '../SuccessPage.css';

export default function SuccessPage() {
    return (
        <div className='success-page'>
            <Link to="/" className='link'>Anasayfaya Dön</Link>
            <div className='explanation'>
            <hr/>
            <h3>Form Başarıyla Gönderildi!</h3>
            <br/>
            <h3>Bilgileriniz kaydedildi.</h3>
            <br/>
            <h3>Teşekkür ederiz!</h3>
            <br/>
            <hr/>
            </div>
        </div>
    );
}
