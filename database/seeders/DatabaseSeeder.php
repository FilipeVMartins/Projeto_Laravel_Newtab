<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

            
        \App\Models\Pessoa::factory()->count(50)->create();
        \App\Models\Vaga::factory()->count(50)->create();
        \App\Models\Candidatura::factory()->count(120)->create();
        

        
            
    }
}
