Individual Project for Newtab Academy using Laravel and React.
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
