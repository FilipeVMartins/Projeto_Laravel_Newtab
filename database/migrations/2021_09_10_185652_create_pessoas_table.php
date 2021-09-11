<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreatePessoasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pessoas', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100)->nullable(false)->unique();
            $table->string('profissao', 100)->nullable(false);
            $table->string('localizacao', 1)->nullable(false)->comment('Localidade de Residência do candidato: A, B, C, D, E ou F');
            $table->tinyInteger('nivel')->nullable(false)->comment('Nível de experiência do candidato: 1:estagiário, 2:júnior, 3:pleno, 4:sênior ou 5:especialista');
            $table->timestamps();
        });

        DB::statement("ALTER TABLE `pessoas` comment 'Tabela para cadastro de Pessoas candidatas às vagas de emprego'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pessoas');
    }
}
