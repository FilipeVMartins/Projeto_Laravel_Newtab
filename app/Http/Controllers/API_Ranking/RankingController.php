<?php

namespace App\Http\Controllers\API_Ranking;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Candidatura;

class RankingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $data = Candidatura::with('vaga')->with('pessoa')->where('id_vaga', $id)->orderByDesc('score')->paginate(20);
        return response()->json($data);
    }


}
