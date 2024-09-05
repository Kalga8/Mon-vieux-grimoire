const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Inscription //
exports.signup = async (req, res) => {
    try {
        // Hachage du mot de passe avec un sel de 10 tours
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Création de l'utilisateur
        const user = new User({
            email: req.body.email,
            password: hashedPassword,
        });

        // Sauvegarde de l'utilisateur en base de données
        await user.save();

        res.status(201).json({ message: 'Utilisateur créé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
        res.status(400).json({ error: 'Erreur lors de l\'inscription.' });
    }
};

// Login //
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        // Vérification si l'utilisateur existe
        if (!user) {
            return res.status(401).json({ error: 'Paire login/mot de passe incorrecte !' });
        }

        // Comparaison du mot de passe
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) {
            return res.status(401).json({ error: 'Paire login/mot de passe incorrecte !' });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.TOKEN || 'default_secret_key',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
        });
    } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
};