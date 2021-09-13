<?php

namespace App\Http\Controllers\API_Ranking;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RankingController extends Controller
{

    public function __construct()
    {

        $this->mapaLocalidades = [
            'A' => ['B'=>5],
            'B' => ['A'=>5, 'C'=>7, 'D'=>3],
            'C' => ['B'=>7, 'E'=>4],
            'D' => ['B'=>3, 'E'=>10, 'F'=>8],
            'E' => ['C'=>4, 'D'=>10],
            'F' => ['D'=>8],
        ];

    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $id)
    {

        $distancia = $this->calculaDistancia('B', 'A');
        


        $data = 'rtwesf';
        
        //return response()->json($distancia);
    }




    private function calculaDistancia($localizacaoVaga, $localizacaoCandidato)
    {
        //verificar se local atual == local empresa, se local atual tem outros caminhos para além do ultimo local
        //$localAtual = $this->mapaLocalidades[$localizacaoCandidato];

        //$locaisPercorridos = [];
        //$locaisPercorridos[] = $localizacaoCandidato;

        //$this->encontraCaminhos($localAtual, $localizacaoCandidato, $rotasEncontradas);
        
        
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
        print_r($rotasEncontradas);

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
        print_r($menorDistancia);

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

        //$localAtualKey = end($locaisPercorridos);
        $newRotasEncontradas = [];
        $rotasEncontradasIndexesToDelete = [];

        foreach ($localAtual as $local => $distancia){
            //prox local não pode já ter sido percorrido //precisa existir um caminho no prox local/// && count($this->mapaLocalidades[$local]) != 0(n usado)      //se houver apenas 1 caminho no prox local, ele n pode estar nos já percorridos /// && !(count($this->mapaLocalidades[$local]) == 1 && in_array( array_key_first($this->mapaLocalidades[$local]) , $locaisPercorridos))(n usado)
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
