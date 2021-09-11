<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateCandidaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidaturas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_vaga')->nullable(false)->constrained('vagas')->onDelete('cascade');
            $table->foreignId('id_pessoa')->nullable(false)->constrained('pessoas')->onDelete('cascade');
            $table->index(['id_vaga', 'id_pessoa']); //composite keys for index
            $table->timestamps();
        });
        
        DB::statement("ALTER TABLE `candidaturas` comment 'Tabela para cadastro de Candidaturas de Pessoas às Vagas de emprego'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('candidaturas');
    }
}
