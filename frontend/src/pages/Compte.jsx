import '../styles/Compte.css';

export default function Compte() {
   return (
        <div className="Compte">
            <div className="Compte-compte">
                <form className="formulaire">
                    <label htmlFor="email">Email :</label>
                    <input type="email" id="email" name="email" placeholder="contact@groupomania.fr" pattern="^[\w\-]+(\.[\w\-]+)*@[\w\-]+(\.[\w\-]+)*\.[\w\-]{2,4}$" required />
                    <label htmlFor="mdp">Mot de passe :</label>
                    <input type="text" id="mdp" name="mdp" placeholder="********" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ*-+/=@#(!?:.,_$€§%^¨£)]*$" required />
                    <label htmlFor="name">Prénom et nom :</label>
                    <input type="text" id="name" name="name" placeholder="Jack DUPONT" pattern="^[0-9a-zA-Z\sÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØŒŠþÙÚÛÜÝŸàáâãäåæçèéêëìíîïðñòóôõöøœšÞùúûüýÿ]*$" required />
                    <label htmlFor="profilePicture">Photo de profil :</label>
                    <input type="file" id="profilePicture" name="profilePicture" accept="image/png, image/jpeg, image/jpg, image/gif" required />
                    <input type="submit" value="S'inscrire !" />
                </form>
            </div>
        </div>
	)
}