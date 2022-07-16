DROP SCHEMA IF EXISTS psel_xp;
CREATE SCHEMA psel_xp;

USE psel_xp;
CREATE TABLE `cliente`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` CHAR(255) NOT NULL,
    `saldo` DECIMAL(8, 2) NOT NULL,
    CONSTRAINT PRIMARY KEY(id)
);
CREATE TABLE `ativo`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` CHAR(255) NOT NULL,
    `qtde` INT NOT NULL,
    `valor` DECIMAL(8, 2) NOT NULL,
    CONSTRAINT PRIMARY KEY(id)
);
CREATE TABLE `cliente_ativo`(
    `id` INT NOT NULL AUTO_INCREMENT,
    `id_cliente` INT NOT NULL,
    `id_ativo` INT NOT NULL,
    `qtde` INT NOT NULL,
    `valor_ativo` DECIMAL(8, 2) NOT NULL,
    `created` DATETIME DEFAULT NOW(),
    `updated` DATETIME DEFAULT NOW(),
    CONSTRAINT PRIMARY KEY(id),
    CONSTRAINT FOREIGN KEY(id_cliente) REFERENCES cliente(id),
    CONSTRAINT FOREIGN KEY(id_ativo) REFERENCES ativo(id) 
);

INSERT INTO `cliente`
(nome, saldo)
VALUES
('Marta Maria', 7000),
('Clarice Antunes', 8000),
('Roberta Cristina', 1000),
('Sampaio Vidal', 3500),
('Rosario dos Anjos', 15000);

INSERT INTO ativo
(nome, qtde, valor)
VALUES
('ZOOM', 850, 98.63),
('PETR4', 1000, 27.80),
('VALE3', 1000, 67.88),
('XPTO', 5000, 17.71),
('BBAS3', 2000, 33.08),
('MGLU3', 5000, 2.86),
('ASUS', 560, 310.00);

INSERT INTO cliente_ativo
(id_cliente, id_ativo, qtde, valor_ativo)
VALUES
(1, 6, 10, 2.86),
(3, 1, 1, 98.63);
