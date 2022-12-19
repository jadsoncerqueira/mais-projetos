SELECT artistas.coluna_artista artista, albuns.coluna_album album, count(sea.usuario_id) seguidores FROM SpotifyClone.tabela_artista artistas
INNER JOIN SpotifyClone.tabela_album albuns
ON artistas.artista_id = albuns.artista_id
INNER JOIN SpotifyClone.tabela_seguindo_artistas sea
ON sea.coluna_seguindo_artistas = artistas.artista_id
GROUP BY artista, album
ORDER BY seguidores DESC, artista, album;