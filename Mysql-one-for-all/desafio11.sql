SELECT coluna_cancoes nome_musica,
	CASE
		WHEN coluna_cancoes LIKE '%Bard%' THEN REPLACE(coluna_cancoes,'Bard', 'QA')
        WHEN coluna_cancoes LIKE '%Amar%' THEN REPLACE(coluna_cancoes,'Amar', 'Code Review')
        WHEN coluna_cancoes LIKE '%Pais%' THEN REPLACE(coluna_cancoes,'Pais', 'Pull Requests')
        WHEN coluna_cancoes LIKE '%SOUL%' THEN REPLACE(coluna_cancoes,'SOUL', 'CODE')
        WHEN coluna_cancoes LIKE '%SUPERSTAR%' THEN REPLACE(coluna_cancoes,'SUPERSTAR', 'SUPERDEV')
	END AS novo_nome
FROM SpotifyClone.tabela_cancoes
WHERE coluna_cancoes LIKE '%Bard%' OR
	coluna_cancoes LIKE '%Amar%' OR
	coluna_cancoes LIKE '%Pais%' OR
	coluna_cancoes LIKE '%SOUL%' OR
	coluna_cancoes LIKE '%SUPERSTAR%'
ORDER BY coluna_cancoes DESC;