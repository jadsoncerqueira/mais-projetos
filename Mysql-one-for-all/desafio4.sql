SELECT us.coluna_usuario AS usuario,
IF(MAX(YEAR(re.data_reproducao)) >= 2021, 'Usuário ativo', 'Usuário inativo') AS status_usuario
FROM SpotifyClone.tabela_usuario AS us
INNER JOIN SpotifyClone.tabela_historico_de_reproducoes AS re
ON us.usuario_id = re.usuario_id
GROUP BY us.coluna_usuario
ORDER BY us.coluna_usuario;