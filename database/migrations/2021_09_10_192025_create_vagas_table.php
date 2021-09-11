<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateVagasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('vagas', function (Blueprint $table) {
            $table->id();
            $table->string('empresa', 100)->nullable(false); //não único pois uma empresa pode ter mais de uma vaga cadastrada?
            $table->string('titulo', 100)->nullable(false);
            $table->text('descricao')->nullable(false);
            $table->string('localizacao', 1)->nullable(false)->comment('Localidade da vaga de emprego oferecida: A, B, C, D, E ou F');
            $table->tinyInteger('nivel')->nullable(false)->comment('Nível de experiência exigido pela vaga: 1:estagiário, 2:júnior, 3:pleno, 4:sênior, 5:especialista');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE `vagas` comment 'Tabela para cadastro de Vagas de emprego'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('vagas');
    }
}
