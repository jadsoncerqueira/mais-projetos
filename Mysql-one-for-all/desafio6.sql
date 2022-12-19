SELECT
  CAST(MIN(valor_plano) AS DECIMAL ( 4 , 2 )) faturamento_minimo,
  CAST(MAX(valor_plano) AS DECIMAL ( 4 , 2 )) faturamento_maximo,
  CAST(ROUND(AVG(valor_plano), 2) AS DECIMAL ( 4 , 2 )) faturamento_medio,
  CAST(ROUND(SUM(valor_plano), 2) AS DECIMAL ( 4 , 2 )) faturamento_total
FROM SpotifyClone.tabela_plano plan
INNER JOIN SpotifyClone.tabela_usuario us
ON us.plano_id = plan.plano_id;