<?php

namespace Database\Factories;

use App\Models\Vaga;
use Illuminate\Database\Eloquent\Factories\Factory;

class VagaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Vaga::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $locais = ['A', 'B', 'C', 'D', 'E', 'F'];

        return [
            'empresa' => $this->faker->sentence($nbWords = 1, $variableNbWords = true),
            'titulo' => $this->faker->sentence($nbWords = 3, $variableNbWords = true),
            'descricao' => $this->faker->paragraph(1),
            'localizacao' => $locais[rand(1,5)],
            'nivel' => rand(1,5),
        ];
    }
}
