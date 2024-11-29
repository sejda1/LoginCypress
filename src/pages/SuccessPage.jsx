import { Link } from "react-router-dom";

export default function SuccessPage() {
    return (
        <div>
            <h1>Form Başarıyla Gönderildi!</h1>
            <h3>Bilgileriniz kaydedildi. <br/> Teşekkür ederiz!</h3>
            <hr/>
            <Link to="/">Anasayfaya Dön</Link>
        </div>
    );
}
