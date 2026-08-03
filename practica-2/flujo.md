# Comparacion: GitFlow vs Trunk-Based Development

## GitFlow
-Ramas largas: develop, featura/*, release/*, hotfix/*.
-Requiere mas gestion y merging complejo.
-Bueno para versiones programadas (ej. software de escritorio).

## Trunk-Based Development
-Rama main como centro.
-Ramas cortas (horas/dias) con PRs pequeños.
-Ideal para apps web con despliegue continuo.

## Mi eleccion para una app web
Elijo **Trunk-Based Development** porque:
-Permite integracion continua y feedback rapido.
-Reduce conflictos al tener PRs pequeños.
-Es mas agil y sencillo para equipos modernos.
-GitFlow añade complejidad innecesaria para una web que se actualiza a diario.