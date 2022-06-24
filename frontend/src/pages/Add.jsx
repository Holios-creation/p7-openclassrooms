import '../styles/Add.css';
import handleSubmit from '../functions/addArticle';

export default function Add() {
   return (
        <div className="Add">
            <div className="Add-add">
                <form className="formulaire" onSubmit={handleSubmit}>
                    <label htmlFor="titre">Titre :</label>
                    <input type="text" id="titre" name="titre" placeholder="Bienvenue sur Groupomania..." pattern="^[\w\s.,?;:!/=+-@#()]*" required />
                    <label htmlFor="image">Image :</label>
                    <input type="file" id="image" name="image" required />
                    <input type="submit" value="Ajouter l'article !" />
                </form>
            </div>
        </div>
	)
}