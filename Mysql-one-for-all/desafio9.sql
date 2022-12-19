SELECT COUNT(re.usuario_id) quantidade_musicas_no_historico FROM SpotifyClone.tabela_usuario us
INNER JOIN SpotifyClone.tabela_historico_de_reproducoes re
ON re.usuario_id = us.usuario_id
WHERE us.coluna_usuario = "Barbara Liskov"
GROUP BY us.coluna_usuario;