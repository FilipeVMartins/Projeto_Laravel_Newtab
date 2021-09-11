<?php

namespace Database\Factories;

use App\Models\Candidatura;
use Illuminate\Database\Eloquent\Factories\Factory;

class CandidaturaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Candidatura::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        // Fetch the Vagas ids
        $idsVagas = \App\Models\Vaga::all('id')->pluck('id')->toArray();

        // Fetch the Pessoas ids
        $idsPessoas = \App\Models\Pessoa::all('id')->pluck('id')->toArray();

        
        $candidaturaExists = true;
        while ($candidaturaExists){

            $randomVagaID = $idsVagas[rand(0, count($idsVagas)-1)];
            $randomPessoaID = $idsPessoas[rand(0, count($idsPessoas)-1)];
    
            // Fetch the Candidaturas ids to check if the composite key is alrdy registered, there can't be two Candidatura with same Vaga and Pessoa.
            $idsCandidaturas = \App\Models\Candidatura::where('id_vaga', $randomVagaID)
                ->where('id_pessoa', $randomPessoaID)
                ->get()
                ->pluck('id')->toArray();

            if (count($idsCandidaturas) == 0){
                $candidaturaExists = false;
            }
        }

        return [
            'id_vaga' => $randomVagaID,
            'id_pessoa' => $randomPessoaID,
        ];
    }
}
