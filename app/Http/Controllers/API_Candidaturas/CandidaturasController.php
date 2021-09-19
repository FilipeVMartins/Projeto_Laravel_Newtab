<?php

namespace App\Http\Controllers\API_Candidaturas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Candidatura;
use App\Models\Pessoa;
use App\Models\Vaga;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class CandidaturasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Candidatura::with('vaga')->with('pessoa')->latest()->paginate(20);
        return response()->json($data);
    }

    public function indexFuzzySelectPessoaOptions(Request $request)
    {
        $nome = $request->nome;
        if ($nome && strlen($nome) > 1){
            $data = Pessoa::latest()
                ->when($nome, function ($query, $nome) {
                    return $query->where('nome', 'LIKE', "%$nome%");
                })
                ->get();
            return response()->json($data);
        } else {
            return response()->json(['error' => 'Digite um valor']);
        }
    }

    public function indexFuzzySelectVagaOptions(Request $request)
    {
        $titulo = $request->titulo;
        if ($titulo && strlen($titulo) > 1){
            $data = Vaga::latest()
                ->when($titulo, function ($query, $titulo) {
                    return $query->where('titulo', 'LIKE', "%$titulo%");
                })
                ->get();
            return response()->json($data);
        } else {
            return response()->json(['error' => 'Digite um valor']);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
        //unique composite key validation
        'id_vaga' => ['required', 'integer', 'unique:candidaturas,id_vaga,NULL,id,id_pessoa,' . $request->id_pessoa],
        'id_pessoa' => ['required', 'integer', 'unique:candidaturas,id_pessoa,NULL,id,id_vaga,' . $request->id_vaga],
        ]);

        if ($validator->fails()) {
            $response = ['errors' => $validator->errors()->getMessages()];
            return response()->json($response);
        }

        $Pessoa = Candidatura::create($request->all());
        
        //return the pessoa model if success
        return $Pessoa;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $candidatura = Candidatura::with('vaga')->with('pessoa')->findOrFail($id);
        return response()->json($candidatura);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            //unique composite key validation
            'id_vaga' => ['required', 'integer', 'unique:candidaturas,id_vaga,'.$request->id.',id,id_pessoa,' . $request->id_pessoa],
            'id_pessoa' => ['required', 'integer', 'unique:candidaturas,id_pessoa,'.$request->id.',id,id_vaga,' . $request->id_vaga],
        ]);

        if ($validator->fails()) {
            $response = ['errors' => $validator->errors()->getMessages()];
            return response()->json($response);
        }

        $update = Candidatura::where('id', $request->id)->update($request->all());

        //return 0 for fail or 1 for success
        return $update;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        $delete = Candidatura::destroy($request->id);
        
        //return 0 for fail or 1 for success
        return $delete;
    }
}
