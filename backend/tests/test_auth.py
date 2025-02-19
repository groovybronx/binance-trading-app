from app.auth.utils import hash_password, verify_password

def test_hash_and_verify_password():
    """
    Teste le hachage et la vérification des mots de passe avec bcrypt.
    """
    password = "my_secure_password"
    hashed_password = hash_password(password)

    # Vérifie que le mot de passe correspond au hachage
    assert verify_password(password, hashed_password) == True

    # Vérifie qu'un mauvais mot de passe ne correspond pas
    assert verify_password("wrong_password", hashed_password) == False