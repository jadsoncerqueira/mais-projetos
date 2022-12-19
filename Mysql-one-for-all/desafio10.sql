SELECT can.coluna_cancoes nome, COUNT(re.coluna_historico_de_reproducoes) reproducoes FROM SpotifyClone.tabela_cancoes can
INNER JOIN SpotifyClone.tabela_historico_de_reproducoes re
ON re.coluna_historico_de_reproducoes = can.cancao_id
INNER JOIN SpotifyClone.tabela_usuario us
ON us.usuario_id =  re.usuario_id
WHERE us.plano_id = 1 OR us.plano_id = 4
GROUP BY can.coluna_cancoes ORDER BY can.coluna_cancoes;