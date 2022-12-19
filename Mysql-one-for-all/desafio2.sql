SELECT COUNT(*) AS cancoes,
	(SELECT COUNT(*) FROM SpotifyClone.tabela_artista) AS artistas,
    (SELECT COUNT(*) FROM SpotifyClone.tabela_album) AS albuns
FROM SpotifyClone.tabela_cancoes;