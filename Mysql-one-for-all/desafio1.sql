DROP DATABASE IF EXISTS SpotifyClone;

  CREATE DATABASE SpotifyClone;

  CREATE TABLE SpotifyClone.tabela_plano(
      plano_id INT AUTO_INCREMENT PRIMARY KEY,
      coluna_plano VARCHAR(15) NOT NULL,
      valor_plano FLOAT NOT NULL
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.tabela_plano(coluna_plano, valor_plano)
  VALUES
    ('gratuito', 0.00),
    ('familiar', 7.99),
    ('universitario', 5.99),
    ('pessoal', 6.99);

  CREATE TABLE SpotifyClone.tabela_usuario(
      usuario_id INT AUTO_INCREMENT PRIMARY KEY,
      coluna_usuario VARCHAR(50) NOT NULL,
      idade INT NOT NULL,
      plano_id INTEGER NOT NULL,
      data_assinatura DATE,
      CONSTRAINT FOREIGN KEY (plano_id) REFERENCES tabela_plano (plano_id)
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.tabela_usuario (coluna_usuario, idade,	plano_id, data_assinatura)
  VALUES
    ('Barbara Liskov', 82, 1, '2019-10-20'),
    ('Robert Cecil Martin', 58, 1, '2017-01-06'),
    ('Ada Lovelace', 37, 2, '2017-12-30'),
    ('Martin Fowler', 46, 2, '2018-04-29'),
    ('Sandi Metz', 58, 2, '2018-04-29'),
    ('Paulo Freire', 19, 3, '2018-02-14'),
    ('Bell Hooks', 26, 3, '2018-01-05'),
    ('Christopher Alexander', 85, 4, '2019-06-05'),
    ('Judith Butler', 45, 4, '2020-05-13'),
    ('Jorge Amado', 58, 4, '2017-02-17');


  CREATE TABLE SpotifyClone.tabela_artista(
      artista_id INT AUTO_INCREMENT PRIMARY KEY,
      coluna_artista VARCHAR(50) NOT NULL
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.tabela_artista (coluna_artista)
  VALUES
    ('Beyoncé'),
    ('Queen'),
    ('Elis Regina'),
    ('Baco Exu do Blues'),
    ('Blind Guardian'),
    ('Nina Simone');

  
  CREATE TABLE SpotifyClone.tabela_seguindo_artistas(
      usuario_id INTEGER NOT NULL,
      coluna_seguindo_artistas INT NOT NULL,
      CONSTRAINT PRIMARY KEY (coluna_seguindo_artistas, usuario_id),
      FOREIGN KEY (coluna_seguindo_artistas) REFERENCES tabela_artista (artista_id),
      FOREIGN KEY (usuario_id) REFERENCES tabela_usuario (usuario_id)
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.tabela_seguindo_artistas(usuario_id, coluna_seguindo_artistas)
  VALUES
    (1, 1),
    (1, 2),
    (1, 3),
    (2, 1),
    (2, 3),
    (3, 2),
    (4, 4),
    (5, 5),
    (5, 6),
    (6, 6),
    (6, 1),
    (7, 6),
    (9, 3),
    (10, 2);
  
  
  CREATE TABLE SpotifyClone.tabela_album(
      album_id INT AUTO_INCREMENT PRIMARY KEY,
      coluna_album VARCHAR(50) NOT NULL UNIQUE,
      artista_id INTEGER NOT NULL,
      ano_lancamento YEAR NOT NULL,
      FOREIGN KEY (artista_id) REFERENCES tabela_artista (artista_id)
  ) engine = InnoDB;

  INSERT INTO SpotifyClone.tabela_album (coluna_album, artista_id, ano_lancamento)
  VALUES
    ('Renaissance', 1, 2022),
    ('Jazz', 2, 1978),
    ('Hot Space', 2, 1982),
    ('Falso Brilhante', 3, 1998),
    ('Vento de Maio', 3, 2001),
    ('QVVJFA?', 4, '2003'),
    ('Somewhere Far Beyond', 5, 2007),
    ('I Put A Spell On You', 6, 2012);
  
   CREATE TABLE SpotifyClone.tabela_cancoes(
      cancao_id INT AUTO_INCREMENT PRIMARY KEY,
      coluna_cancoes VARCHAR(50) NOT NULL,
      duracao_segundos INT NOT NULL,
      album_id INTEGER NOT NULL,
      CONSTRAINT FOREIGN KEY (album_id) REFERENCES tabela_album (album_id)
  ) engine = InnoDB;


  INSERT INTO SpotifyClone.tabela_cancoes (coluna_cancoes, duracao_segundos, album_id)
  VALUES
    ("BREAK MY SOUL", 279, 1),
    ("VIRGO’S GROOVE", 369, 1),
    ("ALIEN SUPERSTAR", 116, 1),
    ("Don’t Stop Me Now", 203, 2),
    ("Under Pressure", 152, 3),
    ("Como Nossos Pais", 105, 4),
    ("O Medo de Amar é o Medo de Ser Livre", 207, 5),
    ("Samba em Paris", 267, 6),
    ("The Bard’s Song", 244, 7),
    ("Feeling Good", 100, 8);
  
   CREATE TABLE SpotifyClone.tabela_historico_de_reproducoes(
      coluna_historico_de_reproducoes INT NOT NULL,
	    usuario_id integer,
      data_reproducao DATETIME,
      CONSTRAINT PRIMARY KEY(usuario_id, coluna_historico_de_reproducoes),
      FOREIGN KEY (coluna_historico_de_reproducoes) REFERENCES tabela_cancoes (cancao_id),
      FOREIGN KEY (usuario_id) REFERENCES tabela_usuario (usuario_id)
  ) engine = InnoDB;
    
INSERT INTO SpotifyClone.tabela_historico_de_reproducoes(coluna_historico_de_reproducoes, usuario_id, data_reproducao)
  VALUES
    (8, 1, "2022-02-28 10:45:55"),
    (2, 1, "2020-05-02 05:30:35"),
    (10, 1, "2020-03-06 11:22:33"),
    (10, 2, "2022-08-05 08:05:17"),
    (7, 2, "2020-01-02 07:40:33"),
    (10, 3, "2020-11-13 16:55:13"),
    (2, 3, "2020-12-05 18:38:30"),
    (8, 4, "2021-08-15 17:10:10"),
    (8, 5, "2022-01-09 01:44:33"),
    (5, 5,  "2020-08-06 15:23:43"),
    (7, 6, "2017-01-24 00:31:17"),
    (1, 6, "2017-10-12 12:35:20"),
    (4, 7, "2011-12-15 22:30:49"),
    (4, 8, "2012-03-17 14:56:41"),
    (9, 9, "2022-02-24 21:14:22"),
    (3, 10, "2015-12-13 08:30:22");