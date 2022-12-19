SELECT can.coluna_cancoes As cancao, COUNT(can.coluna_cancoes) AS reproducoes FROM SpotifyClone.tabela_cancoes AS can
INNER JOIN SpotifyClone.tabela_historico_de_reproducoes re
ON can.cancao_id = re.coluna_historico_de_reproducoes
GROUP BY can.coluna_cancoes
ORDER BY reproducoes DESC, cancao LIMIT 2;