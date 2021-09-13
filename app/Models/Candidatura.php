<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidatura extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_vaga',
        'id_pessoa',
    ];
    // protected $hidden = [
    //     'user',
    // ];

    //campos calculados
    // protected $appends = ['score'];

    // public function getScoreAttribute()
    // {
    //     return $this->calculaScore();
    // }

    //relacionamentos
    public function vaga()
    {
        return $this->belongsTo(Vaga::class, 'id_vaga');
    }

    public function pessoa()
    {
        return $this->belongsTo(Pessoa::class, 'id_pessoa');
    }




    /**
     * The "booted" method of the model.
     *
     * @return void
     */
    protected static function booted()
    {
        static::saving (function ($candidatura) {
            $candidatura->score = $candidatura->calculaScore();
        });
    }








    //calculo conforme especificação
    private function calculaScore(){

        //calcula N
        $NV = $this->vaga->nivel;
        $NC = $this->pessoa->nivel;
        $N = 100 - 25 * ($NV - $NC);

        //encontra a menor distância entre o candidato e a vaga
        $distancia = intval($this->calculaDistancia($this->vaga->localizacao, $this->pessoa->localizacao));

        //utiliza a distancia para definir o valor de D, seguindo a tabela da especificação
        // 0 até 5	                100
        // maiores que 5 até 10	    75
        // maiores que 10 até 15	50
        // maiores que 15 até 20	25
        // maiores que 20	        0
        if ($distancia <= 5) {
            $D = 100;
        } elseif ($distancia <= 10) {
            $D = 75;
        } elseif ($distancia <= 15) {
            $D = 50;
        } elseif ($distancia <= 20) {
            $D = 25;
        } elseif ($distancia > 20) {
            $D = 0;
        }

        $score = ($N+$D)/2;
        return $score;
    }

    protected $mapaLocalidades = [
        'A' => ['B'=>5],
        'B' => ['A'=>5, 'C'=>7, 'D'=>3],
        'C' => ['B'=>7, 'E'=>4],
        'D' => ['B'=>3, 'E'=>10, 'F'=>8],
        'E' => ['C'=>4, 'D'=>10],
        'F' => ['D'=>8],
    ];

    private function calculaDistancia($localizacaoVaga, $localizacaoCandidato)
    {
        //inicio, localidade B com distancia 0
        $rotasEncontradas = [[$localizacaoCandidato=>0]];
        while (true){
            $rotasEncontradasOld = $rotasEncontradas;

            foreach ($rotasEncontradas as $index => $rota){
                $this->encontraRotas($this->mapaLocalidades[array_key_last($rota)], array_key_last($rota), $rotasEncontradas);
            }

            if ($rotasEncontradasOld === $rotasEncontradas){
                break;
            }
        }
        //print_r($rotasEncontradas);

        //calcular todas as distâncias encontradas nas rotas até $localizacaoVaga
        $distancias = [];
        foreach($rotasEncontradas as $index => $rota){
            //verificar se o destino existe na rota antes de calcular
            if(isset($rota[$localizacaoVaga])){
                $totalDistanciaRota = 0;

                foreach($rota as $localidade => $distancia){
                    $totalDistanciaRota += $distancia;

                    //se chegou ao destino, break
                    if ($localidade == $localizacaoVaga){
                        break;
                    }
                }
                $distancias[] = $totalDistanciaRota;
            }
        }
        //pegar a menor distância encontrada
        $menorDistancia = min($distancias);
        //print_r($menorDistancia);

        return $menorDistancia;
    }

    private function encontraRotas($localAtual, $localAtualKey, &$rotasEncontradas){

        $locaisPercorridos = [];
        //gerar $locaisPercorridos
        foreach($rotasEncontradas as $index => $rota){
            if (array_key_last($rota) == $localAtualKey){
                foreach ($rota as $localName => $distancia){
                    $locaisPercorridos[] = $localName;
                }
            }
        }
        //print_r($locaisPercorridos);

        $newRotasEncontradas = [];
        $rotasEncontradasIndexesToDelete = [];
        foreach ($localAtual as $local => $distancia){
            //prox local não pode já ter sido percorrido
            if (!in_array($local, $locaisPercorridos)){
                //$rotasEncontradas[] = [$local => $distancia];

                foreach ($rotasEncontradas as $index => $rota){
                    if (array_key_last($rota) == $localAtualKey){
                        $newRotasEncontradas[] = array_merge($rota, [$local => $distancia]);
                        $rotasEncontradasIndexesToDelete[] = $index;
                    }
                }
            }
            $locaisPercorridos[] = $local;
        }

        foreach($rotasEncontradasIndexesToDelete as $index => $value) {
            unset($rotasEncontradas["$value"]);
        }
        $rotasEncontradas = array_merge($rotasEncontradas, $newRotasEncontradas);
    }
}
