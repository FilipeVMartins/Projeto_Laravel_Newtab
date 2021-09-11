<?php

namespace Database\Factories;

use App\Models\Pessoa;
use Illuminate\Database\Eloquent\Factories\Factory;

class PessoaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Pessoa::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $locais = ['A', 'B', 'C', 'D', 'E', 'F'];

        return [
            'nome' => $this->faker->unique()->name,
            'profissao' => $this->faker->sentence($nbWords = 3, $variableNbWords = true),
            'localizacao' => $locais[rand(1,5)],
            'nivel' => rand(1,5),
        ];
    }
}
