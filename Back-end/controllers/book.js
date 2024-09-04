const Book = require('../models/book');

// Création d'un livre //
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    const book = new Book ({
        ...bookObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename.replace(/\.(jpeg|jpg|png)$/, "_thumbnail.webp")}`
    });
        book.save()
            .then(() => res.status(201).json({ message: 'Livre enregistré !' }))
            .catch((error) => {
                console.log(error)
                res.status(400).json({ error })}
                );
};

// Modifier un livre //
exports.modifyBook = (req, res, next) => {
    let bookObject = req.file ? {
        ...JSON.parse(mongoSanitize(req.body.book)),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...mongoSanitize(req.body) };

    delete bookObject._userId;

    Book.findOne({_id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => {
                        if (req.file) {
                            const imagePath = `./images/${book.imageUrl.split('/').pop()}`;
                            fs.unlink(imagePath, (err) => {
                                if (err) {
                                    console.error(err);
                                }
                            });
                        }
                        res.status(200).json({ message: "Livre modifié avec succès !"})
                    })
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Supprimer un livre //
exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id})
        .then(book => {
            if(book.userId != req.auth.userId) { 
                res.status(403).json({message: 'Non-autorisé !'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];

                fs.unlink(`images/${filename}`, () => { 
                    Book.deleteOne({_id: req.params.id})
                        .then(() => res.status(200).json({message: 'Livre Supprimé !'}))
                        .catch(error => res.status(401).json({error}));
                });
            }
        })
        .catch(error => res.status(500).json({error}));
};