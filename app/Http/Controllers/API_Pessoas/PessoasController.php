<?php

namespace App\Http\Controllers\API_Pessoas;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pessoa;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class PessoasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data= Pessoa::latest()->paginate(10);
        return response()->json($data);
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
            'nome' => ['required', 'unique:pessoas', 'max:100'],
            'profissao' => ['required', 'max:100'],
            'localizacao' => ['required', 'size:1', Rule::in(['A', 'B', 'C', 'D', 'E', 'F'])],
            'nivel' => ['required', 'size:1', Rule::in(['1', '2', '3', '4', '5'])],
        ]);

        if ($validator->fails()) {
            $response = ['errors' => $validator->errors()->getMessages()];
            return response()->json($response);
        }

        $Pessoa = Pessoa::create($request->all());
        
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
        //
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
            'nome' => ['required', 'unique:pessoas,nome,'.$request->id, 'max:100'],
            'profissao' => ['required', 'max:100'],
            'localizacao' => ['required', 'size:1', Rule::in(['A', 'B', 'C', 'D', 'E', 'F'])],
            'nivel' => ['required', 'size:1', Rule::in(['1', '2', '3', '4', '5'])],
        ]);

        if ($validator->fails()) {
            $response = ['errors' => $validator->errors()->getMessages()];
            return response()->json($response);
        }

        $update = Pessoa::where('id', $request->id)->update($request->all());

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
        $delete = Pessoa::destroy($request->id);
        
        //return 0 for fail or 1 for success
        return $delete;
    }
}
