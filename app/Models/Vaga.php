<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vaga extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'empresa',
        'titulo',
        'descricao',
        'localizacao',
        'nivel',
    ];
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
    protected $appends = [
        'qtd_candidaturas'
    ];

    public function getQtdCandidaturasAttribute()
    {
        return Candidatura::where('id_vaga', $this->id)->count();
    }

    // //relacionamentos
    // public function candidatura()
    // {
    //     return $this->oneToMany(Vaga::class, 'id_vaga');
    // }
}
