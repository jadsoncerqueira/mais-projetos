SELECT us.coluna_usuario usuario, COUNT(re.coluna_historico_de_reproducoes) qt_de_musicas_ouvidas, ROUND(SUM(can.duracao_segundos) / 60, 2) AS total_minutos
FROM SpotifyClone.tabela_usuario AS us
INNER JOIN SpotifyClone.tabela_historico_de_reproducoes AS re
ON us.usuario_id = re.usuario_id
INNER JOIN SpotifyClone.tabela_cancoes AS can
ON can.cancao_id = re.coluna_historico_de_reproducoes
GROUP BY us.usuario_id
ORDER BY us.coluna_usuario;