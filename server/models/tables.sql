

Create DATABASE DrawAndGuessDB;


USE DrawAndGuessDB;
Drop TABLE IF EXISTS UserProporties;



USE DrawAndGuessDB;
CREATE TABLE guess(
    id MEDIUMINT NOT NULL AUTO_INCREMENT,
    imageURL varchar(15) NOT NULL,
    wordToGuess varchar(15) NOT NULL,
    PRIMARY KEY(id)
);