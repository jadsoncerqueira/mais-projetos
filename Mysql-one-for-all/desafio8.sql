SELECT ar.coluna_artista artista, al.coluna_album album FROM SpotifyClone.tabela_artista ar
INNER JOIN SpotifyClone.tabela_album al
ON ar.artista_id = al.artista_id
WHERE ar.coluna_artista = 'Elis Regina'
ORDER BY al.coluna_album;