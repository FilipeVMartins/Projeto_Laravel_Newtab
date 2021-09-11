<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Pessoa;

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

        Pessoa::factory()
            ->count(50)
            ->create();
            
            
    }
}
