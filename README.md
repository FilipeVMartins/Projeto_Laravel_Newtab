Individual Project for Newtab Academy using Laravel for RESTful API's endpoints and React as SPA with React Router to consume those endpoints using fetch.

It's an application to calculate the score of candidates applying for job positions.
The score is calculated by a formula that considers the (((job level x candidate level) plus (the distance score between them two)) / 2)
Where the distance score should be calculated based on the smallest path between the candidate location and the job location.

The example locations and its possible connections distances are given by this array, beeing its indexes the respective locations names themselves and sub arrays representing the connected locations and its distance values.

$mapaLocalidades = [<br>
&nbsp;&nbsp;&nbsp;&nbsp;        'A' => ['B'=>5],<br>
&nbsp;&nbsp;&nbsp;&nbsp;        'B' => ['A'=>5, 'C'=>7, 'D'=>3],<br>
&nbsp;&nbsp;&nbsp;&nbsp;        'C' => ['B'=>7, 'E'=>4],<br>
&nbsp;&nbsp;&nbsp;&nbsp;        'D' => ['B'=>3, 'E'=>10, 'F'=>8],<br>
&nbsp;&nbsp;&nbsp;&nbsp;        'E' => ['C'=>4, 'D'=>10],<br>
&nbsp;&nbsp;&nbsp;&nbsp;        'F' => ['D'=>8],<br>
    ];<br>


The project counts with:
Four Models: [
    app/Models/Candidatura.php,
    app/Models/Pessoa.php,
    app/Models/User.php,
    app/Models/Vaga.php
]
Four API's: [
    app/Http/Controllers/API_Candidaturas,
    app/Http/Controllers/API_Pessoas,
    app/Http/Controllers/API_Ranking,
    app/Http/Controllers/API_Vagas,
]
Four Pages: [
    resources/js/pages/Candidaturas.jsx
    resources/js/pages/Home.jsx 
    resources/js/pages/Pessoas.jsx
    resources/js/pages/Vagas.jsx
]
The SPA app is served by the View file: [resources/views/index.blade.php]

