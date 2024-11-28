import { Link } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div>
            <h1>Form Başarıyla Gönderildi!</h1>
            <h3>Bilgileriniz kaydedildi. Teşekkür ederiz!</h3>
            <Link to="/">Anasayfaya Dön</Link>
        </div>
    );
}
