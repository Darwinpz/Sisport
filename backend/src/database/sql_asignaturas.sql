SELECT s.sem_nombre,d.asig_id,a.asig_nombre, vi.per_id as docente_id, p.per_titulo||' '||p.per_nombres ||' '|| p.per_apellidos as docente, d.peri_id , per.peri_nombre 
FROM det_persona_asignaturas as d,asignaturas as a, vi_docentes_asignaturas as vi , persona as p,semestre as s,periodo as per
WHERE d.asig_id = a.asig_id 
	and vi.asig_id = d.asig_id 
	and vi.peri_id = d.peri_id
	and p.per_id = vi.per_id
	and per.peri_id = vi.peri_id
	and a.sem_id = s.sem_id
	and d.per_id = 'per0001'
order by d.peri_id

