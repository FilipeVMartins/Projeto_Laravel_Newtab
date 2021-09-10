<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/Pessoas, [PessoasController::class, 'index']);
// Route::get('/Pessoas/:id', [PessoasController::class, 'show']);
// Route::post('/Pessoas, [PessoasController::class, 'create']);
// Route::put('/Pessoas/:id', [PessoasController::class, 'update']);
// Route::delete('/Pessoas/:id', [PessoasController::class, 'destroy']);
